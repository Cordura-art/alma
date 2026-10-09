# Documentación

## Novedades

Lo último que cambió en ALMA, de lo más reciente a lo más antiguo. El detalle de cada cambio está en el historial del repositorio.

### 9 de octubre de 2026

#### La matriz de color gobierna los tokens

- Los temas claro y oscuro de ALMA salen de la matriz: cada token con casillero toma el color de su casillero, y las rampas Primary, Secondary y Tertiary son las que la matriz calcula. `npm run matriz:aplicar` lo hace, y una prueba cuida que no se separen.
- Las entidades también: su carta entrega dos colores, la marca y la acción, y todo lo demás sale de la matriz. En Cordura y en Ensayo, la navegación elegida, los interruptores y el texto de los botones tenue y plano pasan al azul de acción; la marca queda en el botón principal.
- El neutro (Secondary) cubre ahora todo el rango, del blanco al negro, con dos pasos nuevos para las superficies oscuras: `secondary-950` y `secondary-1000`.
- `interactive-02` y sus estados son pasos del neutro. El botón fantasma tiene sus dos tonos propios, ya no cruzados.
- Los colores de papel que no son un paso de una rampa bajaron de 36 a 2.
- El fundamento Color tiene una pestaña nueva, Matriz, que explica la regla.
- Los dos temas de alto contraste también salen de la matriz: cada token tiene cuatro casilleros, uno por tema. Los de alto contraste se fijaron en el paso más cercano al valor que cada uno ya tenía, y ahí el texto alcanza 7 a 1.

#### La matriz de color, escrita como regla

- Cada token de color pasa a tener un casillero: una familia y un paso, para el tema claro y para el oscuro. Están en `tokens/matriz.json`. Las familias son tres: Primary es la marca, Tertiary es la acción (enlaces, foco, lo elegido) y Secondary es el neutro, teñido con el tono de la acción.
- Los casilleros del tema claro vienen del estudio de color de Cordura. Los del oscuro se fijaron hoy. El foco va en Tertiary 400, y el tinte del neutro, en 5 %: casi gris, con un rastro del tono de la acción.
- Las etiquetas, los estados y las notificaciones también tienen casillero, en la rampa de su color: una etiqueta lleva el fondo en el 200 y el texto en el 700; un estado va en el 500 en claro y en el 400 en oscuro; el fondo de una notificación, en el 50 en claro y en el 900 en oscuro. Con eso son 103 tokens con casillero.
- Una prueba cuida que cumpla el contraste en ALMA y en las cuatro entidades, en los dos temas.
- `npm run matriz` arma una página que compara los colores de hoy con los de la matriz.

#### brand-lime pasa a llamarse brand-accent

- El token `brand-lime` guardaba el azul de ALMA desde que el acento dejó de ser lima, y solo conservaba el nombre. Ahora es `brand-accent`: el color de marca, que en ALMA es el azul y en cada entidad el suyo. El valor no cambia.
- Los demás colores de marca ya se llamaban por lo que son: `brand-ink`, `brand-black`, `brand-white` y `brand-steel`.
- Quien use `var(--brand-lime)` fuera de este repositorio tiene que cambiarlo: el nombre antiguo ya no existe.

#### Las figuras de línea tienen su página

- Un fundamento nuevo, Figuras de línea: para qué sirven, sus reglas, sus tonos y cómo montarlas. Su pestaña Catálogo muestra las 28, en vivo. Hasta ahora solo se veían en el Lenguaje de cada entidad.

### 8 de octubre de 2026

#### ProductCard y PaymentCard, rehechas

- `ProductCard` es ahora una tarjeta de producto de verdad: imagen, insignia, categoría, nombre, descripción, valoración, precio con su rebaja y su nota, y una acción. Va en grilla o en fila, y sabe decir «Agotado». La tarjeta desplegable de color que había antes ya no existe: ese uso es de `Accordion`.
- Las muestras de `ProductCard` llevan figuras de línea en lugar de dibujos de relleno: un portátil, un teléfono y un router. `ProductCard` acepta `media` para poner una figura donde iría la imagen.
- `PaymentCard` es una tarjeta como se tiene en la mano: emisor, estado con ícono y palabra, número, titular, vencimiento y CVV. Los datos parten ocultos y se muestran al pedirlo; copiar lo confirma con texto. Suma el estado «Bloqueada» y un tamaño chico para listas. Su radio sigue al de la entidad.
- La imagen de alineación de botones mostraba «Anular» como botón relleno. Ahora es `tinted` destructivo, como dice la regla.
- Salen los tokens `product-card-*` y tres de `payment-card-*` que ya no se usan.

#### Menos ajustes a mano

- **Lo que no es token no pasa.** Nueve pruebas nuevas revisan la hoja de estilos de los componentes: ningún color, espacio, radio, peso, tiempo, curva ni capa escritos a mano, y la letra solo en tamaños de la escala. La hoja ya las cumple.
- **Los radios de ALMA salen de uno solo**, `radius-base`, con la misma regla de las entidades: el botón lo toma entero y cada pieza lo toma hasta su tope. Con la base en 16 px, los campos, las tarjetas, los paneles, la navegación y las etiquetas pasan de 8 a 16 px, y las fichas chicas de 4 y 2 a 8 px. Para cambiar la forma de todo el sistema se cambia ese valor.
- **Los documentos piden el valor de un token** en vez de escribirlo: `{token:radius-field}`. Se resuelve al armar, y en la página de una entidad sale el valor de esa entidad. Son 55 valores en 14 documentos; una prueba impide escribir uno a mano en una tabla.
- **El vidrio lo decide la carta.** Una entidad con dos centros definidos o menos tiene la carta abierta, y todo en vidrio. ORCA ya no lo pide con un interruptor: sale de su carta, y aparece en su página de Origen.
- **Los colores de papel que no son un paso de una rampa están contados** (36) y la lista solo puede achicarse.

#### Higiene

- `PaymentCard` ya no trae colores escritos a mano: sus seis valores (el vidrio oscuro, el filo de luz, las sombras y los brillos) son tokens, `payment-card-bg`, `payment-card-border`, `payment-card-edge`, `payment-card-chip-shine`, `payment-card-number-shade` y `payment-card-number-shine`.
- Los espacios y radios que estaban fuera de escala en `ProductCard`, `PaymentCard`, `Badge`, `Pagination`, `Tabs`, `Slider`, `Link` y los botones de una barra pasan a tokens. Se mueven entre 1 y 4 px.
- Las capas del escritorio tienen nombre: fondo, ventanas y barras.

#### ORCA, sin luz detrás de la página

- La página de una entidad en vidrio ya no lleva el Velo de fondo: su fondo es liso. El Velo queda para donde está la IA, en el escritorio y en su escenario.

#### El escenario del asistente

- La ventana del asistente, ampliada, es su escenario: el Velo es el suelo de toda la ventana, el Halo ocupa una zona despejada arriba y la conversación va en una hoja de vidrio grueso, al centro. `Window` tiene un tipo nuevo, `kind: 'stage'`, y avisa con `onZoomChange`.
- El Halo sigue el estado de la conversación: escucha mientras se escribe, se recoge al pensar y late al responder. `AlmaEfectos.presencia` lo mueve y lo achica con `estado(nombre, { x, y, escala })`.
- El escritorio de muestra ahora conversa: tres preguntas sugeridas, con respuesta, y «Detener».

#### Lo que estaba liviano

- El Halo es de primer plano también en el escritorio: mientras el asistente está de fondo, su luz es solo el Velo; cuando su ventana pasa al frente, aparece el Halo. `Window` avisa con `onActiveChange`, y el escritorio de muestra ya lo usa.
- Ocho piezas que no tenían imagen ya la tienen: `Collection`, `ColumnView`, `ControlCenter`, `EditMenu`, `ImageView`, `Outline`, `SplitView` y `WebView`. Sus documentos crecieron con anatomía, teclado y qué va adentro.
- Tres patrones ganaron imagen: Menús, Entorno (la IA de fondo y al frente) y Jerarquía (los tres niveles de texto y los cuatro pesos de botón).
- `ColumnView` muestra el dato al final de la fila (`trailing`), igual que `Outline`. Antes lo recibía y no lo dibujaba.
- ORCA tiene su lenguaje escrito a mano: un escritorio personal, con documentos, versiones y un asistente que cita sus fuentes. Dejó de ser un borrador automático.

#### Pruebas de comportamiento

- Trece pruebas nuevas manejan los componentes en un navegador de verdad, como lo haría una persona: teclado, foco y lo que se anuncia. Cubren menús, hoja de acción, caja de pedido, respuesta de la IA, marca de IA y fuentes, ventanas, escritorio, listas, entrada de dígitos, campo de fichas, árbol, columnas, divisor, medidor y valoración.
- Se corren con `npm run test:componentes`. Van aparte de `npm test` porque necesitan Chromium y red.
- Una prueba más cuida que, sobre el suelo de Velo de una entidad en vidrio, los tres niveles de texto sigan en 4,5:1.

#### Elegir un componente, y los grupos en orden

- Un patrón nuevo, Elegir un componente: once tablas que dicen cuál usar cuando varios se parecen. Se entra por lo que necesitas, no por el nombre de la pieza.
- Los grupos de componentes se ordenaron. «Toggles» pasa a llamarse «Selección» y reúne lo que se elige (`Checkbox`, `RadioGroup`, `Switch`, `SegmentedControl`, `Slider`, `Stepper`). `Link` pasa a Acciones, `Pagination` a Navegación, `Accordion` a Contenido y `Gauge` a Datos.

#### Lo anterior, al día con las reglas nuevas

- Diálogos: una acción destructiva que la persona eligió se confirma con `ActionSheet`; `Alert` queda para lo que llega sin pedirlo. La acción que destruye nunca es la más visible.
- Acciones: el orden de peso de los botones es `filled`, `tinted`, `gray`, `plain`.
- Ajustes: un sí o no es una fila de `List` con su interruptor.
- El valor de `Stepper` y de `Slider` pasa a texto principal: en un dato manda el valor.

#### El Halo, solo en primer plano

- La presencia de una IA distingue ahora primer plano y fondo. De fondo es solo el Velo; el Halo aparece cuando la IA pasa al frente y se retira al volver. Ahorra recursos: el Halo es el efecto más costoso.
- En ORCA, el suelo de la página es el Velo, muy tenue, en vez de manchas de color. Y sus campos, sus etiquetas y sus botones de fondo tenue pasan a vidrio.

#### La entidad ORCA, toda en vidrio

