# Research: PRM-001 Prompt-Based Matching

## Decision 1: Matching local y determinista para el MVP

**Decision**: Analizar el texto en el navegador con reglas deterministas y metadata del catálogo ya cargada en la aplicación.

**Rationale**: El producto no dispone de un backend ni de una integración de análisis. Esta opción entrega el flujo completo sin transmitir el prompt ni introducir credenciales, costes o una nueva dependencia externa.

**Alternatives considered**:
- Llamar a un proveedor LLM desde el navegador: descartado porque expondría credenciales y enviaría el prompt fuera del sitio.
- Añadir un endpoint backend: fuera del alcance técnico actual y requiere diseño de privacidad, seguridad, operación y coste.
- Mantener solo recomendaciones por perfil: no cubre la petición de elegir a partir del texto concreto de una tarea.

## Decision 2: Interpretar intención y requisitos mediante señales explícitas

**Decision**: Normalizar texto, identificar términos y sinónimos de tareas, mapearlos a categorías/capacidades y detectar restricciones explícitas como local/privado o coste bajo. Permitir que el usuario edite el resumen detectado y vuelva a calcular.

**Rationale**: El catálogo incluye categoría, resumen, caso de uso, precio y score; estos campos permiten justificar una coincidencia con evidencia visible. La edición evita ocultar errores de una interpretación heurística.

**Alternatives considered**:
- Clasificación basada solo en score global: descartada porque no representa la intención del prompt ni es explicable.
- Inferencia semántica remota: diferida hasta que haya backend y consentimiento/contexto de tratamiento de datos.

## Decision 3: Ranking contextual y motivos sin declarar un ganador absoluto

**Decision**: Ordenar por coincidencias de intención, requisitos textuales y restricciones, mostrando razones por candidato. El score general del catálogo solo puede actuar como desempate y no como criterio único.

**Rationale**: Respeta PRM-001, FR-028..FR-032 y la regla de que una recomendación es un ajuste contextual, no un benchmark universal.

**Alternatives considered**:
- Mostrar únicamente el primer candidato: descartado porque oculta incertidumbre y trade-offs.
- Tratar el score actual del catálogo como probabilidad: descartado porque no existe metodología documentada para interpretarlo como confianza.

## Decision 4: Datos efímeros y no ejecución

**Decision**: Mantener prompt y correcciones solo en señales de memoria de la vista. No guardar en localStorage, URL, analytics ni enviar a proveedores. El matcher nunca ejecuta el prompt.

**Rationale**: Cumple SEC-010 y reduce exposición de texto potencialmente sensible. El análisis local no necesita una API.

**Alternatives considered**:
- Guardar historial automáticamente: descartado por privacidad y falta de requisito explícito.
- Enviar el prompt a las herramientas sugeridas: explícitamente fuera de alcance y contrario a FR-034.

## Decision 5: Integrar la experiencia en la pantalla existente

**Decision**: Añadir un panel accesible en la app de una sola página y mantener el matching como función pura separada.

**Rationale**: El repositorio tiene una única pantalla Angular, un catálogo local y no tiene rutas ni componentes feature separados. La lógica pura mantiene el cálculo comprobable sin refactor transversal.

**Alternatives considered**:
- Nueva ruta/feature lazy-loaded: diferida hasta que el producto adopte navegación por rutas y módulos de feature.
- Añadir una librería de formularios: innecesario para el único control de texto y la acción de análisis.

## Decision 6: Usar ejes comparativos con evidencia declarada

**Decision**: Analizar y comparar capacidad/coste, latencia, privacidad/despliegue, contexto y etapa de uso. Los tiers y perfiles cualitativos se marcan como estimación editorial; solo metadata con benchmark asociado puede mostrarse como verificada. Un objetivo de precision/accuracy produce una advertencia de validación, nunca una garantía calculada a partir del score general.

**Rationale**: Los ejes sirven para recomendar distintos modelos en tareas de producción, tareas sensibles, tiempo real y contexto extenso. Evita que popularidad o puntuaciones globales sustituyan las restricciones reales.

**Alternatives considered**:
- Tratar los datos del material de referencia (precios, latencias y cifras de contexto) como hechos universales: descartado porque varían por versión, plan, proveedor y fecha.
- Convertir el umbral pedido (por ejemplo, 97%) en un score de candidato: descartado porque no existe resultado de evaluación del proyecto que lo sustente.