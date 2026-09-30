# Textarea

Un campo de varias líneas para texto largo: comentarios, descripciones, reclamos.


## Uso

### Resumen

`Textarea` recibe texto de varias líneas. Tiene el mismo borde, etiqueta, ayuda y contador que `TextInput`, con esquinas de panel y la etiqueta siempre arriba.

#### Cuándo usarlo
- Comentarios, descripciones, mensajes, reclamos: texto de más de una oración.

#### Cuándo no usarlo
- Un dato corto (nombre, correo, código): `TextInput`.
- Texto con formato (negritas, listas): ALMA aún no tiene editor enriquecido.

### Anatomía

1. **Contenedor:** esquinas `radius-panel`, borde de 1 px.
2. **Etiqueta:** siempre flotando en el chip sobre el borde.
3. **Área de texto:** 4 líneas por defecto; se agranda hacia abajo.
4. **Ayuda** y **contador**, como en `TextInput`.

> **Imagen pendiente:** anatomía numerada de un campo vacío con texto de ejemplo y uno con texto, ayuda y contador.

### Tamaño

- Alto inicial de 4 líneas (`rows`), nunca menos de 6 rem. La persona puede agrandarlo hacia abajo.
- Ancho del contenedor, con un máximo de 30 rem (unos 65 caracteres por línea).

### Contenido

- **Etiqueta** corta y visible; la pregunta concreta va en la ayuda («Cuéntanos qué pasó»).
- **Texto de ejemplo:** aquí sí se ve en reposo, porque la etiqueta está siempre arriba. Úsalo para un ejemplo real («Por ejemplo: viajo con una bicicleta plegable»).
- **Límite:** si hay `maxLength`, el contador lo muestra desde el inicio. Elige un límite generoso: cortar un reclamo a mitad es peor que leer uno largo.
- **Errores:** di qué falta («Cuéntanos qué pasó en al menos 20 caracteres»).

### Comportamiento

| Estado | Qué cambia |
|---|---|
| Reposo | Borde de 1 px; etiqueta en el chip. |
| Puntero encima | Borde `field-border-hover`. |
| Foco | Borde de 2 px. |
| Error | Borde y etiqueta en rojo; mensaje en el pie. |
| Desactivado | Todo apagado; no recibe foco. |
| Solo lectura (`readOnly`) | Borde punteado; el texto se lee con contraste normal y se puede copiar, pero no cambiar. |

- Enter crea una línea nueva; nunca envía el formulario.
- El contador cuenta caracteres, no palabras.

> **Imagen pendiente:** los estados en tema oscuro y claro.

### Relacionados

`TextInput` · `Modal` (para reclamos en diálogo).

### Referencias

- Apple, Human Interface Guidelines: Text views.
- IBM, Carbon Design System: Text input (text area).

## Estilo

### Color

Usa los mismos tokens que `TextInput`:

| Elemento | Propiedad | Token |
|---|---|---|
| Contenedor | borde (1 px) | `field-border` |
| Contenedor | fondo | transparente |
| Contenedor:hover | borde | `field-border-hover` |
| Contenedor:focus | borde (2 px) | `field-border` |
| Contenedor:active | borde | `field-border-active` |
| Contenedor:error | borde | `field-border-error` |
| Contenedor:disabled | borde | `field-border-disabled` |
| Contenedor de solo lectura | borde (1 px, punteado) | `field-border-readonly` |
| Etiqueta | color del texto | `field-label` |
| Etiqueta flotante | fondo | `field-label-float-bg` |
| Etiqueta flotante | color del texto | `field-label-float-text` |
| Etiqueta:error | color del texto | `field-text-error` |
| Etiqueta flotante:error | color del texto | `field-label-float-error` |
| Texto escrito | color | `field-text` |
| Texto escrito:error | color | `field-text-error` |
| Texto de ejemplo | color | `field-placeholder` |
| Etiqueta, texto e ícono:disabled | color | `field-text-disabled` |
| Ayuda y contador | color | `text-01` |

El texto de ejemplo se ve también en reposo (`field-placeholder`).

### Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso | Interlineado | Estilo de texto |
|---|---|---|---|---|
| Etiqueta flotante | 11 / 0,6875 | Regular / 400 | 1,4 | `web-label-s` |
| Texto escrito | 14 / 0,875 | Regular / 400 | 1,5 | `web-label-m` con interlineado 1,5 |
| Ayuda y contador | 11 / 0,6875 | Regular / 400 | 1,4 | `web-label-s` |

### Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Contenedor | radio | `radius-panel` (0 px) |
| Contenedor | relleno | 16 px (`space-16`); 15 px con el borde de 2 px del foco |
| Área de texto | alto mínimo | 6 rem (96 px), 4 líneas por defecto |
| Área de texto | cambio de tamaño | solo vertical |
| Etiqueta flotante | posición | sobre el borde superior, a 8 px del inicio |

### Tamaño

| Propiedad | Valor |
|---|---|
| Ancho | 100 % del contenedor, máximo 30 rem |
| Alto | según `rows`; crece con el texto grande |

### Movimiento y contraste

Igual que `TextInput`: borde en `duration-fast-02`, sin animaciones con movimiento reducido; texto a 4,5:1 (7:1 en alto contraste) y borde a 3:1, verificados en los cuatro temas.

## Código

### Uso

```js
const { Textarea } = window.AlmaDS;
h(Textarea, { label: 'Comentario para el conductor', placeholder: 'Por ejemplo: viajo con una bicicleta plegable', maxLength: 200, helper: 'Opcional' })
```

### Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `label` | `string` | — | Etiqueta visible. |
| `value` / `defaultValue` | `string` | `''` | Controlado o no controlado. |
| `onChange` | `(value, event) => void` | — | Recibe el texto. |
| `rows` | `number` | `4` | Alto inicial en líneas. |
| `placeholder` | `string` | — | Ejemplo real. |
| `helper` | `string` | — | Ayuda. |
| `error` | `boolean \| string` | — | Error; el texto reemplaza la ayuda. |
| `maxLength` | `number` | — | Límite y contador. |
| `required`, `disabled` | `boolean` | `false` | — |
| `readOnly` | `boolean` | `false` | Solo lectura. |
| `name`, `id` | `string` | `id` automático | — |

### HTML y CSS

```html
<div class="alma-field alma-field--area alma-field--filled">
  <div class="alma-field__box">
    <label for="c" class="alma-field__label">Comentario</label>
    <textarea id="c" class="alma-field__input alma-field__textarea" rows="4"></textarea>
  </div>
</div>
```

### Flutter

Tokens compartidos con `TextInput` en `dist/dart/alma_tokens.dart`. El widget llega en la fase 4.

## Accesibilidad

### Qué ofrece ALMA

#### Comportamiento
- `<label>` unido al campo, ayuda y error con `aria-describedby`, error con `aria-invalid`.
- El contador visible está oculto para lectores de pantalla (`aria-hidden`) para no leerse en cada tecla; el límite lo hace cumplir `maxLength`.
- Se agranda hacia abajo sin romper la página; texto en rem, probado al 200 %.

#### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Tab | Entra y sale del campo. |
| Enter | Nueva línea (nunca envía). |

### Recomendaciones de diseño

- Si el límite importa, dilo en la ayuda («Hasta 200 caracteres»): el contador no se anuncia.
- No uses el texto de ejemplo como única instrucción.

### Consideraciones de desarrollo

- No captures Enter para enviar: rompe la escritura de párrafos.
- Si validas al enviar, lleva el foco al campo con error.

### Verificación

axe sin problemas en los cuatro temas; probado con texto al 200 %. Pendiente: VoiceOver y NVDA.