- Una entidad nueva, ORCA, cercana al lenguaje de Apple: azul profundo con texto blanco, esquinas de 16 px y letra de ancho normal. Su carta es del 2 de junio de 1984, en Cupertino.
- Un modo nuevo, «todo en vidrio», que una entidad pide en su lenguaje: el suelo de la página lleva una luz tenue del acento, y las tarjetas, listas, tablas y la barra lateral pasan a vidrio delgado. ORCA lo usa.

#### La lista de Apple, completa; y el vidrio en lo que flota

- Ocho piezas nuevas: `SplitView` (lista y detalle), `Collection` (grilla o fila), `ImageView` (una imagen que guarda su lugar), `Outline` (un árbol), `ColumnView` (cada nivel en su columna), `WebView` (contenido de fuera, con su origen a la vista), `ControlCenter` (los controles del entorno) y `EditMenu` (acciones sobre lo seleccionado).
- `DatePicker` gana el estilo en línea y `TimePicker`, los minutos por pasos.
- **Vidrio:** los menús, los popovers, el calendario, `Toolbar` y `TabBar` pasan a vidrio medio; los diálogos, las alertas y las hojas, a vidrio grueso. En alto contraste, con menos transparencia o sin desenfoque, siguen opacos.
- Con estos son 75 componentes.

#### Listas que se eligen y se editan, y tres ajustes

- `List` gana lo que pide Apple: filas que se eligen (quedan marcadas al navegar, o llevan un visto al escoger una opción), un interruptor al final de una fila, y un modo de edición con eliminar, subir y bajar.
- `PromptInput`: el botón de enviar queda centrado con el texto cuando hay una línea, con el mismo margen por los cuatro lados. Antes quedaba abajo y descuadrado.
- `Window`: las ventanas inactivas quedan bajo un velo. Antes casi no se distinguían de la activa.
- Los tamaños de los botones no cambian.

#### El botón gray pasa a ser un gris tenue

- **Cambio de color:** el botón `gray` deja de ser un relleno sólido y oscuro. Ahora es un gris neutro y tenue con el color del texto, como el de Apple. En el tema claro el anterior contrastaba 14:1 con el fondo, contra 4,9:1 del botón principal: pesaba más que la acción que debía destacar.
- El orden de peso queda `filled`, `tinted`, `gray`, `plain`.
- Vale para ALMA y para todas las entidades: el `gray` ya no toma el color de la marca. La marca en su paso más oscuro sigue como `interactive-02`, para acentos.
- Una acción destructiva en `gray` lleva el rojo de siempre.

#### Jerarquía, y cuatro piezas más de la lista de Apple

- Un patrón nuevo, Jerarquía: los niveles del texto, el peso de los botones y los márgenes que agrupan, con lo aprendido de Apple.
- **Cambio de color:** en el tema claro, `text-01` pasa de #464646 a la tinta de marca (#191919) y `text-02` a #464646. Los tres niveles de texto casi no se distinguían (9,4 · 6,7 · 5,7 a 1) y ahora sí (17,6 · 9,4 · 5,7). En alto contraste claro suben un paso más.
- La ayuda de un campo pasa a texto secundario: estaba en principal y competía con lo escrito.
- Una acción que destruye ya no es el botón más visible: en `Modal` y `Snippet` pasa de `filled` a `tinted`.
- `DigitEntry`: un código corto, un dígito por casilla. Es un solo campo: se puede pegar y autocompletar.
- `TokenField`: varios valores en un campo, cada uno una ficha.
- `Gauge`: un valor dentro de un rango, lineal o circular, de capacidad o con marca.
- `Rating`: una valoración en estrellas, para leer o para elegir.
- Con estos son 67 componentes.

#### Widgets, actividades en vivo y fragmentos

- `Widget`: una idea de una app, para leer de un vistazo. Cuatro tamaños sobre una grilla de 160 px, y dice de cuándo es lo que muestra.
- `LiveActivity`: algo con principio y fin, seguido sin abrir su app. Mínima, compacta y expandida; con pasos y «Detener» para la tarea de un agente.
- `Snippet`: la respuesta del asistente como tarjeta. Un resultado, o una confirmación que espera: es el permiso de un agente.
- Los tres son de vidrio. Con ellos son 63 componentes.

#### El entorno: escritorio, ventanas, barra de menús y dock

- Un patrón nuevo, Entorno: un escritorio que corre en el navegador, para el sistema de cada entidad.
- `Desktop`, el escenario: lleva el fondo, ordena las ventanas y, bajo 672 px, muestra una a la vez.
- `Window`, el marco de una app: se mueve por su barra y cambia de tamaño por sus bordes, con el puntero o con el teclado. Se amplía, se minimiza y se cierra. La activa lleva la barra de vidrio.
- `MenuBar`, todos los comandos de la app al frente, en su orden de siempre, y los extras a la derecha.
- `Dock`, las apps a un toque, con un punto bajo las abiertas y un menú por app.
- El fondo del escritorio puede ser la presencia de una IA: el Velo y el Halo detrás de todo.
- Es el primer uso del vidrio. Con estos son 60 componentes.

#### Profundidad y vidrio

- Un fundamento nuevo, Profundidad: la capa del contenido, la capa funcional que flota sobre ella, y sus niveles.
- El vidrio: una superficie que deja pasar, desenfocado, lo que tiene detrás. Cuatro grosores (`glass-ultra-thin`, `glass-thin`, `glass-regular`, `glass-thick`) y la clase `alma-glass`.
- Desde el delgado, cada grosor asegura 4,5:1 para sus textos sobre el peor fondo posible. Una prueba lo cuida.
- En alto contraste, con menos transparencia o sin desenfoque, el vidrio es opaco.
- Es de la capa funcional: barras, menús, ventanas. Nunca del contenido. Los componentes todavía no lo usan; lo estrenan las ventanas.

#### Menús, según la guía de Apple

- Un patrón nuevo, Menús: qué menú usar, cómo se nombran y ordenan sus ítems, submenús, ítems que se marcan y atajos.
- El menú que comparten `PopUpButton` y `PullDownButton` ahora admite separadores, títulos de grupo, ítems con visto, atajos a la vista, un submenú de un nivel y búsqueda por letra. Y no se sale de la pantalla: se abre hacia arriba o se alinea al otro lado.
- `ContextMenu`, nuevo: las acciones de un ítem con clic derecho, toque largo o la tecla de menú.
- `ActionSheet`, nuevo: las opciones de una acción que la persona inició, con la destructiva arriba y cancelar abajo.
- Es el primer paso de una revisión de los componentes contra la lista de Apple. Con estos son 56.

#### Cuatro componentes de IA

- `AILabel`, la marca de lo generado: sola, o con una explicación que se abre y dice qué hizo la IA, con qué y cuándo. Con `edited` dice «IA · editado» y ofrece volver atrás.
- `PromptInput`, la caja de pedido: parte en una línea y crece hasta seis, Enter envía, y mientras llega la respuesta su botón pasa a ser «Detener».
- `ChatMessage`, un turno de la conversación, con los cinco estados de una respuesta, sus fuentes y sus acciones. Se anuncia sola: una vez, completa.
- `SourceList`, la lista de fuentes, y `SourceRef`, el número junto a la frase.
- `AlmaEfectos.presencia` monta el Velo y el Halo juntos y cambia el Halo con el estado.
- Están en el grupo «IA» de los componentes. Con ellos son 54.

#### Guía de interfaces de IA

- Una guía nueva, en Guías, con seis pestañas: Resumen, Presencia, Transparencia, Conversación, Estados y Control. Cómo escribe una IA está en Contenido › IA, y cómo se usa con lector de pantalla y teclado, en Accesibilidad › IA.
- La presencia de una IA es luz: el Velo detrás y el Halo delante, con los colores de cada entidad. El Halo cambia con el estado: en reposo, escuchando, pensando y respondiendo.
- Lo generado lleva la marca de IA: el ícono `ai-label` y el texto «IA». Al abrirla explica qué hizo, con qué y cuándo.
- Seis imágenes, dos con el Velo y el Halo de verdad: una imagen de las guías ya puede llevar efectos.

#### Más gráficos, y sus estados

- `ScatterChart`, un gráfico de puntos para ver si dos medidas van juntas. Con él son tres.
- `BarChart` hace barras apiladas cuando recibe varias series, y `LineChart` rellena el área bajo la línea con `area`.
- Los tres gráficos traen sus estados: cargando, sin datos y error con «Reintentar». El estado ocupa el alto del gráfico, para que nada salte cuando llegan los datos.

#### Dos gráficos: BarChart y LineChart

- `BarChart` compara cantidades entre categorías; `LineChart` muestra cómo cambia una o varias series. Están en el grupo «Datos» de los componentes.
- Los dos traen sus datos también como tabla, se recorren con el teclado y anuncian cada valor. Un gráfico es una sola parada de Tab.
- Toman un solo color por defecto, el acento, y dejan destacar una barra o una serie. `BarChart` pasa solo a horizontal cuando no hay ancho.

#### Cinco patrones y tres fundamentos nuevos

- Patrones: **Bienvenida**, **Ajustes**, **Arrastrar y soltar**, **Deshacer** y **Compartir**. Con ellos son 21.
- Fundamentos: **Gráficos de datos** (cuándo graficar, qué gráfico elegir, color, anatomía y accesibilidad), **Diseño adaptable** (los tres anchos y cómo responde cada pieza) y **Entradas** (puntero, toque, teclado y voz, y los gestos con su alternativa). Con ellos son 9.
- Parten de lo que dicen nuestros referentes (IBM Carbon, Apple y Material) y están escritos para ALMA, con sus componentes y sus tokens. Son una primera versión para iterar: sus imágenes están pendientes.

#### Las portadas con busto laten

- La portada con busto puede llevar fondos de la colección en dos momentos: detrás de la figura, y en su lugar cuando se deshace. Las de Cordura, Ensayo y Autómata entran sin fondo; cuando el busto se deshizo y sus datos ya se fueron, baja el Velo y aparece el Halo al centro, con los colores de cada entidad.
- El Halo es transparente donde no hay luz, así que puede ir sobre otro fondo.
- El busto de Autómata vuelve a responder al puntero: sus puntos se apartan a su paso, como el suelo de su planeta. Lo demás de su medida contenida sigue igual.
- Un fondo y un texto nunca se encuentran: los datos se leen sobre la página limpia, salen junto con los puntos, y solo entonces entran el Velo y el Halo. Los cuatro datos se alinean como un marco, sin recuadro.
- El Halo tiene un ajuste nuevo, «Latido»: el anillo se ensancha con dos golpes y una pausa, como un corazón.

