---
component: TextInput
tab: Accesibilidad
summary: Qué resuelve ALMA en el campo de texto y qué debe cuidar quien diseña y quien programa.
---

## Qué ofrece ALMA

ALMA resuelve la relación entre etiqueta, campo, ayuda y error. Hay que anotar el diseño solo en los casos de la sección siguiente.

### Comportamiento
- La etiqueta es un `<label>` real unido al campo: se anuncia al enfocar y agranda el área de toque.
- La ayuda y el error están unidos con `aria-describedby`: se leen después de la etiqueta.
- El error marca `aria-invalid`.
- `required` agrega el asterisco visible y el `required` nativo.
- El ojo de la contraseña es un botón con nombre que cambia con el estado, con área de toque de 44 × 44.
- Texto en rem; probado con texto al 200 %: la etiqueta se recorta con puntos suspensivos en vez de montarse sobre el ícono.

### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Tab | Entra al campo; con contraseña, el siguiente Tab va al ojo. |
| Enter | Envía el formulario si hay un botón con rol `primary`. |
| Espacio o Enter (en el ojo) | Muestra u oculta la contraseña. |

## Recomendaciones de diseño

- **Etiqueta visible siempre.** El texto de ejemplo desaparece al escribir y no se anuncia igual.
- **Instrucciones antes del campo, no solo en el error.** La regla va en la ayuda.
- **El error no depende del color:** lleva mensaje escrito.
- **Autocompletado:** pide `autoComplete` para nombre, correo, teléfono y códigos; evita que la persona escriba lo que el sistema ya sabe (WCAG 1.3.5).
- **No bloquees pegar** en contraseñas ni códigos.

### Etiquetado

| Caso | Qué poner |
|---|---|
| Campo normal | `label` visible. |
| Obligatorio | `required`; el asterisco se explica una vez al inicio del formulario. |
| Con formato | Ejemplo en la ayuda («Formato dd-mm-aaaa»). |

## Consideraciones de desarrollo

- No reemplaces la etiqueta por `placeholder` ni por `aria-label`.
- Si el error aparece al enviar, lleva el foco al primer campo con error.
- Usa el `type` y el `inputMode` correctos: cambian el teclado y el autocompletado.

## Verificación

- axe (WCAG 2.2 AA): cero problemas en los cuatro temas.
- Pares de contraste del campo (borde, etiqueta, texto, error, ojo): cumplen en los cuatro temas.
- Probado con texto al 200 %.
- Pendiente: prueba con VoiceOver y NVDA.
