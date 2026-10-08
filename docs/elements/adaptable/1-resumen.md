---
element: Diseño adaptable
order: 8
tab: Resumen
summary: Cómo cambia una pantalla según el espacio que tiene.
---

## El espacio, no el aparato

Una pantalla se adapta al ancho que tiene disponible, no al nombre del dispositivo. Una ventana angosta en un computador se comporta como un teléfono; una tableta de lado, como un escritorio.

ALMA se diseña primero para el ancho más angosto y crece desde ahí.

## Tres anchos

Los cinco puntos de quiebre de la grilla se leen como tres maneras de armar una pantalla:

| Ancho | Desde | Columnas | Cómo se arma |
|---|---|---|---|
| Angosto | `bp-sm`, 320 px | 4 | Un panel. Navegación abajo, con `TabBar`. |
| Medio | `bp-md`, 672 px | 8 | Uno o dos paneles. Lo que flota se centra. |
| Amplio | `bp-lg`, 1056 px | 16 | Dos o tres paneles. Navegación al costado, con `Sidebar`. |

Desde `bp-max` (1584 px) el contenido deja de crecer y queda centrado: una línea de texto más larga no se lee mejor.

![La misma pantalla de viajes en los tres anchos. Angosto: un panel con la lista y TabBar abajo. Medio: la lista y el detalle lado a lado, con TabBar abajo. Amplio: Sidebar a la izquierda, y la lista y el detalle lado a lado.](assets/Fundamentos/adaptable-anchos.png)

## Qué cambia

| Pieza | Angosto | Medio | Amplio |
|---|---|---|---|
| Navegación principal | `TabBar` | `TabBar` | `Sidebar` |
| Lista y detalle | Una a la vez | Lado a lado | Lado a lado |
| Lo que flota | `Sheet` desde abajo | `Sheet` centrada o `Modal` | `Modal` |
| Tabla | Lista, con lo esencial por fila | `Table` con menos columnas | `Table` completa |
| Acciones de una vista | Una a la vista, el resto en un menú | Las principales a la vista | Todas a la vista |
| Formulario | Una columna | Una columna | Una o dos columnas |

## Lo que no cambia

- **Lo que se puede hacer.** Ninguna función desaparece en un ancho angosto: cambia de lugar o pasa a un menú.
- **El orden.** Lo más importante va primero en todos los anchos.
- **El tamaño de toque.** Los controles miden `size-touch-min` siempre que haya una pantalla táctil.
- **El texto de lectura.** Un máximo de 48 rem de ancho, aunque sobre espacio.

## De dónde viene

La grilla es el IBM 2x Grid, con la grilla propia de ALMA en el teléfono. La idea de pensar en clases de ancho y en paneles viene de Material; la de armar por el espacio disponible y no por el aparato, de Apple.
