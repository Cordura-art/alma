# Pictogram

Un dibujo de línea pequeño que distingue una cosa de sus vecinas.


## Uso

### Resumen

`Pictogram` dibuja un pictograma: un dibujo de línea que le pertenece a una cosa y va junto a su nombre. El nombre elige el dibujo, y el mismo nombre da siempre el mismo. Se dibuja como un ícono de Carbon: en la misma grilla, con el mismo trazo y pocas piezas. La regla completa está en el fundamento **Íconos**.

#### Cuándo usarlo
- En listas y tarjetas donde varias cosas del mismo tipo se parecen y la persona vuelve a buscarlas.
- Siempre junto al nombre de la cosa.

#### Cuándo no usarlo
- **En botones, menús, campos o avisos:** ahí va `Icon`.
- **Para decir un estado:** dilo con la palabra y, si hace falta, con `Icon`.
- **Solo, sin nombre.**
- **En más de una lista por pantalla:** si todo lleva dibujo, nada se distingue.

### Tipos

Hay tres, uno para cada caso. Usa uno solo por lista.

| Tipo | `kind` | Para qué | Qué dibuja |
|---|---|---|---|
| Sello | `seal` (por defecto) | Tipos de cosas: etiquetas, archivos, categorías. | Una base y una marca, de un vocabulario pequeño. |
| Letra | `letter` | Lo que va en orden o numerado: capítulos, pasos, versiones. | La inicial del nombre y su número, dentro de un marco. |
| Criatura | `creature` | Lo que tiene carácter: proyectos, equipos, espacios. | Una cabeza, dos ojos y un rasgo: los personajes de la entidad. |

![Tres listas con pictogramas a 24 px junto a cada nombre: sellos para tipos de cosas, letras para los capítulos de un libro y criaturas para proyectos y equipos; al lado, un pictograma de cada tipo a 24 y 32 px.](assets/Componentes/pictogram-lista.png)

- La **letra** es la única que dice algo del nombre. «Capítulo 3» se escribe `C3`; un número de dos cifras va solo (`12`).

### Tamaños

| Tamaño | Uso |
|---|---|
| 24 px (por defecto) | Filas de lista y tarjetas. |
| 32 px | Encabezados y zonas vacías. |

### En una lista

Pide los dibujos del conjunto completo con `pictogramDrawings()`: así dos nombres de la misma lista no comparten dibujo mientras el tipo tenga dibujos libres. Hay 56 sellos, 30 criaturas y 5 marcos de letra.

### Contenido

- El pictograma sale del nombre: si la cosa cambia de nombre, cambia de dibujo.
- No explica qué es la cosa; la distingue de las que tiene al lado.

### Relacionados

Íconos (fundamento) · `Icon` · `List`.

## Estilo

### Color

El pictograma hereda el color del texto (`currentColor`), igual que un ícono. Ponlo dentro de algo que ya use:

| Token | Uso |
|---|---|
| `icon-01` | El color por defecto. |
| `nav-selected` | Cuando quieras que se note: es el acento que alcanza contraste de texto en todos los temas. |

No trae colores propios, ni fondo.

### Tamaño

| Tamaño | Token | En rem |
|---|---|---|
| 24 px | `icon-size-lg` | 1,5 |
| 32 px | `icon-size-xl` | 2 |

Van en `rem`: crecen con el texto.

### Trazo

- Se dibuja en la misma grilla de 32 px de los íconos de Carbon, con su mismo trazo: 2 px en la grilla.
- Cada pictograma tiene entre dos y cinco piezas.
- Las esquinas siguen las de la entidad: redondas, o rectas cuando `radius-button` es 0.
- La letra usa la tipografía de la página, en peso 600 y a su ancho normal, aunque el texto de la entidad sea más ancho.

### Semilla

Cada sistema dibuja sus propios pictogramas: el mismo nombre da otro dibujo en otra entidad. La semilla es la fecha de nacimiento: ALMA usa la de Cordura, y cada entidad declara la suya en su hoja de valores (`--pictogram-seed`).

### Contraste

Un pictograma necesita 3:1 contra su fondo, como un ícono. La letra es texto pequeño: dale 4,5:1.

## Código

### Uso

```js
const { Pictogram } = window.AlmaDS;
h(Pictogram, { name: 'Etiquetas' })                      // un sello
h(Pictogram, { name: 'Capítulo 3', kind: 'letter' })     // C3 en un marco
h(Pictogram, { name: 'Proyecto Atlas', kind: 'creature', size: 32 })
```

### Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `name` | `string \| number` | — | El nombre de la cosa. Mayúsculas y espacios al borde no cambian el dibujo. |
| `kind` | `'seal' \| 'letter' \| 'creature'` | `'seal'` | El tipo de pictograma. |
| `size` | `24 \| 32` | `24` | En px; se dibuja en rem. |
| `drawing` | `number` | — | Uno de los dibujos del tipo, como lo entrega `pictogramDrawings()` para una lista. |
| `color` | `string` | — | Mejor heredarlo; si lo pasas, usa un token (`var(--nav-selected)`). |
| `label` | `string` | — | Nombre para el lector. Omítelo si el nombre de la cosa está al lado. |
| `className` | `string` | — | — |

### En una lista

```js
const nombres = ['Proyecto Atlas', 'Equipo de voz', 'Taller'];
const dibujos = AlmaDS.pictogramDrawings(nombres, 'creature');
nombres.map((n, i) => h(Pictogram, { key: n, name: n, kind: 'creature', drawing: dibujos[i] }))
```

`pictogramDrawings(nombres, kind)` reparte los dibujos del tipo para que ninguno se repita mientras queden disponibles. La misma lista da siempre el mismo reparto.

### Lo que el componente lee de la entidad

```js
AlmaDS.configurePictograms({ seed: 'nac|2026-10-01|12:00|America/Santiago' });
```

No suele hacer falta: el componente lee la semilla de la hoja de valores de la entidad (`--pictogram-seed`), y las esquinas del token `radius-button`. `configurePictograms` los fija a mano (`seed`, `stroke` con 1 = el trazo de Carbon, `round`); con `null` vuelve a leerlos. Devuelve los valores con que se dibuja.

Los dibujos viven en `entidades/pictogramas.mjs`. `npm run build` los copia al paquete de componentes; no se editan en `bundle.js`.

## Accesibilidad

### Qué ofrece ALMA

- Sin `label`, el pictograma es decorativo: queda oculto para el lector. Es el caso normal, porque el nombre de la cosa va al lado.
- Con `label`, se anuncia con ese nombre (`role="img"`).
- Crece con el texto.

### Recomendaciones de diseño

- Nunca dejes que el pictograma sea la única forma de reconocer algo: el nombre siempre está.
- No lo uses para comunicar un estado ni una acción: una persona que no lo ve no pierde nada.
- La letra de un pictograma repite lo que ya dice el nombre: no la leas dos veces, déjala decorativa.
- Dos pictogramas pueden parecerse. En una lista, repártelos con `pictogramDrawings()`.

### Verificación

axe sin problemas en los cuatro temas, con los tres tipos.
