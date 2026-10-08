---
component: Desktop
tab: Estilo
summary: Colores y medidas de Desktop.
---


## Color

| Elemento | Propiedad | Token |
|---|---|---|
| Escritorio | fondo | `ui-02`, o lo que traiga `wallpaper` |
| Texto | color | `text-01` |

## Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Escritorio | alto mínimo | 30 rem |
| Barra de menús | alto | 32 px, arriba |
| Zona de ventanas | posición | Bajo la barra de menús, hasta el borde inferior |
| Dock | posición | Abajo al centro, a `space-8` del borde |
| Ventana ampliada, con dock | margen inferior | 80 px, para no quedar bajo el dock |
| Cambio a pantalla angosta | ancho del escritorio | Menos de 672 px |

## Capas

| Capa | Qué |
|---|---|
| 0 | Fondo |
| 1 | Ventanas, en su orden |
| 3 | Barra de menús y dock |

Nada sale del escritorio: lo que no cabe se recorta.
