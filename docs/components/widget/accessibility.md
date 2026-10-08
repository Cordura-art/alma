---
component: Widget
tab: Accesibilidad
summary: Lo que Widget resuelve y lo que queda en tus manos.
---


## Qué ofrece ALMA

- **Es un artículo con nombre:** su título. Se puede saltar de widget en widget.
- **Un solo acceso, con nombre:** «Abrir Próximo viaje». No hay que adivinar qué se toca.
- **El contenido se lee en orden:** título, contenido, de cuándo es.
- **El contraste no depende del fondo:** el vidrio medio lo asegura.
- **La espera se anuncia:** «Cargando Clima en Viña».

## Teclado

| Tecla | Qué hace |
|---|---|
| Tab | Llega al widget, y a sus controles si los tiene. |
| Enter | Abre la app. |

## Recomendaciones de diseño

- El dato principal se entiende sin el resto: «08:30» junto a «Viña del Mar», no solo «08:30».
- No dependas del color para decir un estado. «Atrasado» se escribe.
- No pongas en un widget nada que la persona no querría que vea quien pasa.

## Consideraciones de desarrollo

- No anuncies cada actualización: un widget se consulta, no avisa. Para avisar está `ToastRegion`.
- Pasa siempre `updated` si el dato puede estar viejo.

Pendiente: VoiceOver y NVDA.
