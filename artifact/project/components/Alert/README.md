# Alert

Un diálogo que interrumpe para comunicar algo importante y pedir una decisión.


## Uso

### Resumen

`Alert` interrumpe para decir algo esencial y pedir una decisión con dos o tres respuestas. Sigue las alertas de Apple. Úsala poco: cada alerta detiene lo que la persona estaba haciendo.

#### Cuándo usarla
- Antes de una acción destructiva poco común que **no** se puede deshacer.
- Cuando algo falló y hay una forma útil de seguir («Reintentar»).
- Cuando falta un dato imprescindible para continuar, como una contraseña.

#### Cuándo no usarla
- **Para informar sin pedir nada:** `InlineNotification` o `toast`.
- **Para acciones comunes que se pueden deshacer**, aunque borren algo: deja deshacer.
- **Al abrir la app.**
- **Para ofrecer opciones después de una acción elegida:** `Sheet` o `PullDownButton`.
- **Para una tarea con varios campos:** `Modal`.

### Anatomía

1. **Velo** (`overlay-01`).
2. **Título:** qué pasó y por qué.
3. **Mensaje** (opcional).
4. **Campo** (opcional): solo si hace falta un dato.
5. **Botones:** hasta 3.

![Anatomía de Alert: una alerta con dos botones y otra con tres botones apilados. Numerados: velo (1), título (2), mensaje (3), campo (4) y botones (5).](assets/Componentes/alert-anatomia.png)

### Botones

| Rol | Aspecto | Uso |
|---|---|---|
| `default` | `Button` filled | La opción más probable. Recibe el foco al abrir. |
| `cancel` | `Button` gray | Siempre se llama «Cancelar». Nunca es la opción por defecto. |
| `destructive` | `Button` tinted rojo | Solo para una acción destructiva que la persona **no** eligió deliberadamente. |
| `normal` | `Button` tinted | Otra opción. |

- **Dos botones:** en fila, del mismo ancho. «Cancelar» a la izquierda y la opción por defecto a la derecha.
- **Tres botones:** apilados, a todo el ancho. La opción por defecto arriba y «Cancelar» abajo.
- Si hay una acción destructiva, incluye siempre «Cancelar».
- Si quieres que la persona lea antes de actuar, no marques ninguna opción por defecto: el foco va a «Cancelar».

![El orden de los botones de Alert: en fila, «Cancelar» a la izquierda y la acción a la derecha; apilados, la acción por defecto arriba y «Cancelar» abajo.](assets/Componentes/alert-orden.png)

### Contenido

- **Título:** concreto, de hasta dos líneas. Nunca «Error» ni un código. Oración completa con puntuación, o fragmento sin punto final.
- **Mensaje:** solo si aporta, en oraciones completas. No expliques los botones.
- **Botones:** una o dos palabras que empiecen con verbo y digan el resultado («Eliminar», «Reintentar»). «Aceptar» solo en alertas puramente informativas; nunca «Sí» ni «No».
- Tono directo, neutral y cercano. No culpes a la persona.

| Mejor | Evitar |
|---|---|
| «No se pudo pagar con la tarjeta terminada en 4821» | «Error 402» |
| «¿Eliminar la tarjeta terminada en 4821?» + «Eliminar» | «¿Está seguro?» + «Sí» |

### Comportamiento

- Esc equivale a «Cancelar»; sin «Cancelar», llama a `onDismiss`.
- El foco queda atrapado en la alerta y vuelve a donde estaba al cerrar.
- Un clic en el velo no la cierra.
- Evita alertas que necesiten scroll: título corto, mensaje breve.

### Relacionados

`Modal` · `InlineNotification` · `toast` · `Sheet`.

### Referencias

- Apple, Human Interface Guidelines: Alerts.
- IBM, Carbon Design System: Modal (danger).

## Estilo

### Color

| Elemento | Propiedad | Token |
|---|---|---|
| Velo | fondo | `overlay-01` |
| Contenedor | fondo | `alert-bg` |
| Contenedor | borde (1 px) | `alert-border` |
| Título | color del texto | `text-01` |
| Mensaje | color del texto | `text-02` |
| Botón por defecto | estilo | `Button` filled |
| Botón Cancelar | estilo | `Button` gray |
| Botón destructivo | estilo | `Button` tinted, rol destructive |
| Otro botón | estilo | `Button` tinted |

### Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso | Interlineado | Estilo de texto |
|---|---|---|---|---|
| Título | 20 / 1,25 | `font-weight-heading` | 1,4 | — |
| Mensaje | 14 / 0,875 | `font-weight-body` | 1,72 | `web-body-m` |

### Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Contenedor | ancho máximo | 360 px (22,5 rem) |
| Contenedor | relleno, radio | 24 px, `radius-panel` |
| Título y mensaje | separación | 8 px |
| Mensaje y campo | separación | 16 px |
| Texto y botones | separación | 24 px |
| Botones | separación | 8 px |
| Botones en fila | ancho | repartido en partes iguales |
| Botones apilados | ancho | 100 % |

![Medidas de Alert en fila y apilada: ancho, relleno, separación entre título y mensaje, entre texto y botones, y entre botones.](assets/Componentes/alert-medidas.png)

### Capas y movimiento

Velo y alerta en `z-modal`. La alerta aparece con la receta «invocar» de IBM: `duration-moderate-02` con `easing-standard-expressive`. Con movimiento reducido, sin animación.

### Contraste

Textos a 4,5:1 (7:1 en alto contraste) sobre `alert-bg`, verificado en los cuatro temas.

## Código

### Uso

```js
const { Alert } = window.AlmaDS;
h(Alert, { open, title: '¿Eliminar la tarjeta terminada en 4821?',
  message: 'Tendrás que ingresarla de nuevo para pagar con ella.',
  actions: [
    { label: 'Cancelar', role: 'cancel', onPress: () => setOpen(false) },
    { label: 'Eliminar', role: 'destructive', onPress: remove }] })
```

### Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `open` | `boolean` | — | Muestra u oculta la alerta. |
| `title` | `string` | — | Qué pasó. Nombra al diálogo. |
| `message` | `string` | — | Lo describe. |
| `actions` | `Array<{ label, role, onPress }>` | — | Hasta 3. `role`: `default`, `cancel`, `destructive` o `normal`. |
| `onDismiss` | `() => void` | — | Esc cuando no hay «Cancelar». |
| `children` | `node` | — | Un campo, si hace falta un dato. |
| `stacked` | `boolean` | `true` con 3 botones | Apila dos botones cuyas etiquetas no caben en fila. |
| `inline` | `boolean` | `false` | Solo para documentación: dibuja la alerta sin velo. |

ALMA ordena los botones según su rol: no importa el orden en que los pases.

### Con un campo

```js
h(Alert, { open, title: 'Confirma tu contraseña para ver la tarjeta',
  actions: [{ label: 'Cancelar', role: 'cancel', onPress: close }, { label: 'Confirmar', role: 'default', onPress: check }] },
  h(TextInput, { label: 'Contraseña', type: 'password' }))
```

## Accesibilidad

### Qué ofrece ALMA

#### Comportamiento
- `role="alertdialog"` con `aria-modal="true"`: el lector la anuncia como alerta, con el título (`aria-labelledby`) y el mensaje (`aria-describedby`).
- Al abrir, el foco va a la opción por defecto, o a «Cancelar» si no hay ninguna.
- El foco queda atrapado: Tab y Mayús+Tab recorren solo los botones y el campo.
- Al cerrar, el foco vuelve a donde estaba.

#### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Tab / Mayús+Tab | Recorre los controles, en círculo. |
| Enter o Espacio | Activa el botón con foco. |
| Esc | Equivale a «Cancelar». |

### Recomendaciones de diseño

- El rojo del botón destructivo acompaña a la palabra, nunca la reemplaza: el verbo dice qué pasa.
- Nada de información esencial solo en el color o en un ícono.

### Consideraciones de desarrollo

- `inline` quita el velo y `aria-modal`: es para mostrar la alerta en la documentación, no para producto.
- Si la acción tarda, cierra la alerta y muestra el progreso en la página; una alerta no lleva indicadores de carga.

### Verificación

axe sin problemas en los cuatro temas; foco, orden y teclado probados. Pendiente: VoiceOver y NVDA.
