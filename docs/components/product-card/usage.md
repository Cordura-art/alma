---
component: ProductCard
tab: Uso
summary: Algo que se vende: su imagen, su nombre, su precio y una acción.
---


## Resumen

`ProductCard` presenta un producto en una grilla o en una lista: su imagen, su nombre, lo que dice la gente de él, lo que cuesta y una cosa que hacer con él. Toda la tarjeta abre el producto; su acción tiene un área propia.

## Anatomía

1. **Imagen**, en proporción 4 a 3. Lo primero que se mira.
2. **Insignia** (opcional): una sola palabra sobre la imagen. «Nuevo».
3. **Categoría** (opcional), en texto secundario.
4. **Nombre.** Es el título de la tarjeta y su enlace.
5. **Descripción** (opcional): una frase, dos líneas como mucho.
6. **Valoración** (opcional): las estrellas, la cifra y cuántas personas opinaron.
7. **Precio**, y su nota: las cuotas, hasta cuándo vale.
8. **Acción:** una sola. «Agregar».

![ProductCard. A la izquierda, una tarjeta con sus partes numeradas: la imagen (1) con la insignia «Nuevo» (2), la categoría (3), el nombre (4), la descripción (5), la valoración (6), el precio con su nota (7) y la acción «Agregar» (8). Al centro, una con rebaja: el precio anterior tachado junto al nuevo. A la derecha, una agotada: la imagen apagada y, en lugar de la acción, «Agotado. Vuelve el 12 de abril.»](assets/Componentes/product-card-tono.png)

## Cuándo usarla

- En una grilla o un carrusel de productos: úsala dentro de una `Collection`.
- En una lista corta, como un carro: con `layout: 'horizontal'`.

## Cuándo no

- **Para un contenido que no se vende:** `Card`.
- **Para comparar muchos productos por sus datos:** `Table`.
- **Para un texto que se despliega:** `Accordion`. Hasta octubre de 2026 `ProductCard` era una tarjeta desplegable de color; ese uso es de `Accordion`.

## El precio

- **El precio de hoy es lo más visible** después del nombre.
- **Una rebaja muestra los dos precios:** el anterior tachado y más chico, a la izquierda, y el nuevo. Nunca solo el color dice que hay rebaja.
- **La nota dice la condición:** «o 6 cuotas de $14.998», «Hasta el 4 de abril». Una línea.
- **Con el formato del país:** «$89.990».

## Agotado

Cuando no se puede comprar, la acción se reemplaza por un texto que dice por qué y, si se sabe, hasta cuándo: «Agotado. Vuelve el 12 de abril.» La imagen se apaga. La tarjeta se sigue pudiendo abrir.

## Reglas

- **Una sola acción.** Dos botones en cada tarjeta de una grilla son demasiados.
- **La acción es `tinted`,** no `filled`: en una grilla hay muchas, y ninguna es la principal de la pantalla.
- **La insignia es una palabra,** y pocas tarjetas la llevan. Si todas son «Nuevo», ninguna lo es.
- **Todas las tarjetas de una grilla miden lo mismo** y llevan las mismas partes, aunque alguna quede vacía.
- **La imagen muestra el producto,** sobre un fondo parejo. Su texto alternativo dice qué es.
- **Sin fotos, usa una figura de línea** (`media`): toma los tonos de línea del tema y el acento de la entidad, y no hay que rehacerla para cada una. Dentro de la tarjeta queda quieta: lo que responde es la tarjeta.

## Relacionados

`Card` · `Collection` · `Rating` · `ImageView` · `Table`.

## Referencias

- Apple, Human Interface Guidelines: Collections; Buttons.
- Baymard Institute: Product list item design.
