# AILabel

La marca que lleva todo lo que una IA generó, y la explicación que abre.


## Uso

### Resumen

`AILabel` dice de dónde viene lo que estás leyendo: lo generó una IA. Es el ícono `ai-label` y el texto «IA». Sola, es una marca. Con una explicación, se abre y cuenta qué hizo la IA, con qué y cuándo.

Antes de usarla, lee **Interfaces de IA › Transparencia**.

### Cuándo usarla

- Junto a todo contenido que una IA generó: un resumen, un borrador, una categoría sugerida, una imagen.
- En una sugerencia que la persona todavía no acepta.
- En lo generado que la persona editó, con `edited`.

### Cuándo no

- En contenido que no generó una IA, para que parezca más avanzado.
- En cada mensaje de una conversación con un asistente: ahí basta su nombre y el aviso bajo la caja de pedido.
- Como botón para pedirle algo a la IA. Eso es un `Button` con el ícono `ai-generate`.
- Como estado. Que la IA esté trabajando lo dice `ChatMessage` o un `ActivityIndicator`.

### Anatomía

1. **Ícono** `ai-label`.
2. **Texto:** «IA», o «IA · editado».
3. **Explicación** (opcional): se abre al tocar la marca.
4. **Qué hizo, con qué y cuándo.**
5. **Qué revisar.**
6. **Enlace al detalle** (opcional).

![Anatomía de AILabel: el ícono (1) y el texto «IA» (2) forman la marca. Abierta, muestra su explicación (3) con lo que hizo y cuándo (4), qué revisar (5) y un enlace «Cómo funciona» (6).](assets/Componentes/ai-label-anatomia.png)

### Dónde va

Va en el contenedor más chico que encierre todo lo generado, una sola por contenedor.

| Lo generado es | La marca va |
|---|---|
| Toda la página | En el encabezado, junto al título. |
| Una sección o una tarjeta | Junto a su título, o en su esquina superior derecha. |
| El valor de un campo | Al final del campo, mientras nadie lo edite. |
| Una celda de una tabla | En la celda, o en una columna propia si son muchas. |
| Una imagen | Sobre su esquina inferior izquierda. |
| Una sugerencia | Junto a sus acciones. |

### La explicación

Responde siempre lo mismo, en este orden, y cabe en cuatro líneas.

| Parte | Propiedad | Ejemplo |
|---|---|---|
| Qué hizo | `what` | «Resumí tu pasaje y los avisos de la empresa.» |
| Con qué | `basis` | «Usé tus viajes de marzo.» |
| Cuándo | `when` | «Hoy, 09:12» |
| Qué revisar | `review` | «Revisa la hora de salida antes de viajar.» |
| El detalle | `detailHref` | Un enlace «Cómo funciona». |

El nombre del modelo, sus versiones y sus límites van en la página del detalle, no aquí.

### Lo editado

Cuando la persona cambia lo generado, pasa `edited`: la marca dice «IA · editado». Con `onRevert`, la explicación ofrece volver a la versión de la IA. Si la persona lo reescribe entero, quita la marca.

### Tamaños

| Tamaño | Alto | Para |
|---|---|---|
| `sm` (por defecto) | 24 px | Junto a un título, en una tarjeta, en una celda. |
| `md` | 32 px | Junto al título de una página. |

### Relacionados

`Tag`, `Popover`, `SourceList`. La guía **Interfaces de IA**.

## Estilo

### Color

La marca es neutra. No usa el acento ni un color «de IA»: tiene que verse igual junto a cualquier contenido y en cualquier entidad.

| Elemento | Propiedad | Token |
|---|---|---|
| Marca | fondo | `tag-gray-bg` |
| Ícono y texto | color | `tag-gray-text` |
| Marca que se abre, con el cursor encima | contorno interior | El color del texto |
| Foco | contorno | `focus`, a 2 px de la marca |
| Explicación | fondo y borde | Los de `Popover` |
| Fecha de la explicación | color del texto | `text-02` |

### Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso |
|---|---|---|
| «IA», tamaño `sm` | 11 / 0,6875 | `font-weight-emphasis` |
| «IA», tamaño `md` | 12 / 0,75 | `font-weight-emphasis` |
| Explicación | La de `Popover` | `font-weight-body` |

### Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Marca `sm` | alto | 24 px |
| Marca `md` | alto | 32 px |
| Marca | relleno a los lados | `space-8` |
| Ícono | tamaño | `icon-size-16` |
| Ícono y texto | separación | `space-4` |
| Marca | radio | `radius-tag` |
| Área que responde | alto | El de un control, aunque la marca mida 24 px |
| Partes de la explicación | separación | `space-8` |

## Código

### Uso

```jsx
const { AILabel } = window.AlmaDS;

// Sola
h(AILabel)

// Con su explicación
h(AILabel, {
  what: 'Resumí tu pasaje y los avisos de la empresa.',
  when: 'Hoy, 09:12',
  review: 'Revisa la hora de salida antes de viajar.',
  detailHref: '/ia/como-funciona'
})

// Lo generado que la persona editó
h(AILabel, { edited: true, what: 'Escribí este borrador y tú lo cambiaste.', onRevert: volver })
```

### Propiedades

| Propiedad | Tipo | Por defecto | Qué hace |
|---|---|---|---|
| `what` | texto | — | Qué hizo la IA. |
| `basis` | texto | — | Con qué datos lo hizo. |
| `when` | texto | — | Cuándo se generó. |
| `review` | texto | — | Qué conviene revisar. |
| `children` | contenido | — | Más contenido para la explicación, después de lo anterior. |
| `detailHref` | texto | — | Adónde lleva el enlace al detalle. |
| `detailLabel` | texto | «Cómo funciona» | El texto de ese enlace. |
| `edited` | sí o no | no | La marca dice «IA · editado». |
| `onRevert` | función | — | Muestra en la explicación el botón para volver atrás. |
| `revertLabel` | texto | «Volver al original», o «Volver a la versión de la IA» con `edited` | El texto de ese botón. |
| `size` | `sm`, `md` | `sm` | El tamaño. |
| `title` | texto | «Generado por IA» | El título de la explicación. |
| `placement`, `align` | como en `Popover` | abajo, al inicio | Hacia dónde se abre. |

Sin `what`, `basis`, `when`, `review`, `children` ni `onRevert`, la marca no se abre: es un texto, no un botón.

## Accesibilidad

### Qué ofrece ALMA

- **Un nombre que se entiende.** Un lector de pantalla no dice «IA»: dice «Generado por IA», o «Generado por IA y editado».
- **Dice si se abre.** Cuando tiene explicación es un botón, y su nombre termina en «Ver explicación». Anuncia si está abierta o cerrada.
- **La explicación es de `Popover`**: recibe el foco al abrirse, Escape la cierra y el foco vuelve a la marca.
- **No depende del color.** La marca es ícono y texto.
- **Área que responde** del alto de un control, aunque la marca se vea de 24 px.

### Teclado

| Tecla | Qué hace |
|---|---|
| Tab | Llega a la marca, si se abre. |
| Enter, Espacio | Abre o cierra la explicación. |
| Esc | Cierra la explicación y vuelve a la marca. |

### Recomendaciones de diseño

- Pon la marca antes o junto al título de lo generado, no al final: quien recorre la página con un lector tiene que saberlo antes de leer el contenido.
- Una marca por contenedor. Diez marcas seguidas en una lista se leen diez veces: usa una en el encabezado de la lista.
- En una imagen generada, además de la marca, empieza el texto alternativo con «Imagen generada:».

### Consideraciones de desarrollo

- No reemplaces el texto por el ícono solo.
- Si lo generado cambia solo, por ejemplo porque se volvió a generar, actualiza `when`.

Pendiente: VoiceOver y NVDA.
