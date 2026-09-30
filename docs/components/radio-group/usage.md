---
component: RadioGroup
tab: Uso
summary: Un grupo de opciones excluyentes, todas visibles: solo se puede elegir una.
---

## Resumen

`RadioGroup` muestra de 3 a 5 opciones excluyentes a la vez. Elegir una desmarca la anterior.

### Cuándo usarlo
- Cuando conviene comparar las opciones antes de elegir (tipo de asiento, forma de entrega).
- De 3 a 5 opciones.

### Cuándo no usarlo
- **Dos opciones cortas o una barra:** `SegmentedControl`.
- **Muchas opciones o poco espacio:** `PopUpButton` o `Combobox`.
- **Varias opciones a la vez:** `Checkbox`.
- **Encender o apagar:** `Switch`.

## Anatomía

1. **Título del grupo:** la pregunta.
2. **Botón de opción:** círculo de 20 px; elegido, con un punto dentro.
3. **Etiqueta** de cada opción.
4. **Ayuda** (opcional) bajo el grupo.

> **Imagen pendiente:** anatomía numerada de un grupo de 3 opciones con ayuda.

## Estados

| Estado | Forma |
|---|---|
| Sin elegir | Círculo vacío con borde. |
| Elegida | Círculo con borde de color y punto dentro. |
| Foco | Anillo de foco alrededor del círculo. |
| Desactivado | Todo al 45 % de opacidad. |

> **Imagen pendiente:** los estados en tema oscuro y claro.

## Contenido

- **Título:** una pregunta o un sustantivo («Tipo de asiento»).
- **Opciones:** cortas, paralelas en forma y en un orden lógico (del más barato al más caro, del más al menos común).
- **Opción por defecto:** marca la que más gente elige; deja el grupo sin elegir solo si la decisión debe ser consciente.
- Incluye «Otro» o «Ninguno» si ninguna opción puede aplicar.

## Comportamiento

- Toda la fila se puede tocar.
- Las flechas del teclado mueven la selección dentro del grupo; Tab entra y sale del grupo como una sola parada.

## Relacionados

`SegmentedControl` · `PopUpButton` · `Checkbox`.

## Referencias

- Apple, Human Interface Guidelines: Toggles (radio buttons).
- IBM, Carbon Design System: Radio button.
