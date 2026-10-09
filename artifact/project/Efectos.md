# Efectos

Lo que se mueve detrás, entre y debajo de las cosas, escrito por nosotros y guardado en un solo lugar.

El código de todos está en `efectos.js`, junto a este archivo: se carga en una página y deja `window.AlmaEfectos`.

## Cuatro familias

| Familia | Qué es | Dónde va |
|---|---|---|
| Fondo | Algo vivo detrás del contenido. | Una portada, una sección de apertura, una pantalla de espera larga. |
| Transición | El paso de una cosa a otra. | Entre dos vistas, entre dos estados de una misma pieza. |
| Reacción | La respuesta a quien toca. | Bajo el puntero, al pulsar, al desplazar. |
| Texto | Una línea o una cifra que se mueve al llegar. | Un titular, un dato destacado. |

## Lo que todo efecto cumple

1. **Sus colores son tokens.** Los lee del lugar donde está puesto: en una entidad, el efecto es de la entidad, sin tocarlo.
2. **Usa el reloj de ALMA.** Pide sus cuadros al mismo reloj que todo lo demás, y sus tiempos salen de los tokens de movimiento.
3. **Solo trabaja cuando se ve.** Fuera de la vista o con la página oculta, se detiene.
4. **Respeta a quien pide menos movimiento.** Un fondo queda como una imagen quieta, nunca en blanco. Una reacción no se mueve, y lo que hay debajo funciona igual. Un texto está entero desde el principio.
5. **Es decoración.** No lleva información, y quien no ve la página no lo encuentra. Un texto que se mueve guarda aparte su texto verdadero, que es el que se lee en voz alta.
6. **No depende de nadie.** Está escrito aquí, sin librerías.

## El texto encima

Un fondo vivo cambia de claro a oscuro bajo las letras. Por eso el texto nunca va directo sobre él: va sobre un recuadro con el fondo de la página, como en una portada.

## Cómo crece

Cada efecto nuevo parte de mirar cómo lo resuelven otros, entender la idea y escribirla de nuevo con las reglas de arriba. Entra a la colección cuando tiene su página aquí, con sus ajustes a la vista.

## La presencia de una IA

El Velo y el Halo juntos son la presencia de una IA. `AlmaEfectos.presencia(elemento)` monta el Velo, que es la IA de fondo, y devuelve `estado(nombre)`. Un estado de primer plano (`reposo`, `escuchando`, `pensando`, `respondiendo`) trae el Halo; `fondo` lo retira; `apagada` deja el Velo más tenue. Cuándo usarla está en la guía **Interfaces de IA › Presencia**.

## Fondo

### Halo

Un anillo de luz que respira y la estela que deja al abrirse.

#### Cuándo

Para abrir: detrás del nombre en una portada o en la primera sección de una página. Uno por pantalla.

No lo uses detrás de un formulario, una tabla o un texto largo. Ahí distrae.

#### Cómo funciona

No se dibuja de nuevo en cada cuadro. Cada cuadro toma el anterior, lo agranda apenas desde el centro, lo deja apagarse un poco y le suma un anillo fino. La luz vieja se abre hacia afuera y se enrosca: esa es la estela.

Usa dos luces, que toman el acento y el color del texto. Donde no hay luz es transparente: va sobre el fondo de la página, o sobre otro fondo, como el Velo. Al cambiar de tema o de entidad, cambian solas.

#### Ajustes

| Ajuste | Qué cambia |
|---|---|
| Tamaño | El radio del anillo. |
| Pulso | Cuánto suben y bajan los pétalos. En cero, es un círculo. |
| Pétalos | Cuántas puntas tiene el anillo. |
| Estela | Cuánto dura la luz que queda. |
| Giro | Cuánto se enrosca la estela, y hacia qué lado. |
| Velocidad | Qué tan rápido respira. |
| Latido | Cuánto se ensancha el anillo con cada latido: dos golpes y una pausa, como un corazón. En cero, no late. |
| Centro | Dónde está el anillo. Puede quedar fuera de la vista y dejar ver solo la estela. |

#### Reacción

