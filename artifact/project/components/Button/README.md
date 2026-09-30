# Button

Un botón inicia una acción. Su etiqueta dice qué va a pasar al usarlo.


## Uso

### Resumen

Un botón inicia una acción en el lugar donde está: guardar, pagar, enviar, eliminar. La etiqueta anuncia el resultado antes de que la persona lo toque. ALMA ordena los botones por **estilo** (cuánto llaman la atención) y por **rol** (qué significan), como las guías de botones de Apple.

#### Cuándo usarlo

- Para una acción que cambia algo: confirma, crea, envía, borra, abre un diálogo o empieza un proceso.
- Para la acción principal de una vista, de un diálogo o de un formulario.
- Para acciones secundarias que acompañan a la principal, con un estilo de menos énfasis.

#### Cuándo no usarlo

- **Para ir a otra página.** Si la acción solo lleva a otro lugar, usa `Link`. Un botón que navega confunde a los lectores de pantalla y rompe el «abrir en otra pestaña».
- **Para elegir entre opciones.** Usa `SegmentedControl` (2 a 5 opciones), `RadioGroup` o `PopUpButton`.
- **Para encender o apagar un ajuste en una lista.** Usa `Switch`. Fuera de listas, un botón con `selected` hace de interruptor.
- **Para muchas acciones juntas.** Más de tres acciones relacionadas van en un `PullDownButton` («Más»).

### Estilos

El estilo marca la prominencia. Usa el de más énfasis solo para la acción que la persona más probablemente quiere hacer.

| Estilo | Énfasis | Para qué |
|---|---|---|
| `filled` | Alto | La acción principal de la vista. Fondo lima (`interactive-01`). Una por vista; como máximo dos si son equivalentes. |
| `tinted` | Medio | Una acción secundaria importante junto a la principal, o la principal de una sección cuando la vista ya tiene una `filled`. |
| `gray` | Medio | Acciones neutras: «Cancelar», «Volver», «Ver detalles». Fondo acero (`interactive-02`). |
| `tertiary` | Medio-bajo | Una acción alternativa con contorno, cuando `gray` se confunde con el fondo. Viene del theme de origen de Cordura (`interactive-03`). |
| `plain` | Bajo | Acciones de poco peso o muy repetidas: en tablas, barras de herramientas, tarjetas y como «Omitir». Solo texto. |
| `ghost` | Especial | Sobre imágenes o fondos claros de marca. |
| `inverse` | Especial | Sobre piezas de marca oscuras. |

`primary` y `secondary` siguen funcionando como alias de `filled` y `gray`.

### Roles

El rol dice qué significa el botón, con independencia de su estilo.

| Rol | Significado | Efecto |
|---|---|---|
| `normal` | Una acción cualquiera. | Ninguno. |
| `primary` | La acción por defecto del formulario o diálogo. | Es `type="submit"`: Enter la dispara. Una sola por formulario. |
| `cancel` | Descarta sin cambiar nada. | En `Alert` y `Modal` va a la izquierda y Esc la equivale. Nunca es la acción por defecto. |
| `destructive` | Borra o deshace algo que cuesta recuperar. | Rojo de sistema en cualquier estilo; nunca lima. |

### Anatomía

1. **Contenedor.** Esquinas `radius-button` con el color del estilo. `plain` no tiene contenedor visible y `tertiary` solo tiene contorno.
2. **Etiqueta.** Texto centrado en una línea.
3. **Ícono (opcional).** Antes o después de la etiqueta. Un botón puede ser **solo ícono**: entonces es un círculo y necesita nombre accesible.

> **Imagen pendiente:** anatomía numerada de un botón con etiqueta e ícono, de un `plain` y de un botón solo ícono.

### Tamaños

