---
component: Breadcrumb
tab: Uso
summary: La ruta desde el inicio hasta la página actual.
---


## Resumen

`Breadcrumb` muestra dónde está la persona dentro de la jerarquía del sitio y le permite subir a cualquier nivel con un clic. Sigue el *breadcrumb* de Carbon.

### Cuándo usarlo
- En sitios o apps con tres niveles o más.
- Cuando se llega a una página profunda desde un buscador o un enlace directo.

### Cuándo no usarlo
- **En jerarquías de uno o dos niveles:** sobra.
- **En el teléfono:** prefiere «Volver» en la `Toolbar`.
- **Para pasos de un proceso:** `ProgressIndicator`.
- **Como historial de navegación:** muestra la jerarquía, no el camino que siguió la persona.

## Anatomía

1. **Enlaces** a los niveles superiores.
2. **Separador** `/`.
3. **Página actual**: texto, no enlace.
4. **Menú «…»** con los niveles plegados, si la ruta es larga.

> **Imagen pendiente:** una ruta de 3 niveles y otra de 6 con el menú «…» abierto.

## Rutas largas

Con más de `maxItems` niveles (4 por defecto), se ven el primero, el menú «…» y los últimos; los del medio quedan en el menú.

| Niveles | `maxItems` 4 | Se ve |
|---|---|---|
| 3 | — | Todos. |
| 6 | 4 | Inicio / … / Nivel 5 / Actual |

## Contenido

- Las etiquetas son los títulos de cada página, cortos.
- El primer nivel es el inicio del sitio o la sección («Inicio», «Cuenta»).
- La página actual va al final, igual a su título.

## Ubicación

Arriba de la página, sobre el título, alineado con él.

## Relacionados

`Toolbar` (con «Volver») · `Sidebar` · `Link`.

## Referencias

- IBM, Carbon Design System: Breadcrumb.
