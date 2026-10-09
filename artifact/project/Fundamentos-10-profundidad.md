# Profundidad

Qué va encima de qué: la capa del contenido, la capa funcional y el vidrio que las separa.


## Resumen

### Para qué

Una interfaz tiene cosas que se leen y cosas con las que se llega a ellas. Si las dos están en el mismo plano, compiten. La profundidad las separa: el contenido queda abajo, y lo que sirve para moverse y actuar flota encima.

Flotar no es tapar. Lo que flota en ALMA es de **vidrio**: deja pasar, desenfocado, lo que tiene detrás. Así no se pierde el lugar.

### Dos capas

| Capa | Qué lleva | De qué está hecha |
|---|---|---|
| **Contenido** | Lo que la persona vino a ver: texto, imágenes, listas, formularios, gráficos. | Superficies opacas: `ui-02` la página, `ui-01` los contenedores, `ui-03` lo que va dentro. |
| **Funcional** | Lo que sirve para moverse y actuar: barras, menús, popovers, hojas, ventanas, paneles. | Vidrio. |

La regla que ordena todo: **el vidrio es de la capa funcional, nunca del contenido.** Una tarjeta no es de vidrio. Una tabla no es de vidrio. Si todo es translúcido, nada se separa de nada.

### Niveles

Dentro de la capa funcional hay orden. Mientras más arriba, más gruesa la superficie y más pide la atención.

| Nivel | Qué | Vidrio | Sombra |
|---|---|---|---|
| 0 | El contenido. | No. | No. |
| 1 | Lo fijo sobre el contenido: una barra arriba, una barra de pestañas abajo, una barra lateral. | Delgado. | No. |
| 2 | Lo que aparece y se va: menús, popovers, avisos. | Medio. | `shadow-floating`. |
| 3 | Lo que detiene: hojas, diálogos, la ventana activa. | Medio o grueso. | `shadow-floating`, y un velo detrás si es modal. |

Así vienen ya los componentes: los menús, los popovers, el calendario y las barras (`Toolbar`, `TabBar`) son de vidrio medio; los diálogos, las alertas y las hojas, de vidrio grueso. Un menú que se abre sobre otro vidrio pasa a grueso.

ALMA separa las superficies del contenido con capas de color, no con sombras. Eso no cambia: la sombra sigue siendo solo para lo que flota.

### Cuándo usar vidrio

| Sí | No |
|---|---|
| Una barra bajo la que pasa el contenido al desplazar. | Una barra sobre un fondo liso que nunca cambia: ahí no hay nada que dejar pasar. |
| Un menú o un popover sobre contenido. | Tarjetas, filas, campos: son contenido. |
| Una ventana en un escritorio, sobre otras ventanas o sobre un fondo. | Vidrio sobre vidrio sobre vidrio. Dos niveles a la vez, como mucho. |
| Controles sobre una imagen o un video. | Para decorar. El vidrio es estructura. |

Con medida: es para los elementos funcionales que más importan. Si se ve vidrio en todas partes, deja de decir «esto flota».

### Todo en vidrio

Una entidad puede pedir vidrio en todo, con `"vidrio": true` en su lenguaje. ORCA lo hace. Cambian dos cosas:

- **El suelo de la página es el Velo, muy tenue.** Sin algo detrás, un vidrio no deja pasar nada.
- **Los contenedores y los campos pasan a vidrio delgado** sobre él: tarjetas, listas, tablas, la barra lateral, los campos de texto.
- **Los botones de fondo tenue** (`tinted` y `gray`) y las etiquetas desenfocan lo que tienen detrás. El `filled` sigue sólido: es la acción que tiene que verse primero, y su texto blanco necesita todo su color debajo.

Es la excepción a «el vidrio nunca va en el contenido», y tiene su condición: la fuerza del Velo está acotada (0,18 en oscuro y 0,1 en claro), y con él debajo los tres niveles de texto siguen en 4,5:1. En alto contraste y con menos transparencia, el suelo es liso y todo vuelve a ser opaco.

### El vidrio y los fondos

