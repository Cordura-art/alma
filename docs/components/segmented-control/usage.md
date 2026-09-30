---
component: SegmentedControl
tab: Uso
summary: Un selector de una opción entre pocas alternativas, en una píldora.
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

1. **Contenedor** en píldora, con borde.
2. **Opción.**
3. **Opción elegida**: fondo blanco.

> **Imagen pendiente:** la píldora de pasajes con la opción «Ida» elegida, en tema oscuro y claro.

## Contenido

- Textos cortos, de una a tres palabras, del mismo tipo.
- Todas las opciones del mismo largo aproximado.
- La opción por defecto, la más usada.

## Comportamiento

- Elegir cambia la vista al instante.
- Siempre hay una opción elegida.

## Relacionados

`Tabs` · `RadioGroup` · `PopUpButton` · `Tag` (filtros).

## Referencias

- Apple, Human Interface Guidelines: Segmented controls.
- IBM, Carbon Design System: Content switcher.
