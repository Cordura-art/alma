// The planet of an ALMA entity, built as one goes: a cube blown into a ball, each of its six faces cut in four again
// and again, only where whoever looks is near. A piece far away is a few triangles; the ground underfoot is cut
// until each triangle is a step wide. Pieces are worked out off the main thread, the nearest first, and a piece stays
// on screen until the four that replace it are ready. Each piece hangs a skirt at its edges, which hides the cracks
// between neighbours cut to different depths. How high the ground is comes from the entity's rule (Relieve.cs).
using System.Collections.Generic;
using System.Threading.Tasks;
using UnityEngine;
using UnityEngine.InputSystem;
using UnityEngine.Rendering;

namespace Alma
{
    public class Planeta : MonoBehaviour
    {
        public string id = "cordura";
        public float radio = 1000f;          // in meters: a small world, and still a long walk around
        public int lado = 16;                // quads along the side of a piece
        public int hondoMax = 9;             // how many times a face may be cut in four
        public float cerca = 2.4f;           // a piece is cut when one is nearer than this many times its width
        public int aLaVez = 6;               // pieces worked out at once
        public int hondoDeCosas = 4;         // from this depth on, a piece carries its trees and rocks
        public int cuadricula = 7;           // the planet's own lattice of places for them: 2^7 along a face, some twelve meters each
        public Entidad entidad; public Relieve regla; public Color aire;
        public int trozosALaVista, triangulosALaVista, trozosHechos; public float nubes = 0.5f, radioDelAire, radioDeNubes; public Color calido, claro;
        Material suelo, agua, cosas, senales; Color[] rampa; public Material MaterialDeCosas => cosas; public Material MaterialDeSenales => senales; Color colorDeArbol, colorDeRoca, colorSeco, colorDeNieve, colorDeOrilla; float bosque; public int cosasALaVista; float[] paradas; Color fondoDelMar, colorDelMar; float radioDelMar;
        readonly List<Trozo> raices = new List<Trozo>(); readonly List<Trozo> porHacer = new List<Trozo>(); readonly List<Trozo> haciendo = new List<Trozo>();
        static readonly Vector3[] N = { Vector3.right, Vector3.left, Vector3.up, Vector3.down, Vector3.forward, Vector3.back };
        static readonly Vector3[] U = { Vector3.forward, Vector3.back, Vector3.right, Vector3.left, Vector3.up, Vector3.down };
        int[] triangulos;

        class Datos { public Vector3[] puntos, normales, mar; public Color[] colores, coloresDelMar; public bool hayMar, hayTierra; public List<Vector3> cp, cn; public List<Color> cc; public List<int> ct; public int cuantas; }
        class Trozo
        {
            public int cara, hondo; public double x0, y0, tam; public Trozo[] hijos; public GameObject obj, objMar, objCosas; public int cuantas; public bool listo, pedido; public Vector3 centro; public float ancho, lejos; public Task<Datos> tarea;
        }

        // The cube's point as the ball's, without the crowding a plain stretch leaves at the corners.
        static Vector3d Esfera(double x, double y, double z)
        {
            double x2 = x * x, y2 = y * y, z2 = z * z;
            return new Vector3d(x * System.Math.Sqrt(1 - y2 / 2 - z2 / 2 + y2 * z2 / 3), y * System.Math.Sqrt(1 - z2 / 2 - x2 / 2 + z2 * x2 / 3), z * System.Math.Sqrt(1 - x2 / 2 - y2 / 2 + x2 * y2 / 3));
        }
        struct Vector3d { public double x, y, z; public Vector3d(double a, double b, double c) { x = a; y = b; z = c; } public Vector3 V => new Vector3((float)x, (float)y, (float)z); }
        Vector3d Hacia(int cara, double a, double b) { Vector3 n = N[cara], u = U[cara], v = Vector3.Cross(n, u); return Esfera(n.x + u.x * a + v.x * b, n.y + u.y * a + v.y * b, n.z + u.z * a + v.z * b); }