#### Efectos: una colección propia

- ALMA tiene una sección nueva, «Efectos», para lo que se mueve detrás, entre y debajo de las cosas. Parte con veintidós, en cuatro familias: fondos (Halo, Velo, Hilos, Retícula, Grano, Rayos, Ondas), reacciones (Chispa, Imán, Destello, Foco, Inclinar), transiciones (Trama, Aparecer, Cortina, Fundido) y textos (Descifrar, Contar, Escalonar, Brillo, Rotar, Desvelar).
- Todos están escritos aquí, sin librerías, y cumplen lo mismo: colores y tiempos por token, el reloj de ALMA, trabajo solo a la vista y respeto por el movimiento reducido. En una entidad toman sus colores sin tocarlos.
- Cada efecto tiene su página en la documentación, con el efecto en vivo y sus ajustes, y se usa con una línea: `AlmaEfectos.monta('halo', elemento)`.

#### Un reloj y una partitura para todo lo que se mueve

- Todas las piezas que se mueven (la palabra, las portadas, los planetas y las ilustraciones vivas de la documentación) usan un mismo reloj, `site/reloj.js`. Es el único lugar que sabe cuánto pasó desde el cuadro anterior, cuánto se desplazó la página, si se pidió menos movimiento y cuándo fue la última seña de quien mira.
- Las seis recetas del movimiento de marca están escritas una sola vez, en `site/partitura.js`, y cada pieza pide ahí sus tiempos. Movimiento tiene un apartado nuevo, «La partitura», y una prueba compara su tabla con lo que el código hace.
- Una secuencia se escribe como una lista de pasos con sus tiempos en tokens. La llegada a un planeta es la primera: la palabra se escribe, el suelo se asienta, y lo que se dice y los controles entran después.

#### El planeta: partículas con vida propia

- Cada partícula del suelo tiene su resorte, su inercia y su estela: el puntero la arrastra y la agita, y vuelve sola a su lugar, como en la portada del busto.
- El planeta deja de dibujar doce segundos después de la última seña, y baja por sí solo la cantidad de partículas cuando el equipo pierde cuadros.

#### Un planeta por entidad, en partículas

- Cada entidad tiene su planeta en la web: una página que se recorre a pie o en vuelo, dibujada con más de cien mil puntos en sus tres colores. Está en los Ejemplos de su sistema.
- Nada del planeta se guarda: la página lleva los genes de la entidad y la regla del relieve, y el suelo se calcula alrededor de quien lo recorre. Cada página pesa unos 170 KB.
- Los puntos se deshacen donde pasa el puntero y vuelven a su sitio. Con movimiento reducido no reaccionan, y la entidad contenida reacciona menos de la mitad.
- Se maneja con teclado o con botones en pantalla, y un panel de Slider ajusta cantidad, tamaño, luz, motas y reacción. `npm run mundo` arma las tres páginas.

### 7 de octubre de 2026

#### La portada como patrón, y la letra viva de cada entidad

- Patrones tiene uno nuevo, Portada: cuándo usarla, sus tres clases (con objeto, recorrido y sobrevuelo), sus cinco partes, contenido, color y accesibilidad, con su imagen de anatomía.
- Cada entidad tiene en su página de Tipografía la sección «Letra viva»: su palabra en vivo, sus pesos (al entrar, en reposo y al tocarla) y la regla de que el peso solo se mueve en la portada, nunca en la interfaz.

#### Movimiento de marca, escrito

- ALMA › Movimiento › «Movimiento de marca» ya no es un pendiente: tiene las seis recetas que usan las portadas (escribirse, armarse, deshacerse, responder, avanzar y descansar), con sus tiempos en tokens.
- Cada entidad tiene en su página de Movimiento la sección «En portadas», con su palabra en vivo y sus recetas en su propia voz.
- Los tiempos de los motores salen ahora de los tokens tal como los tiene cada entidad: quien se mueve un 25 % más lento también se escribe y se arma más lento.
- Medida contenida (`"medida": "contenida"`): nada llega volando, el puntero no revuelve, los granos no flotan y la mirada gira menos de la mitad. La usa Autómata en sus tres portadas.

#### La palabra de una entidad, como pieza propia

- La palabra grande de las portadas tiene ahora su propio motor (`site/palabra.js`) y su página de trabajo, Palabra (`npm run palabra`), con las tres entidades.
- Aprovecha que la tipografía es variable: se escribe letra por letra, cada una entra en el peso más liviano (100) y con un pequeño difuminado, y sube hasta el peso de títulos de la entidad. Al pasar el puntero, o con las flechas del teclado, las letras cercanas ganan peso.
- No tiene ajustes propios: los números de la entidad son el ritmo de la escritura, su dirección dice por dónde empieza (desde el centro o desde la primera letra), su redondez cuánto difuminado trae y sus puntas hasta qué peso llega al tocarla. Peso en reposo, ancho y grado son sus tokens de tipografía.
- Con movimiento reducido aparece escrita, sin entrada.
- Es la palabra de las nueve portadas (busto, túnel y nubes de cada entidad): detrás del busto, en la salida del túnel y sobre el horizonte. Ahí escucha el puntero de toda la escena y conserva el tamaño que le da cada portada.

#### Arena bajo una línea

- El sobrevuelo tiene un efecto opcional (`"arena": true`): lo que queda bajo una línea de la pantalla se deshace en arena que flota, cada grano a su tiempo, y vuelve a armarse al retroceder. Está escrito en el motor propio, sin librerías. Con movimiento reducido no hay arena.
- Lo usan las nubes de las tres entidades (`entidades/escaneos/<entidad>-nubes.json`), cada una en sus Ejemplos.

#### Un suelo escaneado, sobrevolado

- Tercera clase de portada, el sobrevuelo (`"modo": "sobrevuelo"`): para un escaneo sin paredes, como un mar de nubes. Al desplazar se vuela bajo sobre él, sus tres colores son sus alturas, sus orillas se deshacen y el nombre de la entidad está en el horizonte.
- La primera es Nubes de Cordura (`entidades/escaneos/cordura-nubes.json`, `npm run escaneo -- cordura-nubes`), con 74.523 puntos.
- El escaneo tiene una opción nueva, `--relieve`, que hace el objeto tantas veces más alto: sin ella, las alturas de algo visto desde muy arriba se pierden entre un paso de la trama y el siguiente.

#### Un lugar escaneado, recorrido por dentro

- El escaneo ya sirve para lugares, no solo para objetos: la trama no tiene tope de tamaño, se mira también desde arriba y desde abajo, y cada parte usa su propia textura. Opciones nuevas: `--pasos` (detalle según el lado más largo) y `--dentro` (deja puntos en todas las superficies).
- Hay una segunda clase de portada, el recorrido: al desplazar la página se avanza por el lugar a la altura de los ojos, y el nombre de la entidad espera en la salida. El puntero gira la mirada. Lo que se dice aparece de a una cosa por vez, a los lados.
- Cada entidad tiene su túnel, y está en sus «Ejemplos»: un paso bajo nivel de 36 metros en 81.587 puntos, con bóveda, paredes y suelo en sus tres colores. El contenido de cada uno está en `entidades/escaneos/<entidad>-tunel.json` y se arma con `npm run escaneo -- <entidad>-tunel`.

#### Ejemplos dentro de cada entidad

- **Una portada por entidad.** Cordura, Ensayo y Autómata tienen cada una su portada con el busto escaneado, con su palabra, su frase y sus colores (`entidades/escaneos/<entidad>.json`; `npm run escaneo` las arma todas).
- **Tema claro en las portadas.** Un botón arriba a la derecha cambia entre oscuro y claro, y la elección se recuerda. En claro los puntos son tinta, grandes donde el busto es oscuro.
- **Página «Ejemplos» en el lenguaje de cada entidad**, dentro de Galería: las páginas hechas con ese lenguaje, cada una con su imagen, una línea que la explica y el enlace para abrirla. En Ensayo están su portada y Ensayo Café. Lo que una entidad muestra va en la clave `ejemplos` de su lenguaje.

#### Un escaneo al centro de una página

- **De un escaneo a una trama de puntos.** `blender/escaneo.py` mira un objeto escaneado (un `.glb`) desde ocho lados a través de una rejilla y deja un punto donde lo toca, con su lugar, su tono y hacia dónde mira su superficie. Un busto de 32 MB quedó en 20.278 puntos y 189 KB.
- **Una portada con el objeto al centro.** `npm run escaneo -- ensayo` arma una página de un solo archivo: una palabra grande detrás, el objeto hecho de puntos en tres colores de la entidad, y al desplazar se deshace en grupos, uno junto a cada cosa que la página dice. Gira unos 60° a cada lado con el puntero, con la luz fija, y tapa la palabra que tiene detrás. Con movimiento reducido aparece armado y quieto.
- **Puntos con peso.** Cada punto tiene velocidad propia: el puntero los arrastra y arremolina como una mano por el humo, se estiran en hilos y vuelven solos a su lugar. Señalar un dato, o llegar a él con el teclado, junta su racimo y dispersa los otros.
- **El contenido va aparte**, en `entidades/escaneos/<entidad>.json`; el archivo original del escaneo no entra al repositorio.

#### Figuras de línea

