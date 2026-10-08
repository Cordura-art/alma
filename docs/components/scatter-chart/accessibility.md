---
component: ScatterChart
tab: Accesibilidad
summary: Qué resuelve ALMA en el gráfico de puntos.
---


## Qué ofrece ALMA

- **Los datos en una tabla**, con «Ver como tabla»: una fila por punto, ordenadas por el valor de lo ancho.
- **Un nombre y un resumen.** El título nombra el gráfico, y un resumen que se arma solo dice cuántos puntos hay y entre qué valores va cada medida.
- **Una sola parada de Tab.** Las flechas recorren los puntos del menor al mayor valor de lo ancho.
- **Cada punto se anuncia** con su nombre y sus dos valores: «Talca. Distancia: 255 km · Precio: 9.800 pesos. 3 de 9».
- **El detalle aparece con el foco**, igual que con el puntero.
- **El área que responde** alrededor de un punto es más grande que el punto.

## Teclado

| Tecla | Qué hace |
|---|---|
| Tab | Llega al gráfico; sale de él. |
| → ← | Punto siguiente o anterior, según su valor a lo ancho. |
| Inicio, Fin | Primer o último punto. |
| Esc | Cierra el detalle. |

## Recomendaciones de diseño

- Un gráfico de puntos es de los más difíciles de entender sin verlo. El título tiene que decir la relación: «Mientras más lejos, más caro».
- Si el resumen que se arma solo no dice lo importante, escribe uno en `summary`.
- Los grupos se distinguen por color. Con más de dos, nómbralos también en el `label` de cada punto, que es lo que se anuncia.

## Consideraciones de desarrollo

- No quites «Ver como tabla».
- Con cientos de puntos, recorrerlos uno a uno con el teclado deja de servir: la tabla y el resumen pasan a ser la manera principal.

Pendiente: VoiceOver y NVDA.
