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

![Formulario de datos del pasajero en una columna: el grupo Pasajero (nombre y RUT) y el grupo Contacto (correo y teléfono opcional), con 16 px entre campos, 24 px entre grupos y el botón «Continuar al pago» al final.](assets/Patrones/formularios-estructura.png)

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

![El mismo campo de correo en cuatro momentos: en reposo, con su ayuda, con el error «Escribe un correo con @» en rojo y con ícono, y corregido.](assets/Patrones/formularios-validacion.png)

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

![Los cuatro estados vacíos lado a lado: primera vez («Aún no tienes viajes», con «Buscar pasajes»), sin resultados («No encontramos viajes a Talca el 31 de marzo», con «Quitar filtros»), sin permiso (sin acción) y sin conexión (con «Reintentar»).](assets/Patrones/estados-vacios-casos.png)

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

![La escala de peso de las notificaciones, de menos a más: el error de un campo, una InlineNotification, un callout, un Tip, un toast y una Alert que exige respuesta.](assets/Patrones/notificaciones-peso.png)

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
| Una pantalla de marca que se prepara | `ProgressLine` | La línea azul que termina en verde. |

![La vista Mis viajes mientras carga, con Skeleton en el lugar de cada tarjeta, y la misma vista con los datos.](assets/Patrones/carga-skeleton.png)

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

![Un SearchField con el texto de ejemplo «Buscar viajes, ciudades o terminales», en dos momentos: mientras se escribe «Ta», con las sugerencias recientes abiertas, y antes de escribir, con el alcance Todo, Viajes y Pagos debajo del campo.](assets/Patrones/busqueda-sugerencias.png)

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

![Las cuatro capas sobre la misma pantalla de Mis viajes: un Modal para cambiar el nombre del pasajero, un Sheet para compartir el viaje, una Alert que pregunta si anular el pasaje y un Popover que explica la tasa de embarque sin bloquear la página.](assets/Patrones/dialogos-capas.png)

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

![Una vista de pasaje con una acción filled «Pagar $7.000», dos gray «Cambiar asiento» y «Compartir», y el menú «Más» abierto con «Anular pasaje» al final, separada y en rojo.](assets/Patrones/acciones-prominencia.png)

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

![El botón «Cambiar fecha» desactivado y, junto a él, la explicación «Disponible desde el 1 de abril» con un ícono de información.](assets/Patrones/desactivado-explicacion.png)

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

![Una tabla de pasajes cuya columna Ruta recorta en el medio los nombres largos, conservando el principio y el final; al pasar el cursor por la celda se ve el texto completo.](assets/Patrones/desborda-celda.png)

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

## Encabezado y navegación global

La estructura fija de una app: barra superior y navegación principal.

### Cuándo

En toda app o sitio hecho con ALMA: es lo que queda fijo mientras cambia el contenido.

### Las piezas

| Pieza | Componente | Qué lleva |
|---|---|---|
| Barra superior | `Toolbar` con `sticky` | Título de la vista, Volver, buscador y 2 o 3 acciones; el resto en «Más». |
| Navegación principal (teléfono) | `TabBar` con `fixed` | De 3 a 5 secciones. |
| Navegación principal (desde 1056 px) | `Sidebar` | Las mismas secciones, agrupadas. |
| Cuenta | `PullDownButton` de ícono `user--avatar` en la `Toolbar` | Perfil, Ajustes, Cerrar sesión. |

![La misma app en dos pantallas. En el teléfono: Toolbar arriba con el título Mis viajes y TabBar abajo. En escritorio: Toolbar arriba con el buscador y Sidebar a la izquierda con los mismos destinos.](assets/Patrones/encabezado-global.png)

### Reglas

- **Los mismos destinos en todas las pantallas.** `TabBar` y `Sidebar` son la misma navegación en dos formas: cambia la forma, no los destinos.
- **La barra superior dice dónde estás:** su título es el de la vista.
- **La búsqueda global**, si existe, va en la `Toolbar`; bajo 672 px pasa a su propia fila.
- **Cerrar sesión** va al final del menú de cuenta, con `role: 'destructive'` solo si borra datos locales.
- **Primer enlace de la página:** «Saltar al contenido», que lleva al título de la vista.

