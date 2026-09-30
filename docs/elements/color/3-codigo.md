---
element: Color
order: 1
tab: Código
summary: El color de ALMA: tres capas de tokens, cuatro temas y un solo acento.
---

## CSS

Carga `alma.css` (en `dist/css/`). Define cada token como variable CSS y los cuatro temas:

```css
.aviso { background: var(--ui-01); color: var(--text-01); border: 1px solid var(--ui-03); }
.aviso:focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; }
```

El tema lo elige el atributo `data-theme` de un contenedor, normalmente `<html>`: `dark` (por defecto), `light`, `dark-hc` o `light-hc`. Ver la página **Temas**.

## JavaScript

`dist/js/tokens.mjs` exporta los valores ya resueltos por tema:

```js
import { themes } from './dist/js/tokens.mjs';
themes.dark['interactive-01'];   // '#E1F564'
themes.light['interactive-01'];  // el valor del tema claro
```

Úsalo donde no llegan las variables CSS, como un gráfico en canvas.

## Flutter

`dist/dart/alma_tokens.dart` trae `AlmaColors`, una `ThemeExtension` con un campo por token, en camelCase, y los cuatro temas:

```dart
MaterialApp(theme: ThemeData(extensions: const [AlmaColors.dark]));
final c = Theme.of(context).extension<AlmaColors>()!;
Container(color: c.ui01, child: Text('Hola', style: TextStyle(color: c.text01)));
```

Los temas son `AlmaColors.dark`, `.light`, `.darkHc` y `.lightHc`.

## Cambiar un color

Los tokens viven en `tokens/` del repositorio, en formato W3C. Se cambian ahí, nunca en `dist/`:

1. Edita el valor en `tokens/themes/<tema>.json` o en `tokens/core/`.
2. `npm run build` genera CSS, JS, Dart y el `tokens.json` del artefacto.
3. `npm test` comprueba la ida y vuelta y el contraste de los 580 pares.
