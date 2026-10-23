# UI / Pages

## 1. Objetivo de la experiencia

La experiencia de usuario de AI Compare Hub debe ser rápida, clara y orientada a la decisión. La estructura de navegación debe permitir al usuario pasar de la exploración básica a la comparación y a la recomendación sin perder contexto ni claridad.

## 2. Sitemap

```text
Home
├── Discover
│   ├── Search
│   ├── Categories
│   ├── Featured Tools
│   └── Trending Tools
├── Tool Detail
│   ├── Overview
│   ├── Capabilities
│   ├── Pricing
│   ├── Benchmarks
│   └── Recommended alternatives
├── Compare
│   ├── Select tools
│   ├── Comparison matrix
│   ├── Side-by-side summary
│   └── Save comparison
├── Recommendations
│   ├── Based on profile
│   ├── Based on use case
│   └── Best alternatives
├── Prompt Matcher
│   ├── Prompt input
│   ├── Detected intent and requirements
│   ├── Ranked agent/model recommendations
│   └── Alternatives and comparison
├── Profile
│   ├── My goals
│   ├── Preferences
│   ├── Saved comparisons
│   └── My recommendations
└── About / Editorial
    ├── Methodology
    ├── Categories
    └── Privacy and policy
```

## 3. Páginas principales

### 3.1 Home
**Objetivo**: permitir la entrada rápida al producto y facilitar la exploración inicial.

**Contenido principal**:
- Hero con promesa de comparación
- Acceso rápido a categorías principales
- Herramientas destacadas
- Recomendaciones iniciales por perfil
- CTA a comparador

### 3.2 Discover / Explore
**Objetivo**: localizar herramientas relevantes por criterio y necesidad.

**Contenido principal**:
- Búsqueda por texto
- Filtros por categoría, precio y uso
- Ordenación por relevancia
- Cards de herramientas con resumen ejecutivo

### 3.3 Tool Detail
**Objetivo**: sumar la información necesaria para decidir sin saturar al usuario.

**Contenido principal**:
- Descripción general
- Capacidades y casos de uso
- Planes y precios
- Benchmarks y métricas
- Ventajas, limitaciones y mejor para
- CTA a comparar

### 3.4 Compare
**Objetivo**: facilitar la evaluación comparativa entre dos o más herramientas.

**Contenido principal**:
- Selector de herramientas
- Matriz de comparación directa
- Resumen diferencial
- Visualización de fortalezas y debilidades
- Criterios de valor por caso de uso

### 3.5 Recommendations
**Objetivo**: orientar a cada usuario hacia la opción más adecuada.

**Contenido principal**:
- Recomendación según perfil
- Recomendación por caso de uso
- Puntaje relativo
- Explicación del porqué

### 3.6 Prompt Matcher
**Objetivo**: encontrar agentes o modelos adecuados para una tarea descrita en lenguaje natural, sin exigir que el usuario conozca previamente el catálogo.

**Contenido principal**:
- Campo para introducir el prompt y estado de análisis
- Resumen editable de intención, tarea y requisitos detectados
- Candidatos ordenados con explicación, limitaciones y datos faltantes
- Acciones para refinar la consulta, abrir un detalle o comparar alternativas
- Aviso claro sobre el tratamiento efímero del prompt

### 3.7 Profile
**Objetivo**: recoger contexto del usuario para mejorar recomendaciones.

**Contenido principal**:
- Objetivos personales o profesionales
- Nivel de experiencia
- Presupuesto
- Categorías de interés
- Herramientas guardadas

### 3.8 Editorial / About
**Objetivo**: aportar credibilidad y trazabilidad sobre el contenido.

**Contenido principal**:
- Metodología de comparación
- Cómo se evalúan benchmarks
- Política de precios y normalización
- Política de privacidad y cookies

## 4. Flujos principales

### Flujo 1: Descubrir herramienta
1. El usuario entra a Home.
2. Explora categorías o usa búsqueda.
3. Aplica filtros.
4. Revisa cards de herramientas.
5. Abre una página de detalle.
6. Decide si desea comparar o volver al catálogo.

### Flujo 2: Comparar herramientas
1. El usuario selecciona dos o más herramientas.
2. Sistema genera vista comparativa en paralelo.
3. El usuario analiza capacidades, precios y benchmarks.
4. Se muestran diferencias clave y recomendaciones contextuales.
5. El usuario puede guardar o exportar la comparación.

### Flujo 3: Recibir recomendación
1. El usuario completa o actualiza perfil.
2. Aplica caso de uso principal.
3. El sistema ofrece top recomendaciones.
4. El usuario revisa explicación y comparativa de alternativas.
5. El usuario decide si explora detalle o compara. 

### Flujo 4: Regresar a comparación guardada
1. El usuario accede desde perfil o historial.
2. Revisa comparativas previas.
3. Actualiza filtros o selecciona una alternativa.
4. Continúa la decisión sin perder contexto.

### Flujo 5: Encontrar una IA a partir de un prompt
1. El usuario introduce un prompt y solicita recomendaciones.
2. El sistema muestra la intención y los requisitos detectados.
3. El usuario confirma o corrige el resumen.
4. El sistema presenta candidatos del catálogo ordenados, con razones y trade-offs.
5. El usuario abre el detalle de una opción, compara alternativas o refina la consulta.

## 5. Navigation Model

### Principios de navegación

- Asegurar un acceso directo a descubrimiento, comparación y recomendaciones.
- Mantener la navegación clara en todas las resoluciones.
- Priorizar acciones clave del usuario en la parte superior o en el primer scroll.
- Reducir clics necesarios para llegar a la comparación útil.

### Navegación global

- Inicio
- Explorar
- Comparar
- Recomendaciones
- Perfil

### Acciones principales por contexto

- En catálogo: filtrar, ordenar, guardar criterio
- En detalle: comparar, ver benchmark, ver precios, recomendar alternativa
- En comparación: cambiar herramientas, identificar ganador por criterio
- En perfil: ajustar preferencias y puntos de decisión

## 6. Layout and UX Priorities

### Priority 1
- Búsqueda y filtros visibles
- Cards de herramientas con información compacta
- CTA de comparación visible

### Priority 2
- Vista de detalle con contenidos bien jerarquizados
- Distinción clara entre factual, comparativo y recomendado

### Priority 3
- Recomendaciones personalizadas y gestión del perfil
- Comparación guardada e historial de decisiones

## 7. UX Risks to Consider

- Demasiada información en la vista de detalle puede generar fricción.
- La comparación puede perder claridad si los atributos no están estandarizados.
- Los benchmarks deben presentarse con contexto para evitar malas interpretaciones.
- Las recomendaciones deben explicarse para mantener confianza del usuario.

## 8. Navigation Standards

- Todas las vistas publicas deben permitir acceso seguro a resultados y contenido clave.
- El estado de comparación debe ser persistente en sesión o perfil según el caso.
- Los filtros deben ser visibles y fácilmente reutilizables.
- La plataforma debe ofrecer retroalimentación clara de acción realizada: selección, guardado, preferencia y recomendación.

## 9. Success Criteria for UX

- Un usuario promedio puede llegar a una marca o herramienta relevante en menos de 3 minutos.
- La comparación de 2 herramientas puede realizarse sin asistencia ni confusión.
- La recomendación del sistema es entendible y justificable.
- La navegación no requiere aprendizaje complejo ni estructura profunda.