| Tamaño | Alto | Cuándo |
|---|---|---|
| `sm` (por defecto) | 44 px | Casi toda la interfaz: formularios, diálogos, tarjetas, barras. Es el área táctil mínima de Apple. |
| `md` | 56 px | Acción principal de una pantalla móvil o de un paso de un flujo (pagar, continuar). |
| `lg` | 72 px | Portadas y momentos de marca. |

Con densidad compacta (`data-density="compact"`) y puntero fino, `sm` baja a 32 px. No mezcles tamaños dentro de un mismo grupo de botones: usa el estilo, no el tamaño, para marcar la jerarquía.

> **Imagen pendiente:** los tres tamaños lado a lado, con su alto y su contexto de uso (formulario, pantalla móvil, portada).

### Énfasis y jerarquía

- **Una acción de alto énfasis por vista.** Una sola `filled` deja claro qué es lo principal. Si todo es lima, nada lo es.
- **Baja el énfasis en lo repetido.** Donde hay muchas acciones (tablas, listas, paneles), usa `plain` o `tertiary`.
- **Agrupa solo acciones relacionadas.** Un grupo es un conjunto de alternativas para el mismo momento, no una colección de botones sueltos.
- **No toda vista necesita una acción `filled`.** Una vista de lectura o un listado puede no tener acción principal.

> **Imagen pendiente:** una vista con una sola acción `filled` y dos de menor énfasis, frente a una vista con tres `filled` (incorrecto).

### Alineación y orden

| Contexto | Alineación | Orden |
|---|---|---|
| Diálogos (`Alert`, `Modal`, `Sheet`) | A la derecha; en el teléfono ocupan el ancho. | «Cancelar» a la izquierda, la acción a la derecha. Con tres botones en `Alert`, apilados: la acción por defecto arriba y «Cancelar» abajo. |
| Formularios en la página | A la izquierda, alineados con los campos. | La acción principal primero. |
| Flujos por pasos | Abajo a la derecha. | «Volver» (`gray`) antes de «Continuar» (`filled`). |
| Tarjetas | Abajo, alineados con el contenido. | La acción más importante primero. |
| Barras de herramientas | A la derecha del título. | Solo `plain`; el resto en «Más». |
| Teléfono | Ancho completo cuando el botón es la acción principal de la pantalla. | Apilados si no caben lado a lado. |

> **Imagen pendiente:** alineación en diálogo, formulario, flujo por pasos, tarjeta, barra de herramientas y teléfono.

### Grupos de botones

- Como máximo tres botones por grupo; lo demás va a un `PullDownButton`.
- Mismo tamaño dentro del grupo, 8 px entre botones (`space-8`).
- Una sola acción `filled` por grupo. Combinaciones recomendadas: `filled` + `gray`, `filled` + `tinted`, `filled` + `tertiary`, `filled` + `plain`.
- Evita dos `filled` juntas, `tinted` + `tertiary` sin una principal, y un botón destructivo como única opción visible sin «Cancelar».

> **Imagen pendiente:** combinaciones recomendadas y combinaciones a evitar.

### Contenido

- **Verbo primero y concreto:** «Pagar $7.000», «Guardar cambios», «Eliminar tarjeta». Nunca «Sí», «OK» o «Aceptar» si hay algo más preciso.
- **Corto:** de una a tres palabras. El botón no parte la etiqueta en dos líneas; si no cabe, acorta la etiqueta o cambia el diseño.
- **Mayúscula solo al inicio**, sin punto final.
- **Puntos suspensivos (…)** cuando el botón abre algo que pide más datos antes de actuar: «Editar…», «Compartir…».
- **Mientras carga**, di qué está pasando: «Pagando…», «Guardando…» (`loadingLabel`).
- **Confirmaciones:** el botón repite el verbo del título. «¿Eliminar la tarjeta?» → «Eliminar» y «Cancelar».
- El español ocupa hasta un 30 % más que el inglés; diseña con la etiqueta real.

### Comportamiento

#### Estados