### Capas

`Toolbar` y `TabBar` fijas usan `z-header`. Deja espacio bajo el contenido para que la `TabBar` no tape el último control.

### Accesibilidad

- La `Toolbar` es el `header` de la página y el contenido va en `main`.
- `TabBar` y `Sidebar` son `nav`; si hay más de un `nav`, cada uno lleva su nombre.
- Al cambiar de sección, el foco va al título de la vista nueva.

### Relacionados

`Toolbar` · `TabBar` · `Sidebar` · `PullDownButton` · Espaciado y grilla.

## Inicio de sesión

Cómo pedir las credenciales sin trabas y con los errores claros.

### Cuándo

Para entrar a una cuenta, y en cualquier pantalla que pida la contraseña de nuevo.

### Estructura

1. Título: «Ingresa a tu cuenta».
2. Correo: `TextInput` con `type: 'email'` y `autoComplete: 'username'`.
3. Contraseña: `TextInput` con `type: 'password'` y `autoComplete: 'current-password'`. Trae el ojo para mostrarla.
4. Enlace «¿Olvidaste tu contraseña?», bajo la contraseña.
5. Botón `filled`, `type: 'submit'`: «Ingresar».
6. Debajo, un enlace para crear una cuenta.

![La pantalla de ingreso en el teléfono, en tema oscuro: título «Ingresa a tu cuenta», campos de correo y contraseña con su ojo, el enlace «¿Olvidaste tu contraseña?», el botón «Ingresar» y, abajo, el enlace para crear una cuenta.](assets/Patrones/inicio-de-sesion.png)

### Reglas

- **Deja pegar y deja usar el gestor de contraseñas.** No bloquees el pegado ni desactives el autocompletado (WCAG 3.3.8, autenticación accesible).
- **Sin pruebas de memoria ni acertijos** para entrar. Si hace falta verificar a una persona, ofrece un método que no exija recordar ni transcribir.
- **Al crear una cuenta**, usa `autoComplete: 'new-password'` y di la regla antes: «Mínimo 8 caracteres».
- **Mientras ingresa**, el botón muestra `loading` con `loadingLabel: 'Ingresando'`.
- **Enter en cualquier campo** envía.

### Errores

| Caso | Qué mostrar |
|---|---|
| Falta un dato | El error en el campo: «Escribe tu correo». |
| Correo o contraseña no coinciden | Una `InlineNotification` de error sobre el formulario: «El correo o la contraseña no coinciden». No digas cuál de los dos, por seguridad. |
| Demasiados intentos | La notificación dice cuánto esperar o cómo recuperar la cuenta. |
| Sin conexión | «No se pudo conectar. Revisa tu conexión y vuelve a intentarlo.» |

Al fallar, deja escrito el correo y lleva el foco a la notificación o al primer campo con error.

### Cerrar sesión

En el menú de cuenta. No pidas confirmación salvo que se pierdan datos sin guardar.

### Relacionados

`TextInput` · `Button` · `InlineNotification` · `Link` · Formularios.

## Indicadores de estado

Cómo mostrar el estado de algo sin depender del color.

### Cuándo

Para decir en qué estado está un elemento: un pago, un viaje, una tarjeta, un archivo.

### Elegir la forma

| Situación | Usa |
|---|---|
| El estado de un elemento en una lista o tabla | `Tag` con la palabra del estado («Pagado», «Pendiente»). |
| Un estado del sistema que importa | Ícono relleno de estado + palabra. |
| Un resultado que pide atención | `InlineNotification`. |
| Algo nuevo o pendiente en la navegación | La insignia (`badge`) de `TabBar` o `Sidebar`. |
| El avance de algo | `ProgressBar` o `ProgressIndicator`. |

### Íconos de estado

