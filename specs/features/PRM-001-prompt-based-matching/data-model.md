# Data Model: PRM-001

Los datos se mantienen en memoria durante la vista y no se persisten.

## PromptRequest

Representa el texto y los criterios opcionales que el usuario aporta para pedir candidatos.

| Field | Type | Rules |
|---|---|---|
| prompt | string | Requerido tras trim; no más de 4.000 caracteres |
| refinedIntent | string | Opcional; máximo 240 caracteres; edición del resumen detectado |

## PromptAnalysis

Interpretación efímera del prompt que puede ser corregida por el usuario.

| Field | Type | Rules |
|---|---|---|
| intent | string | Resumen visible de la tarea detectada o corregida |
| taskTypes | string[] | Categorías de tarea detectadas; puede estar vacío si no se reconoce |
| constraints | string[] | Restricciones explícitas reconocidas, como coste bajo o ejecución local |
| status | `idle \| results \| needs-refinement \| no-match` | Refleja el estado visible del flujo |
| analysisNotes | string[] | Advertencias sobre evidencia insuficiente o umbrales de calidad no validados |

## DecisionAxes

Metadata comparativa opcional de una herramienta. Los valores cualitativos y de contexto incluidos por el equipo editorial están marcados como estimaciones, no como benchmarks.

| Field | Type | Rules |
|---|---|---|
| capability | `routine \| balanced \| advanced` | Perfil cualitativo de tarea; fuente editorial explícita |
| cost | `low \| moderate \| high` | Tier relativo; no equivale a precio contractual por token |
| latency | `fast \| balanced \| slow` | Perfil editorial; no es una medición p95 |
| privacy | `local \| cloud \| managed-cloud` | Describe ubicación/deployment cuando se conoce, no constituye certificación de privacidad |
| contextTokens | number | Opcional; se muestra como estimación salvo fuente verificada |
| source | `editorial-estimate \| verified-benchmark` | Cada dato comparativo debe declarar su procedencia |

Los campos numéricos de volumen, latencia objetivo o precisión objetivo del prompt son requisitos de la solicitud; no son propiedades verificadas de los candidatos.

## ToolMatch

Representa el ajuste explicable entre una herramienta del catálogo y los requisitos analizados.

| Field | Type | Rules |
|---|---|---|
| toolId | number | Debe referenciar una herramienta existente del catálogo |
| fitScore | number | Ranking relativo dentro de la consulta; no es una probabilidad ni benchmark universal |
| reasons | string[] | Una o más señales basadas en campos presentes en el catálogo |
| tradeoffs | string[] | Limitaciones conocidas o criterios que no coinciden |
| evidence | string[] | Campos del catálogo usados para justificar el ajuste |

## Relationships and Lifecycle

- Una solicitud produce una sola `PromptAnalysis`.
- Una `PromptAnalysis` produce cero o más `ToolMatch`.
- Cada `ToolMatch` apunta a una herramienta existente.
- El ranking usa `DecisionAxes` solo cuando el campo está presente; la ausencia produce un trade-off o “No disponible”.
- Un umbral de calidad no se convierte en una puntuación del candidato sin benchmark asociado.
- Al corregir `refinedIntent`, se recalculan análisis y candidatos desde la metadata local.
- Al abandonar o recargar la página, el prompt y su resultado desaparecen.
- No se retiene el prompt original en almacenamiento ni se transmite a proveedores.