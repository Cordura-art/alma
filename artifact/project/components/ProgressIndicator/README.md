# ProgressIndicator

Los pasos de un flujo de varias pantallas.


## Uso

### Resumen

`ProgressIndicator` muestra en qué paso de un flujo está la persona, cuáles terminó y cuáles faltan. Sigue el *progress indicator* de Carbon.

#### Cuándo usarlo
- Flujos de 3 a 6 pasos: comprar un pasaje, crear una cuenta, verificar identidad.

#### Cuándo no usarlo
- **El avance de una sola tarea:** `ProgressBar`.
- **Pasos que se pueden hacer en cualquier orden:** `Tabs` o una lista.
- **Dos pasos:** no hace falta.

### Estados de cada paso

| Estado | Ícono | Uso |
|---|---|---|
| Completado | `checkmark--outline` | Terminado; se puede volver si hay `onSelect`. |
| Actual | `incomplete` | Donde está la persona. |
| Pendiente | `circle-dash` | Todavía no; no se puede abrir. |
| Con error | `warning` | Hay algo que corregir. |

### Anatomía

1. **Línea** del paso (arriba en horizontal, a la izquierda en vertical).
2. **Ícono** del estado.
3. **Nombre** del paso.
4. **Descripción** (opcional).

![ProgressIndicator de la compra de un pasaje en cuatro pasos (viaje, asientos, pasajeros y pago), con el tercero en curso, en horizontal y en vertical.](assets/Componentes/progress-indicator-compra.png)

### Contenido

- Nombres de una o dos palabras, con sustantivo: «Viaje», «Asientos», «Pasajeros», «Pago».
- La descripción, solo si ayuda: un dato ya elegido («Semicama, asiento 14»).

### Comportamiento

- Con `onSelect`, los pasos completados se pueden abrir para corregir; los pendientes nunca.
- Bajo 672 px se ve siempre en columna.

### Relacionados

`ProgressBar` · Formularios.

### Referencias

- IBM, Carbon Design System: Progress indicator.

## Estilo

### Color

| Elemento | Propiedad | Token |
|---|---|---|
| Línea (pendiente) | color | `progress-indicator-line` |
| Línea (completado) | color | `progress-indicator-line-complete` |
| Línea (actual) | color | `progress-indicator-current` |
| Ícono (pendiente) | color | `progress-indicator-incomplete` |
| Ícono (completado) | color | `progress-indicator-complete` |
| Ícono (actual) | color | `progress-indicator-current` |
| Ícono (error) | color | `progress-indicator-error` |
| Nombre | color del texto | `text-01` (Medium en el actual) |
| Descripción | color del texto | `text-02` |
| Paso:focus | contorno | `focus` (2 px, separado 2 px) |

### Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso |
|---|---|---|
| Nombre | 14 / 0,875 | `font-weight-body`; `font-weight-emphasis` en el actual |
| Descripción | 12 / 0,75 | `font-weight-body` |

### Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Pasos | separación | 2 px |
| Paso (horizontal) | ancho mínimo | 128 px (8 rem) |
| Línea | grosor | 2 px |
| Ícono | tamaño | 20 px |
| Ícono y texto | separación | 8 px |
| Paso | alto mínimo | 44 px |

![Medidas de ProgressIndicator: tamaño del ícono de cada paso, separación entre ícono y texto, y línea entre pasos.](assets/Componentes/progress-indicator-medidas.png)

### Contraste

Íconos y líneas a 3:1; textos a 4,5:1, en los cuatro temas.

## Código

### Uso

```js
const { ProgressIndicator } = window.AlmaDS;
h(ProgressIndicator, { label: 'Compra de pasajes', current: 2, onSelect: goToStep, steps: [
  { label: 'Viaje', description: 'Santiago → Viña' },
  { label: 'Asientos', description: 'Semicama, 14' },
  { label: 'Pasajeros' },
  { label: 'Pago' }] })
```

### Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `steps` | `Array<{ label, description?, error? }>` | — | De 3 a 6. |
| `current` | `number` | — | Índice del paso actual. |
| `onSelect` | `(index) => void` | — | Permite volver a pasos completados. |
| `vertical` | `boolean` | `false` | En columna (siempre bajo 672 px). |
| `label` | `string` | `'Progreso'` | Nombre de la lista. |

## Accesibilidad

### Qué ofrece ALMA

- Es una lista ordenada (`ol`) nombrada por `label`: el lector dice cuántos pasos hay.
- Cada paso dice su estado en texto oculto («Asientos, completado»); el color no es la única pista.
- El paso actual lleva `aria-current="step"`.
- Con `onSelect`, los completados son botones; los pendientes no son interactivos.

#### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Tab | Recorre los pasos completados. |
| Enter o Espacio | Vuelve a ese paso. |

### Recomendaciones de diseño

- Cada paso lleva también su título en la pantalla, para quien no mira el indicador.

### Consideraciones de desarrollo

- Al cambiar de paso, lleva el foco al título del paso nuevo.

### Verificación

axe sin problemas en los cuatro temas. Pendiente: VoiceOver y NVDA.
