---
component: ProductCard
tab: Uso
summary: Una tarjeta desplegable con fondo del color de una familia de etiquetas.
---


## Resumen

`ProductCard` muestra un título y, al desplegarla, un dato destacado, una imagen y un texto. Su fondo toma el color de una familia de etiquetas. Es propia de ALMA.

### Cuándo usarla
- Productos o beneficios que se hojean y se abren para leer más.

### Cuándo no usarla
- **Una tarjeta que lleva a otra página:** `Card`.
- **Contenido largo por partes:** `Accordion`.

## Anatomía

1. **Título.**
2. **Botón** Expandir / Contraer.
3. **Dato destacado** (al abrir).
4. **Imagen** (al abrir), 328 × 245.
5. **Texto** (al abrir).

![ProductCard en el tono rojo, cerrada y abierta.](assets/Componentes/product-card-tono.png)

## Tonos

El fondo usa `tag-<tono>-bg`: `red` (por defecto), `yellow`, `magenta`, `purple`, `blue`, `cyan`, `teal`, `green`, `warmgray`, `gray` o `coolgray`. No mezcles más de dos tonos en una misma lista.

## Comportamiento

- El botón abre y cierra; el contenido aparece bajando.
- `collapsible: false` la deja siempre abierta, sin botón.

## Relacionados

`Card` · `Accordion` · `Tag`.
