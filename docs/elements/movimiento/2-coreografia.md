---
element: Movimiento
order: 4
tab: Coreografía
summary: El movimiento explica qué cambió. Productivo en la interfaz, expresivo en los momentos de marca.
---

## Cuando entran varios elementos

Si una pantalla nueva trae varios elementos, no los animes todos a la vez ni uno por uno. Repártelos por grupos, con `duration-stagger` (20 ms) entre cada uno, y con el total bajo 500 ms.

| Orden | Qué entra |
|---|---|
| 1 | La estructura: barras de navegación. |
| 2 | El contenido estático: títulos, texto, imágenes. |
| 3 | El contenido dinámico: datos de una tabla, resultados. |
| 4 | La acción principal. |
| 5 | Los gráficos animados. |

> **Imagen pendiente:** línea de tiempo de la entrada de una pantalla de resultados, con los cinco grupos.

## Principios de IBM Carbon

- **Expresivo solo en lo importante.** El resto es productivo.
- **Sobre la grilla.** Nada se mueve en diagonal.
- **Lo que significa lo mismo se mueve igual.** Desplegar una fila y abrir un menú usan la misma curva; la duración cambia con el tamaño.
- **La dirección tiene sentido.** Avanzar en la dirección de entrada afirma; volver sobre ella cancela.
- **Continuidad.** Los elementos compartidos entre pantallas (títulos, botones) hacen de puente en la transición.
- **Las salidas son más cortas que las entradas.**

## Principios de Apple

- **Con propósito.** Acompaña la experiencia, no la tapa.
- **Opcional.** Nunca es la única forma de comunicar algo importante.
- **Realista.** Sigue el gesto y la expectativa: lo que baja para abrirse sube para cerrarse.
- **Breve y preciso** en la respuesta a una acción, sin animaciones propias en interacciones frecuentes.
- **Interrumpible.** Nadie espera a que termine una animación para seguir.

## Movimiento de marca

Estas recetas son el punto de partida. Las propias de Cordura se iterarán desde aquí, sobre la misma base de tokens.
