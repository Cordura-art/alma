ALMA es el sistema de diseño de Cordura, un estudio de lenguajes de movimiento. Es oscuro por defecto, con Roboto Flex extendida y un solo acento lima que marca la acción. Todo lo que construyas con ALMA sale de estos tokens y componentes; si algo falta, se pide, no se inventa.

## Misión

ALMA es el sistema de diseño de Cordura para productos y experiencias digitales. Reúne código, herramientas de diseño, guías de interfaz y una comunidad que contribuye. Se construye para las necesidades de Cordura y se puede adaptar a cada cliente como sistema de marca blanca.

## Principios de diseño de Cordura

Guían a cualquier persona que diseñe, o apruebe un diseño, en nombre de Cordura. Todo lo que hace Cordura debería dejar tiempo ahorrado o tiempo bien usado.

- **Cuidadosamente considerado:** antes de hacer algo, pregunta si es útil, esencial y propio de Cordura, y quita todo lo gratuito.
- **Unido, no uniforme:** soluciones reconocibles, repetibles y reutilizables. Si tapas el logo, ¿se reconoce que es de Cordura?
- **Ejecutado con maestría:** todo comunica, lo que hacemos y lo que no. Si algo se puede mejorar, se sigue explorando.
- **Positivamente progresivo:** guiar es liderar. Quita cada fricción para entender y usar, y da más de lo que pide.

## Principios de ALMA

- **Abierto:** quien usa ALMA también lo construye; cualquiera puede contribuir.
- **Inclusivo:** accesible para todas las personas, sin importar su capacidad o situación.
- **Modular y flexible:** los componentes funcionan juntos en cualquier combinación.
- **Primero las personas:** decisiones basadas en investigación sobre necesidades reales.
- **Consistente:** cada elemento nace del lenguaje de diseño de Cordura para que todo funcione junto.

## Principios de interfaz

- **Un acento, bien usado.** `brand-lime` / `interactive-01` es la acción principal y el foco de la pieza. Si todo es lima, nada lo es.
- **El espacio agrupa.** El espacio en blanco relaciona elementos. Con una separación normada no hacen falta divisores ni contenedores: el usuario entiende qué va junto.
- **Cuanto más grande el objeto, más espacio alrededor.** Titulares `web-display-*` respiran con `space-56` a `space-80`. Controles con `space-8` a `space-24`.
- **Todo en múltiplos de 8.** Usa `space-4`, `space-2` y `space-0` solo dentro de componentes compactos como los inputs.

## Color

- Superficies, como en el theme de origen de Cordura: la **página** va en `ui-02` y los **contenedores** (tarjetas, alertas, menús, tablas) en `ui-01`.
- Tema **Oscuro** (por defecto): página `ui-02` (`#02010C`), contenedores `ui-01` (`#141733`), texto en `text-01`, secundario en `text-02`.
- Tema **Claro**: son los valores exactos de las variables de Figma. Úsalo en documentos e interfaces de trabajo.
- Acciones: `interactive-01` (lima) para la principal, `interactive-02` (acero) para la secundaria. El texto sobre ambas es siempre `text-on-interactive`.
- Enlaces: `link-01`. Foco: `focus`, un borde o anillo de 2 px sólido.
- Estados del sistema: `support-01` error, `support-02` éxito, `support-03` advertencia, `support-04` información. Van siempre con palabra o ícono, nunca solo color. Los fondos de aviso son `notification-*-bg`.
- Etiquetas: `tag-<color>-bg` con `tag-<color>-text`. Hay 11 colores: red, yellow, magenta, purple, blue, cyan, teal, green, warmgray, gray y coolgray.
- Veladuras: `tint-white-*` y `tint-dark-*` sobre imagen. `overlay-01` detrás de modales.
- Rampas `primary-*`, `secondary-*`, `tertiary-*`, de estado y secundarias (50–900): los pasos que existen en Figma son exactos. Los demás se interpolaron entre ellos y están aprobados (2026-09-29). Pídelas por nombre de token, nunca por hex.
- Temas de **alto contraste**: `dark-hc` (Oscuro · alto contraste) y `light-hc` (Claro · alto contraste). Texto a 7:1 (WCAG AAA) y bordes, foco e íconos a 3:1 o más. Se activan con `data-theme="dark-hc"` o `"light-hc"`. `AlmaDS.applyTheme()` los elige solo: toma Oscuro o Claro según `prefers-color-scheme`, añade `-hc` si el sistema pide más contraste (`prefers-contrast: more`) y sigue los cambios. Llámalo una vez al cargar la página; `{ base: 'dark' }` fuerza la base.

