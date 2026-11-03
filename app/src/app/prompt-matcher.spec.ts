import { describe, expect, it } from 'vitest';
import { matchPrompt, type PromptTool } from './prompt-matcher';

const tools: PromptTool[] = [
  {
    id: 1,
    name: 'GitHub Copilot',
    category: 'Developer',
    provider: 'GitHub',
    summary: 'Asistente de programación para generación, revisión y explicación de código.',
    useCase: 'Desarrollo y soporte de código',
    price: 'Subscription',
    score: 95,
  },
  {
    id: 2,
    name: 'Perplexity',
    category: 'Research',
    provider: 'Perplexity',
    summary: 'Búsqueda asistida con respuestas citadas y contexto web.',
    useCase: 'Investigación y verificación de fuentes',
    price: 'Freemium',
    score: 88,
  },
  {
    id: 3,
    name: 'Llama 3.3',
    category: 'Local',
    provider: 'Meta',
    summary: 'Modelo local abierto para despliegues privados y control de datos.',
    useCase: 'Procesos locales, privacidad y despliegue en infraestructura propia',
    price: 'Free',
    score: 84,
  },
  {
    id: 4,
    name: 'Midjourney',
    category: 'Image',
    provider: 'Midjourney',
    summary: 'Generación visual creativa para concepto, branding y arte.',
    useCase: 'Diseño visual e ideación creativa',
    price: 'Subscription',
    score: 90,
  },
];

type DecisionAxes = {
  capability: 'routine' | 'balanced' | 'advanced';
  cost: 'low' | 'moderate' | 'high';
  latency: 'fast' | 'balanced' | 'slow';
  privacy: 'local' | 'cloud' | 'managed-cloud';
  contextTokens?: number;
  source: 'editorial-estimate' | 'verified-benchmark';
};

type ToolWithDecisionAxes = PromptTool & { decisionAxes: DecisionAxes };

const decisionTools: ToolWithDecisionAxes[] = [
  {
    id: 11,
    name: 'Claude Haiku 3.5',
    category: 'Assistant',
    provider: 'Anthropic',
    summary: 'Modelo ágil para clasificación, resumen y extracción a escala.',
    useCase: 'Clasificación en tiempo real y extracción de datos',
    price: 'Low',
    score: 88,
    decisionAxes: { capability: 'routine', cost: 'low', latency: 'fast', privacy: 'cloud', source: 'editorial-estimate' },
  },
  {
    id: 12,
    name: 'Claude Sonnet 4',
    category: 'Assistant',
    provider: 'Anthropic',
    summary: 'Modelo equilibrado para desarrollo y análisis de contexto extenso.',
    useCase: 'Revisión de código y análisis de documentos largos',
    price: 'Premium',
    score: 96,
    decisionAxes: { capability: 'advanced', cost: 'moderate', latency: 'balanced', privacy: 'cloud', contextTokens: 200_000, source: 'editorial-estimate' },
  },
  {
    id: 13,
    name: 'Claude Opus 4',
    category: 'Assistant',
    provider: 'Anthropic',
    summary: 'Razonamiento profundo para arquitectura y tareas complejas.',
    useCase: 'Arquitectura compleja y análisis profundo',
    price: 'Premium',
    score: 99,
    decisionAxes: { capability: 'advanced', cost: 'high', latency: 'slow', privacy: 'cloud', source: 'editorial-estimate' },
  },
  {
    id: 14,
    name: 'Gemini 2.5 Pro',
    category: 'Research',
    provider: 'Google',
    summary: 'Análisis de codebases y documentación de contexto muy extenso.',
    useCase: 'Repositorios grandes y documentación extensa',
    price: 'Premium',
    score: 95,
    decisionAxes: { capability: 'advanced', cost: 'moderate', latency: 'balanced', privacy: 'cloud', contextTokens: 1_000_000, source: 'editorial-estimate' },
  },
  {
    id: 15,
    name: 'Llama 3.3 local',
    category: 'Local',
    provider: 'Meta',
    summary: 'Modelo ejecutado localmente para privacidad y control de datos.',
    useCase: 'Datos sensibles en entorno local',
    price: 'Free',
    score: 84,
    decisionAxes: { capability: 'balanced', cost: 'low', latency: 'balanced', privacy: 'local', source: 'editorial-estimate' },
  },
];

