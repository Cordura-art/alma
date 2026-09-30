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

> **Imagen pendiente:** las cuatro capas sobre la misma pantalla.

## Reglas

- **Una capa a la vez.** Un modal no abre otro modal. Si una tarea crece, llévala a una página.
- **La persona la abre.** No abras un diálogo sin que lo pida, salvo una alerta que no puede esperar.
- **Siempre hay salida:** «Cerrar», «Cancelar» o Esc. Quitarla es la excepción.
- **El foco entra y vuelve.** Al abrir entra al diálogo; al cerrar vuelve al botón que lo abrió (ALMA lo hace).
- **Confirma solo lo que no se deshace.** Para lo que se puede deshacer, actúa y ofrece «Deshacer».

## Confirmar una acción destructiva

1. `Alert` con el título como pregunta concreta: «¿Eliminar la tarjeta terminada en 4821?».
2. Botones «Cancelar» y el verbo del título: «Eliminar».
3. El botón destructivo en rojo solo si la persona no eligió esa acción deliberadamente.

## Relacionados

`Modal` · `Sheet` · `Alert` · `Popover` · `Tooltip`.
