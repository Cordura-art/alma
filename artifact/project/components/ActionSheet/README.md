# ActionSheet

Las opciones de una acción que la persona inició, antes de que termine.


## Uso

### Resumen

`ActionSheet` aparece cuando una acción que la persona empezó necesita que elija cómo sigue. Cerró un mensaje a medio escribir: ¿guardar el borrador o descartarlo? Es la *action sheet* de Apple.

Antes de usarla, lee el patrón **Menús**.

### Cuándo usarla

- Para ofrecer dos o tres maneras de terminar una acción.
- Para confirmar una acción destructiva que la persona eligió en un menú: «Eliminar tarjeta».

### Cuándo no

- **Para avisar de un problema o de un cambio que la persona no esperaba.** Eso es un `Alert`.
- **Para una lista de acciones sobre un ítem.** Eso es un `PullDownButton` o un `ContextMenu`.
- **Para pedir datos.** Eso es un `Sheet` o un `Modal`, con su formulario.
- **Seguido.** Interrumpe. Si se puede deshacer, deja hacer y ofrece «Deshacer».

### Hoja de acción o alerta

| | `ActionSheet` | `Alert` |
|---|---|---|
| La provoca | Algo que la persona hizo. | Algo que pasó. |
| Ofrece | Maneras de seguir. | Aceptar, o confirmar y cancelar. |
| Se ubica | Abajo, cerca del pulgar. Al centro en pantalla ancha. | Al centro. |
| Ejemplo | «¿Guardar el borrador?» | «No se pudo enviar el mensaje.» |

### Anatomía

1. **Título:** una línea. La pregunta.
2. **Mensaje** (opcional): solo si el título y el contexto no alcanzan.
3. **Acción destructiva:** arriba, en rojo.
4. **Otras acciones.**
5. **Cancelar:** abajo, separada.

![Anatomía de ActionSheet: el título «¿Qué hacemos con el borrador?» (1), un mensaje breve (2), la acción destructiva «Descartar borrador» arriba y en rojo (3), «Guardar borrador» debajo (4) y, separada al final, «Seguir escribiendo» (5).](assets/Componentes/action-sheet-anatomia.png)

### Contenido

- **El título cabe en una línea.** Uno largo no se lee rápido.
- **El mensaje, solo si hace falta.**
- **Cada botón dice lo que hace:** «Descartar borrador», no «Sí».
- **Siempre hay cómo arrepentirse.** Si alguna opción destruye datos, hay un «Cancelar», al final. Dice lo que pasa al cancelar si ayuda: «Seguir escribiendo».
- **Hasta cuatro opciones**, sin contar cancelar. Con más, es un menú.

### Comportamiento

- Tapa el resto con un velo. Tocar el velo, o Esc, es cancelar.
- El foco entra a «Cancelar»: lo seguro es lo que queda bajo Enter.
- En una pantalla angosta sube desde abajo. En una ancha, queda al centro.

### Relacionados

`Alert` · `Sheet` · `Modal` · `PullDownButton` · Menús · Diálogos · Deshacer.

### Referencias

- Apple, Human Interface Guidelines: Action sheets.

## Estilo

### Color

| Elemento | Propiedad | Token |
|---|---|---|
| Hoja | fondo y borde | `alert-bg` y `alert-border` |
| Velo | fondo | `overlay-01` |
| Título | color del texto | `text-01` |
| Mensaje | color del texto | `text-02` |
| Acciones | — | `Button` `tinted` |
| Acción destructiva | — | `Button` `tinted` con rol destructivo |
| Cancelar | — | `Button` `gray` |

### Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso |
|---|---|---|
| Título | 16 / 1 | `font-weight-emphasis` |
| Mensaje | 14 / 0,875 | `font-weight-body` |
| Botones | Los de `Button` `md` | — |

El título y el mensaje van centrados.

### Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Hoja | ancho máximo | 24 rem |
| Hoja | relleno | `space-16` |
| Hoja | radio | `radius-panel` |
| Botones | ancho | Todo el de la hoja |
| Botones | separación | `space-8` |
| Cancelar | separación de los demás | `space-16` |
| Hoja y borde de la pantalla | distancia | `space-16` |

### Movimiento

Entra con `duration-moderate-02` y `easing-entrance-expressive`. Con movimiento reducido aparece sin moverse.

## Código

### Uso

```js
const { ActionSheet } = window.AlmaDS;

h(ActionSheet, {
  open: abierta,
  title: '¿Qué hacemos con el borrador?',
  actions: [
    { label: 'Guardar borrador', onPress: guardar },
    { label: 'Descartar borrador', role: 'destructive', onPress: descartar },
    { label: 'Seguir escribiendo', role: 'cancel', onPress: cerrar }]
})
```

El orden en que las escribes no importa: la destructiva va arriba y «cancelar» abajo.

### Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `open` | sí o no | no | Si se muestra. |
| `title` | texto | — | La pregunta, en una línea. |
| `message` | texto | — | Una aclaración, si hace falta. |
| `actions` | `[{ label, role, icon, disabled, onPress }]` | — | Las opciones. `role`: `destructive` o `cancel`. |
| `onDismiss` | función | — | Se llama con Esc o al tocar el velo, si no hay una acción `cancel`. |
| `aria-label` | texto | «Opciones» | El nombre, si no hay título. |
| `inline` | sí o no | no | La dibuja en su lugar, sin velo: para documentar. |

Con Esc o al tocar el velo se llama al `onPress` de la acción `cancel`.

## Accesibilidad

### Qué ofrece ALMA

- **Es un diálogo modal** con nombre: su título. El mensaje se lee como su descripción.
- **Atrapa el foco** mientras está abierta, y lo devuelve a donde estaba al cerrar.
- **El foco entra a «Cancelar».** Enter no destruye nada por accidente.
- **Esc cancela.**
- **El orden de lectura es el de la vista:** título, mensaje, la acción destructiva, las demás, cancelar.
- **Los botones miden 44 px de alto.**

### Teclado

| Tecla | Qué hace |
|---|---|
| Tab, Mayúsculas + Tab | Recorren los botones, sin salir de la hoja. |
| Enter, Espacio | Activa el botón con el foco. |
| Esc | Cancela. |

### Recomendaciones de diseño

- Cada botón se entiende sin leer el título: «Descartar borrador», no «Descartar».
- La acción destructiva se reconoce por su texto, no solo por el rojo.
- Pon siempre un «Cancelar». Sin él, quien llegó por error no tiene salida.

### Consideraciones de desarrollo

- Ábrela como respuesta a algo que la persona hizo, nunca sola.
- Al cerrar, el foco vuelve al control que la provocó. Si ese control ya no existe, llévalo tú a un lugar que tenga sentido.

Pendiente: VoiceOver y NVDA.
