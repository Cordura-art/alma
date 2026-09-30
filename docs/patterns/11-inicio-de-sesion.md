---
pattern: Inicio de sesión
summary: Cómo pedir las credenciales sin trabas y con los errores claros.
---

## Cuándo

Para entrar a una cuenta, y en cualquier pantalla que pida la contraseña de nuevo.

## Estructura

1. Título: «Ingresa a tu cuenta».
2. Correo: `TextInput` con `type: 'email'` y `autoComplete: 'username'`.
3. Contraseña: `TextInput` con `type: 'password'` y `autoComplete: 'current-password'`. Trae el ojo para mostrarla.
4. Enlace «¿Olvidaste tu contraseña?», bajo la contraseña.
5. Botón `filled`, `type: 'submit'`: «Ingresar».
6. Debajo, un enlace para crear una cuenta.

![La pantalla de ingreso en el teléfono, en tema oscuro: título «Ingresa a tu cuenta», campos de correo y contraseña con su ojo, el enlace «¿Olvidaste tu contraseña?», el botón «Ingresar» y, abajo, el enlace para crear una cuenta.](assets/Patrones/inicio-de-sesion.png)

## Reglas

- **Deja pegar y deja usar el gestor de contraseñas.** No bloquees el pegado ni desactives el autocompletado (WCAG 3.3.8, autenticación accesible).
- **Sin pruebas de memoria ni acertijos** para entrar. Si hace falta verificar a una persona, ofrece un método que no exija recordar ni transcribir.
- **Al crear una cuenta**, usa `autoComplete: 'new-password'` y di la regla antes: «Mínimo 8 caracteres».
- **Mientras ingresa**, el botón muestra `loading` con `loadingLabel: 'Ingresando'`.
- **Enter en cualquier campo** envía.

## Errores

| Caso | Qué mostrar |
|---|---|
| Falta un dato | El error en el campo: «Escribe tu correo». |
| Correo o contraseña no coinciden | Una `InlineNotification` de error sobre el formulario: «El correo o la contraseña no coinciden». No digas cuál de los dos, por seguridad. |
| Demasiados intentos | La notificación dice cuánto esperar o cómo recuperar la cuenta. |
| Sin conexión | «No se pudo conectar. Revisa tu conexión y vuelve a intentarlo.» |

Al fallar, deja escrito el correo y lleva el foco a la notificación o al primer campo con error.

## Cerrar sesión

En el menú de cuenta. No pidas confirmación salvo que se pierdan datos sin guardar.

## Relacionados

`TextInput` · `Button` · `InlineNotification` · `Link` · Formularios.
