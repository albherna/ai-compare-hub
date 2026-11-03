# Requirements

## 1. Functional Requirements

### Requisitos funcionales principales

- **FR-001**: El sistema DEBE permitir a los usuarios navegar por un catálogo de herramientas IA con información básica estructurada por nombre, categoría, proveedor y caso de uso principal.
- **FR-002**: El sistema DEBE permitir la búsqueda de herramientas por nombre, categoría, palabra clave y tipo de usuario.
- **FR-003**: El sistema DEBE permitir filtrar herramientas por categoría, capacidad principal, nivel de uso, rango de precio y uso recomendado.
- **FR-004**: El sistema DEBE mostrar una vista de detalle para cada herramienta con descripción, capacidades, casos de uso, limitaciones, fortalezas y planes de precios.
- **FR-005**: El sistema DEBE permitir comparar al menos dos herramientas en una misma vista, mostrando diferencias y similitudes por atributos comparables.
- **FR-006**: El sistema DEBE incluir una matriz de comparación con criterios homogéneos para evaluar herramientas del mismo tipo.
- **FR-007**: El sistema DEBE exponer información de precios y planes de forma normalizada, evitando confusión por modelos freemium, suscripción o uso por token.
- **FR-008**: El sistema DEBE mostrar benchmarks o indicadores de comparación cuando existan datos disponibles y verificables para la herramienta.
- **FR-009**: El sistema DEBE recomendar herramientas según el perfil del usuario, su objetivo principal y sus restricciones de uso.
- **FR-010**: El sistema DEBE permitir que el usuario identifique cuál herramienta es más adecuada para un caso de uso concreto.
- **FR-011**: El sistema DEBE conservar y presentar el estado de una comparación en la sesión del usuario para facilitar continuidad.
- **FR-012**: El sistema DEBE diferenciar claramente entre información factual, estimación y recomendación editorial.
- **FR-013**: El sistema DEBE soportar la comparación de herramientas con distintos niveles de complejidad sin perder claridad visual en la interfaz.
- **FR-014**: El sistema DEBE permitir el cambio de filtros sin pérdida de contexto de navegación.
- **FR-015**: El sistema DEBE ofrecer un mecanismo de ordenación del catálogo por relevancia, precio, valoración o popularidad.
- **FR-016**: El sistema DEBE permitir a los usuarios guardar o registrar comparativas para uso posterior cuando el perfil lo requiera.
- **FR-017**: El sistema DEBE mostrar la metadata de cada herramienta con fecha de actualización, fuente o origen cuando sea aplicable.
- **FR-018**: El sistema DEBE identificar claramente si una herramienta pertenece a una categoría, subcategoría o caso de uso múltiple.

### Requisitos funcionales del perfil de usuario

- **FR-019**: El sistema DEBE permitir la creación de un perfil básico con roles, metas y nivel de experiencia del usuario.
- **FR-020**: El sistema DEBE adaptar la recomendación inicial según el perfil del usuario, incluidas sus necesidades y restricciones.
- **FR-021**: El sistema DEBE permitir que el usuario actualice su perfil sin perder recomendaciones previas.
- **FR-022**: El sistema DEBE permitir la comparación entre herramientas que comparten un caso de uso y un nivel de experiencia similar.

### Requisitos funcionales de contenido

- **FR-023**: El sistema DEBE mantener una estructura editorial consistente para descripciones, capacidades y comparativas.
- **FR-024**: El sistema DEBE permitir la gestión de contenido actualizado para catálogo y benchmarks.
- **FR-025**: El sistema DEBE distinguir entre herramientas “visión general”, “premium” y “freemium” cuando corresponda.

### Requisitos de recomendación a partir de un prompt

- **FR-026**: El sistema DEBE permitir que el usuario introduzca un prompt en lenguaje natural para solicitar una recomendación de agente o modelo de IA.
- **FR-027**: El sistema DEBE identificar y presentar la intención, el tipo de tarea y los requisitos relevantes detectados en el prompt.
- **FR-028**: El sistema DEBE recomendar y ordenar agentes o modelos registrados en el catálogo según su adecuación a los requisitos detectados.
- **FR-029**: El sistema DEBE explicar la adecuación de cada candidato vinculando los requisitos con capacidades o información disponible en el catálogo.
- **FR-030**: El sistema DEBE presentar alternativas y sus trade-offs, y distinguir datos verificados, estimaciones y recomendaciones editoriales.
- **FR-031**: El sistema DEBE permitir al usuario corregir la intención o los requisitos detectados y volver a solicitar recomendaciones.
- **FR-032**: Cuando el prompt sea ambiguo, no esté cubierto por el catálogo o no haya datos suficientes, el sistema DEBE comunicar la limitación y permitir refinar la consulta sin afirmar un ganador sin fundamento.
- **FR-033**: El sistema DEBE permitir continuar desde una recomendación al detalle de una herramienta o a una comparación entre candidatos.
- **FR-034**: El análisis del prompt DEBE limitarse a la recomendación: el sistema no DEBE ejecutar el prompt contra las herramientas candidatas ni enviarles el texto.
- **FR-035**: El sistema DEBE considerar capacidad frente a coste, latencia, privacidad/despliegue, ventana de contexto y etapa de uso (desarrollo o producción) cuando el prompt lo indique y exista metadata aplicable.
- **FR-036**: El sistema DEBE etiquetar como estimación editorial los perfiles comparativos no respaldados por un benchmark verificable y DEBE señalar como desconocidos los ejes sin datos.
- **FR-037**: Si el usuario define un umbral de calidad, el sistema NO DEBE garantizarlo sin resultados de evaluación verificables y DEBE recomendar validación con datos representativos.