### Gráficos

- **Categórica:** `viz-cat-01` a `viz-cat-08`, en ese orden: lima, azul, magenta, turquesa, amarillo, violeta, cian, rojo. Cada color llega a 3:1 sobre `ui-01` (contenedores) en su tema. Usa tantos como series haya, empezando por el 01; con más de 8 series, agrupa.
- **Secuencial:** `viz-seq-1` (claro) a `viz-seq-5` (intenso), rampa terciaria, para valores de menos a más.
- **Divergente:** `viz-div-1` a `viz-div-5`, de rojo a azul con neutro en el centro (`viz-div-3`), para desvíos alrededor de un punto medio.
- El color nunca es la única pista: rotula las series o usa forma o trama.

### Tres capas de color

Como en IBM Carbon, el color va en tres capas:
1. **Base:** rampas y colores de marca (`primary-500`, `brand-lime`). No se usan directo en componentes.
2. **Semántica:** el rol en la interfaz (`interactive-01`, `ui-01`, `text-01`, `focus`). Cambia con el tema.
3. **Componente:** `<componente>-<parte>-<estado>`, por ejemplo `button-filled-bg-hover`, `field-border-error`, `table-row-bg-selected`, `tooltip-bg`. Son alias de la capa semántica y su nota dice de cuál. Hay 126, uno por decisión de cada componente.

Para ajustar un componente, cambia su token de componente, nunca el semántico: el cambio queda en ese componente y el resto del sistema no se entera. Un token de componente puede apuntar a otro semántico en alto contraste (por ejemplo `payment-card-text` usa `secondary-400` en `dark-hc` y `light-hc`); así el tema, y no el CSS, resuelve cada caso.

Contraste: todos los componentes pasan WCAG AA en los dos temas (texto 4.5:1, bordes, foco e íconos 3:1). Para lograrlo se cambiaron estos valores de Figma:
- `text-on-interactive` pasa a `brand-ink`; `text-on-pressed` sobre `active-primary`.
- En Claro: `text-02`, `text-03` e `icon-02` pasan a `#566980`; `text-error` a `#AE2424`; `focus` a `#0043CC`.
- En Oscuro: `text-error` pasa de `#FF003D` a `#EB6161` (el primero daba 4,4:1 sobre contenedores).
- Verificado con axe (WCAG 2.2 AA) en los 46 componentes y en los cuatro temas: cero problemas. El verificador propio revisa 580 pares de color: cero fallos.
- El campo usa `field-border`, `field-border-hover` y `field-label`. En Oscuro son lima; en Claro, tonos acero oscuros.
- `border-control` marca el borde del selector y del contador sobre la página.
Cada token cambiado lo dice en su nota. No uses los valores anteriores.

Área táctil: todo control mide al menos `size-touch-min` (44 px), el mínimo de Apple, por encima de los 24 px de WCAG 2.2. El botón pequeño pasó de 32 a 44 px y el selector segmentado de 40 a 44 px. Los botones de ícono que se ven más chicos (el ojo del campo, desplegar en ProductCard, copiar en PaymentCard) conservan su tamaño visual, pero su área de toque se amplía a 44 × 44.

### Densidad

