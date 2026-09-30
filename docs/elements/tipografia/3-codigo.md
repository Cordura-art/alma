---
element: Tipografía
order: 2
tab: Código
summary: Una familia, Roboto Flex extendida, en tres escalas: web, app e impresión.
---

## Cargar la fuente

Roboto Flex con el eje de ancho, desde Google Fonts:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wdth,wght,GRAD,XTRA@8..144,25..151,100..1000,-200..150,323..603&family=Roboto+Mono:wght@400;500&display=swap">
```

## CSS

`alma.css` define la familia (`--font-flex`, `--font-mono`) y una clase por estilo:

```css
body { font-family: var(--font-flex); font-stretch: calc(var(--font-width) * 1%);
       font-variation-settings: "wdth" var(--font-width), "GRAD" var(--font-grade);
       -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
```

```html
<h1 class="web-h1">Mis viajes</h1>
<p class="web-body-m">Próximos pasajes comprados.</p>
```

La clase trae tamaño, interlineado, peso y espaciado; el ancho 150 se hereda de `body`.

## JavaScript

```js
import { typography } from './dist/js/tokens.mjs';
typography['web-h1'];  // { fontSize, lineHeight, fontWeight, letterSpacing, … }
```

## Flutter

`AlmaTypography` trae cada estilo como `TextStyle`, con el ancho 150 como variación de la fuente:

```dart
Text('Mis viajes', style: AlmaTypography.webH1.copyWith(color: c.text01));
```

Cada estilo lleva `FontVariation('wdth', AlmaFontAxis.fontWidth)` y `FontVariation('GRAD', AlmaFontAxis.fontGrade)`. Agrega Roboto Flex como fuente variable del proyecto para que tengan efecto.
