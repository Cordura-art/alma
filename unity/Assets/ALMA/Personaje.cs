// A character of an ALMA entity, alive: bones, a body of lumps on them, a coat that moves, and a walk of its own.
// Everything comes from the entity's genes; its measures and its walk are the ones ALMA worked out
// (entidades/personaje.mjs), the same ones Blender reads. One unit is the height of a plain character; x is its
// right, y is up and z is where it faces.
using System;
using System.Collections.Generic;
using Unity.Burst;
using Unity.Collections;
using Unity.Collections.LowLevel.Unsafe;
using Unity.Jobs;
using Unity.Mathematics;
using UnityEngine;
using UnityEngine.Rendering;

namespace Alma
{
    public class Personaje : MonoBehaviour
    {
        public Entidad entidad;
        public int hebras = 44000;           // how many hairs a coat of plain hair would have (feathers and fringes are fewer)
        const int TRAMOS = 7;                // segments in each one

        Genes G; Medidas C; Andar A; Dictionary<string, Vector3> J;
        readonly Dictionary<string, Transform> huesos = new Dictionary<string, Transform>();
        struct Bulto { public Vector3 p; public float r; public string hueso; public bool centro; }
        readonly List<Bulto> bultos = new List<Bulto>();
        static readonly Dictionary<string, string[]> HUESOS = Huesos();
        Vector3 caderaEnReposo; float piernaLarga, reloj;
        public float velocidad { get; private set; }

        // Where each center sits on a plain character, as the files give it (Blender's axes), its bone and its size.
        static readonly Dictionary<string, (Vector3 p, string hueso, float r)> CENTROS = new Dictionary<string, (Vector3, string, float)> {
            { "cabeza", (new Vector3(0, 0, 1f), "cabeza", 0.085f) }, { "ajna", (new Vector3(0, -0.075f, 0.945f), "cabeza", 0.062f) }, { "garganta", (new Vector3(0, -0.04f, 0.775f), "pecho", 0.075f) },
            { "g", (new Vector3(0, -0.1f, 0.67f), "pecho", 0.085f) }, { "corazon", (new Vector3(0.075f, -0.085f, 0.635f), "pecho", 0.07f) }, { "bazo", (new Vector3(-0.115f, -0.03f, 0.56f), "columna", 0.078f) },
            { "plexo", (new Vector3(0.115f, -0.03f, 0.56f), "columna", 0.078f) }, { "sacral", (new Vector3(0, -0.09f, 0.5f), "cadera", 0.085f) }, { "raiz", (new Vector3(0, 0.07f, 0.445f), "cadera", 0.1f) } };
        static readonly string[] ZONAS = { "cabeza", "pecho", "columna", "cadera", "hombro", "brazo", "antebrazo", "mano", "muslo", "pierna", "pie" };

        static Dictionary<string, string[]> Huesos()
        {
            // name: from, to, parent — parents first.
            var h = new Dictionary<string, string[]> { { "cadera", new[] { "cadera", "cintura", null } }, { "columna", new[] { "cintura", "pecho", "cadera" } }, { "pecho", new[] { "pecho", "cuello", "columna" } }, { "cabeza", new[] { "cuello", "coronilla", "pecho" } } };
            foreach (var L in new[] { "I", "D" })
            {
                h["hombro." + L] = new[] { "cuello", "hombro." + L, "pecho" }; h["brazo." + L] = new[] { "hombro." + L, "codo." + L, "hombro." + L }; h["antebrazo." + L] = new[] { "codo." + L, "muneca." + L, "brazo." + L };
                h["mano." + L] = new[] { "muneca." + L, "dedos." + L, "antebrazo." + L }; h["muslo." + L] = new[] { "ingle." + L, "rodilla." + L, "cadera" }; h["pierna." + L] = new[] { "rodilla." + L, "tobillo." + L, "muslo." + L };
                h["pie." + L] = new[] { "tobillo." + L, "punta." + L, "pierna." + L };
            }
            return h;
        }
        // The files are written for Blender (x to the character's left, y back, z up); here x is its right, y up, z front.
        static Vector3 DeBlender(float x, float y, float z) { return new Vector3(-x, z, -y); }
        float Altura(float z) { float c = C.cadera * C.alto; return z <= 0.48f ? z / 0.48f * c : c + (z - 0.48f) / 0.52f * (C.alto - c); }

