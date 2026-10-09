# ControlCenter

Los controles del entorno que se necesitan en cualquier momento, en un panel.


## Uso

### Resumen

`ControlCenter` reúne los controles del entorno: silenciar los avisos, cambiar el tema, abrir el asistente. Cada control es un botón o un interruptor. Son el *Control Center* y los *controls* de Apple.

### Cuándo usarlo

- En un `Desktop`, abierto desde un extra de la `MenuBar`.

### Cuándo no

- Para los ajustes completos: eso es la app de Ajustes. Aquí va lo de todos los días.
- Para las acciones de una app: van en su ventana y en la barra de menús.

### Un control

1. **Símbolo:** qué es.
2. **Título:** de qué es. «Avisos».
3. **Valor** (opcional): cómo está. «En silencio». Texto secundario.

| Tipo | Qué hace |
|---|---|
| **Interruptor** | Está encendido o apagado. Encendido, su símbolo va sobre el acento. |
| **Botón** | Hace una cosa, o abre una app en un lugar. |

### Reglas

- **Pocos:** de cuatro a ocho.
- **El título dice de qué es; el valor, cómo está.** No «Activar avisos».
- **El estado no depende del color:** va también en el valor.
- **Nada vive solo aquí.** Todo control está también en Ajustes.
- **La persona elige cuáles ver.**

### Relacionados

`MenuBar` · `Desktop` · `Switch` · `Widget` · Entorno.

### Referencias

- Apple, Human Interface Guidelines: Controls.

## Estilo

### Color y estructura

| Elemento | Propiedad | Valor |
|---|---|---|
| Panel | fondo | Vidrio medio |
| Control | fondo | `ui-03`; `hover-ui` bajo el cursor |
| Símbolo | fondo | `ui-01`; `interactive-01` si está encendido |
| Título | texto | 14 px, `text-01` |
| Valor | texto | 12 px, `text-02` |
| Panel | ancho | 20 rem, en dos columnas |
| Control | alto | 56 px |
| Símbolo | tamaño | 40 px, redondo, con ícono de 20 px |
| Controles, y borde del panel | separación | `space-8` |
| Panel / control | radio | 16 px / 8 px: el de afuera menos el margen |

## Código

### Uso

```js
h(ControlCenter, { controls: [
  { id: 'avisos', label: 'Avisos', icon: 'notification', value: avisos ? 'Activados' : 'En silencio', checked: avisos, onChange: setAvisos },
  { id: 'tema', label: 'Tema oscuro', icon: 'asleep', size: 'wide', checked: oscuro, onChange: setOscuro },
  { id: 'ajustes', label: 'Ajustes', icon: 'settings', onPress: abrirAjustes }
] })
```

Un control con `checked` es un interruptor. Sin él, un botón.

### Propiedades de un control

| Campo | Tipo | Uso |
|---|---|---|
| `label`, `icon` | texto | Su título y su símbolo. |
| `value` | texto | Cómo está. |
| `checked`, `onChange` | sí o no, función | Un interruptor. |
| `onPress` | función | Un botón. |
| `size` | `wide` | Ocupa las dos columnas. |
| `disabled` | sí o no | — |

## Accesibilidad

### Qué ofrece ALMA

- **Es un grupo con nombre.**
- **Un interruptor se anuncia como tal**, con su título, su valor y si está encendido.
- **Cada control mide 56 px de alto.**
- **Encendido y apagado se distinguen también por el valor escrito.**

### Teclado

| Tecla | Qué hace |
|---|---|
| Tab | Recorre los controles. |
| Enter, Espacio | Enciende, apaga o activa. |

Pendiente: VoiceOver y NVDA.
