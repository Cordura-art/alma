# Pendientes

Todo lo que falta crear en ALMA. Las imágenes y las pruebas con lectores de pantalla se listan solas desde los documentos del repositorio; esta página se actualiza en cada cambio. En el sitio, cada imagen pendiente se marca en magenta dentro de su página.

**En resumen:** 131 imágenes por crear y 45 componentes por probar con lectores de pantalla.

## Imágenes por crear (131)

### Fundamentos

**[Color](#color)**

- Resumen: la misma pantalla de compra en los cuatro temas, lado a lado.
- Resumen: diagrama de las tres capas: `lime-400` → `interactive-01` → `button-filled-bg`.
- Resumen: las cuatro capas anidadas en tema claro, de la página `ui-02` a los botones `interactive-01` e `interactive-02` sobre `ui-04`.
- Uso: una pantalla con la página, una tarjeta y un menú abierto, con sus tokens rotulados.
- Uso: un gráfico de barras con 4 series y su leyenda rotulada, en tema oscuro y claro.

**[Espaciado y grilla](#espaciado)**

- Resumen: una tarjeta de viaje con las medidas de espacio rotuladas.
- Grilla: las columnas de la grilla sobre una pantalla en `bp-sm`, `bp-md` y `bp-lg`.
- Densidad y capas: la misma tabla en densidad normal y compacta.

**[Íconos](#iconos)**

- Resumen: una muestra de 24 íconos frecuentes (flechas, cerrar, buscar, información, advertencia, bus, billetera, usuario) en la grilla de 32 px.

**[Movimiento](#movimiento)**

- Resumen: las seis curvas dibujadas, productivas y expresivas.
- Coreografía: línea de tiempo de la entrada de una pantalla de resultados, con los cinco grupos.

**[Temas](#temas)**

- Resumen: la misma tarjeta de viaje en los cuatro temas.

**[Tipografía](#tipografia)**

- Resumen: el alfabeto de Roboto Flex a ancho 100 y al ancho de ALMA (`font-width`), con la diferencia marcada.
- Estilos: una página tipo con `web-h1`, `web-h4`, `web-body-m` y `web-label-s`, con sus nombres rotulados.

### Patrones

**[Formularios](#formularios)**

- formulario de datos del pasajero en una columna, con dos grupos y el botón al final.
- un campo en reposo, con ayuda, con error y corregido.

**[Encabezado y navegación global](#encabezado-global)**

- la misma app en el teléfono (Toolbar arriba, TabBar abajo) y en escritorio (Toolbar arriba, Sidebar a la izquierda).

**[Inicio de sesión](#inicio-de-sesion)**

- la pantalla de ingreso en el teléfono, en tema oscuro.

**[Indicadores de estado](#indicadores-de-estado)**

- los cuatro íconos de estado con su palabra, en tema oscuro y claro.

**[Barra de texto](#barra-de-texto)**

- un campo de nota con la barra de formato arriba.

**[Campos fluidos](#estilos-fluidos)**

- un campo vacío, enfocado y con texto, con la etiqueta en cada posición.

**[Divulgación progresiva](#divulgacion)**

- una pantalla de pasaje con el resumen a la vista y las condiciones en un Accordion.

**[Estados vacíos](#estados-vacios)**

- los cuatro casos de abajo, uno junto al otro.

**[Notificaciones](#notificaciones)**

- la escala de peso, del error de campo a la alerta, con un ejemplo de cada uno.

**[Carga](#carga)**

- una lista de viajes cargando con `Skeleton` y luego con los datos.

**[Búsqueda y filtros](#busqueda-y-filtros)**

- búsqueda con sugerencias abiertas y el alcance debajo.

**[Diálogos y capas](#dialogos)**

- las cuatro capas sobre la misma pantalla.

**[Acciones](#acciones)**

- una vista con una acción `filled`, dos `gray` y un menú «Más».

**[Desactivado y solo lectura](#desactivado-y-solo-lectura)**

- un botón desactivado con su explicación al lado.

**[Contenido que desborda](#contenido-que-desborda)**

- una celda recortada en el medio con su texto completo al pasar el cursor.

### Componentes

**[Accordion](#accordion)**

- Estilo: anatomía acotada.
- Uso: preguntas frecuentes con una sección abierta.

**[ActivityIndicator](#activityindicator)**

- Uso: el indicador a 20, 24 y 40 px, en tema oscuro y claro.

**[Alert](#alert)**

- Estilo: anatomía acotada, en fila y apilada.
- Uso: anatomía numerada de una alerta con dos botones y de otra con tres botones apilados.
- Uso: el orden de los botones en fila y apilados.

**[Breadcrumb](#breadcrumb)**

- Estilo: anatomía acotada.
- Uso: una ruta de 3 niveles y otra de 6 con el menú «…» abierto.

**[Button](#button)**

- Estilo: los siete estilos y los cinco destructivos, en reposo, puntero encima, presionado, foco y desactivado, en tema oscuro y claro.
- Estilo: anatomía acotada de los tres tamaños, con etiqueta sola, ícono antes, ícono después y solo ícono.
- Uso: anatomía numerada de un botón con etiqueta e ícono, de un `plain` y de un botón solo ícono.
- Uso: los tres tamaños lado a lado, con su alto y su contexto de uso (formulario, pantalla móvil, portada).
- Uso: una vista con una sola acción `filled` y dos de menor énfasis, frente a una vista con tres `filled` (incorrecto).
- Uso: alineación en diálogo, formulario, flujo por pasos, tarjeta, barra de herramientas y teléfono.
- Uso: combinaciones recomendadas y combinaciones a evitar.
- Uso: los seis estados de un botón `filled`, en tema oscuro y claro.

**[Card](#card)**

- Estilo: anatomía acotada.
- Uso: una tarjeta de viaje con imagen, título, subtítulo y una acción.

**[Checkbox](#checkbox)**

- Estilo: anatomía acotada con las medidas.
- Uso: anatomía numerada de una casilla sola y de un grupo con padre e hijas.
- Uso: los cinco estados en tema oscuro y claro.

**[Combobox](#combobox)**

- Estilo: anatomía acotada del campo múltiple con la lista abierta.
- Uso: anatomía numerada del modo simple con la lista abierta y del modo múltiple con tres etiquetas.
- Uso: los estados de la lista (abierta, filtrada, opción activa, sin resultados) en tema oscuro y claro.

**[DatePicker](#datepicker)**

- Estilo: anatomía acotada del calendario.
- Uso: el campo con el calendario abierto, con hoy marcado, un día elegido y días fuera de rango tachados.

**[EmptyState](#emptystate)**

- Estilo: anatomía acotada.
- Uso: «Aún no tienes viajes» con su acción «Buscar pasajes».

**[FileUploader](#fileuploader)**

- Estilo: anatomía acotada.
- Uso: la zona, y una lista con un archivo subiendo, uno subido y uno con error.

**[Icon](#icon)**

- Uso: el mismo ícono en contorno y relleno, en los cuatro tamaños.

**[InlineNotification](#inlinenotification)**

- Estilo: anatomía acotada con acción y botón Cerrar.
- Uso: los cuatro estados en línea, con y sin acción, en tema oscuro y claro.

**[Link](#link)**

- Uso: los cuatro tipos, en reposo, con cursor encima, visitado y con foco.

**[List](#list)**

- Estilo: anatomía acotada con ícono.
- Uso: dos grupos: uno de navegación con íconos y un resumen de precios.

**[Modal](#modal)**

- Estilo: anatomía acotada del modal `md`.
- Uso: anatomía numerada de un modal transaccional con un campo, en tema oscuro.
- Uso: los tres tamaños sobre la misma página, con sus medidas.
- Uso: secuencia abrir → escribir → guardar, con la ruta del foco marcada.

**[PageControl](#pagecontrol)**

- Estilo: anatomía acotada.
- Uso: 5 puntos con el tercero como página actual.

**[Pagination](#pagination)**

- Estilo: anatomía acotada.
- Uso: anatomía numerada, pegada bajo una tabla.

**[PaymentCard](#paymentcard)**

- Estilo: anatomía acotada.
- Uso: la tarjeta en los cuatro estados sobre `brand-ink`.

**[PopUpButton](#popupbutton)**

- Estilo: anatomía acotada del botón y del menú abierto.
- Uso: anatomía numerada con el menú abierto y la nota al pie.
- Uso: reposo, abierto con opción elegida, puntero sobre una opción y desactivado, en tema oscuro y claro.

**[Popover](#popover)**

- Estilo: anatomía acotada.
- Uso: un popover abierto bajo un botón de información, en tema oscuro y claro.

**[ProductCard](#productcard)**

- Estilo: anatomía acotada.
- Uso: la tarjeta cerrada y abierta, en el tono rojo.

**[ProgressBar](#progressbar)**

- Estilo: anatomía acotada.
- Uso: una barra determinada al 60%, una indeterminada y una con error.

**[ProgressIndicator](#progressindicator)**

- Estilo: anatomía acotada.
- Uso: la compra de un pasaje en 4 pasos, en horizontal y en vertical.

**[ProgressLine](#progressline)**

- Uso: la pantalla de pago velada, con la línea cargando y luego en verde.

**[PullDownButton](#pulldownbutton)**

- Estilo: anatomía acotada.
- Uso: el menú de una tarjeta de pago con «Copiar número», «Congelar tarjeta» y «Eliminar tarjeta».

**[RadioGroup](#radiogroup)**

- Uso: anatomía numerada de un grupo de 3 opciones con ayuda.
- Uso: los estados en tema oscuro y claro.

**[SearchField](#searchfield)**

- Estilo: anatomía acotada.
- Uso: anatomía numerada con dos tokens, sugerencias abiertas y el alcance.

**[SegmentedControl](#segmentedcontrol)**

- Estilo: anatomía acotada.
- Uso: la píldora de pasajes con la opción «Ida» elegida, en tema oscuro y claro.

**[Sheet](#sheet)**

- Estilo: anatomía acotada en el teléfono.
- Uso: la misma hoja en el teléfono (abajo) y en tablet (centrada), lado a lado.

**[Sidebar](#sidebar)**

- Estilo: anatomía acotada.
- Uso: anatomía numerada con tres grupos, uno plegado.

**[Skeleton](#skeleton)**

- Uso: una lista de viajes con Skeleton y la misma lista cargada.

**[Slider](#slider)**

- Estilo: anatomía acotada.
- Uso: un slider de precio máximo con su campo, en tema oscuro y claro.

**[Stepper](#stepper)**

- Estilo: anatomía acotada.
- Uso: el contador de pasajeros con el ícono `ticket`, en 1 (restar desactivado) y en 3.

**[Switch](#switch)**

- Estilo: anatomía acotada con las medidas.
- Uso: anatomía numerada de una fila con descripción, encendida y apagada.
- Uso: encendido, apagado, foco y desactivado en tema oscuro y claro.

**[TabBar](#tabbar)**

- Estilo: anatomía acotada en el teléfono.
- Uso: anatomía numerada con cuatro ítems y una insignia, en el teléfono y en tablet.

**[Table](#table)**

- Estilo: anatomía acotada.
- Uso: anatomía numerada con selección, orden y paginación.

**[Tabs](#tabs)**

- Estilo: anatomía acotada.
- Uso: anatomía numerada con tres pestañas, una activa.

**[Tag](#tag)**

- Estilo: anatomía acotada de los tres tipos.
- Uso: los tres tipos, y la paleta de 11 colores.

**[TextInput](#textinput)**

- Estilo: el campo en reposo, foco, con texto, error y desactivado, en los cuatro temas.
- Estilo: anatomía acotada con las medidas de esta tabla.
- Uso: anatomía numerada de un campo vacío, uno con texto y la etiqueta flotante, y uno de contraseña con ayuda y contador.
- Uso: un campo con ayuda, el mismo con error y mensaje, y un campo con contador cerca del límite.
- Uso: los seis estados en tema oscuro y claro.

**[Textarea](#textarea)**

- Uso: anatomía numerada de un campo vacío con texto de ejemplo y uno con texto, ayuda y contador.
- Uso: los estados en tema oscuro y claro.

**[TimePicker](#timepicker)**

- Uso: el campo con una hora válida y con error.

**[Tip](#tip)**

- Estilo: anatomía acotada.
- Uso: un consejo sobre la recarga automática, junto a la billetera.

**[ToastRegion](#toastregion)**

- Uso: dos toasts apilados arriba a la derecha sobre una pantalla de la app.

**[Toolbar](#toolbar)**

- Estilo: anatomía acotada.
- Uso: anatomía numerada en escritorio y en el teléfono, con el buscador en su propia fila.

**[Tooltip](#tooltip)**

- Estilo: anatomía acotada.
- Uso: un botón de ícono con su tooltip arriba y otro abajo.

## Pruebas con lectores de pantalla (45)

axe ya pasa en todos. Falta escuchar cada componente con un lector de pantalla real.

| Componente | Falta |
|---|---|
| [Accordion](#accordion) | VoiceOver y NVDA |
| [ActivityIndicator](#activityindicator) | VoiceOver y NVDA |
| [Alert](#alert) | VoiceOver y NVDA |
| [Breadcrumb](#breadcrumb) | VoiceOver y NVDA |
| [Button](#button) | VoiceOver y NVDA |
| [Card](#card) | VoiceOver y NVDA |
| [Checkbox](#checkbox) | VoiceOver y NVDA |
| [Combobox](#combobox) | VoiceOver y NVDA |
| [DatePicker](#datepicker) | VoiceOver y NVDA |
| [EmptyState](#emptystate) | VoiceOver y NVDA |
| [FileUploader](#fileuploader) | VoiceOver y NVDA |
| [InlineNotification](#inlinenotification) | VoiceOver y NVDA |
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