Los efectos de fondo de ALMA (Velo, Halo, Hilos y los demás) no llevan texto encima: un fondo y un texto nunca se encuentran. El vidrio es la única manera de poner texto sobre un fondo que se mueve, porque queda **entre** los dos: desenfoca el fondo y asegura el contraste.

Sobre un fondo, usa el vidrio medio o el grueso. El delgado solo asegura el texto principal.

### Para todos

- **Alto contraste:** en los dos temas de alto contraste el vidrio es opaco. No hay nada que ajustar.
- **Menos transparencia:** si la persona lo pidió en su sistema, el vidrio es opaco.
- **Sin desenfoque:** donde el navegador no puede desenfocar, el vidrio es opaco. Nunca queda un texto sobre un fondo transparente sin desenfoque.
- **El contraste no depende de la suerte.** Cada grosor asegura 4,5:1 para sus textos sobre el peor fondo posible. Ver la pestaña Vidrio.

### De dónde viene

La base es la guía de materiales de Apple: una capa funcional que flota sobre el contenido, materiales de distinto grosor y la regla de no usarlos en el contenido. De IBM Carbon viene lo que ALMA ya tenía: separar superficies con capas de color y reservar la sombra para lo que flota. Los grosores y la garantía de contraste son de ALMA.

En ALMA, «material» ya nombra otra cosa: cómo recibe la luz una pieza con volumen (arcilla, laca, acrílico, tela). Por eso esta superficie se llama vidrio.

## Vidrio

### Qué es

Una superficie con tres cosas: algo del color de `ui-01`, lo de atrás desenfocado y avivado, y un borde fino. El grosor es cuánto del color propio queda.

![Cuatro paneles del mismo tamaño sobre un fondo de luz que se mueve, uno por grosor de vidrio: muy delgado, delgado, medio y grueso. En cada uno el fondo se ve menos. Cada panel lleva escritos los textos que asegura: ninguno el muy delgado, el principal el delgado, el principal y el secundario el medio, y los tres el grueso.](assets/Fundamentos/profundidad-vidrio.png)

### Los cuatro grosores

| Grosor | Token | Cuánto queda del color propio | Asegura 4,5:1 para | Para |
|---|---|---|---|---|
| **Muy delgado** | `glass-ultra-thin` | 50 % | Nada. | Controles sobre una imagen o un video, con íconos grandes y sin texto corrido. |
| **Delgado** | `glass-thin` | 72 % | `text-01`. | Barras bajo las que pasa el contenido. |
| **Medio** | `glass-regular` | 85 % | `text-01` y `text-02`. | Menús, popovers, paneles, ventanas. Es el de siempre. |
| **Grueso** | `glass-thick` | 94 % | `text-01`, `text-02` y `text-03`. | Superficies con mucho texto, y lo que va sobre otro vidrio. |

«Asegura» quiere decir sobre el peor fondo posible: blanco puro bajo el tema oscuro, negro puro bajo el claro. En la práctica el fondo casi nunca es tan extremo, y además está desenfocado. La garantía vale igual.

Son los mismos valores para los dos temas. Los fija el tema claro, que es el más exigente: su texto principal es un gris, no negro.

### Elegir

- **Ante la duda, el medio.**
- **Mientras más texto, más grueso.**
- **Mientras más importa ver lo de atrás, más delgado**, y menos texto encima.
- **Un vidrio sobre otro:** el de arriba es más grueso que el de abajo.

### El muy delgado

No asegura nada, así que tiene reglas propias:

- Solo sobre imagen o video.
- Encima, íconos de 24 px o más y, como mucho, un rótulo corto en `text-01` con peso `font-weight-emphasis`.
- Si lo de atrás es claro en el tema oscuro (o al revés), pon entre los dos un velo del color de la superficie al 35 %.
- Si no puedes cumplir lo anterior, usa el delgado.

### Qué texto va encima

| Sobre | `text-01` | `text-02` | `text-03` | Enlaces y acento |
|---|---|---|---|---|
| Muy delgado | Solo rótulos cortos | No | No | No |
| Delgado | Sí | No | No | Sobre un `Button`, no sueltos |
| Medio | Sí | Sí | No | Sí |
| Grueso | Sí | Sí | Sí | Sí |

