# CAT-001 — Catalog Search and Filtering

## Objetivo
Permitir a los usuarios descubrir herramientas de IA de forma rápida, con búsqueda y filtros que reduzcan el tiempo de decisión y mejoren la relevancia de los resultados.

## User Stories
- Como usuario nuevo, quiero ver un catálogo claro de herramientas IA para descubrir opciones relevantes sin esfuerzo.
- Como usuario con una necesidad concreta, quiero buscar por nombre, categoría o palabra clave para encontrar soluciones alineadas con mi caso de uso.
- Como usuario de negocio, quiero filtrar por precio, nivel de uso y categoría para comparar opciones que se ajusten a mi contexto.
- Como usuario recurrente, quiero mantener el contexto de mi búsqueda al navegar entre resultados y vistas de detalle.

## Acceptance Criteria
- El catálogo muestra una lista de herramientas IA con nombre, categoría, proveedor, caso de uso principal y resumen breve.
- El usuario puede buscar por nombre o por palabra clave.
- El usuario puede aplicar filtros por categoría, precio, nivel de uso y caso de uso.
- El sistema actualiza los resultados en tiempo real o al confirmar la búsqueda/filtro.
- Cuando no hay coincidencias, se muestra un estado vacío con mensaje claro.
- Cada herramienta del listado incluye CTA para ver detalle o comparar.
- El usuario puede limpiar filtros y volver al estado inicial sin perder contexto de navegación.

## Business Rules
- Las herramientas deben estar organizadas por categoría y caso de uso principal.
- El contenido del catálogo debe seguir una estructura homogénea para todas las herramientas.
- La información de precio y plan debe presentarse de forma normalizada y comprensible.
- Los filtros deben ser combinables sin generar resultados inconsistentes.
- La navegación desde el listado a detalle debe conservar el estado de filtros activos si corresponde.

## Edge Cases
- Búsqueda sin resultados.
- Filtros demasiado restrictivos que devuelven cero resultados.
- Nombre de herramienta duplicado o similar en distintas categorías.
- Herramientas con precios no homogéneos o plan freemium/suscripción.
- Datos incompletos en una ficha de herramienta.
- Búsqueda con espacios, caracteres extraños o texto en mayúsculas/minúsculas.

## Test Scenarios
- Verificar que el catálogo carga la lista inicial de herramientas sin errores.
- Verificar que buscar un nombre exacto devuelve la herramienta esperada.
- Verificar que buscar una palabra clave devuelve resultados relevantes.
- Verificar que aplicar un filtro por categoría reduce el conjunto correctamente.
- Verificar que combinar varios filtros mantiene consistencia en los resultados.
- Verificar que cuando no existen coincidencias se muestra un estado vacío claro.
- Verificar que limpiar filtros restaura el listado completo.
- Verificar que al entrar a detalle desde una búsqueda filtrada se conserva el contexto relevante.

## Related Requirements
- FR-001
- FR-002
- FR-003
- FR-015
- FR-018
