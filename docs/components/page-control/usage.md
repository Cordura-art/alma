---
component: PageControl
tab: Uso
summary: Una fila de puntos, uno por página, para moverse en un carrusel.
---


## Resumen

`PageControl` muestra cuántas páginas hay en una lista plana (un carrusel, un recorrido de bienvenida) y cuál se está viendo. Es el *page control* de Apple.

### Cuándo usarlo
- Carruseles y recorridos de pantallas del mismo nivel, idealmente de 3 a 10.

### Cuándo no usarlo
- **Datos paginados en una tabla o una lista:** `Pagination`.
- **Pasos de un flujo:** `ProgressIndicator`.
- **Más de 10 páginas:** no se pueden contar de un vistazo.

## Anatomía

1. **Punto** por página.
2. **Página actual**: una píldora más ancha.

> **Imagen pendiente:** 5 puntos con el tercero como página actual.

## Comportamiento

- Tocar un punto lleva a su página.
- La página actual se distingue por la forma (más ancha), no solo por el color.
- Acompáñalo de una forma más de moverse: deslizar el carrusel o botones anterior y siguiente.

## Relacionados

`Pagination` · `ProgressIndicator`.

## Referencias

- Apple, Human Interface Guidelines: Page controls.
