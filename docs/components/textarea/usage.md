---
component: Textarea
tab: Uso
summary: Un campo de varias líneas para texto largo: comentarios, descripciones, reclamos.
---

## Resumen

`Textarea` recibe texto de varias líneas. Tiene el mismo borde, etiqueta, ayuda y contador que `TextInput`, con esquinas de panel y la etiqueta siempre arriba.

### Cuándo usarlo
- Comentarios, descripciones, mensajes, reclamos: texto de más de una oración.

### Cuándo no usarlo
- Un dato corto (nombre, correo, código): `TextInput`.
- Texto con formato (negritas, listas): ALMA aún no tiene editor enriquecido.

## Anatomía

1. **Contenedor:** esquinas `radius-panel`, borde de 1 px.
2. **Etiqueta:** siempre flotando en el chip sobre el borde.
3. **Área de texto:** 4 líneas por defecto; se agranda hacia abajo.
4. **Ayuda** y **contador**, como en `TextInput`.

> **Imagen pendiente:** anatomía numerada de un campo vacío con texto de ejemplo y uno con texto, ayuda y contador.

## Tamaño

- Alto inicial de 4 líneas (`rows`), nunca menos de 6 rem. La persona puede agrandarlo hacia abajo.
- Ancho del contenedor, con un máximo de 30 rem (unos 65 caracteres por línea).

## Contenido

- **Etiqueta** corta y visible; la pregunta concreta va en la ayuda («Cuéntanos qué pasó»).
- **Texto de ejemplo:** aquí sí se ve en reposo, porque la etiqueta está siempre arriba. Úsalo para un ejemplo real («Por ejemplo: viajo con una bicicleta plegable»).
- **Límite:** si hay `maxLength`, el contador lo muestra desde el inicio. Elige un límite generoso: cortar un reclamo a mitad es peor que leer uno largo.
- **Errores:** di qué falta («Cuéntanos qué pasó en al menos 20 caracteres»).

## Comportamiento

| Estado | Qué cambia |
|---|---|
| Reposo | Borde de 1 px; etiqueta en el chip. |
| Puntero encima | Borde `field-border-hover`. |
| Foco | Borde de 2 px. |
| Error | Borde y etiqueta en rojo; mensaje en el pie. |
| Desactivado | Todo apagado; no recibe foco. |

- Enter crea una línea nueva; nunca envía el formulario.
- El contador cuenta caracteres, no palabras.

> **Imagen pendiente:** los estados en tema oscuro y claro.

## Relacionados

`TextInput` · `Modal` (para reclamos en diálogo).

## Referencias

- Apple, Human Interface Guidelines: Text views.
- IBM, Carbon Design System: Text input (text area).
