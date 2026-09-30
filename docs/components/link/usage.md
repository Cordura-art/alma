---
component: Link
tab: Uso
summary: Un enlace de texto que lleva a otra página o sección.
---


## Resumen

`Link` lleva a otro lugar: otra página, otra sección, otro sitio. Si la acción cambia algo (guardar, pagar, borrar), es un `Button`.

### Cuándo usarlo
- Dentro de un texto, para ir a más información.
- Suelto (`standalone`), para ir a una página relacionada: «Ver condiciones del pasaje».

### Cuándo no usarlo
- **Para una acción:** `Button`.
- **Para la navegación principal:** `TabBar`, `Sidebar`.

## Tipos

| Tipo | Propiedad | Aspecto |
|---|---|---|
| Dentro de un texto | — | Subrayado siempre. |
| Suelto | `standalone` | Medium, subrayado al pasar el cursor. |
| Externo | `external` | Abre en otra pestaña y muestra el ícono `launch`. |
| Página actual | `current` | Marca la página actual. |

> **Imagen pendiente:** los cuatro tipos, en reposo, con cursor encima, visitado y con foco.

## Contenido

- El texto se entiende solo: «Ver condiciones del pasaje», nunca «Haz clic aquí» ni «Más».
- Si lleva a un archivo, dilo: «Descargar boleta (PDF, 120 KB)».

## Comportamiento

- Los visitados cambian de color.
- Los externos abren en otra pestaña; úsalos solo para sitios de terceros.

## Relacionados

`Button` · `Breadcrumb` · `Card`.

## Referencias

- IBM, Carbon Design System: Link.
