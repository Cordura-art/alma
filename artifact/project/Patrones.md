# Patrones

Soluciones repetibles para problemas comunes, hechas con los componentes de ALMA.

## Formularios

Cómo pedir datos: estructura, campos, validación y envío.

### Cuándo

Siempre que la persona tenga que darnos datos: crear una cuenta, pagar, comprar un pasaje.

### Estructura

- **Pide lo mínimo.** Cada campo que sobra es una razón para abandonar.
- **Una columna.** Los campos uno debajo del otro, en el orden en que la persona los piensa. Solo van en fila los que forman un dato (día y hora de un viaje).
- **Agrupa** los campos relacionados bajo un título breve (`web-h6`), con `space-24` entre grupos y `space-16` entre campos.
- **Formularios largos:** pártelos en pasos con `ProgressIndicator`, uno por tema. Nunca más de 5 pasos.
- El ancho del campo sugiere el largo del dato: un código postal no ocupa todo el ancho.

> **Imagen pendiente:** formulario de datos del pasajero en una columna, con dos grupos y el botón al final.

### Elegir el control

| El dato es | Usa |
|---|---|
| Texto corto | `TextInput` (con `type` e `inputMode` del dato: `email`, `tel`, `numeric`) |
| Texto largo | `Textarea` |
| Una opción de 2 o 3, visibles | `SegmentedControl` |
| Una opción de 3 a 5, con descripción | `RadioGroup` |
| Una opción de muchas | `PopUpButton` (hasta ~7) o `Combobox` (para buscar) |
| Varias opciones | `Checkbox` o `Combobox` múltiple |
| Sí o no, que se envía con el formulario | `Checkbox` |
| Una cantidad pequeña | `Stepper` |
| Un valor en un rango | `Slider` con su campo |
| Una fecha o una hora | `DatePicker` o `TimePicker` |
| Un archivo | `FileUploader` |

`Switch` no va en formularios: aplica el cambio al instante.

### Etiquetas y ayudas

- Toda pregunta tiene etiqueta visible. El texto de ejemplo (*placeholder*) no reemplaza a la etiqueta.
- La ayuda dice la regla **antes** de que se rompa: «Mínimo 4 caracteres».
- Marca lo opcional, no lo obligatorio, cuando casi todo es obligatorio: «Teléfono (opcional)».

### Validación

| Momento | Qué hacer |
|---|---|
| Mientras escribe | Nada, salvo contadores de caracteres. No marques error a medio escribir. |
| Al salir del campo | Valida el formato y muestra el error en el campo. |
| Al enviar | Valida todo. Si hay errores, muestra una `InlineNotification` de error arriba del formulario con cuántos son, y lleva el foco al primer campo con error. |

- El error va bajo el campo, en `text-error` y con `field-border-error`: nunca solo color.
- Dice cómo arreglarlo: «Escribe un correo con @», no «Correo inválido».

> **Imagen pendiente:** un campo en reposo, con ayuda, con error y corregido.

### Envío

- Un solo botón principal, al final, con el verbo de lo que pasa: «Pagar $7.000», «Crear cuenta».
- Enter en un campo envía el formulario (el botón principal es `type: 'submit'`).
- Mientras envía, el botón muestra `loading` con su `loadingLabel` («Pagando») y no acepta otro clic.
- Si todo sale bien, lleva a la siguiente pantalla o confirma con un `toast` de éxito.
- No desactives el botón de enviar esperando que el formulario esté completo: deja enviar y explica qué falta.

### Relacionados

`TextInput` · `ProgressIndicator` · `InlineNotification` · Guía de contenido.

## Estados vacíos

Qué mostrar cuando no hay nada que mostrar.

### Cuándo

Cuando una vista no tiene contenido: la primera vez, una búsqueda sin resultados, sin permiso o sin conexión.

### Anatomía

Usa `EmptyState`:

1. **Ícono** (opcional), en `icon-02`, a `icon-size-xl`.
2. **Título:** qué falta. «Aún no tienes viajes».
3. **Mensaje:** por qué, o qué verás aquí.
4. **Acción principal:** el siguiente paso. «Buscar pasajes».
5. **Acción secundaria** (opcional).

> **Imagen pendiente:** los cuatro casos de abajo, uno junto al otro.

### Los casos

| Caso | Título | Mensaje | Acción |
|---|---|---|---|
| Primera vez | «Aún no tienes viajes» | «Aquí verás los pasajes que compres.» | «Buscar pasajes» |
| Sin resultados | «No encontramos viajes a Talca el 31 de marzo» | «Prueba con otra fecha o quita algún filtro.» | «Quitar filtros» |
| Sin permiso | «No tienes acceso a esta billetera» | «Pídele acceso a quien la administra.» | — |
| Sin conexión | «Sin conexión» | «Revisa tu conexión y vuelve a intentarlo.» | «Reintentar» |

