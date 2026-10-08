// The rule of an entity's planet: how high the ground is in every direction from its middle. It is the same rule
// blender/planeta.py draws (continents, mountains folded into ridges as much as the entity is angular, a sea), written
// here so that a planet can be asked about one place at a time and built only where someone is looking.
// The noise is ALMA's own (a gradient noise, summed in octaves): Blender's is another, so the two planets of an entity
// are the same kind of world, in the same colors, and not the same map.
using UnityEngine;

namespace Alma
{
    public static class Ruido
    {
        static uint Mezcla(int x, int y, int z, uint s)
        {
            uint h = (uint)x * 374761393u + (uint)y * 668265263u + (uint)z * 2246822519u + s * 3266489917u;
            h = (h ^ (h >> 15)) * 2246822519u; h = (h ^ (h >> 13)) * 3266489917u; return h ^ (h >> 16);
        }
        static double Pendiente(uint h, double x, double y, double z)
        {
            switch (h % 12)
            {
                case 0: return x + y; case 1: return -x + y; case 2: return x - y; case 3: return -x - y;
                case 4: return x + z; case 5: return -x + z; case 6: return x - z; case 7: return -x - z;
                case 8: return y + z; case 9: return -y + z; case 10: return y - z; default: return -y - z;
            }
        }
        // Chance for a place: the same number every time for the same three counts.
        public static float Suerte(int x, int y, int z, uint s) { return (Mezcla(x, y, z, s) & 0xFFFFFF) / (float)0x1000000; }
        static double Curva(double t) { return t * t * t * (t * (t * 6 - 15) + 10); }
        // One layer, between -1 and 1 or so.
        public static double Uno(double x, double y, double z, uint s)
        {
            int xi = (int)System.Math.Floor(x), yi = (int)System.Math.Floor(y), zi = (int)System.Math.Floor(z);
            double fx = x - xi, fy = y - yi, fz = z - zi, u = Curva(fx), v = Curva(fy), w = Curva(fz);
            double a = Pendiente(Mezcla(xi, yi, zi, s), fx, fy, fz), b = Pendiente(Mezcla(xi + 1, yi, zi, s), fx - 1, fy, fz);
            double c = Pendiente(Mezcla(xi, yi + 1, zi, s), fx, fy - 1, fz), d = Pendiente(Mezcla(xi + 1, yi + 1, zi, s), fx - 1, fy - 1, fz);
            double e = Pendiente(Mezcla(xi, yi, zi + 1, s), fx, fy, fz - 1), f = Pendiente(Mezcla(xi + 1, yi, zi + 1, s), fx - 1, fy, fz - 1);
            double g = Pendiente(Mezcla(xi, yi + 1, zi + 1, s), fx, fy - 1, fz - 1), h = Pendiente(Mezcla(xi + 1, yi + 1, zi + 1, s), fx - 1, fy - 1, fz - 1);
            double ab = a + (b - a) * u, cd = c + (d - c) * u, ef = e + (f - e) * u, gh = g + (h - g) * u, bajo = ab + (cd - ab) * v, alto = ef + (gh - ef) * v;
            return bajo + (alto - bajo) * w;
        }
        // Layers one over another, each twice as fine and `aspero` times as strong; between 0 and 1. A part of a layer counts too.
        public static double Capas(double x, double y, double z, double escala, double capas, double aspero, uint s)
        {
            double suma = 0, total = 0, fuerza = 1, f = escala; int n = (int)System.Math.Ceiling(capas) + 1;
            for (int i = 0; i < n; i++)
            {
                double peso = i < n - 1 ? 1 : 1 - (System.Math.Ceiling(capas) - capas); if (peso <= 0) break;
                suma += Uno(x * f, y * f, z * f, s + (uint)i * 101u) * fuerza * peso; total += fuerza * peso; fuerza *= aspero; f *= 2;
            }
            return 0.5 + 0.5 * suma / total * 1.6;      // (stretched a little: a sum of layers gathers near its middle)
        }
    }

