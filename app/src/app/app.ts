import { Component, computed, signal } from '@angular/core';
import { matchPrompt, type DecisionAxes, type PromptMatchResult } from './prompt-matcher';

type Benchmark = {
  score: number;
  source: string;
  methodology: string;
  confidence: string;
};

type Tool = {
  id: number;
  name: string;
  category: string;
  provider: string;
  summary: string;
  useCase: string;
  price: string;
  score: number;
  decisionAxes?: DecisionAxes;
  benchmark?: Benchmark;
};

type Language = 'es' | 'en';

type TranslationSet = {
  eyebrow: string;
  clearFilters: string;
  searchPlaceholder: string;
  searchLabel: string;
  catalog: string;
  viewDetails: string;
  noResultsTitle: string;
  noResultsText: string;
  compareTools: string;
  compareSelectionHint: string;
  compareEmpty: string;
  comparisonTitle: string;
  comparisonCriterion: string;
  clearComparison: string;
  unavailable: string;
  rowPrice: string;
  rowCapability: string;
  rowSpeed: string;
  rowContext: string;
  rowPrivacy: string;
  rowUseCase: string;
  rowIntegration: string;
  rowStrengths: string;
  rowLimitations: string;
  favorites: string;
  favoriteTool: string;
  removeFavorite: string;
  favoritesEmpty: string;
  recommendations: string;
  recommendationEmpty: string;
  profileTitle: string;
  promptTitle: string;
  promptDescription: string;
  promptLabel: string;
  promptPlaceholder: string;
  analyzePrompt: string;
  promptIntentLabel: string;
  promptResults: string;
  promptCriteria: string;
  promptAnalysisNote: string;
  promptNoResults: string;
  promptEmpty: string;
  promptTooLong: string;
  promptPrivacyNotice: string;
  promptReasons: string;
  promptTradeoffs: string;
  promptFit: string;
  promptFitNote: string;
  promptCompare: string;
  promptCompareAdded: string;
  promptUpdateResults: string;
  benchmark: string;
  benchmarkSource: string;
  benchmarkMethodology: string;
  benchmarkConfidence: string;
  benchmarkEmpty: string;
};

