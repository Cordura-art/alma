// The carousel of an entity: a ring of cards that turns in perspective, each card a piece of the generator. It is the
// user's Rive script (ejemplos/ensayo-generativo/referencias/tarjetas-carrusel-rive.lua) without Rive: the same ring, with the entity's genes
// instead of inputs. `carrusel()` gives the parameters and `anillo()` where every card is at a moment (no DOM: Node
// tests it); the page moves one element per card with those numbers.

// The ring of an entity, in the units of the original (a stage about 800 wide, the nearest card 260 wide): a card for
// every point of its emblem and a turn at the pace of its type (9 s is ALMA's; a slower entity takes longer).
export function carrusel(G) {
  return { cantidad: Math.max(5, Math.min(16, G.puntas)), periodo: 9 * G.ritmo, radio: 380, balanceo: 18, inclinacion: 14, focal: 900, tarjeta: 260, vista: 16 };
}

// Every card at second `t`, in drawing order (the farthest first, the nearest last). For each: `i` which card, `x` and
// `y` the center from the middle of the ring (y grows downward), `s` the scale of perspective (1 at the front), `giro`
// the lean in radians and `opacidad`.
export function anillo(P, t) {
  const DEG = Math.PI / 180, DOS_PI = Math.PI * 2, n = P.cantidad, omega = DOS_PI / Math.max(0.05, P.periodo), focal = Math.max(1, P.focal);
  const ct = Math.cos(P.vista * DEG), st = Math.sin(P.vista * DEG), out = [];
  for (let i = 0; i < n; i++) {
    const a = DOS_PI * i / n + omega * t;
    // On the ring: 0 deep is the nearest point and twice the radius the farthest. The point of view looks down on it.
    const x3 = P.radio * Math.sin(a), y3 = P.balanceo * Math.sin(a), z3 = P.radio * (1 - Math.cos(a));
    const z = Math.max(y3 * st + z3 * ct, -focal + 1), s = focal / (focal + z);
    out.push({ i, x: x3 * s, y: (y3 * ct - z3 * st) * s, z, s, giro: P.inclinacion * DEG * Math.sin(a), opacidad: Math.min(1, Math.max(0.7, 0.85 + 0.15 * s)) });
  }
  return out.sort((a, b) => b.z - a.z || a.i - b.i);
}
