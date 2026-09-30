---
component: ProgressIndicator
tab: Uso
summary: Los pasos de un flujo de varias pantallas.
---


## Resumen

`ProgressIndicator` muestra en qué paso de un flujo está la persona, cuáles terminó y cuáles faltan. Sigue el *progress indicator* de Carbon.

### Cuándo usarlo
- Flujos de 3 a 6 pasos: comprar un pasaje, crear una cuenta, verificar identidad.

### Cuándo no usarlo
- **El avance de una sola tarea:** `ProgressBar`.
- **Pasos que se pueden hacer en cualquier orden:** `Tabs` o una lista.
- **Dos pasos:** no hace falta.

## Estados de cada paso

| Estado | Ícono | Uso |
|---|---|---|
| Completado | `checkmark--outline` | Terminado; se puede volver si hay `onSelect`. |
| Actual | `incomplete` | Donde está la persona. |
| Pendiente | `circle-dash` | Todavía no; no se puede abrir. |
| Con error | `warning` | Hay algo que corregir. |

## Anatomía

1. **Línea** del paso (arriba en horizontal, a la izquierda en vertical).
2. **Ícono** del estado.
3. **Nombre** del paso.
4. **Descripción** (opcional).

![ProgressIndicator de la compra de un pasaje en cuatro pasos (viaje, asientos, pasajeros y pago), con el tercero en curso, en horizontal y en vertical.](assets/Componentes/progress-indicator-compra.png)

## Contenido

- Nombres de una o dos palabras, con sustantivo: «Viaje», «Asientos», «Pasajeros», «Pago».
- La descripción, solo si ayuda: un dato ya elegido («Semicama, asiento 14»).

## Comportamiento

- Con `onSelect`, los pasos completados se pueden abrir para corregir; los pendientes nunca.
- Bajo 672 px se ve siempre en columna.

## Relacionados

`ProgressBar` · Formularios.

## Referencias

- IBM, Carbon Design System: Progress indicator.
