# Comparación entre herramientas

## Objetivo
Permitir al usuario comparar dos o más herramientas IA en una misma vista para identificar diferencias relevantes por caso de uso, precio, funcionalidades y valor.

## User Stories
- Como usuario evaluador, quiero comparar herramientas lado a lado para elegir la mejor opción.
- Como usuario de negocio, quiero ver diferencias clave sin tener que revisar cada ficha por separado.
- Como usuario técnico, quiero analizar capacidad, coste y uso recomendado antes de decidir.

## Acceptance Criteria
- El usuario puede seleccionar al menos dos herramientas para comparar.
- La vista muestra una matriz con criterios homogéneos entre herramientas.
- Se resaltan diferencias clave entre opciones comparadas.
- La comparación incluye información de precio, capacidades y casos de uso.
- El usuario puede cambiar la selección sin perder el contexto de la comparación.

## Business Rules
- Los criterios de comparación deben ser consistentes entre herramientas del mismo tipo.
- La comparación solo debe incluir atributos verificables o claramente contextualizados.
- Los datos se deben presentar de forma legible y con estructura clara.
- Cuando los planes o precios no son comparables, debe indicarse explícitamente.

## Edge Cases
- Una herramienta no cuenta con datos para ciertos criterios.
- Dos herramientas tienen precios muy distintos por estructura de negocio.
- El usuario intenta comparar más de 3 herramientas en una sola vista.
- El contenido no es homogéneo entre herramientas o categorías.

## Test Scenarios
- Verificar que se permite comparar dos herramientas correctamente.
- Verificar que la matriz muestra diferencias relevantes con claridad.
- Verificar que una herramienta sin datos aparece con indicador correspondiente.
- Verificar que el cambio de herramientas actualiza la comparación sin errores.
- Verificar que la experiencia visual sigue siendo clara en comparación multiherramienta.