        void Articulaciones()
        {
            float a = C.ancho, h = C.ancho * C.hombros;
            J = new Dictionary<string, Vector3> { { "cadera", DeBlender(0, 0, Altura(0.48f)) }, { "cintura", DeBlender(0, 0, Altura(0.56f)) }, { "pecho", DeBlender(0, 0, Altura(0.64f)) }, { "cuello", DeBlender(0, 0, Altura(0.77f)) },
                { "coronilla", DeBlender(0, 0, Altura(0.77f) + 0.2f * C.cabeza) } };
            foreach (var (L, s) in new[] { ("I", 1f), ("D", -1f) })
            {
                J["hombro." + L] = DeBlender(s * 0.115f * h, 0, Altura(0.745f)); J["codo." + L] = DeBlender(s * (0.115f * h + 0.085f), 0.01f, Altura(0.6f));
                J["muneca." + L] = DeBlender(s * (0.115f * h + 0.13f), -0.03f, Altura(0.46f)); J["dedos." + L] = DeBlender(s * (0.115f * h + 0.14f), -0.045f, Altura(0.46f) - 0.07f);
                J["ingle." + L] = DeBlender(s * 0.07f * a, 0, Altura(0.47f)); J["rodilla." + L] = DeBlender(s * (0.07f * a + 0.015f), -0.015f, Altura(0.265f));
                J["tobillo." + L] = DeBlender(s * (0.07f * a + 0.025f), 0.01f, 0.06f); J["punta." + L] = DeBlender(s * (0.07f * a + 0.035f), -0.11f * C.pie, 0.035f);
            }
        }
        void Esqueleto()
        {
            foreach (var k in HUESOS)
            {
                var o = new GameObject(k.Key).transform; o.SetParent(k.Value[2] == null ? transform : huesos[k.Value[2]], false);
                o.position = transform.TransformPoint(J[k.Value[0]]); huesos[k.Key] = o;
            }
            caderaEnReposo = huesos["cadera"].localPosition;
        }
        void Tramo(string hueso, float r0, float r1, float panza = 0)
        {
            Vector3 p0 = J[HUESOS[hueso][0]], p1 = J[HUESOS[hueso][1]]; int n = Mathf.Max(3, Mathf.CeilToInt((p1 - p0).magnitude / (0.3f * Mathf.Min(r0, r1))));
            for (int i = 0; i <= n; i++)
            {
                float t = i / (float)n, s = Mathf.Sin(Mathf.PI * t), r = C.anguloso ? (r0 + r1) / 2 : Mathf.Lerp(r0, r1, t) * (1 + panza * C.panza * s * s);
                bultos.Add(new Bulto { p = Vector3.Lerp(p0, p1, t), r = r, hueso = hueso });
            }
        }
        void Bultos()
        {
            float a = C.ancho, m = C.miembro, cintura = G.grupos == 1 ? 0.092f * a : 0.066f * a;
            Tramo("cadera", 0.105f * a, cintura); Tramo("columna", cintura, 0.1f * a); Tramo("pecho", 0.112f * a * C.hombros, 0.07f * a, 0.15f);
            bultos.Add(new Bulto { p = Vector3.Lerp(J["cuello"], J["coronilla"], 0.58f), r = 0.108f * C.cabeza, hueso = "cabeza" }); bultos.Add(new Bulto { p = Vector3.Lerp(J["cuello"], J["coronilla"], 0.1f), r = 0.05f, hueso = "cabeza" });
            foreach (var L in new[] { "I", "D" })
            {
                Tramo("hombro." + L, 0.058f * m, 0.056f * m); Tramo("brazo." + L, 0.044f * m, 0.04f * m, 0.35f); Tramo("antebrazo." + L, 0.036f * m, 0.04f * m, 0.6f);
                bultos.Add(new Bulto { p = J["dedos." + L], r = 0.045f * m * C.mano, hueso = "mano." + L });
                Tramo("muslo." + L, 0.07f * m, 0.05f * m, 0.4f); Tramo("pierna." + L, 0.044f * m, 0.05f * m, 0.75f); Tramo("pie." + L, 0.05f * m * C.pie, 0.046f * m * C.pie);
            }
            for (int i = 0; i < G.centros.Length; i++)          // a mass on each defined center
            {
                if (!CENTROS.TryGetValue(G.centros[i], out var c)) continue;
                int num = G.numeros.Length > 0 ? G.numeros[i % G.numeros.Length] : 4;
                bultos.Add(new Bulto { p = DeBlender(c.p.x * a, c.p.y * a, Altura(c.p.z)), r = c.r * (0.95f + 0.04f * num), hueso = c.hueso, centro = true });
            }
        }

