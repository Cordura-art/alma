---
pattern: Portada
summary: La primera pantalla de una entidad: algo escaneado dibujado en puntos, su nombre y pocas palabras alrededor.
---

## Cuándo

Para abrir: la página de inicio de una entidad, el comienzo de una campaña, una bienvenida. Una portada presenta, no explica; lo que hay que leer con calma va debajo de ella.

No la uses dentro de un producto. Ahí la persona viene a hacer algo, y una portada la hace esperar.

## Tres clases

Las tres parten de un escaneo (un objeto, un lugar o un suelo) pasado a una trama de puntos, y se eligen según lo escaneado.

| Clase | Qué se escanea | Qué hace el desplazamiento | Dónde va el nombre |
|---|---|---|---|
| Con objeto | Algo que se puede rodear: un busto, una pieza. | Los puntos se separan en grupos, uno junto a cada dato. | Detrás del objeto, grande. |
| Recorrido | Un lugar con paredes: un pasillo, un túnel. | Se avanza por dentro, a la altura de los ojos. | En la salida: pequeño al principio, entero al llegar. |
| Sobrevuelo | Un suelo sin paredes: un relieve, un mar de nubes. | Se vuela bajo sobre él, mirando un poco hacia abajo. | Sobre el horizonte. |

## Estructura

Toda portada tiene las mismas cinco partes, y ninguna más.

1. **El nombre.** La palabra de la entidad, como pieza viva: se escribe letra por letra y su peso responde al puntero.
2. **La figura.** Lo escaneado, dibujado en puntos con los tres colores de la entidad. Lleva una descripción para quien no la ve.
3. **La entrada.** Una frase de dos o tres líneas, una sola acción `filled` y una pista de qué hacer. Siempre sobre un recuadro con el fondo de la página.
4. **Los datos.** Hasta cuatro frases cortas que aparecen al desplazar, cada una sobre su recuadro.
5. **El tema.** Un `Button` `plain` de solo ícono, arriba a la derecha, para pasar de oscuro a claro.

![Anatomía de una portada: el nombre grande detrás (1), la figura de puntos al centro (2), la entrada con su frase, su botón y su pista abajo a la izquierda (3), un dato sobre su recuadro a la derecha (4) y el botón de tema arriba a la derecha (5).](assets/Patrones/portada-anatomia.png)

Debajo de la portada va el contenido que sí se lee: la acción de la entrada lleva ahí.

### Fondos

Una portada con objeto puede llevar, bajo todo lo demás, fondos de la colección de Efectos en dos momentos: detrás de la figura mientras está entera, y en su lugar cuando ya se deshizo. En un mismo momento caben dos, uno sobre otro, si el de arriba deja ver el de abajo.

Un fondo y un texto nunca se encuentran. Los fondos del primer momento se apagan al empezar a desplazar, antes de que llegue ningún dato. Los del segundo esperan: primero la figura se deshace y los datos se leen sobre la página limpia; después los puntos y los datos se van juntos; y solo entonces entra el fondo. Así los datos no necesitan recuadro ni nada detrás, y la portada es un poco más larga, porque tiene una cosa más que mostrar al final.

Las tres portadas con busto (Cordura, Ensayo y Autómata) entran sin fondo. Cuando el busto se deshizo y sus datos ya se leyeron y se fueron, baja el Velo desde lo alto y aparece el Halo al centro, latiendo, cada una con los colores de su entidad.

Con un fondo al final, los cuatro datos forman un marco: los de arriba alineados por arriba, los de abajo por abajo.

## Contenido

- **La frase dice una idea**, no describe la figura. «Un primer borrador nunca es el texto. Es el material.»
- **Una acción.** Si hacen falta dos, no es una portada: es una página.
- **Los datos son frases completas** y se entienden solos, porque aparecen de a uno.
- **El texto nunca va sobre los puntos.** Todo lo que se lee tiene su recuadro: los puntos cambian con el tema y con el movimiento, y el contraste no se puede prometer de otro modo.

## Color

La figura usa tres colores de la entidad y ninguno más, repartidos por zonas: de arriba abajo en un objeto; bóveda, paredes y suelo en un recorrido; cimas, laderas y hondonadas en un sobrevuelo. En tema claro los puntos son tinta: marcan lo oscuro de la figura en vez de lo claro.

## Movimiento

Una portada es el único lugar, junto con la firma, donde vale el movimiento de marca. Sus recetas (escribirse, armarse, deshacerse, responder, avanzar y descansar) y la medida contenida están en Movimiento › Coreografía.

## Accesibilidad

- **Todo el texto es texto.** El nombre, la frase y los datos están en la página aunque la figura no cargue.
- **La figura tiene descripción** y no recibe el foco: no hay nada que operar en ella.
- **Con teclado** se llega al tema, al nombre (las flechas mueven su peso) y a la acción. Si la acción ya no está a la vista, la página vuelve al inicio al enfocarla.
- **Con movimiento reducido** todo aparece armado y escrito: sin polvo, sin granos y sin giro. El desplazamiento sigue funcionando.
- **Nada depende del puntero.** Girar la mirada o revolver los puntos es un añadido; quien no lo hace no pierde contenido.

## No hagas

- No pongas más de una portada en una página.
- No escribas sobre los puntos sin recuadro.
- No uses colores que no sean los tres de la entidad.
- No hagas que algo avance solo: quien lee marca el paso.
- No uses una portada para mostrar un escaneo que no dice nada de la entidad.
