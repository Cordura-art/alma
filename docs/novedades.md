# Novedades

Lo último que cambió en ALMA, de lo más reciente a lo más antiguo. El detalle de cada cambio está en el historial del repositorio.

## 30 de septiembre de 2026

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
