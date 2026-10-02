---
component: Pictogram
tab: Uso
summary: Un dibujo de línea pequeño que distingue una cosa de sus vecinas.
---


## Resumen

`Pictogram` dibuja un pictograma: un dibujo de línea que le pertenece a una cosa (un capítulo, un proyecto, una etiqueta). El nombre de la cosa elige el dibujo, y el mismo nombre da siempre el mismo. No explica qué es la cosa; la distingue de las que tiene al lado, como una huella. La regla completa está en el fundamento **Íconos**.

### Cuándo usarlo
- En listas y tarjetas donde varias cosas del mismo tipo se parecen y la persona vuelve a buscarlas.
- Siempre junto al nombre de la cosa.

### Cuándo no usarlo
- **En botones, menús, campos o avisos:** ahí va `Icon`.
- **Para decir un estado:** dilo con la palabra y, si hace falta, con `Icon`.
- **Solo, sin nombre.**
- **En más de una lista por pantalla:** si todo lleva dibujo, nada se distingue.

## Tamaños

| Tamaño | Uso |
|---|---|
| 24 px (por defecto) | Filas de lista y tarjetas. |
| 32 px | Encabezados y zonas vacías. |

A 16 y 20 px los dibujos pierden detalle: no los uses.

![Seis borradores de un libro, cada uno con su pictograma a 24 px junto a su nombre, y el pictograma de «Capítulo 3» a 24 y 32 px.](assets/Componentes/pictogram-lista.png)

## En una lista

Pide los dibujos del conjunto completo con `pictogramDrawings()`: así dos nombres de la misma lista no comparten dibujo. Sueltos, cerca de uno de cada veinte nombres coincide con otro.

## Contenido

- El pictograma sale del nombre: si la cosa cambia de nombre, cambia de dibujo.
- Hay 30 dibujos, cada uno con hasta ocho composiciones. Vienen de un estudio de íconos para banca: aparecen gráficos, escudos y balanzas, pero aquí no significan eso.

## Relacionados

Íconos (fundamento) · `Icon` · `List`.
