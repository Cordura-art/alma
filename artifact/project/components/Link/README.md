# Link

Enlace de texto que lleva a otra página o sección. Si la acción cambia algo (guardar, pagar, borrar), usa `Button`.

## Qué aporta quien lo usa
- `href` y el texto (`children`). El texto se entiende solo: «Ver condiciones del pasaje», nunca «Haz clic aquí».
- `external`: abre en otra pestaña, muestra el ícono `launch` y avisa a los lectores de pantalla «(se abre en otra pestaña)».
- `standalone`: enlace suelto, fuera de un párrafo (en peso 500, subrayado al pasar el puntero). Dentro de un texto nunca: ahí el subrayado es obligatorio (WCAG 1.4.1).
- `current`: marca la página actual (`aria-current="page"`).

## Aspecto
`link-text`, `link-text-visited` para los visitados. El subrayado se engrosa al pasar el puntero; el foco es el anillo `focus`.