- **Normal** (por defecto): controles de 44 px (`size-touch-min`), campos de 56 px (`size-field`), filas de tabla de 56 px (`size-row`).
- **Compacta:** `data-density="compact"` en cualquier contenedor. Controles de 32 px (`size-control-compact`), campos de 40 px (`size-field-compact`), filas de 40 px (`size-row-compact`); la tabla `dense` baja a 32 px. Las áreas de toque de íconos se ajustan al mismo alto, así no se pisan.
- La compacta solo actúa con puntero fino (mouse o trackpad, `pointer: fine`). En pantallas táctiles se ignora y todo sigue en 44 px.
- Úsala en herramientas de trabajo de escritorio con mucha información: tablas, paneles de administración, formularios largos. No en productos para el público ni en piezas de marca.
- Solo cambian altos y rellenos; el texto, los colores y el contraste no cambian. `data-density="normal"` vuelve a la normal dentro de una zona compacta.

## Tipografía

- Una sola familia: **Roboto Flex**, siempre extendida (`font-stretch: 150%`, `"wdth" 150`). Roboto Mono solo para código.
- Pesos, un token por rol (`font-weight-display`, `-heading`, `-body`, `-emphasis`) que usan los estilos de texto y los componentes; ajustados el 30 de septiembre de 2026 (antes 600, 500 y 400, del theme de origen de Cordura): *display* a 220 (entre ExtraLight y Light); encabezados web h1–h6, headline, title y blockquote a 350; cuerpo y etiquetas a 350 (entre Light y Regular); énfasis dentro de componentes a 500 (Medium). Los ejes de Roboto Flex: ancho `font-width` 130 y grado `font-grade` 20. No hay otros pesos.
- Tres escalas, según el soporte:
  - **Web**: `web-display-l` 128 hasta `web-h6` 16, `web-body-m` 14 como cuerpo por defecto, `web-label-s` 11 para botones y ayudas.
  - **App**: `app-display-*`, `app-headline-*`, `app-title-*`, `app-body-*`, `app-label-*`.
  - **Print**: la misma escala que App, con dos diferencias de Figma: `print-body-s` a 9 px y `print-label-m` a 16/20.
- **Mismo peso en todos los temas:** ALMA fija el suavizado `antialiased` (como IBM Carbon). Con el suavizado automático de macOS, el texto claro sobre fondo oscuro se dibujaba entre 11 % y 17 % más grueso que en el tema claro; medido en pantalla, ahora la diferencia en texto y títulos queda en ±6 %, igual que los íconos (4 %). El efecto óptico de lo claro sobre oscuro pesa más en titulares muy gruesos; en el origen, por eso, los *display* iban a 600; desde el 30 de septiembre de 2026 van a 1000, una decisión de estilo.
- **Texto escalable:** los tamaños de los estilos y de los componentes van en `rem` (16 px = 1 rem) y las interlíneas sin unidad, así que siguen el tamaño de texto que elija la persona. Los controles usan altura mínima, no fija, y los anchos de campos, avisos y tarjetas también van en `rem`. Probado al 200 %: nada se recorta. No fijes tamaños de texto en px.
- Números gigantes para piezas de marca: `web-display-xl` (640/100 %, 600, −1,5 %), el *display Xlarge* del theme de origen. Solo en portadas y carteles, no en interfaz.

## Espaciado y grid

- Escala: `space-8`, `space-16`, `space-24`, `space-32`, `space-40`, `space-48`, `space-56`, `space-64`, `space-72` y `space-80`.
- Radios, uno por familia: `radius-button` (16 px) para botones, `radius-field` (8 px) para campos, `radius-nav` (8 px) para navegación, `radius-tag` (8 px) para etiquetas, `radius-checkbox` (2 px) para la casilla; `radius-panel` (8 px) para contenedores, `radius-card` (8 px) para marcos grandes, `radius-swatch` (2 px) para tarjetas de muestra, `radius-chip` (4 px) para detalles pequeños. `radius-pill` queda para las formas siempre redondas.
- Grid responsive, mobile first. Cada breakpoint aplica desde ese ancho:

| Breakpoint | Desde | Columnas | Margen | Gutter |
|---|---|---|---|---|
| `bp-sm` | 320 px | 4 (columna 76 px) | `grid-offset-mobile` 16 px | `grid-gutter-mobile` 8 px |
| `bp-md` | 672 px | 8 | `grid-margin` 16 px | `grid-gutter` 32 px |
| `bp-lg` | 1056 px | 16 | `grid-margin` 16 px | `grid-gutter` 32 px |
| `bp-xlg` | 1312 px | 16 | `grid-margin` 16 px | `grid-gutter` 32 px |
| `bp-max` | 1584 px | 16 | `grid-margin-max` 24 px | `grid-gutter` 32 px |

- La fila móvil es el grid de ALMA en Figma. De tablet hacia arriba es el IBM 2x Grid.
- Usa `grid-gutter-condensed` (1 px) solo en mosaicos de imágenes y tablas de datos.

## Capas y elevación

- Las superficies se separan con color, no con sombra: página en `ui-02`, primera capa en `ui-01`, segunda en `ui-03`. Es el modelo de capas de IBM Carbon.
- Solo lo que flota sobre el contenido (menús, popovers, tooltips) lleva `shadow-floating`.
- Orden de apilado, por nombre: `z-footer`, `z-floating`, `z-overlay`, `z-header`, `z-modal`, `z-dropdown`. No inventes valores intermedios.

## Movimiento

Cordura es un estudio de lenguajes de movimiento, y ALMA usa el lenguaje de movimiento de IBM (IBM Design Language, Carbon). El movimiento explica qué cambió; nunca decora.

- **Productivo** (`easing-*-productive`): interfaz de trabajo. Es eficiente y no distrae. Es el modo por defecto de los componentes.
- **Expresivo** (`easing-*-expressive`): momentos de marca, cambios importantes y celebraciones (un pago aprobado, una portada). Úsalo con moderación.
- Curva por intención:
  - `standard` para lo que se mueve dentro de la pantalla.
  - `entrance` para lo que aparece: desacelera al llegar.
  - `exit` para lo que se va: acelera al salir.
- Duración según el tamaño y la distancia del cambio:
  - `duration-fast-01` (70 ms): botones y toggles.
  - `duration-fast-02` (110 ms): tooltips, bordes de campo.
  - `duration-moderate-01` (150 ms): cambios cortos; es la duración por defecto.
  - `duration-moderate-02` (240 ms): expansiones y toasts.
  - `duration-slow-01` (400 ms): modales y expansiones grandes.
  - `duration-slow-02` (700 ms): velos y héroes.
- Recetas de IBM:
  - **Revelar**: `duration-moderate-01` + `easing-entrance-productive`.
  - **Contextual** (menú, tooltip): `duration-fast-02` + `easing-entrance-expressive`.
  - **Expandir**: `duration-moderate-02` + `easing-standard-productive`.
  - **Invocar** (modal): `duration-moderate-02` + `easing-standard-expressive`.
- Coreografía:
  - Si varios elementos entran, escalónalos por grupos. No los animes todos a la vez ni uno por uno.
  - Las salidas son más cortas que las entradas.
- **Movimiento reducido:** si el usuario lo pide, toda animación de ALMA se vuelve instantánea. No hay excepciones, y lo aplica `bundle.css` a todo el sistema.

### Movimiento de marca

La base son nuestros referentes; las recetas propias de Cordura se iterarán desde aquí.

