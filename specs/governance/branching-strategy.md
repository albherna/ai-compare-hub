# Branching Strategy

## Main Branches

### main
- Producción
- Siempre desplegable

### develop
- Integración continua
- Base para nuevas funcionalidades

## Feature Branches

Formato:

feature/<work-item>-<description>

Ejemplos:

- feature/123-login-page
- feature/456-user-search

## Bugfix Branches

Formato:

bugfix/<work-item>-<description>

Ejemplo:

- bugfix/231-fix-token-refresh

## Hotfix Branches

Formato:

hotfix/<version>

Ejemplo:

- hotfix/1.4.1

## Rules

- Nunca hacer push directo a main.
- Nunca hacer push directo a develop.
- Todo cambio requiere Pull Request.
- Mínimo una aprobación.
- Todos los checks deben pasar.
