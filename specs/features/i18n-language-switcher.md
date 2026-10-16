# I18N-001 — Language Switcher and Spanish Default

## Objetivo
Permitir que la aplicación de catálogo de IA se visualice inicialmente en español y ofrecer un selector de idioma para alternar entre español e inglés sin perder el contexto de navegación ni la funcionalidad actual de búsqueda y filtros.

## User Stories
- Como usuario español, quiero ver la interfaz en español por defecto para entender el contenido sin fricción.
- Como usuario internacional, quiero cambiar el idioma del catálogo a inglés para comparar productos en otro idioma.
- Como usuario recurrente, quiero que el idioma seleccionado permanezca coherente con la experiencia visual y con los mensajes de la UI.

## Acceptance Criteria
- La aplicación carga con el idioma español por defecto.
- Existe un selector de idioma visible en la cabecera de la vista de catálogo.
- El selector ofrece, al menos, las opciones "Español" y "English".
- La interfaz traducible (botones, placeholders, mensajes vacíos, encabezados y textos secundarios) cambia al idioma seleccionado.
- La lógica de búsqueda, los filtros y la lista de productos siguen funcionando igual con ambos idiomas.
- La experiencia no rompe la navegación ni la estructura del catálogo actual.

## Business Rules
- El idioma por defecto debe ser español para cumplir la experiencia inicial del producto.
- El selector debe ser simple, accesible y visible sin complicar la navegación principal.
- Los nombres de productos y categorías se mantienen en su nomenclatura original para conservar precisión comercial.
- Los textos genéricos de la UI deben estar localizados y mantener un estilo homogéneo.

## Edge Cases
- Cambio de idioma mientras se aplica un filtro activo.
- Búsqueda en un idioma y cambio de interfaz sin perder los resultados actuales.
- Estado vacío cuando no hay coincidencias con el filtro activo en cualquier idioma.
- Selector sin valor o con un valor inesperado.

## Test Scenarios
- Verificar que la interfaz carga en español por defecto.
- Verificar que el selector de idioma muestra las opciones correctas.
- Verificar que cambiar a inglés actualiza los textos de UI.
- Verificar que cambiar a español restaura los textos localizados.
- Verificar que el catálogo sigue mostrando y filtrando resultados con ambos idiomas.
- Verificar que el estado vacío mantiene el mensaje correcto en cada idioma.

## Related Requirements
- CAT-001
- FR-001
- FR-018
