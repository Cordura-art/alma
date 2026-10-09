---
element: Figuras de línea
order: 11
tab: Resumen
summary: Objetos dibujados con una sola línea fina, que responden al puntero y al teclado.
---

## Para qué

Una figura de línea es un objeto dibujado con una sola línea fina, visto desde arriba y de lado. Sirve para explicar una idea con un objeto: algo que se abre y se cierra, elegir una cosa entre muchas, algo continuo que responde a dónde estás. También sirve de imagen cuando no hay foto: en una `ProductCard`, en un `EmptyState`, en una portada.

No es 3D ni lleva relleno. Son líneas de ALMA, con los tonos del tema y una sola marca en el color de la entidad.

![Seis figuras de línea en dos filas: un terreno de líneas con una colina, una pila de fichas, un portátil abierto, un teléfono en sus cuatro capas, un router con sus antenas y un teclado. Cada una es solo línea fina sobre el fondo de la página, con una única marca en el color de acento.](assets/Fundamentos/figuras-muestra.png)

El catálogo completo, en vivo, está en la pestaña **Catálogo**.

## Cuándo usarlas

- Para explicar con un objeto lo que un párrafo no alcanza.
- En lugar de una foto que no existe: se ven bien en cualquier tema y en cualquier entidad, sin rehacerlas.
- En un espacio propio, con aire alrededor.

## Cuándo no

- **Para decir algo importante:** una figura acompaña y no informa. Un error, un precio o un aviso van en texto.
- **Como ícono:** para eso está `Icon`.
- **Muchas a la vez moviéndose:** en una grilla, quietas.

## Reglas

- **Solo línea.** Ningún relleno, salvo el del fondo, que tapa lo que queda detrás.
- **Una sola marca de color,** el acento. Todo lo demás son tonos de línea.
- **Nada sale del cuadro,** que mide 400 por 320.
- **En reposo ya es un objeto compuesto.** Nunca una grilla vacía ni un plano.
- **Lo cercano tapa lo lejano.**
- **Se mueve solo mientras algo cambia.** Fuera de la pantalla, o si la persona pidió menos movimiento, queda quieta.
- **Sin palabras adentro.** Lo que dice va en su pie.
- **Sólidos de esquinas redondas:** una silueta y un pliegue. Sus esquinas verticales no llevan línea.

## Los tonos

| Token | Para qué |
|---|---|
| `figura-fondo` | El fondo. También tapa lo que queda detrás de cada objeto. |
| `figura-borde` | El contorno de cada objeto. |
| `figura-medio` | Pliegues y líneas interiores. |
| `figura-lejos` | Lo del fondo. |
| `figura-realce` | Lo elegido. |
| `figura-acento` | Su única marca de color. En una entidad, su color. |

Todos dan al menos 3:1 sobre el fondo, en los cuatro temas.

## Propias de cada entidad

Con los rasgos de una entidad, cada figura toma de su carta cuántas piezas tiene, qué tan redondas son sus esquinas, sus proporciones y cómo descansa. La misma carta da siempre las mismas figuras. Se ven en el Lenguaje de cada entidad, en Ilustración.

## Movimiento

- Lo que sigue al puntero usa resortes.
- Lo demás usa `duration-slow-02`, `easing-standard-expressive` y `duration-stagger`.
- Con movimiento reducido responde sin rebote.

## Accesibilidad

- Es una imagen con nombre: dice qué muestra.
- Se entra con el tabulador. Las flechas hacen lo que el puntero, y Escape la deja en reposo.
- El foco usa `focus`.
- Lo que dice se anuncia cuando deja de cambiar, no a cada paso.
- Dentro de una tarjeta que ya se puede tocar, la figura queda quieta y sin parada de teclado: lo que responde es la tarjeta.

## Relacionados

`ProductCard` · `EmptyState` · `ImageView` · `Pictogram` · Movimiento.
