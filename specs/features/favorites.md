# FAV-001 — Favorites and Saved Shortlist

## Objetivo
Permitir a los usuarios guardar herramientas relevantes como favoritas para revisitarlas más tarde, crear una shortlist de opciones y facilitar la toma de decisión sin perder contexto.

## User Stories
- Como usuario explorador, quiero guardar herramientas que me interesan para revisarlas después.
- Como usuario de negocio, quiero crear una shortlist de opciones relevantes antes de decidir.
- Como usuario recurrente, quiero mantener una lista clara de herramientas elegidas para consultarlas más tarde.
- Como usuario técnico, quiero diferenciar entre herramientas vistas y herramientas priorizadas.

## Acceptance Criteria
- El usuario puede marcar o desmarcar una herramienta como favorita desde el catálogo.
- La lista de favoritos se muestra de forma clara y accesible.
- El usuario puede ver cuántas herramientas tiene guardadas en su shortlist.
- Las herramientas guardadas mantienen nombre, categoría y caso de uso para reconocerlas rápidamente.
- La acción de guardar favorita tiene un feedback visual claro.
- El usuario puede quitar una herramienta de favoritos sin afectar al resto de la lista.
- La vista de favoritos presenta un estado vacío cuando no hay elementos guardados.

## Business Rules
- La acción de favorito debe ser reversible.
- Una herramienta no debe repetirse en la lista de favoritos.
- La shortlist debe reflejar el estado actual del catálogo y no duplicar información.
- El contenido mostrado en favoritos debe ser suficiente para reconocer la herramienta y su propósito.
- La shortlist debe apoyar decisiones de comparación y priorización, sin reemplazar la comparación formal.

## Edge Cases
- El usuario intenta marcar la misma herramienta varias veces.
- La herramienta se elimina del catálogo o cambia su información principal.
- El usuario tiene cero favoritos.
- La lista de favoritos supera la altura de la vista.
- El usuario navega entre catálogo y favoritos sin perder contexto.
- Se mezclan herramientas de distintas categorías en la shortlist.

## Test Scenarios
- Verificar que marcar una herramienta como favorita la añade a la shortlist.
- Verificar que desmarcarla la elimina de la vista sin afectar al resto.
- Verificar que la lista de favoritos no duplica herramientas.
- Verificar que una lista vacía muestra un estado vacío apropiado.
- Verificar que la cantidad de favoritos se actualiza correctamente.
- Verificar que la UI refleja el estado favorito en cada herramienta del catálogo.
- Verificar que el usuario puede volver al catálogo sin perder la sesión de favoritos.

## Related Requirements
- FR-004
- FR-006
- FR-010
- FR-013
- FR-016
