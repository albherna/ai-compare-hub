# Sistema de recomendación

## Objetivo
Ofrecer recomendaciones útiles y justificadas según el perfil del usuario, su caso de uso y sus restricciones para reducir la fricción en la toma de decisiones.

## User Stories
- Como usuario con objetivos concretos, quiero recibir recomendaciones alineadas con mi caso de uso.
- Como nuevo usuario, quiero entender por qué una herramienta se recomienda antes de elegirla.
- Como usuario recurrente, quiero ajustar mis preferencias para mejorar la calidad de las recomendaciones.

## Acceptance Criteria
- El sistema ofrece recomendaciones iniciales basadas en perfil y objetivo principal.
- Cada recomendación incluye explicación breve del porqué.
- El usuario puede explorar alternativas desde la recomendación.
- La recomendación distingue entre sugerencia general y sugerencia personalizada.
- El sistema actualiza la recomendación cuando cambian los datos del perfil.

## Business Rules
- Las recomendaciones deben basarse en criterios claros, no únicamente en popularidad.
- La lógica de recomendación debe documentarse y mantenerse trazable.
- Las herramientas recomendadas deben estar alineadas con el caso de uso del usuario.
- Cuando sea necesario, se deben mostrar alternativas con trade-offs.

## Edge Cases
- Usuario sin perfil completo.
- Caso de uso muy amplio o ambiguo.
- Recomendaciones con resultados muy similares.
- Herramienta sin información suficiente para recomendar.
- Preferencias contradictorias entre objetivos y presupuesto.

## Test Scenarios
- Verificar que una recomendación aparece con base en perfil definido.
- Verificar que se muestra explicación legible y comprensible.
- Verificar que la recomendación se actualiza tras cambiar preferencias.
- Verificar que se ofrecen alternativas cuando no hay una recomendación clara.
- Verificar que el sistema evita recomendaciones irrelevantes o sesgadas.