| Estado | Qué cambia |
|---|---|
| Reposo | Colores del estilo. |
| Puntero encima | El fondo se oscurece o se aclara un paso (`*-bg-hover`). |
| Presionado | Fondo del paso siguiente; en `tinted`, `plain` y `tertiary` (normales y destructivos), además un borde interior de 2 px. |
| Foco de teclado | Anillo de 2 px en `focus`, separado 2 px. Solo con teclado (`:focus-visible`). |
| Cargando | Un indicador reemplaza al ícono, el botón deja de responder y se anuncia como ocupado. |
| Desactivado | Fondo `button-disabled-bg`, texto `button-disabled-text`. |

> **Imagen pendiente:** los seis estados de un botón `filled`, en tema oscuro y claro.

#### Interacción

- **Mouse y toque:** un clic o un toque activa el botón.
- **Teclado:** Tab llega al botón; Enter o Espacio lo activan. En un formulario, Enter dispara el botón con rol `primary`.
- **Doble envío:** con `loading`, los clics repetidos no hacen nada.

#### Desactivado o no

Prefiere dejar el botón activo y explicar el problema al pulsarlo («Completa el correo»). Un botón desactivado no dice por qué lo está. Si lo desactivas, pon la razón visible cerca.

#### Botón interruptor

Fuera de listas, un botón con `selected` alterna un estado (por ejemplo, «Favorito»): encendido se ve `filled` y apagado `tinted`, y se anuncia como botón presionado.

### Por estilo

#### Filled
La acción principal. Úsala para lo que completa la tarea de la vista: pagar, continuar, guardar. En un flujo temporal (un diálogo, un paso), la principal es la que avanza.

#### Tinted
La segunda acción importante: «Guardar borrador» junto a «Publicar», o la acción principal de una sección cuando la vista ya tiene una `filled`. En `FileUploader` es el estilo por defecto, para no competir con la acción principal de la vista.

#### Gray
Lo neutro. «Cancelar» en diálogos y «Volver» en flujos. No lo uses para una acción positiva aislada.

#### Tertiary
Una alternativa con peso propio pero sin competir con la principal: encabezados de página, estados vacíos con dos caminos, grupos donde `gray` se pierde en el fondo. Como máximo uno por grupo.

#### Plain
Acciones de poco peso o muy frecuentes: en filas de tabla, barras de herramientas, tarjetas y «Omitir». En barras, las acciones son siempre `plain`.

#### Ghost e inverse
Solo sobre fondos de marca: `ghost` sobre imágenes y superficies claras de marca, `inverse` sobre piezas oscuras. No los uses en la interfaz de trabajo.

#### Destructivo
Para lo que borra o deshace: eliminar una tarjeta, cancelar un viaje. Se ve rojo en cualquier estilo y nunca usa el lima.
- En `Alert`, si la persona no pidió explícitamente la acción destructiva, el botón va en rojo; si la eligió deliberadamente («Vaciar papelera»), la confirmación no necesita ser roja.
- Siempre acompañado de «Cancelar».
- No existe como botón solo ícono sin nombre visible: usa `plain` con ícono y `aria-label`.

### Modificadores

#### Con ícono
`iconBefore` o `iconAfter`, con íconos de Carbon a 24 px. Usa íconos universales para acciones universales (`add` agregar, `trash-can` eliminar, `download` descargar, `share` compartir) y no reutilices uno conocido para otra cosa. `arrow--right` después de la etiqueta indica avance; `launch` indica que abre fuera. Dentro de un grupo, o todos llevan ícono o ninguno.

#### Solo ícono
`icon` + `aria-label`. El botón es un círculo y la etiqueta se muestra como tooltip. Úsalo solo con íconos que se entienden sin texto y cuando no hay espacio para la etiqueta.

### Relacionados

`Link` para navegar · `PullDownButton` para agrupar acciones · `SegmentedControl` y `RadioGroup` para elegir · `Switch` para ajustes en listas · `Alert` y `Modal` para confirmar.

