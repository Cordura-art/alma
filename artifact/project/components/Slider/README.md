# Slider

Pista con una perilla para elegir un valor entre un mínimo y un máximo. La parte entre el mínimo y la perilla se rellena (en Apple, *slider*).

## Reglas de Apple
- El mínimo va a la izquierda y el máximo a la derecha, siempre.
- Íconos en los extremos (`minIcon`, `maxIcon`) cuando ayudan a entender qué significa cada lado: volumen bajo y alto, imagen chica y grande.
- Si el rango es amplio, agrega un campo con el valor exacto (`showField`). Para pasos enteros, combínalo con `Stepper`.

## Qué aporta quien lo usa
- `label`, `min`, `max`, `step` y `value`/`onChange`.
- `format`: cómo se lee el valor («60 %», «$12.000»). Se usa en pantalla y para el lector de pantalla (`aria-valuetext`).

## Aspecto y accesibilidad
- Relleno `control-on`, pista vacía `border-control` y perilla de 24 px con un anillo del color de fondo. El área de toque es de 44 px.
- Es un control nativo de rango: las flechas del teclado mueven un paso, y Re Pág / Av Pág mueven pasos más grandes.
