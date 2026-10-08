# TokenField

Varios valores en un solo campo, cada uno una ficha que se puede quitar.


## Uso

### Resumen

`TokenField` reúne varios valores en un campo: los destinatarios de un mensaje, las etiquetas de un viaje. Lo que se escribe se vuelve una ficha, y cada ficha se puede quitar. Es el *token field* de Apple.

### Cuándo usarlo

- Cuando se eligen **varios** valores y no se sabe cuántos.
- Cuando los valores se escriben, con o sin sugerencias: correos, etiquetas, ciudades.

### Cuándo no

- Para **uno** solo: `Combobox` o `TextInput`.
- Para pocas opciones conocidas: `Checkbox`, o `Tag` que se marcan.
- Para un texto libre: `Textarea`.

### Anatomía

1. **Rótulo.**
2. **Fichas:** los valores ya elegidos, cada una con su botón para quitarla.
3. **Texto:** donde se escribe el siguiente.
4. **Sugerencias** (opcional).
5. **Ayuda o error.** Texto secundario.

![Anatomía de TokenField: el rótulo «Compartir con» (1), dos fichas con correos y su botón de quitar (2), el lugar donde se escribe el siguiente (3) y debajo la ayuda «Separa los correos con una coma» (5).](assets/Componentes/token-field-anatomia.png)

### Comportamiento

- **Enter o una coma** convierten lo escrito en ficha. Al salir del campo, también.
- **Retroceso con el campo vacío** va a la última ficha; otro Retroceso, o Enter, la quita.
- **Pegar una lista** separada por comas agrega cada valor.
- **No se repite:** un valor que ya está no se agrega de nuevo, y se dice.
- **Lo que no vale no se vuelve ficha:** se queda escrito para corregirlo.
- **El campo crece** hacia abajo con las fichas.

### Contenido

- La ayuda dice cómo separar: «Separa los correos con una coma».
- Una ficha muestra lo necesario para reconocer el valor. Si es largo, se corta con puntos suspensivos y se lee entero al enfocar.

### Relacionados

`Tag` · `Combobox` · `TextInput` · Compartir · Formularios · Jerarquía.

### Referencias

- Apple, Human Interface Guidelines: Token fields.

## Estilo

### Color

Es un campo de ALMA con fichas dentro.

| Elemento | Propiedad | Token |
|---|---|---|
| Caja, rótulo, texto | — | Los de `Textarea` |
| Ficha | — | `Tag` gris, tamaño `sm` |
| Texto de ejemplo | color | `field-placeholder` (`text-03`) |
| Ayuda | color del texto | `text-02` |
| Error | borde y texto | `field-border-error` y `field-text-error` |
| Sugerencias | — | El menú de ALMA |

### Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Caja | alto mínimo | El de un campo (`size-field`) |
| Caja | relleno | `space-8` arriba y abajo, `space-16` a los lados |
| Fichas, y fichas con el texto | separación | `space-8` |
| Texto | ancho mínimo | 6 rem: siempre hay dónde escribir |
| Caja y ayuda | separación | `space-4` |
| Sugerencias | distancia a la caja | `space-4` |
| Todo | ancho máximo | 30 rem |

## Código

### Uso

```js
const { TokenField } = window.AlmaDS;

h(TokenField, {
  label: 'Compartir con',
  placeholder: 'Escribe un correo',
  value: correos, onChange: setCorreos,
  validate: function (v) { return /@/.test(v); },
  helper: 'Separa los correos con una coma.'
})

// Con sugerencias
h(TokenField, { label: 'Destinos favoritos', suggestions: ciudades, defaultValue: ['Viña del Mar'] })
```

### Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `label` | texto | — | El rótulo. Obligatorio. |
| `value`, `defaultValue` | lista de textos | — | Los valores, controlados o iniciales. |
| `onChange` | función | — | Recibe la lista con cada cambio. |
| `placeholder` | texto | — | El texto de ejemplo. Solo se ve sin fichas. |
| `suggestions` | lista de textos | — | Lo que se ofrece al escribir. |
| `validate` | función | — | Recibe un valor y dice si vale. |
| `addOnBlur` | sí o no | sí | Si lo escrito se vuelve ficha al salir del campo. |
| `helper`, `error` | texto | — | La ayuda, o el error. |
| `required`, `disabled` | sí o no | no | — |

## Accesibilidad

### Qué ofrece ALMA

- **El campo tiene su rótulo**, y las fichas son una lista con nombre: «Compartir con: 2 elegidos».
- **Cada ficha se quita con un botón con nombre:** «Quitar tomas@correo.cl».
- **Cada cambio se anuncia:** «Agregaste…», «Quitaste…», «…ya está», «…no es válido».
- **Al quitar una ficha, el foco vuelve al campo.**
- **Con sugerencias es un cuadro combinado:** dice cuántas hay y cuál está marcada.
- **Todo con teclado**, sin arrastrar ni apuntar.

### Teclado

| Tecla | Qué hace |
|---|---|
| Enter, coma | Convierte lo escrito en ficha. |
| Retroceso, con el campo vacío | Va al botón de quitar de la última ficha. |
| Tab, Mayúsculas + Tab | Recorre los botones de quitar y el campo. |
| ↓ ↑ | Recorren las sugerencias. |
| Esc | Cierra las sugerencias y borra lo escrito. |

### Recomendaciones de diseño

- Di en la ayuda cómo se separan los valores. No es evidente.
- No uses solo el color de la ficha para decir algo (un correo de fuera, por ejemplo): agrégale un ícono o un texto.

### Consideraciones de desarrollo

- Si validas, explica el error con `error`: el anuncio dice que no vale, no por qué.
- No quites fichas solo. Si un valor dejó de valer, márcalo y deja que la persona decida.

Pendiente: VoiceOver y NVDA.
