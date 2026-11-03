# PRM-001 — Recomendación de modelos a partir de un prompt

## Objetivo
Permitir que una persona describa una tarea mediante un prompt y reciba una selección razonada de agentes o modelos de IA del catálogo que mejor se ajusten al objetivo y a las restricciones detectadas.

## Alcance
- El usuario introduce o pega un prompt y solicita analizarlo.
- El sistema identifica la intención, el tipo de tarea y los requisitos relevantes para la elección de herramienta.
- El sistema recomienda y ordena candidatos existentes en el catálogo; no inventa herramientas fuera de él.
- El sistema muestra por qué encaja cada candidato, qué alternativas existen y qué limitaciones o datos faltan.
- El usuario puede corregir el resumen de intención y volver a solicitar recomendaciones.
- El prompt se utiliza para generar la recomendación; no se envía a los proveedores de las herramientas recomendadas ni se conserva después de la consulta sin consentimiento explícito.

Fuera de alcance: ejecutar el prompt, generar su resultado, conectar con los proveedores para probar modelos, crear un perfil persistente o garantizar un ganador absoluto para toda tarea.

## Ejes de decisión

El matcher considera, cuando el prompt los expresa, estos factores: capacidad necesaria frente a coste; latencia; privacidad y ubicación de los datos; ventana de contexto; y etapa de desarrollo o producción, incluyendo volumen y umbral de calidad esperado. Un eje sin metadata suficiente se muestra como desconocido o como trade-off, no se completa con una cifra inventada.

## User Scenarios & Testing

### User Story 1 — Obtener candidatos a partir de una tarea (Priority: P1)

Como usuario con una tarea concreta, quiero pegar mi prompt y recibir agentes o modelos adecuados sin conocer previamente las categorías del catálogo.

**Why this priority**: Es el valor principal de la feature y entrega un flujo mínimo útil de descubrimiento.

**Independent Test**: Introducir una tarea cubierta por la metadata local y verificar que aparecen candidatos existentes del catálogo ordenados por ajuste.

**Acceptance Scenarios**:
1. **Given** el usuario introduce un prompt no vacío relacionado con desarrollo, **When** solicita recomendaciones, **Then** ve candidatos del catálogo relacionados con desarrollo.
2. **Given** el prompt no contiene requisitos reconocibles por el catálogo, **When** se analiza, **Then** el sistema informa que se necesita refinar la consulta en vez de inventar candidatos.

### User Story 2 — Entender recomendaciones y trade-offs (Priority: P1)

Como usuario que evalúa alternativas, quiero entender por qué se recomienda cada opción y sus limitaciones antes de decidir.

**Why this priority**: La explicabilidad es necesaria para que una lista de modelos sea útil y confiable.

**Independent Test**: Revisar los resultados de una consulta y comprobar que cada candidato tiene razones basadas en campos existentes del catálogo y que se indican datos ausentes.

**Acceptance Scenarios**:
1. **Given** una consulta con candidatos, **When** se muestran resultados, **Then** cada candidato incluye motivos vinculados a capacidades, casos de uso o restricciones del catálogo.
2. **Given** falta información relevante del candidato, **When** se muestran sus resultados, **Then** el sistema identifica la limitación y no presenta datos supuestos como hechos.

### User Story 3 — Corregir la interpretación (Priority: P2)

Como usuario cuya intención se interpretó incorrectamente, quiero corregir los requisitos detectados y volver a obtener recomendaciones.

**Why this priority**: La interpretación local puede ser aproximada; la corrección directa mejora la relevancia sin requerir un perfil persistente.

**Independent Test**: Editar el resumen de intención de una consulta y verificar que el conjunto u orden de candidatos se recalcula.

**Acceptance Scenarios**:
1. **Given** el sistema presenta una intención detectada, **When** el usuario la modifica y vuelve a analizar, **Then** el sistema recalcula candidatos usando la intención corregida.
2. **Given** la consulta es ambigua o incompatible, **When** el usuario corrige sus requisitos, **Then** puede resolver la ambigüedad o recibe una explicación clara de lo que sigue sin estar cubierto.

### User Story 4 — Mantener el prompt privado (Priority: P1)

Como usuario que puede incluir información sensible, quiero saber cómo se trata mi prompt y que no se envíe a las herramientas evaluadas.

**Why this priority**: La privacidad condiciona el diseño del flujo y debe cumplirse desde la primera entrega.

**Independent Test**: Inspeccionar el flujo y comprobar que el análisis no hace solicitudes remotas, no persiste el prompt y no ejecuta su contenido contra candidatos.

**Acceptance Scenarios**:
1. **Given** el usuario envía un prompt, **When** se calcula la recomendación, **Then** el texto se procesa localmente y no se envía a proveedores de herramientas.
2. **Given** el usuario recarga o abandona la vista, **When** vuelve a abrir la aplicación, **Then** el prompt anterior no se restaura.

