---
component: ProgressBar
tab: Uso
summary: Una barra que muestra el avance de una tarea larga.
---


## Resumen

`ProgressBar` muestra cuánto avanzó una tarea: con porcentaje (determinada) o en movimiento (indeterminada). Sigue *Progress indicators* de Apple.

### Cuándo usarla
- Tareas que tardan más de unos segundos: subir archivos, procesar un pago, importar datos.
- **La determinada siempre que se pueda:** ayuda a decidir si esperar, hacer otra cosa o volver después.

### Cuándo no usarla
- **Una acción corta de un botón:** `Button` con `loading`.
- **Una espera sin avance medible y corta:** `ActivityIndicator`.
- **Pasos de un flujo:** `ProgressIndicator`.

## Tipos

| Tipo | Propiedad | Aspecto |
|---|---|---|
| Determinada | `value` entre 0 y 1 | Barra que se llena y porcentaje. |
| Indeterminada | sin `value` | Un tramo que recorre la pista. |
| Terminada | `status: 'success'` o `'error'` | Relleno verde o rojo. |

## Anatomía

1. **Etiqueta** y **porcentaje**, arriba.
2. **Pista.**
3. **Relleno.**
4. **Descripción** (opcional), abajo.

![Tres ProgressBar: una determinada al 60 %, una indeterminada y una con error.](assets/Componentes/progress-bar-estados.png)

## Contenido

- **Etiqueta:** qué tarea es («Subiendo fotos»).
- **Descripción:** el detalle preciso: «Subiendo 3 de 12 fotos», no «Cargando».
- Al terminar con error, la descripción dice qué hacer.

## Comportamiento

- Sé preciso y parejo: no muestres 90% en cinco segundos y el 10% restante en cinco minutos.
- La barra nunca se queda quieta. Si el proceso se detiene, dilo y explica qué hacer.
- Si una tarea indeterminada llega a conocer su duración, pásala a determinada.
- No cambies entre barra e indicador giratorio durante una misma espera.

## Relacionados

`ActivityIndicator` · `ProgressIndicator` · `ProgressLine` · Carga.

## Referencias

- Apple, Human Interface Guidelines: Progress indicators.
- IBM, Carbon Design System: Progress bar.
