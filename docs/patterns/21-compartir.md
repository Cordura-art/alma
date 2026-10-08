---
pattern: Compartir
summary: Dar a otra persona acceso a algo, saber quién lo tiene y poder quitarlo.
---

## Cuándo

Cuando algo de una persona puede verlo o editarlo otra: un viaje, un documento, una billetera, un tablero.

Lo que alguien crea es privado hasta que decide lo contrario.

## Dos maneras

| Manera | Qué es | Para |
|---|---|---|
| Invitar a personas | Se nombra a quién y con qué permiso. | Trabajo con gente conocida; lo que es delicado. |
| Compartir un enlace | Quien tenga el enlace entra, con el permiso que el enlace da. | Mostrar algo rápido, a varios o a quien no tiene cuenta. |

Ofrece las dos solo si las dos hacen falta. La invitación es la más segura; el enlace, la más cómoda.

## Anatomía

En un `Modal`, o en una `Sheet` en el teléfono:

1. **Título:** qué se comparte. «Compartir Viaje a Talca».
2. **Invitar:** un campo para escribir a quién, su permiso y «Invitar».
3. **Quién tiene acceso:** la lista de personas, cada una con su permiso. Quien comparte aparece primero, como dueño.
4. **Enlace:** si está activo, quién puede entrar con él y un botón «Copiar enlace».

> **Imagen pendiente:** el diálogo de compartir en escritorio, con el campo de invitar, tres personas con sus permisos y la sección de enlace con «Copiar enlace».

## Permisos

Pocos y con nombres claros, de menos a más:

| Permiso | Qué puede hacer |
|---|---|
| Ver | Mirar, y nada más. |
| Comentar | Mirar y dejar comentarios. |
| Editar | Cambiar el contenido. |
| Administrar | Editar, y además invitar o quitar a otros. |

El permiso por defecto al invitar es el más bajo que sirva: «Ver».

## Reglas

- **Decir qué va a ver la otra persona** antes de compartir, sobre todo si hay datos personales.
- **Confirmar con un aviso**, no con un diálogo: «Enlace copiado», «Invitación enviada a Ana».
- **Quitar el acceso es tan fácil como darlo**: desde la misma lista, y se puede deshacer.
- **Un enlace se puede apagar**, y apagarlo deja sin acceso a quien lo tenía.
- **El estado se ve desde fuera**: lo compartido lleva una señal (un `Tag` «Compartido», las personas con acceso).
- **Copiar siempre funciona.** No dependas de que se abra el correo u otra aplicación: muestra el enlace y deja copiarlo.

## Accesibilidad

- El campo de invitar tiene etiqueta, y sus sugerencias se recorren con las flechas.
- Cada persona de la lista se lee con su nombre y su permiso.
- «Enlace copiado» se anuncia.
- Al cerrar, el foco vuelve al botón «Compartir».

## No hagas

- Compartir por defecto, o con el permiso más alto.
- Un enlace público sin decir que cualquiera con él puede entrar.
- Esconder quién tiene acceso.
- Enviar la invitación sin mostrar a quién ni con qué permiso.

## Relacionados

`Modal` · `Sheet` · `Combobox` · `PopUpButton` · `Tag` · `ToastRegion` · Diálogos · Deshacer.
