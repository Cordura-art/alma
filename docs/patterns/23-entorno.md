---
pattern: Entorno
summary: Un escritorio que corre en el navegador: ventanas, barra de menús, dock, y dónde vive la IA.
---

## Qué es

Cada entidad de ALMA puede tener su propio entorno: un escritorio donde sus apps se abren en ventanas, con una barra de menús arriba y un dock abajo. Corre en el navegador. Las piezas son las mismas para todas las entidades; cambian el color, la letra, la voz y la luz.

Es para cuando una persona trabaja con varias cosas a la vez y las quiere ver juntas. Una sola tarea, de principio a fin, sigue siendo una página.

## Las piezas

| Pieza | Componente | Qué hace |
|---|---|---|
| **Escritorio** | `Desktop` | El escenario. Lleva el fondo, ordena las ventanas y sabe si la pantalla es angosta. |
| **Ventana** | `Window` | El marco de una app: se mueve, cambia de tamaño, se minimiza, se amplía y se cierra. |
| **Barra de menús** | `MenuBar` | Todos los comandos de la app que está al frente. A su derecha, los extras. |
| **Dock** | `Dock` | Las apps, a un toque. Dice cuáles están abiertas. |

Y fuera de las ventanas, para ver sin abrir:

| Pieza | Componente | Qué hace |
|---|---|---|
| **Widget** | `Widget` | Una idea de una app sobre el escritorio, para leer de un vistazo. |
| **Actividad en vivo** | `LiveActivity` | Algo con principio y fin, seguido desde la barra de menús o sobre el escritorio. |
| **Fragmento** | `Snippet` | La respuesta del asistente como tarjeta: un resultado, o una confirmación. |

Además, lo que ya existía: `ContextMenu` sobre cualquier ítem, `Sheet` y `Alert` dentro de una ventana, `ToastRegion` para los avisos.

## Las capas

De atrás hacia adelante. Sigue el fundamento Profundidad.

| Nivel | Qué | De qué |
|---|---|---|
| 0 | El fondo del escritorio. Puede ser un efecto de ALMA. | Opaco, o un efecto. |
| 1 | Los widgets, sobre el fondo y bajo las ventanas. | Vidrio medio. |
| 1 | Las ventanas. El cuerpo es contenido; la barra es de la capa funcional. | Cuerpo en `ui-02`. Barra de vidrio en la ventana activa. |
| 2 | La barra de menús y el dock. | Vidrio delgado y vidrio medio. |
| 3 | Menús, popovers y avisos. | Como siempre. |

El fondo no lleva texto. Todo lo que se lee está en una ventana, en la barra o en el dock.

## Ventanas

- **Una está al frente.** Es la que recibe el teclado. Se nota: su barra es de vidrio, sus controles tienen color pleno y lleva sombra. Las demás se apagan un tono.
- **Principal o auxiliar.** La principal lleva la navegación de la app. Una auxiliar es para una sola tarea (escribir un mensaje, ver un pasaje) y se cierra al terminar.
- **Panel.** Una ventana menor que flota junto a otra: el detalle de lo seleccionado. Es toda de vidrio.
- **Abre una ventana nueva cuando ayuda ver dos cosas a la vez**: escribir mientras se lee. No por defecto: muchas ventanas son desorden.
- **Recuerda su lugar.** Una ventana que se cierra vuelve donde estaba y del tamaño que tenía.
- **Nada importante abajo.** El borde inferior es lo primero que queda fuera de la vista al mover una ventana. El pie de una ventana es para un dato menor: «2 viajes».
- **Se llama ventana.** En los textos, siempre esa palabra.

## La barra de menús

Los menús van siempre en el mismo orden. La gente los encuentra por su lugar.

| Menú | Qué lleva |
|---|---|
| **El nombre de la app**, en negrita | Lo que vale para toda la app: «Acerca de», «Ajustes…». |
| **Archivo** | Crear, abrir, guardar, imprimir, cerrar la ventana. |
| **Edición** | Deshacer, rehacer, cortar, copiar, pegar, buscar. |
| **Formato** | Solo si la app tiene texto con formato. |
| **Ver** | Cómo se muestra: ordenar, filtrar, mostrar u ocultar partes. |
| Los propios de la app | Entre Ver y Ventana. Títulos de una palabra. |
| **Ventana** | Minimizar, ampliar y la lista de ventanas abiertas. |
| **Ayuda** | La ayuda de la app. |

- **Todo comando de la app está aquí**, incluidos los de sus menús contextuales. Es donde se aprende qué hace la app.
- **Siempre los mismos ítems.** El que no se puede usar se ve apagado; no desaparece.
- **Con sus atajos**, que funcionan.

A la derecha van **los extras**: la hora, los avisos, la conexión, la presencia de la IA. Un extra que se toca abre un menú, no un popover. Son pocos, y la persona elige cuáles ver.

## El dock

- **Las apps que más se usan**, y las que están abiertas. Un punto bajo las abiertas.
- **Tocar una app** la abre, o trae su ventana al frente.
- **Su menú** (clic derecho o toque largo) tiene sus atajos: «Nuevo viaje», «Salir». Nada vive solo ahí.
- **Un contador** sobre el ícono dice cuánto hay sin ver. Solo para lo que la persona pidió seguir.

## En una pantalla angosta

