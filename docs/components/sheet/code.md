---
component: Sheet
tab: Código
summary: Cómo usar Sheet en React.
---


## Uso

```js
const { Sheet, List } = window.AlmaDS;
h(Sheet, { open, onClose: () => setOpen(false), title: 'Compartir viaje' },
  h(List, { 'aria-label': 'Formas de compartir', items: [
    { icon: 'link', title: 'Copiar enlace', onClick: copy },
    { icon: 'email', title: 'Enviar por correo', onClick: mail }] }))
```

## Propiedades

Las mismas de `Modal` (`open`, `onClose`, `title`, `eyebrow`, `description`, `children`, `primaryAction`, `secondaryAction`, `dismissible`, `closeOnOverlay`, `initialFocus`). `Sheet` equivale a `Modal` con `variant: 'sheet'`.

```js
h(Modal, { variant: 'sheet', open, onClose, title: 'Compartir viaje' }, …)
```

## Área segura

En el teléfono, la hoja suma `env(safe-area-inset-bottom)` a su relleno inferior. Para que funcione, la página debe declarar `viewport-fit=cover` en su etiqueta `viewport`.
