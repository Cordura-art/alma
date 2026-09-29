# Alert

Diálogo modal que interrumpe para comunicar algo importante y pedir una decisión. Sigue las directrices de alertas de Apple.

## Úsala poco
- Solo si hay información esencial **y** una acción útil. Para informar sin acción, muestra el mensaje en contexto: un aviso junto al contenido o un indicador.
- No alertes por acciones comunes que se pueden deshacer, aunque borren algo. Sí alerta por acciones destructivas poco comunes que **no** se pueden deshacer.
- Nunca al abrir la app.
- Si la persona eligió una acción y quieres ofrecerle opciones relacionadas, usa una hoja de acciones, no una alerta.

## Contenido
- `title`: qué pasó y por qué, concreto, en máximo dos líneas. Nunca «Error» ni un código. Si es una oración completa, termina con puntuación; si es un fragmento, sin punto final.
- `message`: solo si aporta, en oraciones completas. No expliques los botones.
- `children`: un campo de texto solo si hace falta un dato para resolver, como una contraseña.
- Tono directo, neutral y cercano. No culpes a la persona ni escondas la gravedad.

## Botones
- Como máximo 3, de una o dos palabras, que empiecen con verbo y digan el resultado («Eliminar», «Reintentar»). «Aceptar» solo en alertas puramente informativas; nunca «Sí» ni «No».
- El que cancela se llama siempre **«Cancelar»** (`role: 'cancel'`) y nunca es el botón por defecto. En fila va a la izquierda; con 3 botones, abajo.
- El botón por defecto (`role: 'default'`) es la opción más probable. Va a la derecha, o arriba si están apilados, y recibe el foco al abrir.
- `role: 'destructive'` (rojo) solo para una acción destructiva que la persona **no** eligió deliberadamente. Si eligió «Vaciar papelera», el botón que lo confirma no va en rojo. Si hay una acción destructiva, siempre incluye «Cancelar».
- Si quieres que lean antes de actuar, no marques ningún botón por defecto: el foco va a «Cancelar».

## Comportamiento
- Esc equivale a «Cancelar». El foco queda atrapado dentro de la alerta y vuelve a donde estaba al cerrar.
- Se anuncia como `alertdialog`, con título y mensaje.
- Aparece con la receta «invocar» de IBM: `duration-moderate-02` + `easing-standard-expressive`, sobre el velo `overlay-01`, en `z-modal`.
- Evita alertas que necesiten scroll: título corto y mensaje breve.