        public void Nace(Entidad e)
        {
            entidad = e; id = e.id; regla = new Relieve(e); var g = e.genes; var b = g.pieza.barras;
            Color tinta = Lector.Tinta(g.pieza.tinta), fondo = Lector.Tinta(g.pieza.@base), acento = Lector.Tinta(g.pieza.acento), hondo = Lector.Tinta(g.fondo.dark.acento ?? g.pieza.@base);
            // The land from the shore to the peaks, as blender/planeta.py paints it.
            paradas = new[] { 0f, 0.06f, 0.3f, 0.55f, 0.8f, 1f };
            rampa = new[] { Color.Lerp(Lector.Tinta(b[4]), fondo, 0.25f), Lector.Tinta(b[1]), Lector.Tinta(b[3]), Color.Lerp(Lector.Tinta(b[0]), fondo, 0.35f), Lector.Tinta(b[0]), tinta };
            colorDelMar = Color.Lerp(Color.Lerp(hondo, fondo, 0.55f), acento, 0.08f); fondoDelMar = Color.Lerp(colorDelMar, fondo, 0.5f); aire = Color.Lerp(acento, tinta, 0.35f) * 0.5f; aire.a = 1;
            radioDelMar = radio * (1 + regla.relieve * 0.02f);
            // Its climates wear its colors too: dry land its warm one, cold land its lightest; the sea is lighter by the shore.
            colorSeco = Color.Lerp(Lector.Tinta(b[3]), tinta, 0.35f); colorDeNieve = Color.Lerp(tinta, Lector.Tinta(b[0]), 0.12f); colorDeOrilla = Color.Lerp(colorDelMar, Lector.Tinta(b[1]), 0.22f);
            colorDeArbol = Color.Lerp(Lector.Tinta(b[2]), fondo, 0.2f); colorDeRoca = Color.Lerp(Lector.Tinta(b[4]), fondo, 0.4f); bosque = Mathf.Clamp01(0.22f * g.focos);
            var sh = Shader.Find("ALMA/Planeta"); suelo = new Material(sh); agua = new Material(sh); agua.SetFloat("_Agua", 1); cosas = new Material(sh); cosas.SetFloat("_Caras", 0); senales = new Material(sh); senales.SetFloat("_Caras", 0); senales.SetFloat("_Luz", 0.85f);
            // The sea lets what is under it be seen by the shore: it is drawn after the ground, mixed over it.
            agua.SetFloat("_Pone", (float)BlendMode.SrcAlpha); agua.SetFloat("_Deja", (float)BlendMode.OneMinusSrcAlpha); agua.renderQueue = 3000; agua.SetVector("_Tinta", tinta);
            // Its sky: the air reaches a third of a radius up, the clouds lie just over the highest ground; a wet entity has more of them.
            radioDelAire = radio * 1.3f; radioDeNubes = radio * (1 + regla.relieve * 1.25f); nubes = Mathf.Clamp01(0.1f + 0.06f * g.focos); calido = Color.Lerp(Lector.Tinta(b[3]), tinta, 0.2f); claro = tinta;
            foreach (var m in new[] { suelo, agua, cosas, senales }) { m.SetFloat("_Techo", radioDeNubes); m.SetFloat("_Nubes", nubes); }
            var cielo = Shader.Find("ALMA/Cielo"); var bola = Bola(24);
            Capa("Aire", bola, cielo, 1, radioDelAire, 1, 2990);
            for (int k = 0; k < 3; k++) Capa("Nubes " + k, bola, cielo, 2, radioDeNubes + (k - 1) * radio * 0.011f, 0, 3010 + k).SetFloat("_Capa", k / 2f);
            suelo.SetFloat("_Grano", 1); suelo.SetFloat("_Mar", radioDelMar); suelo.SetVector("_Roca", colorDeRoca); suelo.SetVector("_Arena", Color.Lerp(Lector.Tinta(b[4]), tinta, 0.22f));
            foreach (var m in new[] { suelo, agua, cosas, senales }) { m.SetVector("_Aire", aire); m.SetFloat("_Lejos", radio * 2.5f); }
            int r = lado + 3; var t = new List<int>();
            for (int j = 0; j < r - 1; j++) for (int i = 0; i < r - 1; i++) { int a = j * r + i; t.Add(a); t.Add(a + 1); t.Add(a + r); t.Add(a + 1); t.Add(a + r + 1); t.Add(a + r); }      // (turned so that each faces outward, as Unity counts it)
            triangulos = t.ToArray();
            for (int c = 0; c < 6; c++) { var raiz = Nuevo(c, 0, -1, -1, 2); raices.Add(raiz); Hecho(raiz, Trabaja(raiz)); }
            // (it is turned so that where one comes down is its top: what lives there stands upright in the world, and its coat hangs down)
            transform.rotation = Quaternion.FromToRotation(UnLugar(), Vector3.up);
        }
        // A plain ball of radius one: a cube blown out, `n` quads along each side of each face.
        public static Mesh Bola(int n)
        {
            var p = new List<Vector3>(); var t = new List<int>();
            for (int c = 0; c < 6; c++)
            {
                Vector3 nn = N[c], u = U[c], v = Vector3.Cross(nn, u); int i0 = p.Count;
                for (int j = 0; j <= n; j++) for (int i = 0; i <= n; i++) { double a = -1 + 2.0 * i / n, b = -1 + 2.0 * j / n; p.Add(Esfera(nn.x + u.x * a + v.x * b, nn.y + u.y * a + v.y * b, nn.z + u.z * a + v.z * b).V); }
                for (int j = 0; j < n; j++) for (int i = 0; i < n; i++) { int a = i0 + j * (n + 1) + i; t.Add(a); t.Add(a + 1); t.Add(a + n + 1); t.Add(a + 1); t.Add(a + n + 2); t.Add(a + n + 1); }
            }
            var m = new Mesh { vertices = p.ToArray(), triangles = t.ToArray() }; m.RecalculateBounds(); return m;
        }
        // A layer of its sky (Cielo.shader): the air, or the clouds.
        public Material Capa(string nombre, Mesh bola, Shader sh, int modo, float tamano, int caras, int turno)
        {
            var o = new GameObject(nombre); o.transform.SetParent(transform, false); o.transform.localScale = Vector3.one * tamano; o.AddComponent<MeshFilter>().sharedMesh = bola;
            var m = new Material(sh); m.SetFloat("_Modo", modo); m.SetVector("_Aire", aire); m.SetVector("_Calido", calido); m.SetVector("_Claro", claro); m.SetFloat("_Radio", radio); m.SetFloat("_Tope", radioDelAire); m.SetFloat("_Nubes", nubes); m.SetFloat("_Caras", caras); m.renderQueue = turno;
            var mr = o.AddComponent<MeshRenderer>(); mr.sharedMaterial = m; mr.shadowCastingMode = ShadowCastingMode.Off; mr.receiveShadows = false; return m;
        }
        Trozo Nuevo(int cara, int hondo, double x0, double y0, double tam)
        {
            var t = new Trozo { cara = cara, hondo = hondo, x0 = x0, y0 = y0, tam = tam };
            t.centro = Hacia(cara, x0 + tam / 2, y0 + tam / 2).V * radio; t.ancho = (float)(tam * 0.785 * radio); return t;
        }
        Color Color_(float altura, float llano, float calor, float humedad)
        {
            Color c = rampa[rampa.Length - 1];
            for (int i = 1; i < paradas.Length; i++) if (altura <= paradas[i]) { c = Color.Lerp(rampa[i - 1], rampa[i], Mathf.InverseLerp(paradas[i - 1], paradas[i], altura)); break; }
            c = Color.Lerp(c, colorSeco, Suave(humedad, 0.45f, 0.28f) * Suave(calor, 0.35f, 0.6f) * 0.85f); c = Color.Lerp(c, colorDeNieve, Suave(calor, 0.3f, 0.14f));
            return c * Mathf.Lerp(0.7f, 1f, Mathf.InverseLerp(0.55f, 0.95f, llano));      // (how steep it is shows mostly in the shading: see Planeta.shader)
        }
        // A piece's points, worked out away from the main thread: nothing here touches Unity but its plain numbers.
        Datos Trabaja(Trozo t)
        {
            int r = lado + 3, n = r * r; var d = new Datos { puntos = new Vector3[n], normales = new Vector3[n], colores = new Color[n], mar = new Vector3[n], coloresDelMar = new Color[n] };
            double paso = t.tam / lado, e = paso * 0.5; float falda = t.ancho / lado * 1.5f; Vector3 centro = t.centro;
            for (int j = 0; j < r; j++) for (int i = 0; i < r; i++)
            {
                int ci = Mathf.Clamp(i - 1, 0, lado), cj = Mathf.Clamp(j - 1, 0, lado); bool borde = i == 0 || j == 0 || i == r - 1 || j == r - 1; double a = t.x0 + paso * ci, b = t.y0 + paso * cj;
                Vector3d h = Hacia(t.cara, a, b), hu = Hacia(t.cara, a + e, b), hv = Hacia(t.cara, a, b + e);
                float s = regla.Sube(h.x, h.y, h.z, out float altura), su = regla.Sube(hu.x, hu.y, hu.z, out _), sv = regla.Sube(hv.x, hv.y, hv.z, out _);
                Vector3 dir = h.V, p = dir * (radio * (1 + s)), pu = hu.V * (radio * (1 + su)), pv = hv.V * (radio * (1 + sv)), normal = Vector3.Cross(pu - p, pv - p).normalized;
                if (Vector3.Dot(normal, dir) < 0) normal = -normal;
                int k = j * r + i; d.normales[k] = normal; regla.Clima(h.x, h.y, h.z, altura, out float calor, out float humedad);
                d.colores[k] = s > 0 ? Color_(altura, Vector3.Dot(normal, dir), calor, humedad) : Color.Lerp(fondoDelMar, rampa[0], Mathf.Clamp01(1 + s / (regla.relieve * 0.03f)));
                float helado = Suave(calor, 0.16f, 0.06f), hondura = Mathf.Clamp01(-s / (regla.relieve * 0.025f)); d.coloresDelMar[k] = Color.Lerp(Color.Lerp(colorDeOrilla, colorDelMar, hondura), colorDeNieve, helado); d.coloresDelMar[k].a = Mathf.Max(hondura, helado);      // (lighter by the shore, frozen near the poles)
                d.puntos[k] = p - centro - (borde ? dir * falda : Vector3.zero); d.mar[k] = dir * radioDelMar - centro - (borde ? dir * falda : Vector3.zero);
                if (radio * (1 + s) < radioDelMar) d.hayMar = true; else d.hayTierra = true;
            }
            if (t.hondo >= hondoDeCosas && d.hayTierra) Siembra(t, d);
            return d;
        }
        static float Suave(float v, float a, float b) { float x = Mathf.Clamp01((v - a) / (b - a)); return x * x * (3 - 2 * x); }
        // What grows and what lies on a piece. The places are the planet's, not the piece's: a lattice over each face,
        // each cell with up to three chances, so that a tree is where it is however finely the ground under it is cut.
        // Trees on low flat land, as many as the entity has forest; rocks where it is steep, and a few anywhere.
        void Siembra(Trozo t, Datos d)
        {
            d.cp = new List<Vector3>(); d.cn = new List<Vector3>(); d.cc = new List<Color>(); d.ct = new List<int>();
            double cs = 2.0 / (1 << cuadricula), e = cs * 0.12; uint s = regla.semilla + (uint)t.cara * 977u;
            for (int j = (int)System.Math.Ceiling((t.y0 + 1) / cs - 1e-9); j * cs - 1 < t.y0 + t.tam - 1e-9; j++)
                for (int i = (int)System.Math.Ceiling((t.x0 + 1) / cs - 1e-9); i * cs - 1 < t.x0 + t.tam - 1e-9; i++)
                    for (int k = 0; k < 3; k++)
                    {
                        double a = -1 + (i + Ruido.Suerte(i, j, k, s)) * cs, b = -1 + (j + Ruido.Suerte(i, j, k + 10, s)) * cs;
                        Vector3d h = Hacia(t.cara, a, b); float sube = regla.Sube(h.x, h.y, h.z, out float altura); if (radio * (1 + sube) < radioDelMar + 0.4f) continue;
                        Vector3d hu = Hacia(t.cara, a + e, b), hv = Hacia(t.cara, a, b + e); float su = regla.Sube(hu.x, hu.y, hu.z, out _), sv = regla.Sube(hv.x, hv.y, hv.z, out _);
                        Vector3 dir = h.V, p = dir * (radio * (1 + sube)), normal = Vector3.Cross(hu.V * (radio * (1 + su)) - p, hv.V * (radio * (1 + sv)) - p).normalized; if (Vector3.Dot(normal, dir) < 0) normal = -normal;
                        float llano = Vector3.Dot(normal, dir), suerte = Ruido.Suerte(i, j, k + 20, s), talla = Ruido.Suerte(i, j, k + 30, s), giro = Ruido.Suerte(i, j, k + 40, s) * 6.2832f;
                        regla.Clima(h.x, h.y, h.z, altura, out float calor, out float humedad); float seco = Suave(humedad, 0.45f, 0.28f) * Suave(calor, 0.35f, 0.6f), frio = Suave(calor, 0.3f, 0.14f);
                        // (trees want water and some warmth; where it is dry or frozen there are stones instead)
                        float deArbol = bosque * (0.35f + 1.3f * Suave(humedad, 0.3f, 0.62f)) * (1 - seco) * (1 - frio) * Suave(altura, 0.03f, 0.1f) * (1 - Suave(altura, 0.42f, 0.6f)) * Suave(llano, 0.86f, 0.96f), deRoca = 0.03f + 0.08f * seco + 0.05f * frio + 0.4f * Suave(altura, 0.04f, 0.2f) * (1 - Suave(llano, 0.7f, 0.9f));
                        Vector3 t1 = Vector3.Cross(dir, Mathf.Abs(dir.y) < 0.9f ? Vector3.up : Vector3.right).normalized, t2 = Vector3.Cross(dir, t1); int n0 = d.cp.Count; Vector3 pie = p - t.centro;
                        if (suerte < deArbol)
                        {
                            // (a tree: a cone of six sides, standing straight up from the planet's middle, darker at its foot)
                            float alto = 4f + 6f * talla, ancho = alto * 0.26f; Color c = colorDeArbol * (0.8f + 0.4f * Ruido.Suerte(i, j, k + 50, s)); c.a = 1;
                            d.cp.Add(pie + dir * alto); d.cn.Add(dir); d.cc.Add(c * 1.15f);
                            for (int q = 0; q < 6; q++) { float ang = giro + q * 1.0472f; Vector3 fuera = t1 * Mathf.Cos(ang) + t2 * Mathf.Sin(ang); d.cp.Add(pie + fuera * ancho - dir * 0.4f); d.cn.Add((fuera + dir * 0.35f).normalized); d.cc.Add(c * 0.7f); }
                            for (int q = 0; q < 6; q++) { d.ct.Add(n0); d.ct.Add(n0 + 1 + q); d.ct.Add(n0 + 1 + (q + 1) % 6); }
                            d.cuantas++;
                        }
                        else if (suerte > 1 - deRoca)
                        {
                            // (a rock: eight faces, lying along the ground)
                            float r = 0.5f + 1.6f * talla * talla; Color c = colorDeRoca * (0.75f + 0.5f * Ruido.Suerte(i, j, k + 50, s)); c.a = 1; Vector3 r1 = Vector3.Cross(normal, t1).normalized, r2 = Vector3.Cross(normal, r1);
                            Vector3[] puntas = { normal * r * 0.7f, r1 * r, r2 * r * 0.8f, -r1 * r * 0.9f, -r2 * r, -normal * r * 0.5f };
                            foreach (var q in puntas) { d.cp.Add(pie + q); d.cn.Add(q.normalized); d.cc.Add(c); }
                            int[] caras = { 0, 1, 2, 0, 2, 3, 0, 3, 4, 0, 4, 1, 5, 2, 1, 5, 3, 2, 5, 4, 3, 5, 1, 4 }; foreach (var q in caras) d.ct.Add(n0 + q);
                            d.cuantas++;
                        }
                    }
        }
        GameObject Malla(string nombre, Vector3[] puntos, Vector3[] normales, Color[] colores, Material m, Vector3 centro, int[] caras = null)
        {
            var o = new GameObject(nombre); o.transform.SetParent(transform, false); o.transform.localPosition = centro; o.SetActive(false);
            var malla = new Mesh(); if (puntos.Length > 65000) malla.indexFormat = IndexFormat.UInt32; malla.vertices = puntos; malla.normals = normales; malla.colors = colores; malla.triangles = caras ?? triangulos; malla.RecalculateBounds();
            o.AddComponent<MeshFilter>().sharedMesh = malla; var mr = o.AddComponent<MeshRenderer>(); mr.sharedMaterial = m; mr.shadowCastingMode = ShadowCastingMode.Off; mr.receiveShadows = false; return o;
        }
        void Hecho(Trozo t, Datos d)
        {
            t.obj = Malla("trozo " + t.cara + "·" + t.hondo, d.puntos, d.normales, d.colores, suelo, t.centro);
            if (d.hayMar)
            {
                var n = new Vector3[d.mar.Length]; for (int i = 0; i < n.Length; i++) n[i] = (d.mar[i] + t.centro).normalized;
                t.objMar = Malla("mar " + t.cara + "·" + t.hondo, d.mar, n, d.coloresDelMar, agua, t.centro);
            }
            if (d.cuantas > 0) { t.objCosas = Malla("cosas " + t.cara + "·" + t.hondo, d.cp.ToArray(), d.cn.ToArray(), d.cc.ToArray(), cosas, t.centro, d.ct.ToArray()); t.cuantas = d.cuantas; }
            t.listo = true; t.pedido = false; t.tarea = null; trozosHechos++;
        }
        void Muestra(Trozo t, bool si) { if (t.obj != null && t.obj.activeSelf != si) t.obj.SetActive(si); if (t.objMar != null && t.objMar.activeSelf != si) t.objMar.SetActive(si); if (t.objCosas != null && t.objCosas.activeSelf != si) t.objCosas.SetActive(si); if (si) { cosasALaVista += t.cuantas; trozosALaVista++; triangulosALaVista += triangulos.Length / 3 * (t.objMar != null ? 2 : 1); } }
        void Borra(Trozo t)
        {
            if (t.hijos != null) foreach (var h in t.hijos) Borra(h); t.hijos = null; porHacer.Remove(t);
            foreach (var o in new[] { t.obj, t.objMar, t.objCosas }) if (o != null) { Destroy(o.GetComponent<MeshFilter>().sharedMesh); Destroy(o); }
            t.obj = t.objMar = t.objCosas = null; t.listo = false;      // (one still being worked out is let finish, and thrown away when it does)
        }
        void Esconde(Trozo t) { if (t.obj != null && t.obj.activeSelf) t.obj.SetActive(false); if (t.objMar != null && t.objMar.activeSelf) t.objMar.SetActive(false); if (t.objCosas != null && t.objCosas.activeSelf) t.objCosas.SetActive(false); if (t.hijos != null) foreach (var h in t.hijos) Esconde(h); }
        void Recorre(Trozo t, Vector3 ojo, float horizonte)
        {
            t.lejos = (ojo - t.centro).magnitude;
            // (what is past the horizon is not cut any finer: nobody sees it)
            bool seVe = Vector3.Angle(ojo, t.centro) < horizonte + t.ancho / radio * Mathf.Rad2Deg, parte = t.hondo < hondoMax && seVe && t.lejos < cerca * t.ancho;
            if (parte)
            {
                if (t.hijos == null)
                {
                    double m = t.tam / 2; t.hijos = new[] { Nuevo(t.cara, t.hondo + 1, t.x0, t.y0, m), Nuevo(t.cara, t.hondo + 1, t.x0 + m, t.y0, m), Nuevo(t.cara, t.hondo + 1, t.x0, t.y0 + m, m), Nuevo(t.cara, t.hondo + 1, t.x0 + m, t.y0 + m, m) };
                }
                bool todos = true; foreach (var h in t.hijos) if (!h.listo) { todos = false; h.lejos = (ojo - h.centro).magnitude; if (!h.pedido && !porHacer.Contains(h)) porHacer.Add(h); }
                if (todos) { if (t.obj.activeSelf) { t.obj.SetActive(false); if (t.objMar != null) t.objMar.SetActive(false); if (t.objCosas != null) t.objCosas.SetActive(false); } foreach (var h in t.hijos) Recorre(h, ojo, horizonte); return; }
                foreach (var h in t.hijos) Esconde(h);
            }
            else if (t.hijos != null) { foreach (var h in t.hijos) Borra(h); t.hijos = null; }
            Muestra(t, true);
        }
        // One look at the whole planet from where the eye is: what to show, what to cut, what to drop. With `espera`,
        // it does not come back until everything it asked for is made (for a picture taken from outside the game).
        public void Mira(Vector3 ojoEnElMundo, bool espera = false)
        {
            Vector3 ojo = transform.InverseTransformPoint(ojoEnElMundo); float horizonte = Mathf.Acos(Mathf.Clamp(radio / Mathf.Max(radio, ojo.magnitude), 0f, 1f)) * Mathf.Rad2Deg + 12f;
            for (int vuelta = 0; vuelta < (espera ? 200 : 1); vuelta++)
            {
                for (int i = haciendo.Count - 1; i >= 0; i--) { var t = haciendo[i]; if (espera) t.tarea.Wait(); if (t.tarea.IsCompleted) { haciendo.RemoveAt(i); if (t.pedido) Hecho(t, t.tarea.Result); } }
                porHacer.Clear(); trozosALaVista = triangulosALaVista = cosasALaVista = 0; foreach (var r in raices) Recorre(r, ojo, horizonte);
                porHacer.Sort((a, b) => a.lejos.CompareTo(b.lejos));
                foreach (var t in porHacer) { if (haciendo.Count >= (espera ? 64 : aLaVez)) break; var uno = t; uno.pedido = true; uno.tarea = Task.Run(() => Trabaja(uno)); haciendo.Add(uno); }
                if (!espera || (haciendo.Count == 0 && porHacer.Count == 0)) break;
            }
        }
        // How much the air covers what is far: nothing from space, all of it near the ground.
        public void Niebla(float cuanta) { var a = aire; a.a = Mathf.Clamp01(cuanta); suelo.SetVector("_Aire", a); agua.SetVector("_Aire", a); cosas.SetVector("_Aire", a); senales.SetVector("_Aire", a); }
        // Where one comes down, in the world; the ground in a direction from its middle (its own, not the world's); whether
        // that is dry land, how high and how level; and how far out the ground is toward a point of the world.
        public Vector3 Llegada => transform.TransformDirection(UnLugar());
        public Vector3 Suelo(Vector3 dir) { float s = regla.Sube(dir.x, dir.y, dir.z, out _); return dir * Mathf.Max(radio * (1 + s), radioDelMar); }
        public bool EsTierra(Vector3 dir, out float altura, out float llano)
        {
            float s = regla.Sube(dir.x, dir.y, dir.z, out altura); llano = 0; if (radio * (1 + s) < radioDelMar + 0.5f) return false;
            Vector3 t = Vector3.Cross(dir, Mathf.Abs(dir.y) < 0.9f ? Vector3.up : Vector3.right).normalized, u = Vector3.Cross(dir, t), a = (dir + t * 0.002f).normalized, b = (dir + u * 0.002f).normalized;
            // (in meters: Unity takes a very short arrow for no arrow at all)
            Vector3 p0 = dir * (radio * (1 + s)), pa = a * (radio * (1 + regla.Sube(a.x, a.y, a.z, out _))), pb = b * (radio * (1 + regla.Sube(b.x, b.y, b.z, out _))); llano = Mathf.Abs(Vector3.Dot(Vector3.Cross(pa - p0, pb - p0).normalized, dir)); return true;
        }
        public float RadioDelSuelo(Vector3 haciaElMundo) { Vector3 d = transform.InverseTransformDirection(haciaElMundo.normalized); return radio * (1 + Mathf.Max(0, regla.Sube(d.x, d.y, d.z, out _))); }
        public float Altitud(Vector3 enElMundo) { Vector3 p = transform.InverseTransformPoint(enElMundo); Vector3 d = p.normalized; float s = regla.Sube(d.x, d.y, d.z, out _); return p.magnitude - Mathf.Max(radio * (1 + s), radioDelMar); }
        // A place on dry land, to come down on: the first one found turning around from where the entity's chance starts.
        public Vector3 UnLugar()
        {
            var azar = new Azar(entidad.genes.semilla + "|lugar");
            // (of many dry places at a middling height and not too cold, the most level one: there is room there for what stands by it)
            Vector3 mejor = Vector3.up; float nivel = -1;
            for (int i = 0, vistos = 0; i < 6000 && vistos < 160; i++)
            {
                var d = new Vector3(azar.Entre(-1, 1), azar.Entre(-1, 1), azar.Entre(-1, 1)); if (d.sqrMagnitude < 0.05f) continue; d.Normalize();
                if (!EsTierra(d, out float h, out float llano) || h < 0.1f || h > 0.34f) continue; regla.Clima(d.x, d.y, d.z, h, out float calor, out _); if (calor < 0.42f) continue;
                vistos++; if (llano > nivel) { nivel = llano; mejor = d; }
            }
            return mejor;
        }
        void Update() { var cam = Camera.main; if (cam != null && EscenaPlaneta.enVivo) Mira(cam.transform.position); }
    }

