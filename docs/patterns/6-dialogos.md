---
pattern: Diálogos y capas
summary: Cómo elegir entre Modal, Sheet, Alert y Popover.
---

## Elegir la capa

| Necesitas | Usa | Bloquea la página |
|---|---|---|
| Una tarea breve con foco (editar un dato, confirmar un pago) | `Modal` | Sí |
| Opciones sobre lo que se ve, al alcance del pulgar | `Sheet` | Sí |
| Una advertencia que exige respuesta, con 2 o 3 opciones | `Alert` | Sí |
| Explicar algo o un par de controles, junto a un botón | `Popover` | No |
| Decir qué hace un control | `Tooltip` | No |
| Una tarea larga o con varios pasos | Una página | — |

![Las cuatro capas sobre la misma pantalla de Mis viajes: un Modal para cambiar el nombre del pasajero, un Sheet para compartir el viaje, una Alert que pregunta si anular el pasaje y un Popover que explica la tasa de embarque sin bloquear la página.](assets/Patrones/dialogos-capas.png)

## Reglas

- **Una capa a la vez.** Un modal no abre otro modal. Si una tarea crece, llévala a una página.
- **La persona la abre.** No abras un diálogo sin que lo pida, salvo una alerta que no puede esperar.
- **Siempre hay salida:** «Cerrar», «Cancelar» o Esc. Quitarla es la excepción.
- **El foco entra y vuelve.** Al abrir entra al diálogo; al cerrar vuelve al botón que lo abrió (ALMA lo hace).
- **Confirma solo lo que no se deshace.** Para lo que se puede deshacer, actúa y ofrece «Deshacer».

## Confirmar una acción destructiva

Depende de quién empezó.

| La persona | Usa | Por qué |
|---|---|---|
| Eligió la acción: tocó «Eliminar» en un menú o en una fila. | `ActionSheet` | Responde a algo que hizo. Aparece en otro lugar y hay que cerrarlo a propósito. |
| No la eligió: el sistema avisa de algo que va a perderse. | `Alert` | Llega sin que la pida, y por eso interrumpe más. |

En los dos casos:

1. El título es una pregunta concreta: «¿Eliminar la tarjeta terminada en 4821?».
2. Los botones son «Cancelar» y el verbo del título: «Eliminar».
3. **La acción que destruye nunca es la más visible.** Va en rojo y con poco peso; «Cancelar» recibe el foco, y Enter no borra nada.

## Relacionados

`Modal` · `Sheet` · `Alert` · `ActionSheet` · `Popover` · `Tooltip` · Menús · Jerarquía.
