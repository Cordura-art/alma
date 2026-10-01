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
entidades/         motor de carta: fecha de nacimiento → carta de diseño humano, la semilla de una entidad
site/              fuentes de las páginas: documentación (de ALMA y de cada entidad), Ajustes, Entidades ALMA y los lenguajes de diseño
tests/             pares de contraste y pruebas del motor de carta y de las entidades
```

## Comandos

```bash
npm install     # una vez
npm run build   # genera dist/ desde tokens/
npm test        # ida y vuelta con el artefacto + contraste (628 pares, 4 temas) + motor de carta + entidades
npm run site    # arma build/alma-site.html: la documentación con el estilo de ALMA
npm run tuner   # arma build/alma-ajustes.html: la herramienta para ajustar temas, ejes de Roboto Flex, pesos y radios
npm run tokens:apply -- cambios.json   # aplica a tokens/ los cambios exportados por la herramienta
npm run images  # fotografía las imágenes de la documentación con los componentes reales (Playwright)
npm run carta -- --fecha 1911-06-16 --hora 12:00 --zona America/New_York --nombre IBM   # carta de una entidad (--json para el objeto completo)
npm run entidades   # arma build/entidades-alma.html: crear entidades y ver ALMA con sus parámetros
npm run lenguaje    # arma también build/lenguaje-<id>.html: el lenguaje de diseño de cada entidad en entidades/lenguajes/
npm run entidad -- ibm    # todo lo de una entidad en un paso: lenguaje, documentación (build/documentacion-ibm/), imágenes, pruebas y capturas para revisar
npm run sistemas          # arma build/documentacion-sistemas/: ALMA y sus entidades en un solo sitio, con su documentación y su lenguaje de diseño
npm run buscar-fecha -- --anios 1911,1924 --zona America/New_York --tipo proyector --perfil 1/3 --centros cabeza,ajna,garganta --color '#0F62FE'   # fechas cuya carta da esa entidad
```

## Entidades

Una entidad es una marca tratada como persona: nace en una fecha, y su carta de diseño humano es la receta de su arquetipo. El motor (`entidades/carta.mjs`) calcula la carta completa con posiciones planetarias reales (`astronomy-engine`): las 26 activaciones de personalidad y diseño, las puertas y líneas, los canales, los centros definidos, el tipo, la autoridad, el perfil, la definición y la cruz. La fecha funciona como semilla: la misma fecha siempre da la misma entidad. Desde la carta, `entidades/voz.mjs` escribe la voz y los principios de la entidad: cada puerta parte de su hexagrama del I Ching y se lee como tema, voz y principio (`entidades/arquetipos.mjs`); los canales definidos son sus principios, la cruz es su propósito, y la Garganta, el perfil, la autoridad y el tipo dan su forma de hablar. Sin hora, se usa el mediodía y la carta avisa que la Luna y las líneas pueden cambiar.

**Entidades ALMA** (`site/entidades.js`) convierte la carta en parámetros de ALMA: el ancho y el grado de Roboto Flex, los pesos, los radios, el movimiento y una paleta propia en OKLCH, y viste los componentes de ALMA con ellos. Su motor también corre en Node (`scripts/lib/entidades.mjs`), para los scripts y las pruebas.

**Documentación de una entidad.** `npm run entidad -- <id>` arma, en un solo paso, el lenguaje de diseño de la entidad, su sitio de documentación (`build/documentacion-<id>/`), sus imágenes, sus pruebas y 24 capturas de las páginas clave en los cuatro temas (`revision/`) para mirar antes de publicar. El sitio es el de ALMA con los valores de la entidad (`scripts/lib/documentacion.mjs`): tokens, componentes en vivo, imágenes y una página **Origen** que lista cada token que cambia y de qué rasgo de la carta sale. Una entidad cambia valores de tokens, nunca nombres.

Una entidad nueva solo escribe su lenguaje de diseño (`entidades/lenguajes/<id>.json`). Los textos de su documentación salen de una plantilla compartida, `entidades/documentacion/plantilla/`: los hechos vienen de la carta (`{token:radius-button}`, `{v:acento}`, `{si profundo}…{sino}…{fin}`) y la voz, de frases del lenguaje (`{L:grilla.forma}`). `reemplazos.json`, en la misma carpeta, guarda una sola vez las frases de las guías de ALMA que cambian según la entidad. Si una entidad necesita un texto propio, un archivo con la misma ruta en `entidades/documentacion/<id>/` reemplaza al de la plantilla. La construcción falla si una marca de la plantilla no se resuelve, si un reemplazo ya no encuentra su frase o si queda una frase que describe un aspecto que la entidad no tiene.

Las imágenes se dibujan varias a la vez y con memoria (`build/cache/`): cada escena anota los tokens de los que depende, y solo se vuelve a dibujar si cambió ella, el código o el valor de uno de esos tokens. `--forzar` las rehace todas. **Un solo lugar para todos los sistemas.** `npm run sistemas` arma `build/documentacion-sistemas/`: ALMA y cada entidad en una sola página. Un selector cambia de sistema y, dentro de una entidad, otro cambia entre su documentación y su lenguaje de diseño, que va anidado en el mismo sitio (`site/lenguaje.js` entrega sus páginas al sitio en vez de armar el suyo). Las imágenes viajan en paquetes de 8 (`img/<id>-<n>.json`) que se piden al abrir la página que las muestra, porque un artefacto publicado admite un número limitado de archivos. Hoy tienen documentación la Entidad IBM, la Entidad Cordura y la Entidad Ensayo, una marca ficticia creada para probar este flujo.

**Marcas que ya existen.** Para una marca nueva manda su fecha real. Para una que ya existe, la fecha es una decisión: `npm run buscar-fecha` recorre años hora por hora y devuelve los momentos cuya carta da la entidad buscada, ordenados por cercanía a su color. Así nació la **Entidad IBM** (3 de junio de 1911, 04:00, Nueva York): un Proyector 1/3 cuyo acento generado, #1D62FF, queda a ΔE 0,006 del Blue 60 sin ajustes. **Lenguajes de diseño.** Cada entidad tiene su lenguaje de diseño, armado con una sola plantilla (`site/lenguaje.js`): filosofía, prisma de identidad, voz, tono, escritura, elementos con «así sí, así no» hechos con componentes de ALMA, galería y origen. La estructura, las especificaciones y los ejemplos salen de la carta; las palabras, de `entidades/lenguajes/<id>.json`. La densidad toma como referente el IBM Design Language, sin copiar su texto. Hoy hay tres: IBM, Cordura (31 de marzo de 1987, 10:45, Providencia), que hereda su lima, y Ensayo, la entidad de prueba.

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