### Referencias

- Apple, Human Interface Guidelines: Buttons.
- IBM, Carbon Design System: Button (estructura y temas de esta guía).

## Estilo

Esta pestaña documenta las especificaciones visuales: color, tipografía, estructura y tamaño. Cada valor es un token de componente (`button-*`) que apunta a la capa semántica; para ajustar un botón, cambia su token de componente, nunca el semántico.

### Color

El ícono siempre toma el color de la etiqueta (`currentColor`). El borde reservado de 2 px es transparente en todos los estilos.

#### Filled

La acción principal.

| Elemento | Propiedad | Token |
|---|---|---|
| Etiqueta | color del texto | `button-filled-text` |
| Ícono | relleno (`currentColor`) | `button-filled-text` |
| Contenedor | fondo | `button-filled-bg` |
| Contenedor:hover | fondo | `button-filled-bg-hover` |
| Contenedor:active | fondo | `button-filled-bg-active` |
| Etiqueta:active | color del texto | `button-filled-text-active` |
| Contenedor:focus | contorno | `focus` (2 px, separado 2 px) |
| Contenedor:disabled | fondo | `button-disabled-bg` |
| Etiqueta:disabled | color del texto | `button-disabled-text` |

#### Tinted

Acción secundaria importante.

| Elemento | Propiedad | Token |
|---|---|---|
| Etiqueta | color del texto | `button-tinted-text` |
| Ícono | relleno | `button-tinted-text` |
| Contenedor | fondo | `button-tinted-bg` |
| Contenedor:hover | fondo | `button-tinted-bg-hover` |
| Contenedor:active | fondo | `button-tinted-bg-hover` |
| Contenedor:active | borde (2 px, interior) | `currentColor` |
| Contenedor:focus | contorno | `focus` (2 px, separado 2 px) |
| Contenedor:disabled | fondo | `button-disabled-bg` |
| Etiqueta:disabled | color del texto | `button-disabled-text` |

#### Gray

Acciones neutras («Cancelar», «Volver»).

| Elemento | Propiedad | Token |
|---|---|---|
| Etiqueta | color del texto | `button-gray-text` |
| Ícono | relleno | `button-gray-text` |
| Contenedor | fondo | `button-gray-bg` |
| Contenedor:hover | fondo | `button-gray-bg-hover` |
| Contenedor:active | fondo | `button-gray-bg-active` |
| Etiqueta:active | color del texto | `button-gray-text-active` |
| Contenedor:focus | contorno | `focus` (2 px, separado 2 px) |
| Contenedor:disabled | fondo | `button-disabled-bg` |
| Etiqueta:disabled | color del texto | `button-disabled-text` |

#### Tertiary

Alternativa con contorno.

| Elemento | Propiedad | Token |
|---|---|---|
| Etiqueta | color del texto | `button-tertiary-text` |
| Ícono | relleno | `button-tertiary-text` |
| Contenedor | fondo | transparente |
| Contenedor | borde (1 px, interior) | `button-tertiary-border` |
| Etiqueta:hover | color del texto | `button-tertiary-text-hover` |
| Contenedor:hover | fondo | `button-tertiary-bg-hover` |
| Contenedor:hover | borde | ninguno |
| Etiqueta:active | color del texto | `button-tertiary-text-active` |
| Contenedor:active | fondo | `button-tertiary-bg-active` |
| Contenedor:active | borde (2 px, interior) | `button-tertiary-text-active` |
| Contenedor:focus | contorno | `focus` (2 px, separado 2 px) |
| Contenedor:disabled | fondo | `button-disabled-bg` |
| Etiqueta:disabled | color del texto | `button-disabled-text` |

#### Plain

Acciones de poco peso o repetidas.

