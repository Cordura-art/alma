# Diseño adaptable

Cómo cambia una pantalla según el espacio que tiene.


## Resumen

### El espacio, no el aparato

Una pantalla se adapta al ancho que tiene disponible, no al nombre del dispositivo. Una ventana angosta en un computador se comporta como un teléfono; una tableta de lado, como un escritorio.

ALMA se diseña primero para el ancho más angosto y crece desde ahí.

### Tres anchos

Los cinco puntos de quiebre de la grilla se leen como tres maneras de armar una pantalla:

| Ancho | Desde | Columnas | Cómo se arma |
|---|---|---|---|
| Angosto | `bp-sm`, 320 px | 4 | Un panel. Navegación abajo, con `TabBar`. |
| Medio | `bp-md`, 672 px | 8 | Uno o dos paneles. Lo que flota se centra. |
| Amplio | `bp-lg`, 1056 px | 16 | Dos o tres paneles. Navegación al costado, con `Sidebar`. |

Desde `bp-max` (1584 px) el contenido deja de crecer y queda centrado: una línea de texto más larga no se lee mejor.

> **Imagen pendiente:** la misma pantalla de viajes en los tres anchos: un panel con `TabBar`; lista y detalle lado a lado; y `Sidebar`, lista y detalle.

### Qué cambia

| Pieza | Angosto | Medio | Amplio |
|---|---|---|---|
| Navegación principal | `TabBar` | `TabBar` | `Sidebar` |
| Lista y detalle | Una a la vez | Lado a lado | Lado a lado |
| Lo que flota | `Sheet` desde abajo | `Sheet` centrada o `Modal` | `Modal` |
| Tabla | Lista, con lo esencial por fila | `Table` con menos columnas | `Table` completa |
| Acciones de una vista | Una a la vista, el resto en un menú | Las principales a la vista | Todas a la vista |
| Formulario | Una columna | Una columna | Una o dos columnas |

### Lo que no cambia

- **Lo que se puede hacer.** Ninguna función desaparece en un ancho angosto: cambia de lugar o pasa a un menú.
- **El orden.** Lo más importante va primero en todos los anchos.
- **El tamaño de toque.** Los controles miden `size-touch-min` siempre que haya una pantalla táctil.
- **El texto de lectura.** Un máximo de 48 rem de ancho, aunque sobre espacio.

### De dónde viene

La grilla es el IBM 2x Grid, con la grilla propia de ALMA en el teléfono. La idea de pensar en clases de ancho y en paneles viene de Material; la de armar por el espacio disponible y no por el aparato, de Apple.

## Comportamientos

### Cuatro maneras

| Manera | Qué hace | Ejemplo |
|---|---|---|
| Fluir | El contenido ocupa el ancho que hay y se corta en más líneas. | Un párrafo, una fila de etiquetas. |
| Reacomodar | Lo que iba lado a lado pasa a ir uno sobre otro. | Dos columnas de un formulario que pasan a una. |
| Revelar | Con más espacio aparece un panel que antes estaba a un toque. | El detalle junto a la lista. |
| Cambiar | Una pieza se reemplaza por otra que hace lo mismo. | `TabBar` por `Sidebar`; `Table` por lista. |

Prefiere las primeras. Cambiar una pieza por otra es lo más caro: hay que diseñar, construir y probar dos.

### Reglas

- **Los cambios pasan en los puntos de quiebre**, no en anchos sueltos. Así todas las piezas cambian juntas.
- **Entre dos puntos de quiebre, todo fluye.** Nada queda con un ancho fijo que no entra.
- **Una pieza se adapta a su contenedor**, no a la ventana: una tarjeta en una columna angosta es angosta aunque la pantalla sea grande.
- **Las imágenes no se deforman**: se recortan o se achican, guardando su proporción.
- **Lo fijo deja ver el contenido.** Una barra arriba y otra abajo no pueden tapar más de un tercio de una pantalla baja.

### Al girar y al cambiar de tamaño

- Nada se pierde: lo escrito, la posición en una lista y lo seleccionado siguen ahí.
- El foco sigue en el mismo elemento.
- Si un panel deja de caber, lo que tenía pasa a estar a un toque, no se cierra.

### Ampliar

Una persona puede ampliar la página al 200 %, o el texto solo, y todo sigue funcionando:

- Al 400 % de ampliación, la página se comporta como en el ancho angosto: una columna, sin desplazarse hacia los lados.
- Los tamaños de texto van en `rem`, para seguir el ajuste de quien lee.
- Los contenedores crecen con su texto. Nada tiene un alto fijo que lo corte.

### Bordes de la pantalla

En un teléfono, lo que está fijo arriba o abajo deja libre la zona que ocupan el sistema y las esquinas: el contenido corre de borde a borde, y los controles quedan dentro del área segura.

### No hagas

- Esconder una función en el teléfono porque «ahí no se usa».
- Una versión aparte para teléfono con otro contenido.
- Texto que se achica para que entre.
- Un desplazamiento hacia los lados en toda la página. Solo una tabla o un gráfico ancho, dentro de su propio marco.

## Código

### Desde lo angosto

Los estilos base son los del ancho angosto. Cada punto de quiebre agrega lo que cambia desde ahí hacia arriba.

```css
.vista { display: grid; gap: var(--space-16); }

@media (min-width: 672px) {   /* bp-md */
  .vista { grid-template-columns: 1fr 1fr; }
}
@media (min-width: 1056px) {  /* bp-lg */
  .vista { grid-template-columns: 16rem 1fr 1fr; }
}
```

Una consulta de medios no puede leer una variable de CSS: escribe el valor del token y deja su nombre al lado.

### Según el contenedor

Cuando una pieza vive en lugares de distinto ancho, pregúntale a su contenedor:

```css
.panel { container-type: inline-size; }

@container (min-width: 480px) {
  .tarjeta { grid-template-columns: 8rem 1fr; }
}
```

### Sin puntos de quiebre

Mucho se adapta solo, sin ninguna consulta:

```css
.grupo { display: grid; gap: var(--space-24); grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr)); }
.fila  { display: flex; flex-wrap: wrap; gap: var(--space-8); }
.texto { max-width: 48rem; }
```

### Área segura

```css
.barra-inferior { padding-bottom: calc(var(--space-8) + env(safe-area-inset-bottom, 0px)); }
```

### Tokens

| Token | Valor |
|---|---|
| `bp-sm` | 320 px |
| `bp-md` | 672 px |
| `bp-lg` | 1056 px |
| `bp-xlg` | 1312 px |
| `bp-max` | 1584 px |

La grilla de cada uno está en **Espaciado y grilla › Grilla**.
