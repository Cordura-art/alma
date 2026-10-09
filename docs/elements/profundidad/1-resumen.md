---
element: Profundidad
order: 10
tab: Resumen
summary: Qué va encima de qué: la capa del contenido, la capa funcional y el vidrio que las separa.
---

## Para qué

Una interfaz tiene cosas que se leen y cosas con las que se llega a ellas. Si las dos están en el mismo plano, compiten. La profundidad las separa: el contenido queda abajo, y lo que sirve para moverse y actuar flota encima.

Flotar no es tapar. Lo que flota en ALMA es de **vidrio**: deja pasar, desenfocado, lo que tiene detrás. Así no se pierde el lugar.

## Dos capas

| Capa | Qué lleva | De qué está hecha |
|---|---|---|
| **Contenido** | Lo que la persona vino a ver: texto, imágenes, listas, formularios, gráficos. | Superficies opacas: `ui-02` la página, `ui-01` los contenedores, `ui-03` lo que va dentro. |
| **Funcional** | Lo que sirve para moverse y actuar: barras, menús, popovers, hojas, ventanas, paneles. | Vidrio. |

La regla que ordena todo: **el vidrio es de la capa funcional, no del contenido.** Una tarjeta no es de vidrio. Una tabla no es de vidrio. Si todo es translúcido, nada se separa de nada.

Hay una sola excepción, y es una decisión de toda una entidad, no de una pantalla: «Todo en vidrio», más abajo.

## Niveles

Dentro de la capa funcional hay orden. Mientras más arriba, más gruesa la superficie y más pide la atención.

| Nivel | Qué | Vidrio | Sombra |
|---|---|---|---|
| 0 | El contenido. | No. | No. |
| 1 | Lo fijo sobre el contenido: una barra arriba, una barra de pestañas abajo, una barra lateral. | Delgado. | No. |
| 2 | Lo que aparece y se va: menús, popovers, avisos. | Medio. | `shadow-floating`. |
| 3 | Lo que detiene: hojas, diálogos, la ventana activa. | Medio o grueso. | `shadow-floating`, y un velo detrás si es modal. |

Así vienen ya los componentes: los menús, los popovers, el calendario y las barras (`Toolbar`, `TabBar`) son de vidrio medio; los diálogos, las alertas y las hojas, de vidrio grueso. Un menú que se abre sobre otro vidrio pasa a grueso.

ALMA separa las superficies del contenido con capas de color, no con sombras. Eso no cambia: la sombra sigue siendo solo para lo que flota.

## Cuándo usar vidrio

| Sí | No |
|---|---|
| Una barra bajo la que pasa el contenido al desplazar. | Una barra sobre un fondo liso que nunca cambia: ahí no hay nada que dejar pasar. |
| Un menú o un popover sobre contenido. | Tarjetas, filas, campos: son contenido. |
| Una ventana en un escritorio, sobre otras ventanas o sobre un fondo. | Vidrio sobre vidrio sobre vidrio. Dos niveles a la vez, como mucho. |
| Controles sobre una imagen o un video. | Para decorar. El vidrio es estructura. |

Con medida: es para los elementos funcionales que más importan. Si se ve vidrio en todas partes, deja de decir «esto flota».

## Todo en vidrio

Una entidad lleva vidrio en todo cuando su carta es abierta: dos centros definidos o menos, de nueve. Una carta así deja pasar casi todo lo que viene de afuera, y sus superficies también. Lo decide la regla, igual que el color o el radio; nadie lo enciende a mano. Hoy es el caso de ORCA. Cambian dos cosas:

- **Los contenedores y los campos pasan a vidrio delgado:** tarjetas, listas, tablas, la barra lateral, los campos de texto.
- **Los botones de fondo tenue** (`tinted` y `gray`) y las etiquetas desenfocan lo que tienen detrás. El `filled` sigue sólido: es la acción que tiene que verse primero, y su texto blanco necesita todo su color debajo.

**La página no lleva luz propia.** Su fondo es liso. El Velo es de la IA y aparece donde ella está: el fondo de un escritorio, el escenario de un asistente. Ahí es donde el vidrio deja pasar algo; sobre el fondo liso de una página se ve como una superficie apenas más clara. En alto contraste y con menos transparencia, todo vuelve a ser opaco.

## El vidrio y los fondos

Los efectos de fondo de ALMA (Velo, Halo, Hilos y los demás) no llevan texto encima: un fondo y un texto nunca se encuentran. El vidrio es la única manera de poner texto sobre un fondo que se mueve, porque queda **entre** los dos: desenfoca el fondo y asegura el contraste.

Sobre un fondo, usa el vidrio medio o el grueso. El delgado solo asegura el texto principal.

## Para todos

- **Alto contraste:** en los dos temas de alto contraste el vidrio es opaco. No hay nada que ajustar.
- **Menos transparencia:** si la persona lo pidió en su sistema, el vidrio es opaco.
- **Sin desenfoque:** donde el navegador no puede desenfocar, el vidrio es opaco. Nunca queda un texto sobre un fondo transparente sin desenfoque.
- **El contraste no depende de la suerte.** Cada grosor asegura 4,5:1 para sus textos sobre el peor fondo posible. Ver la pestaña Vidrio.

## De dónde viene

La base es la guía de materiales de Apple: una capa funcional que flota sobre el contenido, materiales de distinto grosor y la regla de no usarlos en el contenido. De IBM Carbon viene lo que ALMA ya tenía: separar superficies con capas de color y reservar la sombra para lo que flota. Los grosores y la garantía de contraste son de ALMA.

En ALMA, «material» ya nombra otra cosa: cómo recibe la luz una pieza con volumen (arcilla, laca, acrílico, tela). Por eso esta superficie se llama vidrio.
