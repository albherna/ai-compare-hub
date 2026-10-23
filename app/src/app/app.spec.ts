import { beforeEach, describe, expect, it } from 'vitest';
import { App } from './app';
import type { PromptMatchResult } from './prompt-matcher';

describe('App', () => {
  let app: App & {
    title: () => string;
    language: () => 'es' | 'en';
    labels: () => {
      clearFilters: string;
      catalog: string;
      compareTools: string;
      compareEmpty: string;
      compareSelectionHint: string;
      favorites: string;
      favoritesEmpty: string;
      favoriteTool: string;
      removeFavorite: string;
      recommendations: string;
      recommendationEmpty: string;
      profileTitle: string;
      promptTitle: string;
      promptPrivacyNotice: string;
      promptFitNote: string;
    };
    tools: () => Array<{ name: string; category: string; useCase: string; price: string; score: number }>;
    filteredTools: () => Array<{ category: string; name: string; id: number }>;
    compareToolsList: () => Array<{ id: number; name: string }>;
    comparisonRows: () => Array<{ key: string; values: string[] }>;
    favoritesList: () => Array<{ id: number; name: string }>;
    recommendedTools: () => Array<{ id: number; name: string; reason: string; matchScore: number }>;
    setRecommendationProfile: (profile: { objective: string; budget: string; experience: string }) => void;
    searchTerm: { set: (value: string) => void };
    updateLanguage: (event: { target: { value: string } }) => void;
    selectCategory: (category: string) => void;
    clearFilters: () => void;
    clearComparison: () => void;
    toggleCompareTool: (toolId: number) => void;
    isToolSelectedForComparison: (toolId: number) => boolean;
    toggleFavorite: (toolId: number) => void;
    isFavorite: (toolId: number) => boolean;
    promptText: { set: (value: string) => void };
    updatePromptIntent: (event: { target: { value: string } }) => void;
    promptResult: () => PromptMatchResult | null;
    promptInputError: () => string;
    analyzePrompt: () => void;
  };

  beforeEach(() => {
    app = new App() as unknown as typeof app;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should render the application title', () => {
    expect(app.title()).toContain('AI Compare Hub');
  });

  it('should start in Spanish and render the expected labels', () => {
    expect(app.labels().catalog).toBe('Catálogo');
    expect(app.labels().clearFilters).toBe('Limpiar filtros');
  });

  it('should switch to English through the language selector', () => {
    app.updateLanguage({ target: { value: 'en' } } as any);

    expect(app.language()).toBe('en');
    expect(app.labels().clearFilters).toBe('Clear filters');
    expect(app.labels().catalog).toBe('Catalog');
  });

  it('should include advanced AI models in the catalog', () => {
    expect(app.tools().some((tool) => tool.name === 'Claude Opus 4')).toBe(true);
    expect(app.tools().some((tool) => tool.name === 'GPT-4o')).toBe(true);
    expect(app.tools().some((tool) => tool.name === 'Gemini 2.5 Pro')).toBe(true);
  });

  it('should filter the catalog by category and by search text', () => {
    app.selectCategory('Developer');
    expect(app.filteredTools().every((tool) => tool.category === 'Developer')).toBe(true);

    app.clearFilters();
    app.searchTerm.set('desarrollo');
    expect(app.filteredTools().length).toBeGreaterThan(0);
  });

  it('should allow selecting tools to compare and show a comparison block with at least two items', () => {
    app.toggleCompareTool(1);
    app.toggleCompareTool(2);

    expect(app.isToolSelectedForComparison(1)).toBe(true);
    expect(app.isToolSelectedForComparison(2)).toBe(true);
    expect(app.compareToolsList().length).toBe(2);
  });

  it('should show a proper empty-state message when the user has not selected enough tools', () => {
    app.toggleCompareTool(1);

    expect(app.compareToolsList().length).toBe(1);
    expect(app.labels().compareEmpty).toContain('al menos dos');
  });

  it('should allow saving and removing a tool from the favorites list', () => {
    app.toggleFavorite(1);

    expect(app.isFavorite(1)).toBe(true);
    expect(app.favoritesList().some((tool) => tool.id === 1)).toBe(true);

    app.toggleFavorite(1);
    expect(app.isFavorite(1)).toBe(false);
    expect(app.favoritesList().some((tool) => tool.id === 1)).toBe(false);
  });

  it('should show an empty message when there are no favorite tools yet', () => {
    expect(app.favoritesList().length).toBe(0);
    expect(app.labels().favoritesEmpty).toContain('sin favoritos');
  });

  it('should recommend tools based on objective and budget', () => {
    app.setRecommendationProfile({
      objective: 'desarrollo',
      budget: 'moderate',
      experience: 'advanced',
    });

    expect(app.recommendedTools().length).toBeGreaterThan(0);
    expect(app.recommendedTools()[0].reason.toLowerCase()).toContain('desarrollo');
    expect(app.recommendedTools()[0].matchScore).toBeGreaterThan(0);
  });

  it('should keep a recommendation panel title and empty-state label available', () => {
    expect(app.labels().recommendations).toContain('Recomendaciones');
    expect(app.labels().recommendationEmpty).toContain('sin recomendaciones');
  });

  it('should analyze the prompt against the local catalog and return candidates', () => {
    app.promptText.set('Necesito ayuda con programación y revisión de código');
    app.analyzePrompt();

    expect(app.promptResult()?.status).toBe('results');
    expect(app.promptResult()?.matches[0].tool.name).toBe('GitHub Copilot');
  });

  it('should expose catalog-based reasons and clarify that fit is relative', () => {
    app.promptText.set('Necesito ayuda con programación y revisión de código');
    app.analyzePrompt();

    expect(app.promptResult()?.matches[0].reasons.length).toBeGreaterThan(0);
    expect(app.promptResult()?.matches[0].evidence.length).toBeGreaterThan(0);
    expect(app.labels().promptFitNote).toContain('no es una probabilidad');
  });

  it('should expose a localized privacy notice and not restore prompts in a new app instance', () => {
    expect(app.labels().promptTitle).toBe('Encuentra la IA adecuada');
    expect(app.labels().promptPrivacyNotice).toContain('no se guarda');

    app.promptText.set('texto confidencial');
    const freshApp = new App() as typeof app;
    expect(freshApp.promptText()).toBe('');

    app.updateLanguage({ target: { value: 'en' } } as any);
    expect(app.labels().promptPrivacyNotice).toContain('not stored');
  });

  it('should replace the detected task when the user corrects the intent', () => {
    app.promptText.set('Necesito ayuda con programación y revisión de código');
    app.analyzePrompt();
    expect(app.promptResult()?.matches[0].tool.name).toBe('GitHub Copilot');

    app.updatePromptIntent({ target: { value: 'investigación de fuentes' } } as any);
    app.analyzePrompt();

    expect(app.promptResult()?.taskTypes).toEqual(['investigación']);
    expect(app.promptResult()?.matches[0].tool.name).toBe('Perplexity');
  });

  it('should reject prompts over 4,000 characters and report unsupported tasks', () => {
    app.promptText.set('x'.repeat(4001));
    app.analyzePrompt();

    expect(app.promptInputError()).toBe(app.labels().promptTooLong);
    expect(app.promptResult()).toBeNull();

    app.promptText.set('Resolver un acertijo sobre volcanes submarinos');
    app.analyzePrompt();
    expect(app.promptResult()?.status).toBe('needs-refinement');
  });

  it('should let the user add a recommended tool to the existing comparison', () => {
    app.promptText.set('Necesito ayuda con programación y revisión de código');
    app.analyzePrompt();
    const recommendedToolId = app.promptResult()?.matches[0].tool.id;

    expect(recommendedToolId).toBeDefined();
    app.toggleCompareTool(recommendedToolId!);

    expect(app.compareToolsList().some((tool) => tool.id === recommendedToolId)).toBe(true);
  });

  it('should favor fast, low-cost models for high-volume production classification', () => {
    app.promptText.set('En producción clasificar 50000 registros al día en menos de 1 segundo y con coste bajo');
    app.analyzePrompt();

    expect(['Claude Haiku 3.5', 'Gemini 2.0 Flash']).toContain(app.promptResult()?.matches[0].tool.name);
    expect(app.promptResult()?.constraints).toContain('latencia baja');
    expect(app.promptResult()?.constraints).toContain('volumen alto');
  });

  it('should favor local models for sensitive data and wide-context models for large repositories', () => {
    app.promptText.set('Analizar saldos bancarios privados que no pueden salir del entorno local');
    app.analyzePrompt();
    expect(app.promptResult()?.matches[0].tool.category).toBe('Local');
    expect(app.promptResult()?.matches[0].reasons.join(' ').toLowerCase()).toContain('privacidad');

    app.promptText.set('Analizar un repositorio completo de 500000 tokens con contexto largo');
    app.analyzePrompt();
    expect(app.promptResult()?.matches[0].tool.name).toBe('Gemini 2.5 Pro');
  });

  it('should surface a quality-threshold caveat rather than claiming validated accuracy', () => {
    app.promptText.set('En producción extraer importes con precisión mínima del 97%');
    app.analyzePrompt();

    expect(app.promptResult()?.analysisNotes.join(' ')).toContain('97%');
    expect(app.promptResult()?.matches.every((match) => match.tradeoffs.join(' ').includes('97%'))).toBe(true);
  });

  it('should compare context windows and deployment privacy from catalog metadata', () => {
    app.toggleCompareTool(2);
    app.toggleCompareTool(7);

    const contextRow = app.comparisonRows().find((row) => row.key === 'context');
    expect(contextRow?.values[0]).toContain('200.000');
    expect(contextRow?.values[1]).toContain('1.000.000');

    app.clearComparison();
    app.toggleCompareTool(2);
    app.toggleCompareTool(12);
    const privacyRow = app.comparisonRows().find((row) => row.key === 'privacy');
    expect(privacyRow?.values[0].toLowerCase()).toContain('cloud');
    expect(privacyRow?.values[1].toLowerCase()).toContain('local');
  });
});
