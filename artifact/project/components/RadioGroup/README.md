# RadioGroup

Grupo de opciones mutuamente excluyentes, cada una con su propia etiqueta. Úsalo cuando hay más de dos opciones y conviene verlas todas a la vez.

## Cuándo usarlo
- De 3 a 5 opciones visibles. Con más opciones, o poco espacio, usa `PopUpButton`.
- Para 2 o 3 opciones cortas en una barra, usa `SegmentedControl`.

## Qué aporta quien lo usa
- `label`: la pregunta del grupo (se lee como `legend`).
- `options`, `value`/`onChange` o `defaultValue`. Marca por defecto la opción que más gente elige.
- `help`: una línea opcional bajo el grupo.

## Estado sin depender del color
Un círculo vacío o un círculo con punto: forma distinta, no solo color. Se navega con las flechas del teclado y el área de toque es de 44 px.
