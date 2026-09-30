---
component: Toolbar
tab: Estilo
summary: Especificaciones visuales de la barra de herramientas.
---


## Color

| Elemento | Propiedad | Token |
|---|---|---|
| Barra | fondo | `toolbar-bg` (la página, `ui-02`) |
| Barra | borde inferior (1 px) | `toolbar-border` |
| Título | color del texto | `text-01` |
| Acciones y Volver | estilo | `Button` plain de ícono |
| Más | estilo | `PullDownButton` de ícono sin borde |

## Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso | Interlineado |
|---|---|---|---|
| Título | 20 / 1,25 | `font-weight-heading` | 1,4 |

## Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Barra | alto mínimo | 56 px |
| Barra | relleno lateral | 8 px |
| Grupos | separación | 8 px |
| Título | margen lateral | 8 px |
| Buscador | ancho | crece desde 320 px, hasta 480 px |
| Acciones | separación | 4 px |
| Íconos de Volver, acciones y Más | tamaño / área de toque | 16 px (`icon-size-sm`), como en `Sidebar`, los menús y `TabBar` / 44 × 44 px |
| Buscador (menos de 672 px) | relleno | 8 px a los lados y abajo |

![Medidas de Toolbar: alto de la barra, relleno lateral, separación entre grupos y botones de acción de 44 px.](assets/Componentes/toolbar-medidas.png)

## Capas

Con `sticky`, la barra está en `z-header` y respeta el área segura superior del teléfono.

## Contraste

Título y acciones a 4,5:1 sobre `toolbar-bg`, en los cuatro temas.
