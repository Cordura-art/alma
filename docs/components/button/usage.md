---
component: Button
tab: Uso
summary: Un botón inicia una acción. Su etiqueta dice qué va a pasar al usarlo.
---

## Resumen

Un botón inicia una acción en el lugar donde está: guardar, pagar, enviar, eliminar. La etiqueta anuncia el resultado antes de que la persona lo toque. ALMA ordena los botones por **estilo** (cuánto llaman la atención) y por **rol** (qué significan), como las guías de botones de Apple.

### Cuándo usarlo

- Para una acción que cambia algo: confirma, crea, envía, borra, abre un diálogo o empieza un proceso.
- Para la acción principal de una vista, de un diálogo o de un formulario.
- Para acciones secundarias que acompañan a la principal, con un estilo de menos énfasis.

### Cuándo no usarlo

- **Para ir a otra página.** Si la acción solo lleva a otro lugar, usa `Link`. Un botón que navega confunde a los lectores de pantalla y rompe el «abrir en otra pestaña».
- **Para elegir entre opciones.** Usa `SegmentedControl` (2 a 5 opciones), `RadioGroup` o `PopUpButton`.
- **Para encender o apagar un ajuste en una lista.** Usa `Switch`. Fuera de listas, un botón con `selected` hace de interruptor.
- **Para muchas acciones juntas.** Más de tres acciones relacionadas van en un `PullDownButton` («Más»).

## Estilos

El estilo marca la prominencia. Usa el de más énfasis solo para la acción que la persona más probablemente quiere hacer.

| Estilo | Énfasis | Para qué |
|---|---|---|
| `filled` | Alto | La acción principal de la vista. Fondo azul (`interactive-01`). Una por vista; como máximo dos si son equivalentes. |
| `tinted` | Medio | Una acción secundaria importante junto a la principal, o la principal de una sección cuando la vista ya tiene una `filled`. |
| `gray` | Medio | Acciones neutras: «Cancelar», «Volver», «Ver detalles». Fondo azul muy oscuro y apagado (`interactive-02`), con texto blanco. |
| `tertiary` | Medio-bajo | Una acción alternativa con contorno, cuando `gray` se confunde con el fondo. Viene del theme de origen de Cordura (`interactive-03`). |
| `plain` | Bajo | Acciones de poco peso o muy repetidas: en tablas, barras de herramientas, tarjetas y como «Omitir». Solo texto. |
| `ghost` | Especial | Sobre imágenes o fondos claros de marca. |
| `inverse` | Especial | Sobre piezas de marca oscuras. |

`primary` y `secondary` siguen funcionando como alias de `filled` y `gray`.

## Roles

El rol dice qué significa el botón, con independencia de su estilo.

| Rol | Significado | Efecto |
|---|---|---|
| `normal` | Una acción cualquiera. | Ninguno. |
| `primary` | La acción por defecto del formulario o diálogo. | Es `type="submit"`: Enter la dispara. Una sola por formulario. |
| `cancel` | Descarta sin cambiar nada. | En `Alert` y `Modal` va a la izquierda y Esc la equivale. Nunca es la acción por defecto. |
| `destructive` | Borra o deshace algo que cuesta recuperar. | Rojo de sistema en cualquier estilo; nunca azul. |

## Anatomía

1. **Contenedor.** Esquinas `radius-button` con el color del estilo. `plain` no tiene contenedor visible y `tertiary` solo tiene contorno.
2. **Etiqueta.** Texto centrado en una línea.
3. **Ícono (opcional).** Antes o después de la etiqueta. Un botón puede ser **solo ícono**: entonces es un círculo y necesita nombre accesible.

![Anatomía de Button: un botón filled con etiqueta e ícono de flecha, un botón plain y un botón solo ícono, con su contenedor (1), su etiqueta (2) y su ícono (3) numerados.](assets/Componentes/button-anatomia.png)

## Tamaños

| Tamaño | Alto | Cuándo |
|---|---|---|
| `sm` (por defecto) | 44 px | Casi toda la interfaz: formularios, diálogos, tarjetas, barras. Es el área táctil mínima de Apple. |
| `md` | 56 px | Acción principal de una pantalla móvil o de un paso de un flujo (pagar, continuar). |
| `lg` | 72 px | Portadas y momentos de marca. |

