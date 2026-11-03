export type PromptTool = {
  id: number;
  name: string;
  category: string;
  provider: string;
  summary: string;
  useCase: string;
  price: string;
  score: number;
  decisionAxes?: DecisionAxes;
};

export type DecisionAxes = {
  capability?: 'routine' | 'balanced' | 'advanced';
  cost?: 'low' | 'moderate' | 'high';
  latency?: 'fast' | 'balanced' | 'slow';
  privacy?: 'local' | 'cloud' | 'managed-cloud';
  contextTokens?: number;
  source: 'editorial-estimate' | 'verified-benchmark';
};

export type PromptMatchStatus = 'results' | 'needs-refinement';

export type ToolMatch = {
  tool: PromptTool;
  fitScore: number;
  reasons: string[];
  evidence: string[];
  tradeoffs: string[];
};

export type PromptMatchResult = {
  intent: string;
  taskTypes: string[];
  constraints: string[];
  analysisNotes: string[];
  status: PromptMatchStatus;
  matches: ToolMatch[];
};

type TaskIntent = {
  label: string;
  terms: string[];
  categories: string[];
};

const TASK_INTENTS: TaskIntent[] = [
  {
    label: 'desarrollo',
    terms: ['code', 'codigo', 'program', 'software', 'debug', 'depur', 'codebase', 'repositorio', 'desarroll'],
    categories: ['Developer', 'Assistant'],
  },
  {
    label: 'investigación',
    terms: ['investig', 'research', 'fuentes', 'citar', 'busqueda', 'verificar', 'actualidad', 'evidence'],
    categories: ['Research', 'Assistant'],
  },
  {
    label: 'creación de imágenes',
    terms: ['imagen', 'image', 'visual', 'disen', 'arte', 'ilustr', 'dibujo', 'branding'],
    categories: ['Image'],
  },
  {
    label: 'redacción',
    terms: ['redact', 'escribir', 'write', 'writing', 'texto', 'contenido', 'resumen', 'documentacion'],
    categories: ['Assistant', 'Productivity'],
  },
  {
    label: 'productividad',
    terms: ['productividad', 'productivity', 'planificar', 'organizar', 'workflow', 'automatizar'],
    categories: ['Productivity', 'Assistant'],
  },
  {
    label: 'clasificación y extracción',
    terms: ['clasificacion', 'classification', 'clasificar', 'etiquetar', 'extraccion', 'extraer', 'parsear'],
    categories: ['Assistant', 'Productivity', 'Research'],
  },
  {
    label: 'razonamiento complejo',
    terms: ['razonamiento', 'razonar', 'arquitectura', 'trade-off', 'matematicas', 'algoritmo', 'logica formal'],
    categories: ['Assistant', 'Research', 'Developer'],
  },
  {
    label: 'atención al cliente',
    terms: ['atencion al cliente', 'soporte', 'chatbot', 'conversaciones'],
    categories: ['Assistant', 'Productivity'],
  },
];

const STOP_WORDS = new Set([
  'about', 'also', 'and', 'are', 'como', 'con', 'de', 'del', 'el', 'en', 'for', 'from', 'help', 'how',
  'la', 'las', 'lo', 'los', 'me', 'my', 'need', 'necesito', 'of', 'para', 'por', 'que', 'quiero', 'the',
  'this', 'to', 'una', 'un', 'una', 'use', 'using', 'with', 'y',
]);

const normalize = (value: string): string =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

const tokenize = (value: string): string[] =>
  normalize(value)
    .match(/[a-z0-9]+/g)
    ?.filter((token) => token.length > 2 && !STOP_WORDS.has(token)) ?? [];

const containsTerm = (normalizedText: string, terms: string[]): boolean =>
  terms.some((term) => normalizedText.includes(normalize(term)));

