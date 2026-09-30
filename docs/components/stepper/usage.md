---
component: Stepper
tab: Uso
summary: Un contador de cantidad con botones para restar y sumar.
---


## Resumen

`Stepper` cambia una cantidad pequeña de a uno, con − y +. Nace de la compra de pasajes de Cordura y es el *stepper* de Apple.

### Cuándo usarlo
- Cantidades pequeñas y enteras: pasajeros, pasajes, maletas.

### Cuándo no usarlo
- **Cantidades grandes o que se escriben mejor:** `TextInput` numérico.
- **Un valor en un rango continuo:** `Slider`.

## Anatomía

1. **Restar** (−).
2. **Valor**, con un ícono opcional que dice qué se cuenta.
3. **Sumar** (+).

> **Imagen pendiente:** el contador de pasajeros con el ícono `ticket`, en 1 (restar desactivado) y en 3.

## Contenido

- `icon`: un ícono conocido que diga qué se cuenta (`ticket` para pasajes).
- `label`: el nombre para el lector («Pasajeros»); pon también una etiqueta visible cerca.

## Comportamiento

- En el mínimo, Restar se desactiva; en el máximo, Sumar.
- Por defecto va de 0 a 99; ajústalo con `min` y `max`.

## Relacionados

`Slider` · `TextInput` · Formularios.

## Referencias

- Apple, Human Interface Guidelines: Steppers.