- **Un motor propio** (`figuras/motor.js`): figuras en línea fina, vistas desde arriba y de lado, que responden al puntero y al teclado. Cámara sin perspectiva, resortes, un solo reloj que se detiene cuando nada se mueve, y sólidos redondeados que se dibujan como una silueta y un pliegue.
- **Atado a ALMA.** Los tonos de línea, el fondo, el acento, el foco y los tiempos son tokens por nombre; sirve en tema oscuro y claro, y respeta el movimiento reducido.
- **Sólidos que se inclinan.** Un sólido puede girar en una bisagra, como una tapa, y el motor muestra la cara que corresponde (el lomo o la pantalla) y lo que lleva dibujado encima.
- **Pulido:** el ascensor tiene puertas, la antena un solo brazo hasta su bocina, los cables del panel suben en curvas más limpias y el gancho de bloques de la pregunta se lee como esquinas.
- **Quinta tanda, cinco más:** `router` (sus antenas se inclinan hacia el puntero), `parcheo` (se levanta el cable más cercano y sus vecinos se apartan), `ramas` (se levanta un cambio y lo que vino antes), `lupa` (agranda lo que tiene debajo; en la hoja hay una marca que encontrar) y `sello` (estampa el signo de la entidad). Son veintiocho, y con ellas la colección queda completa.
- **Cuarta tanda, cuatro más, con barras curvas:** `candado` (su arco sale y gira al acercarse el puntero), `perchero` (las perchas se mecen cuando el puntero las roza), `canasto` (se inclina hacia el puntero y su asa lo sigue, tarde) y `pregunta` (un signo de interrogación cuyo gancho mira al puntero). Son veintitrés. La revisión en navegador ahora también prueba cada figura con movimiento reducido.
- **Tercera tanda, cinco más:** `tornamesa` (gira al arrastrar, sigue un momento y se asienta en un cuarto de vuelta), `boveda` (el dial gira hacia el puntero y en la combinación se retiran los pernos), `antena` (apunta hacia el puntero), `cinta` (anda sola; con el puntero encima el tiempo va más lento) y `matriz` (una luz la recorre sola y deja su rastro). Son diecinueve. Las que se mueven solas se detienen si se pide menos movimiento.
- **Y seis más:** `telefono` (desarmado en carcasa, batería, placa y vidrio), `rack` (hojas que salen cerca del puntero), `casilleros` (se abre el que señalas), `terminal` (se levanta la línea que eliges), `grafico` (sube la barra que señalas) y `enchufe` (la clavija se acerca hasta entrar). Son catorce. `npm run figuras:revisar` las mira una por una en un navegador.
- **Cinco figuras más:** `capas` (una ventana desarmada en sus capas), `teclado` (la tecla que señalas se hunde, y sus vecinas con ella), `ascensor` (la cabina viaja al piso que eliges), `cajonera` (sale el cajón que eliges) y `tamices` (se levanta el que eliges). Son ocho en total, y la página las muestra todas.
- **Propias de cada entidad.** Con los genes de una entidad, cada figura toma de su carta cuántas piezas tiene, qué tan redondas son sus esquinas, sus proporciones y cómo descansa: Autómata sube en terrazas y tiene esquinas rectas; Ensayo apila nueve fichas; Cordura, cinco. `npm run figura -- pila cordura`.
- **Parte de ALMA.** Los tonos de línea son tokens (`figura-fondo`, `figura-borde`, `figura-medio`, `figura-lejos`, `figura-realce`, `figura-acento`), con su contraste medido en los cuatro temas, y la guía de ilustración las describe.
- **En el lenguaje de cada entidad**, Ilustración suma «Figuras de línea»: sus tres figuras vivas, con la marca en su color y un mando para la fuerza de la respuesta.
- **Tres figuras:** `terreno` (dunas y una colina que sigue al puntero), `pila` (fichas que se abren en abanico sobre la que eliges) y `portatil` (su tapa se abre y se cierra con el puntero). `npm run figura -- <nombre>` arma cada una en un solo archivo.

#### Piel y pelaje, juntos en el desfile

- **Un personaje con las dos cosas.** Las almohadas que Blender infla (`blender/piloto.py --exporta`) viajan a Unity con sus piernas y sus zapatos (`unity/Assets/StreamingAssets/pieles/`), y allí caminan en el desfile con el andar de cada entidad.
- **La carta reparte.** Las almohadas de los centros definidos van desnudas: se ve su tela (punto, vinilo o pana) y el patrón de la entidad. Las de sus puertas llevan pelaje.
- **Se mueve.** Las piernas doblan en la rodilla, las almohadas rebotan un poco a cada paso y el pelaje las sigue.
- En el lenguaje de cada entidad, Personaje suma el retrato «Vestido para el desfile», y el video del desfile es el nuevo. El desfile anterior, solo con pelaje, sigue en Unity (`Desfile.vestidos`).

### 5 de octubre de 2026

#### Patrón, materia y piel

- **Un patrón propio por entidad.** Una figura de Chladni (la que traza la arena sobre una placa que vibra) hecha con los números de su carta (`entidades/patron.mjs`). Pesa unas pocas cifras, viaja con los genes y se dibuja en vivo en la página.
- **El patrón decide la materia.** Cuatro probetas por entidad (`blender/probetas.py`): tejido de dos hilos, dos capas con la de arriba recortada, resina que crece sobre sus líneas y goma con surcos. Dos colores de la entidad y no más.
- **Una piel por personaje.** El personaje ya no muestra su cuerpo: lo viste una nube de almohadas de tela simulada, que se inflan, se aprietan y se fruncen entre sí (`blender/piloto.py`). Hay una almohada por cada centro definido; las más grandes llevan el patrón. La piel sale de dónde pesa la carta (`pielDe`): vinilo inflado, tejido de punto grueso o tela acanalada. Abajo asoman piernas y zapatos, distintos para cada piel, en un instante de su propia caminata.
- En el lenguaje de cada entidad, Ilustración suma «Patrón y materia», y Personaje muestra el retrato con su piel.
- Pendiente: estas imágenes tardan de 6 a 8 minutos cada una y todavía no hay video con esta piel; el personaje de piezas de arcilla y laca queda como etapa anterior.

### 4 de octubre de 2026

#### Personaje de cada entidad

- **Un personaje de cuerpo entero por entidad.** Sus medidas y su andar salen de la carta y se calculan una sola vez (`entidades/personaje.mjs`): contextura por tipo, medida exacta por fecha de nacimiento, peso, postura y cojera según los centros definidos. `npm run genes -- <id>` los escribe para otros programas.
- **Con piezas, en Blender** (`blender/personaje.py`): 18 huesos, un cuerpo fundido con geometry nodes, una masa por centro, un tubo por canal, un detalle por puerta (botón, aro o púa), placas, cabello y ojos. Cuatro materiales con luz: arcilla, laca, acrílico y tela, siempre con los colores de la entidad. Una entidad sin redondez es de bloques.
- **Con pelaje, en vivo, en Unity** (`unity/`): el mismo cuerpo cubierto de pelo, rizo, púa, pluma y fleco, que se mueve al caminar, con luz y sombra. Los tres personajes desfilan de perfil sobre negro, cada uno con su andar, a más de 80 cuadros por segundo.
- **En el lenguaje de cada entidad**, Ilustración suma «Personaje»: sus dos retratos y una tabla que dice cómo es su cuerpo, cómo camina y de qué parte de la carta sale cada rasgo.
- **Materiales y pelaje son tokens de ALMA.** Dos familias nuevas en `tokens/`: `material` (arcilla, laca, acrílico y tela: aspereza, capa, luz interior, brillo de borde, paso de luz y relieve) y `pelaje` (pelo, rizo, púa, pluma y fleco: largo, caída, firmeza, grosor y densidad). Viajan con los genes, y Blender y Unity los leen: cambiar un token cambia el material en los dos. El color nunca va ahí; siempre es de la entidad.
- **Desfile ordenado y con rótulo.** En Unity los personajes caminan con separación pareja, sin alcanzarse, y cada uno lleva debajo su número (ocho cifras que salen de su fecha de nacimiento) y su nombre, en Roboto Flex con los ejes de ALMA. Un video corto del desfile va en la sección Personaje de cada entidad.
- **Piezas como un juguete articulado.** En Blender cada tramo de brazo y pierna es una pieza propia, gorda al medio y angosta en sus extremos, que se junta con la siguiente en una articulación; alternan dos colores de la entidad. Cada tramo tiene su propio grosor, que sale de la fecha de nacimiento (medidas `brazo`, `antebrazo`, `muslo`, `pierna`): una entidad tiene antebrazos pesados, otra piernas gruesas.
- **Los mismos andares en Blender y Unity:** peso, postura y cojera. En Unity la inclinación estaba al revés (se echaban hacia atrás); corregido.
- Pendiente: la receta de cada textura (el grano de la arcilla, las puntadas de la tela) sigue en el código de Blender.

### 3 de octubre de 2026

- **Láminas para plotter.** Cada entidad tiene ahora doce dibujos de su mundo hechos solo de trazos, para una pluma: sin rellenos, y sin dibujar lo que otra cosa tapa. Seis muestran su terreno (como malla densa, en cubos, como ciudad de torres, de frente, como maqueta y como mapa de curvas de nivel), tres lo recorren hacia el horizonte (filas, surcos y malla), una es su carta en cajas con lo oculto punteado, una la dirección de su campo como remolino, y dos sus criaturas (en línea y cubiertas de anillos). Salen listas para un plotter: en milímetros, en A4 o A3, con una capa por pluma y los trazos unidos, simplificados y ordenados para que la pluma viaje poco. `npm run laminas -- <id>` las escribe como archivos (con `--vpype`, vpype las repasa y deja la pluma viajando menos todavía), y están en la página Ilustración de cada lenguaje, con un botón para copiar el SVG. La técnica de las líneas ocultas sigue la idea de fogleman/ln, y el preparado, la de vpype; no se usa código de ninguno.

#### Puente a Blender

- `npm run genes -- <id>` escribe `build/blender/<id>.json`: los genes de la entidad y sus criaturas ya resueltas (cuerpos, ojos, anillos, colores), para que otro programa dibuje las mismas sin conocer la carta.
- `blender/criatura.py` lee ese archivo y arma la criatura en Blender, sin ventana, con la misma cámara que la página y los colores exactos de los tokens (sin luz ni sombra). Con `--fundida` los dos cuerpos pasan a ser una sola piel; con `--giro` la cámara rodea a la criatura.
- Comparada con la página punto por punto: mismos colores y misma silueta. La diferencia que queda es el contorno, que la página traza por fuera de los cuerpos llenos.

### 2 de octubre de 2026