**IBM Carbon (movimiento expresivo y coreografía)**
- Expresivo solo en momentos importantes: abrir una página nueva, la acción principal, alertas y notificaciones del sistema, o cuando el movimiento mismo comunica algo. El resto es productivo.
- Recorridos sobre la grilla: nada se mueve en diagonal.
- Consistencia semántica: lo que significa lo mismo se mueve igual (desplegar una fila y abrir un menú usan la misma curva, con duración según el tamaño). La inconsistencia es intencional: avanzar en la dirección de entrada afirma; volver sobre ella cancela.
- Continuidad: los elementos compartidos entre pantallas (títulos, botones) hacen de puente en la transición.
- Secuencia y escalonado: si entran varios elementos, repártelos en el tiempo con `duration-stagger` (20 ms), con el total bajo 500 ms. Orden de entrada: 1) estructura (barras de navegación), 2) contenido estático (títulos, texto, imágenes), 3) contenido dinámico (datos de una tabla, resultados), 4) acción principal, 5) gráficos animados.

**Apple HIG**
- Movimiento con propósito: acompaña la experiencia, no la tapa. Nada de animar por animar.
- Opcional: nunca es la única forma de comunicar algo importante; con movimiento reducido, todo llega a su estado final sin animación (ALMA lo aplica a todo el sistema).
- Realista: el movimiento sigue el gesto y la expectativa (lo que baja para abrirse, sube para cerrarse).
- Breve y preciso en la respuesta a una acción; sin animaciones propias en interacciones frecuentes.
- Se puede interrumpir: nadie espera a que termine una animación para seguir.

## Imágenes e ilustración

Sale de las piezas de marca de Figma (Brand Key, Behance y mockups). La marca junta naturaleza y tecnología: texturas reales de cerca y pantallas, píxeles y datos.

### Fotografía

- **Naturaleza real, de muy cerca o muy lejos:** texturas (pelaje, pasto, agua, roca) y paisajes amplios con luz natural y cielo cubierto. Nada de bancos de imágenes con gente posando.
- **Tecnología a la vista:** pantallas, código, píxeles y subpíxeles RGB, en collage con la naturaleza (como en el Brand Key).
- **Tratamiento:** color natural, o duotono en azul profundo (`tertiary-700` y más oscuros) cuando la imagen va de fondo detrás del logo o de texto.
- **Personas:** en situaciones reales y en movimiento, nunca mirando a cámara con una sonrisa de catálogo.

### Formas e ilustración

- ALMA no usa 3D, clip art ni emoji.
- **Personajes y mascotas:** cada entidad puede tener los suyos. Son criaturas hechas con formas simples (un círculo, una elipse y dos ojos) y los colores de la paleta de la entidad; el mismo nombre da siempre la misma criatura. Sirven de avatar, de mascota de una pieza y, amontonadas, de textura. Las dibuja el generador de `entidades/`, junto con los emblemas, las caras de tarjeta, el campo, el carrusel y el micelio. En el lenguaje de cada entidad que las declara, hoy Ensayo, se ven en Ilustración y reemplazan a la firma de barras en Firma, Inicio y Comunicación. Todavía no son un componente.
- Un personaje acompaña, no informa: errores, avisos e instrucciones van con texto y un `Icon`. Si solo decora lleva `aria-hidden`; si identifica a alguien, su nombre va como texto alternativo. No uses personajes ajenos ni que imiten a una persona real.
- Las formas de marca, hechas con tokens, siguen siendo la base: círculo, estrella de cuatro puntas (el hueco entre cuatro círculos), píldora (`radius-pill`), píldoras concéntricas y las líneas de velocidad del logo.
- Colores de las formas: tonos acero (`secondary-*`), azul (`tertiary-*`) y a lo sumo un toque de lima (`interactive-01`), el mismo acento que en la interfaz.
- En estados vacíos, un `Icon` basta; no agregues ilustraciones que no sumen información.

### En la interfaz

