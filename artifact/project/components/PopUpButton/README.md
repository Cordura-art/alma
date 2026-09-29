# PopUpButton

Botón que abre una lista plana de opciones **mutuamente excluyentes**. Al elegir una, el menú se cierra y el botón muestra la selección.

## Cuándo usarlo
- Para elegir una opción que afecta el contenido o la vista (ordenar, moneda, idioma), sobre todo si hay poco espacio.
- Si las entradas son **acciones**, si se puede elegir más de una o si hay submenús, usa `PullDownButton`.

## Qué aporta quien lo usa
- `label`: una etiqueta que anticipa las opciones sin abrir el menú («Ordenar por»).
- `options` y `defaultValue`: una opción por defecto útil, la que más gente quiere.
- Si algunas necesitan más datos, agrega «Personalizado…» y explica con `help` debajo de la lista.

## Teclado y lector de pantalla
- Flecha abajo o arriba, Enter o Espacio abren el menú.
- Las flechas recorren las opciones, Enter elige y Esc cierra y devuelve el foco al botón.
- Se anuncia como `listbox`, con la opción elegida marcada con check.

## Aspecto
Píldora de 44 px en `ui-01` con borde `border-control` e ícono `chevron--sort`. El menú flota en `ui-01` con `radius-panel`, `shadow-floating` y `z-dropdown`. Aparece con la receta contextual de IBM: `duration-fast-02` + `easing-entrance-expressive`.