- **Criaturas con volumen.** Las criaturas de una entidad ahora también existen con cuerpo: las mismas dos formas redondas y los dos ojos, dibujadas con líneas y vistas desde una cámara que se mece. El mismo nombre da la misma criatura, plana o con volumen, y de frente las dos coinciden. Llevan anillos (uno de los números de la entidad) y van llenas o en línea como sus emblemas. Están en la página Ilustración de cada lenguaje, con su control de pausa; como avatar se sigue usando la plana (`entidades/volumen.mjs`). La idea de dibujar volumen solo con líneas viene de fogleman/ln; no se usa su código.
- **La dirección del campo es de cada entidad.** El tipo sigue dando una dirección por defecto (foco, estallido, giro, espiral o espejo), pero una entidad puede declarar la suya en su lenguaje, con `ilustracion.generativa.campo`. Autómata, que es Proyector, declara «giro»: su campo gira alrededor de su centro y su relieve tiene un anillo en vez de una cumbre. Cordura y Ensayo siguen con el foco de su tipo.
- **Relieve: la textura quieta de cada entidad.** El campo de una entidad ahora también existe como terreno, dibujado solo con líneas: cada fila muestra lo que asoma por encima de las de adelante. Su tipo le da la forma (una cumbre donde converge el campo de un Proyector, ondas, un anillo, una espiral o un espejo) y cada centro definido es un cerro en su lugar de la carta. Tiene dos versiones: pieza, sobre negro con la paleta completa, y fondo, apagada para que el texto encima se lea a 4,5:1 o más en tema claro y oscuro. Está en la página Ilustración de cada lenguaje (`entidades/relieve.mjs`, `relieveSvg()`). La idea de dibujar volumen solo con líneas viene de fogleman/ln; no se usa su código.
- **El campo de cada entidad es suyo: va hacia donde dice su tipo y está hecho de sus emblemas.** Antes el campo de todas las entidades era el mismo dibujo con otros colores. Ahora el tipo decide la dirección (el de un Proyector converge hacia un foco, el de un Manifestador sale de un punto, el de un Generador gira, el de un Generador Manifestante se abre en espiral y el de un Reflector es un espejo) y cada partícula es uno de los emblemas de sus primeras doce puertas, algunos mucho más grandes que el resto, con menos partículas y una estela más corta para que se lean. Además, cada centro definido es un remolino en el lugar que ocupa en la carta (acostada: la cabeza a la izquierda, la raíz a la derecha), cada canal definido es una corriente entre sus dos centros, y la autoridad decide cómo respira el campo: en olas, a pulso, a saltos o en capas ordenadas. La portada de ALMA, que no es una entidad, conserva su campo de puntos.
- **Emblemas con motor nuevo: cada uno nace de una puerta de la carta.** Los emblemas de una entidad se parecían demasiado: las mismas puntas, la misma silueta redonda y dibujos repetidos. Ahora un emblema se arma por capas (una silueta, un motivo y una marca) y una puerta de la carta las elige. Una puerta es un hexagrama, y un hexagrama son dos trigramas: el de abajo elige una de 8 siluetas, el de arriba uno de 8 motivos, y la línea que la entidad tiene activa en esa puerta elige una de 6 marcas, que lleva el acento. Cada una de las 64 puertas tiene su emblema, y cada entidad usa las suyas, con sus números (centros, canales y líneas), sus colores y sus esquinas. Una lista de conceptos recibe puertas distintas, así que dos vecinos nunca comparten silueta y motivo. Los 32 dibujos originales siguen en el motor como familia clásica (`emblema(G, clave, { dibujo })`).
- **Una entidad nueva parte de un borrador automático.** `npm run entidad:nueva -- --nombre … --fecha … --hora … --zona …` escribe el primer borrador del lenguaje de diseño de una entidad desde su carta: principios, voz, prisma, letra, forma, color, movimiento y la lectura de su fecha. Antes eran unas 4.000 palabras a mano. Los ejemplos de producto salen neutros, sobre proyectos, y el archivo dice qué falta escribir (`borrador.revisar`). La página del lenguaje avisa que es un borrador mientras lo sea.
- **Las imágenes de las guías se dibujan en vivo.** Ya no son capturas: son escenas que el sitio dibuja en el momento, con los componentes reales y los valores del sistema que se está mirando. Una entidad nueva no dibuja ninguna imagen (antes, 132 por entidad) y un cambio en ALMA se ve en todas sin rehacerlas. Cada escena conserva su descripción para lectores de pantalla.
- **Una sola página para publicar.** «Sistemas ALMA» es ahora un solo archivo con ALMA y todas sus entidades. De cada entidad guarda solo lo que difiere de ALMA, así que pesa la mitad que antes (2,4 MB) y cada entidad nueva suma unos 115 KB: caben más de cien, y `npm run entidad -- <id>` lo deja listo al final. Reemplaza a los sitios sueltos de cada entidad.
- **Flechas dibujadas en los títulos grandes.** En el lenguaje de una entidad, las flechas de un título como «Sentir → Esperar → Decidir» ya no son el carácter de la tipografía, que a tamaño grande quedaba más grueso y más angosto que las letras. Ahora se dibujan con el mismo trazo de la letra (medido en Roboto Flex según su peso y su tamaño) y con el ancho de la entidad. El carácter sigue en el texto para quien lo lee o lo copia.
- **La portada de ALMA es su campo.** Los bloques y píldoras de la portada dan paso al campo, la misma pieza generativa con que firma cada entidad: partículas en azul, gris y blanco sobre la tinta de marca, con los colores leídos de los tokens y la semilla de Cordura. Va quieto y a la derecha; el nombre sigue a la izquierda. `scripts/build-portada.mjs` (parte de `npm run build`) copia a la portada el código de `entidades/campo.mjs`.
- **Autómata acepta personajes y mascotas.** Su lenguaje suma el estilo «Criaturas» y deja de pedir que se eviten: su Ilustración muestra criaturas y colonia, su firma las incluye, y la portada de su documentación es su colonia. La opción de una entidad sin personajes (`generativa.personajes: false`) sigue existiendo; hoy ninguna la usa.
- **La Entidad IBM ahora se llama Autómata.** Es la misma entidad (misma fecha, misma carta, mismo azul), con otro nombre: una entidad ficticia no debe llevar el de una marca real. Su identificador pasa de `ibm` a `automata` (`npm run entidad -- automata`). IBM queda donde corresponde, como la referencia contra la que se calibraron las reglas: sus páginas de Fecha y Calibración lo dicen así.
- **Pictogram, con motor nuevo y tres tipos.** El primer motor no se integraba con el resto: otro trazo, otra geometría, demasiado detalle y dibujos que no decían nada del nombre. El nuevo dibuja como Carbon (grilla de 32, trazo de 2, entre dos y cinco piezas) y tiene tres tipos, uno para cada caso, con la propiedad `kind`: `seal`, un sello para tipos de cosas (56 dibujos); `letter`, la inicial y el número del nombre en un marco, para lo que va en orden; y `creature`, una criatura para lo que tiene carácter (30 dibujos). Los tres tipos están disponibles en todas las entidades. El trazo ya no sigue el peso de la letra. `pictogramDrawings(nombres, kind)` reparte por tipo. El paquete pesa 57 KB menos.
- **ALMA es azul y negro.** El acento de ALMA pasa del lima a un azul con texto blanco (`interactive-01` `#2667F2`, de la rampa que nace de `tertiary-500`), y los neutros pierden su tinte azulado: el fondo de página es negro puro y los grises conservan la luminosidad que tenían, así que los contrastes entre neutros no cambian. El botón secundario es el mismo azul, muy oscuro y apagado, con texto blanco. En alto contraste oscuro el botón principal es azul claro con texto de tinta, y en alto contraste claro, azul profundo con texto blanco, para llegar a 7:1. Los valores salen del mismo motor que da su color a cada entidad. El lima queda como color heredado de la Entidad Cordura. El token `brand-lime` conserva su nombre. La tabla de contraste (628 pares) ahora mide cada botón con su propio token de texto.
- **Pictogram, un componente nuevo.** Un dibujo de línea pequeño que distingue una cosa de sus vecinas: un capítulo, un proyecto, una etiqueta. El nombre de la cosa elige el dibujo y el mismo nombre da siempre el mismo; `pictogramDrawings()` reparte los dibujos de una lista para que no se repitan. Va a 24 o 32 px, hereda el color del texto y sigue el peso de la letra y las esquinas de cada entidad. No reemplaza a `Icon`: los íconos de Carbon siguen para acciones y estados. Los dibujos vienen del estudio de íconos de Cordura y viven en `entidades/pictogramas.mjs`; `npm run build` los copia al paquete.
- **Dos familias de íconos.** La guía de íconos ahora dice cuándo va un ícono y cuándo un pictograma.
- **Personajes y mascotas, aceptados.** ALMA ya no excluye la ilustración figurativa: cada entidad puede tener criaturas propias, hechas con formas simples y los colores de su paleta, como avatar, mascota o textura. Un personaje acompaña y no informa: errores, avisos e instrucciones siguen con texto y un `Icon`. Los lenguajes de Cordura y de Ensayo suman el estilo «Criaturas» y dejan de pedir que se eviten; el de IBM no cambia.
- **Ilustración generativa en el lenguaje de una entidad.** La página Ilustración de la Entidad Ensayo ahora muestra sus criaturas (con un campo para escribir un nombre y ver la suya), la colonia como pieza y como fondo, sus emblemas y seis caras de tarjeta. Una entidad las activa con la clave `ilustracion.generativa` de su lenguaje, que trae los nombres y los conceptos de ejemplo; los textos se escriben una vez en la plantilla y toman los valores de la entidad. El generador pasó del ejemplo a `entidades/` (`generador.mjs`, `emblemas.mjs`, `placa.mjs`).
- **La firma de Ensayo es generativa.** En una entidad con ilustración generativa, la página Firma de su lenguaje ya no muestra las barras: muestra el campo, el carrusel y el micelio en movimiento, cada uno con su control para pausar, una tabla que dice qué rasgo de la carta decide cada cosa, y un resumen de criaturas, colonia, emblemas y caras con enlace a Ilustración. En Inicio y en Comunicación las barras dan paso a piezas quietas: el campo en la portada, una colonia en el cuadrado y el micelio crecido en la historia. El campo, el carrusel y el micelio pasaron a `entidades/`, y sus componentes a `site/generativo.js`, que comparten el lenguaje y el prototipo.
- **La portada de la documentación, también.** En una entidad con ilustración generativa, la portada de su documentación de componentes lleva su colonia en vez de las barras.
- **IBM, sin personajes.** Una entidad puede declarar su ilustración generativa sin personajes (`generativa.personajes: false`). La de IBM lo hace: su firma es el campo, el carrusel y el micelio, su Ilustración muestra emblemas y caras de tarjeta, sin criaturas ni colonia, y la portada de su documentación es el campo. Ya ninguna entidad usa la firma de barras.
- **Ensayo Café con el campo.** La portada del ejemplo de la cafetería es el campo de Ensayo, con un botón para pausarlo.
- **Cordura también.** El lenguaje de Cordura declara su ilustración generativa: sus criaturas, colonias, emblemas (de 5 puntas y de línea, como dice su carta) y caras de tarjeta están en Ilustración, y su firma es el campo, el carrusel de 5 tarjetas y el micelio, con su paleta lima, amarillo y verde.

### 1 de octubre de 2026

