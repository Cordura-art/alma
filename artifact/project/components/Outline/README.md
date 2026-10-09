# Outline

Cosas dentro de cosas, que se abren y se cierran.


## Uso

### Resumen

`Outline` muestra una jerarquía: carpetas con archivos, categorías con subcategorías. Cada nivel se abre y se cierra. Es la *outline view* de Apple.

### Anatomía

1. **Flecha:** abre y cierra. Solo en lo que tiene algo adentro.
2. **Ícono** (opcional): qué tipo de cosa es.
3. **Nombre.**
4. **Dato al final** (opcional): cuántos hay adentro, en texto secundario.
5. **Sangría:** `space-16` por nivel.

![Anatomía de Outline: un árbol «Mi cuenta». «Viajes» está abierto y muestra «2026», también abierto, con «Marzo» elegido y «Abril» debajo, y «2025» cerrado. Numerados: la flecha que abre y cierra (1), el ícono (2), el nombre (3), el dato al final de la fila (4) y la sangría de cada nivel (5).](assets/Componentes/outline-niveles.png)

### Cuándo usarlo

- Cuando hay niveles, y conviene ver varios a la vez.
- En el panel de la lista de un `SplitView`.

### Cuándo no

- **Con un solo nivel:** `List`.
- **Para las secciones de una app:** `Sidebar`, que admite dos niveles.
- **Con más de cuatro niveles:** cuesta saber dónde se está. Prueba `ColumnView`.

### Reglas

- **La sangría dice el nivel:** `space-16` por cada uno. No la uses para otra cosa.
- **La flecha solo abre y cierra.** Tocar la fila la elige.
- **Lo que tiene adentro lleva flecha; lo que no, no.** El espacio de la flecha se conserva, para que los textos calcen.
- **Nombres cortos.** Uno largo se corta con puntos suspensivos.
- **Un dato al final de la fila** (cuántos hay adentro) va en texto secundario.

### Con el teclado

| Tecla | Qué hace |
|---|---|
| ↑ ↓ | Va a la fila anterior o siguiente que esté a la vista. |
| → | Abre la fila. Si ya está abierta, baja a la primera de adentro. |
| ← | Cierra la fila. Si ya está cerrada, sube a la que la contiene. |
| Enter o Espacio | Elige la fila. |
| Inicio, Fin | Primera y última fila. |

### Relacionados

`List` · `Sidebar` · `ColumnView` · `Accordion` · Jerarquía.

### Referencias

- Apple, Human Interface Guidelines: Outline views.

## Estilo

### Color y estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Texto | color | `text-01` |
| Flecha, ícono | color | `icon-02` |
| Dato al final | color | `text-02` |
| Fila bajo el cursor, o elegida | fondo | `hover-ui`; la elegida, con peso |
| Foco | contorno interior | `focus` |
| Fila | alto | El de un control |
| Sangría por nivel | — | `space-16` |
| Flecha, ícono y texto | separación | `space-8` |
| Fila | radio | `radius-nav` |

## Código

### Uso

```js
h(Outline, {
  label: 'Mi cuenta',
  items: [{ id: 'viajes', label: 'Viajes', icon: 'ticket', children: [{ id: '2026', label: '2026', trailing: 5 }] }],
  defaultExpanded: ['viajes'],
  selected: elegido, onSelect: setElegido
})
```

### Propiedades

| Propiedad | Tipo | Uso |
|---|---|---|
| `items` | `[{ id, label, icon, trailing, children }]` | El árbol. |
| `label` | texto | Su nombre. |
| `expanded`, `defaultExpanded`, `onExpandedChange` | lista de `id` | Lo que está abierto. |
| `selected`, `onSelect` | `id`, función | Lo elegido. Sin `onSelect`, tocar una fila la abre o la cierra. |

## Accesibilidad

### Qué ofrece ALMA

- **Es un árbol:** cada fila dice su nivel, si está abierta y si está elegida.
- **Una sola parada de Tab.**

### Teclado

| Tecla | Qué hace |
|---|---|
| ↓ ↑ | Fila siguiente o anterior, entre las visibles. |
| → | Abre; si ya está abierta, entra a la primera de adentro. |
| ← | Cierra; si ya está cerrada, sube a la que la contiene. |
| Inicio, Fin | Primera o última fila. |
| Enter, Espacio | Elige. |

Pendiente: VoiceOver y NVDA.