## Acceptance Criteria
- El usuario puede enviar texto no vacío para iniciar el análisis y recibe un estado claro mientras se procesa.
- El resultado resume la intención y los requisitos detectados antes o junto a las recomendaciones.
- El usuario puede modificar el resumen de intención o requisitos y volver a ejecutar la consulta.
- Las recomendaciones solo incluyen agentes o modelos registrados en el catálogo.
- Los resultados se ordenan por adecuación a los requisitos detectados y cada candidato incluye una explicación comprensible.
- El resultado distingue datos del catálogo, estimaciones y recomendaciones editoriales, y señala cuándo faltan datos relevantes.
- El sistema considera los ejes de coste, latencia, privacidad/despliegue, contexto y etapa de uso cuando hay metadata pertinente.
- Las cifras de contexto, tiers de coste y perfiles cualitativos de capacidad/latencia se etiquetan como estimaciones editoriales salvo que exista benchmark verificable.
- Si el usuario fija un umbral de calidad/accuracy, el sistema indica que debe validarse con datos representativos y no promete alcanzarlo sin benchmark verificable.
- El usuario puede revisar alternativas y sus ventajas o limitaciones, y acceder al detalle o comparar candidatos desde el resultado.
- Si el prompt es ambiguo, no corresponde a herramientas del catálogo o no hay información suficiente, el sistema explica la limitación y permite refinar la consulta en lugar de afirmar un ganador sin fundamento.
- El prompt no se ejecuta contra los modelos recomendados, no se envía a sus proveedores y no se almacena tras la consulta salvo consentimiento explícito.
- El flujo es operable con teclado y lectores de pantalla, y presenta errores y estados vacíos de forma accesible.

## Business Rules
- La recomendación es contextual: “mejor ajuste para los requisitos detectados”, no una afirmación universal de que un modelo es el mejor.
- Los candidatos y las razones deben basarse en capacidades, casos de uso, restricciones y datos disponibles en el catálogo.
- Popularidad o posicionamiento editorial no pueden ser el único criterio de ordenación.
- Los requisitos operativos (coste, latencia, privacidad, contexto, producción/desarrollo) deben poder influir en el ajuste y ser visibles en las razones.
- Un campo ausente nunca se interpreta como que el modelo cumple el requisito.
- Los objetivos de precisión no se infieren de puntuaciones globales ni de perfiles editoriales.
- El sistema debe hacer visible la incertidumbre y no completar con hechos no verificados los datos ausentes.
- El análisis clasifica el texto para orientar una decisión; no ejecuta instrucciones contenidas en el prompt ni produce la respuesta solicitada por este.
- La consulta no requiere perfil de usuario ni cuenta para ofrecer una recomendación inicial.
- El usuario debe poder continuar desde el resultado hacia la ficha de herramienta o una comparación convencional.

## Edge Cases
- Prompt vacío, compuesto solo por espacios o que excede el límite admitido.
- Prompt ambiguo, con varios objetivos o con requisitos incompatibles.
- Prompt que solicita una tarea fuera de las categorías cubiertas por el catálogo.
- No hay candidatos suficientes o los candidatos tienen información incompleta o desactualizada.
- El usuario incluye datos personales, confidenciales o instrucciones que intentan cambiar el comportamiento del analizador.
- La consulta falla o tarda más de lo esperado.
- El idioma del prompt no coincide con el idioma de la interfaz.

## Test Scenarios
- Verificar que un prompt válido produce un resumen de intención y recomendaciones del catálogo.
- Verificar que las explicaciones enlazan los requisitos detectados con capacidades o datos existentes del candidato.
- Verificar que editar los requisitos cambia los resultados de forma coherente.
- Verificar que una consulta ambigua o sin candidatos informa la limitación y permite refinarla.
- Verificar que los datos ausentes se indican y no se presentan como hechos.
- Verificar que el prompt no se ejecuta con el candidato ni se persiste o transmite a proveedores sin consentimiento explícito.
- Verificar navegación por teclado, etiquetas accesibles y anuncios de estados de carga y error.

## Success Criteria
- Al menos el 90% de un conjunto de evaluación representativo devuelve una recomendación considerada pertinente frente a los requisitos expresados.
- En condiciones normales, el 95% de las consultas devuelve resultados o una explicación accionable de por qué no puede recomendar en un máximo de 10 segundos.
- El 100% de los resultados muestra una razón para cada candidato y señala los datos relevantes ausentes.
- En pruebas de usabilidad, al menos el 90% de las personas puede identificar la recomendación principal y explicar un motivo de su adecuación sin asistencia.

## Assumptions
- El catálogo existente será la fuente autorizada para candidatos, capacidades, precios y limitaciones.
- Los términos “agente” y “modelo” se representarán como tipos de herramienta IA del catálogo.
- La consulta es efímera por defecto; guardar historial o habilitar tratamiento adicional requerirá consentimiento explícito y una decisión posterior de producto.
- La calidad de la recomendación depende de la cobertura y vigencia del catálogo; el sistema debe comunicar esa dependencia.

## Related Requirements
- FR-002, FR-005, FR-009, FR-010, FR-012, FR-017, FR-026 a FR-037
- NFR-001, NFR-011
- SEC-003, SEC-006, SEC-010