---
component: BarChart
tab: Accesibilidad
summary: Qué resuelve ALMA en el gráfico de barras.
---


## Qué ofrece ALMA

- **Los datos en una tabla**, con «Ver como tabla»: encabezados de fila y de columna, y los mismos valores.
- **Un nombre y un resumen.** El gráfico se presenta como un grupo con el título como nombre, seguido de un resumen que arma solo: cuántas barras, la mayor y la menor.
- **Una sola parada de Tab.** Dentro, las flechas van de una barra a otra; Inicio y Fin, a la primera y la última; Esc cierra el detalle.
- **Cada valor se anuncia** al llegar a él: «Talca: 1.840 pasajes. 1 de 5».
- **El detalle aparece con el foco**, igual que con el puntero.
- **No depende del color:** cada barra lleva su nombre, y la que tiene foco, un contorno.
- **Con movimiento reducido**, las barras no crecen.
- **Apiladas:** las flechas hacia arriba y abajo pasan de una parte a otra, y cada una se anuncia con su parte y el total de su barra: «Talca, Semicama: 1.100 pasajes de 1.840».
- **Estados:** mientras carga, se anuncia «Cargando el gráfico»; el error y el estado vacío son texto, con su acción al alcance del teclado.

## Teclado

| Tecla | Qué hace |
|---|---|
| Tab | Llega al gráfico; sale de él. |
| → ← | Barra siguiente o anterior. |
| ↑ ↓ | En barras apiladas, la parte de arriba o de abajo. |
| Inicio, Fin | Primera o última barra. |
| Esc | Cierra el detalle. |

## Recomendaciones de diseño

- Escribe un título que diga la conclusión: es lo primero que lee todo el mundo.
- Si el resumen que se arma solo no alcanza, escribe uno en `summary`.
- No uses `categorical` para adornar: los colores tienen que significar algo.

## Consideraciones de desarrollo

- No quites «Ver como tabla»: es la alternativa completa al gráfico.
- Los colores categóricos llegan a 3:1 sobre `ui-01`. Sobre otro fondo, compruébalo.

Pendiente: VoiceOver y NVDA.
