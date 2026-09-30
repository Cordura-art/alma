# Documentación

## Novedades

Lo último que cambió en ALMA, de lo más reciente a lo más antiguo. El detalle de cada cambio está en el historial del repositorio.

### 30 de septiembre de 2026

- **Capas del tema claro, accesibles.** `text-02` en claro pasa de `#566980` a `#4C5D74` para leerse sobre `ui-04` (4,8:1). En claro de alto contraste, `ui-03` y `ui-04` pasan a `#E8F0F4` y `#D5E5EB`, capas claras con texto sobre 7:1 (antes `ui-04` era un gris oscuro de borde). Los campos deshabilitados usan `disabled-03` en los cuatro temas. El verificador suma texto y controles sobre `ui-03` y `ui-04`.
- **Elevación en el tema oscuro.** Las capas simulan altura: `ui-01`, `ui-03` y `ui-04` mezclan blanco al 4, 7 y 10 % sobre la página (6, 12 y 18 % en alto contraste), guardado como color sólido. Las tarjetas dejan el azul noche y pasan a un casi negro. **Nuevo token `border-subtle`** para los bordes de contenedores, que antes usaban `ui-03`; conserva el mismo color en los cuatro temas. Los campos deshabilitados en oscuro toman `disabled-03`, con el mismo color de antes.
- **Capas del tema claro corregidas.** La página (`ui-02`) pasa a gris muy claro `#F8FBFC` y los contenedores (`ui-01`) a blanco `#FFFFFF`; estaban al revés y las tarjetas casi no se distinguían de la página. Lo mismo en claro de alto contraste. La guía de Color suma **Capas de superficie**: página, contenedor, panel y zona, con las acciones encima.
- **Pesos de los componentes en tokens.** Cuatro tokens nuevos, `font-weight-display`, `font-weight-heading`, `font-weight-body` y `font-weight-emphasis`, que usan los estilos de texto y todos los componentes. Los títulos de componentes siguen a los encabezados (350, antes 500 fijos); el texto de los componentes, al cuerpo (350, antes 400); lo elegido y lo actual, al énfasis (500). Ajustes de ALMA suma un control de peso de énfasis. En Flutter, cada estilo lleva el peso exacto en el eje `wght`.
- **Tercer ajuste de estilo**, hecho con Ajustes de ALMA: Roboto Flex a ancho 130 y grado 20; *display* en peso 220; títulos, cuerpo y etiquetas en 350. Radios: botones 16 px, etiquetas 8 px, casilla 2 px, paneles y muestras 2 px, marcos grandes y detalles 4 px; campos rectos y navegación en píldora, sin cambios.
- **Radios por familia.** Cinco tokens nuevos que se ajustan en Ajustes de ALMA: `radius-button`, `radius-field`, `radius-nav`, `radius-tag` y `radius-checkbox`. Parten con el valor que ya tenía cada elemento, salvo `SearchField` y el campo del `Slider`, que ahora siguen a los demás campos (0 px). La casilla de `Checkbox` tiene su propio radio de 4 px, así no se confunde con `RadioGroup`. Las opciones de `SegmentedControl` dejan de tener 48 px fijos.
- **Segundo ajuste de estilo**, hecho con Ajustes de ALMA: Roboto Flex a ancho 125 y grado 0; *display* en peso 500; títulos, cuerpo y etiquetas en 350; esquinas rectas (`radius-panel`, `radius-card` y `radius-swatch` en 0 px) y `radius-chip` en 48 px, redondeado completo. Reemplaza al ajuste anterior del mismo día.
- **Nuevo estilo tipográfico y de forma**, hecho con Ajustes de ALMA: Roboto Flex a ancho 151 y grado −200; *display* en peso 1000; títulos, cuerpo y etiquetas en 100; radios `radius-panel`, `radius-card` y `radius-swatch` en 8 px. `ProductCard` ahora toma su radio de `radius-panel` (antes 24 px fijos).
- **Ajustes de ALMA**, una herramienta para ajustar los colores de cada tema, los ejes de Roboto Flex (ancho y grado), los pesos y los radios sobre componentes en vivo. Revisa el contraste con los mismos pares del repositorio y exporta los cambios; `npm run tokens:apply -- cambios.json` los escribe en `tokens/`.
- **Nuevos tokens de ejes:** `font-width` (150) y `font-grade` (0). El CSS, los componentes y Flutter los usan en vez del 150 fijo.
- **Patrones completos.** Se sumaron Encabezado y navegación global, Inicio de sesión, Indicadores de estado, Barra de texto, Campos fluidos y Divulgación progresiva: 15 patrones que cubren los 18 de Carbon.
- **Nuevo: campos de solo lectura.** `TextInput` y `Textarea` aceptan `readOnly`: borde punteado con el token nuevo `field-border-readonly`, texto con contraste normal, foco y copia. El patrón **Desactivado y solo lectura** lo usa.
- **Tooltip se puede recorrer con el cursor** (WCAG 1.4.13): el globo recibe el puntero y un puente cubre la separación con el control.
- **PaymentCard escribe su estado** junto al chip («Activando»): ya no depende del color.
- **Los 46 componentes tienen su guía completa.** Se sumaron Accordion, EmptyState, Icon, PageControl, PaymentCard, ProductCard y Tip.
- **PaymentCard** dice su estado y los datos ocultos en texto para el lector de pantalla («Activando», «terminada en 4821»); antes el estado era solo color y el número se leía como una fila de puntos.
- **Contraste:** el verificador suma los 22 pares de ProductCard (texto y dato destacado sobre los 11 tonos).
- **Guías completas de estados y formularios:** ActivityIndicator, ProgressBar, ProgressIndicator, ProgressLine, Skeleton, DatePicker, TimePicker, FileUploader, Slider y Stepper. Ya son 39 componentes con sus cuatro partes.
- **ProgressBar** muestra el porcentaje con el formato de Chile («60%», antes «60 %»).
- **Guías completas de Toolbar, SearchField, SegmentedControl, Tag, Link, PullDownButton y Card.** Ya son 29 componentes con sus cuatro partes.
- **SegmentedControl con teclado de grupo de radios:** una sola parada de Tab en la opción elegida; las flechas, Inicio y Fin eligen y mueven el foco. Antes cada opción era una parada de Tab y las flechas no hacían nada.
- **Patrones y guías.** Nueve patrones (formularios, estados vacíos, notificaciones, carga, búsqueda y filtros, diálogos y capas, acciones, desactivado y solo lectura, contenido que desborda) y dos guías con pestañas: Accesibilidad y Contenido.
- **Fundamentos con la profundidad de Carbon.** Color, Tipografía, Espaciado y grilla, Movimiento, Íconos y Temas tienen su página con pestañas (Resumen, Uso o Estilos, Código) y, en el sitio, una pestaña **Tokens** con las tablas en vivo. La de Temas pinta cada tema en su fila.
- **Guías completas de la tanda 3.** Tabs, Sidebar, TabBar, Breadcrumb, Table, Pagination y List tienen sus cuatro partes.
- **Pagination** muestra los números con el formato de Chile («1.284 movimientos»); antes salía «1284».
- **Guías completas de la tanda 2.** Modal, Sheet, Alert, InlineNotification, ToastRegion, Tooltip y Popover tienen sus cuatro partes. La de Tooltip deja escrito un pendiente de WCAG 1.4.13: el globo todavía no se puede recorrer con el cursor sin que desaparezca.
- **Accesibilidad de componentes.** Table y List aceptan `headingLevel`, como Accordion, para encajar en la jerarquía de títulos de la página. Modal y Sheet ya no usan `header` ni `footer`, que los lectores de pantalla anunciaban como regiones de la página. En pantallas angostas, la Toolbar pone el buscador en su propia fila.
- **Sitio de documentación con el estilo de ALMA.** Una página propia, hecha con los componentes de ALMA (Sidebar, Toolbar, SearchField, Tabs, Table), reúne la guía general, estas novedades, los fundamentos (color, tipografía, espaciado, movimiento) y cada componente con su vista previa en vivo y sus pestañas Uso, Estilo, Código y Accesibilidad. Tiene los cuatro temas. `npm run site` la genera desde el repositorio.
- **Guías completas de la tanda 1.** TextInput, Textarea, Combobox, PopUpButton, Checkbox, RadioGroup y Switch tienen ahora sus cuatro partes (Uso, Estilo, Código y Accesibilidad), con tablas de Elemento · Propiedad · Token por estado, tipografía, medidas, teclado y marcadores de imagen pendiente. Búscalas en la ficha de cada componente.
- **Button tinted al presionar.** Muestra un borde interior de 2 px, igual que plain y tertiary.
- **Guía de Button** con el formato de referencia completo, que es el modelo para el resto de los componentes.
- **Movimiento de marca.** Las recetas parten de IBM Carbon (expresivo y coreografía: estructura, contenido, datos escalonados cada 20 ms, acción principal; todo bajo 500 ms) y de Apple HIG. La ficha Motion las muestra.
- **Vistas previas.** Cada vista previa pinta el fondo de página de su tema; ya no aparece la capa clara detrás de los componentes.
- **ALMA en GitHub.** Los tokens (formato W3C) viven en el repositorio y generan el CSS, el JS, los tokens para Flutter y este artefacto. Cada cambio pasa por una prueba de ida y vuelta y por 492 pares de contraste.