Los controles (`Button`, `Tag`, campos) traen su propio fondo: sobre un vidrio se leen como siempre.

### Borde y sombra

- **Borde:** 1 px de `border-subtle`. Es lo que dibuja el canto del vidrio cuando lo de atrás es del mismo tono.
- **Sombra:** `shadow-floating` en lo que aparece y se va. Una barra fija no lleva.
- **Radio:** el de la pieza. El vidrio no cambia la forma.

### Lo que pasa por debajo

Bajo una barra de vidrio, el contenido se desplaza y se ve pasar. Para que la barra siga leyéndose:

- El contenido no lleva controles debajo de la barra: nadie puede tocarlos ahí.
- La barra es de vidrio delgado o medio, nunca muy delgado.
- Lo que queda bajo la barra no tiene que parecer que se puede tocar.

### Movimiento

El vidrio no se anima: no cambia de grosor ni de desenfoque para llamar la atención. Lo que se mueve es la pieza (entra, sale), con los tiempos de siempre.

### No hagas

- Vidrio en el contenido.
- Bajar el grosor para que «se vea más bonito» y perder el contraste.
- Texto sobre un fondo transparente sin desenfoque.
- Un color distinto de `ui-01` como base del vidrio.
- Vidrio de color de acento. El acento es de los controles.

## Código

### Con la clase

```html
<header class="alma-glass alma-glass--thin">…</header>
<div class="alma-glass">…</div>
<div class="alma-glass alma-glass--thick">…</div>
```

| Clase | Grosor |
|---|---|
| `alma-glass alma-glass--ultra-thin` | Muy delgado |
| `alma-glass alma-glass--thin` | Delgado |
| `alma-glass` | Medio |
| `alma-glass alma-glass--thick` | Grueso |

La clase pone el fondo, el desenfoque, el borde y el color del texto. La posición, el radio y la sombra son de la pieza:

```css
.barra { position: sticky; top: 0; z-index: var(--z-header); border-width: 0 0 1px; }
.menu { border-radius: var(--radius-panel); box-shadow: var(--shadow-floating); }
```

### A mano

```css
.mi-vidrio {
  background: color-mix(in srgb, var(--ui-01) calc(var(--glass-regular) * 100%), transparent);
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate));
  backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturate));
  border: 1px solid var(--border-subtle);
}
```

Si lo haces a mano, trae también los tres casos en que el vidrio es opaco. La clase ya los trae:

```css
[data-theme$="-hc"] .mi-vidrio { background: var(--ui-01); backdrop-filter: none; }

@media (prefers-reduced-transparency: reduce), (prefers-contrast: more) {
  .mi-vidrio { background: var(--ui-01); backdrop-filter: none; }
}

@supports not (backdrop-filter: blur(1px)) {
  .mi-vidrio { background: var(--ui-01); }
}
```

### Tokens

| Token | Valor | Qué es |
|---|---|---|
| `glass-ultra-thin` | 0,5 | Cuánto del color de la superficie queda. |
| `glass-thin` | 0,72 | |
| `glass-regular` | 0,85 | |
| `glass-thick` | 0,94 | |
| `glass-blur` | 24 px | El desenfoque de lo de atrás. |
| `glass-saturate` | 1,6 | Cuánto se aviva el color de lo de atrás. |

Son los mismos en los cuatro temas y en todas las entidades: el vidrio toma el `ui-01` de cada una.

### Lo que hay que saber

- **El desenfoque cuesta.** Cada vidrio obliga al navegador a redibujar lo que tiene detrás. Pocos y no muy grandes. Un vidrio a pantalla completa sobre un video es lo más caro que se puede pedir.
- **Lo de atrás tiene que estar atrás.** El desenfoque toma lo que queda bajo la pieza en la pila de la página. Si la pieza no flota sobre nada, no hay nada que desenfocar.
- **Dentro de un vidrio, otro vidrio no desenfoca al primero** en todos los navegadores. Para lo que va encima de un vidrio, usa el grueso.
- **Una prueba lo cuida.** `tests/vidrio.test.mjs` falla si un cambio en los grosores o en los colores de texto rompe el contraste asegurado.
