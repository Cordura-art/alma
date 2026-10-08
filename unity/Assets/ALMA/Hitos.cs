// What stands on an entity's planet that is ALMA's own: its landmarks. Near where one comes down there is the scanned
// bust, large, in the entity's three colors; the scanned underpass, to walk through; a ring of its line figures,
// standing as signs; and its character, who lives there and walks its round. More figures stand here and there over
// the rest of the land. Each is made once, and is only switched on when the eye is near enough to see it.
using System;
using System.Collections.Generic;
using System.IO;
using UnityEngine;
using UnityEngine.Rendering;

namespace Alma
{
    [Serializable] public class Escaneo { public int alma, columnas, filas, hondos; public float alto; public string puntos; }
    [Serializable] public class Trazo { public float[] p; public bool acento; }
    [Serializable] public class Figura { public string nombre; public float ancho, alto; public Trazo[] trazos; }
    [Serializable] public class Figuras { public Figura[] figuras; }

    public class Hitos : MonoBehaviour
    {
        class Hito { public GameObject o; public Vector3 lugar; public float alcance; }
        readonly List<Hito> todos = new List<Hito>(); Planeta p; Vector3 llegada, t1, t2;
        public Personaje habitante; Vector3 casa; float vuelta, radioDeSuRonda = 6f; public Vector3 busto, tunel, unaFigura; public int figurasPuestas, aLaVista;

        static T Lee<T>(string carpeta, string nombre) where T : class { var a = Path.Combine(Application.streamingAssetsPath, carpeta, nombre + ".json"); return File.Exists(a) ? JsonUtility.FromJson<T>(File.ReadAllText(a)) : null; }
        // A place `metros` away from where one comes down, toward `rumbo` (radians), as a direction from the planet's middle.
        Vector3 Cerca(float metros, float rumbo) { return (llegada + (t1 * Mathf.Cos(rumbo) + t2 * Mathf.Sin(rumbo)) * (metros / p.radio)).normalized; }
        Hito Pone(string nombre, Mesh malla, Material m, Vector3 dir, float giro, float alcance, float sube = 0)
        {
            var o = new GameObject(nombre); o.transform.SetParent(p.transform, false); o.transform.localPosition = p.Suelo(dir) + dir * sube;
            Vector3 lado = Vector3.Cross(dir, Mathf.Abs(dir.y) < 0.9f ? Vector3.up : Vector3.right).normalized; o.transform.localRotation = Quaternion.LookRotation(Quaternion.AngleAxis(giro, dir) * lado, dir);
            o.AddComponent<MeshFilter>().sharedMesh = malla; var mr = o.AddComponent<MeshRenderer>(); mr.sharedMaterial = m; mr.shadowCastingMode = ShadowCastingMode.Off; mr.receiveShadows = false; o.SetActive(false);
            var h = new Hito { o = o, lugar = o.transform.localPosition, alcance = alcance }; todos.Add(h); return h;
        }

