---
element: Movimiento
order: 4
tab: Resumen
summary: El movimiento explica qué cambió. Llega como una ola y se asienta: productivo y pausado.
---

## Por qué se mueve algo

Nuestro movimiento es como una ola que llega y se asienta. Nunca golpea, nunca apura: acompaña el cambio y deja que todo se calme. Cada movimiento responde una pregunta: qué cambió, de dónde viene, qué sigue. Si no explica nada, no se mueve.

Partimos de los tokens de movimiento de ALMA y vamos un 25 % más lento. La calma también se anima.

## Dos estilos

| Estilo | Tokens | Cuándo |
|---|---|---|
| **Productivo** | `easing-*-productive` | Toda la interfaz. Eficiente y preciso. Es el de los componentes. |
| **Expresivo** | `easing-*-expressive` | La firma, las portadas y las aperturas, donde un momento de emoción ayuda a contar algo. Con moderación. |

## Curva según la intención

| Curva | Para lo que |
|---|---|
| `standard` | Se mueve dentro de la pantalla. |
| `entrance` | Aparece: desacelera al llegar. |
| `exit` | Se va: acelera al salir. |

![Las seis curvas de movimiento dibujadas: estándar, entrada y salida, en sus versiones productiva y expresiva, con sus puntos de control.](assets/Movimiento/curvas.png)

## Duración según el tamaño y la distancia

| Token | Valor | Para |
|---|---|---|
| `duration-fast-01` | {token:duration-fast-01} | Botones y toggles. |
| `duration-fast-02` | {token:duration-fast-02} | Tooltips, bordes de campo, menús. |
| `duration-moderate-01` | {token:duration-moderate-01} | Cambios cortos. Por defecto. |
| `duration-moderate-02` | {token:duration-moderate-02} | Expansiones, toasts, modales. |
| `duration-slow-01` | {token:duration-slow-01} | Expansiones grandes. |
| `duration-slow-02` | {token:duration-slow-02} | Velos y portadas. |

## Recetas

| Receta | Duración y curva | Dónde |
|---|---|---|
| Revelar | `duration-moderate-01` + `easing-entrance-productive` | Sidebar. El contenido del Accordion usa la misma curva con `duration-moderate-02`. |
| Contextual | `duration-fast-02` + `easing-entrance-expressive` | Menús, tooltips, popovers. |
| Expandir | `duration-moderate-02` + `easing-standard-productive` | Paneles que crecen en su lugar. |
| Invocar | `duration-moderate-02` + `easing-standard-expressive` | Modal y Alert. |

## Evita

- No uses parpadeos ni temblores para llamar la atención.
- No uses rebotes ni escalas exageradas.
- Nunca muevas un elemento que la persona está leyendo.

## Movimiento reducido

Si la persona lo pide en su sistema, **toda** animación se vuelve instantánea. No hay excepciones. El movimiento nunca es la única forma de comunicar algo.
