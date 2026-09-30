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

1. **Contenedor.** Píldora (`radius-pill`) con el color del estilo. `plain` no tiene contenedor visible y `tertiary` solo tiene contorno.
2. **Etiqueta.** Texto centrado en una línea.
3. **Ícono (opcional).** Antes o después de la etiqueta. Un botón puede ser **solo ícono**: entonces es un círculo y necesita nombre accesible.

### Tamaños

| Tamaño | Alto | Cuándo |
|---|---|---|
| `sm` (por defecto) | 44 px | Casi toda la interfaz: formularios, diálogos, tarjetas, barras. Es el área táctil mínima de Apple. |
| `md` | 56 px | Acción principal de una pantalla móvil o de un paso de un flujo (pagar, continuar). |
| `lg` | 72 px | Portadas y momentos de marca. |

Con densidad compacta (`data-density="compact"`) y puntero fino, `sm` baja a 32 px. No mezcles tamaños dentro de un mismo grupo de botones: usa el estilo, no el tamaño, para marcar la jerarquía.

### Énfasis y jerarquía

- **Una acción de alto énfasis por vista.** Una sola `filled` deja claro qué es lo principal. Si todo es lima, nada lo es.
- **Baja el énfasis en lo repetido.** Donde hay muchas acciones (tablas, listas, paneles), usa `plain` o `tertiary`.
- **Agrupa solo acciones relacionadas.** Un grupo es un conjunto de alternativas para el mismo momento, no una colección de botones sueltos.
- **No toda vista necesita una acción `filled`.** Una vista de lectura o un listado puede no tener acción principal.

### Alineación y orden

| Contexto | Alineación | Orden |
|---|---|---|
| Diálogos (`Alert`, `Modal`, `Sheet`) | A la derecha; en el teléfono ocupan el ancho. | «Cancelar» a la izquierda, la acción a la derecha. Con tres botones en `Alert`, apilados: la acción por defecto arriba y «Cancelar» abajo. |
| Formularios en la página | A la izquierda, alineados con los campos. | La acción principal primero. |
| Flujos por pasos | Abajo a la derecha. | «Volver» (`gray`) antes de «Continuar» (`filled`). |
| Tarjetas | Abajo, alineados con el contenido. | La acción más importante primero. |
| Barras de herramientas | A la derecha del título. | Solo `plain`; el resto en «Más». |
| Teléfono | Ancho completo cuando el botón es la acción principal de la pantalla. | Apilados si no caben lado a lado. |

### Grupos de botones

- Como máximo tres botones por grupo; lo demás va a un `PullDownButton`.
- Mismo tamaño dentro del grupo, 8 px entre botones (`space-8`).
- Una sola acción `filled` por grupo. Combinaciones recomendadas: `filled` + `gray`, `filled` + `tinted`, `filled` + `tertiary`, `filled` + `plain`.
- Evita dos `filled` juntas, `tinted` + `tertiary` sin una principal, y un botón destructivo como única opción visible sin «Cancelar».

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
| Presionado | Fondo del paso siguiente; en `plain`, `tinted` destructivo y `tertiary`, además un borde interior de 2 px. |
| Foco de teclado | Anillo de 2 px en `focus`, separado 2 px. Solo con teclado (`:focus-visible`). |
| Cargando | Un indicador reemplaza al ícono, el botón deja de responder y se anuncia como ocupado. |
| Desactivado | Fondo `button-disabled-bg`, texto `button-disabled-text`. |

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

### Color

Cada estilo usa sus tokens de componente (`button-*`), que apuntan a la capa semántica. Cambia el token de componente para ajustar un botón sin tocar el resto del sistema.

#### Estilos normales

| Estilo | Reposo | Puntero encima | Presionado |
|---|---|---|---|
| `filled` | Fondo `button-filled-bg` (`interactive-01`), texto `button-filled-text` | `button-filled-bg-hover` (`hover-primary`) | `button-filled-bg-active` (`active-primary`), texto `button-filled-text-active` |
| `tinted` | Fondo `button-tinted-bg` (lima translúcido), texto `button-tinted-text` | `button-tinted-bg-hover` | Fondo de reposo al 80 % |
| `gray` | Fondo `button-gray-bg` (`interactive-02`), texto `button-gray-text` | `button-gray-bg-hover` (`hover-secondary`) | `button-gray-bg-active` (`active-secondary`), texto `button-gray-text-active` |
| `tertiary` | Sin fondo; texto y borde de 1 px `button-tertiary-text` (`interactive-03` en oscuro, `interactive-04` en claro) | Fondo `button-tertiary-bg-hover` (`hover-tertiary`), texto `inverse-01` | `button-tertiary-bg-active` (`active-tertiary`) + borde interior de 2 px |
| `plain` | Sin fondo, texto `button-plain-text` | `button-plain-bg-hover` (`hover-ui` en oscuro, `tertiary-50` en claro) | Mismo fondo + borde interior de 2 px |
| `ghost` | `button-ghost-bg`, texto `button-ghost-text` | `button-ghost-bg-hover` | `button-ghost-bg-active` |
| `inverse` | `button-inverse-bg`, texto `button-inverse-text` | `button-inverse-bg-hover` | `button-inverse-bg-active`, texto `button-inverse-text-active` |

#### Destructivos

Siempre en la familia roja de la paleta de peligro, nunca en lima.

