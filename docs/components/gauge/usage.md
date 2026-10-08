---
component: Gauge
tab: Uso
summary: Un valor dentro de un rango: dónde está, o cuánto hay.
---


## Resumen

`Gauge` muestra un número dentro de un rango conocido: cuántos asientos van ocupados, qué temperatura hace entre la mínima y la máxima. Es el *gauge* de Apple.

## Cuándo usarlo

- Para un valor que solo se entiende junto a sus límites.
- En un `Widget` o un tablero, para leer de un vistazo.

## Cuándo no

- **Para el avance de una tarea:** eso es `ProgressBar`. Un medidor mide algo que es; una barra de avance, algo que está pasando.
- **Para cambiar un valor:** eso es `Slider`.
- **Para comparar varios valores:** eso es un `BarChart`.
- Si el número se entiende solo: escribe el número.

## Dos tipos

![Cuatro medidores. Arriba, lineales: uno de capacidad, «Asientos ocupados, 32 de 44», con la barra llena hasta ahí y sus extremos rotulados; y uno con marca, «Temperatura en Viña, 18 °C», con un punto sobre la barra. Abajo, circulares: «73 %» con el arco lleno, y «18» con un punto sobre el arco.](assets/Componentes/gauge-tipos.png)

| Tipo | `kind` | Responde | Ejemplo |
|---|---|---|---|
| **De capacidad** | `capacity` | ¿Cuánto hay? Se llena hasta el valor. | Asientos ocupados, espacio usado, saldo. |
| **Con marca** | `standard` | ¿Dónde está? Un punto sobre el recorrido. | Temperatura, un puntaje entre dos extremos. |

Los dos existen en **lineal** y **circular**. El circular es para espacios chicos, como un widget.

## Anatomía

1. **Nombre:** qué se mide. Texto secundario.
2. **Valor:** el número, con su unidad. Texto principal, con peso.
3. **Recorrido,** con el relleno o la marca.
4. **Extremos** (opcional): el mínimo y el máximo. Texto secundario.

El nombre va en secundario y el valor en principal: es un dato, y en un dato manda el valor.

## Contenido

- **Siempre dice el número.** El dibujo solo no es el valor.
- **Rotula los extremos** cuando no son 0 y 100.
- **El color de estado** (`status`) va con su palabra: «queda poco». Nunca el color solo.

## Relacionados

`ProgressBar` · `Slider` · `Widget` · `BarChart` · Gráficos de datos · Jerarquía.

## Referencias

- Apple, Human Interface Guidelines: Gauges.
