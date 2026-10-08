---
component: TokenField
tab: Uso
summary: Varios valores en un solo campo, cada uno una ficha que se puede quitar.
---


## Resumen

`TokenField` reúne varios valores en un campo: los destinatarios de un mensaje, las etiquetas de un viaje. Lo que se escribe se vuelve una ficha, y cada ficha se puede quitar. Es el *token field* de Apple.

## Cuándo usarlo

- Cuando se eligen **varios** valores y no se sabe cuántos.
- Cuando los valores se escriben, con o sin sugerencias: correos, etiquetas, ciudades.

## Cuándo no

- Para **uno** solo: `Combobox` o `TextInput`.
- Para pocas opciones conocidas: `Checkbox`, o `Tag` que se marcan.
- Para un texto libre: `Textarea`.

## Anatomía

1. **Rótulo.**
2. **Fichas:** los valores ya elegidos, cada una con su botón para quitarla.
3. **Texto:** donde se escribe el siguiente.
4. **Sugerencias** (opcional).
5. **Ayuda o error.** Texto secundario.

![Anatomía de TokenField: el rótulo «Compartir con» (1), dos fichas con correos y su botón de quitar (2), el lugar donde se escribe el siguiente (3) y debajo la ayuda «Separa los correos con una coma» (5).](assets/Componentes/token-field-anatomia.png)

## Comportamiento

- **Enter o una coma** convierten lo escrito en ficha. Al salir del campo, también.
- **Retroceso con el campo vacío** va a la última ficha; otro Retroceso, o Enter, la quita.
- **Pegar una lista** separada por comas agrega cada valor.
- **No se repite:** un valor que ya está no se agrega de nuevo, y se dice.
- **Lo que no vale no se vuelve ficha:** se queda escrito para corregirlo.
- **El campo crece** hacia abajo con las fichas.

## Contenido

- La ayuda dice cómo separar: «Separa los correos con una coma».
- Una ficha muestra lo necesario para reconocer el valor. Si es largo, se corta con puntos suspensivos y se lee entero al enfocar.

## Relacionados

`Tag` · `Combobox` · `TextInput` · Compartir · Formularios · Jerarquía.

## Referencias

- Apple, Human Interface Guidelines: Token fields.
