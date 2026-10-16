# Favoritos

## Objetivo
Permitir al usuario guardar herramientas, comparativas y decisiones para continuar luego su proceso de evaluación sin perder contexto.

## User Stories
- Como usuario que explora, quiero guardar herramientas para revisarlas después.
- Como usuario en proceso de decisión, quiero conservar comparativas de interés.
- Como usuario recurrente, quiero acceder rápido a mis herramientas preferidas y decisiones previas.

## Acceptance Criteria
- El usuario puede guardar una herramienta como favorita.
- El usuario puede ver una lista de favoritos desde su perfil o sección dedicada.
- El usuario puede eliminar elementos guardados.
- Las herramientas guardadas conservan su estado actual y su contexto de detalle.
- El sistema presenta favoritos de forma clara y accesible.

## Business Rules
- Los favoritos deben mantenerse asociados al usuario o a su sesión según el contexto de uso.
- La acción de guardar debe ofrecer feedback claro de confirmación.
- La lista de favoritos debe mantenerse actualizada y ordenada de forma comprensible.
- Se debe distinguir entre herramientas favoritas y comparativas guardadas.

## Edge Cases
- Usuario sin favoritos aún.
- Favorito eliminado accidentalmente.
- Cambio de categoría o actualización de ficha tras ser guardada.
- Repetición de la misma herramienta en varios contextos.
- Acceso desde varios dispositivos o sesiones.

## Test Scenarios
- Verificar que guardar una herramienta genera un favorito visible.
- Verificar que la eliminación de un favorito actualiza la vista correctamente.
- Verificar que un usuario sin favoritos ve un estado vacío apropiado.
- Verificar que un favorito mantiene su información actualizada tras cambios de contenido.
- Verificar que favoritos y comparativas guardadas se gestionan sin conflicto.
