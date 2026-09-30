# Sheet

Una hoja que sube desde abajo en el teléfono y se centra desde tablet.


## Uso

### Resumen

`Sheet` es un `Modal` pensado para el teléfono: sube desde el borde inferior, al alcance del pulgar, y desde 672 px se muestra centrado como un diálogo. Es la hoja de Apple.

#### Cuándo usarlo
- Opciones relacionadas con lo que se está viendo: compartir, filtrar, elegir un medio de pago.
- Una tarea breve que en el teléfono conviene tener abajo.

#### Cuándo no usarlo
- **Una advertencia que exige respuesta:** `Alert`.
- **Una tarea con formulario largo:** una página propia.
- **Pocas acciones sobre un elemento:** `PullDownButton`.

### Anatomía

1. **Velo** (`overlay-01`).
2. **Barra de agarre** (solo en el teléfono, decorativa).
3. **Título** y, si hace falta, antetítulo.
4. **Botón Cerrar.**
5. **Cuerpo**, que hace scroll.
6. **Pie** con las acciones, si las hay.

> **Imagen pendiente:** la misma hoja en el teléfono (abajo) y en tablet (centrada), lado a lado.

### Comportamiento

| Ancho | Posición | Entrada |
|---|---|---|
| Menos de 672 px | Pegada abajo, a todo el ancho, con las esquinas superiores redondeadas. Respeta el área segura inferior. | Sube desde abajo. |
| Desde 672 px | Centrada, 560 px de ancho, esquinas redondeadas. | Receta «invocar», como `Modal`. |

Todo lo demás es igual a `Modal`: el foco queda atrapado, Esc y «Cerrar» cierran, el foco vuelve al botón que la abrió y el fondo no hace scroll.

La barra de agarre no se puede arrastrar: indica que es una hoja, nada más. Para cerrar se usa «Cerrar», Esc o un clic en el velo.

### Contenido

- **Título:** la tarea o el objeto («Compartir viaje»).
- Opciones en una `List` o en botones de ancho completo, la más usada primero.

### Relacionados

`Modal` · `Alert` · `PullDownButton` · `List`.

### Referencias

- Apple, Human Interface Guidelines: Sheets.
- IBM, Carbon Design System: Modal.

## Estilo

### Color

Los mismos tokens que `Modal`, más la barra de agarre.

| Elemento | Propiedad | Token |
|---|---|---|
| Velo | fondo | `overlay-01` |
| Contenedor | fondo | `modal-bg` |
| Contenedor | borde (1 px; sin borde inferior en el teléfono) | `modal-border` |
| Barra de agarre | fondo | `border-control` |
| Título | color del texto | `text-01` |
| Descripción | color del texto | `text-02` |
| Contenedor:focus | contorno | `focus` (2 px, separado 2 px) |

### Tipografía

Igual que `Modal`: título 20 px Medium, cuerpo 14 px Regular.

### Estructura

| Elemento | Propiedad | Menos de 672 px | Desde 672 px |
|---|---|---|---|
| Contenedor | ancho | todo el ancho | 560 px |
| Contenedor | radio | `radius-panel` solo arriba | `radius-panel` |
| Contenedor | relleno inferior | el área segura del teléfono | — |
| Velo | margen interior | 0 | 16 px |
| Barra de agarre | tamaño, radio | 36 × 5 px, `radius-pill` | oculta |
| Barra de agarre | separación superior | 8 px | — |

`size` no cambia el ancho de la hoja: desde 672 px mide siempre 560 px.

> **Imagen pendiente:** anatomía acotada en el teléfono.

### Movimiento

| Ancho | Animación |
|---|---|
| Menos de 672 px | Sube desde abajo en `duration-moderate-02` con `easing-entrance-expressive`. |
| Desde 672 px | Receta «invocar» de `Modal`. |

Con movimiento reducido, aparece sin animación.

### Contraste

Igual que `Modal`: verificada con axe en los cuatro temas con la hoja abierta.

## Código

### Uso

```js
const { Sheet, List } = window.AlmaDS;
h(Sheet, { open, onClose: () => setOpen(false), title: 'Compartir viaje' },
  h(List, { 'aria-label': 'Formas de compartir', items: [
    { icon: 'link', title: 'Copiar enlace', onClick: copy },
    { icon: 'email', title: 'Enviar por correo', onClick: mail }] }))
```

### Propiedades

Las mismas de `Modal` (`open`, `onClose`, `title`, `eyebrow`, `description`, `children`, `primaryAction`, `secondaryAction`, `dismissible`, `closeOnOverlay`, `initialFocus`). `Sheet` equivale a `Modal` con `variant: 'sheet'`.

```js
h(Modal, { variant: 'sheet', open, onClose, title: 'Compartir viaje' }, …)
```

### Área segura

En el teléfono, la hoja suma `env(safe-area-inset-bottom)` a su relleno inferior. Para que funcione, la página debe declarar `viewport-fit=cover` en su etiqueta `viewport`.

## Accesibilidad

### Qué ofrece ALMA

Todo lo de `Modal`:
- `role="dialog"` con `aria-modal="true"`, nombrada por su título.
- Foco atrapado, Esc cierra y el foco vuelve al botón que la abrió.
- La página de fondo no hace scroll.
- La barra de agarre es decorativa y los lectores de pantalla no la anuncian.

#### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Tab / Mayús+Tab | Recorre los controles de la hoja, en círculo. |
| Esc | Cierra. |

### Recomendaciones de diseño

- No dependas del gesto de arrastrar para cerrar: ALMA no lo tiene, y quien usa teclado o un lector no lo puede hacer. Deja siempre visible «Cerrar».
- Las opciones dentro de la hoja deben medir al menos 44 px de alto.

### Consideraciones de desarrollo

- Declara `viewport-fit=cover` para que la hoja respete el área segura del teléfono.

### Verificación

axe sin problemas con la hoja abierta, en los cuatro temas. Pendiente: VoiceOver en iPhone y TalkBack.
