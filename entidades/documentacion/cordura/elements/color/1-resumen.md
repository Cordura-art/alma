---
element: Color
order: 1
tab: Resumen
summary: Nuestro color: el lima heredado sobre los neutros de ALMA, en tres capas de tokens y cuatro temas.
---

## Cómo usamos el color

Usamos poco color. La interfaz es un fondo de negro tinta, texto claro y un solo acento: el lima, `interactive-01` (`{token:interactive-01}`), una chispa que aparece donde se puede actuar. Los estados, las etiquetas y los gráficos usan color solo cuando comunican algo, y siempre con una palabra o un ícono al lado.

Nunca escribimos un color: pedimos un **token** por su nombre. El tema decide el valor. Por eso la misma interfaz funciona en los cuatro temas sin cambiar una línea.

![La misma pantalla de compra de un pasaje en los cuatro temas, lado a lado: oscuro, claro, oscuro de alto contraste y claro de alto contraste.](assets/Fundamentos/color-cuatro-temas.png)

## Nuestra rampa

El lima no salió de la carta: lo trajimos. Es nuestro color desde antes de este sistema y lo heredamos tal cual. La carta decidió lo demás: la rampa que nace de él, `primary-100` a `primary-900`, y el papel de cada paso.

| Paso | Valor | Papel |
|---|---|---|
| `primary-200` | `{token:primary-200}` | El paso de la rampa más cercano al lima heredado. |
| `primary-400` | `{token:primary-400}` | Encima: `hover-primary`. |
| `primary-500` | `{token:primary-500}` | Presionado: `active-primary`. |
| `primary-600` | `{token:primary-600}` | Controles encendidos en tema claro (3:1). |
| `primary-700` | `{token:primary-700}` | Navegación y texto en lima sobre fondo claro (4,5:1). |
| `primary-900` | `{token:primary-900}` | Navegación en claro de alto contraste. |

Nuestra paleta tiene dos rampas más, amarillo y verde. Son de la firma: no se usan en la interfaz y no tienen tokens.

## Tres capas

Como en ALMA, los tokens de color van en tres capas. Cada capa apunta a la anterior.

| Capa | Qué nombra | Ejemplos | Se usa en |
|---|---|---|---|
| **Base** | Los colores disponibles: marca y rampas. | `brand-lime`, `primary-500`, `secondary-700`, `blue-60` | Solo dentro de las otras capas. Nunca directo en una interfaz. |
| **Semántica** | El papel en la interfaz. Cambia con el tema. | `ui-01`, `text-01`, `interactive-01`, `focus`, `support-01` | Pantallas, maquetas y componentes nuevos. |
| **Componente** | Una decisión de un componente, en un estado. | `button-filled-bg-hover`, `field-border-error`, `table-row-bg-selected` | Dentro de cada componente. |

Para ajustar un componente, cambia su token de componente, nunca el semántico: el cambio queda en ese componente y el resto del sistema no se entera.

![Las tres capas de tokens de color: el color base brand-lime alimenta al rol semántico interactive-01, que alimenta al token de componente button-filled-bg, el fondo del botón principal.](assets/Fundamentos/color-tres-capas.png)

## Los roles semánticos

| Familia | Tokens | Para qué |
|---|---|---|
| Superficies | `ui-01` a `ui-05` | Capas: la página es `ui-02`; los contenedores, `ui-01`; los paneles anidados, `ui-03` y `ui-04`. `ui-05` es un borde de énfasis. |
| Bordes | `border-subtle`, `border-control` | El borde sutil separa contenedores; el de control marca campos y selectores (3:1). |
| Texto | `text-01` a `text-05`, `text-error`, `text-on-interactive` | Principal, secundario, desactivado, sobre colores. |
| Íconos | `icon-01` a `icon-03` | Principal, secundario, sobre colores. |
| Acción | `interactive-01` a `interactive-04` | Lima para la acción principal, lima muy oscuro y apagado para la secundaria, y el color de acción para el contorno de la terciaria y lo elegido. |
| Estados de interacción | `hover-*`, `active-*`, `selected-ui`, `focus` | Encima, presionado, elegido y foco. |
| Estados del sistema | `support-01` a `support-04` | Error, éxito, advertencia, información. |
| Inversos | `inverse-01`, `inverse-02`, `inverse-support-*` | Superficies que invierten el tema, como el tooltip. |
| Velos | `overlay-01`, `tint-white-*`, `tint-dark-*` | Detrás de modales y sobre imágenes. |

