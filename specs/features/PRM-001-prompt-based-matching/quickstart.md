# Quickstart: PRM-001

## Prerequisites

- Node.js compatible con Angular CLI 22 (Node 22.12+, 24.x o 26+ recomendado).
- Dependencias instaladas en `app/`.

## Start the application

Desde la raíz del repositorio, en PowerShell:

```powershell
Set-Location app
npm start
```

Abrir `http://localhost:4200/`.

## Validate the feature

```powershell
npx vitest run --environment jsdom src/app/prompt-matcher.spec.ts src/app/app.spec.ts
npm run build
```

## Manual scenarios

1. Introducir: `Necesito revisar un codebase grande, diseñar una arquitectura y encontrar errores complejos.` Deben aparecer opciones orientadas a desarrollo y contexto largo, con motivos asociados a metadata visible.
2. Editar la intención detectada para priorizar `investigación con fuentes actuales`. Deben cambiar los candidatos/razones si cambia el ajuste.
3. Añadir una necesidad de coste bajo o ejecución local y comprobar que se refleja como criterio o trade-off, no como garantía no sustentada.
4. Enviar un prompt vacío y comprobar que aparece validación accesible sin resultados inventados.
5. Introducir una petición fuera de las tareas cubiertas por el catálogo y comprobar el estado de refinamiento/sin coincidencias.
6. Probar una petición de clasificación en producción de alto volumen con latencia baja y comprobar que prioriza perfiles rápidos y de coste relativo bajo.
7. Probar datos financieros que no pueden salir del entorno y comprobar que prioriza despliegue local, señalando perfiles editoriales.
8. Pedir contexto de 500.000 tokens y comprobar que los candidatos con contexto conocido suficiente aparecen antes que los que no alcanzan el requisito.
9. Solicitar precisión mínima del 97% y comprobar que se recomienda validación con datos representativos, no una garantía.
10. Comparar Sonnet y Gemini, y después Sonnet y Llama; revisar contexto, privacidad y datos no disponibles en la matriz.
11. Recargar la página y comprobar que el prompt no se conserva.
12. Completar el flujo solo con teclado y confirmar etiquetas, foco y anuncios de estado.