### 29 de septiembre de 2026

- **Roles del theme de origen.** La página va en `ui-02` y los contenedores en `ui-01`.
- **Botón tertiary**, nuevo.
- **Destructive tinted** tiene sus propios tokens de hover y presionado; ya no toma el lima.
- **Íconos de IBM Carbon** como SVG dentro de la página, en lugar de las fuentes de Material Symbols (12,6 MB menos por página).
- **Pesos tipográficos** iguales en tema oscuro y claro: display 600, títulos 500, cuerpo 400.

## Cómo se documenta ALMA

La documentación toma como base la estructura y los temas de IBM Carbon (carbondesignsystem.com), con el contenido escrito para ALMA: sus tokens, sus componentes, las guías de Apple que sigue y el español de Chile. No es una traducción de Carbon: Carbon marca **qué** hay que documentar; ALMA dice **cómo** lo resuelve.

### Arquitectura: dos sitios

El referente es la página «Referente IBM» del archivo de Figma de Cordura, que reproduce los dos sitios de IBM. ALMA se documenta igual, en dos partes:

**Sistema de diseño** (modelo: Carbon)
- Sobre ALMA: qué es, quién lo usa, versiones.
- Componentes: cada uno con Uso, Estilo, Código y Accesibilidad.
- Elementos: color, tipografía, espaciado, grilla, movimiento, íconos, temas.
- Patrones.
- Guías: accesibilidad y contenido.
- Recursos, novedades, soporte y preguntas frecuentes.

