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

## Fondo

### Halo

Un anillo de luz que respira y la estela que deja al abrirse.

#### Cuándo

Para abrir: detrás del nombre en una portada o en la primera sección de una página. Uno por pantalla.

No lo uses detrás de un formulario, una tabla o un texto largo. Ahí distrae.

#### Cómo funciona

No se dibuja de nuevo en cada cuadro. Cada cuadro toma el anterior, lo agranda apenas desde el centro, lo deja apagarse un poco y le suma un anillo fino. La luz vieja se abre hacia afuera y se enrosca: esa es la estela.

Usa dos luces, que toman el acento y el color del texto, sobre el fondo de la página. Al cambiar de tema o de entidad, cambian solas.

#### Ajustes

| Ajuste | Qué cambia |
|---|---|
| Tamaño | El radio del anillo. |
| Pulso | Cuánto suben y bajan los pétalos. En cero, es un círculo. |
| Pétalos | Cuántas puntas tiene el anillo. |
| Estela | Cuánto dura la luz que queda. |
| Giro | Cuánto se enrosca la estela, y hacia qué lado. |
| Velocidad | Qué tan rápido respira. |
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

Toma el color del texto, a medias con transparente. Cruza en `duration-slow-02`.

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
