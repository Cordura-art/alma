---
element: Entradas
order: 9
tab: Resumen
summary: Con qué maneja alguien una pantalla, y qué necesita cada manera.
---

## Cuatro maneras de entrar

Una persona maneja la misma pantalla de maneras distintas, a veces en el mismo minuto. ALMA no supone ninguna.

| Entrada | Cómo es | Qué necesita |
|---|---|---|
| Puntero fino | Mouse o trackpad. Preciso, y puede pasar por encima sin tocar. | Estados al pasar por encima. Puede usar la densidad compacta. |
| Toque | El dedo. Poco preciso, tapa lo que toca, no pasa por encima. | Controles de 44 px. Nada que dependa de pasar por encima. |
| Teclado | Teclas, o un aparato que hace de teclado. | Orden de foco, foco visible, todo alcanzable. |
| Voz y lectores | Se nombra lo que se quiere, o se escucha lo que hay. | Que cada cosa tenga un nombre, el mismo que se ve. |

Un computador puede tener pantalla táctil y un teléfono puede tener teclado. Por eso no se pregunta qué aparato es, sino qué puede hacer.

## Reglas para todas

1. **Todo se puede hacer con cada una.** Lo que hace el mouse lo hace el teclado, y lo que hace un gesto lo hace un botón.
2. **Nada depende de pasar por encima.** Lo que aparece así aparece también con el foco, y está a un toque.
3. **Se actúa al soltar.** Un control responde cuando el dedo o el botón se levantan, no cuando bajan: hasta ahí se puede salir sin hacer nada.
4. **El tamaño de toque es de 44 px.** Es `size-touch-min`. Si el control se ve más chico, el área que responde es igual de grande.
5. **Separación entre controles.** Al menos `space-8` entre dos áreas de toque, para no tocar la del lado.
6. **La respuesta es inmediata.** Cada entrada tiene su señal: el estado al pasar, al presionar, el foco.

## Estados que da cada entrada

| Estado | Puntero | Toque | Teclado |
|---|---|---|---|
| Al pasar por encima | Sí | No existe | No existe |
| Foco | Solo al hacer clic en un campo | Solo en un campo | Sí, siempre visible |
| Presionado | Sí | Sí | Sí |

Los colores de cada estado están en **Color**; las teclas, en **Accesibilidad › Teclado**.

## Densidad

La densidad compacta (controles de 32 px) solo actúa con puntero fino. Con una pantalla táctil, todo sigue en 44 px. Ver **Espaciado y grilla › Densidad**.

## De dónde viene

La base es el capítulo de entradas de Apple, que trata cada manera por separado, y los criterios de puntero de WCAG 2.2: gestos, cancelación, arrastre y tamaño del objetivo.
