---
pattern: Ajustes
summary: Dónde van las preferencias de una persona, cuántas ofrecer y cuándo se aplican.
---

## Cuándo

Para lo que una persona decide una vez y deja así: idioma, tema, avisos, privacidad, cuenta.

Un ajuste es una decisión que el diseño no tomó. Antes de agregar uno, busca un buen valor por defecto. Mientras menos ajustes, mejor.

## Dónde va cada cosa

| Qué es | Dónde va |
|---|---|
| Algo que se cambia mientras se hace una tarea (ordenar, filtrar, ver como lista). | Ahí mismo, junto a la tarea. No en Ajustes. |
| Una preferencia general, que se cambia rara vez. | En Ajustes. |
| Lo que el sistema ya sabe (tema claro u oscuro, idioma, movimiento reducido). | Se sigue al sistema. Se ofrece como ajuste solo para cambiarlo aquí. |

## Estructura

- **Grupos con nombre**, de lo más usado a lo menos usado: Cuenta, Avisos, Apariencia, Privacidad.
- **Una fila por ajuste**, en `List`: el nombre a la izquierda y el control o el valor actual a la derecha.
- **Con muchos ajustes**, navegación propia: `Sidebar` desde `bp-lg`, una lista que lleva a cada grupo en el teléfono. Y un `SearchField` arriba.
- **Lo peligroso, al final** y separado: cerrar sesión, eliminar la cuenta.

![La página de Ajustes en dos pantallas. En escritorio: Sidebar con los grupos Cuenta, Avisos, Apariencia y Privacidad, y al lado dos Switch de avisos, un SegmentedControl de tema y un PopUpButton de idioma. En el teléfono: los mismos grupos como una lista, cada uno con su valor actual.](assets/Patrones/ajustes-pagina.png)

## Qué control usar

| El ajuste es | Control |
|---|---|
| Sí o no | Una fila de `List` con su interruptor (`switch`) |
| Una de dos a cuatro opciones cortas | `SegmentedControl` |
| Una de muchas | `PopUpButton` |
| Un valor en un rango | `Slider` |
| Un texto (nombre, correo) | Una fila que abre un formulario |
| Varias opciones a la vez | `Checkbox` en lista |

## Cuándo se aplica

- **Al tiro, sin «Guardar»:** un interruptor, una opción, un `Slider`. El cambio se ve de inmediato y se deshace volviendo a tocar.
- **Con «Guardar»:** lo que se escribe (nombre, correo, clave) y lo que tiene consecuencias (cambiar de plan). Ahí va un formulario, con «Guardar» y «Cancelar».
- No mezcles las dos formas en un mismo grupo.

Si un cambio no se puede aplicar, dilo en la fila y vuelve el control a donde estaba.

## Contenido

- El nombre dice qué pasa cuando está activo: «Avisarme si cambia mi salida», no «Notificaciones de itinerario».
- Una línea de ayuda bajo el nombre solo si el nombre no alcanza.
- La fila muestra el valor actual: «Idioma · Español».

## Accesibilidad

- Cada control tiene su nombre asociado: al enfocarlo, un lector lee el nombre del ajuste y su estado.
- Los grupos son encabezados, para saltar entre ellos.
- Toda la fila responde al toque, no solo el control.
- Un cambio que se aplica solo se anuncia: «Tema oscuro activado».

## No hagas

- Un ajuste para algo que casi nadie cambia.
- Esconder en Ajustes lo que se necesita durante una tarea.
- Pedir confirmación para un cambio que se deshace con un toque.
- Un «Restablecer todo» sin decir qué se pierde.

## Relacionados

`List` · `Switch` · `SegmentedControl` · `PopUpButton` · `Sidebar` · Formularios · Diálogos · Temas.
