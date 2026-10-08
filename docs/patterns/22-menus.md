---
pattern: Menús
summary: Qué menú usar, cómo se nombran sus ítems y cómo se ordenan.
---

## Qué menú

Un menú guarda lo que no cabe a la vista. Todos los de ALMA comparten una misma lista, con las mismas reglas; lo que cambia es qué la abre y para qué.

| Necesitas | Usa | Ejemplo |
|---|---|---|
| Elegir una opción entre varias que se excluyen | `PopUpButton` | El tipo de documento: RUT, pasaporte. |
| Acciones relacionadas con un botón | `PullDownButton` | «Agregar»: un pasajero, una maleta, un seguro. |
| Las acciones de un ítem, sin ocupar lugar | `ContextMenu` | Clic derecho sobre un viaje. |
| Las opciones de una acción que la persona ya inició | `ActionSheet` | Al cerrar un mensaje a medias: guardar o descartar. |
| Avisar de algo que la persona no esperaba | `Alert` | «No se pudo guardar». |

Dos reglas para no confundirlos:

- **`ActionSheet` responde a algo que la persona hizo; `Alert` llega sin que lo pida.** Si la persona tocó «Cerrar», lo que sigue es una hoja de acción. Si falló la red, es una alerta.
- **Nada vive solo en un menú contextual.** Está escondido: quien no lo conoce no lo encuentra. Cada acción suya está también a la vista en otro lugar.

## Los ítems

- **Empiezan con verbo** cuando hacen algo: «Copiar número», «Cambiar fecha».
- **Sin artículos:** «Ver pasaje», no «Ver el pasaje». Alargan y no aclaran.
- **Con puntos suspensivos** cuando la acción pide algo más antes de terminar: «Cambiar fecha…» abre un calendario; «Copiar número» no pide nada.
- **Uno que no se puede usar se ve apagado**, no desaparece: así se aprende que existe. La excepción es el menú contextual, que muestra solo lo que aplica.
- **El destructivo va en rojo y al final**, separado. Y pide confirmación con un `ActionSheet`.

## Íconos

- Pocos y con motivo: para las acciones más usadas y para lo que se reconoce de un vistazo (copiar, compartir, eliminar).
- **Todos los ítems de un grupo llevan ícono, o ninguno.** Mezclar desordena la lectura.
- La misma acción lleva el mismo ícono en todo el producto.
- Si no hay un ícono que la represente bien, no lleva.

## Orden y grupos

- **Lo más usado, primero.** Se lee desde arriba.
- **Lo relacionado, junto**, aunque no pese lo mismo: «Pegar» y «Pegar sin formato» van en el mismo grupo.
- **Un separador entre grupos.** No más de tres grupos en un menú contextual.
- **Corto.** Si un menú no se lee de un vistazo, divídelo en dos o usa un submenú. La excepción es una lista que la persona misma llenó, como su historial: esa puede ser larga y desplazarse.
- **Al menos tres ítems** en un `PullDownButton`. Con uno o dos, son botones.

## Submenús

Un ítem puede abrir una lista menor de opciones muy relacionadas. Se reconoce por una flecha al final.

- **Un solo nivel.** Un submenú dentro de otro cuesta abrirlo y se pierde.
- **Hasta unos cinco ítems.** Con más, es otro menú.
- **Cuando una palabra se repite:** en vez de «Ordenar por fecha», «Ordenar por precio» y «Ordenar por destino», un ítem «Ordenar por» con las tres opciones.
- **No indentes ítems** para mostrar jerarquía. Para eso es el submenú.
- `PopUpButton` no lleva submenús: su lista es plana.

## Ítems que se marcan

Un ítem puede ser un atributo que está puesto o no, con un visto delante.

- **Un visto** dice que el atributo está en efecto: «Solo los pagados».
- **O una etiqueta que cambia:** «Mostrar mapa» pasa a «Ocultar mapa». Si no queda claro si es un estado o una acción, agrega el verbo: «Activar avisos», no «Avisos activados».
- **Cuando ayuda ver los dos estados**, muestra los dos ítems y deja disponible solo el que aplica.
- Si se pueden marcar varios, ofrece uno que los quite todos: «Sin filtros».

## Atajos de teclado

- Se muestran a la derecha del ítem, en los menús de un botón y en la barra de menús.
- **No en un menú contextual:** ya es un atajo.
- Un atajo que se muestra tiene que funcionar. El menú lo muestra; hacerlo andar es de la app.

## Título

Un menú casi nunca necesita título: el botón y los ítems ya dicen de qué es. Ponlo solo si agrega algo, como cuántos elementos afecta: «3 viajes seleccionados».

## Con el teclado

| Tecla | Qué hace |
|---|---|
| ↓ ↑ | Recorren los ítems, en círculo. Saltan separadores y apagados. |
| Inicio, Fin | Primer y último ítem. |
| → | Abre el submenú. |
| ← | Cierra el submenú y vuelve a su ítem. |
| Enter, Espacio | Elige. |
| Una letra | Va al siguiente ítem que empieza con ella. |
| Esc | Cierra y vuelve a lo que abrió el menú. |
| Tab | Cierra y sigue. |

## Nunca fuera de la pantalla

Un menú se abre bajo su botón. Si no cabe, se abre hacia arriba o se alinea al otro lado. Un menú contextual se abre en el punto donde se pidió y se corre lo necesario para quedar entero.

## No hagas

- Meter todas las acciones de una pantalla en un solo menú «Más». Las principales van a la vista.
- Un menú con un solo ítem.
- Cambiar el orden de los ítems según el uso. La gente los encuentra por su lugar.
- Usar un menú para navegar entre secciones. Para eso están `Tabs`, `Sidebar` y `TabBar`.

## Relacionados

`PopUpButton` · `PullDownButton` · `ContextMenu` · `ActionSheet` · `Alert` · `Toolbar` · Acciones · Diálogos.

## Referencias

- Apple, Human Interface Guidelines: Menus, Context menus, Pop-up buttons, Pull-down buttons, Action sheets.