    public class Relieve
    {
        public float continentes, angulosidad, relieve, detalle, mar, desgaste; public uint semilla; readonly double cx, cy, cz;
        // What the genes say, as the planet's numbers: the same reading blender/planeta.py makes.
        public Relieve(Entidad e)
        {
            var g = e.genes; var azar = new Azar(g.semilla + "|planeta"); semilla = (uint)(azar.Uno() * 9999) + 1;
            continentes = 0.75f + 0.45f * g.grupos; angulosidad = 1f - g.redondez; relieve = 0.08f + 0.012f * g.puntas; detalle = 3f + 1.5f * g.complejidad; mar = 0.44f + (1f - g.trazo) * 0.3f;
            desgaste = 0.6f + 0.4f * angulosidad;      // (an angular entity's land is cut deeper)
            cx = azar.Entre(-50, 50); cy = azar.Entre(-50, 50); cz = azar.Entre(-50, 50);
        }
        static double Suave(double v, double a, double b) { double t = System.Math.Min(1, System.Math.Max(0, (v - a) / (b - a))); return t * t * (3 - 2 * t); }
        // The land before the water: continents and mountains. Says how far inland it is (0 at the shore) and how far below the sea.
        double Base(double px, double py, double pz, out double tierra, out double hondo)
        {
            double c = continentes, continente = Ruido.Capas(px, py, pz, c, 3, 0.55, semilla);
            tierra = Suave(continente, mar, mar + 0.22); hondo = System.Math.Min(continente - mar, 0); if (tierra <= 0) return 0;
            double bulto = Ruido.Capas(px, py, pz, c * 3.1, System.Math.Min(detalle, 5.5), 0.62 - (1 - angulosidad) * 0.2, semilla + 7u), cresta = 1 - System.Math.Abs(bulto * 2 - 1), monte = bulto + (cresta - bulto) * angulosidad;
            return tierra * (monte * 0.8 + 0.14);
        }
        // How far out the ground is in that direction, as a part of the radius (below 0: under the sea), and how high
        // the land is there between the shore (0) and the peaks (1).
        // The land is then worn as water wears it, without any water being run: where it slopes, gullies are cut along
        // the way down, large ones first and smaller ones branching from them, each bending to the slope the ones
        // before left. It is worked out for one place at a time, so a piece of the planet needs nothing from its neighbours.
        public float Sube(double x, double y, double z, out float altura)
        {
            double px = x + cx, py = y + cy, pz = z + cz, c = continentes;
            double h = Base(px, py, pz, out double tierra, out double hondo);
            if (tierra <= 0) { altura = 0; return (float)(hondo * 0.6 * relieve); }
            // (which way it slopes: two more looks, a step to each side along the ground)
            double ax = System.Math.Abs(y) < 0.9 ? 0 : 1, ay = System.Math.Abs(y) < 0.9 ? 1 : 0, t1x = y * 0 - z * ay, t1y = z * ax - x * 0, t1z = x * ay - y * ax, l1 = System.Math.Sqrt(t1x * t1x + t1y * t1y + t1z * t1z);
            t1x /= l1; t1y /= l1; t1z /= l1; double t2x = y * t1z - z * t1y, t2y = z * t1x - x * t1z, t2z = x * t1y - y * t1x; const double e = 0.0012;
            double ga = (Base(px + t1x * e, py + t1y * e, pz + t1z * e, out _, out _) - h) / e, gb = (Base(px + t2x * e, py + t2y * e, pz + t2z * e, out _, out _) - h) / e;
            double gx = t1x * ga + t2x * gb, gy = t1y * ga + t2y * gb, gz = t1z * ga + t2z * gb, f = c * 9, fuerza = 0.05 * desgaste;
            for (int o = 0; o < 4; o++)
            {
                double g = System.Math.Sqrt(gx * gx + gy * gy + gz * gz); if (g < 1e-6) break;
                // (the gullies run down the slope, so the wave that cuts them runs across it)
                double dx = gx / g, dy = gy / g, dz = gz / g, sx = y * dz - z * dy, sy = z * dx - x * dz, sz = x * dy - y * dx, onda = 0, pendiente = 0, peso = 0;
                double qx = px * f - 0.5, qy = py * f - 0.5, qz = pz * f - 0.5; int ix = (int)System.Math.Floor(qx), iy = (int)System.Math.Floor(qy), iz = (int)System.Math.Floor(qz);
                for (int k = 0; k < 8; k++)
                {
                    int jx = ix + (k & 1), jy = iy + ((k >> 1) & 1), jz = iz + ((k >> 2) & 1); uint s = semilla + 41u + (uint)o * 5u;
                    double vx = px - (jx + 0.5 + (Ruido.Suerte(jx, jy, jz, s) - 0.5) * 0.6) / f, vy = py - (jy + 0.5 + (Ruido.Suerte(jx, jy, jz, s + 1) - 0.5) * 0.6) / f, vz = pz - (jz + 0.5 + (Ruido.Suerte(jx, jy, jz, s + 2) - 0.5) * 0.6) / f;
                    double lejos = (vx * vx + vy * vy + vz * vz) * f * f / 2.25, w = lejos >= 1 ? 0 : (1 - lejos) * (1 - lejos), fase = (vx * sx + vy * sy + vz * sz) * f * 6.2832;
                    onda += w * System.Math.Cos(fase); pendiente -= w * System.Math.Sin(fase) * f * 6.2832; peso += w;
                }
                if (peso > 1e-6)
                {
                    double cuanto = fuerza * Suave(g, 0.3, 2.2) * tierra; h += cuanto * (onda / peso - 0.35);
                    gx += sx * cuanto * pendiente / peso; gy += sy * cuanto * pendiente / peso; gz += sz * cuanto * pendiente / peso;
                }
                f *= 2; fuerza *= 0.55;
            }
            // (what is only seen from near: the grain of the ground, and a finer one for whoever stands on it)
            double grano = Ruido.Capas(px, py, pz, c * 14, 2, 0.6, semilla + 13u), fino = Ruido.Capas(px, py, pz, c * 90, 3, 0.55, semilla + 17u), polvo = Ruido.Capas(px, py, pz, c * 900, 2, 0.5, semilla + 23u);
            h += tierra * (grano * 0.1 + (fino - 0.5) * 0.02 + (polvo - 0.5) * 0.002); if (h < 0.002) h = 0.002;
            altura = (float)System.Math.Min(1, h); return (float)(h * relieve);
        }
        // The weather of a place: how warm (cold at the poles and on high ground) and how wet, each between 0 and 1.
        public void Clima(double x, double y, double z, float altura, out float calor, out float humedad)
        {
            double px = x + cx, py = y + cy, pz = z + cz, c = continentes, vaiven = Ruido.Capas(px, py, pz, c * 2.3, 2, 0.5, semilla + 31u);
            calor = (float)System.Math.Min(1, System.Math.Max(0, 1 - System.Math.Pow(System.Math.Abs(y), 1.7) * 1.05 - altura * 0.5 + (vaiven - 0.5) * 0.3));
            humedad = (float)System.Math.Min(1, System.Math.Max(0, Ruido.Capas(px, py, pz, c * 1.7, 3, 0.55, semilla + 37u)));
        }
    }
}