| Estado | Ícono (`variant: 'filled'`) | Token |
|---|---|---|
| Error | `error` | `status-icon-error` |
| Advertencia | `warning` | `status-icon-warning` |
| Éxito | `checkmark--outline` | `status-icon-success` |
| Información | `information` | `status-icon-info` |

![Los cuatro íconos de estado rellenos con su palabra, en tema oscuro y claro: error, advertencia, éxito e información. Cada uno tiene una forma distinta, así se distinguen sin color.](assets/Patrones/indicadores-estado.png)

### Reglas

- **Tres pistas, no una:** forma (el ícono), palabra y color. Si falta el color, las otras dos bastan.
- **La palabra informa:** «Pagado» dice más que un punto verde.
- **Los cuatro íconos de estado tienen formas distintas**, así se distinguen sin color.
- **Pocos estados:** si hay más de cinco, agrupa.
- **El mismo estado se ve igual en toda la app:** mismo color de `Tag`, misma palabra.

### Accesibilidad

- El ícono de estado lleva `label` si no hay palabra al lado.
- Los estados que cambian solos se anuncian en una región `role="status"`.

### Relacionados

`Tag` · `Icon` · `InlineNotification` · `ProgressBar` · Notificaciones.

## Barra de texto

Las acciones de formato sobre un texto editable.

### Cuándo

Cuando un texto largo necesita formato (negrita, listas, enlaces): una nota, una descripción, un mensaje.

### Estado en ALMA

ALMA **no tiene hoy un editor de texto con formato**. `Textarea` es texto sin formato. Si un producto necesita formato, se pide como un componente nuevo de ALMA; mientras tanto, este patrón fija cómo debe comportarse.

### Cómo debe ser

1. Una fila de botones de ícono sobre el texto, dentro del mismo contenedor.
2. Cada formato es un botón que se prende y apaga (`Button` con `selected`), en grupos separados: estilo del texto, listas, enlace.
3. Los íconos de Carbon: `text--bold`, `text--italic`, `text--underline`, `list--bulleted`, `list--numbered`, `link`. No vienen en el set incluido: se cargan con `AlmaDS.registerIcons` desde `carbon-icons.json`.
4. Cada botón lleva su nombre y su atajo en un `Tooltip`: «Negrita (⌘B)».

![Un campo de nota con la barra de formato arriba, en el mismo contenedor: negrita (activa), cursiva y subrayado; lista con viñetas y numerada; y enlace. El tooltip de la negrita dice «Negrita (⌘B)».](assets/Patrones/barra-de-texto.png)

### Reglas

- **Pocos formatos.** Solo los que el contenido necesita; el resto, en «Más».
- **El atajo de teclado siempre funciona**, esté o no la barra a la vista.
- **El estado se ve:** el formato activo queda marcado con `selected`, no solo con color.

### Accesibilidad

- La fila es un `role="toolbar"` con nombre («Formato del texto»), con una sola parada de Tab y flechas para moverse entre botones.
- Cada botón anuncia si está activo (`aria-pressed`).

Esto último **no lo resuelve ALMA hoy**: forma parte del componente que habría que agregar.

### Relacionados

`Textarea` · `Button` · `Tooltip` · `Icon`.

## Campos fluidos

Cómo se comportan los campos de ALMA en formularios densos y en grillas.

### Qué son

En Carbon, los campos «fluidos» llevan la etiqueta dentro del campo y se pegan unos a otros para formularios densos. En ALMA, **todos los campos ya llevan la etiqueta dentro**: `TextInput`, `Textarea`, `DatePicker` y `TimePicker` son píldoras con la etiqueta flotante. No hay una variante aparte.

### Cómo funciona la etiqueta

| Estado | Etiqueta |
|---|---|
| Vacío y sin foco | Dentro del campo, en el lugar del texto. |
| Con foco o con texto | Sube al borde superior, sobre un fondo propio (`field-label-float-bg`). |
| Con error | Sube y cambia a `field-label-float-error`. |

El texto de ejemplo solo se ve con el campo enfocado: nunca compite con la etiqueta.

