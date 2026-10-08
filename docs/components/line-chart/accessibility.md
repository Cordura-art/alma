---
component: LineChart
tab: Accesibilidad
summary: Qué resuelve ALMA en el gráfico de líneas.
---


## Qué ofrece ALMA

- **Los datos en una tabla**, con «Ver como tabla»: una fila por periodo y una columna por serie.
- **Un nombre y un resumen.** El título nombra el gráfico, y un resumen que se arma solo dice de dónde a dónde va cada serie.
- **Una sola parada de Tab.** Las flechas hacia los lados van de un valor al siguiente; hacia arriba y abajo, de una serie a otra.
- **Cada valor se anuncia** con su serie y su periodo: «Talca, Mar: 1.840 pasajes. 3 de 6».
- **El detalle aparece con el foco**, igual que con el puntero.
- **No depende del color:** cada línea lleva su nombre junto a ella, o en la leyenda.
- **Un dato que falta** se anuncia como «sin dato», y en la tabla es una raya.
- **Con movimiento reducido**, las líneas no se trazan.

## Teclado

| Tecla | Qué hace |
|---|---|
| Tab | Llega al gráfico; sale de él. |
| → ← | Valor siguiente o anterior. |
| ↑ ↓ | Serie anterior o siguiente. |
| Inicio, Fin | Primer o último valor. |
| Esc | Cierra el detalle. |

## Recomendaciones de diseño

- Con más de cuatro series, usa `highlight`: ocho colores a la vez son difíciles de seguir para cualquiera.
- Si dos líneas se cruzan mucho, considera dos gráficos chicos, uno al lado del otro.

## Consideraciones de desarrollo

- No quites «Ver como tabla».
- Un gráfico que se actualiza solo no debe anunciar cada cambio.

Pendiente: VoiceOver y NVDA.