        // ---------- The body under the coat: the lumps, dark (balls, or boxes lying along their bone for an entity of
        // blocks). It is hardly seen; the coat needs something behind it.
        void Cuerpo(Color tinta)
        {
            var mat = new Material(Shader.Find("Universal Render Pipeline/Lit")) { color = tinta }; mat.SetFloat("_Smoothness", 0.1f);
            foreach (var b in bultos)
            {
                var o = GameObject.CreatePrimitive(C.anguloso ? PrimitiveType.Cube : PrimitiveType.Sphere); Destroy(o.GetComponent<Collider>());
                o.transform.SetParent(huesos[b.hueso], false); o.transform.position = transform.TransformPoint(b.p); o.transform.localScale = Vector3.one * b.r * (C.anguloso ? 1.7f : 2f);
                if (C.anguloso) { var d = J[HUESOS[b.hueso][1]] - J[HUESOS[b.hueso][0]]; if (d.sqrMagnitude > 1e-6f) o.transform.rotation = transform.rotation * Quaternion.LookRotation(d.normalized, Mathf.Abs(d.normalized.y) > 0.9f ? Vector3.forward : Vector3.up); }
                o.GetComponent<MeshRenderer>().sharedMaterial = mat;
            }
        }

        // ---------- The coat. Each strand is rooted on a lump and tied to that lump's bone. Each zone of the body wears
        // its own kind, in its own pair of the entity's colors:
        //   pelo   thin hair that falls            rizo   hair that curls
        //   púa    short, thick and stiff          pluma  a few wide leaves, flat against the body
        //   fleco  long flat strips that hang and swing
        enum Clase { Pelo, Rizo, Pua, Pluma, Fleco }
        struct Estilo { public Clase clase; public float largo, cae, firme, rizo, grueso, densidad; public Color raiz, punta; }
        // The coat lives in plain arrays that a job works on, all the processor's cores at once (see Hebras, below).
        Transform[] huesoDe; NativeArray<float4x4> matriz; NativeArray<int> raizHueso; NativeArray<float3> raizLugar, raizNormal, P, Antes, vertices, normales, hebrasT;
        NativeArray<float> largo, cae, firme, rizo, fase, grueso; NativeArray<byte> clase; Mesh malla; GameObject peloObjeto;

