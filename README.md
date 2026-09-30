# ALMA

ALMA es el sistema de diseño de Cordura: tokens, componentes y guías para todo lo que construimos. Es oscuro por defecto, con Roboto Flex extendida y un solo acento lima que marca la acción.

- **Guía completa y componentes en vivo:** [artefacto ALMA en Claude](https://claude.ai/artifact/SCF8Q6LvX36d5afdJBrS9Q)
- **Origen:** el theme de Cordura (`CorduraDS/tokens/theme.json`) y el archivo de Figma «DLS ALMA — Cordura x Claude».

## Cómo está organizado

```
tokens/            FUENTE DE VERDAD, en el formato W3C de design tokens
  alma.config.json   temas, familias y metadatos
  core/              espaciado, radios, movimiento, breakpoints, capas, sombras, tamaños, grid
  type/              familias tipográficas y los 48 estilos de texto
  themes/            los 495 colores de cada tema: dark, light, dark-hc, light-hc
dist/              GENERADO: no se edita a mano
  css/alma.css         variables CSS de los 4 temas y clases de texto
  js/tokens.mjs        valores resueltos para JavaScript
  json/tokens.json     el formato del artefacto ALMA
  dart/alma_tokens.dart  Flutter: AlmaColors (ThemeExtension), espaciado, movimiento, tipografía
artifact/project/  la guía, los 48 componentes y sus vistas previas, tal como se publican en el artefacto
tests/             pares de contraste que se verifican en cada cambio
```

## Comandos

```bash
npm install     # una vez
npm run build   # genera dist/ desde tokens/
npm test        # ida y vuelta con el artefacto + contraste (580 pares, 4 temas)
npm run site    # arma build/alma-site.html: la documentación con el estilo de ALMA
npm run tuner   # arma build/alma-ajustes.html: la herramienta para ajustar temas, ejes de Roboto Flex, pesos y radios
npm run tokens:apply -- cambios.json   # aplica a tokens/ los cambios exportados por la herramienta
```

## Usar ALMA

**Web**

```html
<link rel="stylesheet" href="dist/css/alma.css">
<html data-theme="dark"> … </html>   <!-- dark · light · dark-hc · light-hc -->
```

**Flutter** (el paquete llega en la fase 4; los tokens ya se generan)

```dart
MaterialApp(theme: ThemeData(extensions: const [AlmaColors.dark]));
final alma = Theme.of(context).extension<AlmaColors>()!;
Container(color: alma.ui01, padding: const EdgeInsets.all(AlmaSpacing.space16));
```

## Reglas

- Los cambios se hacen en `tokens/`, nunca en `dist/`. La revisión de GitHub falla si `dist/` no está al día o si algún par pierde contraste.
- Nada nuevo sin aprobación: un color, componente o estilo que falta se propone primero (ver [CONTRIBUTING.md](CONTRIBUTING.md)).
- Accesibilidad mínima: WCAG 2.2 AA en los cuatro temas (AAA en alto contraste), foco visible, teclado y movimiento reducido.

## Hoja de ruta

1. **Repositorio y tokens** — tokens W3C, Style Dictionary, CSS, JavaScript, Dart y el artefacto. *(hecho)*
2. **Paquete React y Storybook** — los componentes en TypeScript, con los 4 temas y revisión de accesibilidad.
3. **Sitio de marca en línea** — la guía editorial, con componentes en vivo.
4. **Flutter y Widgetbook** — el paquete Dart con los componentes.
