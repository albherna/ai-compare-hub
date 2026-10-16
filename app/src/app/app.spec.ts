import { beforeEach, describe, expect, it } from 'vitest';
import { App } from './app';

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
    };
    tools: () => Array<{ name: string; category: string; useCase: string; price: string; score: number }>;
    filteredTools: () => Array<{ category: string; name: string; id: number }>;
    compareToolsList: () => Array<{ id: number; name: string }>;
    favoritesList: () => Array<{ id: number; name: string }>;
    recommendedTools: () => Array<{ id: number; name: string; reason: string; matchScore: number }>;
    setRecommendationProfile: (profile: { objective: string; budget: string; experience: string }) => void;
    searchTerm: { set: (value: string) => void };
    updateLanguage: (event: { target: { value: string } }) => void;
    selectCategory: (category: string) => void;
    clearFilters: () => void;
    toggleCompareTool: (toolId: number) => void;
    isToolSelectedForComparison: (toolId: number) => boolean;
    toggleFavorite: (toolId: number) => void;
    isFavorite: (toolId: number) => boolean;
  };

  beforeEach(() => {
    app = new App() as App & {
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
      };
      tools: () => Array<{ name: string; category: string; useCase: string }>; 
      filteredTools: () => Array<{ category: string; name: string }>; 
      compareToolsList: () => Array<{ id: number; name: string }>;
      favoritesList: () => Array<{ id: number; name: string }>;
      recommendedTools: () => Array<{ id: number; name: string; reason: string; matchScore: number }>;
      setRecommendationProfile: (profile: { objective: string; budget: string; experience: string }) => void;
      searchTerm: { set: (value: string) => void };
      updateLanguage: (event: { target: { value: string } }) => void;
      selectCategory: (category: string) => void;
      clearFilters: () => void;
      toggleFavorite: (toolId: number) => void;
      isFavorite: (toolId: number) => boolean;
    };
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
});