        Estilo EstiloDe(Clase k, Azar R, (Color, Color) par)
        {
            var e = new Estilo { clase = k, raiz = par.Item1, punta = par.Item2, densidad = 1 };
            switch (k)
            {
                case Clase.Pelo: e.largo = R.Entre(0.07f, 0.14f); e.cae = R.Entre(0.4f, 1f); e.firme = R.Entre(0.06f, 0.16f); e.grueso = R.Entre(0.005f, 0.0075f); break;
                case Clase.Rizo: e.largo = R.Entre(0.06f, 0.11f); e.cae = R.Entre(0.2f, 0.6f); e.firme = R.Entre(0.15f, 0.28f); e.rizo = R.Entre(0.014f, 0.028f); e.grueso = R.Entre(0.0045f, 0.006f); break;
                case Clase.Pua: e.largo = R.Entre(0.05f, 0.1f); e.cae = 0.02f; e.firme = R.Entre(0.5f, 0.7f); e.grueso = R.Entre(0.008f, 0.012f); e.densidad = 0.5f; break;
                case Clase.Pluma: e.largo = R.Entre(0.12f, 0.2f); e.cae = R.Entre(0.25f, 0.55f); e.firme = R.Entre(0.2f, 0.34f); e.grueso = R.Entre(0.016f, 0.026f); e.densidad = 0.2f; break;
                default: e.largo = R.Entre(0.16f, 0.26f); e.cae = 1.5f; e.firme = R.Entre(0.03f, 0.07f); e.grueso = R.Entre(0.005f, 0.008f); e.densidad = 0.65f; break;
            }
            return e;
        }
        void Pelaje()
        {
            Color[] b = Array.ConvertAll(G.pieza.barras, Lector.Tinta); Color acento = Lector.Tinta(G.pieza.acento), tinta = Lector.Tinta(G.pieza.tinta);
            var pares = new[] { (b[1], b[0]), (b[3], b[2]), (acento, b[0]), (b[1], tinta), (b[3], acento), (b[0], b[2]) };
            // The kinds, in an order of the entity's own; each zone takes the next one. An entity of blocks has no curls:
            // its hair is stiff.
            var RO = new Azar(G.semilla + "|clases"); var clases = new List<Clase> { Clase.Pelo, Clase.Rizo, Clase.Pua, Clase.Pluma, Clase.Fleco };
            for (int i = clases.Count - 1; i > 0; i--) { int j = (int)(RO.Uno() * (i + 1)) % (i + 1); (clases[i], clases[j]) = (clases[j], clases[i]); }
            if (C.anguloso) for (int i = 0; i < clases.Count; i++) if (clases[i] == Clase.Rizo) clases[i] = Clase.Pua;
            var puertasEn = new Dictionary<string, int>(); foreach (var g in G.puertas) { var z = ZONAS[g.n % ZONAS.Length]; puertasEn[z] = (puertasEn.TryGetValue(z, out var v) ? v : 0) + 1; }
            var estilos = new Dictionary<string, Estilo>();
            Estilo De(string zona)
            {
                if (estilos.TryGetValue(zona, out var e)) return e;
                var R = new Azar(G.semilla + "|pelo|" + zona); bool centro = zona.StartsWith("centro"); int z = Array.IndexOf(ZONAS, zona);
                var par = pares[(int)(R.Uno() * pares.Length) % pares.Length];
                if (centro) { e = EstiloDe(Clase.Pluma, R, (b[3], tinta)); e.largo *= 1.15f; }         // a crest of feathers on each defined center
                else { e = EstiloDe(clases[(z + 2 * (z / clases.Count)) % clases.Count], R, par); if (puertasEn.TryGetValue(zona, out var n) && n >= 3) e.largo *= 1.5f; }
                return estilos[zona] = e;
            }
            float area = 0; foreach (var x in bultos) area += x.r * x.r;
            var nombres = new List<string>(huesos.Keys); huesoDe = new Transform[nombres.Count]; for (int i = 0; i < nombres.Count; i++) huesoDe[i] = huesos[nombres[i]]; matriz = new NativeArray<float4x4>(nombres.Count, Allocator.Persistent);
            var hueso = new List<int>(); var lugar = new List<Vector3>(); var normal = new List<Vector3>(); var est = new List<Estilo>(); var R0 = new Azar(G.semilla + "|raices");
            for (int k = 0; k < bultos.Count; k++)
            {
                var x = bultos[k]; var e = De(x.centro ? "centro" + k : x.hueso.Split('.')[0]); int ih = nombres.IndexOf(x.hueso); var h = huesoDe[ih];
                int n = Mathf.Max(4, Mathf.RoundToInt(hebras * 1.9f * e.densidad * x.r * x.r / area)); float giro = R0.Uno() * 6.283f;
                for (int i = 0; i < n; i++)
                {
                    float y = 1 - 2 * (i + 0.5f) / n, rr = Mathf.Sqrt(1 - y * y), th = i * 2.39996f + giro; var d = new Vector3(Mathf.Cos(th) * rr, y, Mathf.Sin(th) * rr); var p = x.p + d * x.r; bool tapado = false;
                    if (C.anguloso)
                    {
                        // On a box: the root goes to the box's face, and the strand grows straight out of that face.
                        var eje = J[HUESOS[x.hueso][1]] - J[HUESOS[x.hueso][0]]; var q = eje.sqrMagnitude > 1e-6f ? Quaternion.LookRotation(eje.normalized, Mathf.Abs(eje.normalized.y) > 0.9f ? Vector3.forward : Vector3.up) : Quaternion.identity;
                        float ax = Mathf.Abs(d.x), ay = Mathf.Abs(d.y), az = Mathf.Abs(d.z), mx = Mathf.Max(ax, Mathf.Max(ay, az)); p = x.p + q * (d / mx) * (x.r * 0.85f);
                        d = q * (ax >= ay && ax >= az ? new Vector3(Mathf.Sign(d.x), 0, 0) : ay >= az ? new Vector3(0, Mathf.Sign(d.y), 0) : new Vector3(0, 0, Mathf.Sign(d.z)));
                    }
                    for (int j = 0; j < bultos.Count && !tapado; j++) if (j != k && (p - bultos[j].p).sqrMagnitude < bultos[j].r * bultos[j].r * 0.97f) tapado = true;
                    if (tapado) continue;
                    hueso.Add(ih); lugar.Add(h.InverseTransformPoint(transform.TransformPoint(p))); normal.Add(h.InverseTransformDirection(transform.TransformDirection(d))); est.Add(e);
                }
            }
            int N = hueso.Count, S = TRAMOS + 1; const Allocator siempre = Allocator.Persistent;
            raizHueso = new NativeArray<int>(hueso.ToArray(), siempre); raizLugar = new NativeArray<float3>(N, siempre); raizNormal = new NativeArray<float3>(N, siempre);
            for (int i = 0; i < N; i++) { raizLugar[i] = lugar[i]; raizNormal[i] = normal[i]; }
            P = new NativeArray<float3>(N * S, siempre); Antes = new NativeArray<float3>(N * S, siempre); vertices = new NativeArray<float3>(N * S * 2, siempre); normales = new NativeArray<float3>(N * S * 2, siempre); hebrasT = new NativeArray<float3>(N * S * 2, siempre);
            largo = new NativeArray<float>(N, siempre); cae = new NativeArray<float>(N, siempre); firme = new NativeArray<float>(N, siempre); rizo = new NativeArray<float>(N, siempre); fase = new NativeArray<float>(N, siempre); grueso = new NativeArray<float>(N, siempre); clase = new NativeArray<byte>(N, siempre);
            var colores = new Color[N * S * 2]; var tri = new int[N * TRAMOS * 6]; var R1 = new Azar(G.semilla + "|hebras");
            for (int i = 0; i < N; i++)
            {
                var e = est[i]; clase[i] = (byte)e.clase; largo[i] = e.largo * R1.Entre(0.7f, 1.2f); cae[i] = e.cae; firme[i] = e.firme; rizo[i] = e.rizo; fase[i] = R1.Uno() * 6.283f; grueso[i] = e.grueso * R1.Entre(0.8f, 1.2f);
                float matiz = R1.Entre(0.86f, 1.1f); bool pluma = e.clase == Clase.Pluma;
                for (int s = 0; s < S; s++)
                {
                    // Darker at the root, where the coat is deep. A feather has a darker spine: its two edges are lighter.
                    float t = s / (float)TRAMOS; var c = Color.Lerp(e.raiz * 0.4f, e.punta, Mathf.Pow(t, 0.75f)) * matiz; c.a = 1; colores[(i * S + s) * 2] = pluma ? c * 0.78f : c; colores[(i * S + s) * 2 + 1] = c; colores[(i * S + s) * 2].a = 1;
                    if (s < TRAMOS) { int v = (i * S + s) * 2, q = (i * TRAMOS + s) * 6; tri[q] = v; tri[q + 1] = v + 2; tri[q + 2] = v + 1; tri[q + 3] = v + 1; tri[q + 4] = v + 2; tri[q + 5] = v + 3; }
                }
            }
            cuantas = N; malla = new Mesh { indexFormat = IndexFormat.UInt32, name = "pelaje de " + entidad.nombre }; malla.MarkDynamic(); Hebras(0f, true);
            malla.colors = colores; malla.triangles = tri; malla.bounds = new Bounds(Vector3.zero, Vector3.one * 100);
            peloObjeto = new GameObject("pelaje de " + entidad.nombre); peloObjeto.AddComponent<MeshFilter>().sharedMesh = malla; var r = peloObjeto.AddComponent<MeshRenderer>();
            r.sharedMaterial = new Material(Shader.Find("ALMA/Pelo")); r.shadowCastingMode = ShadowCastingMode.On; r.receiveShadows = true;
        }
        public int cuantas { get; private set; }
        // One moment of the coat, one strand at a time, many strands at once.
        //   Its place at rest: out from the body, then falling (and curling, if it curls).
        //   Its own movement: each point keeps going as it was, gravity pulls it, its strand pulls it back toward its
        //   place (less toward the tip) and keeps its length. So the coat lags behind the body, swings and settles.
        //   Its ribbon: hair turns to face the camera and tapers; a spike tapers to a point; a feather is a leaf, flat
        //   against the body; a fringe is a flat strip of one width.
        [BurstCompile(CompileSynchronously = true, FloatMode = FloatMode.Fast)]
        struct Trabajo : IJobParallelFor
        {
            [ReadOnly] public NativeArray<float4x4> matriz; [ReadOnly] public NativeArray<int> raizHueso; [ReadOnly] public NativeArray<float3> raizLugar, raizNormal;
            [ReadOnly] public NativeArray<float> largo, cae, firme, rizo, fase, grueso; [ReadOnly] public NativeArray<byte> clase;
            [NativeDisableParallelForRestriction] public NativeArray<float3> P, Antes, vertices, normales, hebrasT;
            public float3 camara, gravedad; public bool enReposo;
            public void Execute(int i)
            {
                const int S = TRAMOS + 1; var m = matriz[raizHueso[i]]; float3 raiz = math.mul(m, new float4(raizLugar[i], 1)).xyz, n = math.normalizesafe(math.mul(m, new float4(raizNormal[i], 0)).xyz, new float3(0, 1, 0));
                float3 arriba = new float3(0, 1, 0), abajo = new float3(0, -1, 0), t1 = math.normalizesafe(math.cross(n, arriba), new float3(1, 0, 0)), t2 = math.cross(n, t1);
                float seg = largo[i] / TRAMOS, f0 = firme[i]; int o = i * S; var p = raiz; P[o] = raiz; if (enReposo) Antes[o] = raiz;
                for (int s = 1; s < S; s++)
                {
                    float t = s / (float)TRAMOS; p += math.normalizesafe(math.lerp(n, abajo, math.saturate(cae[i] * t)), n) * seg; var q = p;
                    if (rizo[i] > 0) q += (t1 * math.cos(fase[i] + s * 1.4f) + t2 * math.sin(fase[i] + s * 1.4f)) * rizo[i] * t;
                    if (enReposo) { P[o + s] = q; Antes[o + s] = q; continue; }
                    var a = P[o + s]; var v = (a - Antes[o + s]) * 0.86f; Antes[o + s] = a; a += v + gravedad; a = math.lerp(a, q, f0 * (1f - 0.65f * t));
                    var d = a - P[o + s - 1]; float l = math.length(d); if (l > 1e-6f) a = P[o + s - 1] + d * (seg / l); P[o + s] = a;
                }
                int k = clase[i]; bool plano = k == (int)Clase.Pluma || k == (int)Clase.Fleco;
                for (int s = 0; s < S; s++)
                {
                    var c = P[o + s]; var d = P[o + math.min(s + 1, TRAMOS)] - P[o + math.max(s - 1, 0)]; var lado = math.cross(d, plano ? n : camara - c);
                    if (math.lengthsq(lado) < 1e-14f) lado = math.cross(d, camara - c); lado = math.normalizesafe(lado, new float3(1, 0, 0));
                    float t = s / (float)TRAMOS, w = grueso[i] * (k == (int)Clase.Pluma ? math.pow(math.max(0f, math.sin(math.PI * (0.06f + 0.94f * t))), 0.7f) : k == (int)Clase.Fleco ? 1f : k == (int)Clase.Pua ? 1f - t : 1f - 0.85f * t);
                    int u = (o + s) * 2; vertices[u] = c - lado * w; vertices[u + 1] = c + lado * w;
                    var nn = n; if (plano) { nn = math.normalizesafe(math.cross(lado, d), n); if (math.dot(nn, n) < 0) nn = -nn; }
                    normales[u] = nn; normales[u + 1] = nn; hebrasT[u] = d; hebrasT[u + 1] = d;
                }
            }
        }
        void Hebras(float dt, bool enReposo)
        {
            for (int i = 0; i < huesoDe.Length; i++) matriz[i] = huesoDe[i].localToWorldMatrix;
            var cam = Camera.main != null ? Camera.main.transform.position : new Vector3(0, 0.6f, -3f);
            new Trabajo { matriz = matriz, raizHueso = raizHueso, raizLugar = raizLugar, raizNormal = raizNormal, largo = largo, cae = cae, firme = firme, rizo = rizo, fase = fase, grueso = grueso, clase = clase,
                P = P, Antes = Antes, vertices = vertices, normales = normales, hebrasT = hebrasT, camara = cam, gravedad = new float3(0, -2.2f * dt * dt, 0), enReposo = enReposo }.Schedule(cuantas, 128).Complete();
            malla.SetVertices(vertices); malla.SetNormals(normales); malla.SetUVs(1, hebrasT);
        }