const translations: Record<Language, TranslationSet> = {
  es: {
    eyebrow: 'AI Compare Hub',
    clearFilters: 'Limpiar filtros',
    searchPlaceholder: 'Buscar por herramienta, categoría o caso de uso',
    searchLabel: 'Buscar herramientas',
    catalog: 'Catálogo',
    viewDetails: 'Ver detalles',
    noResultsTitle: 'No hay herramientas que coincidan con tus filtros.',
    noResultsText: 'Prueba a quitar uno o más filtros o buscar un término más general.',
    compareTools: 'Comparar',
    compareSelectionHint: 'Elige dos o tres herramientas para ver sus diferencias clave.',
    compareEmpty: 'Selecciona al menos dos herramientas para comparar.',
    comparisonTitle: 'Comparación rápida',
    comparisonCriterion: 'Criterio',
    clearComparison: 'Limpiar comparación',
    unavailable: 'No disponible',
    rowPrice: 'Precio',
    rowCapability: 'Capacidad',
    rowSpeed: 'Velocidad',
    rowContext: 'Ventana de contexto',
    rowPrivacy: 'Privacidad y despliegue',
    rowUseCase: 'Caso de uso',
    rowIntegration: 'Integración',
    rowStrengths: 'Fortalezas',
    rowLimitations: 'Limitaciones',
    favorites: 'Favoritos',
    favoriteTool: 'Guardar favorito',
    removeFavorite: 'Quitar favorito',
    favoritesEmpty: 'sin favoritos guardados',
    recommendations: 'Recomendaciones',
    recommendationEmpty: 'sin recomendaciones disponibles',
    profileTitle: 'Perfil de recomendación',
    promptTitle: 'Encuentra la IA adecuada',
    promptDescription: 'Describe lo que quieres hacer y descubre qué modelos del catálogo encajan mejor.',
    promptLabel: 'Describe tu tarea o pega un prompt',
    promptPlaceholder: 'Ej.: Necesito revisar un codebase grande y localizar errores complejos.',
    analyzePrompt: 'Analizar tarea',
    promptIntentLabel: 'Intención detectada (puedes ajustarla)',
    promptResults: 'Modelos y agentes recomendados',
    promptCriteria: 'Ejes considerados',
    promptAnalysisNote: 'Los valores de coste, latencia, contexto y privacidad son estimaciones editoriales, no benchmarks verificados.',
    promptNoResults: 'No encontramos un ajuste claro. Prueba a describir el objetivo con otras palabras.',
    promptEmpty: 'Escribe una tarea para empezar.',
    promptTooLong: 'La consulta no puede superar los 4.000 caracteres.',
    promptPrivacyNotice: 'El análisis se realiza en esta página. Tu prompt no se guarda ni se envía a los proveedores de las herramientas.',
    promptReasons: 'Por qué encaja',
    promptTradeoffs: 'A tener en cuenta',
    promptFit: 'Ajuste',
    promptFitNote: 'Estimación basada en la intención y el catálogo; no es una probabilidad ni una prueba directa del modelo.',
    promptCompare: 'Añadir a comparación',
    promptCompareAdded: 'En comparación',
    promptUpdateResults: 'Actualizar recomendaciones',
    benchmark: 'Benchmark',
    benchmarkSource: 'Fuente',
    benchmarkMethodology: 'Metodología',
    benchmarkConfidence: 'Confianza',
    benchmarkEmpty: 'sin benchmarks disponibles',
  },
  en: {
    eyebrow: 'AI Compare Hub',
    clearFilters: 'Clear filters',
    searchPlaceholder: 'Search by tool, category or use case',
    searchLabel: 'Search tools',
    catalog: 'Catalog',
    viewDetails: 'View details',
    noResultsTitle: 'No tools match your filters.',
    noResultsText: 'Try removing one or more filters or searching for a broader term.',
    compareTools: 'Compare',
    compareSelectionHint: 'Choose two or three tools to review their key differences.',
    compareEmpty: 'Select at least two tools to compare.',
    comparisonTitle: 'Quick comparison',
    comparisonCriterion: 'Criterion',
    clearComparison: 'Clear comparison',
    unavailable: 'Not available',
    rowPrice: 'Pricing',
    rowCapability: 'Capability',
    rowSpeed: 'Speed',
    rowContext: 'Context window',
    rowPrivacy: 'Privacy and deployment',
    rowUseCase: 'Use case',
    rowIntegration: 'Integration',
    rowStrengths: 'Strengths',
    rowLimitations: 'Limitations',
    favorites: 'Favorites',
    favoriteTool: 'Save favorite',
    removeFavorite: 'Remove favorite',
    favoritesEmpty: 'No favorites saved yet',
    recommendations: 'Recommendations',
    recommendationEmpty: 'No recommendations available yet',
    profileTitle: 'Recommendation profile',
    promptTitle: 'Find the right AI',
    promptDescription: 'Describe what you want to do to find the catalog models that best fit your task.',
    promptLabel: 'Describe your task or paste a prompt',
    promptPlaceholder: 'Example: I need to review a large codebase and find complex bugs.',
    analyzePrompt: 'Analyze task',
    promptIntentLabel: 'Detected intent (you can edit it)',
    promptResults: 'Recommended models and agents',
    promptCriteria: 'Decision criteria considered',
    promptAnalysisNote: 'Cost, latency, context and privacy values are editorial estimates, not verified benchmarks.',
    promptNoResults: 'We could not find a clear match. Try describing your goal in different words.',
    promptEmpty: 'Enter a task to get started.',
    promptTooLong: 'The query cannot exceed 4,000 characters.',
    promptPrivacyNotice: 'Analysis runs on this page. Your prompt is not stored or sent to tool providers.',
    promptReasons: 'Why it fits',
    promptTradeoffs: 'Considerations',
    promptFit: 'Fit',
    promptFitNote: 'Estimate based on intent and catalog data; it is not a probability or a direct model test.',
    promptCompare: 'Add to comparison',
    promptCompareAdded: 'In comparison',
    promptUpdateResults: 'Update recommendations',
    benchmark: 'Benchmark',
    benchmarkSource: 'Source',
    benchmarkMethodology: 'Methodology',
    benchmarkConfidence: 'Confidence',
    benchmarkEmpty: 'No benchmarks available yet',
  },
};

