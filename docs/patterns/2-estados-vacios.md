---
pattern: Estados vacíos
summary: Qué mostrar cuando no hay nada que mostrar.
---

## Cuándo

Cuando una vista no tiene contenido: la primera vez, una búsqueda sin resultados, sin permiso o sin conexión.

## Anatomía

Usa `EmptyState`:

1. **Ícono** (opcional), en `icon-02`, a `icon-size-xl`.
2. **Título:** qué falta. «Aún no tienes viajes».
3. **Mensaje:** por qué, o qué verás aquí.
4. **Acción principal:** el siguiente paso. «Buscar pasajes».
5. **Acción secundaria** (opcional).

![Los cuatro estados vacíos lado a lado: primera vez («Aún no tienes viajes», con «Buscar pasajes»), sin resultados («No encontramos viajes a Talca el 31 de marzo», con «Quitar filtros»), sin permiso (sin acción) y sin conexión (con «Reintentar»).](assets/Patrones/estados-vacios-casos.png)

## Los casos

| Caso | Título | Mensaje | Acción |
|---|---|---|---|
| Primera vez | «Aún no tienes viajes» | «Aquí verás los pasajes que compres.» | «Buscar pasajes» |
| Sin resultados | «No encontramos viajes a Talca el 31 de marzo» | «Prueba con otra fecha o quita algún filtro.» | «Quitar filtros» |
| Sin permiso | «No tienes acceso a esta billetera» | «Pídele acceso a quien la administra.» | — |
| Sin conexión | «Sin conexión» | «Revisa tu conexión y vuelve a intentarlo.» | «Reintentar» |

## Reglas

- El estado vacío ocupa el lugar del contenido, no aparece encima.
- Sin ilustraciones decorativas que no sumen información; un ícono a lo sumo.
- No lo muestres mientras carga: eso es un estado de carga (ver **Carga**).
- En una tabla vacía, usa `emptyText` de `Table` con la misma lógica.

## Relacionados

`EmptyState` · `Table` · `SearchField` · Carga.