        // ---------- The walk. Every swing is around the character's own side, the sway of its trunk around its upright
        // axis and the roll of its weight around where it faces; each bone gets the sum of the turns down to it.
        //   weight   a heavy one rolls from side to side and sinks into each step; a light one bounces.
        //   posture  it leans forward from the waist, more at the chest; the head lifts back a little to look ahead.
        //   limp     the lame leg takes a short step and the body hurries off it, dipping to that side.
        void Camina(float t)
        {
            float f0 = 6.2832f * t / Mathf.Max(0.4f, A.ritmo) + A.desfase, coja = A.pataCoja == "I" ? 0f : Mathf.PI;
            float f = f0 + 0.55f * A.cojera * Mathf.Cos(f0 + coja);                                  // time runs unevenly: quick over the lame leg
            float apoyoCojo = Mathf.Max(0, Mathf.Sin(f + coja));                                      // 1 while the lame leg carries the body
            Vector3 lado = Vector3.right, frente = Vector3.forward; float signo = A.pataCoja == "I" ? -1f : 1f;
            float rueda = A.balanceo * Mathf.Sin(f) + signo * 7f * A.cojera * apoyoCojo;              // roll: the sway of its weight, and the dip of the limp
            var cuerpo = transform.rotation * Quaternion.AngleAxis(rueda, frente); var giro = Quaternion.AngleAxis(5f * Mathf.Sin(f), Vector3.up);
            var c = huesos["cadera"];
            float baja = piernaLarga * (1 - Mathf.Cos(A.paso * Mathf.Deg2Rad * Mathf.Sin(f))) + 0.03f * A.peso * Mathf.Abs(Mathf.Sin(f)) + 0.03f * A.cojera * apoyoCojo, sube = A.rebote * Mathf.Abs(Mathf.Cos(f));
            c.localPosition = caderaEnReposo + Vector3.up * (sube - baja) + Vector3.right * (0.02f * A.peso * Mathf.Sin(f));
            c.rotation = cuerpo; huesos["columna"].rotation = cuerpo * giro * Quaternion.AngleAxis(A.inclina * 0.5f, lado); var pecho = cuerpo * giro * Quaternion.AngleAxis(A.inclina, lado); huesos["pecho"].rotation = pecho;
            huesos["cabeza"].rotation = transform.rotation * Quaternion.AngleAxis(rueda * 0.4f, frente) * Quaternion.AngleAxis(A.inclina * 0.45f + 2f * Mathf.Sin(2 * f), lado);
            foreach (var (L, s) in new[] { ("I", 0f), ("D", Mathf.PI) })
            {
                float a = f + s, corto = (L == A.pataCoja) ? 1f - 0.5f * A.cojera : 1f;
                float muslo = -A.paso * corto * Mathf.Sin(a), dobla = A.rodilla * corto * Mathf.Pow(Mathf.Max(0, Mathf.Cos(a)), 1.5f) + 4f + 10f * A.peso;
                float brazo = A.brazos * Mathf.Sin(a), codo = -14f - 16f * A.peso - A.brazos * 0.5f * Mathf.Max(0, -Mathf.Sin(a));
                huesos["muslo." + L].rotation = transform.rotation * Quaternion.AngleAxis(muslo - 6f * A.peso, lado); huesos["pierna." + L].rotation = transform.rotation * Quaternion.AngleAxis(muslo + dobla - 6f * A.peso, lado);
                huesos["pie." + L].rotation = transform.rotation * Quaternion.AngleAxis(0.4f * muslo + 0.5f * dobla - 4f, lado);
                huesos["hombro." + L].rotation = pecho; huesos["brazo." + L].rotation = cuerpo * giro * Quaternion.AngleAxis(brazo + A.inclina * 0.3f, lado);
                huesos["antebrazo." + L].rotation = huesos["mano." + L].rotation = cuerpo * giro * Quaternion.AngleAxis(brazo + codo, lado);
            }
        }