| Elemento | Propiedad | Token |
|---|---|---|
| Etiqueta | color del texto | `button-plain-text` |
| Ícono | relleno | `button-plain-text` |
| Contenedor | fondo | transparente |
| Contenedor:hover | fondo | `button-plain-bg-hover` |
| Contenedor:active | fondo | `button-plain-bg-active` |
| Contenedor:active | borde (2 px, interior) | `currentColor` |
| Contenedor:focus | contorno | `focus` (2 px, separado 2 px) |
| Contenedor:disabled | fondo | transparente |
| Etiqueta:disabled | color del texto | `button-disabled-text` |

#### Ghost

Sobre imágenes y fondos claros de marca.

| Elemento | Propiedad | Token |
|---|---|---|
| Etiqueta | color del texto | `button-ghost-text` |
| Contenedor | fondo | `button-ghost-bg` |
| Contenedor:hover | fondo | `button-ghost-bg-hover` |
| Contenedor:active | fondo | `button-ghost-bg-active` |
| Etiqueta:active | color del texto | `button-ghost-text-active` |
| Contenedor:focus | contorno | `focus` (2 px, separado 2 px) |
| Contenedor:disabled | fondo | `button-ghost-bg` |
| Etiqueta:disabled | color del texto | `button-ghost-text-disabled` |

#### Inverse

Sobre piezas de marca oscuras.

| Elemento | Propiedad | Token |
|---|---|---|
| Etiqueta | color del texto | `button-inverse-text` |
| Contenedor | fondo | `button-inverse-bg` |
| Contenedor:hover | fondo | `button-inverse-bg-hover` |
| Contenedor:active | fondo | `button-inverse-bg-active` |
| Etiqueta:active | color del texto | `button-inverse-text-active` |
| Contenedor:focus | contorno | `focus` (2 px, separado 2 px) |

#### Destructivo filled

También se aplica a `ghost` e `inverse` con rol destructivo.

| Elemento | Propiedad | Token |
|---|---|---|
| Etiqueta | color del texto | `button-destructive-text-on-fill` |
| Contenedor | fondo | `button-destructive-fill` |
| Contenedor:hover | fondo | `button-destructive-bg-hover` |
| Etiqueta:hover | color del texto | `button-destructive-text-pressed` |
| Contenedor:active | fondo | `button-destructive-bg-active` |
| Etiqueta:active | color del texto | `button-destructive-text-pressed` |
| Contenedor:focus | contorno | `focus` (2 px, separado 2 px) |

#### Destructivo tinted

| Elemento | Propiedad | Token |
|---|---|---|
| Etiqueta | color del texto | `button-destructive-text` |
| Contenedor | fondo | `button-destructive-tinted-bg` |
| Contenedor:hover | fondo | `button-destructive-tinted-bg-hover` |
| Contenedor:active | fondo | `button-destructive-tinted-bg-hover` |
| Contenedor:active | borde (2 px, interior) | `currentColor` |
| Contenedor:focus | contorno | `focus` (2 px, separado 2 px) |

#### Destructivo gray

| Elemento | Propiedad | Token |
|---|---|---|
| Etiqueta | color del texto | `button-destructive-gray-text` |
| Contenedor | fondo | `button-gray-bg` |
| Contenedor:hover | fondo | `button-destructive-gray-bg-hover` |
| Contenedor:active | fondo | `button-gray-bg-active` |
| Etiqueta:active | color del texto | `button-destructive-text-pressed` |
| Contenedor:focus | contorno | `focus` (2 px, separado 2 px) |

#### Destructivo plain

| Elemento | Propiedad | Token |
|---|---|---|
| Etiqueta | color del texto | `button-destructive-text` |
| Contenedor | fondo | transparente |
| Contenedor:hover | fondo | `button-destructive-plain-bg-hover` |
| Contenedor:active | fondo | `button-destructive-plain-bg-active` |
| Contenedor:active | borde (2 px, interior) | `currentColor` |
| Contenedor:focus | contorno | `focus` (2 px, separado 2 px) |

