# Catálogo IA

## Objetivo
El catálogo debe permitir a los usuarios descubrir, filtrar y evaluar herramientas de IA de forma rápida, clara y comparativa, con información estructurada y confiable.

## User Stories
- Como usuario nuevo, quiero ver un catálogo centralizado de herramientas IA para descubrir opciones relevantes.
- Como usuario con necesidad específica, quiero filtrar por categoría y caso de uso para reducir el tiempo de búsqueda.
- Como usuario interesado en decisiones, quiero ver información clave de cada herramienta para compararla sin entrar en detalles técnicos excesivos.

## Acceptance Criteria
- El catálogo muestra una lista estructurada de herramientas IA con nombre, categoría, proveedor y caso de uso principal.
- El usuario puede buscar por nombre, palabra clave o categoría.
- El usuario puede aplicar filtros por categoría, precio, nivel de uso y caso de uso.
- Cada tarjeta de herramienta incluye al menos una descripción breve, puntos clave y CTA de detalle o comparación.
- El catálogo mantiene el estado de filtros y resultados al navegar entre vistas.

## Business Rules
- Las herramientas deben estar organizadas por categoría y caso de uso.
- Las fichas deben usar una estructura homogénea para evitar inconsistencia editorial.
- La información de precio y plan debe presentarse en formato normalizado.
- Se debe distinguir entre información objetiva, valoraciones y recomendaciones.

## Edge Cases
- Búsqueda sin resultados.
- Filtros incompatibles o combinados demasiado restrictivos.
- Herramientas con múltiples categorías o casos de uso.
- Información incompleta o faltante en una ficha.
- Nombre de herramienta duplicado o similar.

## Test Scenarios
- Verificar que el catálogo carga con la lista completa de herramientas.
- Verificar búsqueda por término específico devuelve resultados esperados.
- Verificar que un filtro combinado reduce resultados correctamente.
- Verificar que una herramienta sin datos completos se muestre con estado visual claro.
- Verificar que la navegación desde la tarjeta a detalle funciona sin perder contexto.
