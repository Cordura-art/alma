# Pendientes

Todo lo que falta crear en ALMA. Las imágenes y las pruebas con lectores de pantalla se listan solas desde los documentos del repositorio; esta página se actualiza en cada cambio. En el sitio, cada imagen pendiente se marca en magenta dentro de su página.

**En resumen:** 9 imágenes por crear y 47 componentes por probar con lectores de pantalla.

## Imágenes por crear (9)

### Fundamentos

**[Diseño adaptable](#adaptable)**

- Resumen: la misma pantalla de viajes en los tres anchos: un panel con `TabBar`; lista y detalle lado a lado; y `Sidebar`, lista y detalle.

**[Gráficos de datos](#datos)**

- Anatomía: un gráfico de líneas con sus ocho partes numeradas: título con la conclusión, bajada con unidad y fuente, dos series rotuladas al final de su línea, eje con cuatro marcas, líneas de guía y el detalle abierto sobre un punto.

### Patrones

**[Bienvenida](#bienvenida)**

- las tres pantallas de un recorrido en un teléfono, con su figura, título, frase, `PageControl`, «Continuar» y «Saltar»; la última con «Buscar pasajes».

**[Ajustes](#ajustes)**

- una página de Ajustes en escritorio, con `Sidebar` de grupos y filas con `Switch`, `PopUpButton` y valores; y la misma en teléfono, como lista de grupos.

**[Arrastrar y soltar](#arrastrar-y-soltar)**

- una lista de cuatro filas con asa, en tres momentos: en reposo, una fila tomada con su lugar marcado y la línea de destino, y la lista ya reordenada.

**[Deshacer](#deshacer)**

- una lista de viajes donde se acaba de archivar uno, con el aviso «Viaje archivado» y su acción «Deshacer», en tema oscuro y claro.

**[Compartir](#compartir)**

- el diálogo de compartir en escritorio, con el campo de invitar, tres personas con sus permisos y la sección de enlace con «Copiar enlace».

### Componentes

**[BarChart](#barchart)**

- Uso: un `BarChart` vertical con sus seis partes numeradas, una barra en el color del acento y las demás neutras, y el detalle abierto sobre una barra.

**[LineChart](#linechart)**

- Uso: un `LineChart` con tres series, una en el color del acento y dos neutras, cada una rotulada al final, la guía vertical sobre marzo y el detalle abierto.

## Pruebas con lectores de pantalla (47)

axe ya pasa en todos. Falta escuchar cada componente con un lector de pantalla real.

| Componente | Falta |
|---|---|
| [Accordion](#accordion) | VoiceOver y NVDA |
| [ActivityIndicator](#activityindicator) | VoiceOver y NVDA |
| [Alert](#alert) | VoiceOver y NVDA |
| [BarChart](#barchart) | VoiceOver y NVDA |
| [Breadcrumb](#breadcrumb) | VoiceOver y NVDA |
| [Button](#button) | VoiceOver y NVDA |
| [Card](#card) | VoiceOver y NVDA |
| [Checkbox](#checkbox) | VoiceOver y NVDA |
| [Combobox](#combobox) | VoiceOver y NVDA |
| [DatePicker](#datepicker) | VoiceOver y NVDA |
| [EmptyState](#emptystate) | VoiceOver y NVDA |
| [FileUploader](#fileuploader) | VoiceOver y NVDA |
| [InlineNotification](#inlinenotification) | VoiceOver y NVDA |
| [LineChart](#linechart) | VoiceOver y NVDA |
| [Link](#link) | VoiceOver y NVDA |
| [List](#list) | VoiceOver y NVDA |
| [Modal](#modal) | VoiceOver y NVDA |
| [PageControl](#pagecontrol) | VoiceOver y NVDA |
| [Pagination](#pagination) | VoiceOver y NVDA |
| [PaymentCard](#paymentcard) | VoiceOver y NVDA |
| [PopUpButton](#popupbutton) | VoiceOver y NVDA |
| [Popover](#popover) | VoiceOver y NVDA |
| [ProductCard](#productcard) | VoiceOver y NVDA |
| [ProgressBar](#progressbar) | VoiceOver y NVDA |
| [ProgressIndicator](#progressindicator) | VoiceOver y NVDA |
| [ProgressLine](#progressline) | VoiceOver y NVDA |
| [PullDownButton](#pulldownbutton) | VoiceOver y NVDA |
| [RadioGroup](#radiogroup) | VoiceOver y NVDA |
| [SearchField](#searchfield) | VoiceOver y NVDA |
| [SegmentedControl](#segmentedcontrol) | VoiceOver y NVDA |
| [Sheet](#sheet) | VoiceOver en iPhone y TalkBack |
| [Sidebar](#sidebar) | VoiceOver y NVDA |
| [Skeleton](#skeleton) | VoiceOver y NVDA |
| [Slider](#slider) | VoiceOver y NVDA |
| [Stepper](#stepper) | VoiceOver y NVDA |
| [Switch](#switch) | VoiceOver y NVDA |
| [TabBar](#tabbar) | VoiceOver en iPhone y TalkBack |
| [Table](#table) | VoiceOver y NVDA |
| [Tabs](#tabs) | VoiceOver y NVDA |
| [Tag](#tag) | VoiceOver y NVDA |
| [TextInput](#textinput) | VoiceOver y NVDA |
| [Textarea](#textarea) | VoiceOver y NVDA |
| [TimePicker](#timepicker) | VoiceOver y NVDA |
| [Tip](#tip) | VoiceOver y NVDA |
| [ToastRegion](#toastregion) | VoiceOver y NVDA, en especial el anuncio de toasts seguidos |
| [Toolbar](#toolbar) | VoiceOver y NVDA |
| [Tooltip](#tooltip) | VoiceOver y NVDA |

## Otros pendientes

| Qué | Dónde | Estado |
|---|---|---|
| Valores fijos del vidrio de `PaymentCard` como tokens (opacidad, borde de 0,5 px, radio de 14,4 px, chip) | Guía de `PaymentCard`, pestaña Estilo | En pausa hasta que se decida |
| Paquete de React con Storybook | Fase 2 | Por empezar |
| Sitio de marca en línea (Astro en Vercel): punto de vista, principios, galería, logo, pictogramas e ilustración | Fase 3 | Por empezar |
| Paquete de Flutter con Widgetbook | Fase 4 | Por empezar; los tokens de Dart ya se generan |
| Sistema nuevo en Figma, hecho desde ALMA | Después de las fases | Por empezar |
| Sistema generativo para las imágenes (patrones y texturas procedurales) | Imágenes pendientes | Por empezar |
