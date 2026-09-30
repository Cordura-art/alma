---
component: Tabs
tab: Accesibilidad
summary: Qué resuelve ALMA en las pestañas.
---


## Qué ofrece ALMA

### Comportamiento
- La lista es `role="tablist"`, nombrada por `label`; cada pestaña es `role="tab"` con `aria-selected` y `aria-controls`; el panel es `role="tabpanel"`, nombrado por su pestaña.
- Solo la pestaña activa entra en el orden de Tab (*roving tabindex*): Tab salta de la lista al panel.
- El panel recibe foco, así el contenido que no tiene controles también se puede alcanzar.
- La pestaña activa se distingue por el indicador, no solo por el color.

### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Tab | Entra a la pestaña activa y luego pasa al panel. |
| → / ← | Activa la pestaña siguiente o anterior, en círculo. |
| Inicio / Fin | Activa la primera o la última. |

Las flechas activan la pestaña al instante: los paneles deben cargar rápido. Si un panel tarda, muestra un estado de carga dentro.

## Recomendaciones de diseño

- Dale siempre un `label` que diga de qué son las pestañas («Detalle del viaje»).

## Consideraciones de desarrollo

- No pongas pestañas dentro de otras pestañas.
- Si guardas la pestaña elegida, restáurala sin mover el foco.

## Verificación

axe sin problemas en los cuatro temas; teclado probado. Pendiente: VoiceOver y NVDA.
