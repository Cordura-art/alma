---
component: Toolbar
tab: Uso
summary: La barra superior con el título de la vista, la navegación y las acciones frecuentes.
---


## Resumen

`Toolbar` confirma dónde está la persona (el título), le permite volver o buscar y le da las acciones frecuentes sobre el contenido. Es la *toolbar* y la barra de navegación de Apple.

### Cuándo usarla
- Arriba de cada vista de una app.
- Cuando la vista tiene un buscador o dos o tres acciones frecuentes.

### Cuándo no usarla
- **Para navegar entre secciones:** `TabBar` o `Sidebar`.
- **Para las acciones de un elemento:** van en el elemento (una tarjeta, una fila) o en su `PullDownButton`.

## Anatomía

1. **Volver** (opcional): botón de ícono `arrow--left`.
2. **Título** de la vista.
3. **Buscador** (opcional): un `SearchField`.
4. **Acciones**: botones `plain`, normalmente de ícono.
5. **Más** (opcional): un menú con las acciones menos usadas.

> **Imagen pendiente:** anatomía numerada en escritorio y en el teléfono, con el buscador en su propia fila.

## Reglas

- **Un título útil** que confirme dónde está la persona. Si sería redundante, déjalo vacío.
- **Pocas acciones**, que se distingan y se puedan tocar. Las demás van en **Más** (`moreActions`); úsalo solo si hace falta.
- **Sin fondos pesados ni controles teñidos:** la barra usa el color de la página, y las acciones son botones `plain`.
- Las acciones de ícono llevan nombre y, si ayuda, un `Tooltip`.

## Comportamiento

| Ancho | Buscador |
|---|---|
| Menos de 672 px | En su propia fila, debajo del título y las acciones, a todo el ancho. |
| Desde 672 px | En la misma fila, entre el título y las acciones. |

- Con `sticky`, queda fija arriba al desplazar la página.
- Un título largo se corta con puntos suspensivos.

## Relacionados

`SearchField` · `PullDownButton` · `TabBar` · `Sidebar` · `Breadcrumb`.

## Referencias

- Apple, Human Interface Guidelines: Toolbars; Navigation bars.
- IBM, Carbon Design System: UI shell (header).