El centro se inclina hacia el puntero, sin apuro.

#### Código

```js
var halo = AlmaEfectos.monta('halo', elemento, { tamano: 1.4, x: -0.3 });
halo.ajusta('estela', 0.9);
halo.quita();
```

### Velo

Cortinas de luz que cuelgan desde lo alto de una sección y se mecen.

#### Cuándo

Para una apertura tranquila: lo alto de una portada, el encabezado de una página de presentación. Deja libre la parte de abajo, donde va lo que hay que leer.

No lo uses de fondo de una página entera ni detrás de un producto.

#### Cómo funciona

A lo ancho corre un borde que ondula despacio. Sobre el borde hay luz; bajo él, la luz se apaga de a poco. Un dibujo más fino hace los pliegues de la tela.

La luz va del acento, en los lados, hacia el color del texto, en el centro, sobre el fondo de la página.

#### Ajustes

| Ajuste | Qué cambia |
|---|---|
| Caída | Hasta dónde baja el velo. |
| Amplitud | Cuánto ondula el borde. En cero, es una franja recta. |
| Suavidad | Qué tan de a poco se apaga la luz hacia abajo. |
| Fuerza | Cuánta luz lleva. |
| Velocidad | Qué tan rápido se mece. |

#### Reacción

El velo se corre un poco hacia donde va el puntero.

#### Código

```js
var velo = AlmaEfectos.monta('velo', elemento, { alto: 0.3, fuerza: 0.5 });
velo.quita();
```

### Hilos

Un haz de líneas finas que sale junto de un lado y se abre al cruzar, cada hilo ondulando.

#### Cuándo

Para acompañar un titular o una frase corta en una apertura. Es el más liviano de los fondos a la vista: deja mucho fondo libre.

No lo uses detrás de tablas, gráficos o diagramas. Sus líneas se confunden con las de ellos.

#### Cómo funciona

Cada hilo es una altura que cambia a lo ancho. Los hilos vecinos se mueven parecido, sin moverse igual. Donde parten van apretados; al cruzar, ondulan cada vez más.

Los primeros hilos toman el color del texto y los últimos el acento, y se afinan y se apagan del primero al último.

#### Ajustes

| Ajuste | Qué cambia |
|---|---|
| Cuántos | Cuántos hilos tiene el haz. |
| Amplitud | Cuánto ondula cada hilo. |
| Separación | Cuánto se abren entre sí. En cero, todos pasan por el mismo camino. |
| Grosor | El ancho del hilo más grueso. |
| Velocidad | Qué tan rápido corren. |

#### Reacción

Con el puntero arriba ondulan más amplio; hacia la derecha, corren más rápido.

#### Código

```js
var hilos = AlmaEfectos.monta('hilos', elemento, { cuantos: 16, separa: 0.2 });
hilos.quita();
```

### Retícula

Una grilla pareja de puntos chicos; los que quedan cerca del puntero crecen y toman el acento.

#### Cuándo

Para una apertura sobria, de aire técnico: una página de producto, una sección de documentación, el fondo de un titular. Es el fondo que menos compite con lo que lleva encima.

No lo uses detrás de tablas, formularios o gráficos: sus puntos se confunden con los de ellos.

#### Cómo funciona

Los puntos están siempre en su lugar; lo que cambia es su tamaño y su color. Cada punto mira qué tan cerca está del puntero: mientras más cerca, más crece y más toma el acento. Sin puntero, cada tanto pasa sola una ola lenta que hace lo mismo.

Los puntos en reposo toman el color del texto, muy apagado, sobre el fondo de la página.

#### Ajustes

| Ajuste | Qué cambia |
|---|---|
| Separación | La distancia entre un punto y el siguiente. |
| Tamaño | El radio de un punto en reposo. |
| Alcance | Hasta dónde llega la luz del puntero. |
| Crece | Cuánto se agranda un punto encendido. En cero, solo cambia de color. |
| Ola | Cuánto se nota la ola que pasa sola. En cero, solo responde al puntero. |
| Velocidad | Qué tan rápido pasa la ola. |

