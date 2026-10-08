---
component: ActionSheet
tab: Uso
summary: Las opciones de una acción que la persona inició, antes de que termine.
---


## Resumen

`ActionSheet` aparece cuando una acción que la persona empezó necesita que elija cómo sigue. Cerró un mensaje a medio escribir: ¿guardar el borrador o descartarlo? Es la *action sheet* de Apple.

Antes de usarla, lee el patrón **Menús**.

## Cuándo usarla

- Para ofrecer dos o tres maneras de terminar una acción.
- Para confirmar una acción destructiva que la persona eligió en un menú: «Eliminar tarjeta».

## Cuándo no

- **Para avisar de un problema o de un cambio que la persona no esperaba.** Eso es un `Alert`.
- **Para una lista de acciones sobre un ítem.** Eso es un `PullDownButton` o un `ContextMenu`.
- **Para pedir datos.** Eso es un `Sheet` o un `Modal`, con su formulario.
- **Seguido.** Interrumpe. Si se puede deshacer, deja hacer y ofrece «Deshacer».

## Hoja de acción o alerta

| | `ActionSheet` | `Alert` |
|---|---|---|
| La provoca | Algo que la persona hizo. | Algo que pasó. |
| Ofrece | Maneras de seguir. | Aceptar, o confirmar y cancelar. |
| Se ubica | Abajo, cerca del pulgar. Al centro en pantalla ancha. | Al centro. |
| Ejemplo | «¿Guardar el borrador?» | «No se pudo enviar el mensaje.» |

## Anatomía

1. **Título:** una línea. La pregunta.
2. **Mensaje** (opcional): solo si el título y el contexto no alcanzan.
3. **Acción destructiva:** arriba, en rojo.
4. **Otras acciones.**
5. **Cancelar:** abajo, separada.

![Anatomía de ActionSheet: el título «¿Qué hacemos con el borrador?» (1), un mensaje breve (2), la acción destructiva «Descartar borrador» arriba y en rojo (3), «Guardar borrador» debajo (4) y, separada al final, «Seguir escribiendo» (5).](assets/Componentes/action-sheet-anatomia.png)

## Contenido

- **El título cabe en una línea.** Uno largo no se lee rápido.
- **El mensaje, solo si hace falta.**
- **Cada botón dice lo que hace:** «Descartar borrador», no «Sí».
- **Siempre hay cómo arrepentirse.** Si alguna opción destruye datos, hay un «Cancelar», al final. Dice lo que pasa al cancelar si ayuda: «Seguir escribiendo».
- **Hasta cuatro opciones**, sin contar cancelar. Con más, es un menú.

## Comportamiento

- Tapa el resto con un velo. Tocar el velo, o Esc, es cancelar.
- El foco entra a «Cancelar»: lo seguro es lo que queda bajo Enter.
- En una pantalla angosta sube desde abajo. En una ancha, queda al centro.

## Relacionados

`Alert` · `Sheet` · `Modal` · `PullDownButton` · Menús · Diálogos · Deshacer.

## Referencias

- Apple, Human Interface Guidelines: Action sheets.
