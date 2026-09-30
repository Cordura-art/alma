---
component: FileUploader
tab: Estilo
summary: Especificaciones visuales del cargador de archivos.
---


## Color

| Elemento | Propiedad | Token |
|---|---|---|
| Título | color del texto | `text-01` |
| Descripción | color del texto | `text-02` |
| Zona | borde (1 px, punteado) | `file-uploader-border` |
| Zona:hover o al arrastrar | borde (sólido) / fondo | `file-uploader-border-hover` / `file-uploader-bg-hover` |
| Zona | color del texto | `text-02` (`text-01` al pasar el cursor) |
| Zona:focus | contorno | `focus` (2 px, separado 2 px) |
| Archivo | fondo | `file-uploader-file-bg` |
| Archivo con error | borde | `file-uploader-file-border-error` |
| Check | color | `status-icon-success` |
| Ícono de error | color | `status-icon-error` |
| Mensaje de error | color del texto | `text-error` |

## Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso |
|---|---|---|
| Título | 14 / 0,875 | Medium / 500 |
| Descripción y error | 12 / 0,75 | Regular / 400 |
| Zona y nombre del archivo | 14 / 0,875 | Regular / 400 |

## Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Cargador | ancho máximo | 480 px (30 rem) |
| Zona | alto mínimo, relleno | 128 px, 24 px |
| Zona | radio | `radius-panel` |
| Ícono de la zona | tamaño | 32 px (`upload`) |
| Archivo | alto mínimo, radio | 44 px, `radius-tag` |
| Archivos | separación | 8 px |

> **Imagen pendiente:** anatomía acotada.

## Movimiento

El borde de la zona cambia en `duration-fast-02`.

## Contraste

Textos a 4,5:1; borde de la zona a 3:1, en los cuatro temas.