#### Con menos movimiento

Queda la grilla quieta, con una ola detenida.

#### Código

```js
var reticula = AlmaEfectos.monta('reticula', elemento, { paso: 32, ola: 0 });
reticula.quita();
```

### Grano

Manchas amplias de color que se mezclan despacio, bajo un grano fino y quieto como el del papel.

#### Cuándo

Para dar color y textura a una sección entera sin dibujar nada: una apertura, una pantalla de bienvenida, el fondo de una cita.

Recuerda que el texto no va directo sobre un fondo vivo: aquí el color cambia de lugar y, con él, el contraste.

#### Cómo funciona

Un dibujo lento dice, en cada punto, cuál de los colores hay. Antes de leerlo, otro dibujo corre un poco el lugar donde se lee: eso hace que las manchas se enrosquen en vez de quedar como parches.

El grano es un valor fijo para cada punto de la pantalla: no parpadea. Las manchas toman el acento y, en menor medida, el color del texto, sobre el fondo de la página.

#### Ajustes

| Ajuste | Qué cambia |
|---|---|
| Escala | El tamaño de las manchas. Más alto, manchas más chicas. |
| Mezcla | Cuánto se enroscan unas en otras. En cero, son parches suaves. |
| Fuerza | Cuánto color llevan. |
| Grano | Cuánto se nota el grano. En cero, es un degradado limpio. |
| Velocidad | Qué tan rápido se mueven. |

#### Reacción

Las manchas se corren apenas hacia donde va el puntero.

#### Código

```js
var grano = AlmaEfectos.monta('grano', elemento, { escala: 0.8, grano: 0.06 });
grano.quita();
```

### Rayos

Haces de luz que bajan en abanico desde un punto sobre la imagen, unos más fuertes que otros, girando despacio.

#### Cuándo

Para una apertura con un foco claro: la luz señala hacia abajo, donde está lo que importa. Sirve detrás de un titular centrado o de una pieza que se presenta.

No lo uses en secciones bajas y anchas: los rayos necesitan altura para verse como rayos.

#### Cómo funciona

Cada punto de la imagen mira en qué dirección queda la fuente de luz. Un dibujo que depende solo de esa dirección dice cuánta luz hay: por eso la luz es la misma a lo largo de una línea desde la fuente, y eso es un rayo. Son dos dibujos, uno fino y uno ancho, que giran en sentidos contrarios.

La luz se queda dentro de un abanico y se apaga con la distancia. Toma el acento y, donde es más fuerte, el color del texto.

#### Ajustes

| Ajuste | Qué cambia |
|---|---|
| Origen | De dónde viene la luz, a lo ancho. En cero, del centro. |
| Apertura | Qué tan abierto es el abanico. |
| Largo | Hasta dónde llegan los rayos. |
| Rayos | Cuántos haces se distinguen. |
| Fuerza | Cuánta luz llevan. |
| Velocidad | Qué tan rápido giran. |

#### Reacción

La fuente se inclina un poco hacia el puntero.

#### Código

```js
var rayos = AlmaEfectos.monta('rayos', elemento, { origen: -0.4, apertura: 1 });
rayos.quita();
```

### Ondas

Un suelo de líneas visto desde abajo, una detrás de otra hasta el horizonte, por el que pasan lomas.

#### Cuándo

Para la parte baja de una apertura: da un suelo y una profundidad, y deja libre el cielo para el titular. Va bien con el Velo o los Rayos arriba, en secciones distintas.

No lo confundas con los Hilos: los Hilos son un haz que cruza; las Ondas son un terreno. No los pongas juntos.

#### Cómo funciona

Cada línea es una altura que cambia a lo ancho. La línea siguiente lee el mismo dibujo un poco más allá, y entre todas dibujan un solo suelo. Las lomas avanzan hacia quien mira.

Las líneas cercanas tapan a las lejanas, como un cerro tapa lo que tiene detrás. Las lejanas son más bajas, van más juntas y se apagan. Las cercanas toman el color del texto; las lejanas, el acento.

#### Ajustes

