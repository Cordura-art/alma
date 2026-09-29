# Textarea

Campo de texto de varias líneas, con el mismo borde, etiqueta y ayuda que `TextInput`.

## Cuándo usarlo
Para comentarios, descripciones y reclamos. Para un dato corto (nombre, correo, código), usa `TextInput`.

## Qué aporta quien lo usa
- `label` siempre; `required` añade el asterisco.
- `helper`: la regla antes de escribir («Opcional», «Mínimo 20 caracteres»). `error`: qué falta y cómo arreglarlo.
- `maxLength` muestra el contador `0/200`.
- `rows` (4 por defecto); se puede agrandar hacia abajo.
- `placeholder` solo como ejemplo, nunca en lugar de la etiqueta.