### Reglas

- El estado vacío ocupa el lugar del contenido, no aparece encima.
- Sin ilustraciones decorativas que no sumen información; un ícono a lo sumo.
- No lo muestres mientras carga: eso es un estado de carga (ver **Carga**).
- En una tabla vacía, usa `emptyText` de `Table` con la misma lógica.

### Relacionados

`EmptyState` · `Table` · `SearchField` · Carga.

## Notificaciones

Cómo elegir el componente según el peso del mensaje.

### Elegir según el peso

| El mensaje | Usa | Se va |
|---|---|---|
| El error de un campo | El error de `TextInput` | Al corregirlo |
| Un resultado o un estado de una sección | `InlineNotification` | Al cerrarla o resolverla |
| Una guía antes de una tarea | `InlineNotification` `callout` | No se cierra |
| Un resultado pasajero que no pide nada | `toast` | Solo a los 5 s (éxito, información) |
| Algo que exige una decisión | `Alert` | Al responder |
| Un consejo sobre una función | `Tip` | Al descartarlo |

> **Imagen pendiente:** la escala de peso, del error de campo a la alerta, con un ejemplo de cada uno.

### Estados

| Estado | Úsalo para |
|---|---|
| Error | Algo falló y hay que corregirlo. |
| Advertencia | Algo puede fallar o tiene consecuencias. |
| Éxito | La acción terminó bien. |
| Información | Algo útil, sin urgencia. |

Cada estado lleva su ícono y su palabra; el color solo acompaña.

### Reglas

- **Cerca de donde ocurrió.** El resultado de guardar un formulario va arriba del formulario, no arriba de la página.
- **Una a la vez.** Si hay varios errores, agrúpalos en una notificación que diga cuántos son.
- **Lo que desaparece se puede recuperar.** Si un toast informa algo, eso también se ve en otra parte.
- **No interrumpas por lo que se puede deshacer.** Ofrece «Deshacer» en un toast en vez de preguntar antes.
- Mensajes con el orden «qué pasó» → «qué hacer»: «No pudimos cobrar tu pasaje. Revisa la tarjeta o usa otra.»

### Relacionados

`InlineNotification` · `ToastRegion` · `Alert` · `Tip` · Guía de contenido.

## Carga

Qué mostrar mientras algo tarda.

### Elegir según lo que se sabe

| Situación | Usa | Por qué |
|---|---|---|
| Se sabe cuánto falta (subir un archivo) | `ProgressBar` con valor | Muestra el avance real. |
| No se sabe cuánto falta, en una sección | `ProgressBar` sin valor o `ActivityIndicator` | Indica que sigue trabajando. |
| Llega una vista con estructura conocida (una lista, una tarjeta) | `Skeleton` | Muestra la forma antes que el contenido y evita saltos. |
| Una acción de un botón | `loading` del `Button` | La espera queda donde se hizo clic. |
| Una pantalla de marca que se prepara | `ProgressLine` | La línea lima que termina en verde. |

> **Imagen pendiente:** una lista de viajes cargando con `Skeleton` y luego con los datos.

### Tiempos

| La espera dura | Muestra |
|---|---|
| Menos de 1 segundo | Nada. Un indicador que parpadea distrae más que la espera. |
| De 1 a 10 segundos | Un indicador (`Skeleton`, `ActivityIndicator` o `loading`). |
| Más de 10 segundos | Una barra con avance, qué está pasando y, si se puede, cancelar. |

### Reglas

- **Determinada siempre que se pueda.** Una barra con valor tranquiliza más que un spinner.
- `Skeleton` solo para contenedores y datos; nunca para botones, notificaciones ni toasts.
- El indicador va donde aparecerá el contenido, no en el centro de la pantalla.
- Di qué se está haciendo: «Buscando viajes», no «Cargando».
- Si la carga falla, reemplaza el indicador por el error y una forma de reintentar.
- Marca la zona como ocupada para el lector: `loading` en `Table` (que pone `aria-busy`), `label` en `Skeleton` y `ActivityIndicator`.

### Relacionados

`ProgressBar` · `ActivityIndicator` · `Skeleton` · `ProgressLine` · `Button`.

## Búsqueda y filtros

Cómo ayudar a encontrar: buscar, acotar y ordenar.

### Buscar

