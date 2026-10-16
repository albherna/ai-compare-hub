import { beforeEach, describe, expect, it } from 'vitest';
import { App } from './app';

describe('App', () => {
  let app: App & {
    title: () => string;
    language: () => 'es' | 'en';
    labels: () => { clearFilters: string; catalog: string };
    tools: () => Array<{ name: string; category: string; useCase: string }>;
    filteredTools: () => Array<{ category: string; name: string }>;
    searchTerm: { set: (value: string) => void };
    updateLanguage: (event: { target: { value: string } }) => void;
    selectCategory: (category: string) => void;
    clearFilters: () => void;
  };

  beforeEach(() => {
    app = new App() as App & {
      title: () => string;
      language: () => 'es' | 'en';
      labels: () => { clearFilters: string; catalog: string };
      tools: () => Array<{ name: string; category: string; useCase: string }>;
      filteredTools: () => Array<{ category: string; name: string }>;
      searchTerm: { set: (value: string) => void };
      updateLanguage: (event: { target: { value: string } }) => void;
      selectCategory: (category: string) => void;
      clearFilters: () => void;
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
});
