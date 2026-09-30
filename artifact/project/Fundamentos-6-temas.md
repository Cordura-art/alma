# Temas

Cuatro temas: oscuro por defecto, claro y sus versiones de alto contraste.


## Resumen

### Los cuatro temas

| Tema | Id | Para |
|---|---|---|
| **Oscuro** | `dark` | Por defecto. Productos de Cordura y piezas de marca. |
| **Claro** | `light` | Documentos e interfaces de trabajo. Son los valores del theme de origen en Figma. |
| **Oscuro · alto contraste** | `dark-hc` | Quien pide más contraste en su sistema. |
| **Claro · alto contraste** | `light-hc` | Ídem, en claro. |

> **Imagen pendiente:** la misma tarjeta de viaje en los cuatro temas.

### Qué cambia entre temas

Solo los valores de los tokens semánticos y de componente. Los nombres, las medidas, la tipografía y el comportamiento son los mismos: una interfaz hecha con tokens funciona en los cuatro sin cambiar nada.

### Alto contraste

- Texto a 7:1 (WCAG AAA); texto grande a 4,5:1.
- Bordes, foco e íconos a 3:1 o más.
- Las superficies y los controles se separan con bordes, no solo con tono.
- Algunos tokens de componente apuntan a otro color solo en alto contraste; así el tema, y no el CSS, resuelve cada caso.

### Elegir el tema

- Por defecto, ALMA sigue al sistema: Oscuro o Claro según la preferencia de la persona, y alto contraste si lo pidió.
- Una zona puede tener su propio tema: el atributo `data-theme` aplica a todo lo que contiene.
- Si la interfaz ofrece elegir, muestra los cuatro con su nombre y recuerda la elección.

## Código

### `data-theme`

```html
<html data-theme="dark"> … </html>
<aside data-theme="light"> una zona clara dentro de una página oscura </aside>
```

Sin atributo, se usa Oscuro.

### `applyTheme()`

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

### Controles nativos

Indica al navegador si el tema es oscuro, para que las barras de desplazamiento y los controles nativos lo sigan:

```js
document.documentElement.style.colorScheme = tema.startsWith('light') ? 'light' : 'dark';
```

### Flutter

```dart
final hc = MediaQuery.highContrastOf(context);
final dark = MediaQuery.platformBrightnessOf(context) == Brightness.dark;
final colors = dark ? (hc ? AlmaColors.darkHc : AlmaColors.dark) : (hc ? AlmaColors.lightHc : AlmaColors.light);
```
