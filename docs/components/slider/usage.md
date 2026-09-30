---
component: Slider
tab: Uso
summary: Una pista con una perilla para elegir un valor en un rango.
---


## Resumen

`Slider` elige un valor entre un mínimo y un máximo arrastrando una perilla. Es el *slider* de Apple.

### Cuándo usarlo
- Valores aproximados en un rango continuo: volumen, precio máximo, distancia.
- Cuando ver el rango completo ayuda a decidir.

### Cuándo no usarlo
- **Un valor exacto importante:** `TextInput` numérico, o agrega el campo (`showField`).
- **Pocos valores enteros:** `Stepper`.

## Anatomía

1. **Etiqueta** y **valor**, arriba.
2. **Ícono del mínimo** (opcional).
3. **Pista**, rellena del mínimo a la perilla.
4. **Perilla.**
5. **Ícono del máximo** (opcional).
6. **Campo** del valor exacto (opcional).

![Un Slider de precio máximo con su campo numérico, en tema oscuro y claro.](assets/Componentes/slider-precio.png)

## Reglas de Apple

- El mínimo va a la izquierda y el máximo a la derecha, siempre.
- Íconos en los extremos cuando ayudan a entender qué significa cada lado.
- Si el rango es amplio, agrega el campo con el valor exacto.

## Contenido

- `format` dice cómo se lee el valor: «60%», «$12.000».

## Relacionados

`Stepper` · `TextInput` · Formularios.

## Referencias

- Apple, Human Interface Guidelines: Sliders.
- IBM, Carbon Design System: Slider.