        public void Nace(Planeta planeta)
        {
            p = planeta; var g = p.entidad.genes; var azar = new Azar(g.semilla + "|hitos"); llegada = p.UnLugar();
            t1 = Vector3.Cross(llegada, Mathf.Abs(llegada.y) < 0.9f ? Vector3.up : Vector3.right).normalized; t2 = Vector3.Cross(llegada, t1);
            Color tinta = Lector.Tinta(g.pieza.tinta); Color[] tres = { Lector.Tinta(g.pieza.acento), tinta, Lector.Tinta(g.pieza.barras[2]) };
            // A place near the landing that is dry: the first one found turning from where it was asked for.
            Vector3 Seco(float metros, float rumbo) { Vector3 mejor = Cerca(metros, rumbo); float nivel = -1; for (int i = 0; i < 24; i++) { var d = Cerca(metros * (1 + 0.04f * i), rumbo + i * 0.26f); if (p.EsTierra(d, out _, out float llano) && llano > nivel) { nivel = llano; mejor = d; if (llano > 0.93f) break; } } return mejor; }

            var b = Lee<Escaneo>("escaneos", "meleagro"); if (b != null) { busto = Seco(30, 0.4f); Pone("Busto", DeEscaneo(b, 14f, tres), p.MaterialDeCosas, busto, 200, 1400, -0.4f); }
            var t = Lee<Escaneo>("escaneos", "tunel"); if (t != null) { tunel = Seco(75, 2.4f); Pone("Túnel", DeEscaneo(t, t.alto, tres), p.MaterialDeCosas, tunel, 40, 1400, 0.3f); }
            var F = Lee<Figuras>("figuras", p.id);
            if (F != null && F.figuras != null && F.figuras.Length > 0)
            {
                var mallas = new Mesh[F.figuras.Length]; for (int i = 0; i < mallas.Length; i++) mallas[i] = DeFigura(F.figuras[i], 3.4f, tinta, Lector.Tinta(g.pieza.barras[1]));
                // (a ring of six by the landing, then one here and one there over all its land)
                for (int i = 0; i < 6; i++) { var d = Seco(13 + 5 * (i % 3), 0.9f + i * 1.05f); int k = (int)(azar.Uno() * mallas.Length) % mallas.Length; Pone("Figura " + F.figuras[k].nombre, mallas[k], p.MaterialDeSenales, d, azar.Entre(0, 360), 700, 0.5f); if (i == 0) unaFigura = d; figurasPuestas++; }
                for (int i = 0, n = 0; i < 4000 && n < 90; i++)
                {
                    var d = new Vector3(azar.Entre(-1, 1), azar.Entre(-1, 1), azar.Entre(-1, 1)); if (d.sqrMagnitude < 0.05f) continue; d.Normalize();
                    if (!p.EsTierra(d, out float altura, out float llano) || llano < 0.78f || altura > 0.6f) continue; int k = (int)(azar.Uno() * mallas.Length) % mallas.Length;
                    Pone("Figura " + F.figuras[k].nombre, mallas[k], p.MaterialDeSenales, d, azar.Entre(0, 360), 600, 0.5f); n++; figurasPuestas++;
                }
            }
            // Its character: born where it lives, so that its coat settles there.
            casa = Seco(9, 3.7f); var hogar = new GameObject("Habitante"); hogar.transform.SetParent(p.transform, false); Coloca(hogar.transform, 0);
            try { habitante = hogar.AddComponent<Personaje>(); habitante.Nace(p.entidad, Piel.Lee(p.id)); } catch (Exception e) { Debug.LogWarning("ALMA: el habitante no pudo nacer: " + e.Message); habitante = null; }
        }
        // Where its character is on its round, and which way it faces.
        void Coloca(Transform t, float angulo)
        {
            Vector3 c1 = Vector3.Cross(casa, Mathf.Abs(casa.y) < 0.9f ? Vector3.up : Vector3.right).normalized, c2 = Vector3.Cross(casa, c1);
            Vector3 dir = (casa + (c1 * Mathf.Cos(angulo) + c2 * Mathf.Sin(angulo)) * (radioDeSuRonda / p.radio)).normalized, adelante = (-c1 * Mathf.Sin(angulo) + c2 * Mathf.Cos(angulo)).normalized;
            t.localPosition = p.Suelo(dir); t.localRotation = Quaternion.LookRotation(Vector3.ProjectOnPlane(adelante, dir).normalized, dir);
        }
        void Update() { if (EscenaPlaneta.enVivo) Avanza(Mathf.Min(Time.deltaTime, 1f / 20f)); }
        public void Avanza(float dt)
        {
            var cam = Camera.main; if (cam == null || p == null) return; Vector3 ojo = p.transform.InverseTransformPoint(cam.transform.position); aLaVista = 0;
            foreach (var h in todos) { bool si = (ojo - h.lugar).sqrMagnitude < h.alcance * h.alcance; if (h.o.activeSelf != si) h.o.SetActive(si); if (si) aLaVista++; }
            if (habitante == null) return; bool cerca = (ojo - habitante.transform.localPosition).sqrMagnitude < 350f * 350f; habitante.Muestra(cerca); if (!cerca || dt <= 0) return;
            vuelta += habitante.velocidad * dt / radioDeSuRonda; Coloca(habitante.transform, vuelta); habitante.Avanza(dt);
        }

