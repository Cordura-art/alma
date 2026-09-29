# Button

Botón en píldora de ALMA. Sigue las directrices de botones de Apple: el estilo marca la importancia, el rol marca el significado y el área de toque nunca baja de 44 × 44.

## Estilo: prominencia
De más a menos destacado:
- `filled` (`interactive-01`, lima): la acción más probable de la vista. **Como máximo 1 o 2 por vista.** Alias: `primary`.
- `tinted` (`button-tinted-bg`): una acción importante pero no principal.
- `gray` (`interactive-02`, acero): acciones de apoyo. Alias: `secondary`.
- `plain` (sin fondo, `button-plain-text`): acciones menores, como «Omitir» o «Ver más».
- `ghost` y `inverse`: solo para fondos de marca (imagen, `brand-ink`, `brand-white`).

**Distingue con estilo, no con tamaño.** Dos o más opciones lado a lado van del mismo tamaño; la preferida lleva el estilo más destacado.

## Rol: significado
- `normal` (por defecto): sin significado especial.
- `primary`: la opción por defecto. Se envía con Enter (`type="submit"`) en formularios y diálogos.
- `cancel`: cierra o cancela. En diálogos va a la izquierda del primario.
- `destructive`: borra o pierde datos. Se pinta en rojo (`button-destructive-fill` o `button-destructive-text`), nunca en lima, aunque pidas `filled`. **Una acción destructiva nunca tiene el rol `primary`**, porque la gente toca el botón destacado sin leerlo.

## Contenido
- Empieza con un verbo, en pocas palabras: «Agregar al carrito», no «Carrito». En español usa mayúscula solo al inicio.
- Si el botón abre otra vista o pide más datos, termina en puntos suspensivos: «Editar…».
- Solo ícono (`icon`): usa un ícono conocido de la lista aprobada y `aria-label`, que además se muestra como tooltip.
- No uses en la etiqueta un color parecido al del fondo del contenido.

## Actividad
Si la acción no termina al instante, usa `loading`: un indicador reemplaza al ícono, el botón deja de responder a nuevos clics y puede cambiar el texto con `loadingLabel` («Pagar» → «Pagando…»).

## Tamaño y estados
- `sm` 44 px (por defecto), `md` 56 px, `lg` 72 px. Nunca menos de `size-touch-min`.
- Siempre hay estado presionado (`active-*`) y foco con anillo de 2 px en `focus`, separado 2 px.
- Deshabilitado: fondo `disabled-01` y texto `disabled-03`, que dependen del tema: en oscuro, azul noche apagado; en claro, el gris casi blanco de Figma. Está exento de contraste y nunca lleva información necesaria.
- Todos los estilos y roles pasan 4,5:1 en reposo, al pasar el puntero y al presionar, en los cuatro temas (7:1 en alto contraste). Verificado estado por estado.

## Destructivo: siempre en la familia roja
El rol `destructive` nunca pasa por el lima, en ningún estilo ni estado. Sigue la paleta de peligro de Figma:

| Estilo | Reposo | Puntero | Presionado |
|---|---|---|---|
| `filled` | `button-destructive-fill` (danger 500; 400 en oscuro) | `hover-danger` (danger 600), texto blanco | `active-danger` (danger 700), texto blanco |
| `tinted` | rojo translúcido `button-destructive-tinted-bg` | `button-destructive-tinted-bg-hover` (más opaco) | el mismo + borde interior de 2 px |
| `gray` | acero con texto `active-danger` | acero más claro (`secondary-400`) | acero oscuro, texto blanco |
| `plain` | sin fondo, texto rojo | rojo translúcido | rojo más opaco + borde interior de 2 px |
| `tertiary` | borde y texto rojos | `hover-danger`, texto blanco | `active-danger`, texto blanco |

En `plain` normal, el fondo al pasar el puntero es `tertiary-50` en claro (el hover-row de Figma) y `hover-ui` en oscuro; al presionar suma el borde interior de 2 px.

## Tertiary
Estilo del theme de origen de Cordura (`interactive-03`, como el botón terciario de IBM Carbon): borde de 1 px y texto, sin fondo; al pasar el puntero se rellena con `hover-tertiary` y el texto pasa a `inverse-01`; al presionar, `active-tertiary` con borde interior de 2 px.
- En oscuro el borde y el texto son blancos (`interactive-03`). En claro son azules (`interactive-04`), porque `interactive-03` es blanco y no se vería sobre la página.
- Úsalo para una acción alternativa junto a una principal, cuando `gray` se confunde con el fondo. Como máximo uno por grupo de botones.