| Ajuste | Qué cambia |
|---|---|
| Cuántas | Cuántas líneas hay hasta el horizonte. |
| Altura | Qué tan altas son las lomas. En cero, es un suelo plano. |
| Horizonte | A qué altura de la imagen queda la última línea. |
| Grosor | El ancho de la línea más cercana. |
| Velocidad | Qué tan rápido avanzan las lomas. |

#### Reacción

Bajo el puntero, el suelo cercano se levanta un poco.

#### Código

```js
var ondas = AlmaEfectos.monta('ondas', elemento, { horizonte: 0.5, altura: 1.4 });
ondas.quita();
```

## Reacción

### Chispa

Unas líneas cortas que saltan desde donde se hizo clic.

#### Cuándo

Para confirmar un gesto que vale la pena celebrar: guardar algo, marcar un favorito, terminar un paso. En una zona o en un botón.

No la pongas en toda la página ni en acciones de todos los días. Si salta con cada clic, deja de decir algo.

#### Cómo funciona

Las líneas salen repartidas en círculo desde el punto del clic, avanzan un tramo corto y se acortan hasta desaparecer. Se dibujan sobre una capa que deja pasar los clics: lo que hay debajo funciona igual.

Toma el color del acento. Dura lo que dice `duration-slow-01`.

#### Ajustes

| Ajuste | Qué cambia |
|---|---|
| Cuántas | Cuántas líneas saltan. |
| Largo | El largo de cada línea al salir. |
| Alcance | Hasta dónde llegan. |

#### Con menos movimiento

No salta. El clic hace lo suyo igual.

#### Código

```js
var chispa = AlmaEfectos.monta('chispa', elemento, { cuantas: 6 });
chispa.quita();
```

### Imán

Una pieza que se inclina hacia el puntero cuando se acerca.

#### Cuándo

Para la acción principal de una portada o de una página de apertura: una sola pieza, con aire alrededor.

No lo uses en un producto, ni en piezas que están juntas: un menú, una barra, una lista. Ahí lo que se mueve estorba al apuntar.

#### Cómo funciona

Se pone sobre un envoltorio, que se queda quieto, y mueve lo que hay dentro. Cuando el puntero entra al envoltorio o a un margen a su alrededor, la pieza recorre una parte del camino hacia él. Al salir, vuelve.

Acercarse toma `duration-moderate-02`; volver, `duration-slow-01`.

#### Ajustes

| Ajuste | Qué cambia |
|---|---|
| Alcance | El margen alrededor de la pieza donde empieza a sentir el puntero. |
| Fuerza | Qué parte del camino recorre. |

#### Accesibilidad

Solo responde al puntero de un mouse. Con teclado o al tocar, la pieza no se mueve, y su foco se ve igual. Con menos movimiento, tampoco se mueve.

#### Código

```js
var iman = AlmaEfectos.monta('iman', envoltorio, { fuerza: 0.3 });
iman.quita();
```

### Destello

Una franja de luz que cruza una superficie cuando el puntero o el foco llegan a ella.

#### Cuándo

En una tarjeta o una imagen que se puede abrir, para decir «esto responde». Sirve igual con teclado: también cruza cuando llega el foco.

No lo pongas sobre texto que hay que leer con calma. La franja pasa por encima.

#### Cómo funciona

La franja es un degradado inclinado, mucho más grande que la superficie, que espera fuera de la vista a un lado. Al llegar el puntero se desliza al otro lado; al salir, vuelve.

Toma el color del acento, a medias con transparente: el mismo del Foco. Cruza en `duration-slow-02`.

#### Ajustes

| Ajuste | Qué cambia |
|---|---|
| Brillo | Cuánta luz lleva la franja. Bajo, para que el texto de debajo se siga leyendo. |
| Ángulo | La inclinación. |
| Ancho | El grosor de la franja. |

#### Con menos movimiento

No cruza.

#### Código

```js
var destello = AlmaEfectos.monta('destello', tarjeta, { brillo: 0.2 });
destello.quita();
```

### Foco

Una luz suave bajo el puntero, dentro de una superficie, que lo sigue.

