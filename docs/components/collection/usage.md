---
component: Collection
tab: Uso
summary: Ítems del mismo tipo que se miran más que se leen, en grilla o en una fila.
---


## Resumen

`Collection` ordena ítems parecidos (fotos, tarjetas, destinos) en una grilla que llena el ancho, o en una fila que se desplaza. Es la *collection* de Apple.

## Cuándo usarla

- Para ítems que se reconocen por su imagen o su forma.
- Para ítems de tamaños distintos.

## Cuándo no

- **Para texto:** una `List` se recorre mejor. Las filas se leen; las grillas se miran.
- Para comparar datos: `Table`.

## Dos formas

| Forma | `layout` | Para |
|---|---|---|
| **Grilla** | `grid` | Verlos todos. Las columnas se acomodan solas al ancho. |
| **Fila** | `row` | Una muestra, dentro de una página con más cosas. Se desplaza hacia el lado. |

![Dos colecciones de destinos. Arriba, en grilla: seis tarjetas iguales en tres columnas, cada una con su distancia y su nombre. Abajo, en fila: las mismas tarjetas en una sola línea que sigue más allá del borde, con la última cortada para mostrar que hay más.](assets/Componentes/collection-formas.png)

## Qué va en una celda

- **Una sola pieza por celda:** una `Card`, una `ImageView`, un `Widget`. La colección ordena; no dibuja.
- **Todas del mismo tipo.** Si una celda es distinta de las demás, no es parte de la colección.
- **El ancho mínimo manda** (`minItemWidth`): la colección pone tantas columnas como quepan y reparte lo que sobra. No fijes un número de columnas.
- **En fila, la última celda se corta** a propósito: dice que hay más hacia el lado.

## Reglas

- **El mismo tamaño de celda**, o el doble para lo destacado. Tamaños arbitrarios desordenan.
- **`space-16` entre ítems.** Lo de adentro de cada ítem va más junto.
- **En una fila, el último ítem se ve cortado:** así se nota que hay más.
- **El orden no cambia** al cambiar el ancho: se lee de izquierda a derecha y de arriba abajo.

## Relacionados

`Card` · `List` · `ImageView` · `ProductCard` · Diseño adaptable.

## Referencias

- Apple, Human Interface Guidelines: Collections.
