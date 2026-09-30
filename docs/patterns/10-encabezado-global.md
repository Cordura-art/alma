---
pattern: Encabezado y navegación global
summary: La estructura fija de una app: barra superior y navegación principal.
---

## Cuándo

En toda app o sitio hecho con ALMA: es lo que queda fijo mientras cambia el contenido.

## Las piezas

| Pieza | Componente | Qué lleva |
|---|---|---|
| Barra superior | `Toolbar` con `sticky` | Título de la vista, Volver, buscador y 2 o 3 acciones; el resto en «Más». |
| Navegación principal (teléfono) | `TabBar` con `fixed` | De 3 a 5 secciones. |
| Navegación principal (desde 1056 px) | `Sidebar` | Las mismas secciones, agrupadas. |
| Cuenta | `PullDownButton` de ícono `user--avatar` en la `Toolbar` | Perfil, Ajustes, Cerrar sesión. |

> **Imagen pendiente:** la misma app en el teléfono (Toolbar arriba, TabBar abajo) y en escritorio (Toolbar arriba, Sidebar a la izquierda).

## Reglas

- **Los mismos destinos en todas las pantallas.** `TabBar` y `Sidebar` son la misma navegación en dos formas: cambia la forma, no los destinos.
- **La barra superior dice dónde estás:** su título es el de la vista.
- **La búsqueda global**, si existe, va en la `Toolbar`; bajo 672 px pasa a su propia fila.
- **Cerrar sesión** va al final del menú de cuenta, con `role: 'destructive'` solo si borra datos locales.
- **Primer enlace de la página:** «Saltar al contenido», que lleva al título de la vista.

## Capas

`Toolbar` y `TabBar` fijas usan `z-header`. Deja espacio bajo el contenido para que la `TabBar` no tape el último control.

## Accesibilidad

- La `Toolbar` es el `header` de la página y el contenido va en `main`.
- `TabBar` y `Sidebar` son `nav`; si hay más de un `nav`, cada uno lleva su nombre.
- Al cambiar de sección, el foco va al título de la vista nueva.

## Relacionados

`Toolbar` · `TabBar` · `Sidebar` · `PullDownButton` · Espaciado y grilla.