- **SegmentedControl, versión nueva.** Se rehízo siguiendo el control segmentado de Apple: un riel hundido sin borde, segmentos del mismo ancho y una sola pieza que se desliza hasta la opción elegida, con esquinas concéntricas a las del riel. Mide 44 px de alto en vez de 62, el texto sube de 11 a 12 px y la opción elegida va en peso de énfasis. Corrige el tema claro, donde la opción elegida era blanca sobre blanco y solo cambiaba el color del texto. Cambian los valores de `segmented-bg`, `segmented-selected-bg` y `segmented-selected-text`; `segmented-border` pasa a ser el contorno de la pieza elegida. Las propiedades y el teclado son los mismos.
- **Arreglos en listas y tablas.** Dentro de un Modal o una Sheet, List ya no suma su sangría a la de la capa: sus filas parten donde parte el título. La flecha de una fila termina donde termina un valor a la derecha. En los lenguajes de diseño, el texto de las tablas ya no queda pegado a la línea de la fila. En las imágenes, la hoja «Compartir viaje» usa el ícono de mensaje y las capas en marcos de dispositivo se dibujan sin el anillo de foco del teclado.
- **Ensayo Café, una página de ejemplo.** `ejemplos/ensayo-cafe/` guarda el landing de una cafetería ficticia de la Entidad Ensayo, que parte vendiendo solo cold brew: portada con la firma generativa, la receta, la carta, la visita y un botón para cambiar de tema. Está hecho con componentes de ALMA y los valores de la entidad, sin colores propios. `npm run ejemplo` lo arma en `build/ejemplos/ensayo-cafe.html`.
- **Todo en un solo lugar.** El sitio con selector (`npm run sistemas`) ahora anida el lenguaje de diseño de cada entidad: se elige el sistema (ALMA, IBM, Cordura o Ensayo) y, dentro de una entidad, Documentación o Lenguaje. Las imágenes de cada sistema viajan en paquetes que se piden al abrir la página que las muestra, así caben todos los sistemas en un solo artefacto.
- **Arreglo: la opción elegida de SegmentedControl.** Con el puntero encima, la opción elegida tomaba el color de texto de las demás y dejaba de leerse. Ahora conserva `segmented-selected-text`.
- **Entidad Ensayo, para probar el flujo.** Una marca ficticia, un taller de edición de textos, que nace el 1 de octubre de 2026 a las 12:00 en Santiago: un Proyector 5/2 con autoridad emocional. Su carta da un acento rojo profundo (`#D5025D`) con texto blanco, la letra extendida (`wdth` 140) y liviana, esquinas suaves de 12 px y un azul clásico para los enlaces. Solo se escribió su lenguaje de diseño (`entidades/lenguajes/ensayo.json`); la documentación, las imágenes y las pruebas salieron de `npm run entidad -- ensayo`. Queda una pregunta abierta: su rojo de marca es vecino del rojo de los errores y de las acciones destructivas.
- **Una entidad nueva en un archivo y un comando.** `npm run entidad -- <id>` arma el lenguaje de diseño, la documentación, las imágenes, las pruebas y 24 capturas para revisar. Los textos de la documentación de una entidad ya no se escriben a mano: salen de una plantilla compartida (`entidades/documentacion/plantilla/`) que toma los hechos de la carta y la voz del lenguaje de diseño de la entidad. La Entidad IBM y la Entidad Cordura se arman ahora desde esa plantilla.
- **Imágenes más rápidas y con memoria.** Se dibujan cuatro a la vez (131 imágenes en unos 40 segundos; antes, 4 minutos) y cada una recuerda de qué tokens depende: al cambiar un token solo se rehacen las que lo usan. Cada escena parte en una página limpia, así que ya no queda resaltado el elemento donde quedó el puntero: 12 imágenes de ALMA lo tenían y se rehicieron.
- **Un solo sitio con selector de sistema.** `npm run sistemas` arma ALMA y sus entidades en una sola página (`build/documentacion-sistemas/`), con un selector para cambiar de una a otra. Es una alternativa a un sitio por entidad.
- **Documentación por entidad, y la de la Entidad IBM.** `npm run entidad -- ibm` arma el sitio de documentación de una entidad (`build/documentacion-ibm/`): el mismo sitio de ALMA, con los valores de sus tokens, sus componentes en vivo y sus propias páginas. La entidad cambia valores, nunca nombres: 75 tokens en el caso de IBM, todos listados en la página nueva **Origen**, que también explica de qué rasgo de la carta sale cada uno. La construcción falla si una frase todavía describe un aspecto que la entidad no tiene: el lima, las píldoras o las esquinas redondeadas. Las 131 imágenes se dibujan con los tokens de la entidad, y junto al sitio queda `entidad-ibm.css`, con solo sus valores.
- **Documentación de la Entidad Cordura.** `npm run entidad -- cordura` arma su sitio (`build/documentacion-cordura/`): el lima heredado con texto tinta, la letra en su ancho natural con pesos livianos, esquinas suaves de 16 px y el movimiento pausado. Las palabras que delatan una frase sin revisar se deducen de la carta: Cordura conserva el lima de ALMA, así que «lima» no la delata.
- **Tres papeles de color por entidad, leídos en los botones de IBM.** La marca, la marca muy oscura y el color de acción. El botón principal usa la marca. El secundario (`interactive-02`) usa el tono de la marca, muy oscuro y con poca saturación, con texto blanco: tan oscuro como el paso 900 en los temas claros y como el 800 en los oscuros, así nunca rompe la armonía. El terciario es el color de acción: enlaces, foco, lo elegido y el contorno del botón, que se rellena al pasar el cursor. El color de acción es siempre un azul clásico de enlace, porque así se reconoce, y cada entidad lo acerca a su tono y le da su saturación; una marca azul, como la Entidad IBM, es su propio color de acción. Cordura conserva su lima, y su secundario pasa de acero a un oliva muy oscuro y apagado, y sus enlaces a un azul clásico. Con un acento profundo, además, encima es medio paso de la rampa y presionado son dos, como en IBM.
- **Gráficos de una entidad.** Con un acento profundo, las series categóricas (`viz-cat-01` a `viz-cat-08`) siguen la secuencia de IBM (púrpura, cian, turquesa, magenta, rojo, rojo extremo, verde, azul), con un paso por tema, sobre las rampas de ALMA y a 3:1 sobre los contenedores. La secuencial (`viz-seq-*`) es la rampa de la marca: el valor más alto es el paso más oscuro en claro y el más claro en oscuro.
- **El acento de una entidad llega a todos los estados.** El botón presionado (`active-primary`), el color de marca (`brand-lime`) y, con un acento profundo, el texto del botón presionado siguen a la entidad; antes quedaban en el lima de ALMA.

### 30 de septiembre de 2026

