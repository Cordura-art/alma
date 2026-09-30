---
component: Tooltip
tab: Accesibilidad
summary: Qué resuelve ALMA en el tooltip y qué falta.
---


## Qué ofrece ALMA

### Comportamiento
- El globo es `role="tooltip"` y el control lo referencia con `aria-describedby`: el lector lee el nombre del control y después la descripción.
- Aparece al enfocar con el teclado, no solo con el cursor.
- Esc lo oculta sin mover el foco (WCAG 1.4.13, descartable).
- Permanece visible mientras el control tiene el cursor o el foco (WCAG 1.4.13, persistente).

### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Tab | Enfoca el control y muestra el tooltip. |
| Esc | Oculta el tooltip. |

## Pendiente

WCAG 1.4.13 también pide que se pueda **pasar el cursor sobre el globo** sin que desaparezca. Hoy el globo no recibe el puntero y se oculta al salir del control, así que no cumple ese punto. Mientras se corrige, no pongas en un tooltip texto que alguien con ampliación de pantalla necesite leer con el cursor encima.

## Recomendaciones de diseño

- Todo lo que dice un tooltip debe existir también en otra parte (una etiqueta, la ayuda): en pantallas táctiles no se ve.
- No pongas enlaces ni botones dentro: no se pueden alcanzar.

## Consideraciones de desarrollo

- El hijo debe ser un solo elemento enfocable. Un ícono suelto o un `<span>` no reciben foco y el tooltip no aparecería con teclado.
- En un botón de solo ícono, el `aria-label` es el nombre y el tooltip la descripción; no los repitas.

## Verificación

axe sin problemas en los cuatro temas; teclado y Esc probados. Pendientes: el punto «se puede pasar el cursor encima» de WCAG 1.4.13, y VoiceOver y NVDA.
