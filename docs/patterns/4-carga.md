---
pattern: Carga
summary: Qué mostrar mientras algo tarda.
---

## Elegir según lo que se sabe

| Situación | Usa | Por qué |
|---|---|---|
| Se sabe cuánto falta (subir un archivo) | `ProgressBar` con valor | Muestra el avance real. |
| No se sabe cuánto falta, en una sección | `ProgressBar` sin valor o `ActivityIndicator` | Indica que sigue trabajando. |
| Llega una vista con estructura conocida (una lista, una tarjeta) | `Skeleton` | Muestra la forma antes que el contenido y evita saltos. |
| Una acción de un botón | `loading` del `Button` | La espera queda donde se hizo clic. |
| Una pantalla de marca que se prepara | `ProgressLine` | La línea lima que termina en verde. |

![La vista Mis viajes mientras carga, con Skeleton en el lugar de cada tarjeta, y la misma vista con los datos.](assets/Patrones/carga-skeleton.png)

## Tiempos

| La espera dura | Muestra |
|---|---|
| Menos de 1 segundo | Nada. Un indicador que parpadea distrae más que la espera. |
| De 1 a 10 segundos | Un indicador (`Skeleton`, `ActivityIndicator` o `loading`). |
| Más de 10 segundos | Una barra con avance, qué está pasando y, si se puede, cancelar. |

## Reglas

- **Determinada siempre que se pueda.** Una barra con valor tranquiliza más que un spinner.
- `Skeleton` solo para contenedores y datos; nunca para botones, notificaciones ni toasts.
- El indicador va donde aparecerá el contenido, no en el centro de la pantalla.
- Di qué se está haciendo: «Buscando viajes», no «Cargando».
- Si la carga falla, reemplaza el indicador por el error y una forma de reintentar.
- Marca la zona como ocupada para el lector: `loading` en `Table` (que pone `aria-busy`), `label` en `Skeleton` y `ActivityIndicator`.

## Relacionados

`ProgressBar` · `ActivityIndicator` · `Skeleton` · `ProgressLine` · `Button`.