    // The planet's stage: black, one sun, and an eye that flies or walks. W A S D to move, the mouse with its right button
    // held to look around, Shift to go faster. Flying: Q and E down and up, slower the nearer the ground is. F comes down
    // to walk, and F again takes off: on foot there is weight toward the planet's middle, Space jumps, and the ground is
    // the entity's rule itself, asked where one stands (no physics engine: nothing to fall through).
    public class EscenaPlaneta : MonoBehaviour
    {
        public static bool enVivo = true; public Planeta planeta; public Camera cam; public Hitos hitos; Vector3 mira;
        public bool aPie; public Vector3 frente = Vector3.forward; public float inclina, caida; const float OJOS = 1.7f; Transform estrellas;
        void Start()
        {
            Application.runInBackground = true;
            foreach (var c in FindObjectsByType<Camera>(FindObjectsSortMode.None)) c.gameObject.SetActive(false);
            foreach (var l in FindObjectsByType<Light>(FindObjectsSortMode.None)) l.gameObject.SetActive(false);
            foreach (var v in FindObjectsByType<Volume>(FindObjectsSortMode.None)) v.gameObject.SetActive(false);
            var id = PlayerPrefs.GetString("alma.planeta", "cordura");
            planeta = new GameObject("Planeta").AddComponent<Planeta>(); planeta.Nace(Lector.Lee(id));
            var sol = new GameObject("Sol").AddComponent<Light>(); sol.type = LightType.Directional; sol.intensity = 1.5f; sol.shadows = LightShadows.None;
            cam = new GameObject("Ojo").AddComponent<Camera>(); cam.tag = "MainCamera"; cam.clearFlags = CameraClearFlags.SolidColor; cam.backgroundColor = Color.black; cam.fieldOfView = 50;
            estrellas = new GameObject("Estrellas").transform; estrellas.gameObject.AddComponent<MeshFilter>().sharedMesh = Planeta.Bola(8);
            var me = new Material(Shader.Find("ALMA/Cielo")); me.SetFloat("_Modo", 0); me.SetVector("_Claro", planeta.claro); me.SetFloat("_Caras", 1); me.renderQueue = 2980; estrellas.gameObject.AddComponent<MeshRenderer>().sharedMaterial = me;
            Vector3 lugar = planeta.Llegada; cam.transform.position = lugar * planeta.radio * 3.2f; mira = -lugar; Acomoda();
            // (the sun stands over the place one comes down on, at mid-morning: nobody arrives at night)
            sol.transform.rotation = Quaternion.LookRotation(-Vector3.Slerp(lugar, Vector3.Cross(lugar, Vector3.forward).normalized, 0.42f));
            hitos = planeta.gameObject.AddComponent<Hitos>(); hitos.Nace(planeta);
        }
        // The eye's near and far, its sky and its level, from how high it is: black in space, the air's color near the ground.
        public void Acomoda()
        {
            float alto = Mathf.Max(0.5f, planeta.Altitud(cam.transform.position)); Vector3 arriba = cam.transform.position.normalized;
            Ambiente(alto);
            Vector3 hacia = alto > planeta.radio ? mira : Vector3.Slerp(Vector3.ProjectOnPlane(mira, arriba).normalized, mira, 0.75f);
            cam.transform.rotation = Quaternion.LookRotation(hacia, alto > planeta.radio * 1.5f ? cam.transform.up : arriba);
        }
        public void Ambiente(float alto)
        {
            cam.nearClipPlane = Mathf.Clamp(alto * 0.05f, 0.15f, 60f); cam.farClipPlane = Mathf.Max(planeta.radio * 0.6f, cam.transform.position.magnitude + planeta.radio * 1.5f);
            planeta.Niebla(Mathf.Exp(-alto / (planeta.radio * 0.08f)));      // (the sky itself is the air's to paint: see Cielo.shader)
            if (estrellas != null) { estrellas.position = cam.transform.position; estrellas.localScale = Vector3.one * cam.farClipPlane * 0.9f; }
        }
        // One moment on foot: `mando` is where the legs want to go (x to the side, y ahead).
        public void Camina(float dt, Vector2 mando, bool corre, bool salta)
        {
            Vector3 p = cam.transform.position, arriba = p.normalized; frente = Vector3.ProjectOnPlane(frente, arriba).normalized; if (frente.sqrMagnitude < 0.5f) frente = Vector3.Cross(arriba, Vector3.right).normalized;
            Vector3 derecha = Vector3.Cross(arriba, frente), v = (frente * mando.y + derecha * mando.x) * (corre ? 11f : 5f);
            bool enElSuelo = planeta.Altitud(p) - OJOS <= 0.05f; if (enElSuelo) caida = salta ? 6f : 0f; else caida -= 9.8f * dt;
            p += v * dt + arriba * caida * dt; float sobra = planeta.Altitud(p) - OJOS; if (sobra < 0) { p -= p.normalized * sobra; if (caida < 0) caida = 0; }
            cam.transform.position = p; arriba = p.normalized; frente = Vector3.ProjectOnPlane(frente, arriba).normalized; inclina = Mathf.Clamp(inclina, -80f, 80f);
            cam.transform.rotation = Quaternion.LookRotation(Quaternion.AngleAxis(-inclina, Vector3.Cross(arriba, frente)) * frente, arriba); Ambiente(Mathf.Max(0.5f, planeta.Altitud(p)));
        }
        public void APie(bool si) { aPie = si; caida = 0; if (si) { frente = Vector3.ProjectOnPlane(cam.transform.forward, cam.transform.position.normalized).normalized; inclina = 0; } else mira = cam.transform.forward; }
        void Update()
        {
            if (!enVivo || cam == null) return; var t = Keyboard.current; var r = Mouse.current; if (t == null) return;
            if (t.fKey.wasPressedThisFrame) APie(!aPie);
            if (aPie)
            {
                if (r != null && r.rightButton.isPressed) { Vector2 d = r.delta.ReadValue() * 0.12f; frente = Quaternion.AngleAxis(d.x, cam.transform.position.normalized) * frente; inclina += d.y; }
                Camina(Mathf.Min(Time.deltaTime, 1f / 20f), new Vector2((t.dKey.isPressed ? 1 : 0) - (t.aKey.isPressed ? 1 : 0), (t.wKey.isPressed ? 1 : 0) - (t.sKey.isPressed ? 1 : 0)), t.shiftKey.isPressed, t.spaceKey.wasPressedThisFrame); return;
            }
            float alto = Mathf.Max(1f, planeta.Altitud(cam.transform.position)), paso = alto * 0.8f * (t.shiftKey.isPressed ? 4 : 1) * Time.deltaTime;
            Vector3 v = Vector3.zero; if (t.wKey.isPressed) v += cam.transform.forward; if (t.sKey.isPressed) v -= cam.transform.forward; if (t.dKey.isPressed) v += cam.transform.right; if (t.aKey.isPressed) v -= cam.transform.right;
            Vector3 arriba = cam.transform.position.normalized; if (t.eKey.isPressed) v += arriba; if (t.qKey.isPressed) v -= arriba;
            Vector3 p = cam.transform.position + v * paso; float suelo = planeta.Altitud(p); if (suelo < 1.7f) p += p.normalized * (1.7f - suelo); cam.transform.position = p;      // (it does not go through the ground: it stays at the height of someone's eyes)
            if (r != null && r.rightButton.isPressed) { Vector2 d = r.delta.ReadValue() * 0.12f; mira = Quaternion.AngleAxis(d.x, arriba) * Quaternion.AngleAxis(-d.y, cam.transform.right) * mira; }
            Acomoda();
        }
    }
}