const TOOLS: Tool[] = [
  {
    id: 1,
    name: 'Claude Opus 4',
    category: 'Assistant',
    provider: 'Anthropic',
    summary: 'Razonamiento profundo para análisis complejo, arquitectura y decisiones estratégicas.',
    useCase: 'Arquitectura compleja, código multi-módulo y análisis profundo',
    price: 'Premium',
    score: 99,
    decisionAxes: { capability: 'advanced', cost: 'high', latency: 'slow', privacy: 'cloud', source: 'editorial-estimate' },
    benchmark: {
      score: 96,
      source: 'Benchmarks internos de calidad y precisión',
      methodology: 'Puntuación agregada por precisión, velocidad y coherencia de respuesta',
      confidence: 'Alta',
    },
  },
  {
    id: 2,
    name: 'Claude Sonnet 4',
    category: 'Assistant',
    provider: 'Anthropic',
    summary: 'Equilibrio ideal entre capacidad, velocidad y coste para uso empresarial.',
    useCase: 'Análisis de specs, revisiones de código y soporte de producto',
    price: 'Premium',
    score: 96,
    decisionAxes: { capability: 'advanced', cost: 'moderate', latency: 'balanced', privacy: 'cloud', contextTokens: 200_000, source: 'editorial-estimate' },
    benchmark: {
      score: 94,
      source: 'Evaluación del rendimiento empresarial',
      methodology: 'Promedio ponderado de coste, velocidad y utilidad técnica',
      confidence: 'Alta',
    },
  },
  {
    id: 3,
    name: 'Claude Haiku 3.5',
    category: 'Assistant',
    provider: 'Anthropic',
    summary: 'Respuesta rápida y económica para clasificación, extracción y pipelines de alto volumen.',
    useCase: 'Resúmenes, extracción de datos y automatización ligera',
    price: 'Low',
    score: 88,
    decisionAxes: { capability: 'routine', cost: 'low', latency: 'fast', privacy: 'cloud', source: 'editorial-estimate' },
    benchmark: {
      score: 87,
      source: 'Benchmark de costo-eficiencia',
      methodology: 'Análisis de latencia y tasa de salida bajo coste de operación',
      confidence: 'Media',
    },
  },
  {
    id: 4,
    name: 'GPT-4o',
    category: 'Assistant',
    provider: 'OpenAI',
    summary: 'Modelo multimodal equilibrado con buen rendimiento general y gran integración.',
    useCase: 'Código, análisis visual, asistencia y workflows híbridos',
    price: 'Premium',
    score: 94,
    decisionAxes: { capability: 'balanced', cost: 'moderate', latency: 'balanced', privacy: 'cloud', contextTokens: 128_000, source: 'editorial-estimate' },
    benchmark: {
      score: 92,
      source: 'Benchmark de calidad multimodal',
      methodology: 'Evaluación de respuesta visual, texto y productividad general',
      confidence: 'Alta',
    },
  },
  {
    id: 5,
    name: 'o3',
    category: 'Research',
    provider: 'OpenAI',
    summary: 'Pensamiento extendido para lógica formal, resolución matemática y tareas complejas.',
    useCase: 'Investigación profunda, programación algorítmica y análisis formal',
    price: 'Premium',
    score: 97,
    decisionAxes: { capability: 'advanced', cost: 'high', latency: 'slow', privacy: 'cloud', source: 'editorial-estimate' },
    benchmark: {
      score: 98,
      source: 'Rendimiento en razonamiento avanzado',
      methodology: 'Evaluación de precisión en lógica compleja y resolución de problemas',
      confidence: 'Alta',
    },
  },
  {
    id: 6,
    name: 'o4-mini',
    category: 'Research',
    provider: 'OpenAI',
    summary: 'Versión más ágil para razonamiento intenso con mejor coste por tarea.',
    useCase: 'Lógica de negocio, análisis de escenarios y planteamiento técnico',
    price: 'Moderate',
    score: 91,
  },
  {
    id: 7,
    name: 'Gemini 2.5 Pro',
    category: 'Research',
    provider: 'Google',
    summary: 'Contexto enorme y muy buena capacidad de análisis para codebases extensos.',
    useCase: 'Documentación grande, auditoría de repositorios y análisis de contexto largo',
    price: 'Premium',
    score: 95,
    decisionAxes: { capability: 'advanced', cost: 'moderate', latency: 'balanced', privacy: 'cloud', contextTokens: 1_000_000, source: 'editorial-estimate' },
  },
  {
    id: 8,
    name: 'Gemini 2.0 Flash',
    category: 'Assistant',
    provider: 'Google',
    summary: 'Muy rápida y muy útil en pipelines con respuesta inmediata y bajo coste.',
    useCase: 'Clasificación en tiempo real, interfaces reactivas y atención rápida',
    price: 'Low',
    score: 89,
    decisionAxes: { capability: 'routine', cost: 'low', latency: 'fast', privacy: 'cloud', source: 'editorial-estimate' },
  },
  {
    id: 9,
    name: 'DeepSeek R1',
    category: 'Developer',
    provider: 'DeepSeek',
    summary: 'Modelo muy eficiente para pensamiento y resolución técnica en entornos de ingeniería.',
    useCase: 'Depuración, diseño de soluciones y razonamiento técnico',
    price: 'Low',
    score: 92,
  },
  {
    id: 10,
    name: 'Mistral Large',
    category: 'Developer',
    provider: 'Mistral AI',
    summary: 'Buen equilibrio entre calidad de respuesta, coste y capacidad de integración.',
    useCase: 'Agentes internos, copilots y automatización de flujo de trabajo',
    price: 'Moderate',
    score: 90,
  },
  {
    id: 11,
    name: 'Grok 3',
    category: 'Research',
    provider: 'xAI',
    summary: 'Muy interesante para investigación de tendencias, contenido y análisis web con contexto amplio.',
    useCase: 'Intel de mercado, síntesis y análisis de información actual',
    price: 'Moderate',
    score: 87,
  },
  {
    id: 12,
    name: 'Llama 3.3',
    category: 'Local',
    provider: 'Meta',
    summary: 'Modelo local abierto para despliegues en entorno privado y control total de datos.',
    useCase: 'Procesos locales, privacidad y despliegue en infra propia',
    price: 'Free',
    score: 84,
    decisionAxes: { capability: 'balanced', cost: 'low', privacy: 'local', source: 'editorial-estimate' },
  },
  {
    id: 13,
    name: 'Phi-4',
    category: 'Local',
    provider: 'Microsoft',
    summary: 'Modelo ligero y eficiente para entornos con privacidad y hardware limitado.',
    useCase: 'Casos locales, clasificación y automatización sin salir del entorno',
    price: 'Free',
    score: 82,
    decisionAxes: { capability: 'routine', cost: 'low', privacy: 'local', source: 'editorial-estimate' },
  },
  {
    id: 14,
    name: 'Qwen 2.5',
    category: 'Developer',
    provider: 'Alibaba',
    summary: 'Muy competitivo para desarrollo multiidioma y automatización de código.',
    useCase: 'Generación de código y soporte técnico de ingeniería',
    price: 'Low',
    score: 88,
  },
  {
    id: 15,
    name: 'ChatGPT',
    category: 'Assistant',
    provider: 'OpenAI',
    summary: 'Asistente conversacional para productividad, ideación y análisis.',
    useCase: 'Investigación, redacción y soporte general',
    price: 'Freemium',
    score: 92,
  },
  {
    id: 16,
    name: 'Perplexity',
    category: 'Research',
    provider: 'Perplexity',
    summary: 'Búsqueda asistida con respuestas citadas y contexto web.',
    useCase: 'Investigación y verificación de fuentes',
    price: 'Freemium',
    score: 88,
  },
  {
    id: 17,
    name: 'Notion AI',
    category: 'Productivity',
    provider: 'Notion',
    summary: 'Ayuda para documentación, planificación y trabajo en equipo.',
    useCase: 'Productividad y conocimiento interno',
    price: 'Included',
    score: 84,
  },
  {
    id: 18,
    name: 'GitHub Copilot',
    category: 'Developer',
    provider: 'GitHub',
    summary: 'Asistente de programación para generación, revisión y explicación de código.',
    useCase: 'Desarrollo y soporte de código',
    price: 'Subscription',
    score: 95,
  },
  {
    id: 19,
    name: 'Midjourney',
    category: 'Image',
    provider: 'Midjourney',
    summary: 'Generación visual creativa para concepto, branding y arte.',
    useCase: 'Diseño visual e ideación creativa',
    price: 'Subscription',
    score: 90,
  },
];

