---
component: Button
tab: Accesibilidad
summary: Qué resuelve ALMA, cómo se usa con teclado y qué debe cuidar quien diseña y quien programa.
---

## Qué resuelve ALMA

- Es un `<button>` nativo: se anuncia como botón, entra en el orden de Tab y responde a Enter y Espacio sin código extra.
- Área táctil mínima de 44 × 44 px (32 px en densidad compacta con mouse, sobre los 24 px de WCAG 2.2).
- Contraste verificado en todos los estados y temas: 4,5:1 en oscuro y claro, 7:1 en alto contraste.
- Foco visible de 2 px, solo con teclado.
- Mientras carga: `aria-busy` y `aria-disabled`, sin perder el foco.
- Como interruptor: `aria-pressed`.
- Solo ícono: avisa en la consola si falta `aria-label` y muestra la etiqueta como tooltip.
- Texto en rem: crece con el tamaño de letra del sistema; probado al 200 %.
- Movimiento reducido: sin animaciones.

## Teclado

| Tecla | Acción |
|---|---|
| Tab / Mayús + Tab | Mueve el foco al botón siguiente o anterior. |
| Enter | Activa el botón. En un formulario, activa el de rol `primary`. |
| Espacio | Activa el botón. |
| Esc | En `Alert` y `Modal`, equivale al botón de rol `cancel`. |

## Recomendaciones de diseño

- **Etiquetas que se entienden solas.** «Eliminar» repetido en cada fila no dice qué elimina: usa `aria-label` con el objeto («Eliminar Santiago → Rancagua»).
- **El color no basta.** El rol destructivo se ve rojo, pero la etiqueta también debe decir lo que hace.
- **No escondas la razón de un botón desactivado.** Muestra cerca por qué no se puede usar, o déjalo activo y explica al pulsar.
- **El foco después de actuar** debe quedar en un lugar lógico: si el botón desaparece (eliminar una fila), mueve el foco al elemento siguiente.
- **El orden visual es el orden de Tab.** No reordenes con CSS lo que el lector de pantalla leerá en otro orden.

## Etiquetado

| Caso | Qué poner |
|---|---|
| Con etiqueta visible | Nada más: la etiqueta es el nombre. |
| Solo ícono | `aria-label` con el verbo y el objeto. |
| Cargando | `loadingLabel` con lo que está pasando. |
| Con ayuda adicional | `aria-describedby` apuntando al texto de ayuda. |
| Abre un menú o diálogo | `aria-haspopup` y `aria-expanded` (lo hacen `PullDownButton` y `Popover`). |

## Para quien programa

- No imites un botón con un `<div>` o un `<a>` sin `href`: pierdes teclado y lectores de pantalla.
- Si navega, es un enlace (`Link`), no un botón.
- `disabled` saca el botón del orden de Tab; durante una carga ALMA usa `aria-disabled` para mantener el foco.
- Un formulario debe tener un solo botón con rol `primary`.

## Verificación

- axe (WCAG 2.2 AA y buenas prácticas): cero problemas en los cuatro temas.
- Contraste de 14 combinaciones de estilo y rol en 3 estados y 4 temas: cero fallos.
- Pendiente: prueba con VoiceOver y NVDA.