        // A scan (the lattice of dots the covers draw, entidades/escaneos) as a thing that stands: each dot a small
        // square facing the way its surface faces, in the entity's three colors from its top to its foot, lighter where the thing is.
        static Mesh DeEscaneo(Escaneo e, float altoEnMetros, Color[] tres)
        {
            byte[] by = Convert.FromBase64String(e.puntos); int ancho = e.alma == 3 ? 10 : 7, c = ancho - 4, n = by.Length / ancho; float paso = altoEnMetros / e.filas, medio = paso * 0.43f;
            var v = new Vector3[n * 4]; var nn = new Vector3[n * 4]; var col = new Color[n * 4]; var tri = new int[n * 6];
            for (int i = 0; i < n; i++)
            {
                int o = i * ancho; int cx = c == 6 ? by[o] | by[o + 1] << 8 : by[o], fila = c == 6 ? by[o + 2] | by[o + 3] << 8 : by[o + 1], hondo = c == 6 ? by[o + 4] | by[o + 5] << 8 : by[o + 2];
                float tono = by[o + c] / 255f; Vector3 normal = new Vector3((by[o + c + 1] - 128) / 127f, (by[o + c + 2] - 128) / 127f, (by[o + c + 3] - 128) / 127f); if (normal.sqrMagnitude < 0.01f) normal = Vector3.up; normal.Normalize();
                Vector3 centro = new Vector3((cx + 0.5f - e.columnas / 2f) * paso, (e.filas - fila - 0.5f) * paso, (e.hondos / 2f - hondo - 0.5f) * paso), a = Vector3.Cross(normal, Mathf.Abs(normal.y) < 0.9f ? Vector3.up : Vector3.right).normalized * medio, b = Vector3.Cross(normal, a).normalized * medio;
                float alto = (float)fila / e.filas; Color color = tres[alto < 0.3f ? 0 : alto < 0.68f ? 1 : 2] * (0.3f + 0.7f * tono); color.a = 1; int k = i * 4;
                v[k] = centro - a - b; v[k + 1] = centro + a - b; v[k + 2] = centro + a + b; v[k + 3] = centro - a + b;
                for (int q = 0; q < 4; q++) { nn[k + q] = normal; col[k + q] = color; }
                int j = i * 6; tri[j] = k; tri[j + 1] = k + 1; tri[j + 2] = k + 2; tri[j + 3] = k; tri[j + 4] = k + 2; tri[j + 5] = k + 3;
            }
            var m = new Mesh { indexFormat = IndexFormat.UInt32, vertices = v, normals = nn, colors = col, triangles = tri }; m.RecalculateBounds(); return m;
        }
        // A line figure as a sign: its strokes, as thin bands on an upright plane, in the entity's ink (and its accent where the figure has it).
        static Mesh DeFigura(Figura f, float altoEnMetros, Color tinta, Color acento)
        {
            var v = new List<Vector3>(); var nn = new List<Vector3>(); var col = new List<Color>(); var tri = new List<int>(); float s = altoEnMetros / Mathf.Max(1, f.alto), grueso = altoEnMetros * 0.006f;
            foreach (var t in f.trazos ?? new Trazo[0])
            {
                if (t.p == null) continue; Color c = t.acento ? acento : tinta; c.a = 1;
                for (int i = 0; i + 3 < t.p.Length; i += 2)
                {
                    Vector3 a = new Vector3((t.p[i] - f.ancho / 2f) * s, (f.alto - t.p[i + 1]) * s, 0), b = new Vector3((t.p[i + 2] - f.ancho / 2f) * s, (f.alto - t.p[i + 3]) * s, 0), d = b - a; if (d.sqrMagnitude < 1e-8f) continue;
                    Vector3 w = new Vector3(-d.y, d.x, 0).normalized * grueso, largo = d.normalized * grueso; int k = v.Count;      // (a little longer than it is, so that the bends close)
                    v.Add(a - w - largo); v.Add(a + w - largo); v.Add(b + w + largo); v.Add(b - w + largo); for (int q = 0; q < 4; q++) { nn.Add(Vector3.back); col.Add(c); }
                    tri.Add(k); tri.Add(k + 1); tri.Add(k + 2); tri.Add(k); tri.Add(k + 2); tri.Add(k + 3);
                }
            }
            var m = new Mesh { indexFormat = v.Count > 65000 ? IndexFormat.UInt32 : IndexFormat.UInt16 }; m.SetVertices(v); m.SetNormals(nn); m.SetColors(col); m.SetTriangles(tri, 0); m.RecalculateBounds(); return m;
        }
    }
}
