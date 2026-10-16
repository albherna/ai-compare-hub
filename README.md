# AI Compare Hub

AI Compare Hub es un portal para descubrir, comparar y evaluar herramientas de Inteligencia Artificial de manera clara y estructurada.

El objetivo del proyecto es ayudar a usuarios, equipos y decisores a comparar soluciones IA según criterios relevantes como precio, capacidad, caso de uso, velocidad y nivel de integración, sin depender de reseñas dispersas o comparativas poco homogéneas.

## Visión

Convertir la evaluación de herramientas IA en una experiencia más transparente, comparable y útil para la toma de decisiones.

## Principales funcionalidades

- Catálogo de herramientas con búsqueda y filtrado por categoría
- Selector de idioma con soporte inicial en español e inglés
- Filtros por tipo de herramienta y uso recomendado
- Comparación lado a lado entre dos o tres herramientas
- Base documental con especificaciones, requisitos y trazabilidad del producto

## Stack tecnológico

- Angular 22
- TypeScript
- SCSS
- Vitest para pruebas unitarias
- Git + GitHub Flow con metodología SDD

## Estructura del repositorio

```text
ai-compare-hub/
├─ app/                       # aplicación Angular
│  ├─ src/
│  ├─ package.json
│  ├─ angular.json
│  └─ ...
├─ specs/                     # especificaciones y documentación fuente de verdad
│  ├─ requirements.md
│  ├─ roadmap.md
│  ├─ traceability.md
│  ├─ features/
│  ├─ ui/
│  └─ architecture/
├─ README.md                 # documentación general del proyecto
├─ CHANGELOG.md
├─ .gitignore
├─ .gitattributes
├─ .gitmessage
└─ project-structure.txt
```

## Metodología de trabajo

Este proyecto sigue una aproximación basada en SDD (Spec Driven Development), con una estructura de especificación centralizada en `specs/`.

La idea es simple:

1. definir la especificación funcional
2. revisar la spec con criterio y claridad
3. implementar la funcionalidad
4. ejecutar pruebas y validación
5. abrir PR y fusionar a `develop`

## Flujo de desarrollo

```text
Spec
→ Review
→ Implementation
→ Tests
→ PR
→ Merge to develop
```

## Convenciones de ramas

Se usa un flujo de ramas orientado a features:

- `main`: rama principal de producción
- `develop`: rama de integración
- `feature/<CODIGO>-<descripcion>`: ramas de trabajo por funcionalidad

Ejemplos:

- `feature/CAT-001-catalog-search`
- `feature/COM-001-comparison-matrix`

## Requisitos previos

- Git
- Node.js 22 LTS o compatible
- npm

## Inicio rápido

Desde la raíz del proyecto:

```bash
cd app
npm install
npm start
```

La app quedará disponible en el puerto por defecto de Angular (normalmente `http://localhost:4200`).

## Comandos útiles

### Ejecutar la app

```bash
cd app
npm start
```

### Compilar la app

```bash
cd app
npm run build
```

### Ejecutar pruebas

```bash
cd app
npx vitest run src/app/app.spec.ts
```

O bien, si se usa la configuración de Angular:

```bash
cd app
ng test
```

## Estado del proyecto

Actualmente el proyecto ya incluye:

- catálogo inicial de herramientas IA
- búsqueda y filtros
- selector de idioma
- comparación de herramientas
- estructura documental y trazabilidad funcional

## Roadmap orientativo

El proyecto está pensado para evolucionar por módulos funcionales:

- catalog
- comparison
- favorites
- benchmarks
- recommendation engine

## Fuente de verdad

Toda la lógica funcional y la documentación de requisitos deben mantenerse en la carpeta `specs/` y ser la base para implementación, pruebas y validación.

## Contribución

Para aportar cambios al proyecto:

1. crear una rama de feature desde `develop`
2. definir o actualizar la spec
3. implementar la funcionalidad
4. ejecutar pruebas y build
5. abrir PR hacia `develop`

## Licencia

El proyecto se gestiona como un repositorio de desarrollo interno/experimental. Revisa la política de uso según el contexto de tu equipo antes de distribuirlo públicamente.
