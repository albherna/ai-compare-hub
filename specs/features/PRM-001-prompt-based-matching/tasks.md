# Tasks: PRM-001 — Recomendación de modelos a partir de un prompt

**Input**: Diseño de `specs/features/PRM-001-prompt-based-matching/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `quickstart.md`

**Tests**: Incluidos porque PRM-001 exige escenarios de prueba y el proyecto sigue TDD.

**Organization**: Tareas agrupadas por historia. Cada historia debe poder comprobarse por separado.

## Phase 1: Setup

**Purpose**: Reusar el workspace Angular y dependencias existentes.

- [X] T001 Confirmar que `app/package.json` ya proporciona Angular 22 y Vitest; no añadir dependencia para el matcher local.

## Phase 2: Foundational

**Purpose**: Establecer tipos compartidos para análisis y resultado.

- [X] T002 [P] Definir tipos exportados para PromptRequest, PromptAnalysis, ToolMatch y estado del flujo en `app/src/app/prompt-matcher.ts`.

## Phase 3: User Story 1 — Obtener candidatos a partir de una tarea (Priority: P1) MVP

**Goal**: Introducir texto y obtener candidatos del catálogo ordenados por adecuación detectada.

**Independent Test**: Una consulta de desarrollo devuelve agentes/modelos existentes de desarrollo; una consulta no reconocida solicita refinar sin inventar candidatos.

### Tests first

- [X] T003 [P] [US1] Añadir tests unitarios para texto vacío, normalización de acentos, detección de intención de desarrollo/investigación/creación, coincidencia de catálogo y ausencia de candidatos en `app/src/app/prompt-matcher.spec.ts`.

### Implementation

- [X] T004 [US1] Implementar normalización, detección determinista de intención y restricciones, ranking contextual y límite de resultados en `app/src/app/prompt-matcher.ts`.
- [X] T005 [US1] Añadir señales, estado efímero, traducciones ES/EN y acción de analizar prompt en `app/src/app/app.ts`.
- [X] T006 [US1] Añadir formulario de prompt, resumen de intención, estados vacíos y resultados básicos accesibles en `app/src/app/app.html`.
- [X] T007 [US1] Añadir presentación responsive del panel matcher y resultados en `app/src/app/app.scss`.
- [X] T008 [US1] Añadir tests de integración para envío y actualización del estado de resultados en `app/src/app/app.spec.ts`.

## Phase 4: User Story 2 — Entender recomendaciones y trade-offs (Priority: P1)

**Goal**: Explicar por qué encaja cada candidato y hacer visibles limitaciones y datos faltantes.

**Independent Test**: Cada candidato incluye motivos/evidencias derivados de los campos del catálogo y los datos no disponibles no se presentan como hechos.

### Tests first

- [X] T009 [P] [US2] Añadir tests de razones, evidencias, trade-offs y ranking basado en campos de catálogo en `app/src/app/prompt-matcher.spec.ts`.

### Implementation

- [X] T010 [US2] Devolver razones y trade-offs por candidato y usar el score general solo como desempate en `app/src/app/prompt-matcher.ts`.
- [X] T011 [US2] Mostrar razones, ajuste relativo y limitaciones en resultados accesibles en `app/src/app/app.html` y `app/src/app/app.scss`.
- [X] T012 [US2] Añadir tests de integración para explicar resultados sin asumir metadata ausente en `app/src/app/app.spec.ts`.
- [X] T013 [US2] Añadir acción para seleccionar candidatos recomendados en la comparación existente y probarla en `app/src/app/app.html`, `app/src/app/app.ts` y `app/src/app/app.spec.ts`.

## Phase 5: User Story 4 — Mantener el prompt privado (Priority: P1)

**Goal**: Informar de forma clara que el prompt se analiza localmente, no se ejecuta ni se guarda.

**Independent Test**: El panel explica el tratamiento efímero; el flujo no introduce llamadas remotas ni persistencia del texto.

### Tests first

- [X] T014 [P] [US4] Añadir tests del aviso localizado y del estado inicial sin prompt restaurado en `app/src/app/app.spec.ts`.

### Implementation

- [X] T015 [US4] Añadir aviso de privacidad localizado y mantener prompt/análisis solo en señales no persistidas en `app/src/app/app.ts` y `app/src/app/app.html`.

## Phase 6: User Story 3 — Corregir la interpretación (Priority: P2)

**Goal**: Permitir editar la intención detectada y recalcular candidatos.

**Independent Test**: Cambiar la intención de desarrollo a investigación cambia el ranking o explica por qué no puede cambiarlo.

### Tests first

- [X] T016 [P] [US3] Añadir tests para corregir la intención y comprobar recálculo de candidatos en `app/src/app/app.spec.ts`.

### Implementation

- [X] T017 [US3] Añadir resumen editable y acción de reanálisis conectados al matcher en `app/src/app/app.ts` y `app/src/app/app.html`.
- [X] T018 [US3] Añadir estados accesibles de consulta ambigua, sin coincidencias, validación y error en `app/src/app/app.html` y `app/src/app/app.scss`.

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Validar restricciones, accesibilidad y calidad global del feature.

- [X] T019 [P] Añadir validación del límite de 4.000 caracteres y su prueba en `app/src/app/app.ts` y `app/src/app/app.spec.ts`.
- [X] T020 Verificar navegación por teclado, etiquetas y anuncios de estado del flujo en `app/src/app/app.html`.
- [X] T021 Ejecutar Vitest del matcher y App más build de producción desde `app/`, y actualizar estados de tareas en `specs/features/PRM-001-prompt-based-matching/tasks.md`.

## Phase 8: Decision Axes — coste, latencia, privacidad, contexto y etapa de uso

**Goal**: Refinar recomendaciones y comparaciones con ejes explícitos, sin presentar estimaciones como benchmarks.

- [X] T022 [US1] Añadir perfiles DecisionAxes opcionales y metadata editorial a herramientas pertinentes en `app/src/app/prompt-matcher.ts` y `app/src/app/app.ts`.
- [X] T023 [US1] Detectar volumen, producción/desarrollo, latencia, privacidad, contexto y umbrales de calidad; explicar trade-offs en `app/src/app/prompt-matcher.ts`.
- [X] T024 [US2] Añadir filas de contexto/privacidad a la matriz y mostrar datos no disponibles honestamente en `app/src/app/app.ts`.
- [X] T025 [US1] Actualizar spec, requisitos FR-035..FR-037, modelo de datos, investigación, quickstart y trazabilidad en `specs/features/PRM-001-prompt-based-matching/` y `specs/`.
- [X] T026 Ejecutar integración UI para revisar los cinco ejes y objetivos de calidad en `app/src/app/app.spec.ts`.
- [X] T027 [US2] Diferenciar benchmark verificado de estimación editorial en razones/evidencias en `app/src/app/prompt-matcher.ts` y `app/src/app/app.ts`.
- [X] T028 [US1] Detectar umbral de precisión solo cuando el porcentaje está ligado a términos de calidad y añadir caso negativo en `app/src/app/prompt-matcher.ts` y `app/src/app/prompt-matcher.spec.ts`.
- [X] T029 [US2] Mostrar criterios detectados y advertencias de evidencia insuficiente en `app/src/app/app.html` y `app/src/app/app.scss`.
- [X] T030 Ejecutar tests/build oficiales, revisar escenarios comparativos con teclado y validar los artefactos PRM-001.

## Dependencies & Execution Order

- T001 precede T002; T002 precede todas las historias.
- US1 (T003–T008) habilita los candidatos requeridos por US2, US4 y US3.
- US2 y US4 comparten el template de resultados con US1 y se implementan después de US1.
- US3 se implementa después de US1 para reutilizar intención y resultados existentes.
- T020 depende de todas las tareas anteriores.
- T003 y T009 comparten el archivo de pruebas del matcher y se ejecutan secuencialmente para evitar conflictos.

## Parallel Opportunities

- T001 está completada; no modifica código de la app.
- T003 y T014 usan archivos distintos y pueden prepararse en paralelo, pero T014 debe probar el contrato de texto de privacidad que se acuerde.
- La mayoría de tareas de integración toca `app.ts`, `app.html`, `app.scss` o `app.spec.ts`; se mantienen secuenciales para evitar conflictos.

## Implementation Strategy

1. Completar setup y tipos compartidos.
2. Implementar US1 con tests primero y validar el MVP del matcher.
3. Añadir explicación y privacidad en US2/US4.
4. Añadir refinamiento de intención en US3.
5. Validar tests, build y accesibilidad manual antes de dar por terminada la feature.