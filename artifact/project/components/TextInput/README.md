# TextInput

Campo de texto en píldora de ALMA, con borde lima, etiqueta que flota a un chip, texto de ayuda y contador.

## Cuándo usarlo
Para cualquier entrada de texto de una línea: nombres, correos, contraseñas y búsquedas.

## Qué aporta quien lo usa
- `label` (obligatorio): corta. Con `required` se muestra con `*`.
- `helper`: una regla concreta ("Mínimo 4 caracteres"). Va en `label-s`.
- `maxLength`: activa el contador `n/max` a la derecha del helper.
- `error`: `true` o un mensaje. El mensaje reemplaza al helper.
- `type="password"`: agrega el botón del ojo para mostrar u ocultar. Se ve de 24 px, pero su área de toque es de 44 × 44.
- `value` + `onChange(value)` para controlarlo, o `defaultValue`.

## Estados (de Figma)
## Estados
- Reposo: borde 1 px `field-border`, etiqueta en `field-label`. En oscuro son el lima de Figma; en claro, `#566980` y `#3A4660`, porque el lima sobre fondo claro daba 1.2:1.
- Hover: borde `field-border-hover`.
- Foco: borde de 2 px `field-border`; la etiqueta flota a un chip (`secondary-50` con `text-on-interactive`).
- Activo: borde `active-primary`.
- Error: borde `danger-400`, etiqueta y texto `text-error`.
- Deshabilitado: borde, texto e ícono en `ui-04`. Está exento de contraste.
- Placeholder en `text-03` y ojo en `icon-02`: ambos pasan en los dos temas.

Todo pasa WCAG AA en los dos temas: el texto a 4.5:1 o más, y los bordes y el ícono a 3:1 o más.

## No
- No lo uses sin `label`: el placeholder no reemplaza a la etiqueta.
- El ojo es el ícono `view` de Carbon (`view--off` al mostrar la contraseña).