Usa `SearchField`:

- **El texto de ejemplo dice qué se puede buscar:** «Buscar viajes, ciudades o terminales».
- **Busca mientras se escribe** (`onChange`), sin esperar Enter, si la respuesta es rápida.
- **Sugerencias** recientes o predictivas (hasta 8) mientras escribe.
- **Alcance** (`scopes`): si se puede buscar en distintas áreas, empieza por la más amplia.
- Los resultados muestran la palabra buscada y cuántos hay: «12 viajes a Talca».

> **Imagen pendiente:** búsqueda con sugerencias abiertas y el alcance debajo.

### Filtrar

| Cantidad de filtros | Usa |
|---|---|
| Pocos y frecuentes (2 a 6) | `Tag` seleccionables, en una fila sobre los resultados |
| Un criterio con 2 o 3 valores | `SegmentedControl` |
| Muchos filtros | Un panel (`Sheet` en el teléfono) con los controles de **Formularios** |

- Los filtros aplicados se ven como `tokens` en el `SearchField` o como `Tag` que se pueden quitar.
- Ofrece «Quitar filtros» cuando hay alguno.
- Aplica al instante con pocos filtros; en un panel con muchos, con un botón «Ver 12 resultados».

### Ordenar

- En tablas, con los encabezados ordenables de `Table`.
- En listas y tarjetas, con un `PopUpButton` «Ordenar por», con la opción más útil por defecto.

### Sin resultados

Usa el estado vacío de **Estados vacíos**: di qué se buscó y sugiere cómo ampliar la búsqueda.

### Relacionados

`SearchField` · `Tag` · `SegmentedControl` · `PopUpButton` · `Table` · `Sheet`.

## Diálogos y capas

Cómo elegir entre Modal, Sheet, Alert y Popover.

### Elegir la capa

| Necesitas | Usa | Bloquea la página |
|---|---|---|
| Una tarea breve con foco (editar un dato, confirmar un pago) | `Modal` | Sí |
| Opciones sobre lo que se ve, al alcance del pulgar | `Sheet` | Sí |
| Una advertencia que exige respuesta, con 2 o 3 opciones | `Alert` | Sí |
| Explicar algo o un par de controles, junto a un botón | `Popover` | No |
| Decir qué hace un control | `Tooltip` | No |
| Una tarea larga o con varios pasos | Una página | — |

> **Imagen pendiente:** las cuatro capas sobre la misma pantalla.

### Reglas

- **Una capa a la vez.** Un modal no abre otro modal. Si una tarea crece, llévala a una página.
- **La persona la abre.** No abras un diálogo sin que lo pida, salvo una alerta que no puede esperar.
- **Siempre hay salida:** «Cerrar», «Cancelar» o Esc. Quitarla es la excepción.
- **El foco entra y vuelve.** Al abrir entra al diálogo; al cerrar vuelve al botón que lo abrió (ALMA lo hace).
- **Confirma solo lo que no se deshace.** Para lo que se puede deshacer, actúa y ofrece «Deshacer».

### Confirmar una acción destructiva

1. `Alert` con el título como pregunta concreta: «¿Eliminar la tarjeta terminada en 4821?».
2. Botones «Cancelar» y el verbo del título: «Eliminar».
3. El botón destructivo en rojo solo si la persona no eligió esa acción deliberadamente.

### Relacionados

`Modal` · `Sheet` · `Alert` · `Popover` · `Tooltip`.

## Acciones

Cómo ordenar los botones: prominencia, cantidad y posición.

### Prominencia

| Estilo | Para |
|---|---|
| `filled` | La acción más probable. **1 o 2 por vista.** |
| `tinted` | Acciones importantes, pero no la principal. |
| `gray` | Acciones secundarias; «Cancelar». |
| `plain` | Acciones terciarias o en barras de herramientas. |
| `tertiary` | Contorno, del theme de origen de Cordura. |

El rol cambia el significado, no la prominencia: `destructive` pinta de rojo cualquier estilo.

> **Imagen pendiente:** una vista con una acción `filled`, dos `gray` y un menú «Más».

### Cantidad

- Muestra pocas acciones a la vista; el resto va en el menú «Más» (`moreActions` de `Toolbar` o un `PullDownButton`).
- La acción destructiva va al final del menú, separada.

### Posición

| Lugar | Orden |
|---|---|
| Pie de un diálogo | «Cancelar» a la izquierda, la acción a la derecha. |
| Final de un formulario | Alineados con los campos. Si hay «Cancelar», va a la izquierda de la acción principal, como en los diálogos. |
| Barra de herramientas | Las más usadas a la derecha, como íconos; el resto en «Más». |
| Fila de una lista o tarjeta | Una sola acción por fila. |

