---
element: Color
order: 1
tab: Resumen
summary: El color de ALMA: tres capas de tokens, cuatro temas y un solo acento.
---

## Cómo funciona el color en ALMA

ALMA casi no usa color. La interfaz es un fondo oscuro, texto claro y un solo acento lima que marca la acción. Todo lo demás, los estados, las etiquetas y los gráficos, usa color solo cuando comunica algo, y siempre con una palabra o un ícono al lado.

Nunca se escribe un color: se pide un **token** por su nombre. El tema decide el valor. Por eso la misma interfaz funciona en los cuatro temas sin cambiar una línea.

> **Imagen pendiente:** la misma pantalla de compra en los cuatro temas, lado a lado.

## Tres capas

Como en IBM Carbon, los tokens de color van en tres capas. Cada capa apunta a la anterior.

| Capa | Qué nombra | Ejemplos | Se usa en |
|---|---|---|---|
| **Base** | Los colores disponibles: marca y rampas de 50 a 900. | `brand-lime`, `primary-500`, `secondary-700`, `blue-60` | Solo dentro de las otras capas. Nunca directo en una interfaz. |
| **Semántica** | El papel en la interfaz. Cambia con el tema. | `ui-01`, `text-01`, `interactive-01`, `focus`, `support-01` | Pantallas, maquetas y componentes nuevos. |
| **Componente** | Una decisión de un componente, en un estado. | `button-filled-bg-hover`, `field-border-error`, `table-row-bg-selected` | Dentro de cada componente. |

Para ajustar un componente, cambia su token de componente, nunca el semántico: el cambio queda en ese componente y el resto del sistema no se entera.

> **Imagen pendiente:** diagrama de las tres capas: `lime-400` → `interactive-01` → `button-filled-bg`.

## Los roles semánticos

| Familia | Tokens | Para qué |
|---|---|---|
| Superficies | `ui-01` a `ui-05` | Capas: la página es `ui-02`; los contenedores, `ui-01`; los paneles anidados, `ui-03` y `ui-04`. `ui-03` a `ui-05` también son bordes. |
| Texto | `text-01` a `text-05`, `text-error`, `text-on-interactive` | Principal, secundario, desactivado, sobre colores. |
| Íconos | `icon-01` a `icon-03` | Principal, secundario, sobre colores. |
| Acción | `interactive-01` a `interactive-04` | Lima para la acción principal, acero para la secundaria. |
| Estados de interacción | `hover-*`, `active-*`, `selected-ui`, `focus` | Encima, presionado, elegido y foco. |
| Estados del sistema | `support-01` a `support-04` | Error, éxito, advertencia, información. |
| Inversos | `inverse-01`, `inverse-02`, `inverse-support-*` | Superficies que invierten el tema, como el tooltip. |
| Velos | `overlay-01`, `tint-white-*`, `tint-dark-*` | Detrás de modales y sobre imágenes. |

## Capas de superficie

Las superficies se apilan en un orden fijo. Cada capa se distingue de la que tiene debajo, así la jerarquía se lee sin bordes ni sombras.

| Capa | Token | Claro | Oscuro | Qué va ahí |
|---|---|---|---|---|
| 1 | `ui-02` | Gris muy claro | El fondo más profundo | La página. |
| 2 | `ui-01` | Blanco | Azul noche | Contenedores: tarjetas, menús, tablas, alertas. |
| 3 | `ui-03` | Gris azulado claro | Un paso más claro | Un panel dentro de un contenedor. |
| 4 | `ui-04` | Azul acero claro | Otro paso más claro | Una zona dentro de ese panel. |
| Acción | `interactive-01`, `interactive-02` | Lima y acero | Lima y acero | Los botones, sobre cualquier capa. |

No saltes capas hacia atrás: un contenedor dentro de otro `ui-01` pasa a `ui-03`, no vuelve a `ui-02`. En el tema claro, la página es más oscura que los contenedores; en el oscuro, más oscura también, así que en los dos temas cada capa de encima se despega de la anterior.

> **Imagen pendiente:** las cuatro capas anidadas en tema claro, de la página `ui-02` a los botones `interactive-01` e `interactive-02` sobre `ui-04`.

## Cuántos hay

ALMA tiene 495 tokens de color: los de marca, las rampas base, los roles semánticos, 18 colores de gráficos y los de cada componente. Todos están en la pestaña **Tokens** del sitio y en `tokens.json`.
