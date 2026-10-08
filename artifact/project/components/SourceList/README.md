# SourceList

La lista de fuentes de una respuesta generada.


## Uso

### Resumen

`SourceList` muestra de dónde sacó la IA lo que afirma: una lista numerada, con el título de cada fuente, su origen y un enlace. `SourceRef` es el número pequeño que va junto a la frase y lleva a su fuente.

Antes de usarla, lee **Interfaces de IA › Transparencia**.

### Cuándo usarla

- Bajo una respuesta o un resumen que afirma algo que la persona puede querer comprobar.
- Cuando la respuesta sale de documentos de la persona o de páginas concretas.

### Cuándo no

- Si no hay fuentes. No muestres una lista vacía ni una fuente de relleno: di «Esto no lo encontré en tus documentos».
- Para enlaces relacionados que la IA no usó. Una fuente es lo que se usó, no lo que podría interesar.
- Para una bibliografía larga de un documento: eso es contenido, no la fuente de una respuesta.

### Anatomía

1. **Número en el texto** (`SourceRef`): junto a la frase que sale de esa fuente.
2. **Rótulo:** «Fuentes».
3. **Número de la fuente.**
4. **Título**, que es el enlace.
5. **Origen** (opcional): de dónde es. «Tus viajes», «Correo», «Sitio de la empresa».
6. **«Ver las 8»**, cuando hay más de cinco.

![Anatomía de SourceList: junto a una frase, un número pequeño (1). Debajo, el rótulo «Fuentes» (2) y la lista: cada fuente con su número (3), su título como enlace (4) y su origen (5). Al final, el botón «Ver las 8» (6).](assets/Componentes/source-list-anatomia.png)

### Reglas

- **Solo lo que se usó.** Una fuente falsa es peor que ninguna.
- **El título dice qué es**, no la dirección: «Tu pasaje del 31 de marzo», no «pasaje_8842.pdf».
- **El enlace lleva al lugar exacto**: al documento, y si se puede, al párrafo.
- **El orden es el de aparición** en el texto. El número de la frase y el de la lista son el mismo.
- **Hasta cinco, todas a la vista.** Con más, se muestran tres y un botón para ver el resto.
- **El origen ayuda a confiar.** No es lo mismo «Tu pasaje» que «Un foro».

### Relacionados

`ChatMessage`, que ya la trae; `AILabel`; `Link`. La guía **Interfaces de IA**.

## Estilo

### Color

| Elemento | Propiedad | Token |
|---|---|---|
| Rótulo «Fuentes» | color del texto | `text-02` |
| Número de la fuente | fondo y texto | `ui-03` y `text-02` |
| Número de la fuente a la que se llegó | fondo y texto | `interactive-01` y `text-on-interactive` |
| Título | color del texto | `link-text`, subrayado |
| Origen | color del texto | `text-02` |
| Número en el texto (`SourceRef`) | fondo y texto | `ui-03` y `link-text` |

### Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso |
|---|---|---|
| Rótulo, origen | 12 / 0,75 | `font-weight-body` |
| Título | 14 / 0,875 | `font-weight-body` |
| Números | 11 / 0,6875 | `font-weight-body` |

Los números usan cifras del mismo ancho.

### Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Fuentes | separación | `space-8` |
| Número y título | separación | `space-8` |
| Número de la fuente | lado | 20 px |
| Número en el texto | lado | 18 px |
| Números | radio | `radius-chip` |

## Código

### Uso

```jsx
const { SourceList, SourceRef } = window.AlmaDS;

h('p', null,
  'Tu bus sale a las 08:30, del andén 4.', h(SourceRef, { n: 1, listId: 'fuentes' }),
  ' El andén puede cambiar.', h(SourceRef, { n: 2, listId: 'fuentes' }))

h(SourceList, { id: 'fuentes', sources: [
  { title: 'Tu pasaje del 31 de marzo', origin: 'Tus viajes', href: '/viajes/8842' },
  { title: 'Aviso de la empresa, 29 de marzo', origin: 'Correo', href: '/correo/311' }
] })
```

El mismo `id` de la lista va como `listId` en cada `SourceRef`: así el número lleva a su fuente.

### Propiedades de SourceList

| Propiedad | Tipo | Por defecto | Qué hace |
|---|---|---|---|
| `sources` | `[{ title, origin, href, external }]` | — | Las fuentes, en el orden en que aparecen en el texto. Sin fuentes, no dibuja nada. |
| `id` | texto | Se arma solo | Para enlazar los `SourceRef`. |
| `label` | texto | «Fuentes» | El rótulo. |
| `collapseAfter` | número | 5 | Con más fuentes que este número, la lista se pliega. |
| `max` | número | 3 | Cuántas se ven con la lista plegada. |

En cada fuente, `href` es opcional: sin él, el título es texto. `external` abre el enlace en otra pestaña.

### Propiedades de SourceRef

| Propiedad | Tipo | Por defecto | Qué hace |
|---|---|---|---|
| `n` | número | — | El número de la fuente. |
| `listId` | texto | — | El `id` de la lista: el enlace va a `#<listId>-<n>`. |
| `href` | texto | — | Otro destino, en vez del anterior. |
| `onClick` | función | — | Para abrir la fuente de otra manera. |

## Accesibilidad

### Qué ofrece ALMA

- **Es una lista ordenada con nombre**: un lector dice «Fuentes, lista de 2 elementos».
- **Cada enlace se entiende solo**: «Fuente 1: Tu pasaje del 31 de marzo», no «1».
- **El número en el texto también**: se anuncia «Fuente 1», y lleva a su fuente.
- **Al desplegar**, el foco pasa a la primera fuente que apareció.
- **La fuente a la que se llegó se marca**, con color y sin depender solo de él: es además donde queda la vista.

### Teclado

| Tecla | Qué hace |
|---|---|
| Tab | Recorre los números del texto, las fuentes y «Ver las 8». |
| Enter | Sigue el enlace, o despliega la lista. |

### Recomendaciones de diseño

- El título de la fuente tiene que decir qué es sin ver el resto. «Documento» o «Ver» no sirven.
- Si una afirmación no tiene fuente, dilo en el texto. La falta de número no se nota con un lector.

### Consideraciones de desarrollo

- Usa el mismo `id` en la lista y en sus `SourceRef`. Con dos listas en la página, cada una el suyo.
- No pongas los números del texto como `sup` sueltos: sin enlace no llevan a nada y se leen como un número perdido.

Pendiente: VoiceOver y NVDA.
