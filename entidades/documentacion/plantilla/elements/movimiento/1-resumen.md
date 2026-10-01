---
element: Movimiento
order: 4
tab: Resumen
summary: El movimiento explica qué cambió. {V:estilo} en toda la interfaz, {v:ritmo} que ALMA.
---

## Por qué se mueve algo

{L:movimiento.lede}

Si un movimiento no explica nada, sobra.

Partimos de los tokens de movimiento de ALMA y vamos {v:ritmo}.

## Dos estilos

| Estilo | Tokens | Cuándo |
|---|---|---|
| **Productivo** | `easing-*-productive` | {si productivo}Toda la interfaz. Eficiente y preciso. Es el de los componentes.{sino}Lo que se repite muchas veces al día. Eficiente y preciso. Es el de los componentes.{fin} |
| **Expresivo** | `easing-*-expressive` | {si productivo}La firma, las portadas y las aperturas, donde un momento de carácter ayuda a contar algo. Con moderación.{sino}Nuestro estilo: entradas, aperturas y todo momento que cuenta algo.{fin} |

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

- No animes para decorar o entretener.
- No uses rebotes, giros ni escalas exageradas.
- Nunca muevas un elemento que la persona está leyendo.

## Movimiento reducido

Si la persona lo pide en su sistema, **toda** animación se vuelve instantánea. No hay excepciones. El movimiento nunca es la única forma de comunicar algo.
