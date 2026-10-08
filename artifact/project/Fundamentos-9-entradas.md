# Entradas

Con qué maneja alguien una pantalla, y qué necesita cada manera.


## Resumen

### Cuatro maneras de entrar

Una persona maneja la misma pantalla de maneras distintas, a veces en el mismo minuto. ALMA no supone ninguna.

| Entrada | Cómo es | Qué necesita |
|---|---|---|
| Puntero fino | Mouse o trackpad. Preciso, y puede pasar por encima sin tocar. | Estados al pasar por encima. Puede usar la densidad compacta. |
| Toque | El dedo. Poco preciso, tapa lo que toca, no pasa por encima. | Controles de 44 px. Nada que dependa de pasar por encima. |
| Teclado | Teclas, o un aparato que hace de teclado. | Orden de foco, foco visible, todo alcanzable. |
| Voz y lectores | Se nombra lo que se quiere, o se escucha lo que hay. | Que cada cosa tenga un nombre, el mismo que se ve. |

Un computador puede tener pantalla táctil y un teléfono puede tener teclado. Por eso no se pregunta qué aparato es, sino qué puede hacer.

### Reglas para todas

1. **Todo se puede hacer con cada una.** Lo que hace el mouse lo hace el teclado, y lo que hace un gesto lo hace un botón.
2. **Nada depende de pasar por encima.** Lo que aparece así aparece también con el foco, y está a un toque.
3. **Se actúa al soltar.** Un control responde cuando el dedo o el botón se levantan, no cuando bajan: hasta ahí se puede salir sin hacer nada.
4. **El tamaño de toque es de 44 px.** Es `size-touch-min`. Si el control se ve más chico, el área que responde es igual de grande.
5. **Separación entre controles.** Al menos `space-8` entre dos áreas de toque, para no tocar la del lado.
6. **La respuesta es inmediata.** Cada entrada tiene su señal: el estado al pasar, al presionar, el foco.

### Estados que da cada entrada

| Estado | Puntero | Toque | Teclado |
|---|---|---|---|
| Al pasar por encima | Sí | No existe | No existe |
| Foco | Solo al hacer clic en un campo | Solo en un campo | Sí, siempre visible |
| Presionado | Sí | Sí | Sí |

Los colores de cada estado están en **Color**; las teclas, en **Accesibilidad › Teclado**.

### Densidad

La densidad compacta (controles de 32 px) solo actúa con puntero fino. Con una pantalla táctil, todo sigue en 44 px. Ver **Espaciado y grilla › Densidad**.

### De dónde viene

La base es el capítulo de entradas de Apple, que trata cada manera por separado, y los criterios de puntero de WCAG 2.2: gestos, cancelación, arrastre y tamaño del objetivo.

## Gestos

### Los gestos

| Gesto | Qué hace en ALMA | Lo mismo, sin el gesto |
|---|---|---|
| Tocar | Activa un control. | Enter o Espacio. |
| Mantener | Toma algo para moverlo; abre un menú de acciones. | Un botón de menú a la vista. |
| Deslizar hacia los lados | Pasa de página; muestra las acciones de una fila. | Flechas o `PageControl`; un menú en la fila. |
| Deslizar hacia abajo | Cierra una `Sheet`. | Su botón de cerrar, o Esc. |
| Arrastrar | Mueve o reordena. | «Subir», «Bajar», «Mover a…». |
| Pellizcar | Amplía una imagen o un mapa. | Botones de más y menos. |

La columna de la derecha no es opcional. Un gesto es un atajo: nadie lo ve, hay que descubrirlo, y no todos pueden hacerlo.

### Reglas

- **Los gestos de siempre hacen lo de siempre.** No uses deslizar o pellizcar para algo distinto de lo que hacen en todo el teléfono.
- **Nada con dos dedos o con un trazo como única manera.** Lo que pide un movimiento complejo tiene una versión de un solo toque.
- **Un gesto se puede cancelar**: volviendo al punto de partida, o soltando fuera.
- **Sin gestos en los bordes de la pantalla**, que son del sistema.
- **Un gesto destructivo se puede deshacer.** Deslizar para archivar ofrece «Deshacer» (ver el patrón **Deshacer**).

### Mostrar que se puede

Un gesto que no se ve no existe. Cuando algo responde a uno:

- Deja una pista visible: un asa para arrastrar, la orilla de la página siguiente, el borde de una `Sheet`.
- La primera vez, un `Tip` puede contarlo. Una sola vez.
- El control que hace lo mismo está siempre a la vista o en un menú.

### Movimiento del aparato

Agitar o inclinar el teléfono no dispara nada en ALMA. Si alguna vez lo hace, tiene que poder apagarse y tener un botón que haga lo mismo.

### Vibración

Una vibración corta puede confirmar algo que el dedo tapa: que una pieza se tomó, que un valor llegó al límite. Nunca es la única señal, y sigue el ajuste del sistema. ALMA todavía no tiene tokens para esto.

## Código

### Qué puede hacer

```css
/* Solo donde se puede pasar por encima */
@media (hover: hover) {
  .fila:hover { background: var(--hover-ui); }
}

/* Donde el puntero es poco preciso: el dedo */
@media (pointer: coarse) {
  .control { min-height: var(--size-touch-min); min-width: var(--size-touch-min); }
}
```

`any-pointer` y `any-hover` preguntan por cualquiera de las entradas del equipo, no solo por la principal: sirven para un computador con pantalla táctil.

### Área de toque más grande que el control

```css
.icono-boton { position: relative; }
.icono-boton::after { content: ""; position: absolute; inset: 50% auto auto 50%; width: var(--size-touch-min); height: var(--size-touch-min); transform: translate(-50%, -50%); }
```

### Actuar al soltar

Usa `click`, que se dispara al soltar y sirve para puntero, toque y teclado. No actúes en `pointerdown` ni en `touchstart`.

```js
boton.addEventListener('click', guardar);
```

### Foco solo con teclado

```css
.control:focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; }
```

### Tokens

| Token | Valor | Para |
|---|---|---|
| `size-touch-min` | 44 px | El área mínima de todo control. |
| `size-control-compact` | 32 px | Controles en densidad compacta, solo con puntero fino. |
| `space-8` | 8 px | La separación mínima entre dos áreas de toque. |
