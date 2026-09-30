---
component: Sheet
tab: Uso
summary: Una hoja que sube desde abajo en el teléfono y se centra desde tablet.
---


## Resumen

`Sheet` es un `Modal` pensado para el teléfono: sube desde el borde inferior, al alcance del pulgar, y desde 672 px se muestra centrado como un diálogo. Es la hoja de Apple.

### Cuándo usarlo
- Opciones relacionadas con lo que se está viendo: compartir, filtrar, elegir un medio de pago.
- Una tarea breve que en el teléfono conviene tener abajo.

### Cuándo no usarlo
- **Una advertencia que exige respuesta:** `Alert`.
- **Una tarea con formulario largo:** una página propia.
- **Pocas acciones sobre un elemento:** `PullDownButton`.

## Anatomía

1. **Velo** (`overlay-01`).
2. **Barra de agarre** (solo en el teléfono, decorativa).
3. **Título** y, si hace falta, antetítulo.
4. **Botón Cerrar.**
5. **Cuerpo**, que hace scroll.
6. **Pie** con las acciones, si las hay.

![La misma hoja «Compartir viaje» en el teléfono, pegada abajo, y en tablet, centrada.](assets/Componentes/sheet-dispositivos.png)

## Comportamiento

| Ancho | Posición | Entrada |
|---|---|---|
| Menos de 672 px | Pegada abajo, a todo el ancho, con las esquinas superiores redondeadas. Respeta el área segura inferior. | Sube desde abajo. |
| Desde 672 px | Centrada, 560 px de ancho, esquinas redondeadas. | Receta «invocar», como `Modal`. |

Todo lo demás es igual a `Modal`: el foco queda atrapado, Esc y «Cerrar» cierran, el foco vuelve al botón que la abrió y el fondo no hace scroll.

La barra de agarre no se puede arrastrar: indica que es una hoja, nada más. Para cerrar se usa «Cerrar», Esc o un clic en el velo.

## Contenido

- **Título:** la tarea o el objeto («Compartir viaje»).
- Opciones en una `List` o en botones de ancho completo, la más usada primero.

## Relacionados

`Modal` · `Alert` · `PullDownButton` · `List`.

## Referencias

- Apple, Human Interface Guidelines: Sheets.
- IBM, Carbon Design System: Modal.