#### Cuándo

En tarjetas que se pueden abrir, sobre todo cuando hay varias juntas: la luz dice cuál está bajo el puntero sin mover nada.

No lo uses en superficies con mucho texto chico ni en filas de una tabla.

#### Cómo funciona

La luz es un degradado redondo puesto sobre la superficie, con el centro donde está el puntero. Aparece al entrar y se apaga al salir. Con el teclado, aparece al centro cuando llega el foco.

Toma el color del acento, a medias con transparente. Aparece y se apaga en `duration-moderate-02`.

#### Ajustes

| Ajuste | Qué cambia |
|---|---|
| Brillo | Cuánta luz lleva. Bajo, para que el texto se siga leyendo. |
| Radio | Hasta dónde llega la luz. |

#### Con menos movimiento

Se mantiene: la luz no se desplaza por su cuenta, solo está donde está el puntero.

#### Código

```js
var foco = AlmaEfectos.monta('foco', tarjeta, { radio: 160 });
foco.quita();
```

### Inclinar

Una superficie se inclina hacia el puntero, como una tarjeta sostenida por el centro.

#### Cuándo

Para una pieza que se muestra: una tarjeta de producto, una imagen, una ficha en una portada. Una a la vez.

No lo uses en una grilla llena de tarjetas, ni en nada con controles chicos adentro: al inclinarse, cuesta apuntarles.

#### Cómo funciona

Se pone sobre un envoltorio, que se queda plano, e inclina lo que hay dentro. El lado donde está el puntero baja, como una tarjeta apretada con un dedo. Al salir, vuelve a quedar plana.

Seguir al puntero toma `duration-moderate-01`; volver, `duration-slow-01`.

#### Ajustes

| Ajuste | Qué cambia |
|---|---|
| Grados | Cuánto se inclina como máximo. |
| Crece | Cuánto se agranda mientras está inclinada. En 1, no crece. |

#### Accesibilidad

Solo responde al puntero de un mouse. Con teclado o al tocar, la pieza queda plana y su foco se ve igual. Con menos movimiento, tampoco se inclina.

#### Código

```js
var ficha = AlmaEfectos.monta('inclinar', envoltorio, { grados: 6 });
ficha.quita();
```

## Transición

### Trama

Una cosa deja paso a otra detrás de una trama de cuadros que se llena al azar y luego se despeja.

#### Cuándo

Para cambiar una imagen o una tarjeta por otra en el mismo lugar: las dos caras de una ficha, el antes y el después, una pieza de portada que cambia de escena.

No la uses para pasar de una página a otra en un producto, ni sobre texto largo. Tapa todo por un momento.

#### Cómo funciona

Se pone sobre un elemento que tiene las dos cosas: la que está y la que viene, escondida. Al pedirle el paso, los cuadros tapan lo que hay, uno a uno y al azar. Cuando ya no se ve nada, cambia una cosa por la otra, y los cuadros se van igual.

Los cuadros son siempre cuadrados: eliges las columnas, y las filas salen del alto. Toman el color del acento. Tapar toma `duration-slow-01`; despejar, lo mismo.

#### Ajustes

| Ajuste | Qué cambia |
|---|---|
| Columnas | Cuántos cuadros caben a lo ancho. Menos columnas, cuadros más grandes. |

#### Quién la dispara

La trama no decide cuándo pasar: lo decide quien la usa, con un botón, un clic o el foco. Lo que dispara el cambio tiene que poder alcanzarse con el teclado.

#### Con menos movimiento

Cambia de una vez, sin cuadros.

#### Código

```js
var trama = AlmaEfectos.monta('trama', elemento, { columnas: 8 });
boton.addEventListener('click', trama.pasa);
```

### Aparecer

Una pieza toma forma cuando entra a la vista: de borrosa a nítida, subiendo un poco.

#### Cuándo

Para las piezas de una página larga de presentación: cada sección, cada imagen, al llegar a ella.

No lo uses en un producto ni en lo primero que se ve al abrir. Ahí la persona viene a hacer algo, y esperar a que el contenido aparezca la frena.

