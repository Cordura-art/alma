# Snippet

La respuesta del asistente como tarjeta: un resultado, o una confirmación que espera.


## Uso

### Resumen

`Snippet` es lo que responde el asistente cuando la respuesta es una cosa y no un texto: un pasaje, un saldo, un cambio que está por hacer. Es compacto, viene de una app y se resuelve en un toque. Es el *snippet* de Apple.

Antes de usarlo, lee la guía **Interfaces de IA › Control**.

### Dos tipos

![Los dos tipos de Snippet. A la izquierda, un resultado: «Tu próximo viaje», con sus datos, la marca de IA y los botones «Abrir» y «Listo». A la derecha, una confirmación: «Voy a cambiar tu pasaje», con lo que cambia y lo que cuesta, y los botones «Cancelar» y «Cambiar pasaje».](assets/Componentes/snippet-tipos.png)

| Tipo | `kind` | Qué hace | Botones |
|---|---|---|---|
| **Resultado** | `result` | Muestra algo. No pide nada. | «Listo», y «Abrir» si lleva a la app. |
| **Confirmación** | `confirmation` | Dice lo que va a pasar y espera. | «Cancelar» y un botón con el nombre de la acción. |

Una acción puede tener los dos: primero la confirmación, y después el resultado.

### Cuándo usarlo

- Cuando el asistente responde con un dato de una app, mejor mostrado que contado.
- Como el **permiso** de un agente: antes de pagar, enviar, borrar o cambiar algo que no se deshace.

### Cuándo no

- Si la respuesta es texto: eso es un `ChatMessage`.
- Para una tarea de varios pasos: eso es una `LiveActivity`, que pide sus permisos con un `Snippet`.
- Para algo que necesita más de una pantalla: abre la app.

### Anatomía

1. **Origen:** la app de la que viene.
2. **Título:** qué es, o qué va a pasar.
3. **Marca de IA**, si lo que muestra fue generado.
4. **Contenido:** los datos, mostrados.
5. **Botones.**

### Contenido

- **Corto.** Es para una interacción liviana. Hasta 400 px de alto; lo que no cabe, está en la app.
- **Se entiende mirándolo.** Lo que el asistente dice en voz alta (`dialogue`) no reemplaza lo que se ve: el título y los datos tienen que bastar.
- **El botón dice la acción:** «Cambiar pasaje», no «Aceptar» ni «Continuar».
- **Una confirmación dice los datos exactos:** qué cambia, cuánto cuesta, con qué se paga.
- **Cancelar no rompe nada.**

### Relacionados

`ChatMessage` · `LiveActivity` · `AILabel` · `ActionSheet` · `Alert` · Interfaces de IA · Diálogos.

### Referencias

- Apple, Human Interface Guidelines: Snippets, App Shortcuts.

## Estilo

### Color

| Elemento | Propiedad | Token |
|---|---|---|
| Fragmento | fondo | Vidrio grueso (`glass-thick`) |
| Fragmento | borde | `border-subtle` |
| Origen | color | `text-02` |
| Título, contenido | color | `text-01` |
| Botón principal | — | `Button` `filled`, principal o destructivo |
| Cancelar, Abrir | — | `Button` `gray` |
| Listo | — | `Button` `tinted` |

Es de vidrio grueso porque lleva texto de los tres niveles y suele ir sobre otro vidrio.

### Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso |
|---|---|---|
| Origen | 11 / 0,6875 | `font-weight-body` |
| Título | 16 / 1 | `font-weight-emphasis` |
| Contenido | 14 / 0,875 | `font-weight-body` |

### Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Fragmento | ancho máximo | 24 rem |
| Fragmento | relleno | `space-16` |
| Fragmento | radio | El doble de `radius-panel` |
| Contenido | alto máximo | 400 px; después se desplaza |
| Partes | separación | `space-16` |
| Botones | alineación | Al final, con `space-8` entre ellos |

## Código

### Uso

```js
const { Snippet } = window.AlmaDS;

// Una confirmación: el permiso de un agente
h(Snippet, {
  kind: 'confirmation', source: 'Viajes', sourceIcon: 'ticket',
  title: 'Voy a cambiar tu pasaje',
  dialogue: 'Voy a cambiar tu pasaje del lunes 30 al martes 31. Cuesta 2.500 pesos más.',
  primaryLabel: 'Cambiar pasaje', onConfirm: cambiar, onCancel: cancelar
}, datos)

// Un resultado
h(Snippet, { kind: 'result', source: 'Viajes', title: 'Tu próximo viaje', ai: true, onOpen: abrir, onDone: cerrar }, datos)
```

Dentro de una conversación, va como contenido de un `ChatMessage`.

### Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `kind` | `result`, `confirmation` | `result` | El tipo. |
| `title` | texto | — | Qué es, o qué va a pasar. |
| `source`, `sourceIcon` | texto | — | La app de la que viene, y su ícono. |
| `children` | contenido | — | Los datos. |
| `dialogue` | texto | — | Lo que el asistente dice. Lo lee un lector de pantalla; no se ve. |
| `showDialogue` | sí o no | no | Lo muestra también a la vista. |
| `ai` | sí o no, o las propiedades de `AILabel` | no | Pone la marca de IA. |
| `primaryLabel` | texto | «Continuar» | El botón de una confirmación. Pon el nombre de la acción. |
| `destructive` | sí o no | no | El botón principal en rojo. |
| `onConfirm`, `onCancel` | función | — | Los de una confirmación. |
| `cancelLabel` | texto | «Cancelar» | — |
| `onDone`, `doneLabel` | función, texto | —, «Listo» | El botón de un resultado. |
| `onOpen`, `openLabel` | función, texto | —, «Abrir» | Lleva a la app. |
| `scrolls` | sí o no | no | Si el contenido se desplaza, lo hace alcanzable con el teclado. |

## Accesibilidad

### Qué ofrece ALMA

- **Es una sección con nombre:** su título.
- **Lo que el asistente dice se lee primero**, aunque no esté a la vista: quien no ve el fragmento recibe lo mismo en palabras.
- **Los botones van en el orden de la vista:** cancelar antes que la acción.
- **El contraste está asegurado** para los tres niveles de texto: es de vidrio grueso.
- **La marca de IA se lee como «Generado por IA».**

### Teclado

| Tecla | Qué hace |
|---|---|
| Tab | Recorre la marca, el contenido si se desplaza, y los botones. |
| Enter, Espacio | Activa el botón. |

### Recomendaciones de diseño

- Escribe `dialogue` para que se entienda solo: tiene que decir lo mismo que los datos a la vista, cifras incluidas.
- En una confirmación, el botón principal nombra la acción y sus datos están arriba: nadie debería confirmar sin saber qué.
- No lo cierres solo. Una confirmación espera lo que haga falta.

### Consideraciones de desarrollo

- Cuando aparece una confirmación, lleva el foco a ella si la persona la estaba esperando; si llega sola, anúnciala y deja el foco donde está.
- No es modal: no atrapa el foco. Si la decisión tiene que detener todo, usa `ActionSheet` o `Alert`.
- Pasa `scrolls` si el contenido puede pasar de 400 px.

Pendiente: VoiceOver y NVDA.