export function matchPrompt(
  prompt: string,
  tools: readonly PromptTool[],
  refinedIntent = '',
): PromptMatchResult {
  const taskText = refinedIntent.trim() || prompt;
  const normalizedTaskText = normalize(taskText);
  const promptTokens = new Set(tokenize(taskText));

  if (!normalizedTaskText.trim()) {
    return { intent: '', taskTypes: [], constraints: [], analysisNotes: [], status: 'needs-refinement', matches: [] };
  }

  const detectedIntents = TASK_INTENTS.filter((intent) => containsTerm(normalizedTaskText, intent.terms));
  const taskTypes = [...new Set(detectedIntents.map((intent) => intent.label))];
  const localConstraint = containsTerm(normalizedTaskText, ['local', 'privad', 'on-premise', 'offline', 'localmente']);
  const sensitiveDataConstraint = containsTerm(normalizedTaskText, ['sensible', 'confidencial', 'bancari', 'medic', 'financier', 'legal', 'saldo']) &&
    containsTerm(normalizedTaskText, ['no salir', 'no pueden salir', 'entorno del cliente', 'dentro del entorno', 'local', 'privad']);
  const lowLatencyConstraint = containsTerm(normalizedTaskText, ['menos de 1 segundo', 'menos de un segundo', '<1s', '< 1s', 'tiempo real', 'respuesta inmediata', 'latencia minima']);
  const isProduction = containsTerm(normalizedTaskText, ['produccion', 'production', 'en produccion', 'desplegar']);
  const isDevelopment = containsTerm(normalizedTaskText, ['prototipo', 'desarrollo', 'development', 'experimentar']);
  const volumeMatch = normalizedTaskText.match(/(\d[\d,.]*)\s*(k|m|mil|millones)?\s*(?:llamadas|solicitudes|registros|emails|documentos|conversaciones|formularios)/);
  const volumeValue = volumeMatch ? Number(volumeMatch[1].replace(/[,.]/g, '')) * (volumeMatch[2] === 'k' || volumeMatch[2] === 'mil' ? 1_000 : volumeMatch[2] === 'm' || volumeMatch[2] === 'millones' ? 1_000_000 : 1) : 0;
  const highVolumeConstraint = volumeValue >= 1_000 || containsTerm(normalizedTaskText, ['a escala', 'alto volumen', 'alta frecuencia', 'miles de llamadas']);
  const contextMatch = normalizedTaskText.match(/(\d[\d,.]*)\s*(k|m)?\s*tokens?/);
  const requestedContextTokens = contextMatch ? Number(contextMatch[1].replace(/[,.]/g, '')) * (contextMatch[2] === 'k' ? 1_000 : contextMatch[2] === 'm' ? 1_000_000 : 1) : 0;
  const longContextConstraint = requestedContextTokens >= 100_000 || containsTerm(normalizedTaskText, ['contexto largo', 'contexto extenso', 'documentacion extensa', 'repositorio completo', 'codebase completo']);
  const qualityTerms = '(?:precision|accuracy|exactitud|quality|calidad)';
  const qualityTarget = normalizedTaskText.match(new RegExp(`${qualityTerms}[^\\d]{0,24}(\\d{2,3})\\s*%`)) ??
    normalizedTaskText.match(new RegExp(`(\\d{2,3})\\s*%[^a-z]{0,12}${qualityTerms}`));
  const qualityTargetPercent = Number(qualityTarget?.[1] ?? 0);
  const lowCostConstraint = containsTerm(normalizedTaskText, ['barat', 'econom', 'gratis', 'gratuito', 'free', 'low cost', 'cheap']) ||
    (highVolumeConstraint && isProduction && taskTypes.includes('clasificación y extracción'));
  const constraints = [
    ...(localConstraint ? ['local'] : []),
    ...(sensitiveDataConstraint ? ['datos sensibles en entorno controlado'] : []),
    ...(lowCostConstraint ? ['coste bajo'] : []),
    ...(lowLatencyConstraint ? ['latencia baja'] : []),
    ...(highVolumeConstraint ? ['volumen alto'] : []),
    ...(longContextConstraint ? ['contexto largo'] : []),
    ...(isProduction ? ['producción'] : []),
    ...(isDevelopment ? ['desarrollo/prototipado'] : []),
    ...(qualityTargetPercent > 0 ? [`umbral de calidad: ${qualityTargetPercent}%`] : []),
  ];
  const analysisNotes = qualityTargetPercent > 0
    ? [`El catálogo no contiene resultados de evaluación validados para garantizar un umbral del ${qualityTargetPercent}%; mídelo con datos representativos.`]
    : [];

  const matches = tools
    .map((tool): ToolMatch | null => {
      const searchableText = `${tool.name} ${tool.category} ${tool.provider} ${tool.summary} ${tool.useCase}`;
      const normalizedToolText = normalize(searchableText);
      const toolTokens = new Set(tokenize(searchableText));
      const matchedTokens = [...promptTokens].filter((token) => toolTokens.has(token));
      const reasons: string[] = [];
      const evidence: string[] = [];
      const tradeoffs: string[] = [];
      const axes = tool.decisionAxes;
      const sourceLabel = axes?.source === 'verified-benchmark' ? 'benchmark verificado' : 'estimación editorial';
      let rawScore = 0;

      for (const intent of detectedIntents) {
        if (intent.categories.includes(tool.category)) {
          rawScore += 35;
          reasons.push(`Categoría compatible: ${intent.label}`);
          evidence.push(tool.category);
        }
      }

      if (matchedTokens.length > 0) {
        rawScore += Math.min(35, matchedTokens.length * 8);
        reasons.push(`Coincidencias con la tarea: ${matchedTokens.slice(0, 4).join(', ')}`);
        evidence.push(tool.useCase);
      }

      if (localConstraint) {
        const supportsLocalUse = axes?.privacy === 'local' || tool.category === 'Local' || containsTerm(normalizedToolText, ['local', 'privad', 'offline', 'open source']);
        if (supportsLocalUse) {
          rawScore += 25;
          reasons.push('Ajuste para uso local o privado');
          evidence.push(tool.summary);
        } else {
          tradeoffs.push('El catálogo no indica una opción local o de privacidad equivalente.');
        }
      }

      if (lowCostConstraint) {
        const isLowCost = axes?.cost === 'low' || (!axes?.cost && ['Low', 'Free', 'Freemium', 'Included'].includes(tool.price));
        if (isLowCost) {
          rawScore += 20;
          reasons.push('Ajuste con la restricción de coste bajo');
          evidence.push(`Precio: ${tool.price}`);
        } else {
          tradeoffs.push(`El plan indicado es ${tool.price}, no identificado como gratuito o de coste bajo.`);
        }
      }

      if (sensitiveDataConstraint) {
        if (axes?.privacy === 'local') {
          rawScore += 30;
          reasons.push(`Privacidad: ejecución local indicada (${sourceLabel})`);
          evidence.push(`Modo de despliegue local (${sourceLabel})`);
        } else {
          tradeoffs.push('La ficha no confirma despliegue dentro del entorno controlado del cliente.');
        }
      }

      if (lowLatencyConstraint) {
        if (axes?.latency === 'fast') {
          rawScore += 25;
          reasons.push(`Latencia: perfil rápido (${sourceLabel})`);
          evidence.push(`Perfil de latencia rápido (${sourceLabel})`);
        } else if (axes?.latency) {
          tradeoffs.push(`El perfil editorial de latencia es ${axes.latency}, no el más rápido disponible.`);
        } else {
          tradeoffs.push('La ficha no contiene una medición de latencia verificada.');
        }
      }

      if (highVolumeConstraint && isProduction) {
        if (axes?.cost === 'low') {
          rawScore += 20;
          reasons.push('Coste relativo bajo para un flujo de producción con volumen alto');
          evidence.push(`Tier de coste bajo (${sourceLabel})`);
        } else if (!axes?.cost) {
          tradeoffs.push('El catálogo no permite estimar el coste operativo para este volumen.');
        }
        if (taskTypes.includes('clasificación y extracción') && axes?.capability === 'routine') {
          rawScore += 10;
          reasons.push('Capacidad adecuada para clasificación/extracción rutinaria a escala');
        }
      }

      if (isDevelopment && axes?.capability === 'advanced') {
        rawScore += 8;
        reasons.push('Capacidad avanzada adecuada para experimentación durante desarrollo');
      }

      if (longContextConstraint) {
        if (axes?.contextTokens && (!requestedContextTokens || axes.contextTokens >= requestedContextTokens)) {
          rawScore += 75;
          reasons.push(`Ventana de contexto suficiente (${sourceLabel}): ${axes.contextTokens.toLocaleString('es-ES')} tokens`);
          evidence.push(`Contexto: ${axes.contextTokens.toLocaleString('es-ES')} tokens (${sourceLabel})`);
        } else if (axes?.contextTokens && requestedContextTokens > axes.contextTokens) {
          tradeoffs.push(`La ventana indicada (${axes.contextTokens.toLocaleString('es-ES')} tokens) no cubre el requisito de ${requestedContextTokens.toLocaleString('es-ES')} tokens.`);
        } else {
          tradeoffs.push('La ficha no especifica ventana de contexto; valida el tamaño antes de elegir.');
        }
      }

      if (qualityTargetPercent > 0) {
        tradeoffs.push(`No hay benchmark validado que garantice precisión del ${qualityTargetPercent}%; requiere evaluación propia.`);
      }

      if (rawScore === 0) {
        return null;
      }

      if (tool.summary.trim()) {
        evidence.push(tool.summary);
      }

      return {
        tool,
        fitScore: Math.min(100, rawScore),
        reasons: [...new Set(reasons)],
        evidence: [...new Set(evidence)],
        tradeoffs,
      };
    })
    .filter((match): match is ToolMatch => match !== null)
    .sort((left, right) => right.fitScore - left.fitScore || right.tool.score - left.tool.score || left.tool.name.localeCompare(right.tool.name))
    .slice(0, 5);

  return {
    intent: taskTypes.length > 0 ? taskTypes.join(', ') : refinedIntent.trim() || 'Consulta general',
    taskTypes,
    constraints,
    analysisNotes,
    status: matches.length > 0 ? 'results' : 'needs-refinement',
    matches,
  };
}