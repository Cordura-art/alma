---
component: Rating
tab: Uso
summary: Cómo se valoró algo, en estrellas; o las estrellas para valorarlo.
---


## Resumen

`Rating` muestra una valoración de una a cinco estrellas, o deja elegirla. Es el *rating indicator* de Apple.

## Cuándo usarlo

- Para mostrar cómo valoró la gente un producto, un viaje, un lugar.
- Para pedirle a alguien su valoración.

## Cuándo no

- Para decir si una respuesta de la IA sirvió: eso son los dos botones de `ChatMessage`. Dos opciones se responden más que cinco.
- Para una cantidad que no es una opinión: eso es un `Gauge`.
- Como «favorito»: una sola estrella que se marca es un `Button` interruptor.

## Dos usos

![Tres valoraciones. Para leer: cuatro estrellas y media con su cifra «4,5» y «(1.284)» entre paréntesis; y una chica de tres estrellas con «(12)». Para elegir: cinco estrellas más grandes y separadas, con tres marcadas.](assets/Componentes/rating-usos.png)

| Uso | Qué muestra |
|---|---|
| **Para leer** | Las estrellas, la cifra y cuánta gente valoró. |
| **Para elegir** | Cinco estrellas que se tocan. |

## Anatomía, para leer

1. **Estrellas:** llenas, medias o vacías.
2. **Cifra** (opcional): «4,5». Texto principal, con peso.
3. **Cuántas valoraciones:** «(1.284)». Texto secundario.

## Contenido

- **La cifra acompaña a las estrellas**, no las reemplaza: media estrella no se lee con precisión.
- **Di cuántas valoraciones hay.** «5 estrellas» de una persona no es lo mismo que de mil.
- **Sin valoraciones, dilo:** «Aún sin valoraciones». Cinco estrellas vacías parecen un cero.
- **Al pedir una valoración, pregunta algo concreto:** «¿Cómo estuvo tu viaje?».

## Comportamiento, para elegir

- Tocar una estrella la elige, con todas las anteriores.
- Tocar la misma otra vez la quita.
- No se pueden elegir medias estrellas.

## Relacionados

`ProductCard` · `ChatMessage` · `Gauge` · `RadioGroup` · Jerarquía.

## Referencias

- Apple, Human Interface Guidelines: Rating indicators.