## Tres papeles

Casi todo lo que se puede accionar usa tres papeles de color. Dos salen del tono del lima; el tercero es el azul que todos reconocemos.

| Papel | Qué es | Tema claro | Tema oscuro |
|---|---|---|---|
| **Marca** | El lima. Botón principal (`filled`), con texto tinta. | `{token:interactive-01:light}` | `{token:interactive-01}`, el mismo |
| **Marca muy oscura** | El tono del lima, muy oscuro y con poca saturación. Botón secundario (`gray`), con texto blanco. | `{token:interactive-02:light}` | `{token:interactive-02}`, un paso más claro para no perderse en el fondo |
| **Acción** | El color que se lee como «esto se puede seguir»: enlaces, foco, lo elegido y el contorno del botón terciario. | `{token:link-01:light}` | `{token:link-01}` |

El color de acción es un azul clásico de enlace, porque así lo aprendimos todos: se reconoce sin explicación. No es un azul cualquiera: toma la saturación de nuestro lima y queda en el borde de los azules más cercano a él, para que los dos convivan.

Los colores oscuros se aclaran al interactuar y los claros se oscurecen: el lima pasa a `{token:hover-primary}` encima y a `{token:active-primary}` presionado.

## El lima en cada tema

El lima es un acento luminoso: lleva texto tinta encima y brilla sobre el fondo oscuro. Sobre fondo claro no llega a 3:1, así que en los temas claros la navegación y los controles usan pasos oscuros de su rampa.

| Papel | Token | Oscuro | Claro |
|---|---|---|---|
| Acción principal | `interactive-01` | `{token:interactive-01}` | `{token:interactive-01:light}` |
| Texto sobre la acción | `text-on-interactive` | `{token:text-on-interactive}` | `{token:text-on-interactive:light}` |
| Encima | `hover-primary` | `{token:hover-primary}` | `{token:hover-primary:light}` |
| Presionado | `active-primary` | `{token:active-primary}` | `{token:active-primary:light}` |
| Destino actual | `nav-selected` | `{token:nav-selected}` | `{token:nav-selected:light}` |
| Borde de campo | `field-border` | `{token:field-border}` | `{token:field-border:light}` |
| Control encendido | `control-on` | `{token:control-on}` | `{token:control-on:light}` |
| Enlaces | `link-01` | `{token:link-01}` | `{token:link-01:light}` |
| Elegido | `interactive-04` | `{token:interactive-04}` | `{token:interactive-04:light}` |
| Foco | `focus` | `{token:focus}` | `{token:focus:light}` |

## Capas de superficie

Las superficies son las de ALMA y se apilan en un orden fijo. Cada capa se distingue de la que tiene debajo, así la jerarquía se lee sin bordes ni sombras.

| Capa | Token | Claro | Oscuro | Qué va ahí |
|---|---|---|---|---|
| 1 | `ui-02` | Gris muy claro | El fondo más profundo | La página. |
| 2 | `ui-01` | Blanco | Blanco al 4 % sobre la página | Contenedores: tarjetas, menús, tablas, alertas. |
| 3 | `ui-03` | Gris azulado claro | Blanco al 7 % | Un panel dentro de un contenedor. |
| 4 | `ui-04` | Azul gris claro | Blanco al 10 % | Una zona dentro de ese panel. |
| Acción | `interactive-01`, `interactive-02` | Lima y lima muy oscuro | Lima y lima oscuro | Los botones, sobre cualquier capa. |

No saltes capas hacia atrás: un contenedor dentro de otro `ui-01` pasa a `ui-03`, no vuelve a `ui-02`.

**Las capas no son bordes.** Para separar un contenedor usa `border-subtle`; para marcar un control, `border-control`. Nunca uses `ui-03` o `ui-04` como borde: en oscuro están demasiado cerca del fondo para verse.

![Las cuatro capas de superficie anidadas en tema claro y oscuro: la página ui-02, un contenedor ui-01, un panel ui-03 y una zona ui-04 con los botones interactive-01 e interactive-02.](assets/Fundamentos/color-capas-superficie.png)

## Cuántos hay

Son los mismos tokens de color de ALMA, con los mismos nombres. La página **Origen** lista cada uno de los que cambian de valor. Todos están en la pestaña **Tokens**.
