---
component: Card
tab: Uso
summary: Un contenedor de un tema: un viaje, una noticia, una configuración.
---


## Resumen

`Card` reúne lo que se sabe de una cosa en un bloque: imagen, título, datos y, si hace falta, acciones. Toda la tarjeta puede ser un solo enlace. Es la *tile* de Carbon.

### Cuándo usarla
- Colecciones de elementos parecidos que se hojean: viajes, noticias, destinos.
- Un resumen que lleva al detalle.

### Cuándo no usarla
- **Para comparar elementos por los mismos datos:** `Table`.
- **Para listas de ajustes o destinos:** `List`.
- **Para un producto con despliegue y color de marca:** `ProductCard`.

## Anatomía

1. **Imagen** (opcional).
2. **Antetítulo** (opcional): fecha o categoría.
3. **Título.**
4. **Subtítulo** (opcional).
5. **Contenido** (opcional).
6. **Acciones** (opcionales), abajo.

![Una tarjeta de viaje con imagen, antetítulo con la fecha, título con la ruta, subtítulo con el asiento y la acción «Ver pasaje».](assets/Componentes/card-viaje.png)

## Tipos

| Tipo | Propiedad | Comportamiento |
|---|---|---|
| Informativa | — | Solo muestra. |
| Enlace | `href` u `onClick` | Toda la tarjeta lleva a un destino; el enlace va en el título. |
| Con acciones | `actions` | Botones propios que quedan por encima del enlace general. |

- Si la tarjeta ya es un enlace, que las acciones sean secundarias.
- No pongas enlaces dentro del contenido de una tarjeta enlace: compiten con el destino.

## Contenido

- **Título:** el nombre de la cosa, corto.
- **Antetítulo:** un dato breve que ubica («31 mar · Interurbano»).
- **Imagen:** 16:9 por defecto; `alt` vacío si es decorativa.

## Comportamiento

- La imagen se carga cuando se acerca a la pantalla.
- En una grilla, todas las tarjetas del mismo ancho; el alto lo da el contenido.

## Relacionados

`ProductCard` · `PaymentCard` · `List` · `Table`.

## Referencias

- IBM, Carbon Design System: Tile.
