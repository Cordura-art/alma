---
element: Movimiento
order: 4
tab: Resumen
summary: El movimiento explica qué cambió. Productivo en la interfaz, expresivo en los momentos de marca.
---

## Por qué se mueve algo

Cordura es un estudio de lenguajes de movimiento, y ALMA usa el lenguaje de movimiento de IBM (IBM Design Language, Carbon). El movimiento explica qué cambió, de dónde vino algo y a dónde fue. Nunca decora.

## Dos estilos

| Estilo | Tokens | Cuándo |
|---|---|---|
| **Productivo** | `easing-*-productive` | La interfaz de trabajo. Eficiente, no distrae. Es el de los componentes. |
| **Expresivo** | `easing-*-expressive` | Momentos importantes: abrir una página nueva, la acción principal, alertas, un pago aprobado. Con moderación. |

## Curva según la intención

| Curva | Para lo que |
|---|---|
| `standard` | Se mueve dentro de la pantalla. |
| `entrance` | Aparece: desacelera al llegar. |
| `exit` | Se va: acelera al salir. |

![Las seis curvas de movimiento de ALMA dibujadas: estándar, entrada y salida, en sus versiones productiva y expresiva, con sus puntos de control.](assets/Movimiento/curvas.png)

## Duración según el tamaño y la distancia

| Token | Valor | Para |
|---|---|---|
| `duration-fast-01` | {token:duration-fast-01} | Botones y toggles. |
| `duration-fast-02` | {token:duration-fast-02} | Tooltips, bordes de campo, menús. |
| `duration-moderate-01` | {token:duration-moderate-01} | Cambios cortos. Por defecto. |
| `duration-moderate-02` | {token:duration-moderate-02} | Expansiones, toasts, modales. |
| `duration-slow-01` | {token:duration-slow-01} | Expansiones grandes. |
| `duration-slow-02` | {token:duration-slow-02} | Velos y portadas. |

## Recetas de IBM

| Receta | Duración y curva | En ALMA |
|---|---|---|
| Revelar | `duration-moderate-01` + `easing-entrance-productive` | Sidebar. El contenido del Accordion usa la misma curva con `duration-moderate-02`. |
| Contextual | `duration-fast-02` + `easing-entrance-expressive` | Menús, tooltips, popovers. |
| Expandir | `duration-moderate-02` + `easing-standard-productive` | Paneles que crecen en su lugar. |
| Invocar | `duration-moderate-02` + `easing-standard-expressive` | Modal y Alert. |

## Movimiento reducido

Si la persona lo pide en su sistema, **toda** animación de ALMA se vuelve instantánea. No hay excepciones: `bundle.css` lo aplica a todo el sistema. El movimiento nunca es la única forma de comunicar algo.
