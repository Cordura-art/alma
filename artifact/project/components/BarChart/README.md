# BarChart

Un gráfico de barras para comparar cantidades entre categorías.


## Uso

### Resumen

`BarChart` responde «¿cuál es mayor?». Muestra una cantidad por categoría, como barras que parten de cero.

Antes de usarlo, lee **Gráficos de datos**: ahí está cuándo conviene un gráfico y cuál elegir.

### Cuándo usarlo

- Para comparar entre dos y doce categorías.
- Cuando importa el orden o la diferencia, más que el valor exacto.

### Cuándo no

- Para un solo número: muestra la cifra.
- Para ver cómo algo cambió en muchos periodos: usa `LineChart`.
- Para buscar valores exactos: usa `Table`.

### Anatomía

1. **Título:** la conclusión, en una frase.
2. **Bajada** (opcional): la unidad, el periodo, la fuente.
3. **«Ver como tabla»:** cambia el gráfico por sus datos en una tabla, y de vuelta.
4. **Barras**, con su nombre debajo, o a la izquierda si son horizontales.
5. **Eje y líneas de guía**, con cuatro o cinco marcas. Las barras horizontales llevan el valor al final de cada una, sin eje.
6. **Detalle:** el valor exacto de la barra que se apunta o se enfoca.

> **Imagen pendiente:** un `BarChart` vertical con sus seis partes numeradas, una barra en el color del acento y las demás neutras, y el detalle abierto sobre una barra.

### Color

| Manera | Cómo | Cuándo |
|---|---|---|
| Un color | Por defecto: todas las barras en el acento. | Casi siempre. El largo ya dice la diferencia. |
| Un énfasis | `highlight`, con el nombre de una barra. Esa va en el acento; las demás, neutras. | Cuando el título habla de una. |
| Categórico | `categorical`. Cada barra con un color de la familia categórica, en orden. | Solo si esos colores identifican a las mismas categorías en otro gráfico de la página. |

### Vertical u horizontal

- **Vertical**, por defecto.
- **Horizontal**, cuando los nombres son largos o las categorías son muchas.
- Si no eliges, `BarChart` pasa solo a horizontal cuando las barras quedarían demasiado angostas para leer sus nombres. Así un gráfico que cabe en un escritorio sigue leyéndose en un teléfono.

### Contenido

- El título dice lo que el gráfico muestra: «Talca fue el destino más vendido en marzo».
- Ordena las barras de mayor a menor, salvo que tengan un orden propio (meses, edades).
- La unidad va en `unit`, una vez. No en cada nombre.

### Relacionados

`LineChart` · `Table` · `ProgressBar` · Gráficos de datos.

## Estilo

### Color

| Elemento | Propiedad | Token |
|---|---|---|
| Barra | relleno | `interactive-01` |
| Barra sin énfasis | relleno | `text-03` |
| Barra categórica | relleno | `viz-cat-01` a `viz-cat-08` |
| Barra activa | contorno | `focus` |
| Líneas de guía | trazo | `border-subtle` |
| Línea de base | trazo | `text-03` |
| Título, valores | color del texto | `text-01` |
| Bajada, eje | color del texto | `text-02` |
| Detalle | fondo y borde | `ui-03` y `border-subtle`, con `shadow-floating` |

### Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso |
|---|---|---|
| Título | 16 / 1 | `font-weight-emphasis` |
| Bajada | 14 / 0,875 | `font-weight-body` |
| Eje y valores | 12 / 0,75 | `font-weight-body` |
| Valor del detalle | 14 / 0,875 | `font-weight-emphasis` |

Todos los números usan cifras del mismo ancho.

### Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Gráfico vertical | alto | 240 px (`height`) |
| Barra vertical | ancho | 62 % de su espacio, hasta 64 px |
| Fila horizontal | alto | 32 px, con una barra de 16 px |
| Barra | esquinas | Rectas |
| Entre título y gráfico | separación | `space-16` |
| Contorno de foco | separación | `space-4` |

La separación entre dos barras nunca es menor que la mitad de su ancho.

### Movimiento

Las barras crecen desde la base una vez, al aparecer, con `duration-slow-01` y `easing-entrance-expressive`. Con movimiento reducido, están en su lugar desde el principio.

## Código

### Uso

```jsx
const { BarChart } = window.AlmaDS;

h(BarChart, {
  title: 'Talca fue el destino más vendido en marzo',
  description: 'Pasajes vendidos por destino · marzo de 2026',
  data: [{ label: 'Talca', value: 1840 }, { label: 'Chillán', value: 1420 }, { label: 'Temuco', value: 1260 }],
  highlight: 'Talca',
  unit: 'pasajes',
  labelHeader: 'Destino'
})
```

### Propiedades

| Propiedad | Tipo | Por defecto | Qué hace |
|---|---|---|---|
| `title` | texto | — | La conclusión. Obligatorio: también nombra el gráfico para un lector de pantalla. |
| `description` | texto | — | La bajada: unidad, periodo, fuente. |
| `data` | `[{ label, value }]` | — | Una barra por elemento, en ese orden. |
| `orientation` | `'vertical'` o `'horizontal'` | Según el espacio | Sin indicarlo, pasa a horizontal cuando las barras quedan angostas. |
| `highlight` | texto | — | El `label` de la barra que conserva el acento. |
| `categorical` | sí o no | no | Un color categórico por barra. |
| `unit` | texto | — | La unidad, para el detalle y la tabla. |
| `format` | función | Formato de Chile | Cómo se escribe un valor. |
| `showValues` | sí o no | no | El valor sobre cada barra vertical. |
| `max` | número | El mayor valor | Hasta dónde llega el eje. |
| `height` | número | 240 | El alto del gráfico vertical, en px. |
| `summary` | texto | Se arma solo | Lo que un lector de pantalla lee después del título. |
| `labelHeader`, `valueHeader` | texto | «Categoría», «Valor» | Los encabezados de la tabla alternativa. |

### Ancho

`BarChart` ocupa el ancho de su contenedor y se redibuja si cambia. No le des un ancho fijo.

## Accesibilidad

### Qué ofrece ALMA

- **Los datos en una tabla**, con «Ver como tabla»: encabezados de fila y de columna, y los mismos valores.
- **Un nombre y un resumen.** El gráfico se presenta como un grupo con el título como nombre, seguido de un resumen que arma solo: cuántas barras, la mayor y la menor.
- **Una sola parada de Tab.** Dentro, las flechas van de una barra a otra; Inicio y Fin, a la primera y la última; Esc cierra el detalle.
- **Cada valor se anuncia** al llegar a él: «Talca: 1.840 pasajes. 1 de 5».
- **El detalle aparece con el foco**, igual que con el puntero.
- **No depende del color:** cada barra lleva su nombre, y la que tiene foco, un contorno.
- **Con movimiento reducido**, las barras no crecen.

### Teclado

| Tecla | Qué hace |
|---|---|
| Tab | Llega al gráfico; sale de él. |
| → ← | Barra siguiente o anterior. |
| Inicio, Fin | Primera o última barra. |
| Esc | Cierra el detalle. |

### Recomendaciones de diseño

- Escribe un título que diga la conclusión: es lo primero que lee todo el mundo.
- Si el resumen que se arma solo no alcanza, escribe uno en `summary`.
- No uses `categorical` para adornar: los colores tienen que significar algo.

### Consideraciones de desarrollo

- No quites «Ver como tabla»: es la alternativa completa al gráfico.
- Los colores categóricos llegan a 3:1 sobre `ui-01`. Sobre otro fondo, compruébalo.

Pendiente: VoiceOver y NVDA.
