---
pattern: Divulgación progresiva
summary: Cómo mostrar primero lo esencial y el resto a pedido.
---

## Cuándo

Cuando hay más información de la que la mayoría necesita: detalles, condiciones, opciones avanzadas.

## Elegir la forma

| Lo que se esconde | Usa |
|---|---|
| Secciones de contenido largo | `Accordion` |
| El detalle de una tarjeta | `ProductCard` (se despliega) o `Card` (lleva a otra página) |
| Una explicación breve de un término | `Popover` |
| Qué hace un control | `Tooltip` |
| Opciones relacionadas con lo que se ve | `Sheet` |
| Acciones secundarias | El menú «Más» (`PullDownButton`) |
| Un texto largo | Un `Link` «Ver más» que lleva al texto completo |

![Una pantalla de pasaje en el teléfono: el resumen a la vista (ruta, fecha, asiento y total) y, debajo, las condiciones del pasaje en un Accordion con la sección Cambios abierta.](assets/Patrones/divulgacion.png)

## Reglas

- **Lo esencial, a la vista.** Lo que casi todos necesitan no se esconde.
- **Nunca se esconden los errores** ni lo que hace falta para decidir.
- **Un nivel.** No pongas un despliegue dentro de otro.
- **El control dice qué muestra:** «Ver condiciones del pasaje», no «Más».
- **Lo abierto se queda abierto** mientras la persona está en la pantalla.

## Accesibilidad

- El control que despliega anuncia si está abierto (`aria-expanded`); ALMA lo hace en `Accordion`, `ProductCard`, `Popover` y `PullDownButton`.
- Lo escondido queda oculto también para el lector.

## Relacionados

`Accordion` · `ProductCard` · `Popover` · `Sheet` · Contenido que desborda.