describe('matchPrompt', () => {
  it('ranks catalog tools that match a Spanish development prompt and explains the match', () => {
    const result = matchPrompt('Necesito ayuda con programación y revisión de código', tools);

    expect(result.status).toBe('results');
    expect(result.taskTypes).toContain('desarrollo');
    expect(result.matches[0].tool.id).toBe(1);
    expect(result.matches[0].reasons.length).toBeGreaterThan(0);
    expect(result.matches[0].evidence.join(' ').toLowerCase()).toContain('código');
  });

  it('recognizes research and image-generation intents in Spanish', () => {
    const research = matchPrompt('Investigar información y verificar fuentes', tools);
    const image = matchPrompt('Crear una imagen para un concepto visual', tools);

    expect(research.taskTypes).toContain('investigación');
    expect(research.matches[0].tool.id).toBe(2);
    expect(image.taskTypes).toContain('creación de imágenes');
    expect(image.matches[0].tool.id).toBe(4);
  });

  it('prioritizes local and low-cost tools when those constraints are explicit', () => {
    const result = matchPrompt('Necesito un modelo local, privado y gratuito', tools);

    expect(result.constraints).toEqual(expect.arrayContaining(['local', 'coste bajo']));
    expect(result.matches[0].tool.id).toBe(3);
    expect(result.matches[0].reasons.join(' ').toLowerCase()).toContain('local');
    expect(result.matches.some((match) => match.tradeoffs.length > 0)).toBe(true);
  });

  it('replaces detected constraints when the user provides a refined intent', () => {
    const result = matchPrompt('Necesito un modelo local, privado y gratuito', tools, 'programación');

    expect(result.taskTypes).toEqual(['desarrollo']);
    expect(result.constraints).toEqual([]);
    expect(result.matches[0].tool.id).toBe(1);
  });

  it('asks the user to refine an empty or unsupported prompt without inventing candidates', () => {
    const empty = matchPrompt('   ', tools);
    const unsupported = matchPrompt('Resolver un acertijo sobre volcanes submarinos', tools);

    expect(empty.status).toBe('needs-refinement');
    expect(empty.matches).toHaveLength(0);
    expect(unsupported.status).toBe('needs-refinement');
    expect(unsupported.matches).toHaveLength(0);
  });

  it('prioritizes fast, low-cost models for high-volume production classification', () => {
    const result = matchPrompt(
      'En producción necesito clasificar 50000 registros al día con una respuesta en menos de 1 segundo y coste bajo',
      decisionTools,
    );

    expect(result.matches[0].tool.name).toBe('Claude Haiku 3.5');
    expect(result.matches[0].reasons.join(' ').toLowerCase()).toContain('latencia');
    expect(result.matches[0].reasons.join(' ').toLowerCase()).toContain('volumen');
  });

  it('prioritizes local deployment for sensitive customer data', () => {
    const result = matchPrompt('Analizar saldos bancarios privados que no pueden salir del entorno local', decisionTools);

    expect(result.matches[0].tool.name).toBe('Llama 3.3 local');
    expect(result.matches[0].reasons.join(' ').toLowerCase()).toContain('privacidad');
  });

  it('uses context-window metadata for long documents and reports missing coverage', () => {
    const result = matchPrompt('Analizar un repositorio completo de 500000 tokens con contexto largo', decisionTools);

    expect(result.matches[0].tool.name).toBe('Gemini 2.5 Pro');
    expect(result.matches.find((match) => match.tool.name === 'Claude Sonnet 4')?.tradeoffs.join(' ')).toContain('500.000');
  });

  it('does not claim a production quality threshold without validated benchmark data', () => {
    const result = matchPrompt('En producción extraer importes con una precisión mínima del 97%', decisionTools);

    expect(result.matches.length).toBeGreaterThan(0);
    expect(result.matches.every((match) => match.tradeoffs.join(' ').includes('97%'))).toBe(true);
  });

  it('labels verified benchmark metadata differently from editorial estimates', () => {
    const verifiedTool: ToolWithDecisionAxes = {
      ...decisionTools[1],
      decisionAxes: { ...decisionTools[1].decisionAxes, source: 'verified-benchmark' },
    };
    const result = matchPrompt('Analizar un documento de 100000 tokens con contexto largo', [verifiedTool]);

    expect(result.matches[0].evidence.join(' ').toLowerCase()).toContain('benchmark verificado');
  });

  it('does not treat a cost percentage as a quality threshold', () => {
    const result = matchPrompt('Reducir el coste operativo un 20% en un pipeline de desarrollo', decisionTools);

    expect(result.analysisNotes).toEqual([]);
    expect(result.constraints).not.toContain('umbral de calidad: 20%');
  });
});