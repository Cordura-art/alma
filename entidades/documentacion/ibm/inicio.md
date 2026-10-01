Este es nuestro sistema de diseño. Está hecho con ALMA: usamos sus tokens, sus componentes y su accesibilidad, con los valores que salen de nuestra carta. Aquí decimos cómo se usa cada pieza, con sus datos exactos.

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
| **Acento** | Un azul pleno, `{token:interactive-01}`, con texto blanco. | `interactive-01`, `text-on-interactive` |
| **Letra** | Roboto Flex en su ancho natural (`wdth` {token:font-width}), con grado neutro. | `font-width`, `font-grade` |
| **Pesos** | {token:font-weight-display} en titulares, {token:font-weight-heading} en títulos y texto, {token:font-weight-emphasis} en el énfasis. | `font-weight-*` |
| **Forma** | Ángulos rectos: {token:radius-button} en botones, campos y contenedores. | `radius-*` |
| **Movimiento** | Productivo y sereno: un 25 % más lento que ALMA. | `duration-*` |

## Principios de interfaz

- **Un acento, bien usado.** `interactive-01` marca la acción principal de la vista. Si una pantalla se siente azul, tiene demasiado azul.
- **Los neutros ordenan.** Las zonas se separan con cambios sutiles de valor: página en `ui-02`, contenedores en `ui-01`. El color queda para lo que se puede hacer.
- **El espacio agrupa.** Con una separación consistente no hacen falta divisores ni cajas: lo que va junto se ve junto.
- **Todo en múltiplos de 8.** `space-2` y `space-4` solo dentro de componentes compactos, como los campos.
- **Ángulos rectos.** Hacen visible la alineación: cuando algo se sale de la grilla, se nota de inmediato.

## Color

- La página va en `ui-02` y los contenedores en `ui-01`. Los neutros son los de ALMA.
- Tres papeles hacen casi todo, y los tres salen del mismo azul. La acción principal es `interactive-01`, el azul pleno, con `text-on-interactive` (blanco) encima. La secundaria es `interactive-02`, el mismo tono azul, muy oscuro y apagado. Los enlaces, el foco y lo elegido usan el color de acción, que aquí también es nuestro azul.
- En tema oscuro, el texto, los enlaces y la navegación en azul usan un paso claro de la rampa, `{token:link-01}`: el azul pleno no llega a 4,5:1 sobre el fondo oscuro. En tema claro usan el azul pleno, `{token:link-01:light}`.
- Los estados del sistema son `support-01` a `support-04`, siempre con una palabra o un ícono.
- Pide cada color por el nombre de su token, nunca por su valor.

## Tipografía

- Una familia: **Roboto Flex**, en su ancho natural. Roboto Mono solo para código.
- Un peso por rol: `font-weight-display` ({token:font-weight-display}), `font-weight-heading` ({token:font-weight-heading}), `font-weight-body` ({token:font-weight-body}) y `font-weight-emphasis` ({token:font-weight-emphasis}).
- Tres escalas: web, app e impresión. El cuerpo por defecto es `web-body-m`, de 14 px.
- Los tamaños van en `rem`: el texto sigue el tamaño que elija la persona.

## Forma y espacio

- Escala de espacio: `space-8` a `space-80`, en múltiplos de 8.
- Radios: {token:radius-button} en todas las familias. Dos excepciones: `radius-checkbox` ({token:radius-checkbox}), para que la casilla se siga leyendo como control, y `radius-pill`, para las formas que siempre son redondas, como el `Switch`.
- Las superficies se separan con color, no con sombra. Solo lo que flota (menús, popovers, tooltips) lleva `shadow-floating`.

## Movimiento

- El movimiento explica qué cambió, de dónde viene algo y hacia dónde va. Si no explica nada, no se mueve.
- Usamos el estilo productivo en toda la interfaz. El expresivo queda para portadas y aperturas.
- La duración por defecto es `duration-moderate-01`: {token:duration-moderate-01}.
- Si la persona pide menos movimiento en su sistema, toda animación se vuelve instantánea.

## Temas

Cuatro temas, con los mismos nombres de token: oscuro (por defecto), claro, y sus versiones de alto contraste. El acento es el mismo azul en los cuatro; lo que cambia es el paso de la rampa que se usa para texto y controles.

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
<link rel="stylesheet" href="entidad-ibm.css">
```

`entidad-ibm.css` solo redefine valores de tokens. Se genera con `npm run documentacion -- ibm`, junto a esta página. Lo que está hecho con ALMA no cambia una línea:

```js
h(AlmaDS.Button, { variant: 'filled' }, 'Enviar informe')
```