Con densidad compacta (`data-density="compact"`) y puntero fino, `sm` baja a 32 px. No mezcles tamaños dentro de un mismo grupo de botones: usa el estilo, no el tamaño, para marcar la jerarquía.

![Los tres tamaños de Button lado a lado, con su alto: sm de 44 px en un formulario, md de 56 px como acción principal de una pantalla móvil y lg de 72 px en una portada.](assets/Componentes/button-tamanos.png)

## Énfasis y jerarquía

- **Una acción de alto énfasis por vista.** Una sola `filled` deja claro qué es lo principal. Si todo es azul, nada lo es.
- **Baja el énfasis en lo repetido.** Donde hay muchas acciones (tablas, listas, paneles), usa `plain` o `tertiary`.
- **Agrupa solo acciones relacionadas.** Un grupo es un conjunto de alternativas para el mismo momento, no una colección de botones sueltos.
- **No toda vista necesita una acción `filled`.** Una vista de lectura o un listado puede no tener acción principal.

![A la izquierda, la forma correcta: una vista con una sola acción filled y dos de menor énfasis. A la derecha, la incorrecta: tres acciones filled compiten entre sí.](assets/Componentes/button-enfasis.png)

## Alineación y orden

| Contexto | Alineación | Orden |
|---|---|---|
| Diálogos (`Alert`, `Modal`, `Sheet`) | A la derecha; en el teléfono ocupan el ancho. | «Cancelar» a la izquierda, la acción a la derecha. Con tres botones en `Alert`, apilados: la acción por defecto arriba y «Cancelar» abajo. |
| Formularios en la página | A la izquierda, alineados con los campos. | La acción principal primero. |
| Flujos por pasos | Abajo a la derecha. | «Volver» (`gray`) antes de «Continuar» (`filled`). |
| Tarjetas | Abajo, alineados con el contenido. | La acción más importante primero. |
| Barras de herramientas | A la derecha del título. | Solo `plain`; el resto en «Más». |
| Teléfono | Ancho completo cuando el botón es la acción principal de la pantalla. | Apilados si no caben lado a lado. |

![Alineación de los botones en seis contextos: en un diálogo a la derecha con Cancelar primero; en un formulario a la izquierda; en un flujo por pasos abajo a la derecha con Volver antes de Continuar; en una tarjeta abajo; en una barra de herramientas a la derecha del título; y en el teléfono a todo el ancho.](assets/Componentes/button-alineacion.png)

## Grupos de botones

- Como máximo tres botones por grupo; lo demás va a un `PullDownButton`.
- Mismo tamaño dentro del grupo, 8 px entre botones (`space-8`).
- Una sola acción `filled` por grupo. Combinaciones recomendadas: `filled` + `gray`, `filled` + `tinted`, `filled` + `tertiary`, `filled` + `plain`.
- Evita dos `filled` juntas, `tinted` + `tertiary` sin una principal, y un botón destructivo como única opción visible sin «Cancelar».

![Combinaciones de botones. Recomendadas: filled con gray, con tinted, con tertiary y con plain. A evitar: dos filled juntas, tinted con tertiary sin una principal, y un botón destructivo solo, sin Cancelar.](assets/Componentes/button-combinaciones.png)

## Contenido

- **Verbo primero y concreto:** «Pagar $7.000», «Guardar cambios», «Eliminar tarjeta». Nunca «Sí», «OK» o «Aceptar» si hay algo más preciso.
- **Corto:** de una a tres palabras. El botón no parte la etiqueta en dos líneas; si no cabe, acorta la etiqueta o cambia el diseño.
- **Mayúscula solo al inicio**, sin punto final.
- **Puntos suspensivos (…)** cuando el botón abre algo que pide más datos antes de actuar: «Editar…», «Compartir…».
- **Mientras carga**, di qué está pasando: «Pagando…», «Guardando…» (`loadingLabel`).
- **Confirmaciones:** el botón repite el verbo del título. «¿Eliminar la tarjeta?» → «Eliminar» y «Cancelar».
- El español ocupa hasta un 30 % más que el inglés; diseña con la etiqueta real.

## Comportamiento

