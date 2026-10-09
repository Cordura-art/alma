---
element: Interfaces de IA
order: 3
tab: Presencia
---

## La esencia: Velo y Halo

Una IA no tiene cara, y en ALMA no se le inventa una. No hay robot, ni avatar, ni chispas. Lo que hay es luz que se mueve.

- **El Velo** es el aire: cortinas de luz que cuelgan y se mecen. Dice «aquí hay algo».
- **El Halo** es lo que vive dentro: un anillo que respira, late y deja estela. Dice «y está despierto».

Juntos, el Velo detrás y el Halo delante, son la presencia de una IA. Los dos toman el acento y el color de texto de la entidad, así que cada entidad tiene su propia luz sin que nadie la dibuje.

![Un panel de asistente. Arriba, una zona con el Velo y, sobre él, el Halo: un anillo de luz con su estela. Debajo, sobre fondo liso, el saludo «¿En qué te ayudo?», tres sugerencias y la caja para escribir el pedido.](assets/Guias/ia-presencia.png)

## Primer plano y fondo

La luz dice dónde está la IA en este momento.

| La IA está | Qué se ve | Por qué |
|---|---|---|
| **En primer plano**: es el tema de la pantalla. Se presenta, escucha, piensa, responde. | El Velo y el Halo. | El Halo es lo vivo: late y cambia con el estado. |
| **De fondo**: está disponible, pero la persona está en otra cosa. | Solo el Velo. | El aire sigue ahí. El Halo no: no hay nada que decir, y es el efecto que más recursos gasta. |
| **No está**. | El Velo, más tenue. O nada. | — |

El Halo no se muestra siempre. Aparece cuando la IA pasa al frente y se va cuando vuelve al fondo. No se esconde: se quita, y así deja de gastar.

## Tres niveles

La presencia tiene tres tamaños. Se elige el menor que alcance.

| Nivel | Qué lleva | Dónde | Cuántas |
|---|---|---|---|
| **Escenario** | Velo y Halo, en una zona completa, con la IA en primer plano. De fondo, solo el Velo. | La portada de una IA, la bienvenida de un asistente, una conversación vacía, el modo de voz. | Una por pantalla. |
| **Figura** | Solo el Halo, pequeño, sobre el fondo de la página. Desde 96 px de lado. | La cabecera de un panel de asistente, el estado de una tarea larga. | Una por pantalla. |
| **Marca** | El ícono `ai-label` y el texto «IA». Sin luz. | Junto a todo lo que una IA generó. | Las que hagan falta. |

En un escritorio, el escenario es la ventana del asistente ampliada: el Velo es su suelo, el Halo ocupa una zona despejada arriba y la conversación va en una hoja de vidrio. `AlmaEfectos.presencia` mueve el Halo a esa zona con `estado('reposo', { x, y, escala })`. Ver el patrón Entorno.

Una pantalla tiene **una sola luz**. Si ya hay un escenario, no hay figura. Si hay diez resúmenes generados, hay diez marcas y ninguna luz.

## Dónde va y dónde no

| Sí | No |
|---|---|
| En una zona propia, sin texto encima. | Detrás de un texto, un formulario o una tabla. |
| Cuando la IA es el tema del momento. | En cada tarjeta que tenga algo generado. |
| Al abrir: se ve al entrar y deja paso al contenido. | Fija y brillando mientras la persona lee o escribe. |
| Con los colores de la entidad. | Con un color «de IA» aparte, morado o arcoíris. |
| En un botón: nunca. Un botón de IA es un `Button` con el ícono `ai-generate`. | Como borde brillante de un campo o de un botón. |

La regla de las portadas vale aquí igual: **un fondo y un texto nunca se encuentran**. El saludo, las sugerencias y la caja de pedido van debajo de la luz, sobre fondo liso. Así el contraste del texto no depende de dónde cayó un pliegue del Velo.

Cuando empieza la conversación, el escenario se va: se desvanece con `duration-slow-01` y la primera respuesta ocupa su lugar. Desde ahí, si hace falta decir que la IA trabaja, lo dice la figura o el indicador de estado.

## El Halo dice el estado

El Halo cambia con lo que la IA está haciendo. No hace falta leer para saber si escucha o piensa, pero el estado **siempre va también escrito**: el Halo acompaña, no informa solo.

![Cuatro escenarios pequeños, uno por estado. En reposo: un anillo amplio que late. Escuchando: un anillo abierto y casi quieto. Pensando: un anillo más chico, con más puntas y la estela muy enroscada. Respondiendo: un anillo parejo que late suave.](assets/Guias/ia-presencia-estados.png)

| Estado | Qué transmite | Tamaño | Pulso | Pétalos | Estela | Giro | Velocidad | Latido |
|---|---|---|---|---|---|---|---|---|
| **En reposo** | Está, y espera. | 1,2 | 2 | 3 | 0,8 | 1 | 1 | 0,6 |
| **Escuchando** | Atiende. Se abre y se aquieta. | 1,5 | 0,6 | 3 | 0,6 | 0,4 | 0,5 | 0 |
| **Pensando** | Trabaja. Se recoge y gira. | 0,9 | 3 | 5 | 0,9 | 2,2 | 1,8 | 0 |
| **Respondiendo** | Habla. Parejo, con un latido suave. | 1,2 | 1,2 | 3 | 0,8 | 1 | 1,2 | 0,3 |
| **Sin servicio** | No está. | Sin Halo. Queda el Velo, con la fuerza en 0,3. | | | | | | |

Estos valores vienen puestos en `AlmaEfectos.presencia`, que parte con el Velo solo (`fondo`) y trae el Halo al pedir un estado de primer plano, con `estado('pensando')`. Al volver a `estado('fondo')`, el Halo se retira. En reposo son los mismos valores de la portada de Autómata. El paso de un estado a otro no salta: cada ajuste se mueve hacia su nuevo valor durante `duration-slow-02`.

Un error no se dice con el Halo ni con color rojo en la luz. Se dice con un mensaje. La luz solo se apaga.

## El Velo

El Velo no cambia con el estado. Sus valores son los de la portada: caída 0,45, amplitud 1, suavidad 0,35, fuerza 0,7 y velocidad 1.

En un escenario de menos de 240 px de alto, baja la caída a 0,35 para que el Halo no quede tapado.

## Entrada y salida

| Momento | Qué pasa | Tiempo |
|---|---|---|
| Entra el escenario | Primero el Velo, después el Halo. | `duration-slow-02` cada uno, con `easing-entrance-expressive`. |
| Cambia el estado | Los ajustes del Halo se mueven a sus nuevos valores. | `duration-slow-02`. |
| Sale el escenario | Los dos juntos se desvanecen. | `duration-slow-01`, con `easing-exit-expressive`. |

## Movimiento reducido

Con movimiento reducido, el Velo y el Halo son un cuadro quieto: la misma luz, sin moverse. El Halo no late ni cambia con el estado. Por eso el estado va siempre escrito.

## Cuando no hay luz

Los dos efectos se dibujan con WebGL. Si el equipo no lo tiene, no se dibuja nada y la zona queda con el fondo de la página. La pantalla tiene que servir igual: por eso nada de lo que importa está en la luz.

Trabajan solo mientras están a la vista y con la pestaña al frente. Fuera de eso no gastan.

## Lista de comprobación

- Hay una sola luz en la pantalla.
- No hay texto ni controles encima de ella.
- El estado está escrito, además de verse.
- La luz usa los colores de la entidad, por token.
- Con movimiento reducido se ve un cuadro quieto y nada se pierde.
- Sin WebGL, la pantalla se entiende igual.
