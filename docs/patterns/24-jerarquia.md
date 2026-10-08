---
pattern: Jerarquía
summary: Qué se lee primero: los niveles del texto, el peso de los botones y los márgenes que agrupan.
---

## Para qué

Una pantalla se entiende cuando se nota qué es lo principal, qué lo acompaña y qué va junto. Eso lo dicen tres cosas, antes que cualquier adorno: **el color del texto, el peso de los botones y los márgenes**. Cuando están bien, nadie las ve. Cuando están mal, todo pesa lo mismo.

## Los niveles del texto

Cada nivel tiene un trabajo. Se elige por el trabajo, no por cómo se ve.

| Nivel | Token | Trabajo | Ejemplos |
|---|---|---|---|
| **Principal** | `text-01` | Lo que se vino a leer. | Títulos, el valor de un dato, el texto de un párrafo, lo escrito en un campo. |
| **Secundario** | `text-02` | Lo que ayuda a entender lo principal. | Bajadas, el nombre de un dato, ayudas de un campo, fechas, de cuándo es algo. |
| **Terciario** | `text-03` | Lo que todavía no está. | El texto de ejemplo de un campo, un paso por hacer. |

Reglas:

- **Un dato tiene dos niveles:** su nombre en `text-02` y su valor en `text-01`. «Sale» en secundario, «08:30» en principal. Nunca al revés.
- **La ayuda de un campo es secundaria**, no principal. Si compite con lo que la persona escribe, está mal.
- **Tres niveles alcanzan.** Un cuarto tono de gris no se distingue del tercero.
- **El nivel no reemplaza al tamaño ni al peso:** van juntos. Un título es grande, con peso y principal; una nota al pie es chica y secundaria.
- **El color de acento no es un nivel de texto.** Es de lo que se puede tocar. Un texto azul que no es enlace confunde.
- **El texto desactivado** no es un cuarto nivel: es el control entero, apagado.
- **Sobre vidrio**, cada grosor admite sus niveles. Ver Profundidad.

En el tema claro los tres niveles estaban casi juntos (9,4 · 6,7 · 5,7 a 1 sobre la superficie). Ahora el principal es la tinta de marca y quedan en 17,6 · 9,4 · 5,7. En el oscuro ya estaban separados: 18,7 · 10,4 · 6,2.

## El peso de los botones

Cuatro pesos, de más a menos. Se elige por cuánto importa la acción en **esa** vista.

| Peso | Estilo | Para | Cuántos |
|---|---|---|---|
| 1 | `filled` | La acción que casi todos van a elegir. Relleno de acento. | Uno por vista. Dos, como mucho. |
| 2 | `tinted` | La segunda acción que importa. El acento, tenue. | Uno por grupo. |
| 3 | `gray` | Lo neutro: «Cancelar», «Volver». Un gris tenue. | Los que hagan falta. |
| 4 | `plain` | Lo repetido y lo menor: acciones en filas, barras, enlaces de acción. Solo texto. | Los que hagan falta. |

Reglas, de Apple:

- **El estilo distingue, no el tamaño.** Dos botones juntos miden lo mismo; el preferido se nota por su estilo. Dos tamaños juntos se leen como un error.
- **Una acción que destruye nunca es la principal.** Aunque sea la más probable. La gente aprieta el botón más visible sin leerlo: ese tiene que ser el seguro. «Eliminar» va en `tinted` con rol destructivo, y «Cancelar» recibe el foco.
- **Enter es del principal.** Por eso el principal no puede destruir.
- **Con espacio alrededor.** 44 px de área de toque, y `space-8` entre botones.
- **Mientras trabaja, lo dice en el botón:** «Pagando…», con su indicador.

El orden es el de Apple, y se nota a simple vista: cada peso contrasta menos con el fondo que el anterior. El `gray` es un gris tenue y neutro, igual en todas las entidades. Hasta octubre de 2026 era un relleno sólido y oscuro que en el tema claro pesaba más que el botón principal; por eso se cambió.

La marca en su paso más oscuro sigue existiendo como color (`interactive-02`), para acentos profundos. Ya no es un botón.

## Los márgenes

El espacio dice qué va con qué. Mientras más relacionadas dos cosas, más cerca.

| Relación | Espacio | Ejemplo |
|---|---|---|
| Partes de una misma cosa | `space-4` | Un ícono y su texto. El nombre de un dato y su valor apilados. |
| Cosas relacionadas | `space-8` | Un título y su bajada. Un campo y su ayuda. Dos botones. |
| Elementos de un grupo | `space-16` | Campos de un formulario. Filas de datos. El borde de una pieza chica. |
| Grupos | `space-24` | Dos grupos de campos. El borde de una tarjeta o un panel. |
| Secciones | `space-32` o más | Dos secciones de una página. |

Reglas:

- **Lo de adentro va más junto que lo de afuera.** El espacio entre las partes de una tarjeta es menor que su margen. Si es igual, la tarjeta se deshace.
- **Un margen por contenedor.** Todo lo que está dentro de una pieza parte del mismo borde izquierdo: título, texto, botones. Un botón que empieza 8 px más adentro que el título se nota.
- **Alinea por el texto, no por la caja.** Un botón `plain` tiene relleno invisible: se corre hacia afuera para que su texto calce con el del párrafo.
- **Radios concéntricos.** Una forma dentro de otra lleva el radio de afuera menos el margen. Dentro de un panel de radio 16 con margen 8, lo de adentro lleva radio 8. Un radio interior mayor que el exterior se ve hinchado.
- **Lo importante arriba y al inicio.** Se lee de arriba abajo y de izquierda a derecha.
- **La sangría dice jerarquía.** Algo corrido hacia adentro depende de lo de arriba. No la uses para decorar.
- **Agrupa con espacio antes que con líneas.** Una línea o una caja, solo cuando el espacio no alcanza.

## Lista de comprobación

- ¿Se nota cuál es el dato principal sin leer?
- ¿Hay un solo botón `filled`?
- ¿El botón más visible es seguro?
- ¿Todo parte del mismo borde izquierdo?
- ¿El espacio dentro de cada grupo es menor que el espacio entre grupos?
- ¿Algún radio interior es mayor que el de su contenedor?
- ¿Se entiende igual en el tema claro?

## Relacionados

`Button` · Color · Espaciado · Tipografía · Profundidad · Acciones · Formularios.

## Referencias

- Apple, Human Interface Guidelines: Layout, Typography, Color, Buttons, Materials.
