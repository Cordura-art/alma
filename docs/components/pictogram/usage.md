---
component: Pictogram
tab: Uso
summary: Un dibujo de línea pequeño que distingue una cosa de sus vecinas.
---


## Resumen

`Pictogram` dibuja un pictograma: un dibujo de línea que le pertenece a una cosa y va junto a su nombre. El nombre elige el dibujo, y el mismo nombre da siempre el mismo. Se dibuja como un ícono de Carbon: en la misma grilla, con el mismo trazo y pocas piezas. La regla completa está en el fundamento **Íconos**.

### Cuándo usarlo
- En listas y tarjetas donde varias cosas del mismo tipo se parecen y la persona vuelve a buscarlas.
- Siempre junto al nombre de la cosa.

### Cuándo no usarlo
- **En botones, menús, campos o avisos:** ahí va `Icon`.
- **Para decir un estado:** dilo con la palabra y, si hace falta, con `Icon`.
- **Solo, sin nombre.**
- **En más de una lista por pantalla:** si todo lleva dibujo, nada se distingue.

## Tipos

Hay tres, uno para cada caso. Usa uno solo por lista.

| Tipo | `kind` | Para qué | Qué dibuja |
|---|---|---|---|
| Sello | `seal` (por defecto) | Tipos de cosas: etiquetas, archivos, categorías. | Una base y una marca, de un vocabulario pequeño. |
| Letra | `letter` | Lo que va en orden o numerado: capítulos, pasos, versiones. | La inicial del nombre y su número, dentro de un marco. |
| Criatura | `creature` | Lo que tiene carácter: proyectos, equipos, espacios. | Una cabeza, dos ojos y un rasgo: los personajes de la entidad. |

![Tres listas con pictogramas a 24 px junto a cada nombre: sellos para tipos de cosas, letras para los capítulos de un libro y criaturas para proyectos y equipos; al lado, un pictograma de cada tipo a 24 y 32 px.](assets/Componentes/pictogram-lista.png)

- La **letra** es la única que dice algo del nombre. «Capítulo 3» se escribe `C3`; un número de dos cifras va solo (`12`).

## Tamaños

| Tamaño | Uso |
|---|---|
| 24 px (por defecto) | Filas de lista y tarjetas. |
| 32 px | Encabezados y zonas vacías. |

## En una lista

Pide los dibujos del conjunto completo con `pictogramDrawings()`: así dos nombres de la misma lista no comparten dibujo mientras el tipo tenga dibujos libres. Hay 56 sellos, 30 criaturas y 5 marcos de letra.

## Contenido

- El pictograma sale del nombre: si la cosa cambia de nombre, cambia de dibujo.
- No explica qué es la cosa; la distingue de las que tiene al lado.

## Relacionados

Íconos (fundamento) · `Icon` · `List`.
