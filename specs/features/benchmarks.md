# Benchmarks y rankings

## Objetivo
Presentar una evaluación comparativa de rendimiento, calidad y utilidad para que los usuarios puedan entender mejor el valor relativo entre herramientas IA.

## User Stories
- Como usuario que quiere comparar rendimiento, quiero ver benchmarks claros y contextualizados.
- Como usuario de negocio, quiero entender qué tan bien se comporta una herramienta para tareas concretas.
- Como editor, quiero asegurar que los rankings estén basados en datos verificables y claros.

## Acceptance Criteria
- El sistema presenta benchmarks o indicadores de comparación cuando existen datos verificables.
- Cada benchmark incluye contexto sobre la métrica, la metodología y la fuente.
- Los rankings distinguen entre indicadores de rendimiento, coste y adecuación de uso.
- Los datos se muestran con nivel de confianza o alcance explícito cuando aplica.
- Las métricas se usan de forma consistente entre herramientas comparadas.

## Business Rules
- Los benchmarks deben incluir metodología y fuente para asegurar credibilidad.
- No se deben presentar métricas sin contexto ni normalización.
- La comparación debe distinguir entre rendimiento y recomendación editorial.
- Las métricas deben actualizarse y documentarse cuando cambien los datos.

## Edge Cases
- Benchmark ausente para una herramienta.
- Métricas incomparables entre categorías.
- Datos antiguos o no actualizados.
- Diferencias de escala entre proveedores o modelos.
- Media engañosa al comparar herramientas muy distintas.

## Test Scenarios
- Verificar que una herramienta con benchmark visible muestra contexto y fuente.
- Verificar que una herramienta sin benchmark indica claramente la ausencia de datos.
- Verificar que los rankings respetan la metodología y no mezclan métricas distintas.
- Verificar que una métrica inestable o incompleta se marca con advertencia.
- Verificar que el usuario puede entender la diferencia entre rendimiento y recomendación.