| Estilo | Reposo | Puntero encima | Presionado |
|---|---|---|---|
| `filled` | `button-destructive-fill` (danger 500; 400 en oscuro) | `button-destructive-bg-hover` (danger 600), texto blanco | `button-destructive-bg-active` (danger 700), texto blanco |
| `tinted` | Rojo translúcido `button-destructive-tinted-bg`, texto `button-destructive-text` | `button-destructive-tinted-bg-hover` | El mismo + borde interior de 2 px |
| `gray` | Fondo acero, texto `button-destructive-gray-text` | `button-destructive-gray-bg-hover` (`secondary-400`) | Acero oscuro, texto blanco |
| `plain` | Texto `button-destructive-text` | `button-destructive-plain-bg-hover` | `button-destructive-plain-bg-active` + borde interior de 2 px |
| `tertiary` | Borde y texto `button-destructive-text` | `hover-danger`, texto blanco | `active-danger`, texto blanco |

#### Desactivado

Fondo `button-disabled-bg` (`disabled-01`) y texto `button-disabled-text` (`disabled-03`). Está exento de contraste según WCAG, así que nunca lleva información necesaria.

### Tipografía

Roboto Flex, extendida (`wdth` 150), peso 400, en una línea.

| Tamaño | Tamaño de letra | Interlineado | Espaciado |
|---|---|---|---|
| `sm` | 0,6875 rem (11 px) | 1,4 | 0,165 px |
| `md` | 0,875 rem (14 px) | 1,4 | 0,14 px |
| `lg` | 1 rem (16 px) | 1,4 | 0,16 px |

Los tamaños van en rem: crecen con el tamaño de texto que elige la persona. Probado al 200 %.

### Estructura

| Medida | `sm` | `md` | `lg` |
|---|---|---|---|
| Alto mínimo | 44 px (32 px compacto) | 56 px | 72 px |
| Relleno lateral | 16 px | 24 px | 32 px |
| Relleno del lado del ícono | 10 px | 16 px | 24 px |
| Ícono | 24 px | 24 px | 24 px |
| Separación ícono–etiqueta | 10 px | 10 px | 10 px |

- **Radio:** `radius-pill` en todos los tamaños.
- **Borde:** 2 px transparente, reservado para que los estados con borde no muevan el contenido.
- **Relleno del lado del ícono:** (alto − 24) / 2, para que el ícono quede centrado en un círculo, como en Figma.
- **Solo ícono:** cuadrado (`aspect-ratio: 1`) sin relleno, así que es un círculo del alto del botón.
- **Ancho:** lo define la etiqueta. En el teléfono, la acción principal de la pantalla puede ocupar el ancho completo.
- **Grupos:** 8 px entre botones (`space-8`).

### Foco

Anillo de 2 px en `focus`, separado 2 px del botón, solo con teclado. En alto contraste el color del foco llega a 7:1.

### Movimiento

Color de fondo y texto con `duration-fast-01` (70 ms) y `easing-standard-productive`. El indicador de carga gira sin fin; con movimiento reducido se detiene y queda visible.

### Temas y contraste

Medido estado por estado (reposo, puntero encima, presionado) en los 14 casos (7 estilos × 2 roles) y los cuatro temas:

| Tema | Mínimo exigido | Resultado |
|---|---|---|
| Oscuro | 4,5:1 | Todos cumplen |
| Claro | 4,5:1 | Todos cumplen |
| Oscuro alto contraste | 7:1 | Todos cumplen |
| Claro alto contraste | 7:1 | Todos cumplen |

El borde del `tertiary` supera 3:1 contra la página en los cuatro temas.

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

### Qué resuelve ALMA

- Es un `<button>` nativo: se anuncia como botón, entra en el orden de Tab y responde a Enter y Espacio sin código extra.
- Área táctil mínima de 44 × 44 px (32 px en densidad compacta con mouse, sobre los 24 px de WCAG 2.2).
- Contraste verificado en todos los estados y temas: 4,5:1 en oscuro y claro, 7:1 en alto contraste.
- Foco visible de 2 px, solo con teclado.
- Mientras carga: `aria-busy` y `aria-disabled`, sin perder el foco.
- Como interruptor: `aria-pressed`.
- Solo ícono: avisa en la consola si falta `aria-label` y muestra la etiqueta como tooltip.
- Texto en rem: crece con el tamaño de letra del sistema; probado al 200 %.
- Movimiento reducido: sin animaciones.

### Teclado

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

### Etiquetado

| Caso | Qué poner |
|---|---|
| Con etiqueta visible | Nada más: la etiqueta es el nombre. |
| Solo ícono | `aria-label` con el verbo y el objeto. |
| Cargando | `loadingLabel` con lo que está pasando. |
| Con ayuda adicional | `aria-describedby` apuntando al texto de ayuda. |
| Abre un menú o diálogo | `aria-haspopup` y `aria-expanded` (lo hacen `PullDownButton` y `Popover`). |

### Para quien programa

- No imites un botón con un `<div>` o un `<a>` sin `href`: pierdes teclado y lectores de pantalla.
- Si navega, es un enlace (`Link`), no un botón.
- `disabled` saca el botón del orden de Tab; durante una carga ALMA usa `aria-disabled` para mantener el foco.
- Un formulario debe tener un solo botón con rol `primary`.

### Verificación

- axe (WCAG 2.2 AA y buenas prácticas): cero problemas en los cuatro temas.
- Contraste de 14 combinaciones de estilo y rol en 3 estados y 4 temas: cero fallos.
- Pendiente: prueba con VoiceOver y NVDA.
