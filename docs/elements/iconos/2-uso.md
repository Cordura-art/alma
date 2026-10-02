---
element: Íconos
order: 5
tab: Uso
summary: Íconos de IBM Carbon, dibujados como SVG dentro de la página.
---

## Cuándo un ícono

- Para reconocer una acción o un destino más rápido: cerrar, buscar, volver.
- Junto a un texto, para reforzarlo.
- Solo, en botones de uso muy frecuente y conocido; entonces necesita un nombre (`aria-label`) y conviene un `Tooltip`.

## Cuándo no

- Para decorar. Si lo que buscas es distinguir cosas entre sí, usa un pictograma.
- Si el ícono no es conocido: una palabra se entiende antes.
- Para distinguir estados solo por el ícono: acompáñalo de la palabra.

## Pictogramas

Un pictograma es un dibujo de línea que le pertenece a una cosa: un capítulo, un proyecto, una etiqueta. No explica qué es; la distingue de las que tiene al lado. Se dibuja como un ícono de Carbon: misma grilla, mismo trazo, pocas piezas.

### Tres tipos

| Tipo | Para qué | Qué dibuja |
|---|---|---|
| Sello | Tipos de cosas: etiquetas, archivos, categorías. | Una base y una marca. |
| Letra | Lo que va en orden o numerado: capítulos, pasos. | La inicial del nombre y su número, en un marco. |
| Criatura | Lo que tiene carácter: proyectos, equipos. | Una cabeza, dos ojos y un rasgo. Solo en entidades que usan personajes. |

Usa un solo tipo por lista.

### Cuándo un pictograma

- En listas y tarjetas donde varias cosas del mismo tipo se parecen y la persona vuelve a buscarlas.
- Siempre junto al nombre de la cosa. El nombre informa; el pictograma ayuda a encontrarla.

### Cuándo no

- En botones, menús, campos o avisos: ahí va un ícono de Carbon.
- Para decir un estado. «Con observaciones» se dice con la palabra y, si hace falta, con un ícono de Carbon.
- Solo, sin nombre.
- Más de una lista con pictogramas por pantalla: si todo lleva dibujo, nada se distingue.

### Cómo se usan

- Con el componente `Pictogram`: recibe el nombre de la cosa y el tipo (`kind`), y dibuja su pictograma.
- Tamaño: `icon-size-lg` (24 px) o `icon-size-xl` (32 px).
- Color: heredan el del texto, igual que los íconos. Usa `icon-01`, o `nav-selected` cuando quieras que se note. Necesitan 3:1 contra su fondo.
- En una lista, pide los dibujos del conjunto completo con `pictogramDrawings()`: así no se repite ninguno.
- Son decorativos para un lector de pantalla (`aria-hidden`), porque el nombre ya está al lado.
- El mismo nombre da siempre el mismo dibujo. Si la cosa cambia de nombre, cambia de pictograma.

## Color

El ícono hereda el color de su texto (`currentColor`). Ponlo dentro de algo que ya use:

| Token | Uso |
|---|---|
| `icon-01` | Íconos principales. |
| `icon-02` | Íconos secundarios, como los de una lista. |
| `text-on-interactive` | Sobre el azul. |
| `status-icon-*` | En avisos de error, éxito, advertencia e información. |

Un ícono que informa necesita 3:1 contra su fondo.

## Íconos frecuentes

| Acción | Ícono |
|---|---|
| Cerrar | `close` |
| Volver / avanzar | `arrow--left` / `arrow--right` |
| Buscar | `search` |
| Más acciones | `overflow-menu--horizontal` |
| Desplegar | `chevron--down` |
| Ir al detalle | `chevron--right` |
| Información / error / advertencia | `information` / `error` / `warning` |
| Éxito | `checkmark--outline` |

## Alineación

- Centrado en la altura de su línea de texto.
- Entre ícono y texto, `space-8` (en controles pequeños) o `space-16` (en filas de lista y navegación).
