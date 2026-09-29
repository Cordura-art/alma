# Checkbox

Casilla cuadrada vacía (apagada), con check (encendida) o con guion (mixta). Úsala en lugar de un switch cuando haya una **jerarquía** de opciones.

## Cuándo usarlo
- En listas de opciones independientes y en grupos padre/hijos: alinéalos por el borde izquierdo e indenta los hijos.
- Si tu interfaz ya usa checkbox, no lo reemplaces por un switch.
- Para opciones excluyentes, usa `RadioGroup`.

## Qué aporta quien lo usa
- `label`: a la derecha de la casilla.
- `checked`/`onChange` o `defaultChecked`.
- `indeterminate`: para el padre cuando solo algunos hijos están marcados. Se anuncia como «mixto».

## Estado sin depender del color
Hay tres formas distintas: vacío, check y guion. El relleno usa `control-on` y la marca `control-on-mark`. La casilla mide 20 px y su área de toque es de 44 px.