Bajo 672 px de ancho no hay espacio para ventanas que se superponen:

- Se ve **una ventana a la vez**, a todo el tamaño.
- No se mueven ni cambian de tamaño. Queda el control de cerrar.
- La barra muestra solo el menú de la app.
- El dock sigue abajo, y con él se cambia de app.

Es el mismo entorno, con las mismas apps en el mismo estado. Al ensanchar, las ventanas vuelven a su lugar.

## Dónde vive la IA

La guía Interfaces de IA pide una sola luz por pantalla. En el entorno hay tres lugares para ella, de más a menos presencia:

| Lugar | Qué | Cuándo |
|---|---|---|
| **El fondo del escritorio** | El escenario: el Velo, detrás de todo, y el Halo sobre él cuando la IA pasa al frente. | Cuando la IA es el centro del entorno. El Halo dice su estado. |
| **Un extra de la barra** | La figura: el Halo pequeño, o el ícono `ai-label`. | Cuando el fondo es otro. Abre el asistente. |
| **Una ventana** | El asistente: `ChatMessage` y `PromptInput`. | Donde se conversa. |

![El mismo escritorio dos veces. Arriba, «De fondo»: la ventana «Viajes» está al frente y detrás de todo solo hay un velo de luz tenue. Abajo, «Al frente»: la ventana «Asistente» pasó adelante y, sobre el velo, apareció el Halo, un anillo de luz.](assets/Patrones/entorno-ia.png)

**El Halo es de primer plano.** Mientras la IA está de fondo, su luz es solo el Velo: quieto, tenue y barato de dibujar. Cuando la ventana del asistente pasa al frente, el Halo aparece sobre el Velo; cuando deja de estarlo, se retira. `Window` avisa con `onActiveChange`.

### El asistente a pantalla completa

Es el escenario de la IA: su espacio. Al ampliar la ventana del asistente (`Window` con `kind: 'stage'`), el entorno se ordena en tres capas.

| Capa | Qué | Regla |
|---|---|---|
| **El suelo** | El Velo, de lado a lado. La ventana no tiene fondo propio. | Es la misma luz del escritorio, no otra. Las demás ventanas esperan fuera de la vista. |
| **La zona despejada** | Arriba, el Halo. Dice el estado: en reposo, escuchando mientras se escribe, pensando, respondiendo. | Sin texto ni controles encima. Mide 160 px de alto como mínimo. |
| **La hoja** | Abajo y al centro, vidrio grueso: el saludo y las sugerencias, o la conversación, y la caja de pedido. | Ancho de lectura, 44 rem como mucho. Crece hacia arriba con la conversación y se desplaza por dentro. |

- **Lo que se lee va siempre sobre la hoja.** El vidrio grueso admite los tres niveles de texto sobre cualquier luz.
- **El Halo se achica y sube** a su zona; al volver a ventana flotante regresa al centro. El paso dura `duration-slow-02`.
- **Si otra ventana pasa al frente,** el asistente recupera su fondo y el Halo se retira.
- **En alto contraste o con menos transparencia,** la hoja es opaca. La luz sigue detrás y nada depende de ella.

![El asistente ampliado hasta llenar el escritorio. La ventana no tiene fondo propio: el velo de luz la cruza de lado a lado. Arriba, en una zona despejada, el Halo. Abajo y al centro, una hoja de vidrio con el saludo «¿En qué te ayudo?», tres preguntas sugeridas y la caja para escribir el pedido. Bajo ella, el dock.](assets/Patrones/entorno-escenario.png)

Si el fondo ya es la luz de la IA, el extra de la barra es solo el ícono. Nunca dos luces.

Lo que la IA hace fuera de su ventana tiene dos piezas: una tarea larga se sigue con una `LiveActivity`, que muestra sus pasos y siempre deja detenerla; y cuando necesita permiso, o responde con un dato, lo hace con un `Snippet`.

## Con el teclado

| Tecla | Dónde | Qué hace |
|---|---|---|
| Tab | En todo el entorno | Barra de menús, ventana al frente, dock. |
| ← → | En la barra de menús | Pasa de un menú a otro. |
| ↓, Enter | En un menú de la barra | Lo abre. |
| Flechas | En la barra de una ventana | Mueven la ventana. |
| Mayúsculas + flechas | En la barra de una ventana | Cambian su tamaño. |
| ← → | En el dock | Pasa de una app a otra. |
| Tecla de menú | Sobre una app del dock | Abre su menú. |

Mover y cambiar de tamaño nunca dependen de arrastrar: siempre hay teclado, y «Ampliar» y «Minimizar» están en los controles y en el menú Ventana.

## No hagas

- Dibujar ventanas propias, con otros controles u otro orden. La gente reconoce la ventana por su marco.
- Abrir una ventana por cada cosa.
- Poner texto sobre el fondo del escritorio.
- Esconder comandos fuera de la barra de menús.
- Hacer que una ventana se abra más grande que el escritorio, o fuera de él.

## Relacionados

`Desktop` · `Window` · `MenuBar` · `Dock` · `Widget` · `LiveActivity` · `Snippet` · `ContextMenu` · Menús · Profundidad · Interfaces de IA · Diseño adaptable.

## Referencias

- Apple, Human Interface Guidelines: Windows, The menu bar, Dock menus, Panels.
