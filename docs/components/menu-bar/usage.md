---
component: MenuBar
tab: Uso
summary: La barra con todos los comandos de la app que está al frente y, a su derecha, los extras.
---


## Resumen

`MenuBar` es la barra del borde superior del escritorio. A la izquierda, los menús de la app que está al frente, siempre en el mismo orden. A la derecha, los extras: la hora, los avisos, la presencia de la IA. Es la *menu bar* de Apple.

Antes de usarla, lee los patrones **Entorno** y **Menús**.

## Cuándo usarla

- En un `Desktop`, siempre: es donde se aprende qué hace cada app.

## Cuándo no

- En una página o en una app de una sola ventana. Ahí los comandos van en una `Toolbar` y en sus `PullDownButton`.
- Para navegar entre secciones. Los menús son comandos, no lugares.

## Anatomía

1. **Menú de la app:** su nombre, en negrita.
2. **Menús:** Archivo, Edición, Ver, Ventana, Ayuda, y los propios.
3. **Menú abierto**, con sus atajos a la derecha.
4. **Extras:** íconos y datos del entorno.

![Anatomía de MenuBar: a la izquierda, el nombre de la app «Viajes» en negrita (1) y los menús Archivo, Edición, Ver, Ventana y Ayuda (2). El menú Edición está abierto (3), con Deshacer, Rehacer apagado, Copiar y Pegar, cada uno con su atajo. A la derecha, el ícono de avisos y la fecha y la hora (4).](assets/Componentes/menu-bar-anatomia.png)

## El orden de los menús

| Menú | Qué lleva |
|---|---|
| **Nombre de la app** | «Acerca de», «Ajustes…» y lo que vale para toda la app. |
| **Archivo** | Crear, abrir, guardar, imprimir, cerrar la ventana. |
| **Edición** | Deshacer, rehacer, cortar, copiar, pegar, buscar. |
| **Formato** | Solo con texto con formato. |
| **Ver** | Ordenar, filtrar, mostrar u ocultar partes. |
| Los propios | Entre Ver y Ventana. |
| **Ventana** | Minimizar, ampliar, la lista de ventanas. |
| **Ayuda** | La ayuda. |

No cambies el orden ni saltes los que apliquen. La gente llega a «Copiar» sin leer, porque siempre está en el mismo lugar.

## Reglas

- **Todo comando de la app está aquí**, también los de sus menús contextuales.
- **Siempre los mismos ítems.** El que no aplica se apaga; no se esconde.
- **Títulos de una palabra.** La barra es angosta y comparte lugar con los extras.
- **Los atajos conocidos se respetan:** copiar, pegar, deshacer, guardar, imprimir. Uno propio, solo si hace falta.
- **El menú de la app cambia con la app al frente.** Los demás conservan su lugar.

## Los extras

- **Pocos.** Cada uno le quita lugar a los menús.
- **Un ícono**, o un dato corto: la hora.
- **Al tocar uno, se abre un menú**, no un popover.
- **La persona elige cuáles ver**, en Ajustes.
- **Nada vive solo en un extra:** lo que ofrece está también en otra parte.

## En una pantalla angosta

Queda el menú de la app y los extras. Los demás menús no se muestran: sus comandos tienen que estar en la ventana.

## Relacionados

`Desktop` · `Window` · `Dock` · `PullDownButton` · Entorno · Menús.

## Referencias

- Apple, Human Interface Guidelines: The menu bar.
