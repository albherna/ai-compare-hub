import { Component, computed, signal } from '@angular/core';

type Tool = {
  id: number;
  name: string;
  category: string;
  provider: string;
  summary: string;
  useCase: string;
  price: string;
  score: number;
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

  protected readonly categories = ['All', ...new Set(TOOLS.map((tool) => tool.category))];

  protected readonly labels = computed(() => translations[this.language()]);

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

  protected readonly resultLabel = computed(() => {
    const count = this.filteredTools().length;

    if (this.language() === 'en') {
      return `${count} tool${count === 1 ? '' : 's'}`;
    }

    return `${count} herramienta${count === 1 ? '' : 's'}`;
  });

  protected updateSearch(event: Event): void {
    const value = (event.target as HTMLInputElement | null)?.value ?? '';
    this.searchTerm.set(value);
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
}
