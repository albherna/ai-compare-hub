# Integración SDD + IA

La trazabilidad completa debe seguir esta cadena:

SPEC
↓
Work Item
↓
Branch
↓
Commit
↓
Pull Request
↓
Release

Ejemplo:

- Spec: AUTH-SPEC-001
- Branch: feature/AUTH-SPEC-001-login
- Commit: feat(auth): implement login page
- PR: [AUTH-SPEC-001] Login implementation
- Release: v1.3.0

## Objetivo

Permitir que cualquier desarrollador o agente IA pueda recorrer toda la cadena y saber exactamente qué requisito originó cada línea de código.

## Regla de gobernanza

Cada cambio debe tener:

1. Una especificación asociada.
2. Un work item o requisito relacionado.
3. Una rama con identificador del requisito.
4. Un commit con tipo y alcance claros.
5. Un Pull Request con referencia explícita.
6. Un release o tag asociado cuando se despliegue.

## Beneficio

Esto garantiza trazabilidad end-to-end, facilita auditoría, reduce ambigüedad y mejora la colaboración entre equipos humanos y agentes de IA.
