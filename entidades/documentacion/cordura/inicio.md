Este es nuestro sistema de diseño. Está hecho con ALMA: usamos sus tokens, sus componentes y su accesibilidad, con los valores que salen de nuestra carta y con el lima que siempre fue nuestro. Aquí decimos cómo se usa cada pieza, sin apuro y hasta la raíz.

> Primer borrador. Los valores salen de la carta de Cordura y del lima heredado; los textos esperan revisión.

## Qué encuentras aquí

| Sección | Qué responde |
|---|---|
| **Origen** | De dónde sale cada valor y qué cambia frente a ALMA, token por token. |
| **Fundamentos** | Color, tipografía, espaciado, movimiento, íconos y temas, con sus tokens. |
| **Patrones** | Cómo se combinan los componentes en tareas comunes: formularios, carga, diálogos. |
| **Guías** | Accesibilidad y contenido. |
| **Componentes** | Los componentes de ALMA, en vivo, con nuestros valores. |

El porqué de cada decisión (nuestra filosofía, nuestros principios y nuestra voz) está en el lenguaje de diseño de la entidad. Esta documentación es el cómo.

## Cómo se nos reconoce

Cinco rasgos nos distinguen de ALMA. Todo lo demás es igual.

| Rasgo | Nuestro valor | Tokens |
|---|---|---|
| **Acento** | El lima heredado, `{token:interactive-01}`, con texto tinta. | `interactive-01`, `text-on-interactive` |
| **Letra** | Roboto Flex en su ancho natural (`wdth` {token:font-width}), con un grado levemente más firme ({token:font-grade}). | `font-width`, `font-grade` |
| **Pesos** | Livianos: {token:font-weight-display} en titulares, {token:font-weight-heading} en títulos, {token:font-weight-body} en el texto y {token:font-weight-emphasis} en el énfasis. | `font-weight-*` |
| **Forma** | Esquinas suaves de {token:radius-button} en botones, campos y contenedores. | `radius-*` |
| **Movimiento** | Productivo y pausado: un 25 % más lento que ALMA. | `duration-*` |

## Principios de interfaz

- **Un acento, bien usado.** `interactive-01` marca la acción principal de la vista. Si una pantalla se siente lima, tiene demasiado lima.
- **El control es tuyo.** Toda decisión se puede revisar, pausar o deshacer. Nada se impone ni apura.
- **Los neutros ordenan.** Las zonas se separan con cambios sutiles de valor: página en `ui-02`, contenedores en `ui-01`. El color queda para lo que se puede hacer.
- **Damos aire.** Mientras más importante la decisión, más espacio alrededor. Todo en múltiplos de 8.
- **Esquinas suaves.** No suavizamos para decorar: suavizamos para acercar.

## Color

- La página va en `ui-02` y los contenedores en `ui-01`. Los neutros son los de ALMA.
- Tres papeles hacen casi todo. La acción principal es `interactive-01`, el lima, con texto tinta encima. La secundaria es `interactive-02`: el tono del lima, muy oscuro y apagado, con texto blanco. Los enlaces, el foco y lo elegido usan el color de acción, un azul clásico: `{token:link-01}` en tema oscuro y `{token:link-01:light}` en claro.
- El lima es luminoso: no se lee como texto sobre fondo claro. En tema claro, la navegación y los controles usan pasos oscuros de su rampa.
- Los estados del sistema son `support-01` a `support-04`, siempre con una palabra o un ícono.
- Pide cada color por el nombre de su token, nunca por su valor.

## Tipografía

- Una familia: **Roboto Flex**, en su ancho natural. Roboto Mono solo para código.
- Un peso por rol: `font-weight-display` ({token:font-weight-display}), `font-weight-heading` ({token:font-weight-heading}), `font-weight-body` ({token:font-weight-body}) y `font-weight-emphasis` ({token:font-weight-emphasis}).
- Tres escalas: web, app e impresión. El cuerpo por defecto es `web-body-m`, de 14 px.
- Los tamaños van en `rem`: el texto sigue el tamaño que elija la persona.

## Forma y espacio

- Escala de espacio: `space-8` a `space-80`, en múltiplos de 8.
- Radios: {token:radius-button} en botones, campos, navegación y contenedores; {token:radius-chip} en las piezas pequeñas. La casilla conserva sus esquinas (`radius-checkbox`, {token:radius-checkbox}), para seguir leyéndose como control.
- Las superficies se separan con color, no con sombra. Solo lo que flota (menús, popovers, tooltips) lleva `shadow-floating`.

## Movimiento

- El movimiento llega como una ola y se asienta: nunca golpea, nunca apura.
- Usamos el estilo productivo en toda la interfaz. El expresivo queda para la firma, las portadas y las aperturas.
- La duración por defecto es `duration-moderate-01`: {token:duration-moderate-01}.
- Si la persona pide menos movimiento en su sistema, toda animación se vuelve instantánea.

## Temas

Cuatro temas, con los mismos nombres de token: oscuro (por defecto), claro, y sus versiones de alto contraste. El lima es el mismo en los cuatro; lo que cambia es el paso de la rampa que se usa donde el lima no se leería.

## Accesibilidad

- WCAG 2.2 AA en los cuatro temas: texto a 4,5:1; bordes de control, foco e íconos a 3:1. En alto contraste, texto a 7:1.
- Todo control mide al menos 44 px (`size-touch-min`).
- Foco visible en todos los componentes, y todo se puede usar con el teclado.
- El color nunca es la única pista.

## Cómo empezar

Carga `alma.css`, los componentes y, después, los valores de la entidad:

```html
<link rel="stylesheet" href="alma.css">
<link rel="stylesheet" href="bundle.css">
<link rel="stylesheet" href="entidad-cordura.css">
```

`entidad-cordura.css` solo redefine valores de tokens. Se genera con `npm run documentacion -- cordura`, junto a esta página. Lo que está hecho con ALMA no cambia una línea:

```js
h(AlmaDS.Button, { variant: 'filled' }, 'Enviar propuesta')
```