### Etiquetas

- Verbo primero, que diga lo que pasa: «Pagar $7.000», «Eliminar tarjeta».
- Nunca «Sí», «OK» o «Aceptar» si hay algo más preciso.
- Botones de solo ícono: con `aria-label` y, si ayuda, un `Tooltip`.

### Desactivar o no

Prefiere dejar el botón activo y explicar al pulsarlo qué falta. Un botón desactivado no dice por qué (ver **Desactivado y solo lectura**).

### Relacionados

`Button` · `PullDownButton` · `Toolbar` · Guía de contenido.

## Desactivado y solo lectura

Cuándo desactivar un control y cómo mostrar lo que no se puede editar.

### Desactivado

Un control desactivado se ve, pero no responde (al 45 % de opacidad en ALMA).

**Úsalo** cuando la acción existe pero hoy no se puede hacer, y es obvio por qué: «Página siguiente» en la última página.

**Evítalo** cuando la persona no entendería por qué:
- Un botón «Pagar» desactivado hasta completar el formulario: mejor dejarlo activo y marcar lo que falta al pulsarlo.
- Un ítem de `TabBar` o `Sidebar`: nunca se desactivan; si una sección está vacía, se explica dentro.

Si desactivas algo que no es obvio, di por qué cerca del control («Disponible desde el 1 de abril»).

> **Imagen pendiente:** un botón desactivado con su explicación al lado.

### Solo lectura

Un dato que la persona puede ver pero no cambiar (el RUT de la cuenta, el número de un pasaje).

- **Dentro de un formulario**, usa `TextInput` o `Textarea` con `readOnly`: borde punteado, texto con contraste normal, se puede enfocar y copiar, pero no cambiar. Así el dato queda alineado con los demás campos.
- **Fuera de un formulario**, muéstralo como texto: una fila informativa de `List` (título y `trailing`) o un par etiqueta y valor.
- Nunca uses un campo desactivado para esto: baja el contraste, no se puede copiar y parece un error.
- Si el dato se puede copiar, ofrece un botón «Copiar» junto a él.
- Si se puede cambiar en otro lugar, ofrece el camino: «Cambiar en Ajustes».

### Accesibilidad

- Un control desactivado no recibe foco: quien usa teclado o lector puede no saber que existe. Por eso, explicar en texto es más importante que desactivar.
- El texto de solo lectura cumple el contraste normal (4,5:1); el desactivado está exento, y por eso no sirve para mostrar datos.
- Un campo `readOnly` se anuncia como «solo lectura» y recibe foco; uno desactivado no.

### Relacionados

`Button` · `List` · `TextInput`.

## Contenido que desborda

Qué hacer cuando el texto o los datos no caben.

### Texto que no cabe

| Dónde | Qué hacer |
|---|---|
| Etiquetas de botones y pestañas | Acorta el texto; no las cortes con puntos suspensivos. |
| Destinos de `Sidebar` | Se cortan con puntos suspensivos; usa etiquetas cortas. |
| Celdas de `Table` | `maxChars` recorta en el medio (conserva principio y final); el texto completo aparece al pasar el cursor. |
| Títulos de página | Pasan a otra línea, equilibrados. Nunca se cortan. |
| Texto de lectura | Pasa a otra línea; ancho máximo de 48 rem. |

Truncar esconde información: úsalo solo donde el texto completo está a un paso (el detalle, el tooltip).

> **Imagen pendiente:** una celda recortada en el medio con su texto completo al pasar el cursor.

### Muchos elementos

| Situación | Qué hacer |
|---|---|
| Muchas pestañas | Más de 6: elige la vista con un `PopUpButton`. |
| Una ruta larga | `Breadcrumb` pliega los niveles del medio en «…». |
| Muchas acciones | Las frecuentes a la vista; el resto en «Más». |
| Muchas filas | `Pagination` debajo de la tabla. |
| Una tabla ancha | Se desplaza hacia el lado dentro de su contenedor; la página no. |

### Texto agrandado

El texto de ALMA crece con la preferencia de la persona (probado al 200 %). Diseña para eso:
- Deja que los contenedores crezcan en alto; no fijes altos con texto dentro.
- Evita anchos fijos en px para lo que tiene texto; usa `rem`.
- La página nunca se desplaza hacia el lado: solo las tablas y los bloques de código, dentro de su caja.

### Relacionados

`Table` · `Breadcrumb` · `Tabs` · `Pagination` · Tipografía.