#### Cómo funciona

Se pone sobre la pieza misma. Espera transparente, borrosa y un poco más abajo; cuando una décima parte de ella entra a la vista, toma su lugar. Pasa una sola vez.

Toma `duration-slow-02` y la curva de entrada expresiva.

#### Ajustes

| Ajuste | Qué cambia |
|---|---|
| Desenfoque | Qué tan borrosa parte. En cero, solo cambia de transparente a sólida. |
| Subida | Desde cuánto más abajo llega. |

#### Accesibilidad

La pieza está en la página todo el tiempo: un lector de pantalla la encuentra aunque todavía no haya aparecido. Con menos movimiento, está a la vista desde el principio.

#### Código

```js
var entrada = AlmaEfectos.monta('aparecer', pieza, { subida: 24 });
entrada.pasa();   // otra vez
```

### Cortina

Un paño liso cruza de lado a lado y, al pasar, lo que había es otra cosa.

#### Cuándo

Para un cambio grande y decidido: de una escena de portada a la siguiente, de una imagen a otra en una pieza destacada.

No la uses para cambios chicos o frecuentes, como pasar de una pestaña a otra. Tapa todo por un momento, y repetida cansa.

#### Cómo funciona

Se pone sobre un elemento que tiene las dos cosas: la que está y la que viene, escondida. Al pedirle el paso, el paño entra por un lado hasta taparlo todo, cambia una cosa por la otra detrás de él y sale por el lado contrario, sin detenerse.

El paño toma el color del acento. Entrar toma `duration-slow-01`, con la curva de entrada expresiva; salir, lo mismo con la de salida.

#### Ajustes

| Ajuste | Qué cambia |
|---|---|
| Dirección | Hacia dónde cruza: 0 es hacia la derecha, 90 hacia abajo, 180 hacia la izquierda, 270 hacia arriba. Nunca en diagonal. |

#### Quién la dispara

Como la Trama, no decide cuándo pasar: lo decide quien la usa. Avanzar y volver deberían cruzar en sentidos contrarios.

#### Con menos movimiento

Cambia de una vez, sin paño.

#### Código

```js
var cortina = AlmaEfectos.monta('cortina', elemento, { giro: 90 });
boton.addEventListener('click', cortina.pasa);
```

### Fundido

Una cosa se desenfoca y se apaga mientras la otra toma foco en su lugar.

#### Cuándo

Para cambiar una imagen por otra sin llamar la atención: una galería que avanza sola, el antes y el después de una misma pieza. Es la transición más callada de la colección.

No lo uses entre dos textos largos: por un momento se leen los dos encima.

#### Cómo funciona

Se pone sobre un elemento que tiene las dos cosas: la que está y la que viene, escondida. Las deja una sobre la otra, en el mismo lugar. Al pedirle el paso, la que está se desenfoca y se apaga, y la que viene hace el camino contrario, al mismo tiempo.

Toma `duration-slow-02` y la curva estándar expresiva.

#### Ajustes

| Ajuste | Qué cambia |
|---|---|
| Desenfoque | Cuánto se desenfocan al cruzarse. En cero, es un fundido simple. |

#### Quién lo dispara

No decide cuándo pasar: lo decide quien lo usa. Si avanza solo, tiene que poder detenerse.

#### Con menos movimiento

Cambia de una vez.

#### Código

```js
var fundido = AlmaEfectos.monta('fundido', elemento, { desenfoque: 12 });
boton.addEventListener('click', fundido.pasa);
```

## Texto

### Descifrar

Una línea de texto llega revuelta y se ordena letra por letra, desde el principio.

#### Cuándo

Para una línea corta que vale la pena mirar llegar: un titular, una cifra con nombre, una etiqueta en una portada.

No lo uses en párrafos, en texto de un producto ni en nada que haya que leer de inmediato. Mientras se ordena, no se lee.

#### Cómo funciona

Las letras revueltas son las de la misma línea, barajadas: así el texto conserva su aspecto y casi su ancho mientras se ordena. Se ordena de izquierda a derecha, una letra cada tantos pulsos. El pulso es `duration-stagger`, el mismo con que se escribe la palabra de una entidad.

