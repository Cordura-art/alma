---
element: Interfaces de IA
order: 3
tab: Resumen
summary: Cómo se muestra una IA en ALMA: su presencia, lo que genera, sus estados y el control que conserva la persona.
---

## Para qué

Una IA responde distinto cada vez, a veces se equivoca y puede actuar por su cuenta. Nada de eso pasa con un botón. Esta guía dice cómo mostrarlo para que la persona sepa siempre tres cosas: **qué hizo la IA, qué tan seguro es y cómo deshacerlo**.

Vale para toda función que genere, resuma, recomiende, converse o actúe con un modelo. No importa qué modelo sea ni quién lo provea.

## Cuándo usar IA

| Úsala cuando | No la uses cuando |
|---|---|
| La tarea es abierta: redactar, resumir, buscar con palabras propias. | Hay una respuesta exacta que un cálculo o una regla entregan. |
| Un error se nota y se corrige fácil. | Un error cuesta plata, salud o un derecho, y nadie lo revisa. |
| Ahorra un trabajo que la persona no quiere hacer. | Quita una decisión que la persona quiere tomar. |
| El resultado mejora con contexto de la persona. | El mismo resultado sirve igual para todos: muéstralo y ya. |

Si un filtro, una plantilla o un buen valor inicial resuelven lo mismo, úsalos. Son más rápidos, siempre dan lo mismo y no hay que explicarlos.

## Tres maneras de aparecer

| Manera | Qué hace | Ejemplo | Lo que más importa |
|---|---|---|---|
| **Asistida** | Propone algo dentro de una tarea que la persona ya hace. | Un resumen del viaje, un borrador de mensaje. | Marcar lo generado y dejar editar. |
| **Conversada** | Un asistente al que se le pide con palabras. | «¿A qué hora sale el último bus a Talca?» | Estados claros, fuentes y poder detener. |
| **Delegada** | Un agente que hace varios pasos por la persona. | Cambiar un pasaje y avisar a quien viaja contigo. | Mostrar el plan, pedir permiso y poder deshacer. |

Empieza por la asistida. Cada paso hacia la derecha pide más confianza, y más de esta guía.

## Principios

1. **Se sabe que es una IA.** Lo que una IA genera lleva su marca. Nunca se hace pasar por una persona.
2. **La persona decide.** La IA propone; aceptar, editar o descartar es de la persona. Lo que no se puede deshacer pide permiso antes.
3. **Dice lo que sabe y lo que no.** Muestra de dónde sacó la respuesta. Cuando duda, lo dice con palabras.
4. **Se equivoca bien.** Un error se puede ver, corregir y reportar. La pantalla sigue sirviendo sin la IA.
5. **Se puede detener.** Toda respuesta en curso y toda tarea de un agente tienen cómo pararse, a un toque.
6. **Presente, no protagonista.** La IA se nota donde está, y nada más. El contenido de la persona va primero.
7. **Los datos son de la persona.** Se dice qué se usa, se pide permiso y se puede borrar.
8. **Es para todos.** Lo mismo con teclado, con lector de pantalla y con movimiento reducido.

## Cómo se ve

La IA no tiene color propio en ALMA. Usa el acento de cada entidad, como todo lo demás. Lo que la distingue es **la luz**: el Velo y el Halo, dos efectos de ALMA, juntos. El Velo es el aire; el Halo, algo que late dentro. Es lo que ya cierra las portadas con busto.

Esa luz es para los momentos en que la IA es el tema: cuando se presenta, escucha o piensa. En el resto de la interfaz basta la **marca de IA**, un ícono y dos letras.

La pestaña Presencia lo detalla.

## Qué trae esta guía

| Pestaña | Responde |
|---|---|
| Presencia | Cuándo y cómo se usan el Velo y el Halo, y qué dice el Halo en cada estado. |
| Transparencia | Cómo se marca lo generado, cómo se explica y cómo se muestran las fuentes y la duda. |
| Conversación | Las partes de un asistente: el pedido, la respuesta y sus acciones. |
| Estados | Todo lo que puede pasar entre pedir y recibir, y qué se muestra en cada caso. |
| Control | Aceptar, editar, deshacer; permisos de un agente; datos y memoria. |

Dos partes viven en su propia guía, junto a lo demás de su tema: **Contenido › IA** dice cómo habla una IA en ALMA, y **Accesibilidad › IA**, cómo se usa con lector de pantalla, con teclado y con movimiento reducido.

## Con qué se arma

| Pieza | Qué es | Dónde está |
|---|---|---|
| `AILabel` | La marca de IA, con su explicación. | Componentes › IA |
| `PromptInput` | La caja de pedido, con enviar y detener. | Componentes › IA |
| `ChatMessage` | Un turno de la conversación, con sus estados. | Componentes › IA |
| `SourceList` | La lista de fuentes, y `SourceRef`, el número junto a la frase. | Componentes › IA |
| `AlmaEfectos.presencia` | El Velo y el Halo juntos, con los estados del Halo. | Efectos |

Lo demás es ALMA de siempre: `Button`, `Tag`, `Sheet`, `InlineNotification`, `ToastRegion` y los patrones Deshacer, Diálogos y Carga.

## De dónde viene

La base son nuestros referentes. De IBM Carbon vienen la marca de IA, la explicación por niveles y la idea de una presencia propia. De Apple, el control de la persona, corregir fácil y decir los límites. De Google, enseñar qué puede y qué no puede hacer la IA, y fallar con gracia. De Meta, marcar las imágenes y los medios generados. La luz como presencia es de ALMA.

## Código

### La presencia

```html
<div class="ia-escenario" aria-hidden="true"></div>
<h1>¿En qué te ayudo?</h1>
<p role="status">Buscando en tus viajes</p>
```

```css
.ia-escenario { height: 15rem; border-radius: var(--radius-panel); overflow: hidden; }
```

```js
var luz = AlmaEfectos.presencia(document.querySelector('.ia-escenario'), 'reposo');

if (luz) luz.estado('pensando');   // reposo, escuchando, pensando, respondiendo, apagada
```

`presencia` monta el Halo sobre el Velo y lleva cada ajuste del Halo a su nuevo valor con el tiempo y la curva de ALMA. Devuelve `null` si el equipo no tiene WebGL: por eso el `if`, y por eso el estado va siempre escrito aparte. Con `luz.quita()` se retira.

### La marca de IA

```js
h(AILabel, {
  what: 'Resumí tu pasaje y los avisos de la empresa.',
  when: 'Hoy, 09:12',
  review: 'Revisa la hora de salida antes de viajar.'
})
```

### Una conversación

```js
h('ol', { className: 'conversacion' },
  h(ChatMessage, { as: 'li', from: 'user' }, '¿A qué hora sale mi bus?'),
  h(ChatMessage, { as: 'li', status: estado, statusText: 'Buscando en tus viajes',
    sources: fuentes, onRetry: repetir, feedback: voto, onFeedback: setVoto },
    texto ? h('p', null, texto) : null)),

h(PromptInput, { placeholder: 'Pregunta por tus viajes', busy: enCurso, onSubmit: enviar, onStop: detener })
```

El mismo `ChatMessage` pasa de `thinking` a `writing` y a `done`: así se anuncia una sola vez, completo. El detalle de cada pieza está en su página, en Componentes › IA.