- Todo lo que comunica lleva texto alternativo (`alt`) que dice qué muestra y para qué está. Las decorativas llevan `alt=""`.
- Nunca pongas información importante solo dentro de una imagen: precios, fechas y avisos van en texto.
- Texto sobre imagen: siempre con una veladura (`tint-dark-*` o `tint-white-*`) que asegure 4,5:1, medido en la zona más clara de la foto.
- Proporciones: 16:9 para portadas y videos, 4:3 para tarjetas, 1:1 para avatares y miniaturas. Recorta con `object-fit: cover` y cuida que el foco quede dentro.
- Esquinas: `radius-panel` (8 px) dentro de tarjetas; a sangre (sin radio) en portadas.
- Carga diferida (`loading="lazy"`) para lo que está fuera de la primera pantalla, y siempre `width` y `height` para que la página no salte.
- Video: sin sonido al empezar, con controles y subtítulos; si se reproduce solo, se detiene con movimiento reducido.

## Logo

- El logotipo de Cordura (`assets/Logos/cordura-logo.svg`) son píldoras escalonadas con destellos de cuatro puntas, en `secondary-600` y `secondary-700`.
- Va sobre `brand-black`, `brand-ink` o un fondo claro. No se recolorea.
- La píldora del logo es la misma forma que `radius-pill`: por eso los botones son píldoras.

## Componentes

- **Acciones:** `Button`, que sigue las directrices de botones de Apple:
  - Estilos por prominencia: `filled`, `tinted`, `gray` y `plain`; `tertiary` (contorno, del theme de origen de Cordura); más `ghost` e `inverse` para fondos de marca.
  - Roles: `normal`, `primary`, `cancel` y `destructive` (rojo, nunca primario).
  - Indicador de actividad, modo de solo ícono y tamaños 44, 56 y 72.
  - Como máximo 1 o 2 botones `filled` por vista.
- **Formularios:**
  - `TextInput`: campo en píldora con borde lima; también de solo lectura (`readOnly`, borde punteado).
  - `SegmentedControl`: selección única entre 2 o 3 opciones.
  - `Stepper`: cantidad con − y +.
- **Toggles** (según Apple):
  - `Switch`, solo en filas de lista. Fuera de listas se usa `Button` con `selected`.
  - `Checkbox`, con estado mixto, para jerarquías.
  - `RadioGroup`, para 3 a 5 opciones excluyentes.
  - El estado nunca se indica solo con color.
- **Menús** (según Apple):
  - `PopUpButton`: elegir una opción; muestra la selección.
  - `PullDownButton`: lista de acciones, con la destructiva al final.
- **Navegación** (según Apple):
  - `TabBar`, en móvil: de 3 a 5 secciones, siempre visible, nunca deshabilitada.
  - `Sidebar`, en tablet y escritorio: como máximo 2 niveles y visible por defecto.
  - `Toolbar`: título, volver y pocas acciones, con el resto en «Más».
  - `Tabs`: paneles relacionados, como máximo 6.
  - Desde `bp-lg`, `TabBar` se convierte en `Sidebar` con los mismos destinos.
- **Búsqueda:** `SearchField`: busca al escribir, con sugerencias, alcance y tokens.
- **Ayuda:** `Tooltip` (verbo primero, como máximo 75 caracteres, Esc lo oculta) y `Tip` (consejo breve y descartable).
- **Datos** (Apple + Carbon):
  - `Table`: encabezados con sustantivo, orden, selección y filas que navegan.
  - `Pagination`, pegada debajo de la tabla.
- **Formularios, más:**
  - `Slider`: mínimo a la izquierda, con campo para el valor exacto.
  - `FileUploader`: botón o zona para arrastrar, con el estado de cada archivo.
- **Estados** (Apple + Carbon):
  - `ProgressBar`: determinada siempre que se pueda.
  - `ActivityIndicator`: spinner para esperas sin avance medible.
  - `Skeleton`: solo para contenedores y datos.
- **Navegación, más:** `PageControl`, los puntos de un carrusel.
- **Notificaciones** (Carbon):
  - `InlineNotification`: en línea, accionable o callout; no se cierra sola.
  - `toast` y `ToastRegion`: éxito e información se cierran solos a los 5 s; errores y advertencias quedan.
