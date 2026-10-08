# DigitEntry

Un código corto de números, un dígito por casilla.


## Uso

### Resumen

`DigitEntry` pide un código corto: el de verificación que llega por correo o mensaje, o un PIN. Cada dígito tiene su casilla, y así se ve de inmediato cuántos son y cuántos faltan. Es la *digit entry view* de Apple.

### Cuándo usarlo

- Para un código de 4 a 8 dígitos que la persona copia de otro lugar.
- En el patrón **Inicio de sesión**, para el segundo paso.

### Cuándo no

- Para un número que la persona sabe de memoria y es largo (un RUT, un teléfono): eso es un `TextInput`.
- Para una contraseña con letras.
- Con más de 8 dígitos: no caben, y nadie los cuenta de un vistazo.

### Anatomía

1. **Rótulo:** qué código es. Texto principal.
2. **Casillas:** una por dígito.
3. **Casilla actual:** la que sigue, marcada con el foco.
4. **Ayuda o error:** dónde llegó el código, o qué falló. Texto secundario; el error, en su color y con ícono.

![Anatomía de DigitEntry: el rótulo «Código de verificación» (1), seis casillas (2) con las tres primeras llenas y la cuarta marcada como actual (3), y debajo la ayuda «Te lo enviamos al correo» (4).](assets/Componentes/digit-entry-anatomia.png)

### Comportamiento

- **Se escribe de corrido.** No hay que pasar de casilla en casilla.
- **Se puede pegar** el código entero.
- **El sistema puede llenarlo solo** cuando llega el mensaje.
- **Al completar, avisa** (`onComplete`): puedes verificar sin pedir un botón.
- **Si falla, no se borra.** Se dice qué pasó y la persona corrige.

### Contenido

- La ayuda dice **dónde llegó** el código, con el dato a medias: «c•••@correo.cl».
- Ofrece cerca cómo pedir otro: un `Button` `plain` «Enviar otro código».
- El error dice qué hacer: «El código no coincide. Revisa el último que te enviamos.»

### Relacionados

`TextInput` · Inicio de sesión · Formularios · Jerarquía.

### Referencias

- Apple, Human Interface Guidelines: Digit entry views.

## Estilo

### Color

| Elemento | Propiedad | Token |
|---|---|---|
| Rótulo | color del texto | `text-01` |
| Casilla | borde | `field-border` |
| Dígito | color del texto | `field-text` |
| Casilla actual | borde y contorno | `field-border`, de 2 px, y `focus` |
| Ayuda | color del texto | `text-02` |
| Error | borde y texto | `field-border-error` y `field-text-error` |

### Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso |
|---|---|---|
| Rótulo | 14 / 0,875 | `font-weight-body` |
| Dígito | 24 / 1,5, cifras del mismo ancho | `font-weight-body` |
| Ayuda y error | 12 / 0,75 | `font-weight-body` |

### Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Casilla | tamaño | 48 × 56 px (`size-field` de alto) |
| Casilla | radio | `radius-field` |
| Casillas | separación | `space-8` |
| Rótulo, casillas y ayuda | separación | `space-8`: son partes de un mismo campo |
| Ícono de error y su texto | separación | `space-4` |

## Código

### Uso

```js
const { DigitEntry } = window.AlmaDS;

h(DigitEntry, {
  label: 'Código de verificación',
  helper: 'Te lo enviamos al correo c•••@correo.cl',
  error: fallo ? 'El código no coincide. Revisa el último que te enviamos.' : undefined,
  onComplete: function (codigo) { verificar(codigo); }
})
```

### Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `label` | texto | — | Qué código es. Obligatorio. |
| `length` | número | 6 | Cuántos dígitos. |
| `value`, `defaultValue` | texto | — | El código, controlado o inicial. |
| `onChange` | función | — | Recibe el código con cada cambio. |
| `onComplete` | función | — | Recibe el código cuando está completo. |
| `helper` | texto | — | La ayuda. |
| `error` | texto | — | El error. Reemplaza a la ayuda. |
| `mask` | sí o no | no | Muestra puntos en vez de los dígitos: para un PIN. |
| `autoComplete` | texto | `one-time-code` | Lo que el navegador puede llenar. |
| `disabled` | sí o no | no | — |

## Accesibilidad

### Qué ofrece ALMA

- **Es un solo campo**, con su rótulo. Un lector de pantalla no encuentra seis campos sin nombre, que es el error más común de estos controles.
- **Teclado numérico** en un teléfono.
- **Se puede pegar y autocompletar.**
- **La ayuda y el error se leen con el campo.**
- **El error no depende del color:** lleva ícono y texto.
- **La casilla actual tiene foco visible.**

### Teclado

| Tecla | Qué hace |
|---|---|
| Números | Llenan las casillas en orden. |
| Retroceso | Borra el último dígito. |
| Pegar | Pone el código entero. |

### Recomendaciones de diseño

- No verifiques cada dígito: espera el código completo.
- No pongas un tiempo límite corto. Si el código caduca, dilo y ofrece otro.
- No dependas solo de este paso: ofrece otra manera de verificar.

### Consideraciones de desarrollo

- No reemplaces el campo único por varios campos. Se pierde pegar, autocompletar y el nombre.
- Tras un error, deja el foco en el campo.

Pendiente: VoiceOver y NVDA; el autocompletado en un teléfono real.
