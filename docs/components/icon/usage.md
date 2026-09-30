---
component: Icon
tab: Uso
summary: Un ícono de IBM Carbon, dibujado como SVG dentro de la página.
---


## Resumen

`Icon` dibuja un ícono de IBM Carbon como SVG: se ve desde el primer instante, no descarga fuentes y hereda el color del texto. El contexto completo (la biblioteca, los tamaños, el estilo) está en el fundamento **Íconos**.

### Cuándo usarlo
- Siempre que una interfaz de ALMA necesite un ícono.

### Cuándo no usarlo
- **Para decorar.**
- **Junto a emoji u otros sets de íconos:** un solo set.

## Variantes

| Variante | Uso |
|---|---|
| `outlined` (por defecto) | La mayoría de los casos. |
| `filled` | Lo elegido y los avisos. Usa la versión `--filled` de Carbon si existe; si no, queda el contorno. |

## Tamaños

| Tamaño | Uso |
|---|---|
| 16 px | Datos densos. |
| 20 px | Dentro de controles. |
| 24 px (por defecto) | Junto a texto. |
| 32 px | Zonas vacías. |

> **Imagen pendiente:** el mismo ícono en contorno y relleno, en los cuatro tamaños.

## Contenido

- Usa el nombre de Carbon: `arrow--right`, `checkmark--outline`, `trash-can`. Búscalo en `assets/Icons/carbon-icons.json`, que trae categorías y sinónimos.
- Si el ícono comunica algo sin texto al lado, dale un nombre (`label`).

## Relacionados

Íconos (fundamento) · `Button` · `Tooltip`.