**Lenguaje de diseño** (modelo: IBM Design Language)
- Punto de vista y principios de Cordura.
- Galería.
- Tipografía: la familia (Roboto Flex) y conceptos básicos de tipo.
- Grilla 2x.
- Logo (en IBM, el 8-Bar).
- Íconos de app e íconos de interfaz.
- Pictogramas: biblioteca, diseño, uso y cómo contribuir.
- Ilustración: resumen, técnicas y estilos (línea, plano, isométrico), personas, gráficos y diagramas técnicos.
- Recursos.

### Imágenes

Las imágenes que explican cada página se crearán después con el sistema de diseño generativo y procedural de Cordura, del que saldrán patrones, texturas y el resto de los elementos visuales. Mientras tanto, cada lugar donde va una imagen lleva un marcador:

```
> **Imagen pendiente:** qué debe mostrar, con qué variantes, estados y temas.
```

El marcador describe la imagen con precisión suficiente para generarla sin volver a leer la página.

### Cómo se organiza

Cada componente tiene cuatro pestañas, como en Carbon:

| Pestaña | Archivo | Qué responde |
|---|---|---|
| Uso | `usage.md` | Cuándo usarlo y cuándo no, variantes, anatomía, tamaños, jerarquía, alineación, contenido, comportamiento, modificadores. |
| Estilo | `style.md` | Color por estado con sus tokens, tipografía, medidas, foco, movimiento, contraste por tema. |
| Código | `code.md` | Propiedades, ejemplos, HTML y CSS, cómo ajustar con tokens, Flutter. |
| Accesibilidad | `accessibility.md` | Qué resuelve ALMA, teclado, recomendaciones de diseño, etiquetado, desarrollo, verificación. |

`npm run build` arma con las cuatro la guía del componente en el artefacto (`artifact/project/components/<Nombre>/README.md`). Esa guía no se edita a mano: se edita aquí.

Los fundamentos siguen el mismo camino: `docs/elements/<nombre>/<n>-<pestaña>.md` genera `artifact/project/Fundamentos-<orden>-<nombre>.md`, una sección del artefacto por fundamento. En el sitio, cada uno suma una pestaña **Tokens** con las tablas en vivo.

### Avance

Carbon: 44 componentes × 4 pestañas, 23 páginas de elementos, 18 patrones, 11 de visualización de datos y 8 de guías.

#### Componentes

