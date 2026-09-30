---
element: Íconos
order: 5
tab: Resumen
summary: Íconos de IBM Carbon, dibujados como SVG dentro de la página.
---

## La biblioteca

ALMA usa los íconos de **IBM Carbon** (`@carbon/icons` 11.89, licencia Apache 2.0), dibujados como SVG dentro de la página: no hay fuentes que descargar, se ven desde el primer instante y heredan el color del texto.

- ALMA incluye **896 íconos de interfaz**: acciones, navegación, estados, personas, comercio y viajes.
- El catálogo completo, con **2.775 íconos**, sus categorías y sinónimos, está en `assets/Icons/carbon-icons.json`. Se carga solo cuando hace falta.
- Reemplazan a Material Symbols desde el 29 de septiembre de 2026: las tres fuentes de Material pesaban 12,6 MB por página y dejaban los íconos invisibles hasta cargar.

![Veinticuatro íconos frecuentes de IBM Carbon en su grilla de 32 px: flechas, cerrar, buscar, información, advertencia, bus, billetera, usuario y otros, con su nombre.](assets/Iconos/muestra.png)

## Tamaños

| Token | Tamaño | Uso |
|---|---|---|
| `icon-size-sm` | 16 px | Dentro de datos densos: tablas, etiquetas, contadores. |
| `icon-size-md` | 20 px | Dentro de controles: menús, campos de búsqueda, selectores. |
| `icon-size-lg` | 24 px | Por defecto. |
| `icon-size-xl` | 32 px | En zonas vacías y estados vacíos. |

Van en `rem`: crecen con el texto.

## Estilo

- Un solo peso y un solo estilo, dibujados en una grilla de 32 px y escalados.
- Contorno por defecto. La versión rellena (`filled`) se usa para lo elegido (el destino actual de la navegación) y en avisos.
- Sin emoji, y sin mezclar otros sets.
