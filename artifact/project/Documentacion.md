# Documentación

## Novedades

Lo último que cambió en ALMA, de lo más reciente a lo más antiguo. El detalle de cada cambio está en el historial del repositorio.

### 30 de septiembre de 2026

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

### Avance

Carbon: 44 componentes × 4 pestañas, 23 páginas de elementos, 18 patrones, 11 de visualización de datos y 8 de guías.

#### Componentes

| Carbon | ALMA | Estado |
|---|---|---|
| Button | `Button` | **Completo (4 pestañas, formato de la referencia)** |
| Accordion | `Accordion` | Guía breve |
| Breadcrumb | `Breadcrumb` | Guía breve |
| Checkbox | `Checkbox` | **Completo (4 pestañas, formato de la referencia)** |
| Combo box · Multiselect | `Combobox` | **Completo (4 pestañas, formato de la referencia)** |
| Contained list | `List` | Guía breve |
| Content switcher | `SegmentedControl` | Guía breve |
| Data table | `Table` | Guía breve |
| Date picker | `DatePicker`, `TimePicker` | Guía breve |
| Dropdown · Select | `PopUpButton` | **Completo (4 pestañas, formato de la referencia)** |
| File uploader | `FileUploader` | Guía breve |
| Inline loading · Loading | `ActivityIndicator`, `Skeleton`, `ProgressLine` | Guía breve |
| Link | `Link` | Guía breve |
| Menu · Menu buttons · Overflow menu | `PullDownButton` | Guía breve |
| Modal | `Modal`, `Sheet`, `Alert` | Guía breve |
| Notification | `InlineNotification`, `ToastRegion` | Guía breve |
| Number input | `Stepper` | Guía breve |
| Pagination | `Pagination` | Guía breve |
| Popover · Toggletip | `Popover` | Guía breve |
| Progress bar | `ProgressBar` | Guía breve |
| Progress indicator | `ProgressIndicator` | Guía breve |
| Radio button | `RadioGroup` | **Completo (4 pestañas, formato de la referencia)** |
| Search | `SearchField` | Guía breve |
| Slider | `Slider` | Guía breve |
| Tabs | `Tabs` | Guía breve |
| Tag | `Tag` | Guía breve |
| Text input | `TextInput`, `Textarea` | **Completo (4 pestañas, formato de la referencia)** |
| Tile | `Card` | Guía breve |
| Toggle | `Switch` | **Completo (4 pestañas, formato de la referencia)** |
| Tooltip | `Tooltip`, `Tip` | Guía breve |
| UI shell (header, paneles) | `Toolbar`, `Sidebar`, `TabBar` | Guía breve |
| Code snippet | — | Falta en ALMA |
| Structured list | — | Falta en ALMA |
| Tree view | — | Falta en ALMA |
| AI label | — | Falta en ALMA |
| List (listas de texto) | — | Falta en ALMA |
| Form | — | Falta (patrón) |
| — | `ProductCard`, `PaymentCard`, `PageControl`, `EmptyState`, `Icon` | Propios de ALMA |

#### Elementos, patrones y guías

| Carbon | Páginas | ALMA hoy |
|---|---|---|
| Color (resumen, uso, tokens, código) | 4 | Sección en la guía general |
| Tipografía (resumen, estrategias, conjuntos, código) | 4 | Sección en la guía general |
| Espaciado · 2x Grid | 5 | Sección en la guía general |
| Movimiento (resumen, coreografía, código) | 4 | Sección en la guía general |
| Íconos · Pictogramas | 4 | Íconos: sección; pictogramas: falta |
| Temas | 2 | Sección en la guía general |
| Patrones (18: acciones comunes, diálogos, estados desactivados y de solo lectura, divulgación, estados vacíos, filtros, formularios, encabezado global, carga, inicio de sesión, notificaciones, contenido que desborda, búsqueda, indicadores de estado, barra de texto, estilos fluidos) | 18 | Estados vacíos y notificaciones en la guía de contenido; el resto falta |
| Visualización de datos | 11 | Solo la paleta de gráficos |
| Accesibilidad (resumen, color, teclado, desarrollo) | 4 | Reglas en la guía general |
| Contenido (resumen, estilo, etiquetas de acción) | 3 | Guía de contenido |
