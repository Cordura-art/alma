---
component: SegmentedControl
tab: Uso
summary: Un selector de una opción entre pocas alternativas, con una pieza que se desliza a la opción elegida.
---


## Resumen

`SegmentedControl` elige una opción entre dos y cuatro, todas visibles, y cambia la vista al instante. Nace de la pantalla de pasajes de Cordura («Ida / Ida y regreso / Por cobrar») y es el *segmented control* de Apple.

### Cuándo usarlo
- Cambiar entre vistas o modos de la misma información: «Ida» o «Ida y regreso».
- Filtrar una lista por un criterio con pocas opciones.
- Idealmente 2 o 3 opciones; como máximo 4.

### Cuándo no usarlo
- **Paneles con contenido distinto:** `Tabs`.
- **Más de 4 opciones:** `PopUpButton` o `RadioGroup`.
- **Encender o apagar:** `Switch`.
- **Un dato que se envía con un formulario y necesita descripción:** `RadioGroup`.

## Anatomía

1. **Riel**: un fondo hundido respecto de la superficie, con esquinas `radius-button` y sin borde.
2. **Segmento**: cada opción. Todos miden lo mismo.
3. **Pieza elegida**: una sola pieza con contorno que se desliza bajo el texto hasta la opción elegida. Sus esquinas son concéntricas con las del riel.

![SegmentedControl de tipo de pasaje con la opción «Ida» elegida, en tema oscuro y claro.](assets/Componentes/segmented-control-ida.png)

## Contenido

- Textos cortos, de una a tres palabras, del mismo tipo.
- Todas las opciones del mismo largo aproximado: los segmentos miden lo mismo, y un texto mucho más largo que los demás deja a los otros con aire de sobra.
- Sustantivos o frases nominales: «Semana», «Ida y regreso».
- Solo texto en todos los segmentos; no mezcles texto e íconos.
- La opción por defecto, la más usada.

## Comportamiento

- Elegir cambia la vista al instante.
- Siempre hay una opción elegida.
- La pieza elegida se desliza de una opción a otra; no aparece y desaparece.
- Los segmentos miden lo mismo mientras haya espacio. Si el control no cabe en su contenedor, cada segmento toma el ancho de su texto.

## Relacionados

`Tabs` · `RadioGroup` · `PopUpButton` · `Tag` (filtros).

## Referencias

- Apple, Human Interface Guidelines: Segmented controls.
- IBM, Carbon Design System: Content switcher.