#### Destructivo tertiary

| Elemento | Propiedad | Token |
|---|---|---|
| Etiqueta | color del texto | `button-destructive-text` |
| Contenedor | borde (1 px, interior) | `button-destructive-text` |
| Contenedor:hover | fondo | `button-destructive-bg-hover` |
| Etiqueta:hover | color del texto | `button-destructive-text-pressed` |
| Contenedor:active | fondo | `button-destructive-bg-active` |
| Etiqueta:active | color del texto | `button-destructive-text-pressed` |
| Contenedor:focus | contorno | `focus` (2 px, separado 2 px) |

> **Imagen pendiente:** los siete estilos y los cinco destructivos, en reposo, puntero encima, presionado, foco y desactivado, en tema oscuro y claro.

#### Valores por tema

Los tokens resuelven un color distinto en cada tema (`dark`, `light`, `dark-hc`, `light-hc`). Los valores exactos están en `tokens/themes/` del repositorio y en la pestaña Colores del artefacto.

### Tipografía

Roboto Flex extendida (`wdth` 150), peso Regular, en una línea. Las etiquetas usan mayúscula solo al inicio.

| Tamaño | Tamaño de letra (px / rem) | Peso | Estilo de texto |
|---|---|---|---|
| `sm` | 11 / 0,6875 | Regular / 400 | `web-label-s` |
| `md` | 14 / 0,875 | Regular / 400 | `web-label-m` |
| `lg` | 16 / 1 | Regular / 400 | `web-label-l`, con interlineado 1,4 |

Los tamaños van en rem: crecen con el tamaño de texto que elige la persona (probado al 200 %).

### Estructura

| Elemento | Propiedad | `sm` | `md` | `lg` |
|---|---|---|---|---|
| Contenedor | relleno lateral | 16 px (`space-16`) | 24 px (`space-24`) | 32 px (`space-32`) |
| Contenedor con ícono | relleno del lado del ícono | 10 px | 16 px (`space-16`) | 24 px (`space-24`) |
| Contenedor | radio | `radius-button` | `radius-button` | `radius-button` |
| Contenedor | borde reservado | 2 px transparente | 2 px transparente | 2 px transparente |
| Ícono | tamaño | 24 px (`icon-size-lg`) | 24 px | 24 px |
| Ícono y etiqueta | separación | 10 px | 10 px | 10 px |
| Indicador de carga | tamaño | 20 px, trazo 2 px | 20 px | 20 px |
| Grupo de botones | separación | 8 px (`space-8`) | 8 px | 8 px |

- El relleno del lado del ícono es (alto − 24) / 2: el ícono queda centrado en un círculo, como en Figma.
- El botón solo ícono es cuadrado (`aspect-ratio: 1`, sin relleno): un círculo del alto del botón.

> **Imagen pendiente:** anatomía acotada de los tres tamaños, con etiqueta sola, ícono antes, ícono después y solo ícono.

### Tamaño

| Tamaño | Alto (px / rem) | Uso |
|---|---|---|
| `sm` | 44 / 2,75 | Por defecto. |
| `sm` compacto | 32 / 2 | Con `data-density="compact"` y puntero fino. |
| `md` | 56 / 3,5 | Acción principal de una pantalla móvil o de un paso. |
| `lg` | 72 / 4,5 | Portadas y momentos de marca. |

El alto es mínimo: si la persona agranda el texto, el botón crece.

### Foco

Contorno de 2 px en `focus`, separado 2 px del contenedor, solo con teclado (`:focus-visible`). En alto contraste llega a 7:1.

### Movimiento

Fondo y texto cambian en `duration-fast-01` (70 ms) con `easing-standard-productive`. El indicador de carga gira sin fin; con movimiento reducido se detiene y queda visible al 60 %.

### Contraste