- **Comunicación:** `Alert`, que interrumpe solo cuando hace falta. Tiene como máximo 3 botones, «Cancelar» a la izquierda y nunca por defecto, y se cierra con Esc.
- **Contenido:**
  - `ProductCard`: tarjeta desplegable con fondo de color de etiqueta.
  - `PaymentCard`: tarjeta de pago sobre vidrio oscuro, con su avance de activación.
- **Estados:** `ProgressLine`, una línea de carga lima que termina en verde.
- **Iconografía:** `Icon` y `Pictogram` (un dibujo pequeño que distingue una cosa de sus vecinas; nunca reemplaza a un ícono).
- **Contenido, más:** `Card` (toda la tarjeta es un enlace, con acciones encima), `List` (lista agrupada de Apple, filas de 44 px), `Tag` (solo lectura, se puede quitar o filtro seleccionable) y `EmptyState` (qué falta, por qué, una acción).
- **Navegación, más:** `Link` (subrayado dentro del texto), `Breadcrumb` (la página actual es texto; los niveles del medio se pliegan), `Accordion` y `ProgressIndicator` (pasos de un flujo).
- **Capas:** `Popover` (no modal, junto a su botón), `Modal` (tarea breve; atrapa el foco) y `Sheet` (sube desde abajo en el teléfono).
- **Formularios, más:** `Textarea`, `Combobox` (escribir para filtrar; una o varias opciones), `DatePicker` (dd-mm-aaaa, semana desde el lunes) y `TimePicker` (24 horas).
- Todos siguen los patrones de WAI-ARIA (APG) para teclado y lectores de pantalla, y pasan axe en los cuatro temas y con el texto al 200 %.

Los flujos de «Design System – Solutions» (billetera, KYC, pasajes, app de video) son productos hechos con ALMA, no parte del sistema.

## Iconografía

- **IBM Carbon** (`@carbon/icons` 11.89, licencia Apache 2.0), como SVG dentro de la página: sin fuentes que descargar, visibles desde el primer instante. Reemplaza a Material Symbols desde el 2026-09-29: las tres fuentes de Material pesaban 12,6 MB por página y dejaban los íconos invisibles hasta cargar.
- ALMA incluye 896 íconos de interfaz (acciones, navegación, estados, personas, comercio y viajes). El catálogo completo, con 2.775 íconos, sus categorías y sinónimos, está en `assets/Icons/carbon-icons.json`; se carga con `AlmaDS.registerIcons()` solo cuando hace falta.
- Dos familias, cada una con un trabajo. Los **íconos** de Carbon dicen qué hace un control o qué pasó: acciones, navegación y estados. Los **pictogramas** distinguen una cosa de sus vecinas: un capítulo, un proyecto, una etiqueta.
- Para íconos usa siempre el componente `Icon`. Tamaños de Carbon: `icon-size-sm` (16 px) en datos densos, `icon-size-md` (20 px) dentro de controles, `icon-size-lg` (24 px) por defecto y `icon-size-xl` (32 px) en zonas vacías. Van en rem: crecen con el texto.
- Para pictogramas usa el componente `Pictogram`: el nombre de la cosa elige su dibujo, y el mismo nombre da siempre el mismo. Cada entidad dibuja los suyos. Van desde `icon-size-lg` (24 px), siempre junto al nombre, y nunca en un botón ni en un aviso.
- Un solo peso y un solo estilo. `variant: 'filled'` usa la versión `--filled` cuando existe (estados elegidos y avisos). Las flechas de los botones y el ojo del campo también usan `Icon`.
- El color se hereda: `icon-01` principal, `icon-02` secundario, `text-on-interactive` sobre lima o acero.
- Sin emoji.

## Contenido

### Voz y tono

- Español neutro, de tú, frases cortas. Una idea por frase.
- La voz es siempre la misma; el tono se ajusta al momento: directo en tareas, calmado en errores, cálido en logros, sin chistes cuando algo salió mal.
- Mayúscula solo al inicio y en nombres propios, también en títulos y botones ("Mis viajes", no "Mis Viajes").
- La marca en inglés se escribe como en su perfil: "We are a motion languages studio".

