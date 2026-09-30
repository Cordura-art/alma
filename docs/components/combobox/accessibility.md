---
component: Combobox
tab: Accesibilidad
summary: Qué resuelve ALMA en el campo con lista y cómo se usa con teclado.
---

## Qué ofrece ALMA

Sigue el patrón «combobox con lista y autocompletado» de las prácticas de autoría de WAI-ARIA.

### Comportamiento
- El campo es `role="combobox"` con `aria-expanded`, `aria-controls` y `aria-activedescendant`: el foco se queda en el campo mientras las flechas recorren la lista.
- La lista es `role="listbox"`; en múltiple, `aria-multiselectable`. Cada opción anuncia si está elegida (`aria-selected`).
- «Sin resultados» se anuncia como estado (`role="status"`).
- El botón de la lista queda fuera del orden de Tab (el teclado usa las flechas) y tiene nombre («Mostrar opciones» / «Ocultar opciones»).
- Cada etiqueta en múltiple tiene un botón «Quitar …» con área de toque de 32 px.

### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Escribir | Filtra y abre la lista. |
| ↓ / ↑ | Abre la lista y recorre las opciones. |
| Enter | Elige la opción activa. |
| Esc | Cierra la lista; con la lista cerrada, borra lo escrito. |
| Retroceso (múltiple, campo vacío) | Quita la última elección. |
| Tab | Cierra la lista y sale. |

## Recomendaciones de diseño

- La etiqueta dice qué se elige; la ayuda, cómo buscar.
- El mensaje sin resultados propone qué hacer.
- En múltiple, si puede haber muchas elecciones, muéstralas también fuera del campo (por ejemplo, en una lista resumen).

## Consideraciones de desarrollo

- Si cargas opciones desde un servidor, anuncia la carga y el resultado con el mismo estado.
- No cambies el foco a la lista: el patrón mantiene el foco en el campo.

## Verificación

axe sin problemas en los cuatro temas con la lista abierta; recorrido completo con teclado probado. Pendiente: VoiceOver y NVDA.
