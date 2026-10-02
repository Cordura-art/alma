# Pictogram

Un dibujo de línea pequeño que distingue una cosa de sus vecinas.


## Uso

### Resumen

`Pictogram` dibuja un pictograma: un dibujo de línea que le pertenece a una cosa (un capítulo, un proyecto, una etiqueta). El nombre de la cosa elige el dibujo, y el mismo nombre da siempre el mismo. No explica qué es la cosa; la distingue de las que tiene al lado, como una huella. La regla completa está en el fundamento **Íconos**.

#### Cuándo usarlo
- En listas y tarjetas donde varias cosas del mismo tipo se parecen y la persona vuelve a buscarlas.
- Siempre junto al nombre de la cosa.

#### Cuándo no usarlo
- **En botones, menús, campos o avisos:** ahí va `Icon`.
- **Para decir un estado:** dilo con la palabra y, si hace falta, con `Icon`.
- **Solo, sin nombre.**
- **En más de una lista por pantalla:** si todo lleva dibujo, nada se distingue.

### Tamaños

| Tamaño | Uso |
|---|---|
| 24 px (por defecto) | Filas de lista y tarjetas. |
| 32 px | Encabezados y zonas vacías. |

A 16 y 20 px los dibujos pierden detalle: no los uses.

![Seis borradores de un libro, cada uno con su pictograma a 24 px junto a su nombre, y el pictograma de «Capítulo 3» a 24 y 32 px.](assets/Componentes/pictogram-lista.png)

### En una lista

Pide los dibujos del conjunto completo con `pictogramDrawings()`: así dos nombres de la misma lista no comparten dibujo. Sueltos, cerca de uno de cada veinte nombres coincide con otro.

### Contenido

- El pictograma sale del nombre: si la cosa cambia de nombre, cambia de dibujo.
- Hay 30 dibujos, cada uno con hasta ocho composiciones. Vienen de un estudio de íconos para banca: aparecen gráficos, escudos y balanzas, pero aquí no significan eso.

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

- Se dibuja en la misma grilla de 32 px de los íconos.
- El grosor sigue el peso del texto: 2 px en la grilla cuando `font-weight-body` es 400, y proporcional a ese peso. Con el peso de ALMA (350) son 1,75 px.
- El remate de las líneas sigue las esquinas: redondo, o recto cuando `radius-button` es 0.

### Semilla

Cada sistema dibuja sus propios pictogramas: el mismo nombre da otro dibujo en otra entidad. La semilla es la fecha de nacimiento: ALMA usa la de Cordura, y cada entidad declara la suya en su hoja de valores (`--pictogram-seed`).

### Contraste

Un pictograma necesita 3:1 contra su fondo, como un ícono.

## Código

### Uso

```js
const { Pictogram } = window.AlmaDS;
h(Pictogram, { name: 'Capítulo 3' })
h(Pictogram, { name: 'Capítulo 3', size: 32 })
```

### Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `name` | `string \| number` | — | El nombre de la cosa. Mayúsculas y espacios al borde no cambian el dibujo. |
| `size` | `24 \| 32` | `24` | En px; se dibuja en rem. |
| `drawing` | `number` | — | Uno de los dibujos, como lo entrega `pictogramDrawings()` para una lista. |
| `color` | `string` | — | Mejor heredarlo; si lo pasas, usa un token (`var(--nav-selected)`). |
| `label` | `string` | — | Nombre para el lector. Omítelo si el nombre de la cosa está al lado. |
| `className` | `string` | — | — |

### En una lista

```js
const nombres = ['Prólogo', 'Capítulo 1', 'Capítulo 2'];
const dibujos = AlmaDS.pictogramDrawings(nombres);
nombres.map((n, i) => h(Pictogram, { key: n, name: n, drawing: dibujos[i] }))
```

`pictogramDrawings` reparte los dibujos para que ninguno se repita mientras queden disponibles. La misma lista da siempre el mismo reparto.

### La semilla de una entidad

```js
AlmaDS.configurePictograms({ seed: 'nac|2026-10-01|12:00|America/Santiago' });
```

No suele hacer falta: el componente lee la semilla de la hoja de valores de la entidad (`--pictogram-seed`), y el grosor y el remate de los tokens `font-weight-body` y `radius-button`. `configurePictograms` los fija a mano (`seed`, `stroke` con 1 = el trazo base, `round`); con `null` vuelve a leerlos. Devuelve los valores con que se dibuja.

Los dibujos viven en `entidades/pictogramas.mjs`. `npm run build` los copia al paquete de componentes; no se editan en `bundle.js`.

## Accesibilidad

### Qué ofrece ALMA

- Sin `label`, el pictograma es decorativo: queda oculto para el lector. Es el caso normal, porque el nombre de la cosa va al lado.
- Con `label`, se anuncia con ese nombre (`role="img"`).
- Crece con el texto.

### Recomendaciones de diseño

- Nunca dejes que el pictograma sea la única forma de reconocer algo: el nombre siempre está.
- No lo uses para comunicar un estado ni una acción: una persona que no lo ve no pierde nada.
- Dos pictogramas pueden parecerse. En una lista, repártelos con `pictogramDrawings()`.

### Verificación

Pendiente: axe en los cuatro temas.
