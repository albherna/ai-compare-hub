# Implementation Plan: PRM-001 — Recomendación de modelos a partir de un prompt

**Branch**: `feature/PRM-001-prompt-based-matching` | **Date**: 2026-10-23 | **Spec**: [spec.md](spec.md)

**Input**: `specs/features/PRM-001-prompt-based-matching/spec.md`

## Summary

Ofrecer recomendaciones justificadas de agentes y modelos del catálogo a partir de un prompt y requisitos corregibles. El matcher local usa intención y los cinco ejes de decisión (capacidad/coste, latencia, privacidad/despliegue, contexto y desarrollo/producción) cuando la metadata está disponible; no ejecuta el prompt, no llama a proveedores y no persiste el texto original.

## Technical Context

**Language/Version**: TypeScript 6, Angular 22

**Primary Dependencies**: Angular Signals, standalone application, Vitest 5, jsdom; no new dependencies

**Storage**: N/A; prompt, análisis y candidatos permanecen en memoria durante la sesión

**Testing**: Vitest con jsdom para lógica pura y pruebas de integración de `App`

**Target Platform**: Navegadores modernos; responsive en desktop y móvil

**Project Type**: Aplicación web Angular single-page en `app/`

**Performance Goals**: Cumplir NFR-011; matcher local con respuesta en menos de 10 segundos en condiciones normales

**Constraints**: Usar exclusivamente el catálogo local; no transmitir ni almacenar el prompt; explicar coincidencias y datos faltantes; etiquetar metadata editorial como estimación; español inicial y soporte inglés existente

**Scale/Scope**: Un flujo de recomendación integrado en la pantalla existente; catálogo actual; sin backend ni integración externa en este feature

## Constitution Check

La constitución Spec Kit conserva placeholders y no define principios ratificados. Se aplican como gates las prácticas vigentes del proyecto:

- **Trazabilidad**: PRM-001 enlazado con FR-026..FR-034, NFR-011 y SEC-010.
- **Privacidad por defecto**: procesamiento local y efímero; sin llamadas a proveedores ni almacenamiento del prompt.
- **Explicabilidad**: cada resultado deriva de metadata del catálogo y muestra los criterios coincidentes.
- **Calidad**: tests del matcher antes de la implementación; validar Vitest y build Angular.
- **Accesibilidad**: etiquetas, foco, mensajes de estado y controles utilizables por teclado.

**Pre-design gate**: PASS. No se añade proveedor/modelo externo, persistencia ni dependencia nueva.

## Project Structure

### Documentation

```text
specs/features/PRM-001-prompt-based-matching/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── tasks.md
└── checklists/requirements.md
```

### Source Code

```text
app/src/app/
├── app.ts                    # Estado Angular, señales y acciones de interfaz
├── app.html                  # Formulario del prompt y resultados accesibles
├── app.scss                  # Presentación responsive del matcher
├── prompt-matcher.ts         # Análisis local, ranking y razones explicables
├── prompt-matcher.spec.ts    # Pruebas unitarias deterministas del matcher
└── app.spec.ts               # Integración del flujo en App
```

**Structure Decision**: Reutilizar la aplicación standalone existente en `app/src/app/`. Separar la lógica pura de matching en `prompt-matcher.ts`; integrar UI, señales y traducciones en `App` siguiendo la organización actual. No se crea API ni persistencia para este feature.

## Complexity Tracking

No se introducen violaciones ni complejidad adicional que requiera justificación.