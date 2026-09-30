---
component: Textarea
tab: Accesibilidad
summary: Qué resuelve ALMA en el campo de varias líneas.
---

## Qué ofrece ALMA

### Comportamiento
- `<label>` unido al campo, ayuda y error con `aria-describedby`, error con `aria-invalid`.
- El contador visible está oculto para lectores de pantalla (`aria-hidden`) para no leerse en cada tecla; el límite lo hace cumplir `maxLength`.
- Se agranda hacia abajo sin romper la página; texto en rem, probado al 200 %.

### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Tab | Entra y sale del campo. |
| Enter | Nueva línea (nunca envía). |

## Recomendaciones de diseño

- Si el límite importa, dilo en la ayuda («Hasta 200 caracteres»): el contador no se anuncia.
- No uses el texto de ejemplo como única instrucción.

## Consideraciones de desarrollo

- No captures Enter para enviar: rompe la escritura de párrafos.
- Si validas al enviar, lleva el foco al campo con error.

## Verificación

axe sin problemas en los cuatro temas; probado con texto al 200 %. Pendiente: VoiceOver y NVDA.