Pasa la primera vez que entra a la vista.

#### Ajustes

| Ajuste | Qué cambia |
|---|---|
| Pulsos por letra | Cuánto tarda cada letra en quedar en su lugar. |
| Calma del revuelo | Cada cuánto cambian las letras que aún no se ordenan. Más alto, más tranquilo. |

#### Accesibilidad

El texto verdadero está siempre en la página, fuera de la vista: un lector de pantalla lee la línea ordenada y nunca el revuelo. Con menos movimiento, la línea está ordenada desde el principio.

Úsalo en una sola línea. En un texto de varias líneas, las letras revueltas cambian el ancho y las líneas saltan.

#### Código

```js
var linea = AlmaEfectos.monta('descifrar', titular, { pulsos: 2 });
linea.pasa();   // otra vez
```

### Contar

Un número sube desde cero hasta su valor, rápido al principio y frenando al llegar.

#### Cuándo

Para una cifra que es el dato de la sección: un total, un resultado, un logro. Una o dos por pantalla.

No lo uses en tablas, en precios que alguien va a pagar ni en números que cambian solos. Ahí el número tiene que estar y nada más.

#### Cómo funciona

Se pone sobre un elemento cuyo texto es el número, tal como se escribe: con sus puntos de miles, su coma decimal y lo que lleve antes o después (un signo, una unidad). Sube desde cero y, al terminar, deja el texto exactamente como estaba.

Los dígitos ocupan todos el mismo ancho mientras sube, para que la cifra no tiemble. Dura tantas veces `duration-slow-02` como diga el ajuste.

#### Ajustes

| Ajuste | Qué cambia |
|---|---|
| Duración | Cuántas veces `duration-slow-02` tarda en llegar. |

#### Accesibilidad

El valor verdadero está siempre en la página, fuera de la vista: un lector de pantalla lee la cifra final y no la cuenta. Con menos movimiento, la cifra está desde el principio.

#### Código

```js
var cifra = AlmaEfectos.monta('contar', elemento);   // <p>$ 12.480</p>
cifra.pasa();   // otra vez
```

### Escalonar

Las palabras de una línea entran una tras otra, cada una subiendo un poco hasta su lugar.

#### Cuándo

Para un titular o una frase de apertura que merece llegar con calma. Una por pantalla.

No lo uses en párrafos ni en texto de un producto. Tampoco en el nombre de una entidad: ese tiene su propia manera de escribirse.

#### Cómo funciona

Cada palabra es una pieza aparte, y cada una parte unos pulsos después de la anterior. Los espacios siguen siendo espacios: la línea se corta donde se cortaría sin el efecto.

El pulso es `duration-stagger`. Cada palabra tarda `duration-slow-01`, con la curva de entrada expresiva. Pasa la primera vez que entra a la vista.

#### Ajustes

| Ajuste | Qué cambia |
|---|---|
| Pulsos entre palabras | Cuánto espera cada palabra a la anterior. |
| Subida | Desde cuánto más abajo llega cada palabra, en proporción al tamaño de la letra. |

#### Cuánto dura

En una frase larga, el total crece con cada palabra. Mantén la frase corta o baja los pulsos: sobre medio segundo de espera, la última palabra llega tarde.

#### Accesibilidad

El texto verdadero está siempre en la página, entero y fuera de la vista: un lector de pantalla lee la frase de una vez, no palabra por palabra. Con menos movimiento, la frase está completa desde el principio.

#### Código

```js
var frase = AlmaEfectos.monta('escalonar', titular, { pulsos: 2 });
frase.pasa();   // otra vez
```

### Brillo

Una franja de luz recorre una vez una línea de texto.

#### Cuándo

Para una línea corta que anuncia algo: una novedad, un estado, una invitación a seguir.

No lo uses en texto que hay que leer con atención ni en más de una línea a la vez.

#### Cómo funciona