Medido en reposo, puntero encima y presionado, en los 14 casos (7 estilos × 2 roles) y los cuatro temas: todos llegan a 4,5:1 en oscuro y claro, y a 7:1 en alto contraste. El borde del `tertiary` supera 3:1 contra la página.

## Código

### Cargar ALMA

En una página: los tokens (`tokens.css` o `dist/css/alma.css` del repositorio), `components/bundle.css`, React 18 y `components/bundle.js`. El componente queda en `window.AlmaDS.Button`.

```js
const { Button } = window.AlmaDS;
```

El paquete npm y Storybook llegan en la fase 2 de la hoja de ruta.

### Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `variant` | `'filled' \| 'tinted' \| 'gray' \| 'plain' \| 'tertiary' \| 'ghost' \| 'inverse'` | `'filled'` | Estilo (énfasis). `primary` y `secondary` son alias de `filled` y `gray`. |
| `role` | `'normal' \| 'primary' \| 'cancel' \| 'destructive'` | `'normal'` | Significado. `primary` es `type="submit"`. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'sm'` | 44, 56 o 72 px. |
| `iconBefore` / `iconAfter` | nombre de ícono de Carbon | — | Ícono antes o después de la etiqueta. |
| `icon` | nombre de ícono de Carbon | — | Botón solo ícono. Exige `aria-label`. |
| `loading` | `boolean` | `false` | Muestra el indicador y bloquea clics repetidos. |
| `loadingLabel` | `string` | — | Etiqueta mientras carga («Pagando…»). |
| `selected` | `boolean` | — | Convierte el botón en interruptor (`aria-pressed`). |
| `disabled` | `boolean` | `false` | Desactiva el botón. |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` (`'submit'` con rol `primary`) | Tipo nativo. |
| `onClick` | `(e) => void` | — | Acción. |
| `aria-label` | `string` | — | Nombre accesible; obligatorio en solo ícono. |
| `aria-describedby`, `aria-expanded`, `aria-controls`, `aria-haspopup` | — | — | Se pasan al `<button>` (los usan `Tooltip` y `Popover`). |
| `className` | `string` | — | Clase adicional. |

### Ejemplos

**Acción principal de un formulario**

```js
h(Button, { role: 'primary', iconAfter: 'arrow--right' }, 'Continuar')
```

**Par de diálogo: «Cancelar» a la izquierda, acción a la derecha**

```js
h(Button, { variant: 'gray', role: 'cancel', onClick: close }, 'Cancelar'),
h(Button, { role: 'primary', onClick: pay }, 'Pagar $7.000')
```

**Destructivo con confirmación**

```js
h(Button, { variant: 'tinted', role: 'destructive', onClick: askToDelete }, 'Eliminar tarjeta')
```

**Mientras carga**

```js
h(Button, { loading: paying, loadingLabel: 'Pagando…', onClick: pay }, 'Pagar')
```

**Solo ícono**

```js
h(Button, { variant: 'plain', icon: 'trash-can', 'aria-label': 'Eliminar Santiago → Rancagua' })
```

**Interruptor**

```js
h(Button, { selected: fav, iconBefore: fav ? 'favorite--filled' : 'favorite', onClick: toggleFav }, 'Favorito')
```

### HTML y CSS sin React

```html
<button type="button" class="alma-btn alma-btn--filled alma-btn--sm">Continuar</button>
<button type="button" class="alma-btn alma-btn--tinted alma-btn--sm alma-btn--destructive">Eliminar</button>
```

Clases: `alma-btn` + estilo (`--filled`, `--tinted`, `--gray`, `--plain`, `--tertiary`, `--ghost`, `--inverse`) + tamaño (`--sm`, `--md`, `--lg`) + modificadores (`--destructive`, `--icon`, `--lead`, `--trail`, `--loading`).

### Ajustar sin romper

Para cambiar un botón, sobrescribe su token de componente en tu tema, nunca el semántico:

