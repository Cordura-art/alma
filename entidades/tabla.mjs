// The Human Design mandala: the order of the 64 gates on the zodiac, the nine centers and the 36 channels.
// Used by entidades/carta.mjs to turn planetary longitudes into a chart.

// Gates in zodiac order, starting with gate 41 at 302° of tropical longitude (2° Aquarius). Each gate spans 5.625°.
export const RUEDA = [41, 19, 13, 49, 30, 55, 37, 63, 22, 36, 25, 17, 21, 51, 42, 3, 27, 24, 2, 23, 8, 20, 16, 35, 45, 12, 15, 52, 39, 53, 62, 56,
  31, 33, 7, 4, 29, 59, 40, 64, 47, 6, 46, 18, 48, 57, 32, 50, 28, 44, 1, 43, 14, 34, 9, 5, 26, 11, 10, 58, 38, 54, 61, 60];
export const INICIO = 302;
export const PUERTA = 360 / 64; // 5.625°
export const LINEA = PUERTA / 6; // 0.9375°

// The nine centers, with the ids the entities tool uses. Motors can power the Throat.
export const CENTROS = [
  { id: 'cabeza', nombre: 'Cabeza', puertas: [64, 61, 63] },
  { id: 'ajna', nombre: 'Ajna', puertas: [47, 24, 4, 17, 43, 11] },
  { id: 'garganta', nombre: 'Garganta', puertas: [62, 23, 56, 35, 12, 45, 33, 8, 31, 20, 16] },
  { id: 'g', nombre: 'G', puertas: [7, 1, 13, 10, 25, 46, 2, 15] },
  { id: 'corazon', nombre: 'Corazón', puertas: [21, 40, 26, 51], motor: true },
  { id: 'bazo', nombre: 'Bazo', puertas: [48, 57, 44, 50, 32, 28, 18] },
  { id: 'sacro', nombre: 'Sacro', puertas: [5, 14, 29, 59, 9, 3, 42, 27, 34], motor: true },
  { id: 'plexo', nombre: 'Plexo solar', puertas: [36, 22, 37, 6, 49, 55, 30], motor: true },
  { id: 'raiz', nombre: 'Raíz', puertas: [53, 60, 52, 19, 39, 41, 58, 38, 54], motor: true }
];

// The 36 channels, each joining two gates.
export const CANALES = [[1, 8], [2, 14], [3, 60], [4, 63], [5, 15], [6, 59], [7, 31], [9, 52], [10, 20], [10, 34], [10, 57], [11, 56],
  [12, 22], [13, 33], [16, 48], [17, 62], [18, 58], [19, 49], [20, 34], [20, 57], [21, 45], [23, 43], [24, 61], [25, 51], [26, 44],
  [27, 50], [28, 38], [29, 46], [30, 41], [32, 54], [34, 57], [35, 36], [37, 40], [39, 55], [42, 53], [47, 64]];

export const CENTRO_DE = Object.fromEntries(CENTROS.flatMap((c) => c.puertas.map((p) => [p, c.id])));

// The thirteen bodies of each side of the chart, in the order HD charts list them.
export const CUERPOS = ['Sol', 'Tierra', 'Luna', 'Nodo norte', 'Nodo sur', 'Mercurio', 'Venus', 'Marte', 'Júpiter', 'Saturno', 'Urano', 'Neptuno', 'Plutón'];