![La etiqueta del campo Correo en cada estado: vacío, dentro del campo; enfocado, arriba y con el texto de ejemplo visible; con texto, arriba; y con error, arriba en rojo.](assets/Patrones/estilos-fluidos-etiqueta.png)

### En grillas

- **Una columna por defecto.** Pon campos en fila solo si forman un dato (fecha y hora de un viaje; día, mes y año).
- **Separación:** `space-16` entre campos y `space-24` entre grupos, también en fila.
- **Mismo alto:** todos los campos miden 56 px (40 px en densidad compacta), así las filas se alinean.
- **Ancho según el dato:** el ancho sugiere el largo de lo que se escribe.

### Formularios densos

En herramientas de trabajo de escritorio, usa la densidad compacta (`data-density="compact"`): los campos bajan a 40 px y el resto no cambia. No existe una variante de campos pegados sin separación.

### Relacionados

`TextInput` · `DatePicker` · Formularios · Espaciado y grilla.

## Divulgación progresiva

Cómo mostrar primero lo esencial y el resto a pedido.

### Cuándo

Cuando hay más información de la que la mayoría necesita: detalles, condiciones, opciones avanzadas.

### Elegir la forma

| Lo que se esconde | Usa |
|---|---|
| Secciones de contenido largo | `Accordion` |
| El detalle de una tarjeta | `ProductCard` (se despliega) o `Card` (lleva a otra página) |
| Una explicación breve de un término | `Popover` |
| Qué hace un control | `Tooltip` |
| Opciones relacionadas con lo que se ve | `Sheet` |
| Acciones secundarias | El menú «Más» (`PullDownButton`) |
| Un texto largo | Un `Link` «Ver más» que lleva al texto completo |

![Una pantalla de pasaje en el teléfono: el resumen a la vista (ruta, fecha, asiento y total) y, debajo, las condiciones del pasaje en un Accordion con la sección Cambios abierta.](assets/Patrones/divulgacion.png)

### Reglas

- **Lo esencial, a la vista.** Lo que casi todos necesitan no se esconde.
- **Nunca se esconden los errores** ni lo que hace falta para decidir.
- **Un nivel.** No pongas un despliegue dentro de otro.
- **El control dice qué muestra:** «Ver condiciones del pasaje», no «Más».
- **Lo abierto se queda abierto** mientras la persona está en la pantalla.

### Accesibilidad

- El control que despliega anuncia si está abierto (`aria-expanded`); ALMA lo hace en `Accordion`, `ProductCard`, `Popover` y `PullDownButton`.
- Lo escondido queda oculto también para el lector.

### Relacionados

`Accordion` · `ProductCard` · `Popover` · `Sheet` · Contenido que desborda.

## Portada

La primera pantalla de una entidad: algo escaneado dibujado en puntos, su nombre y pocas palabras alrededor.

### Cuándo

Para abrir: la página de inicio de una entidad, el comienzo de una campaña, una bienvenida. Una portada presenta, no explica; lo que hay que leer con calma va debajo de ella.

No la uses dentro de un producto. Ahí la persona viene a hacer algo, y una portada la hace esperar.

### Tres clases

Las tres parten de un escaneo (un objeto, un lugar o un suelo) pasado a una trama de puntos, y se eligen según lo escaneado.

| Clase | Qué se escanea | Qué hace el desplazamiento | Dónde va el nombre |
|---|---|---|---|
| Con objeto | Algo que se puede rodear: un busto, una pieza. | Los puntos se separan en grupos, uno junto a cada dato. | Detrás del objeto, grande. |
| Recorrido | Un lugar con paredes: un pasillo, un túnel. | Se avanza por dentro, a la altura de los ojos. | En la salida: pequeño al principio, entero al llegar. |
| Sobrevuelo | Un suelo sin paredes: un relieve, un mar de nubes. | Se vuela bajo sobre él, mirando un poco hacia abajo. | Sobre el horizonte. |

### Estructura

Toda portada tiene las mismas cinco partes, y ninguna más.

