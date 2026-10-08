---
component: DigitEntry
tab: Uso
summary: Un código corto de números, un dígito por casilla.
---


## Resumen

`DigitEntry` pide un código corto: el de verificación que llega por correo o mensaje, o un PIN. Cada dígito tiene su casilla, y así se ve de inmediato cuántos son y cuántos faltan. Es la *digit entry view* de Apple.

## Cuándo usarlo

- Para un código de 4 a 8 dígitos que la persona copia de otro lugar.
- En el patrón **Inicio de sesión**, para el segundo paso.

## Cuándo no

- Para un número que la persona sabe de memoria y es largo (un RUT, un teléfono): eso es un `TextInput`.
- Para una contraseña con letras.
- Con más de 8 dígitos: no caben, y nadie los cuenta de un vistazo.

## Anatomía

1. **Rótulo:** qué código es. Texto principal.
2. **Casillas:** una por dígito.
3. **Casilla actual:** la que sigue, marcada con el foco.
4. **Ayuda o error:** dónde llegó el código, o qué falló. Texto secundario; el error, en su color y con ícono.

![Anatomía de DigitEntry: el rótulo «Código de verificación» (1), seis casillas (2) con las tres primeras llenas y la cuarta marcada como actual (3), y debajo la ayuda «Te lo enviamos al correo» (4).](assets/Componentes/digit-entry-anatomia.png)

## Comportamiento

- **Se escribe de corrido.** No hay que pasar de casilla en casilla.
- **Se puede pegar** el código entero.
- **El sistema puede llenarlo solo** cuando llega el mensaje.
- **Al completar, avisa** (`onComplete`): puedes verificar sin pedir un botón.
- **Si falla, no se borra.** Se dice qué pasó y la persona corrige.

## Contenido

- La ayuda dice **dónde llegó** el código, con el dato a medias: «c•••@correo.cl».
- Ofrece cerca cómo pedir otro: un `Button` `plain` «Enviar otro código».
- El error dice qué hacer: «El código no coincide. Revisa el último que te enviamos.»

## Relacionados

`TextInput` · Inicio de sesión · Formularios · Jerarquía.

## Referencias

- Apple, Human Interface Guidelines: Digit entry views.