```css
[data-theme="dark"] { --button-filled-bg-hover: var(--primary-600); }
```

### Flutter

Los tokens ya se generan en Dart (`dist/dart/alma_tokens.dart`): `AlmaColors.buttonFilledBg`, `AlmaSpacing`, `AlmaTypography`. El widget llega en la fase 4.

## Accesibilidad

### Qué ofrece ALMA

ALMA resuelve el teclado y la accesibilidad del botón estándar. Hace falta anotar el diseño solo en los casos de la sección siguiente: botones solo ícono, etiquetas repetidas y botones que desaparecen.

#### Comportamiento

- Es un `<button>` nativo: se anuncia como botón, entra en el orden de Tab y responde a Enter y Espacio sin código extra.
- Área táctil mínima de 44 × 44 px (32 px en densidad compacta con mouse, sobre los 24 px de WCAG 2.2).
- Contraste verificado en todos los estados y temas: 4,5:1 en oscuro y claro, 7:1 en alto contraste.
- Foco visible de 2 px, solo con teclado.
- Mientras carga: `aria-busy` y `aria-disabled`, sin perder el foco.
- Como interruptor: `aria-pressed`.
- Solo ícono: avisa en la consola si falta `aria-label` y muestra la etiqueta como tooltip.
- Texto en rem: crece con el tamaño de letra del sistema; probado al 200 %.
- Movimiento reducido: sin animaciones.

#### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Tab / Mayús + Tab | Mueve el foco al botón siguiente o anterior. |
| Enter | Activa el botón. En un formulario, activa el de rol `primary`. |
| Espacio | Activa el botón. |
| Esc | En `Alert` y `Modal`, equivale al botón de rol `cancel`. |

### Recomendaciones de diseño

- **Etiquetas que se entienden solas.** «Eliminar» repetido en cada fila no dice qué elimina: usa `aria-label` con el objeto («Eliminar Santiago → Rancagua»).
- **El color no basta.** El rol destructivo se ve rojo, pero la etiqueta también debe decir lo que hace.
- **No escondas la razón de un botón desactivado.** Muestra cerca por qué no se puede usar, o déjalo activo y explica al pulsar.
- **El foco después de actuar** debe quedar en un lugar lógico: si el botón desaparece (eliminar una fila), mueve el foco al elemento siguiente.
- **El orden visual es el orden de Tab.** No reordenes con CSS lo que el lector de pantalla leerá en otro orden.

#### Etiquetado

| Caso | Qué poner |
|---|---|
| Con etiqueta visible | Nada más: la etiqueta es el nombre. |
| Solo ícono | `aria-label` con el verbo y el objeto. |
| Cargando | `loadingLabel` con lo que está pasando. |
| Con ayuda adicional | `aria-describedby` apuntando al texto de ayuda. |
| Abre un menú o diálogo | `aria-haspopup` y `aria-expanded` (lo hacen `PullDownButton` y `Popover`). |

### Consideraciones de desarrollo

- No imites un botón con un `<div>` o un `<a>` sin `href`: pierdes teclado y lectores de pantalla.
- Si navega, es un enlace (`Link`), no un botón.
- `disabled` saca el botón del orden de Tab; durante una carga ALMA usa `aria-disabled` para mantener el foco.
- Un formulario debe tener un solo botón con rol `primary`.
- Un interruptor se anuncia con `aria-pressed` («true» o «false») o cambiando su nombre junto con el ícono (por ejemplo, «Reproducir» / «Pausar»); no con las dos cosas a la vez.
- Consulta el patrón «Button» de las prácticas de autoría de WAI-ARIA para casos no cubiertos.

### Verificación

- axe (WCAG 2.2 AA y buenas prácticas): cero problemas en los cuatro temas.
- Contraste de 14 combinaciones de estilo y rol en 3 estados y 4 temas: cero fallos.
- Pendiente: prueba con VoiceOver y NVDA.
