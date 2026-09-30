---
element: Temas
order: 6
tab: Código
summary: Cuatro temas: oscuro por defecto, claro y sus versiones de alto contraste.
---

## `data-theme`

```html
<html data-theme="dark"> … </html>
<aside data-theme="light"> una zona clara dentro de una página oscura </aside>
```

Sin atributo, se usa Oscuro.

## `applyTheme()`

Elige el tema según el sistema y lo sigue si cambia:

```js
AlmaDS.applyTheme();                   // dark o light según el sistema, + '-hc' si pide más contraste
AlmaDS.applyTheme({ base: 'dark' });   // fuerza la base; el alto contraste sigue al sistema
```

| Opción | Tipo | Por defecto | Uso |
|---|---|---|---|
| `root` | `Element` | `document.documentElement` | Dónde se pone `data-theme`. |
| `base` | `'dark' \| 'light'` | según `prefers-color-scheme` | Fuerza la base. |
| `highContrast` | `boolean` | según `prefers-contrast: more` | Fuerza o quita el alto contraste. |
| `watch` | `boolean` | `true` | Sigue los cambios del sistema. |

Devuelve el tema aplicado. Llámalo una vez al cargar la página.

## Controles nativos

Indica al navegador si el tema es oscuro, para que las barras de desplazamiento y los controles nativos lo sigan:

```js
document.documentElement.style.colorScheme = tema.startsWith('light') ? 'light' : 'dark';
```

## Flutter

```dart
final hc = MediaQuery.highContrastOf(context);
final dark = MediaQuery.platformBrightnessOf(context) == Brightness.dark;
final colors = dark ? (hc ? AlmaColors.darkHc : AlmaColors.dark) : (hc ? AlmaColors.lightHc : AlmaColors.light);
```
