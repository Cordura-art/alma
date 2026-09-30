# Novedades

Lo último que cambió en ALMA, de lo más reciente a lo más antiguo. El detalle de cada cambio está en el historial del repositorio.

## 30 de septiembre de 2026

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

## 29 de septiembre de 2026

- **Roles del theme de origen.** La página va en `ui-02` y los contenedores en `ui-01`.
- **Botón tertiary**, nuevo.
- **Destructive tinted** tiene sus propios tokens de hover y presionado; ya no toma el lima.
- **Íconos de IBM Carbon** como SVG dentro de la página, en lugar de las fuentes de Material Symbols (12,6 MB menos por página).
- **Pesos tipográficos** iguales en tema oscuro y claro: display 600, títulos 500, cuerpo 400.
