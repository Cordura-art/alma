---
pattern: Bienvenida
summary: La primera vez de alguien en un producto: cuánto decirle antes de dejarlo empezar.
---

## Cuándo

Solo la primera vez, y solo si el producto no se explica al usarlo. La mejor bienvenida es la que no hace falta: una primera pantalla clara, con un estado vacío que dice qué hacer.

Antes de diseñar una, prueba sin ella. Si la gente llega sola a su primera tarea, no la pongas.

## Tres formas

Elige la más liviana que alcance.

| Forma | Qué es | Cuándo |
|---|---|---|
| Sin bienvenida | El estado vacío hace el trabajo: dice qué falta y ofrece el primer paso. | Casi siempre. |
| Pistas en contexto | Un `Tip` junto a lo que explica, la primera vez que hace falta. | Una función que no se descubre sola. |
| Recorrido | De una a tres pantallas antes de empezar. | Algo que hay que entender o decidir antes del primer uso. |

## Principios

1. **Empezar haciendo.** Se aprende más con la primera tarea que leyendo sobre ella. Lleva a la persona a hacer algo real cuanto antes.
2. **Breve.** Tres pantallas como máximo, una idea por pantalla.
3. **Siempre se puede saltar.** «Saltar» está a la vista desde la primera pantalla, y saltar no quita nada.
4. **Pedir cuando se necesita.** Un permiso o un dato se pide en el momento en que sirve, no todo junto al inicio.
5. **Mostrar antes de pedir cuenta.** Deja ver para qué sirve el producto antes de exigir registro.
6. **Una sola vez.** No vuelve en cada visita. Lo que enseña queda al alcance después, en Ayuda.

## Anatomía de un recorrido

1. **Figura** (opcional): una ilustración o una captura que muestre la idea.
2. **Título:** qué se puede hacer, en pocas palabras. «Compra tu pasaje en un minuto».
3. **Una frase:** lo que hay que saber, y nada más.
4. **`PageControl`:** dónde va y cuánto falta.
5. **Acción principal** `filled`: «Continuar», y en la última, la primera tarea: «Buscar pasajes».
6. **«Saltar»** `plain`, siempre en el mismo lugar.

![Las tres pantallas de un recorrido de bienvenida en un teléfono. Cada una tiene «Saltar» arriba a la derecha, una figura, un título, una frase, el PageControl con el paso marcado y un botón: «Continuar» en las dos primeras y «Buscar pasajes» en la última.](assets/Patrones/bienvenida-recorrido.png)

## Permisos y datos

| Qué se pide | Cuándo pedirlo | Cómo |
|---|---|---|
| Notificaciones | Después de la primera compra, cuando hay algo que avisar. | Di antes para qué: «Te avisamos si cambia tu salida». |
| Ubicación | Al tocar «Cerca de mí». | Ofrece seguir sin darla: escribir la ciudad. |
| Cuenta | Al guardar o pagar. | Deja mirar y buscar sin cuenta. |
| Datos personales | En el formulario que los usa. | Solo los que ese paso necesita. |

Si la persona dice que no, el producto sigue funcionando, y la opción queda en Ajustes.

## Contenido

- Habla de lo que la persona logra, no de las funciones: «Lleva tu pasaje en el teléfono», no «Billetera digital integrada».
- Sin signos de exclamación ni bienvenidas largas.
- El último botón nombra la primera tarea, no dice «Empezar».

## Accesibilidad

- Un lector de pantalla anuncia la posición: «Paso 1 de 3».
- Al pasar de pantalla, el foco va al título nuevo.
- Nada avanza solo ni tiene tiempo límite.
- Con movimiento reducido, las pantallas cambian sin deslizarse.

## No hagas

- Un recorrido que repite lo que la interfaz ya dice.
- Pedir todos los permisos de una vez al abrir.
- Esconder «Saltar» o ponerlo solo al final.
- Un video o una animación que no se puede detener.

## Relacionados

`PageControl` · `Tip` · `EmptyState` · Estados vacíos · Inicio de sesión · Ajustes.
