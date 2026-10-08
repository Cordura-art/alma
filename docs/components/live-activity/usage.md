---
component: LiveActivity
tab: Uso
summary: Algo que tiene principio y fin, seguido de un vistazo sin abrir su app.
---


## Resumen

`LiveActivity` sigue algo que está pasando: un viaje, un pedido, una tarea de un agente. Vive fuera de su app, en la barra de menús o sobre el escritorio, y se actualiza mientras dura. Es la *Live Activity* de Apple.

Antes de usarla, lee el patrón **Entorno** y la guía **Interfaces de IA › Estados**.

## Cuándo usarla

- Para algo con **principio y fin**, que dura de minutos a unas horas.
- Para la tarea larga de un agente: es donde se ve qué paso va, sin tener abierta su ventana.

## Cuándo no

- Para algo que no termina: eso es un `Widget`.
- Para avisar de un hecho puntual: eso es un `ToastRegion`.
- Para publicidad o promociones. Nunca.
- Con información delicada a la vista. Muestra un resumen neutro y deja el detalle para la app.

## Tres presentaciones

![Las tres presentaciones de LiveActivity. Mínima: un anillo de avance. Compacta: el anillo, el nombre «Viña del Mar» y «42 min». Expandida: el ícono, el nombre y el detalle, la cifra grande, una barra de avance, la lista de pasos con su estado y el botón «Detener».](assets/Componentes/live-activity-presentaciones.png)

| Presentación | Qué muestra | Cuándo |
|---|---|---|
| **Mínima** | Un ícono, o un anillo de avance. | Cuando hay varias actividades a la vez. |
| **Compacta** | El anillo, un nombre corto y la cifra que importa. | Una sola actividad, en la barra de menús. |
| **Expandida** | Nombre, detalle, cifra, avance, pasos y acciones. | Al tocar la compacta, o fija sobre el escritorio. |

La mínima y la compacta se expanden al tocarlas.

## Contenido

- **Lo que se necesita de un vistazo**, no todo. El resto está en la app.
- **Una cifra:** cuánto falta, o cuánto va. «42 min», «3 de 4».
- **Texto grande y con peso.** Se lee de lejos y de pasada.
- **Solo lo necesario de alto.** Si hay poco que decir, es más baja; crece cuando hay más.
- **Los pasos**, cuando es una tarea de varios: hechos, en curso y por hacer.
- **Una o dos acciones:** la que más se necesita, y «Detener» si se puede parar.

## Cuándo termina

Al terminar, muestra el resultado («Llegaste», «Pasaje cambiado») y se retira sola a los pocos minutos, o cuando la persona la cierra. No se queda para siempre.

## El agente de una IA

Una tarea de un agente es una actividad en vivo: tiene principio, pasos y fin. `steps` muestra en qué va, y «Detener» está siempre. Cuando el agente necesita permiso, lo pide con un `Snippet` de confirmación; la actividad lo muestra como su paso en curso.

## Relacionados

`Widget` · `Snippet` · `MenuBar` · `ProgressBar` · `ChatMessage` · Entorno · Interfaces de IA.

## Referencias

- Apple, Human Interface Guidelines: Live Activities.
