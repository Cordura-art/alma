# Gauge

Un valor dentro de un rango: dónde está, o cuánto hay.


## Uso

### Resumen

`Gauge` muestra un número dentro de un rango conocido: cuántos asientos van ocupados, qué temperatura hace entre la mínima y la máxima. Es el *gauge* de Apple.

### Cuándo usarlo

- Para un valor que solo se entiende junto a sus límites.
- En un `Widget` o un tablero, para leer de un vistazo.

### Cuándo no

- **Para el avance de una tarea:** eso es `ProgressBar`. Un medidor mide algo que es; una barra de avance, algo que está pasando.
- **Para cambiar un valor:** eso es `Slider`.
- **Para comparar varios valores:** eso es un `BarChart`.
- Si el número se entiende solo: escribe el número.

### Dos tipos

![Cuatro medidores. Arriba, lineales: uno de capacidad, «Asientos ocupados, 32 de 44», con la barra llena hasta ahí y sus extremos rotulados; y uno con marca, «Temperatura en Viña, 18 °C», con un punto sobre la barra. Abajo, circulares: «73 %» con el arco lleno, y «18» con un punto sobre el arco.](assets/Componentes/gauge-tipos.png)

| Tipo | `kind` | Responde | Ejemplo |
|---|---|---|---|
| **De capacidad** | `capacity` | ¿Cuánto hay? Se llena hasta el valor. | Asientos ocupados, espacio usado, saldo. |
| **Con marca** | `standard` | ¿Dónde está? Un punto sobre el recorrido. | Temperatura, un puntaje entre dos extremos. |

Los dos existen en **lineal** y **circular**. El circular es para espacios chicos, como un widget.

### Anatomía

1. **Nombre:** qué se mide. Texto secundario.
2. **Valor:** el número, con su unidad. Texto principal, con peso.
3. **Recorrido,** con el relleno o la marca.
4. **Extremos** (opcional): el mínimo y el máximo. Texto secundario.

El nombre va en secundario y el valor en principal: es un dato, y en un dato manda el valor.

### Contenido

- **Siempre dice el número.** El dibujo solo no es el valor.
- **Rotula los extremos** cuando no son 0 y 100.
- **El color de estado** (`status`) va con su palabra: «queda poco». Nunca el color solo.

### Relacionados

`ProgressBar` · `Slider` · `Widget` · `BarChart` · Gráficos de datos · Jerarquía.

### Referencias

- Apple, Human Interface Guidelines: Gauges.

## Estilo

### Color

| Elemento | Propiedad | Token |
|---|---|---|
| Nombre, extremos | color del texto | `text-02` |
| Valor | color del texto | `text-01` |
| Recorrido | fondo | `border-control` |
| Relleno y marca | color | `interactive-01` |
| Con estado | color | `status-icon-warning`, `status-icon-error` o `status-icon-success` |
| Marca | contorno | `ui-01`, de 2 px, para separarla del recorrido |

### Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso |
|---|---|---|
| Nombre | 14 / 0,875 | `font-weight-body` |
| Valor, lineal | 14 / 0,875, cifras del mismo ancho | `font-weight-emphasis` |
| Valor, circular | 18 / 1,125 | `font-weight-heading` |
| Extremos | 12 / 0,75 | `font-weight-body` |
| Nombre, circular | 11 / 0,6875 | `font-weight-body` |

### Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Recorrido lineal | alto | 8 px |
| Recorrido | radio | `radius-pill` |
| Marca | tamaño | 16 px |
| Nombre, recorrido y extremos | separación | `space-8` |
| Lineal | ancho mínimo | 10 rem |
| Circular | tamaño | 96 px (`size`); el arco cubre tres cuartos |
| Arco | grosor | 8 px |

## Código

### Uso

```js
const { Gauge } = window.AlmaDS;

h(Gauge, { label: 'Asientos ocupados', value: 32, max: 44, valueLabel: '32 de 44', minLabel: '0', maxLabel: '44' })

h(Gauge, { label: 'Temperatura en Viña', kind: 'standard', value: 18, min: 5, max: 30, unit: '°C', minLabel: '5 °C', maxLabel: '30 °C' })

h(Gauge, { variant: 'circular', label: 'Ocupación', value: 73, valueLabel: '73 %' })
```

### Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `label` | texto | — | Qué se mide. Obligatorio. |
| `value` | número | — | El valor. |
| `min`, `max` | número | 0, 100 | Los límites. |
| `kind` | `capacity`, `standard` | `capacity` | Relleno, o marca. |
| `variant` | `linear`, `circular` | `linear` | La forma. |
| `unit` | texto | — | La unidad, tras el número. |
| `valueLabel` | texto | El número con formato de Chile | Cómo se escribe el valor. |
| `minLabel`, `maxLabel` | texto | — | Los extremos, en el lineal. |
| `status` | `warning`, `error`, `success` | — | El color de estado. |
| `statusText` | texto | — | La palabra del estado, para un lector de pantalla. Ponla también a la vista. |
| `size` | número | 96 | El lado del circular, en px. |
| `format` | función | Formato de Chile | Cómo se escribe un número. |

## Accesibilidad

### Qué ofrece ALMA

- **Es un medidor** (`role="meter"`) con nombre, valor, mínimo y máximo.
- **El valor se lee como texto:** «32 de 44», no «72 %».
- **El número está siempre a la vista:** nada depende de calcular el largo de una barra.
- **El relleno contrasta 3:1** con su recorrido.
- **El estado va con su palabra**, además del color.

### Teclado

No recibe el foco: informa, no se opera.

### Recomendaciones de diseño

- Rotula los extremos si no son evidentes: sin ellos, «18» no dice si es mucho o poco.
- Si el valor cambia solo, no lo anuncies cada vez. Anuncia cuando cruza algo que importa.
- No uses rojo y verde como única diferencia entre dos medidores.

### Consideraciones de desarrollo

- Pasa `valueLabel` con la unidad dicha en palabras si la abreviatura no se lee bien.
- Con `status`, pasa siempre `statusText` y muéstralo también junto al medidor.

Pendiente: VoiceOver y NVDA.