## 2. Non Functional Requirements

- **NFR-001**: El sistema DEBE responder a búsquedas y consultas de catálogo en menos de 3 segundos en condiciones normales de uso.
- **NFR-002**: La interfaz DEBE cargar la información principal y la estructura de navegación en menos de 2 segundos en conexiones de banda ancha estándar.
- **NFR-003**: El sistema DEBE mantener un nivel de disponibilidad objetivo de 99,9% para la experiencia pública principal.
- **NFR-004**: El producto DEBE ser escalable para gestionar un catálogo de al menos 100 herramientas sin degradación significativa en la experiencia.
- **NFR-005**: El sistema DEBE mantener una coherencia de contenido en todas las vistas de comparación y detalle.
- **NFR-006**: Los datos deben ser consistentes entre catálogo, filtros y comparativas para evitar discrepancias de negocio.
- **NFR-007**: El sistema DEBE diseñarse para soportar crecimiento de categorías, herramientas y atributos sin rework estructural mayor.
- **NFR-008**: El producto DEBE seguir buenas prácticas de observabilidad para medir rendimiento, uso y errores.
- **NFR-009**: El sistema DEBE ofrecer trazabilidad y registros básicos de actividad de contenido y consultas relevantes.
- **NFR-010**: La plataforma DEBE estar preparada para cumplir requisitos de internacionalización básica en futuras expansiones.
- **NFR-011**: En condiciones normales, el 95% de las consultas de recomendación basadas en prompt DEBE producir resultados o una explicación accionable en un máximo de 10 segundos.

## 3. Security Requirements

- **SEC-001**: El sistema DEBE proteger el acceso a perfiles, comparativas personalizadas y contenido de usuario con autenticación segura.
- **SEC-002**: El sistema DEBE usar mecanismos de autorización adecuados para restringir accesos no previstos a datos sensibles o privados.
- **SEC-003**: El sistema DEBE validar y sanitizar toda entrada de usuario y contenido editorial antes de su persistencia o renderización.
- **SEC-004**: El sistema DEBE implementar control de errores y registro seguro para evitar fuga de información sensible.
- **SEC-005**: La gestión de credenciales DEBE seguir prácticas de hashing y almacenamiento seguros.
- **SEC-006**: El sistema DEBE minimizar la exposición de datos personales y mantener principios de privacidad por defecto.
- **SEC-007**: El sistema DEBE segmentar y aislar información sensible por perfil y tipo de dato.
- **SEC-008**: La plataforma DEBE contar con políticas de seguridad para proteger conexiones y transferencias de contenido vía HTTPS.
- **SEC-009**: El sistema DEBE permitir auditoría básica de cambios de contenido crítico y configuración relevante.
- **SEC-010**: El sistema NO DEBE conservar el prompt tras la consulta ni compartirlo con proveedores de herramientas recomendadas sin consentimiento explícito del usuario.

## 4. Accessibility Requirements

- **ACC-001**: La interfaz DEBE cumplir con principios básicos de accesibilidad web, incluyendo navegación por teclado, contraste adecuado y semántica correcta.
- **ACC-002**: Los elementos interactivos DEBEN tener etiquetas visibles o accesibles para lectores de pantalla.
- **ACC-003**: La navegación DEBE ser operable sin mouse, incluyendo filtros, tablas comparativas y enlaces principales.
- **ACC-004**: Los controles de comparación y filtro DEBEN presentar estados visuales y semánticos claros para usuarios con discapacidades visuales o cognitivas.
- **ACC-005**: Las tablas de comparación DEBEN estructurarse de forma legible y soportar navegación asistida.
- **ACC-006**: La plataforma DEBE otorgar alternativas textuales a información visual cuando la representación de datos dependa de gráficos o iconografía.
- **ACC-007**: El contenido DEBE evitar depender exclusivamente de color para distinguir estados, opciones o resultados.
- **ACC-008**: El sistema DEBE usar tamaños de fuente, espaciado y contrastes adecuados para usuarios con lectura dificultosa.

## 5. SEO Requirements

- **SEO-001**: Cada herramienta, categoría y caso de uso DEBE tener una estructura de URL clara y consistente para facilitar indexación.
- **SEO-002**: El contenido de detalle DEBE incluir metadata relevante: title, description, title tags y etiquetas semánticas adecuadas.
- **SEO-003**: Las páginas de comparación DEBE estar diseñadas para ser indexables de forma cuidadosa, evitando contenido duplicado y sobrecarga de parámetros.
- **SEO-004**: La plataforma DEBE priorizar contenido estructurado para mejorar la comprensión del catálogo por motores de búsqueda.
- **SEO-005**: La arquitectura de navegación DEBE apoyar la indexación de categorías, filtros y páginas de herramienta sin generar rutas ambiguas.
- **SEO-006**: La plataforma DEBE evitar contenido oculto, duplicado o artificial que afecte la calidad SEO y la confianza del usuario.
- **SEO-007**: Cada página DEBE ofrecer una jerarquía semántica clara para facilitar la comprensión del contenido por crawlers y asistentes de búsqueda.

## 6. Requirements Traceability Notes

Esta especificación se considera la base de requisitos para la fase de diseño y validación del producto. Los requisitos prioritarios de MVP están alineados con:

- descubrimiento de herramientas,
- comparación básica,
- filtros esenciales,
- recomendaciones simples,
- benchmarks y contenido confiable.

Los requisitos posteriores pueden ampliarse durante releases, pero no deben redefinir el principio central del producto: ayudar a comparar y elegir herramientas IA con claridad y confianza.
