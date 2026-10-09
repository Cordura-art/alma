---
element: Color
order: 1
tab: Matriz
summary: Cada token es un casillero: una familia y un paso.
---

## La idea

Un token de color no guarda un color elegido a mano: ocupa un **casillero**, que es una familia y un paso. `interactive-01` es «Primary 500», `link-01` es «Tertiary 500», `text-02` es «Secondary 800». Si cambian las rampas, todo se recolorea solo y sigue combinando.

La tabla completa está en `tokens/matriz.json`. Gobierna los temas claro y oscuro de ALMA y de todas las entidades.

## Las tres familias

| Familia | Qué es | Qué cuelga de ella |
|---|---|---|
| **Primary** | La marca. | Solo el botón principal y sus estados. |
| **Tertiary** | La acción. | Enlaces, foco, lo elegido, controles encendidos, el texto de los botones tenue y plano. |
| **Secondary** | El neutro. | Fondos, textos, bordes, lo desactivado. |

- **La marca aparece como relleno en un solo lugar.** Por eso se reconoce.
- **La acción es siempre un azul de enlace.** En una marca que ya es ese azul (ALMA, Autómata, ORCA), Tertiary y Primary son la misma rampa. En una marca de otro color (Cordura, Ensayo), el color de la marca queda en el botón principal y los enlaces siguen azules.
- **El neutro lleva un rastro del tono de la acción,** un 5 %. Los textos y los enlaces se sienten de una misma familia.

Las etiquetas, los estados y las notificaciones toman su casillero de la rampa de su color: una etiqueta lleva el fondo en el 200 y el texto en el 700; un estado va en el 500 en claro y en el 400 en oscuro.

## La luz ordena las capas

Más luz es más cerca y más importante, en los dos temas.

| Capa | Claro | Oscuro |
|---|---|---|
| Página (`ui-02`) | Secondary 50 | Negro |
| Contenedor (`ui-01`) | Blanco | Secondary 1000 |
| Panel dentro (`ui-03`) | Secondary 100 | Secondary 950 |

Un contenedor más claro que su fondo se despega solo, sin borde. En claro la regla tiene un techo, el blanco: lo que va dentro de un contenedor blanco se distingue con el tinte de la acción, no con más luz.

## Lo que responde

- **En claro, lo que responde se tiñe de acción:** una fila con el cursor, una fila elegida y un campo van en los pasos más claros de Tertiary.
- **En oscuro son neutras.** Un azul saturado sobre negro pesa lo mismo que un botón; el color se reserva para lo que se presiona, se escribe o se marca.

## Cómo se cambia

1. Edita un casillero en `tokens/matriz.json`.
2. Corre `npm run matriz:aplicar` y después `npm run build`.
3. Corre `npm test`: comprueba que cada par de texto y fondo alcance su contraste, en ALMA y en todas las entidades.

`npm run matriz` arma una página con la matriz completa, sistema por sistema.

## Alto contraste

Los dos temas de alto contraste tienen sus propios casilleros. Parten de la misma matriz y empujan cada cosa hacia el extremo de su rampa:

| Qué | Claro | Claro, alto contraste | Oscuro | Oscuro, alto contraste |
|---|---|---|---|---|
| Texto principal | Secondary 900 | Negro | Secondary 50 | Secondary 50 |
| Texto secundario | Secondary 800 | Secondary 950 | Secondary 300 | Secondary 200 |
| Botón principal | Primary 500 | Primary 900 | Primary 500 | Primary 200 |
| Enlace | Tertiary 500 | Tertiary 900 | Tertiary 400 | Tertiary 50 |
| Borde de un control | Secondary 600 | Secondary 800 | Secondary 600 | Secondary 400 |

- **El texto tiene que alcanzar 7 a 1,** no 4,5.
- **La marca se mueve por su propia rampa:** en claro baja al paso más oscuro y en oscuro sube a uno claro, para leerse contra la página. El texto del botón es blanco o negro, el que se lea.
- **Las capas siguen la misma regla de la luz:** página teñida y contenedor blanco en claro; página negra y capas que suben en oscuro.

## Lo que la matriz no cubre

- Los colores de los gráficos.