- **Lenguaje de diseño de Cordura y una plantilla para todas las entidades.** `npm run lenguaje` arma un lenguaje de diseño por cada archivo de `entidades/lenguajes/`: la plantilla pone la estructura, las especificaciones y los ejemplos de «así sí, así no» desde la carta, y el archivo pone las palabras. Cordura es la primera entidad con fecha real: «Sentir → Esperar → Decidir», principios como «El control es tuyo» y «Hasta la raíz», y su lima heredado. IBM pasa a la misma plantilla.
- **Color heredado y la entidad Cordura.** Una entidad puede traer un color de marca que ya tiene (`color`): reemplaza el tono y la saturación de la carta, y la armonía alrededor sigue saliendo de la carta. Cordura nace el 31 de marzo de 1987, a las 10:45, en Providencia: un Proyector 1/4 con autoridad emocional que hereda su lima, #E1F564, con apoyo amarillo y verde.
- **Entidades en el repositorio.** Entidades ALMA (`npm run entidades`) y el lenguaje de diseño de la Entidad IBM (`npm run estudio`) se arman desde `site/`, con el mismo motor de carta. Nuevo `npm run buscar-fecha`: encuentra las fechas cuya carta da una entidad, ordenadas por cercanía a un color; con él se eligió el 3 de junio de 1911, 04:00, para IBM. Las pruebas verifican que esa fecha siga generando el azul de IBM, ángulos rectos y letra de ancho normal.
- **Voz y principios de las entidades.** Se escriben desde la carta: cada una de las 64 puertas tiene un arquetipo de marca (tema, voz, principio y cómo se ve en la interfaz) y cada uno de los 36 canales, un nombre. Los canales definidos son los principios; la cruz, el propósito; la Garganta, el perfil, la autoridad y el tipo dan el registro, el ritmo y el trato de la voz, con ejemplos de «así sí, así no».
- **Motor de carta para las entidades.** `npm run carta` calcula la carta de diseño humano de una marca desde su fecha, hora y zona de nacimiento, con posiciones planetarias reales: puertas, líneas, canales, centros, tipo, autoridad, perfil, definición y cruz. Es la semilla de las entidades paramétricas; tiene sus propias pruebas en `npm test`.
- **Títulos de grupo del Sidebar sin mayúsculas.** Se muestran tal como se escriben («Menús», no «MENÚS»), en 12 px (`web-body-s`) y `text-02`.
- **Todos los íconos de los componentes a 16 px.** Stepper, Tabs, ProgressIndicator, List, InlineNotification, Tip, Slider, Accordion, DatePicker, Combobox, FileUploader, el ojo de TextInput y las flechas de PopUpButton, PullDownButton y Sidebar usan `icon-size-sm`. Donde el ícono va junto a su texto, la separación es de 16 px (Stepper, Tabs, ProgressIndicator). Solo quedan en 32 px (`icon-size-xl`) los íconos de las zonas vacías: EmptyState y el área de arrastre de FileUploader.
- **Íconos de los botones a 16 px.** `Button` y `PullDownButton` usan `icon-size-sm`, a 16 px de la etiqueta (antes 24 px y 10 px). El relleno del lado del ícono pasa a ser el mismo del otro lado (16, 24 o 32 px, según el tamaño), y el indicador de carga mide 16 px para que el botón no cambie de ancho.
- **Íconos de SearchField a 16 px.** La lupa y el botón de borrar usan `icon-size-sm`; la lupa queda a 16 px del texto y el campo tiene 16 px de relleno a cada lado. Borrar mantiene su área de toque de 44 × 44 px.
- **Íconos de Toolbar a 16 px.** Volver, las acciones y «Más» usan `icon-size-sm`, como Sidebar, los menús y TabBar. El área de toque sigue en 44 × 44 px. La lupa del buscador no cambia: es parte de `SearchField`.
- **Íconos de TabBar a 16 px.** Pasan de 24 px a `icon-size-sm`, como en Sidebar y los menús. En fila (desde 672 px) el ícono queda a 16 px de la etiqueta; apilados, en el teléfono, siguen a 2 px.
- **Íconos de los menús a 16 px.** Los menús de PopUpButton y PullDownButton, la lista de Combobox y las sugerencias de SearchField siguen la regla del Sidebar: ícono o marca de 16 px (`icon-size-sm`), 16 px hasta el texto y 16 px de relleno a los lados.
- **Imágenes de los patrones.** Las 16 imágenes pendientes de los patrones ya existen, hechas con los componentes reales: formularios, estados vacíos, la escala de las notificaciones, carga, búsqueda, las cuatro capas de diálogo, acciones, desactivado, contenido que desborda, encabezado global, inicio de sesión, indicadores de estado, barra de texto, etiquetas de los campos y divulgación. Ya no quedan imágenes pendientes.
- **Íconos del Sidebar a 16 px.** Pasan de 24 px a `icon-size-sm` (16 px), el mismo valor que su separación de la etiqueta, para que se perciban equilibrados y no pesen más que el texto.
- **Imágenes de los componentes.** Las 101 imágenes pendientes de las guías de componentes ya existen: anatomías numeradas, medidas tomadas del componente dibujado, estados y ejemplos en contexto. Se fotografían con los componentes reales (`npm run images`); las pantallas de modales, hojas, avisos y barras usan un marco de dispositivo. Solo quedan pendientes las 16 de los patrones.
- **Arreglo: botones destructivos desactivados.** Se veían igual que activos, porque el estilo destructivo le ganaba al desactivado. Ahora un «Eliminar» desactivado usa `button-disabled-bg` y `button-disabled-text`, como el resto.
- **Arreglo: ancho de los menús.** El menú de un botón angosto (un `PullDownButton` de solo ícono, «Más» en `Toolbar`) partía sus opciones en varias líneas. Ahora toma el ancho de su contenido, con el del botón como mínimo y 320 px como máximo.
- **Imágenes de los fundamentos.** Las 14 imágenes pendientes de Color, Espaciado, Íconos, Movimiento, Temas y Tipografía ya existen. Se fotografían con los componentes y tokens reales (`npm run images`), así que se rehacen solas cuando cambia ALMA. De paso, el diagrama de capas de color nombraba un token que no existe (`lime-400`); el lima base es `brand-lime`.
- **Pendientes a la vista.** Cada imagen por crear se marca en magenta, de la paleta secundaria, con los tokens nuevos `pending-bg`, `pending-border` y `pending-text`. Una página nueva, **Pendientes**, lista todo lo que falta: 131 imágenes, 45 componentes por probar con lectores de pantalla y el resto del plan. Se genera sola desde los documentos.
- **Sidebar y los menús separan sus opciones** con 4 px, para que la opción elegida y la que está bajo el cursor no se vean como un solo bloque. Aplica a Sidebar, PopUpButton, PullDownButton, Combobox y las sugerencias de SearchField.
- **Cuarto ajuste de radios**, hecho con Ajustes de ALMA: contenedores (`radius-panel`), marcos grandes (`radius-card`) y campos (`radius-field`) en 8 px; navegación (`radius-nav`) también en 8 px.
- **Capas del tema claro, accesibles.** `text-02` en claro pasa de `#566980` a `#4C5D74` para leerse sobre `ui-04` (4,8:1). En claro de alto contraste, `ui-03` y `ui-04` pasan a `#E8F0F4` y `#D5E5EB`, capas claras con texto sobre 7:1 (antes `ui-04` era un gris oscuro de borde). Los campos deshabilitados usan `disabled-03` en los cuatro temas. El verificador suma texto y controles sobre `ui-03` y `ui-04`.
- **Elevación en el tema oscuro.** Las capas simulan altura: `ui-01`, `ui-03` y `ui-04` mezclan blanco al 4, 7 y 10 % sobre la página (6, 12 y 18 % en alto contraste), guardado como color sólido. Las tarjetas dejan el azul noche y pasan a un casi negro. **Nuevo token `border-subtle`** para los bordes de contenedores, que antes usaban `ui-03`; conserva el mismo color en los cuatro temas. Los campos deshabilitados en oscuro toman `disabled-03`, con el mismo color de antes.
- **Capas del tema claro corregidas.** La página (`ui-02`) pasa a gris muy claro `#F8FBFC` y los contenedores (`ui-01`) a blanco `#FFFFFF`; estaban al revés y las tarjetas casi no se distinguían de la página. Lo mismo en claro de alto contraste. La guía de Color suma **Capas de superficie**: página, contenedor, panel y zona, con las acciones encima.
- **Pesos de los componentes en tokens.** Cuatro tokens nuevos, `font-weight-display`, `font-weight-heading`, `font-weight-body` y `font-weight-emphasis`, que usan los estilos de texto y todos los componentes. Los títulos de componentes siguen a los encabezados (350, antes 500 fijos); el texto de los componentes, al cuerpo (350, antes 400); lo elegido y lo actual, al énfasis (500). Ajustes de ALMA suma un control de peso de énfasis. En Flutter, cada estilo lleva el peso exacto en el eje `wght`.
- **Tercer ajuste de estilo**, hecho con Ajustes de ALMA: Roboto Flex a ancho 130 y grado 20; *display* en peso 220; títulos, cuerpo y etiquetas en 350. Radios: botones 16 px, etiquetas 8 px, casilla 2 px, paneles y muestras 2 px, marcos grandes y detalles 4 px; campos rectos y navegación en píldora, sin cambios.
- **Radios por familia.** Cinco tokens nuevos que se ajustan en Ajustes de ALMA: `radius-button`, `radius-field`, `radius-nav`, `radius-tag` y `radius-checkbox`. Parten con el valor que ya tenía cada elemento, salvo `SearchField` y el campo del `Slider`, que ahora siguen a los demás campos (0 px). La casilla de `Checkbox` tiene su propio radio de 4 px, así no se confunde con `RadioGroup`. Las opciones de `SegmentedControl` dejan de tener 48 px fijos.
- **Segundo ajuste de estilo**, hecho con Ajustes de ALMA: Roboto Flex a ancho 125 y grado 0; *display* en peso 500; títulos, cuerpo y etiquetas en 350; esquinas rectas (`radius-panel`, `radius-card` y `radius-swatch` en 0 px) y `radius-chip` en 48 px, redondeado completo. Reemplaza al ajuste anterior del mismo día.
- **Nuevo estilo tipográfico y de forma**, hecho con Ajustes de ALMA: Roboto Flex a ancho 151 y grado −200; *display* en peso 1000; títulos, cuerpo y etiquetas en 100; radios `radius-panel`, `radius-card` y `radius-swatch` en 8 px. `ProductCard` ahora toma su radio de `radius-panel` (antes 24 px fijos).
- **Ajustes de ALMA**, una herramienta para ajustar los colores de cada tema, los ejes de Roboto Flex (ancho y grado), los pesos y los radios sobre componentes en vivo. Revisa el contraste con los mismos pares del repositorio y exporta los cambios; `npm run tokens:apply -- cambios.json` los escribe en `tokens/`.
- **Nuevos tokens de ejes:** `font-width` (150) y `font-grade` (0). El CSS, los componentes y Flutter los usan en vez del 150 fijo.
- **Patrones completos.** Se sumaron Encabezado y navegación global, Inicio de sesión, Indicadores de estado, Barra de texto, Campos fluidos y Divulgación progresiva: 15 patrones que cubren los 18 de Carbon.
- **Nuevo: campos de solo lectura.** `TextInput` y `Textarea` aceptan `readOnly`: borde punteado con el token nuevo `field-border-readonly`, texto con contraste normal, foco y copia. El patrón **Desactivado y solo lectura** lo usa.
- **Tooltip se puede recorrer con el cursor** (WCAG 1.4.13): el globo recibe el puntero y un puente cubre la separación con el control.
- **PaymentCard escribe su estado** junto al chip («Activando»): ya no depende del color.
- **Los 46 componentes tienen su guía completa.** Se sumaron Accordion, EmptyState, Icon, PageControl, PaymentCard, ProductCard y Tip.
- **PaymentCard** dice su estado y los datos ocultos en texto para el lector de pantalla («Activando», «terminada en 4821»); antes el estado era solo color y el número se leía como una fila de puntos.
- **Contraste:** el verificador suma los 22 pares de ProductCard (texto y dato destacado sobre los 11 tonos).
- **Guías completas de estados y formularios:** ActivityIndicator, ProgressBar, ProgressIndicator, ProgressLine, Skeleton, DatePicker, TimePicker, FileUploader, Slider y Stepper. Ya son 39 componentes con sus cuatro partes.
- **ProgressBar** muestra el porcentaje con el formato de Chile («60%», antes «60 %»).
- **Guías completas de Toolbar, SearchField, SegmentedControl, Tag, Link, PullDownButton y Card.** Ya son 29 componentes con sus cuatro partes.
- **SegmentedControl con teclado de grupo de radios:** una sola parada de Tab en la opción elegida; las flechas, Inicio y Fin eligen y mueven el foco. Antes cada opción era una parada de Tab y las flechas no hacían nada.
- **Patrones y guías.** Nueve patrones (formularios, estados vacíos, notificaciones, carga, búsqueda y filtros, diálogos y capas, acciones, desactivado y solo lectura, contenido que desborda) y dos guías con pestañas: Accesibilidad y Contenido.
- **Fundamentos con la profundidad de Carbon.** Color, Tipografía, Espaciado y grilla, Movimiento, Íconos y Temas tienen su página con pestañas (Resumen, Uso o Estilos, Código) y, en el sitio, una pestaña **Tokens** con las tablas en vivo. La de Temas pinta cada tema en su fila.
- **Guías completas de la tanda 3.** Tabs, Sidebar, TabBar, Breadcrumb, Table, Pagination y List tienen sus cuatro partes.
- **Pagination** muestra los números con el formato de Chile («1.284 movimientos»); antes salía «1284».
- **Guías completas de la tanda 2.** Modal, Sheet, Alert, InlineNotification, ToastRegion, Tooltip y Popover tienen sus cuatro partes. La de Tooltip deja escrito un pendiente de WCAG 1.4.13: el globo todavía no se puede recorrer con el cursor sin que desaparezca.
- **Accesibilidad de componentes.** Table y List aceptan `headingLevel`, como Accordion, para encajar en la jerarquía de títulos de la página. Modal y Sheet ya no usan `header` ni `footer`, que los lectores de pantalla anunciaban como regiones de la página. En pantallas angostas, la Toolbar pone el buscador en su propia fila.
- **Sitio de documentación con el estilo de ALMA.** Una página propia, hecha con los componentes de ALMA (Sidebar, Toolbar, SearchField, Tabs, Table), reúne la guía general, estas novedades, los fundamentos (color, tipografía, espaciado, movimiento) y cada componente con su vista previa en vivo y sus pestañas Uso, Estilo, Código y Accesibilidad. Tiene los cuatro temas. `npm run site` la genera desde el repositorio.
- **Guías completas de la tanda 1.** TextInput, Textarea, Combobox, PopUpButton, Checkbox, RadioGroup y Switch tienen ahora sus cuatro partes (Uso, Estilo, Código y Accesibilidad), con tablas de Elemento · Propiedad · Token por estado, tipografía, medidas, teclado y marcadores de imagen pendiente. Búscalas en la ficha de cada componente.
- **Button tinted al presionar.** Muestra un borde interior de 2 px, igual que plain y tertiary.
- **Guía de Button** con el formato de referencia completo, que es el modelo para el resto de los componentes.
- **Movimiento de marca.** Las recetas parten de IBM Carbon (expresivo y coreografía: estructura, contenido, datos escalonados cada 20 ms, acción principal; todo bajo 500 ms) y de Apple HIG. La ficha Motion las muestra.
- **Vistas previas.** Cada vista previa pinta el fondo de página de su tema; ya no aparece la capa clara detrás de los componentes.
- **ALMA en GitHub.** Los tokens (formato W3C) viven en el repositorio y generan el CSS, el JS, los tokens para Flutter y este artefacto. Cada cambio pasa por una prueba de ida y vuelta y por 492 pares de contraste.