1. **El nombre.** La palabra de la entidad, como pieza viva: se escribe letra por letra y su peso responde al puntero.
2. **La figura.** Lo escaneado, dibujado en puntos con los tres colores de la entidad. Lleva una descripción para quien no la ve.
3. **La entrada.** Una frase de dos o tres líneas, una sola acción `filled` y una pista de qué hacer. Siempre sobre un recuadro con el fondo de la página.
4. **Los datos.** Hasta cuatro frases cortas que aparecen al desplazar, cada una sobre su recuadro.
5. **El tema.** Un `Button` `plain` de solo ícono, arriba a la derecha, para pasar de oscuro a claro.

![Anatomía de una portada: el nombre grande detrás (1), la figura de puntos al centro (2), la entrada con su frase, su botón y su pista abajo a la izquierda (3), un dato sobre su recuadro a la derecha (4) y el botón de tema arriba a la derecha (5).](assets/Patrones/portada-anatomia.png)

Debajo de la portada va el contenido que sí se lee: la acción de la entrada lleva ahí.

#### Fondos

Una portada con objeto puede llevar, bajo todo lo demás, fondos de la colección de Efectos en dos momentos: detrás de la figura mientras está entera, y en su lugar cuando ya se deshizo. En un mismo momento caben dos, uno sobre otro, si el de arriba deja ver el de abajo.

Un fondo y un texto nunca se encuentran. Los fondos del primer momento se apagan al empezar a desplazar, antes de que llegue ningún dato. Los del segundo esperan: primero la figura se deshace y los datos se leen sobre la página limpia; después los puntos y los datos se van juntos; y solo entonces entra el fondo. Así los datos no necesitan recuadro ni nada detrás, y la portada es un poco más larga, porque tiene una cosa más que mostrar al final.

Las tres portadas con busto (Cordura, Ensayo y Autómata) entran sin fondo. Cuando el busto se deshizo y sus datos ya se leyeron y se fueron, baja el Velo desde lo alto y aparece el Halo al centro, latiendo, cada una con los colores de su entidad.

Con un fondo al final, los cuatro datos forman un marco: los de arriba alineados por arriba, los de abajo por abajo.

### Contenido

- **La frase dice una idea**, no describe la figura. «Un primer borrador nunca es el texto. Es el material.»
- **Una acción.** Si hacen falta dos, no es una portada: es una página.
- **Los datos son frases completas** y se entienden solos, porque aparecen de a uno.
- **El texto nunca va sobre los puntos.** Todo lo que se lee tiene su recuadro: los puntos cambian con el tema y con el movimiento, y el contraste no se puede prometer de otro modo.

### Color

La figura usa tres colores de la entidad y ninguno más, repartidos por zonas: de arriba abajo en un objeto; bóveda, paredes y suelo en un recorrido; cimas, laderas y hondonadas en un sobrevuelo. En tema claro los puntos son tinta: marcan lo oscuro de la figura en vez de lo claro.

### Movimiento

Una portada es el único lugar, junto con la firma, donde vale el movimiento de marca. Sus recetas (escribirse, armarse, deshacerse, responder, avanzar y descansar) y la medida contenida están en Movimiento › Coreografía.

### Accesibilidad

- **Todo el texto es texto.** El nombre, la frase y los datos están en la página aunque la figura no cargue.
- **La figura tiene descripción** y no recibe el foco: no hay nada que operar en ella.
- **Con teclado** se llega al tema, al nombre (las flechas mueven su peso) y a la acción. Si la acción ya no está a la vista, la página vuelve al inicio al enfocarla.
- **Con movimiento reducido** todo aparece armado y escrito: sin polvo, sin granos y sin giro. El desplazamiento sigue funcionando.
- **Nada depende del puntero.** Girar la mirada o revolver los puntos es un añadido; quien no lo hace no pierde contenido.

### No hagas

- No pongas más de una portada en una página.
- No escribas sobre los puntos sin recuadro.
- No uses colores que no sean los tres de la entidad.
- No hagas que algo avance solo: quien lee marca el paso.
- No uses una portada para mostrar un escaneo que no dice nada de la entidad.