### Estados

| Estado | Qué cambia |
|---|---|
| Reposo | Colores del estilo. |
| Puntero encima | El fondo se oscurece o se aclara un paso (`*-bg-hover`). |
| Presionado | Fondo del paso siguiente; en `tinted`, `plain` y `tertiary` (normales y destructivos), además un borde interior de 2 px. |
| Foco de teclado | Anillo de 2 px en `focus`, separado 2 px. Solo con teclado (`:focus-visible`). |
| Cargando | Un indicador reemplaza al ícono, el botón deja de responder y se anuncia como ocupado. |
| Desactivado | Fondo `button-disabled-bg`, texto `button-disabled-text`. |

![Los seis estados de un botón filled en tema oscuro y claro: reposo, puntero encima, presionado, foco de teclado, cargando y desactivado.](assets/Componentes/button-estados.png)

### Interacción

- **Mouse y toque:** un clic o un toque activa el botón.
- **Teclado:** Tab llega al botón; Enter o Espacio lo activan. En un formulario, Enter dispara el botón con rol `primary`.
- **Doble envío:** con `loading`, los clics repetidos no hacen nada.

### Desactivado o no

Prefiere dejar el botón activo y explicar el problema al pulsarlo («Completa el correo»). Un botón desactivado no dice por qué lo está. Si lo desactivas, pon la razón visible cerca.

### Botón interruptor

Fuera de listas, un botón con `selected` alterna un estado (por ejemplo, «Favorito»): encendido se ve `filled` y apagado `tinted`, y se anuncia como botón presionado.

## Por estilo

### Filled
La acción principal. Úsala para lo que completa la tarea de la vista: pagar, continuar, guardar. En un flujo temporal (un diálogo, un paso), la principal es la que avanza.

### Tinted
La segunda acción importante: «Guardar borrador» junto a «Publicar», o la acción principal de una sección cuando la vista ya tiene una `filled`. En `FileUploader` es el estilo por defecto, para no competir con la acción principal de la vista.

### Gray
Lo neutro. «Cancelar» en diálogos y «Volver» en flujos. No lo uses para una acción positiva aislada.

### Tertiary
Una alternativa con peso propio pero sin competir con la principal: encabezados de página, estados vacíos con dos caminos, grupos donde `gray` se pierde en el fondo. Como máximo uno por grupo.

### Plain
Acciones de poco peso o muy frecuentes: en filas de tabla, barras de herramientas, tarjetas y «Omitir». En barras, las acciones son siempre `plain`.

### Ghost e inverse
Solo sobre fondos de marca: `ghost` sobre imágenes y superficies claras de marca, `inverse` sobre piezas oscuras. No los uses en la interfaz de trabajo.

### Destructivo
Para lo que borra o deshace: eliminar una tarjeta, cancelar un viaje. Se ve rojo en cualquier estilo y nunca usa el azul.
- En `Alert`, si la persona no pidió explícitamente la acción destructiva, el botón va en rojo; si la eligió deliberadamente («Vaciar papelera»), la confirmación no necesita ser roja.
- Siempre acompañado de «Cancelar».
- No existe como botón solo ícono sin nombre visible: usa `plain` con ícono y `aria-label`.

## Modificadores

### Con ícono
`iconBefore` o `iconAfter`, con íconos de Carbon a 24 px. Usa íconos universales para acciones universales (`add` agregar, `trash-can` eliminar, `download` descargar, `share` compartir) y no reutilices uno conocido para otra cosa. `arrow--right` después de la etiqueta indica avance; `launch` indica que abre fuera. Dentro de un grupo, o todos llevan ícono o ninguno.

### Solo ícono
`icon` + `aria-label`. El botón es un círculo y la etiqueta se muestra como tooltip. Úsalo solo con íconos que se entienden sin texto y cuando no hay espacio para la etiqueta.

## Relacionados

`Link` para navegar · `PullDownButton` para agrupar acciones · `SegmentedControl` y `RadioGroup` para elegir · `Switch` para ajustes en listas · `Alert` y `Modal` para confirmar.

## Referencias

- Apple, Human Interface Guidelines: Buttons.
- IBM, Carbon Design System: Button (estructura y temas de esta guía).
