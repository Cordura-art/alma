# Stepper

Un contador de cantidad con botones para restar y sumar.


## Uso

### Resumen

`Stepper` cambia una cantidad pequeña de a uno, con − y +. Nace de la compra de pasajes de Cordura y es el *stepper* de Apple.

#### Cuándo usarlo
- Cantidades pequeñas y enteras: pasajeros, pasajes, maletas.

#### Cuándo no usarlo
- **Cantidades grandes o que se escriben mejor:** `TextInput` numérico.
- **Un valor en un rango continuo:** `Slider`.

### Anatomía

1. **Restar** (−).
2. **Valor**, con un ícono opcional que dice qué se cuenta.
3. **Sumar** (+).

![Stepper para contar pasajeros, con el ícono ticket: en 1, con el botón de restar desactivado, y en 3.](assets/Componentes/stepper-pasajeros.png)

### Contenido

- `icon`: un ícono conocido que diga qué se cuenta (`ticket` para pasajes).
- `label`: el nombre para el lector («Pasajeros»); pon también una etiqueta visible cerca.

### Comportamiento

- En el mínimo, Restar se desactiva; en el máximo, Sumar.
- Por defecto va de 0 a 99; ajústalo con `min` y `max`.

### Relacionados

`Slider` · `TextInput` · Formularios.

### Referencias

- Apple, Human Interface Guidelines: Steppers.

## Estilo

### Color

| Elemento | Propiedad | Token |
|---|---|---|
| Botones y valor | fondo | `stepper-bg` |
| Botones y valor | borde (1 px) | `stepper-border` |
| Botón:hover | fondo | `stepper-bg-hover` |
| Botón desactivado | color del ícono | `disabled-03` |
| Valor | color del texto | `text-02` |
| Botón:focus | contorno | `focus` (2 px, separado 2 px) |

### Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso | Estilo de texto |
|---|---|---|---|
| Valor | 16 / 1 | `font-weight-body` | `web-label-l` |

### Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Elementos | separación | 24 px |
| Botones y valor | radio | `radius-button` |
| Botón | ancho mínimo | igual al alto |
| Valor | ancho mínimo | 130 px |
| Ícono y número | separación | 10 px |

![Medidas de Stepper: alto de 44 px de botones y valor, ancho de cada parte y radio.](assets/Componentes/stepper-medidas.png)

### Tamaño

| Densidad | Alto (px / rem) |
|---|---|
| Normal | 56 / 3,5 (`size-field`) |
| Compacta (puntero fino) | 40 / 2,5 |

### Contraste

Íconos de los botones a 3:1 y valor a 4,5:1 sobre `stepper-bg`, en los cuatro temas.

## Código

### Uso

```js
const { Stepper } = window.AlmaDS;
h(Stepper, { label: 'Pasajeros', icon: 'ticket', min: 1, max: 8, defaultValue: 1, onChange: setPasajeros })
```

### Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `min` / `max` | `number` | `0` / `99` | Límites. |
| `value` / `defaultValue` | `number` | `min` | Controlado o no controlado. |
| `onChange` | `(value) => void` | — | — |
| `icon` | `string` | — | Qué se cuenta. |
| `label` | `string` | — | Nombre del grupo. |

## Accesibilidad

### Qué ofrece ALMA

- Es un grupo (`role="group"`) nombrado por `label`.
- Los botones se llaman «Restar» y «Sumar».
- El valor es una región `aria-live="polite"`: al cambiar, el lector dice el número nuevo.
- En los límites, el botón se desactiva.

#### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Tab | Recorre Restar y Sumar. |
| Enter o Espacio | Resta o suma uno. |

### Recomendaciones de diseño

- Pon una etiqueta visible junto al contador: el ícono solo no basta.

### Consideraciones de desarrollo

- Si Sumar se desactiva con el foco encima, el foco se pierde: considera llevarlo a Restar.

### Verificación

axe sin problemas en los cuatro temas. Pendiente: VoiceOver y NVDA.