La línea se pinta con un degradado en vez de un color parejo: el color de texto secundario a lo largo, y una franja del color principal que espera fuera de la vista. Al ver la línea, la franja la cruza una vez. Vuelve a cruzar al pasar el puntero o al llegar con el teclado.

No se repite sola: un brillo que no para distrae, y nadie puede detenerlo.

Dura tantas veces `duration-slow-02` como diga el ajuste.

#### Ajustes

| Ajuste | Qué cambia |
|---|---|
| Ancho | El grosor de la franja. |
| Duración | Cuántas veces `duration-slow-02` tarda en cruzar. |

#### Ten en cuenta

Mientras tiene el efecto, la línea se ve en el color de texto secundario, no en el principal. Los dos cumplen el contraste, pero el texto queda un tono más bajo.

#### Con menos movimiento

El efecto no se pone: la línea se ve como cualquier otra, en su color.

#### Código

```js
var aviso = AlmaEfectos.monta('brillo', linea);
aviso.pasa();   // otra vez
```

### Rotar

Una palabra de una frase deja su lugar a otras, de a una, y vuelve.

#### Cuándo

Para una frase de apertura donde una palabra tiene varias respuestas: «Un sistema claro», «simple», «propio». Al final de una línea, para que el cambio de ancho no mueva el resto.

No lo uses en medio de un párrafo ni para decir algo que hay que alcanzar a leer: cada palabra se ve un momento y se va.

#### Cómo funciona

Se pone sobre un elemento cuyo texto son las palabras, separadas por una barra: `claro | simple | propio`. La primera es la verdadera. Cada palabra sale hacia arriba mientras la siguiente entra desde abajo.

Las recorre una vez, la primera vez que entra a la vista, y se detiene en la primera. No sigue sola: un texto que cambia sin parar distrae, y nadie puede detenerlo.

Cada palabra se queda tantas veces `duration-slow-02` como diga el ajuste; el cambio toma `duration-moderate-02`.

#### Ajustes

| Ajuste | Qué cambia |
|---|---|
| Pausa en cada palabra | Cuánto se queda cada una antes de dar paso a la siguiente. |
| Subida | Cuánto recorre cada palabra al entrar y al salir, en proporción al tamaño de la letra. |

#### Accesibilidad

Un lector de pantalla lee solo la primera palabra, la verdadera: la frase tiene que tener sentido con ella. Con menos movimiento, se ve solo esa.

#### Código

```js
// <p>Un sistema <span id="como">claro | simple | propio</span></p>
var como = AlmaEfectos.monta('rotar', document.getElementById('como'));
como.pasa();   // otra vuelta
```

### Desvelar

Las palabras de un pasaje pasan de tenues a plenas, una tras otra, a medida que se avanza por la página.

#### Cuándo

Para un pasaje corto que se lee al paso, en una página larga de presentación: una declaración, una cita, el cierre de una sección.

No lo uses en lo primero que se ve al abrir, donde no hay nada que desplazar, ni en texto de un producto.

#### Cómo funciona

Aquí nada corre con el tiempo. Cuántas palabras están plenas depende de cuánto ha subido el pasaje por la ventana: empieza cuando asoma por abajo y termina cuando llega al medio. Al volver atrás, se atenúan de nuevo.

Es la receta «avanzar» del movimiento de marca: sigue al desplazamiento, no al reloj.

#### Ajustes

| Ajuste | Qué cambia |
|---|---|
| Tenue | Qué tan apagada está una palabra antes de su turno. |
| Palabras a la vez | Cuántas palabras están a medio camino al mismo tiempo. Más, el paso es más suave. |

#### Accesibilidad

El texto verdadero está siempre en la página, entero y fuera de la vista, para un lector de pantalla. Con menos movimiento, el pasaje está pleno desde el principio.

Una palabra tenue no cumple el contraste por sí sola. Por eso el pasaje tiene que poder leerse entero con solo avanzar un poco: mantenlo corto, y no pongas nada importante únicamente ahí.

#### Código

```js
var pasaje = AlmaEfectos.monta('desvelar', parrafo, { tenue: 0.3 });
pasaje.pasa();   // lo recorre solo una vez, para probarlo
```
