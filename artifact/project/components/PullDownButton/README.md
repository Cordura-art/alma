# PullDownButton

Botón que abre una lista de **acciones** relacionadas con algo, por ejemplo una tarjeta o un archivo. A diferencia de `PopUpButton`, no guarda una selección.

## Qué aporta quien lo usa
- `label` y/o `icon`. Si solo tiene ícono, `aria-label` es obligatorio.
- `actions`: acciones que empiezan con verbo. Si una abre otra vista o pide datos, termina en «…».
- La acción destructiva lleva `role: 'destructive'` (en rojo) y va al final. Si no se puede deshacer, confirma con `Alert`.

## Teclado
Igual que `PopUpButton`. Se anuncia como `menu`.
