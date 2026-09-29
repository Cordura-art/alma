# Tooltip

Etiqueta breve y pasajera que explica qué hace un control al pasar el cursor o al enfocarlo (en Apple, *tooltip* o *help tag*).

## Cómo escribirlo (Apple)
- Describe solo el control que interesa y la acción que inicia. Empieza con verbo: «Copiar el número de la tarjeta».
- No repitas el nombre del control.
- Como máximo **60 a 75 caracteres**. Puede ser un fragmento sin artículos, con mayúscula solo al inicio y sin punto final.
- Puede cambiar según el estado del control («Congelar» / «Reactivar»).
- Si necesitas mucho texto, simplifica la interfaz, o usa un `Tip`.

## Comportamiento (WCAG 1.4.13)
- Aparece a los 500 ms con el cursor, o al instante con el foco del teclado.
- Esc lo oculta. Está conectado al control con `aria-describedby`.
- En pantallas táctiles no hay hover. Nunca pongas en un tooltip información que no esté también en otra parte.
- Superficie `inverse-02` con texto `inverse-01`, `shadow-floating` y `z-floating`. Aparece con la receta contextual de IBM.
