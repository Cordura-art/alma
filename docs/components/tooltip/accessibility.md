---
component: Tooltip
tab: Accesibilidad
summary: Qué resuelve ALMA en el tooltip.
---


## Qué ofrece ALMA

### Comportamiento
- El globo es `role="tooltip"` y el control lo referencia con `aria-describedby`: el lector lee el nombre del control y después la descripción.
- Aparece al enfocar con el teclado, no solo con el cursor.
- Esc lo oculta sin mover el foco (WCAG 1.4.13, descartable).
- Permanece visible mientras el control tiene el cursor o el foco (WCAG 1.4.13, persistente).
- Se puede pasar el cursor del control al globo sin que desaparezca: el globo recibe el puntero y un puente invisible cubre los 8 px de separación (WCAG 1.4.13, se puede recorrer). Así, quien usa ampliación de pantalla puede leerlo con el cursor encima.

### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Tab | Enfoca el control y muestra el tooltip. |
| Esc | Oculta el tooltip. |

## Recomendaciones de diseño

- Todo lo que dice un tooltip debe existir también en otra parte (una etiqueta, la ayuda): en pantallas táctiles no se ve.
- No pongas enlaces ni botones dentro: no se pueden alcanzar.

## Consideraciones de desarrollo

- El hijo debe ser un solo elemento enfocable. Un ícono suelto o un `<span>` no reciben foco y el tooltip no aparecería con teclado.
- En un botón de solo ícono, el `aria-label` es el nombre y el tooltip la descripción; no los repitas.

## Verificación

axe sin problemas en los cuatro temas; teclado, Esc y paso del cursor al globo probados. Pendiente: VoiceOver y NVDA.