@Component({
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('AI Compare Hub');
  protected readonly tools = signal<Tool[]>(TOOLS);
  protected readonly searchTerm = signal('');
  protected readonly selectedCategory = signal('All');
  protected readonly language = signal<Language>('es');
  protected readonly selectedComparisonIds = signal<number[]>([]);
  protected readonly favoriteToolIds = signal<number[]>([]);
  protected readonly recommendationProfile = signal({
    objective: 'desarrollo',
    budget: 'moderate',
    experience: 'advanced',
  });
  protected readonly promptText = signal('');
  protected readonly promptIntentOverride = signal('');
  protected readonly promptIntentEdited = signal(false);
  protected readonly promptResult = signal<PromptMatchResult | null>(null);
  protected readonly promptInputError = signal('');

  protected readonly categories = ['All', ...new Set(TOOLS.map((tool) => tool.category))];

  protected readonly labels = computed(() => translations[this.language()]);
  protected readonly promptMatches = computed(() => this.promptResult()?.matches ?? []);

  protected readonly filteredTools = computed(() => {
    const normalize = (value: string) =>
      value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();

    const query = normalize(this.searchTerm().trim());
    const category = this.selectedCategory();

    return this.tools().filter((tool) => {
      const matchesCategory = category === 'All' || tool.category === category;
      const haystack = normalize(`${tool.name} ${tool.category} ${tool.provider} ${tool.useCase}`);
      const matchesQuery = !query || haystack.includes(query);

      return matchesCategory && matchesQuery;
    });
  });

  protected readonly compareToolsList = computed(() =>
    this.tools().filter((tool) => this.selectedComparisonIds().includes(tool.id)),
  );

  protected readonly favoritesList = computed(() =>
    this.tools().filter((tool) => this.favoriteToolIds().includes(tool.id)),
  );

  protected readonly benchmarkTools = computed(() =>
    this.tools().filter((tool) => Boolean(tool.benchmark)).slice(0, 4),
  );

  protected readonly recommendedTools = computed(() => {
    const profile = this.recommendationProfile();
    const objective = profile.objective.toLowerCase();
    const budget = profile.budget.toLowerCase();

    return this.tools()
      .map((tool) => {
        let matchScore = tool.score;
        const matches: string[] = [];

        if (objective.includes('desarrollo') || objective.includes('code') || objective.includes('dev')) {
          if (tool.category === 'Developer' || tool.category === 'Assistant') {
            matchScore += 12;
            matches.push('desarrollo');
          }
        }

        if (objective.includes('investig') || objective.includes('research')) {
          if (tool.category === 'Research' || tool.category === 'Assistant') {
            matchScore += 10;
            matches.push('investigación');
          }
        }

        if (objective.includes('productividad') || objective.includes('productivity')) {
          if (tool.category === 'Productivity' || tool.category === 'Assistant') {
            matchScore += 8;
            matches.push('productividad');
          }
        }

        if (budget === 'low' && ['Low', 'Free', 'Freemium', 'Included'].includes(tool.price)) {
          matchScore += 8;
          matches.push('coste bajo');
        } else if (budget === 'moderate' && ['Moderate', 'Premium', 'Subscription', 'Included'].includes(tool.price)) {
          matchScore += 6;
          matches.push('equilibrio');
        } else if (budget === 'high' && ['Premium', 'Subscription'].includes(tool.price)) {
          matchScore += 10;
          matches.push('máxima capacidad');
        }

        const reason = matches.length > 0
          ? `Ideal para ${matches.join(' y ')} con buena alineación con tu caso de uso.`
          : 'Buena opción general para tu perfil y contexto actual.';

        return { ...tool, reason, matchScore };
      })
      .sort((left, right) => right.matchScore - left.matchScore)
      .slice(0, 3);
  });

  protected readonly resultLabel = computed(() => {
    const count = this.filteredTools().length;

    if (this.language() === 'en') {
      return `${count} tool${count === 1 ? '' : 's'}`;
    }

    return `${count} herramienta${count === 1 ? '' : 's'}`;
  });

  protected readonly comparisonRows = computed(() => {
    const tools = this.compareToolsList();
    const labels = this.labels();

    const rows = [
      { key: 'price', label: labels.rowPrice },
      { key: 'capability', label: labels.rowCapability },
      { key: 'speed', label: labels.rowSpeed },
      { key: 'context', label: labels.rowContext },
      { key: 'privacy', label: labels.rowPrivacy },
      { key: 'useCase', label: labels.rowUseCase },
      { key: 'integration', label: labels.rowIntegration },
      { key: 'strengths', label: labels.rowStrengths },
      { key: 'limitations', label: labels.rowLimitations },
    ];

    return rows.map((row) => ({
      ...row,
      values: tools.map((tool) => this.getComparisonValue(tool, row.key)),
    }));
  });

  protected updateSearch(event: Event): void {
    const value = (event.target as HTMLInputElement | null)?.value ?? '';
    this.searchTerm.set(value);
  }

  protected updatePromptText(event: Event): void {
    const value = (event.target as HTMLTextAreaElement | null)?.value ?? '';
    this.promptText.set(value);
    this.promptIntentOverride.set('');
    this.promptIntentEdited.set(false);
    this.promptResult.set(null);
    this.promptInputError.set('');
  }

  protected updatePromptIntent(event: Event): void {
    const value = (event.target as HTMLInputElement | null)?.value ?? '';
    this.promptIntentOverride.set(value);
    this.promptIntentEdited.set(true);
  }

  protected analyzePrompt(event?: Event): void {
    event?.preventDefault();
    const prompt = this.promptText().trim();

    if (!prompt) {
      this.promptResult.set(null);
      this.promptInputError.set(this.labels().promptEmpty);
      return;
    }

    if (prompt.length > 4000) {
      this.promptResult.set(null);
      this.promptInputError.set(this.labels().promptTooLong);
      return;
    }

    const refinedIntent = this.promptIntentEdited() ? this.promptIntentOverride() : '';
    const result = matchPrompt(prompt, this.tools(), refinedIntent);
    this.promptResult.set(result);
    this.promptInputError.set('');

    if (!this.promptIntentOverride() && result.taskTypes.length > 0) {
      this.promptIntentOverride.set(result.intent);
    }
  }

  protected selectCategory(category: string): void {
    this.selectedCategory.set(category);
  }

  protected updateLanguage(event: Event): void {
    const value = (event.target as HTMLSelectElement | null)?.value;

    if (value === 'es' || value === 'en') {
      this.language.set(value);
    }
  }

  protected clearFilters(): void {
    this.searchTerm.set('');
    this.selectedCategory.set('All');
  }

  protected toggleCompareTool(toolId: number): void {
    const selected = this.selectedComparisonIds();

    if (selected.includes(toolId)) {
      this.selectedComparisonIds.set(selected.filter((id) => id !== toolId));
      return;
    }

    const next = [...selected, toolId];
    if (next.length > 3) {
      next.shift();
    }

    this.selectedComparisonIds.set(next);
  }

  protected isToolSelectedForComparison(toolId: number): boolean {
    return this.selectedComparisonIds().includes(toolId);
  }

  protected clearComparison(): void {
    this.selectedComparisonIds.set([]);
  }

  protected getComparisonValue(tool: Tool, key: string): string {
    switch (key) {
      case 'price':
        return tool.price;
      case 'capability':
        if (!tool.decisionAxes?.capability) return this.labels().unavailable;
        return this.language() === 'en'
          ? tool.decisionAxes.capability
          : ({ routine: 'Rutinaria', balanced: 'Equilibrada', advanced: 'Avanzada' } as const)[tool.decisionAxes.capability];
      case 'speed':
        return tool.decisionAxes?.latency
          ? `${tool.decisionAxes.latency} (${this.getDecisionSourceLabel(tool)})`
          : this.labels().unavailable;
      case 'context':
        return tool.decisionAxes?.contextTokens
          ? `${tool.decisionAxes.contextTokens.toLocaleString(this.language() === 'en' ? 'en-US' : 'es-ES')} tokens (${this.getDecisionSourceLabel(tool)})`
          : this.labels().unavailable;
      case 'privacy':
        return tool.decisionAxes?.privacy
          ? `${tool.decisionAxes.privacy} (${this.getDecisionSourceLabel(tool)})`
          : this.labels().unavailable;
      case 'useCase':
        return tool.useCase;
      case 'integration':
        return tool.provider === 'OpenAI' || tool.provider === 'Anthropic' || tool.provider === 'Google' ? 'Alta' : 'Media';
      case 'strengths':
        return tool.summary;
      case 'limitations':
        return tool.score < 85 ? 'Menor contexto o precisión' : 'Dependencia del caso de uso';
      default:
        return this.labels().unavailable;
    }
  }

  protected getDecisionSourceLabel(tool: Tool): string {
    if (this.language() === 'en') {
      return tool.decisionAxes?.source === 'verified-benchmark' ? 'verified benchmark' : 'editorial estimate';
    }

    return tool.decisionAxes?.source === 'verified-benchmark' ? 'benchmark verificado' : 'estimación editorial';
  }

  protected comparisonButtonLabel(toolId: number): string {
    return this.isToolSelectedForComparison(toolId) ? 'Quitar' : this.labels().compareTools;
  }

  protected toggleFavorite(toolId: number): void {
    const current = this.favoriteToolIds();

    if (current.includes(toolId)) {
      this.favoriteToolIds.set(current.filter((id) => id !== toolId));
      return;
    }

    this.favoriteToolIds.set([...current, toolId]);
  }

  protected isFavorite(toolId: number): boolean {
    return this.favoriteToolIds().includes(toolId);
  }

  protected favoriteButtonLabel(toolId: number): string {
    return this.isFavorite(toolId) ? this.labels().removeFavorite : this.labels().favoriteTool;
  }

  protected setRecommendationProfile(profile: { objective: string; budget: string; experience: string }): void {
    this.recommendationProfile.set({
      objective: profile.objective || 'desarrollo',
      budget: profile.budget || 'moderate',
      experience: profile.experience || 'advanced',
    });
  }
}
