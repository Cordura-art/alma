---
component: ActivityIndicator
tab: Uso
summary: Un indicador giratorio para una espera cuya duración no se conoce.
---


## Resumen

`ActivityIndicator` dice que algo está pasando cuando no se puede medir cuánto falta. Es el *activity indicator* de Apple y el *inline loading* de Carbon.

### Cuándo usarlo
- Mientras algo carga y no hay forma de medir el avance, en una sección o junto a un elemento.
- En la fila de un archivo que se está subiendo (`FileUploader` ya lo usa).

### Cuándo no usarlo
- **Si puedes medir el avance:** `ProgressBar` con valor.
- **Dentro de un botón:** `Button` con `loading`.
- **Mientras llega una vista con estructura conocida:** `Skeleton`.
- **Para esperas de menos de un segundo:** nada.

## Anatomía

Un círculo que gira, del color `control-on`, y un texto que solo oye el lector de pantalla.

![ActivityIndicator a 20, 24 y 40 px, en tema oscuro y claro.](assets/Componentes/activity-indicator-tamanos.png)

## Tamaños

| Tamaño | Uso |
|---|---|
| 20 px | Dentro de filas y controles. |
| 24 px (por defecto) | Junto a texto. |
| 40 px | En el centro de una sección vacía que carga. |

## Contenido

- `label` dice qué se está haciendo: «Verificando pago», no «Cargando».
- Si la espera se alarga, muestra un texto visible al lado.

## Comportamiento

- No cambies entre indicador y barra durante una misma espera: son formas distintas.
- Si la espera falla, reemplázalo por el error y una forma de reintentar.

## Relacionados

`ProgressBar` · `Skeleton` · `Button` (`loading`) · Carga.

## Referencias

- Apple, Human Interface Guidelines: Progress indicators.
- IBM, Carbon Design System: Inline loading.
