# TimePicker

Campo de hora en formato de 24 horas, como se usa en Chile («14:30»). Es un `TextInput` que valida al salir.

## Qué aporta quien lo usa
- `label`, `value` o `defaultValue` (`"HH:MM"`), `onChange`.
- Acepta `1430`, `14.30`, `14h30` y `9:05`, y lo deja como `14:30` o `09:05`.
- Si la hora no existe, el error dice cómo escribirla. `helper` por defecto: «Formato de 24 horas, por ejemplo 14:30».
