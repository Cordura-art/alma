# Tip

Un consejo breve que enseña una función y se puede descartar.


## Uso

### Resumen

`Tip` enseña una función nueva o menos visible, en el lugar donde se usa, y se cierra cuando la persona ya no lo necesita. Es el *tip* de Apple (TipKit).

#### Cuándo usarlo
- Funciones simples, de no más de tres pasos.
- A quien le sirve: quien ya usa la función no lo necesita.

#### Cuándo no usarlo
- **Para promocionar algo:** nunca.
- **Para decir qué hace un control:** `Tooltip`.
- **Para un resultado o un estado:** `InlineNotification`.

### Anatomía

1. **Ícono** (opcional), relleno, del color `control-on`.
2. **Título** orientado a la acción.
3. **Mensaje:** una o dos oraciones.
4. **Acción** (opcional): lleva directo al ajuste o al flujo.
5. **Cerrar.**

> **Imagen pendiente:** un consejo sobre la recarga automática, junto a la billetera.

### Contenido

- **Título:** «Recarga tu billetera sola».
- **Mensaje:** «Activa la recarga automática y nunca te quedarás sin saldo para viajar.»
- **Acción:** «Activar».

### Comportamiento

- Uno a la vez, con frecuencia moderada (por ejemplo, uno cada 24 horas).
- Al cerrarlo no vuelve a aparecer: guarda que se descartó.
- Va dentro del flujo, junto a lo que explica.

### Relacionados

`Tooltip` · `InlineNotification` · `Popover`.

### Referencias

- Apple, Human Interface Guidelines: Offering help (tips).

## Estilo

### Color

| Elemento | Propiedad | Token |
|---|---|---|
| Consejo | fondo / borde (1 px) | `tip-bg` / `tip-border` |
| Ícono | relleno | `tip-icon` (`control-on`) |
| Título | color del texto | `text-01` |
| Mensaje | color del texto | `text-02` |
| Acción y Cerrar | estilo | `Button` plain |

### Tipografía

| Elemento | Tamaño de letra (px / rem) | Peso | Interlineado |
|---|---|---|---|
| Título | 14 / 0,875 | Medium / 500 | 1,4 |
| Mensaje | 14 / 0,875 | Regular / 400 | 1,72 |

### Estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Consejo | ancho máximo | 420 px (26,25 rem) |
| Consejo | relleno | 16 px; 8 px a la derecha, junto a Cerrar |
| Consejo | radio | `radius-panel` |
| Ícono y texto | separación | 16 px |
| Título y mensaje | separación | 4 px |

> **Imagen pendiente:** anatomía acotada.

### Contraste

Textos a 4,5:1 sobre `tip-bg`; ícono a 3:1, en los cuatro temas.

## Código

### Uso

```js
const { Tip } = window.AlmaDS;
h(Tip, { icon: 'renew', title: 'Recarga tu billetera sola',
  message: 'Activa la recarga automática y nunca te quedarás sin saldo para viajar.',
  actionLabel: 'Activar', onAction: openAutoReload, onDismiss: rememberDismissed })
```

### Propiedades

| Propiedad | Tipo | Por defecto | Uso |
|---|---|---|---|
| `title` | `string` | — | Orientado a la acción. |
| `message` | `string` | — | Una o dos oraciones. |
| `icon` | `string` | — | Se dibuja relleno. |
| `actionLabel` / `onAction` | `string` / `() => void` | — | Acción opcional. |
| `onDismiss` | `() => void` | — | Al cerrar: guarda que se descartó. |

El consejo se oculta solo al cerrarlo; decidir si vuelve a mostrarse le toca a tu código.

## Accesibilidad

### Qué ofrece ALMA

- Es un `aside` nombrado por su título: el lector lo presenta como contenido complementario.
- Cerrar se llama «Cerrar consejo».
- El ícono se dibuja relleno y es decorativo.

#### Interacciones de teclado

| Tecla | Acción |
|---|---|
| Tab | Llega a la acción y a Cerrar. |
| Enter o Espacio | Activa el botón con foco. |

### Consideraciones de desarrollo

- Al cerrarlo, lleva el foco a un lugar lógico: el control del que hablaba, o el siguiente.

### Verificación

axe sin problemas en los cuatro temas. Pendiente: VoiceOver y NVDA.