| Carbon | ALMA | Estado |
|---|---|---|
| Button | `Button` | **Completo (4 pestañas, formato de la referencia)** |
| Accordion | `Accordion` | **Completo (4 pestañas, formato de la referencia)** |
| Breadcrumb | `Breadcrumb` | **Completo (4 pestañas, formato de la referencia)** |
| Checkbox | `Checkbox` | **Completo (4 pestañas, formato de la referencia)** |
| Combo box · Multiselect | `Combobox` | **Completo (4 pestañas, formato de la referencia)** |
| Contained list | `List` | **Completo (4 pestañas, formato de la referencia)** |
| Content switcher | `SegmentedControl` | **Completo (4 pestañas, formato de la referencia)** |
| Data table | `Table` | **Completo (4 pestañas, formato de la referencia)** |
| Date picker | `DatePicker`, `TimePicker` | **Completo (4 pestañas, formato de la referencia)** |
| Dropdown · Select | `PopUpButton` | **Completo (4 pestañas, formato de la referencia)** |
| File uploader | `FileUploader` | **Completo (4 pestañas, formato de la referencia)** |
| Inline loading · Loading | `ActivityIndicator`, `Skeleton`, `ProgressLine` | **Completo (4 pestañas, formato de la referencia)** |
| Link | `Link` | **Completo (4 pestañas, formato de la referencia)** |
| Menu · Menu buttons · Overflow menu | `PullDownButton` | **Completo (4 pestañas, formato de la referencia)** |
| Modal | `Modal`, `Sheet`, `Alert` | **Completo (4 pestañas, formato de la referencia)** |
| Notification | `InlineNotification`, `ToastRegion` | **Completo (4 pestañas, formato de la referencia)** |
| Number input | `Stepper` | **Completo (4 pestañas, formato de la referencia)** |
| Pagination | `Pagination` | **Completo (4 pestañas, formato de la referencia)** |
| Popover · Toggletip | `Popover` | **Completo (4 pestañas, formato de la referencia)** |
| Progress bar | `ProgressBar` | **Completo (4 pestañas, formato de la referencia)** |
| Progress indicator | `ProgressIndicator` | **Completo (4 pestañas, formato de la referencia)** |
| Radio button | `RadioGroup` | **Completo (4 pestañas, formato de la referencia)** |
| Search | `SearchField` | **Completo (4 pestañas, formato de la referencia)** |
| Slider | `Slider` | **Completo (4 pestañas, formato de la referencia)** |
| Tabs | `Tabs` | **Completo (4 pestañas, formato de la referencia)** |
| Tag | `Tag` | **Completo (4 pestañas, formato de la referencia)** |
| Text input | `TextInput`, `Textarea` | **Completo (4 pestañas, formato de la referencia)** |
| Tile | `Card` | **Completo (4 pestañas, formato de la referencia)** |
| Toggle | `Switch` | **Completo (4 pestañas, formato de la referencia)** |
| Tooltip | `Tooltip`, `Tip` | **Completo (4 pestañas, formato de la referencia)** |
| UI shell (header, paneles) | `Toolbar`, `Sidebar`, `TabBar` | **Completo (4 pestañas, formato de la referencia)** |
| Code snippet | — | Falta en ALMA |
| Structured list | — | Falta en ALMA |
| Tree view | — | Falta en ALMA |
| AI label | — | Falta en ALMA |
| List (listas de texto) | — | Falta en ALMA |
| Form | — | Falta (patrón) |
| — | `ProductCard`, `PaymentCard`, `PageControl`, `EmptyState`, `Icon` | Propios de ALMA. **Completo (4 pestañas, formato de la referencia)** |

#### Elementos, patrones y guías

| Carbon | Páginas | ALMA hoy |
|---|---|---|
| Color (resumen, uso, tokens, código) | 4 | **Completo**: Resumen, Uso, Código y Tokens |
| Tipografía (resumen, estrategias, conjuntos, código) | 4 | **Completo**: Resumen, Estilos, Código y Tokens |
| Espaciado · 2x Grid | 5 | **Completo**: Resumen, Grilla, Densidad y capas, Código y Tokens |
| Movimiento (resumen, coreografía, código) | 4 | **Completo**: Resumen, Coreografía, Código y Tokens |
| Íconos · Pictogramas | 4 | Íconos **completo** (Resumen, Uso, Código y Tokens); pictogramas: falta |
| Temas | 2 | **Completo**: Resumen, Código y Tokens |
| Patrones (18: acciones comunes, diálogos, estados desactivados y de solo lectura, divulgación, estados vacíos, filtros, formularios, encabezado global, carga, inicio de sesión, notificaciones, contenido que desborda, búsqueda, indicadores de estado, barra de texto, estilos fluidos) | 18 | **Completo:** 15 páginas cubren los 18 (desactivado y solo lectura van juntos, igual que búsqueda y filtros). |
| Visualización de datos | 11 | Solo la paleta de gráficos |
| Accesibilidad (resumen, color, teclado, desarrollo) | 4 | **Completo**: Resumen, Color, Teclado, Desarrollo |
| Contenido (resumen, estilo, etiquetas de acción) | 3 | **Completo**: Voz y tono, Estilo de escritura, Etiquetas de acción, Formatos |