        public void Nace(Entidad e)
        {
            entidad = e; G = e.genes; C = e.personaje.medidas; A = e.personaje.andar; Articulaciones(); Esqueleto(); Bultos();
            piernaLarga = C.cadera * C.alto; velocidad = 4f * piernaLarga * Mathf.Sin(A.paso * Mathf.Deg2Rad) * (1f - 0.3f * A.cojera) / Mathf.Max(0.4f, A.ritmo);
            Cuerpo(Lector.Tinta(G.pieza.barras[1]) * 0.25f); Pelaje();      // the coat takes root while the body stands at rest
            Camina(0); Hebras(0f, true);
        }
        // One moment of its life: it takes a bit of its step and its coat follows.
        public void Avanza(float dt)
        {
            if (!P.IsCreated) return;
            reloj += dt; Camina(reloj); Hebras(dt, false);
        }
        // Seen or not: its body and its coat together.
        public void Muestra(bool si) { gameObject.SetActive(si); if (peloObjeto) peloObjeto.SetActive(si); }
        // The character was moved at once (it left by one side of the stage and comes in by the other): its coat goes with it.
        public void Salta(Vector3 cuanto) { if (!P.IsCreated) return; float3 c = cuanto; for (int i = 0; i < P.Length; i++) { P[i] += c; Antes[i] += c; } }
        void OnDestroy()
        {
            if (peloObjeto) Destroy(peloObjeto);
            if (!P.IsCreated) return;
            matriz.Dispose(); raizHueso.Dispose(); raizLugar.Dispose(); raizNormal.Dispose(); P.Dispose(); Antes.Dispose(); vertices.Dispose(); normales.Dispose(); hebrasT.Dispose();
            largo.Dispose(); cae.Dispose(); firme.Dispose(); rizo.Dispose(); fase.Dispose(); grueso.Dispose(); clase.Dispose();
        }
    }
}
