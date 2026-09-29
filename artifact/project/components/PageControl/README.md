# PageControl

Fila de puntos, uno por página, para moverse en una lista plana de páginas, como un carrusel (en Apple, *page control*).

## Cuándo usarlo
- Carruseles y recorridos de pantallas del mismo nivel, idealmente de 3 a 10 páginas.
- Para datos paginados en una tabla o lista, usa `Pagination`.

## Estado sin depender del color
El punto actual es una píldora más ancha, en `nav-selected`; los demás son puntos en `border-control`. Cada punto mide 20 × 44 px para tocarlo, y las flechas del teclado cambian de página.
