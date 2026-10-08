---
component: ContextMenu
tab: Uso
summary: Las acciones de un ítem, en el punto donde se piden: clic derecho, toque largo o la tecla de menú.
---


## Resumen

`ContextMenu` da acceso a las acciones de un ítem sin ocupar lugar en la pantalla. Se abre con clic derecho, con un toque largo o con la tecla de menú, justo donde se pidió. Es el *context menu* de Apple.

Antes de usarlo, lee el patrón **Menús**.

## Cuándo usarlo

- Sobre un ítem de una lista, una tarjeta o un archivo, para sus acciones más usadas.
- Sobre un espacio vacío, para crear algo ahí: «Nueva carpeta».
- En un entorno de escritorio, donde la gente espera el clic derecho.

## Cuándo no

- **Como único lugar de una acción.** Está escondido. Cada ítem suyo tiene que estar también a la vista: en una `Toolbar`, en un `PullDownButton` o en el detalle.
- **Para acciones raras o avanzadas.** Es para lo que más se usa en ese contexto.
- **En un texto seleccionado**, si ya hay un menú de edición. Uno u otro, no los dos.

## Anatomía

1. **El ítem** sobre el que se abre.
2. **El menú**, en el punto donde se pidió.
3. **Grupos**, con un separador entre ellos. Hasta tres.
4. **La acción destructiva**, en rojo y al final.

![Anatomía de ContextMenu: una tarjeta de viaje (1) y, sobre ella, el menú abierto (2) con «Ver pasaje», «Compartir» y «Cambiar fecha…» en un grupo (3) y, separada y en rojo, «Anular viaje» (4).](assets/Componentes/context-menu-anatomia.png)

## Qué muestra

- **Solo lo que aplica.** Un ítem que no se puede usar no aparece. Un menú de botón lo dejaría apagado para que se sepa que existe; aquí estorba.
- **Pocos ítems.** Si hay que desplazarse para leerlo, sobra algo.
- **Sin atajos de teclado.** El menú contextual ya es el atajo.
- **Sin título**, salvo que diga algo que no se ve: «3 viajes seleccionados».
- **Un submenú, de un nivel**, si acorta el menú.
- **Lo destructivo, al final**, en rojo.

## Lo mismo en todas partes

Si un tipo de ítem tiene menú contextual en una pantalla, lo tiene en todas. Si a veces abre y a veces no, la gente deja de buscarlo, o cree que algo falló.

## Cómo se abre

| Con | Gesto |
|---|---|
| Puntero | Clic secundario. |
| Toque | Mantener presionado medio segundo. |
| Teclado | La tecla de menú, o Mayúsculas + F10, con el foco en el ítem. |

## Relacionados

`PullDownButton` · `ActionSheet` · `Toolbar` · `List` · Menús.

## Referencias

- Apple, Human Interface Guidelines: Context menus.
