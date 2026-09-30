---
pattern: Barra de texto
summary: Las acciones de formato sobre un texto editable.
---

## Cuándo

Cuando un texto largo necesita formato (negrita, listas, enlaces): una nota, una descripción, un mensaje.

## Estado en ALMA

ALMA **no tiene hoy un editor de texto con formato**. `Textarea` es texto sin formato. Si un producto necesita formato, se pide como un componente nuevo de ALMA; mientras tanto, este patrón fija cómo debe comportarse.

## Cómo debe ser

1. Una fila de botones de ícono sobre el texto, dentro del mismo contenedor.
2. Cada formato es un botón que se prende y apaga (`Button` con `selected`), en grupos separados: estilo del texto, listas, enlace.
3. Los íconos de Carbon: `text--bold`, `text--italic`, `text--underline`, `list--bulleted`, `list--numbered`, `link`. No vienen en el set incluido: se cargan con `AlmaDS.registerIcons` desde `carbon-icons.json`.
4. Cada botón lleva su nombre y su atajo en un `Tooltip`: «Negrita (⌘B)».

> **Imagen pendiente:** un campo de nota con la barra de formato arriba.

## Reglas

- **Pocos formatos.** Solo los que el contenido necesita; el resto, en «Más».
- **El atajo de teclado siempre funciona**, esté o no la barra a la vista.
- **El estado se ve:** el formato activo queda marcado con `selected`, no solo con color.

## Accesibilidad

- La fila es un `role="toolbar"` con nombre («Formato del texto»), con una sola parada de Tab y flechas para moverse entre botones.
- Cada botón anuncia si está activo (`aria-pressed`).

Esto último **no lo resuelve ALMA hoy**: forma parte del componente que habría que agregar.

## Relacionados

`Textarea` · `Button` · `Tooltip` · `Icon`.
