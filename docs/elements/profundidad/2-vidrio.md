---
element: Profundidad
order: 10
tab: Vidrio
---

## Qué es

Una superficie con tres cosas: algo del color de `ui-01`, lo de atrás desenfocado y avivado, y un borde fino. El grosor es cuánto del color propio queda.

![Cuatro paneles del mismo tamaño sobre un fondo de luz que se mueve, uno por grosor de vidrio: muy delgado, delgado, medio y grueso. En cada uno el fondo se ve menos. Cada panel lleva escritos los textos que asegura: ninguno el muy delgado, el principal el delgado, el principal y el secundario el medio, y los tres el grueso.](assets/Fundamentos/profundidad-vidrio.png)

## Los cuatro grosores

| Grosor | Token | Cuánto queda del color propio | Asegura 4,5:1 para | Para |
|---|---|---|---|---|
| **Muy delgado** | `glass-ultra-thin` | 50 % | Nada. | Controles sobre una imagen o un video, con íconos grandes y sin texto corrido. |
| **Delgado** | `glass-thin` | 72 % | `text-01`. | Barras bajo las que pasa el contenido. |
| **Medio** | `glass-regular` | 85 % | `text-01` y `text-02`. | Menús, popovers, paneles, ventanas. Es el de siempre. |
| **Grueso** | `glass-thick` | 94 % | `text-01`, `text-02` y `text-03`. | Superficies con mucho texto, y lo que va sobre otro vidrio. |

«Asegura» quiere decir sobre el peor fondo posible: blanco puro bajo el tema oscuro, negro puro bajo el claro. En la práctica el fondo casi nunca es tan extremo, y además está desenfocado. La garantía vale igual.

Son los mismos valores para los dos temas. Los fija el tema claro, que es el más exigente: su texto principal es un gris, no negro.

## Elegir

- **Ante la duda, el medio.**
- **Mientras más texto, más grueso.**
- **Mientras más importa ver lo de atrás, más delgado**, y menos texto encima.
- **Un vidrio sobre otro:** el de arriba es más grueso que el de abajo.

## El muy delgado

No asegura nada, así que tiene reglas propias:

- Solo sobre imagen o video.
- Encima, íconos de 24 px o más y, como mucho, un rótulo corto en `text-01` con peso `font-weight-emphasis`.
- Si lo de atrás es claro en el tema oscuro (o al revés), pon entre los dos un velo del color de la superficie al 35 %.
- Si no puedes cumplir lo anterior, usa el delgado.

## Qué texto va encima

| Sobre | `text-01` | `text-02` | `text-03` | Enlaces y acento |
|---|---|---|---|---|
| Muy delgado | Solo rótulos cortos | No | No | No |
| Delgado | Sí | No | No | Sobre un `Button`, no sueltos |
| Medio | Sí | Sí | No | Sí |
| Grueso | Sí | Sí | Sí | Sí |

Los controles (`Button`, `Tag`, campos) traen su propio fondo: sobre un vidrio se leen como siempre.

## Borde y sombra

- **Borde:** 1 px de `border-subtle`. Es lo que dibuja el canto del vidrio cuando lo de atrás es del mismo tono.
- **Sombra:** `shadow-floating` en lo que aparece y se va. Una barra fija no lleva.
- **Radio:** el de la pieza. El vidrio no cambia la forma.

## Lo que pasa por debajo

Bajo una barra de vidrio, el contenido se desplaza y se ve pasar. Para que la barra siga leyéndose:

- El contenido no lleva controles debajo de la barra: nadie puede tocarlos ahí.
- La barra es de vidrio delgado o medio, nunca muy delgado.
- Lo que queda bajo la barra no tiene que parecer que se puede tocar.

## Movimiento

El vidrio no se anima: no cambia de grosor ni de desenfoque para llamar la atención. Lo que se mueve es la pieza (entra, sale), con los tiempos de siempre.

## No hagas

- Vidrio en el contenido.
- Bajar el grosor para que «se vea más bonito» y perder el contraste.
- Texto sobre un fondo transparente sin desenfoque.
- Un color distinto de `ui-01` como base del vidrio.
- Vidrio de color de acento. El acento es de los controles.