### 29 de septiembre de 2026

- **Roles del theme de origen.** La página va en `ui-02` y los contenedores en `ui-01`.
- **Botón tertiary**, nuevo.
- **Destructive tinted** tiene sus propios tokens de hover y presionado; ya no toma el lima.
- **Íconos de IBM Carbon** como SVG dentro de la página, en lugar de las fuentes de Material Symbols (12,6 MB menos por página).
- **Pesos tipográficos** iguales en tema oscuro y claro: display 600, títulos 500, cuerpo 400.

## Cómo se documenta ALMA

La documentación toma como base la estructura y los temas de IBM Carbon (carbondesignsystem.com), con el contenido escrito para ALMA: sus tokens, sus componentes, las guías de Apple que sigue y el español de Chile. No es una traducción de Carbon: Carbon marca **qué** hay que documentar; ALMA dice **cómo** lo resuelve.

### Arquitectura: dos sitios

El referente es la página «Referente IBM» del archivo de Figma de Cordura, que reproduce los dos sitios de IBM. ALMA se documenta igual, en dos partes:

**Sistema de diseño** (modelo: Carbon)
- Sobre ALMA: qué es, quién lo usa, versiones.
- Componentes: cada uno con Uso, Estilo, Código y Accesibilidad.
- Elementos: color, tipografía, espaciado, grilla, movimiento, íconos, temas.
- Patrones.
- Guías: accesibilidad y contenido.
- Recursos, novedades, soporte y preguntas frecuentes.

**Lenguaje de diseño** (modelo: IBM Design Language)
- Punto de vista y principios de Cordura.
- Galería.
- Tipografía: la familia (Roboto Flex) y conceptos básicos de tipo.
- Grilla 2x.
- Logo (en IBM, el 8-Bar).
- Íconos de app e íconos de interfaz.
- Pictogramas: biblioteca, diseño, uso y cómo contribuir.
- Ilustración: resumen, técnicas y estilos (línea, plano, isométrico), personas, gráficos y diagramas técnicos.
- Recursos.

### Imágenes

Las imágenes que explican cada página se crearán después con el sistema de diseño generativo y procedural de Cordura, del que saldrán patrones, texturas y el resto de los elementos visuales. Mientras tanto, cada lugar donde va una imagen lleva un marcador:

```
> **Imagen pendiente:** qué debe mostrar, con qué variantes, estados y temas.
```

El marcador describe la imagen con precisión suficiente para generarla sin volver a leer la página. En el sitio se ve en magenta (`pending-*`), y la página **Pendientes** los reúne todos.

Las imágenes que muestran interfaz o diagramas de tokens se fotografían con los componentes reales: cada escena está en `scripts/build-images.mjs` y `npm run images` las vuelve a sacar cuando cambian los tokens. Quedan en `artifact/project/assets/<Sección>/` y el documento las enlaza como `![descripción](assets/<Sección>/<nombre>.png)`.

### Cómo se organiza

Cada componente tiene cuatro pestañas, como en Carbon:

| Pestaña | Archivo | Qué responde |
|---|---|---|
| Uso | `usage.md` | Cuándo usarlo y cuándo no, variantes, anatomía, tamaños, jerarquía, alineación, contenido, comportamiento, modificadores. |
| Estilo | `style.md` | Color por estado con sus tokens, tipografía, medidas, foco, movimiento, contraste por tema. |
| Código | `code.md` | Propiedades, ejemplos, HTML y CSS, cómo ajustar con tokens, Flutter. |
| Accesibilidad | `accessibility.md` | Qué resuelve ALMA, teclado, recomendaciones de diseño, etiquetado, desarrollo, verificación. |

`npm run build` arma con las cuatro la guía del componente en el artefacto (`artifact/project/components/<Nombre>/README.md`). Esa guía no se edita a mano: se edita aquí.

Los fundamentos siguen el mismo camino: `docs/elements/<nombre>/<n>-<pestaña>.md` genera `artifact/project/Fundamentos-<orden>-<nombre>.md`, una sección del artefacto por fundamento. En el sitio, cada uno suma una pestaña **Tokens** con las tablas en vivo.

### Avance

Carbon: 44 componentes × 4 pestañas, 23 páginas de elementos, 18 patrones, 11 de visualización de datos y 8 de guías.

#### Componentes

| Carbon | ALMA | Estado |
|---|---|---|
| Button | `Button` | **Completo (4 pestañas, formato de la referencia)** |
| Accordion | `Accordion` | **Completo (4 pestañas, formato de la referencia)** |
| Breadcrumb | `Breadcrumb` | **Completo (4 pestañas, formato de la referencia)** |
| Checkbox | `Checkbox` | **Completo (4 pestañas, formato de la referencia)** |
| Combo box · Multiselect | `Combobox` | **Completo (4 pestañas, formato de la referencia)** |
| Contained list | `List` | **Completo (4 pestañas, formato de la referencia)** |
| Content switcher | `SegmentedControl` | **Completo (4 pestañas, formato de la referencia)** |
| Data table | `Table` | **Completo (4 pestañas, formato de la referencia)** |
| Date picker | `DatePicker`, `TimePicker` | **Completo (4 pestañas, formato de la referencia)** |
| Dropdown · Select | `PopUpButton` | **Completo (4 pestañas, formato de la referencia)** |
| File uploader | `FileUploader` | **Completo (4 pestañas, formato de la referencia)** |
| Inline loading · Loading | `ActivityIndicator`, `Skeleton`, `ProgressLine` | **Completo (4 pestañas, formato de la referencia)** |
| Link | `Link` | **Completo (4 pestañas, formato de la referencia)** |
| Menu · Menu buttons · Overflow menu | `PullDownButton` | **Completo (4 pestañas, formato de la referencia)** |
| Modal | `Modal`, `Sheet`, `Alert` | **Completo (4 pestañas, formato de la referencia)** |
| Notification | `InlineNotification`, `ToastRegion` | **Completo (4 pestañas, formato de la referencia)** |
| Number input | `Stepper` | **Completo (4 pestañas, formato de la referencia)** |
| Pagination | `Pagination` | **Completo (4 pestañas, formato de la referencia)** |
| Popover · Toggletip | `Popover` | **Completo (4 pestañas, formato de la referencia)** |
| Progress bar | `ProgressBar` | **Completo (4 pestañas, formato de la referencia)** |
| Progress indicator | `ProgressIndicator` | **Completo (4 pestañas, formato de la referencia)** |
| Radio button | `RadioGroup` | **Completo (4 pestañas, formato de la referencia)** |
| Search | `SearchField` | **Completo (4 pestañas, formato de la referencia)** |
| Slider | `Slider` | **Completo (4 pestañas, formato de la referencia)** |
| Tabs | `Tabs` | **Completo (4 pestañas, formato de la referencia)** |
| Tag | `Tag` | **Completo (4 pestañas, formato de la referencia)** |
| Text input | `TextInput`, `Textarea` | **Completo (4 pestañas, formato de la referencia)** |
| Tile | `Card` | **Completo (4 pestañas, formato de la referencia)** |
| Toggle | `Switch` | **Completo (4 pestañas, formato de la referencia)** |
| Tooltip | `Tooltip`, `Tip` | **Completo (4 pestañas, formato de la referencia)** |
| UI shell (header, paneles) | `Toolbar`, `Sidebar`, `TabBar` | **Completo (4 pestañas, formato de la referencia)** |
| Code snippet | — | Falta en ALMA |
| Structured list | — | Falta en ALMA |
| Tree view | — | Falta en ALMA |
| AI label | — | Falta en ALMA |
| List (listas de texto) | — | Falta en ALMA |
| Form | — | Falta (patrón) |
| — | `ProductCard`, `PaymentCard`, `PageControl`, `EmptyState`, `Icon` | Propios de ALMA. **Completo (4 pestañas, formato de la referencia)** |

#### Elementos, patrones y guías

| Carbon | Páginas | ALMA hoy |
|---|---|---|
| Color (resumen, uso, tokens, código) | 4 | **Completo**: Resumen, Uso, Código y Tokens |
| Tipografía (resumen, estrategias, conjuntos, código) | 4 | **Completo**: Resumen, Estilos, Código y Tokens |
| Espaciado · 2x Grid | 5 | **Completo**: Resumen, Grilla, Densidad y capas, Código y Tokens |
| Movimiento (resumen, coreografía, código) | 4 | **Completo**: Resumen, Coreografía, Código y Tokens |
| Íconos · Pictogramas | 4 | Íconos **completo** (Resumen, Uso, Código y Tokens); pictogramas: falta |
| Temas | 2 | **Completo**: Resumen, Código y Tokens |
| Patrones (18: acciones comunes, diálogos, estados desactivados y de solo lectura, divulgación, estados vacíos, filtros, formularios, encabezado global, carga, inicio de sesión, notificaciones, contenido que desborda, búsqueda, indicadores de estado, barra de texto, estilos fluidos) | 18 | **Completo:** 15 páginas cubren los 18 (desactivado y solo lectura van juntos, igual que búsqueda y filtros). |
| Visualización de datos | 11 | Solo la paleta de gráficos |
| Accesibilidad (resumen, color, teclado, desarrollo) | 4 | **Completo**: Resumen, Color, Teclado, Desarrollo |
| Contenido (resumen, estilo, etiquetas de acción) | 3 | **Completo**: Voz y tono, Estilo de escritura, Etiquetas de acción, Formatos |
