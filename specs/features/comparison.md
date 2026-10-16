# COM-001 — Comparison Matrix and Decision Support

## Objetivo
Permitir a los usuarios comparar dos o más herramientas de IA en una misma vista para identificar diferencias relevantes por caso de uso, precio, capacidades, velocidad y valor antes de tomar una decisión.

## User Stories
- Como usuario evaluador, quiero comparar dos o más herramientas lado a lado para elegir la opción más adecuada.
- Como usuario de negocio, quiero ver diferencias clave sin tener que abrir cada ficha por separado.
- Como usuario técnico, quiero analizar capacidad, coste, velocidad y uso recomendado antes de decidir.
- Como usuario recurrente, quiero mantener el contexto de mi comparación mientras cambio herramientas o criterios.

## Acceptance Criteria
- El usuario puede seleccionar al menos dos herramientas para comparar desde el catálogo o desde una vista de detalle.
- La vista de comparación muestra una matriz homogénea con criterios comparables entre herramientas.
- La comparación incluye al menos: precio, capacidad, velocidad, caso de uso principal, integración, fortalezas y limitaciones.
- El sistema resalta diferencias clave entre herramientas en una estructura visual clara y legible.
- Cuando una herramienta no dispone de un dato concreto, se representa explícitamente como “No disponible” o equivalente.
- El usuario puede cambiar las herramientas comparadas sin perder el contexto ni recargar la vista completa.
- El sistema permite comparar de forma clara dos herramientas, y opcionalmente tres o más en una vista extendida.
- La comparación mantiene un orden visual coherente para facilitar la toma de decisión.

## Business Rules
- Los criterios de comparación deben ser consistentes entre herramientas del mismo tipo o categoría.
- La comparación solo debe incluir atributos verificables, normalizados o claramente contextualizados.
- El contenido de la matriz debe ser legible y no depender de largas descripciones para ser entendible.
- Cuando los precios o planes no son comparables, deben indicarse explícitamente las diferencias de modelo de negocio.
- La comparación debe facilitar decisiones basadas en contexto real del usuario, no solo en marketing o branding.
- El sistema debe preservar la lógica del catálogo base: se comparan herramientas con nombre, categoría, proveedor y uso recomendado claros.

## Edge Cases
- Una herramienta no tiene valor para alguno de los criterios comparados.
- Dos herramientas tienen modelos de precios muy distintos o incompatibles entre sí.
- El usuario intenta comparar más de tres herramientas en una misma vista.
- El usuario selecciona la misma herramienta dos veces en la comparación.
- Las herramientas pertenecen a categorías distintas pero comparten un caso de uso general.
- El contenido del catálogo o de la ficha no está actualizado para una herramienta.
- La comparación incluye herramientas con diferentes niveles de madurez o modelo de negocio.

## Test Scenarios
- Verificar que el usuario puede comparar dos herramientas desde el catálogo.
- Verificar que la matriz muestra criterios homogéneos y legibles.
- Verificar que la vista marca correctamente los campos sin información.
- Verificar que cambiar la selección de herramientas actualiza la comparación sin errores.
- Verificar que la comparación mantiene coherencia visual cuando se seleccionan 3 o más herramientas.
- Verificar que una comparación con resultados no homogéneos sigue siendo comprensible.
- Verificar que el usuario puede volver al catálogo sin perder el recorrido de decisión.
- Verificar que el sistema evita duplicar la misma herramienta al comparar.

## Related Requirements
- FR-005
- FR-006
- FR-010
- FR-011
- FR-013
- FR-016
- FR-018
