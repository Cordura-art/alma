# Rating

Cómo se valoró algo, en estrellas; o las estrellas para valorarlo.


## Uso

### Resumen

`Rating` muestra una valoración de una a cinco estrellas, o deja elegirla. Es el *rating indicator* de Apple.

### Cuándo usarlo

- Para mostrar cómo valoró la gente un producto, un viaje, un lugar.
- Para pedirle a alguien su valoración.

### Cuándo no

- Para decir si una respuesta de la IA sirvió: eso son los dos botones de `ChatMessage`. Dos opciones se responden más que cinco.
- Para una cantidad que no es una opinión: eso es un `Gauge`.
- Como «favorito»: una sola estrella que se marca es un `Button` interruptor.

### Dos usos

![Tres valoraciones. Para leer: cuatro estrellas y media con su cifra «4,5» y «(1.284)» entre paréntesis; y una chica de tres estrellas con «(12)». Para elegir: cinco estrellas más grandes y separadas, con tres marcadas.](assets/Componentes/rating-usos.png)

| Uso | Qué muestra |
|---|---|
| **Para leer** | Las estrellas, la cifra y cuánta gente valoró. |
| **Para elegir** | Cinco estrellas que se tocan. |

### Anatomía, para leer

1. **Estrellas:** llenas, medias o vacías.
2. **Cifra** (opcional): «4,5». Texto principal, con peso.
3. **Cuántas valoraciones:** «(1.284)». Texto secundario.

### Contenido

- **La cifra acompaña a las estrellas**, no las reemplaza: media estrella no se lee con precisión.
- **Di cuántas valoraciones hay.** «5 estrellas» de una persona no es lo mismo que de mil.
- **Sin valoraciones, dilo:** «Aún sin valoraciones». Cinco estrellas vacías parecen un cero.
- **Al pedir una valoración, pregunta algo concreto:** «¿Cómo estuvo tu viaje?».

### Comportamiento, para elegir

- Tocar una estrella la elige, con todas las anteriores.
- Tocar la misma otra vez la quita.
- No se pueden elegir medias estrellas.

### Relacionados

`ProductCard` · `ChatMessage` · `Gauge` · `RadioGroup` · Jerarquía.

### Referencias

- Apple, Human Interface Guidelines: Rating indicators.

## Estilo

### Color

| Elemento | Propiedad | Token |
|---|---|---|
| Estrella llena o media | color | `text-01` |
| Estrella vacía | color | `border-control` |
| Cifra | color del texto | `text-01` |
| Cuántas valoraciones | color del texto | `text-02` |
| Foco | contorno | `focus` |

Las estrellas son neutras, del color del texto. El acento queda para lo que se puede tocar, y un amarillo propio sería un color más sin trabajo.

### Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso |
|---|---|---|
| Cifra | 14 / 0,875; 12 / 0,75 en `sm` | `font-weight-emphasis` |
| Cuántas valoraciones | 14 / 0,875; 12 / 0,75 en `sm` | `font-weight-body` |

### Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Estrella, para leer | tamaño | `icon-size-20`; `icon-size-16` en `sm` |
| Estrellas, para leer | separación | 2 px |
| Estrellas, cifra y cantidad | separación | `space-8`; `space-4` en `sm` |
| Estrella, para elegir | área de toque | La de un control (44 px) |

## Código

### Uso

```js
const { Rating } = window.AlmaDS;

// Para leer
h(Rating, { value: 4.5, showValue: true, count: 1284 })

// Para elegir
h(Rating, { label: 'Valora tu viaje', value: estrellas, onChange: setEstrellas })
```

Con `onChange` es para elegir. Sin él, es para leer.

### Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `value`, `defaultValue` | número | 0 | La valoración. Para leer admite medios. |
| `max` | número | 5 | Cuántas estrellas. |
| `onChange` | función | — | Recibe la valoración elegida, o 0 al quitarla. |
| `label` | texto | «Tu valoración» | El nombre del grupo, al elegir. |
| `showValue` | sí o no | no | Muestra la cifra junto a las estrellas. |
| `count` | número | — | Cuántas valoraciones hay. |
| `size` | `sm` | — | Más chico, para una lista. |
| `clearable` | sí o no | sí | Si tocar la misma estrella la quita. |
| `disabled` | sí o no | no | — |

## Accesibilidad

### Qué ofrece ALMA

- **Para leer, es una imagen con su texto:** «4,5 de 5 estrellas», y después «1.284 valoraciones».
- **Para elegir, es un grupo de opciones** con nombre. Cada una dice «3 estrellas» y si está elegida.
- **Una sola parada de Tab;** las flechas cambian la valoración.
- **Cada estrella mide 44 px** al elegir.
- **Llena y vacía se distinguen por la forma**, no solo por el color.

### Teclado

| Tecla | Qué hace |
|---|---|
| Tab | Llega al grupo. |
| → ↑ | Una estrella más. |
| ← ↓ | Una estrella menos. |
| Enter, Espacio | Elige, o quita si ya estaba elegida. |

### Recomendaciones de diseño

- Pon la pregunta a la vista junto a las estrellas, y úsala como `label`.
- Confirma lo elegido con texto: «Elegiste 4 de 5».

### Consideraciones de desarrollo

- No envíes la valoración al primer toque sin poder cambiarla.

Pendiente: VoiceOver y NVDA.