### Botones y acciones

- Verbo primero, y que diga lo que pasa: "Pagar $7.000", "Eliminar tarjeta", "Ver proyecto". Nunca "Sí", "OK" o "Aceptar" cuando hay algo más preciso.
- En diálogos de confirmación, el botón repite el verbo del título: "¿Eliminar la tarjeta?" → "Eliminar" y "Cancelar".
- Mientras carga, el botón dice qué hace, con puntos suspensivos (…): "Pagando…", "Guardando…".
- Enlaces con texto que se entienda solo: "Ver condiciones del pasaje", nunca "Haz clic aquí".

### Errores

- Di qué pasó y cómo seguir, en ese orden: "No se pudo conectar. Revisa tu conexión y vuelve a intentarlo."
- Sin culpas ni alarmas: nada de "inválido", "ilegal", "fallo fatal" ni signos de exclamación.
- En campos, la ayuda dice la regla antes de que se rompa ("Mínimo 4 caracteres") y el error dice cómo arreglarlo ("Escribe un correo con @"). Va bajo el campo, en `text-error`, junto al borde `field-border-error`: nunca solo color.
- Los códigos técnicos van al final y solo si ayudan al soporte: "(código 504)".
- Elige el componente según el peso: error de un campo → TextInput; de una sección → InlineNotification; del sistema, pasajero → toast; algo que exige decidir → Alert.

### Estados vacíos

- Tres partes: un título que diga qué falta ("Aún no tienes viajes"), una frase que explique por qué o qué verás aquí, y una acción principal ("Buscar pasajes").
- Distingue los casos: primera vez (invita a empezar), sin resultados (sugiere cambiar la búsqueda o los filtros) y sin permiso o sin conexión (explica cómo recuperarlo).
- Un ícono de `Icon` a lo sumo, en `icon-02`. Sin ilustraciones decorativas que no sumen información.

### Formatos (Chile, `es-CL`)

Usa siempre `Intl` con `'es-CL'`; no armes los formatos a mano.

| Dato | Formato | Cómo |
|---|---|---|
| Moneda | $7.000 (sin decimales) | `new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' })` |
| Números | 1.234,5 | `n.toLocaleString('es-CL')` |
| Porcentaje | 25% | `{ style: 'percent' }` |
| Fecha corta | 31 mar 2026 | `{ day: '2-digit', month: 'short', year: 'numeric' }` |
| Fecha larga | martes, 31 de marzo de 2026 | `{ dateStyle: 'full' }` |
| Hora | 14:30 (24 horas) | `{ hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }`; sin `hourCycle` sale «02:30 p. m.» |
| RUT | 12.345.678-5 | con puntos y guion; el dígito verificador en mayúscula (K) |
| Teléfono | +56 9 1234 5678 | código de país, luego grupos de 1, 4 y 4 |

- Fechas relativas solo para lo reciente ("hace 5 minutos", "ayer"); después, fecha exacta. Usa `Intl.RelativeTimeFormat('es-CL')`.
- En tablas, números y montos alineados a la derecha con cifras tabulares (`Table` ya lo hace con `align: 'end'`).

## No sincronizado

Las notas de uso y las guías de componentes resumen las descripciones del archivo de Figma. Falta lo siguiente:
- **Archivos de fuente:** Roboto Flex y Roboto Mono se cargan desde Google Fonts. Los íconos ya no dependen de la red.
- **Los íconos como SVG:** se usan con la fuente oficial, no se exportaron uno por uno.
- **El árbol de documentación** (9003-138490) y las piezas de marca: Brand Key, videos y teclados.
- **Los valores del tema Oscuro que no existen en Figma:** se derivaron de las piezas de marca, están aprobados y su nota lo indica.
- **Alto contraste, paleta de gráficos y texto escalable:** nacieron en ALMA; el futuro archivo de Figma los tomará de aquí.
