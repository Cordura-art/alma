# Documentación de ALMA

La documentación toma como base la estructura y los temas de IBM Carbon (carbondesignsystem.com), con el contenido escrito para ALMA: sus tokens, sus componentes, las guías de Apple que sigue y el español de Chile. No es una traducción de Carbon: Carbon marca **qué** hay que documentar; ALMA dice **cómo** lo resuelve.

## Cómo se organiza

Cada componente tiene cuatro pestañas, como en Carbon:

| Pestaña | Archivo | Qué responde |
|---|---|---|
| Uso | `usage.md` | Cuándo usarlo y cuándo no, variantes, anatomía, tamaños, jerarquía, alineación, contenido, comportamiento, modificadores. |
| Estilo | `style.md` | Color por estado con sus tokens, tipografía, medidas, foco, movimiento, contraste por tema. |
| Código | `code.md` | Propiedades, ejemplos, HTML y CSS, cómo ajustar con tokens, Flutter. |
| Accesibilidad | `accessibility.md` | Qué resuelve ALMA, teclado, recomendaciones de diseño, etiquetado, desarrollo, verificación. |

`npm run build` arma con las cuatro la guía del componente en el artefacto (`artifact/project/components/<Nombre>/README.md`). Esa guía no se edita a mano: se edita aquí.

## Avance

Carbon: 44 componentes × 4 pestañas, 23 páginas de elementos, 18 patrones, 11 de visualización de datos y 8 de guías.

### Componentes

| Carbon | ALMA | Estado |
|---|---|---|
| Button | `Button` | **Completo (4 pestañas)** |
| Accordion | `Accordion` | Guía breve |
| Breadcrumb | `Breadcrumb` | Guía breve |
| Checkbox | `Checkbox` | Guía breve |
| Contained list | `List` | Guía breve |
| Content switcher | `SegmentedControl` | Guía breve |
| Data table | `Table` | Guía breve |
| Date picker | `DatePicker`, `TimePicker` | Guía breve |
| Dropdown · Select | `PopUpButton` | Guía breve |
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
| Radio button | `RadioGroup` | Guía breve |
| Search | `SearchField` | Guía breve |
| Slider | `Slider` | Guía breve |
| Tabs | `Tabs` | Guía breve |
| Tag | `Tag` | Guía breve |
| Text input | `TextInput`, `Textarea` | Guía breve |
| Tile | `Card` | Guía breve |
| Toggle | `Switch` | Guía breve |
| Tooltip | `Tooltip`, `Tip` | Guía breve |
| UI shell (header, paneles) | `Toolbar`, `Sidebar`, `TabBar` | Guía breve |
| Code snippet | — | Falta en ALMA |
| Structured list | — | Falta en ALMA |
| Tree view | — | Falta en ALMA |
| AI label | — | Falta en ALMA |
| List (listas de texto) | — | Falta en ALMA |
| Form | — | Falta (patrón) |
| — | `ProductCard`, `PaymentCard`, `PageControl`, `EmptyState`, `Icon` | Propios de ALMA |

### Elementos, patrones y guías

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
