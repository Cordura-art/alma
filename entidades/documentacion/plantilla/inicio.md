Este es nuestro sistema de diseño. Está hecho con ALMA: usamos sus tokens, sus componentes y su accesibilidad, con los valores que salen de nuestra carta{si heredado} y con el {v:acento} que siempre fue nuestro{fin}. Aquí decimos cómo se usa cada pieza, con sus datos exactos.

> {aviso}

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
| **Acento** | {V:marca}, `{token:interactive-01}`, con texto {v:sobre}. | `interactive-01`, `text-on-interactive` |
| **Letra** | Roboto Flex {v:ancho} (`wdth` {token:font-width}), {v:grado}. | `font-width`, `font-grade` |
| **Pesos** | {token:font-weight-display} en titulares, {token:font-weight-heading} en títulos, {token:font-weight-body} en el texto y {token:font-weight-emphasis} en el énfasis. | `font-weight-*` |
| **Forma** | {V:forma}: {token:radius-button} en botones, campos y contenedores. | `radius-*` |
| **Movimiento** | {V:estilo}, {v:ritmo} que ALMA. | `duration-*` |

## Principios de interfaz

- **Un acento, bien usado.** `interactive-01` marca la acción principal de la vista. Si el {v:acento} está por toda la pantalla, hay demasiado.
- **Los neutros ordenan.** Las zonas se separan con cambios sutiles de valor: página en `ui-02`, contenedores en `ui-01`. El color queda para lo que se puede hacer.
- **El espacio agrupa.** {L:grilla.espacio}
- **Todo en múltiplos de 8.** `space-2` y `space-4` solo dentro de componentes compactos, como los campos.
- **{V:forma}.** {L:grilla.forma:2-2}

## Color

- La página va en `ui-02` y los contenedores en `ui-01`. Los neutros son los de ALMA.
- Tres papeles hacen casi todo{si accionMarca}, y los tres salen del mismo {v:acento}{fin}. La acción principal es `interactive-01`, {v:marca}, con `text-on-interactive` ({v:sobre}) encima. La secundaria es `interactive-02`: el tono del {v:acento}, muy oscuro y apagado, con texto blanco. Los enlaces, el foco y lo elegido usan el color de acción{si accionMarca}, que aquí también es nuestro {v:acento}{sino}, un azul clásico: `{token:link-01}` en tema oscuro y `{token:link-01:light}` en claro{fin}.
{si profundo}
- En tema oscuro, el texto y la navegación en {v:acento} usan un paso claro de la rampa, `{token:nav-selected}`: el {v:acento} pleno no llega a 4,5:1 sobre el fondo oscuro. En tema claro usan `{token:nav-selected:light}`.
{sino}
- El {v:acento} es luminoso: no se lee como texto sobre fondo claro. En tema claro, la navegación y los controles usan pasos oscuros de su rampa.
{fin}
- Los estados del sistema son `support-01` a `support-04`, siempre con una palabra o un ícono.
- Pide cada color por el nombre de su token, nunca por su valor.

## Tipografía

- Una familia: **Roboto Flex**, {v:ancho}. Roboto Mono solo para código.
- Un peso por rol: `font-weight-display` ({token:font-weight-display}), `font-weight-heading` ({token:font-weight-heading}), `font-weight-body` ({token:font-weight-body}) y `font-weight-emphasis` ({token:font-weight-emphasis}).
- Tres escalas: web, app e impresión. El cuerpo por defecto es `web-body-m`, de 14 px.
- Los tamaños van en `rem`: el texto sigue el tamaño que elija la persona.

## Forma y espacio

- Escala de espacio: `space-8` a `space-80`, en múltiplos de 8.
{si radioUnico}
- Radios: {token:radius-button} en todas las familias. Dos excepciones: `radius-checkbox` ({token:radius-checkbox}), para que la casilla se siga leyendo como control, y `radius-pill`, para las formas que siempre son redondas, como el `Switch`.
{sino}
- Radios: {token:radius-button} en botones, campos, navegación y contenedores; {token:radius-chip} en las piezas pequeñas. La casilla conserva sus esquinas (`radius-checkbox`, {token:radius-checkbox}), para seguir leyéndose como control.
{fin}
- Las superficies se separan con color, no con sombra. Solo lo que flota (menús, popovers, tooltips) lleva `shadow-floating`.

## Movimiento

- {L:movimiento.lede:1} Si no explica nada, no se mueve.
- Usamos el estilo {v:estilo} en toda la interfaz. {si productivo}El expresivo queda para la firma, las portadas y las aperturas.{sino}El productivo queda para lo que se repite muchas veces al día.{fin}
- La duración por defecto es `duration-moderate-01`: {token:duration-moderate-01}.
- Si la persona pide menos movimiento en su sistema, toda animación se vuelve instantánea.

## Temas

Cuatro temas, con los mismos nombres de token: oscuro (por defecto), claro, y sus versiones de alto contraste. El acento es el mismo {v:acento} en los cuatro; lo que cambia es el paso de la rampa que se usa {si profundo}para texto y controles{sino}donde el {v:acento} no se leería{fin}.

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
<link rel="stylesheet" href="entidad-{id}.css">
```

`entidad-{id}.css` solo redefine valores de tokens. Se genera con `npm run entidad -- {id}`, junto a esta página. Lo que está hecho con ALMA no cambia una línea:

```js
h(AlmaDS.Button, { variant: 'filled' }, '{L:muestra.primaria}')
```
