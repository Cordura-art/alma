// The skin of an ALMA character: the pillows Blender blew up around its trunk, its legs and its shoes, as the file
// `blender/piloto.py --exporta` writes them (StreamingAssets/pieles/<id>.json). Each part says which bone carries it,
// what it is made of and its map; here they become meshes and materials. The file is written for Blender's axes.
using System;
using System.IO;
using UnityEngine;
using UnityEngine.Rendering;

namespace Alma
{
    [Serializable] public class Modo { public float n, m, a, s; }
    [Serializable] public class MaterialDePiel { public string nombre, clase; public float[] a, b; public bool estampa; }
    [Serializable]
    public class ParteDePiel
    {
        public string nombre, hueso, hueso2; public int material, n; public float[] medida;
        public string v, nor, uv, peso, tri;      // its points, the way each faces, its map, how much of each belongs to the second bone, its triangles
        public bool almohada, centro, oscura;
    }
    [Serializable]
    public class Piel
    {
        public string id, piel; public float suelo; public Modo[] patron; public MaterialDePiel[] materiales; public ParteDePiel[] partes;
        // An entity whose skin has not been made yet has none: it walks in its coat alone.
        public static Piel Lee(string id)
        {
            var archivo = Path.Combine(Application.streamingAssetsPath, "pieles", id + ".json");
            return File.Exists(archivo) ? JsonUtility.FromJson<Piel>(File.ReadAllText(archivo)) : null;
        }
    }

    public static class Pieles
    {
        static readonly string[] CLASES = { "pana", "punto", "vinilo", "goma", "gamuza" };
        static float[] Reales(string s) { if (string.IsNullOrEmpty(s)) return new float[0]; var b = Convert.FromBase64String(s); var f = new float[b.Length / 4]; Buffer.BlockCopy(b, 0, f, 0, f.Length * 4); return f; }
        static int[] Enteros(string s) { var b = Convert.FromBase64String(s); var f = new ushort[b.Length / 2]; Buffer.BlockCopy(b, 0, f, 0, f.Length * 2); return Array.ConvertAll(f, x => (int)x); }

        // A part as a mesh in the character's own space (x its right, y up, z where it faces), standing on the floor.
        public static Mesh Malla(ParteDePiel p, float suelo, out Vector3[] v, out Vector3[] n, out float[] peso)
        {
            float[] a = Reales(p.v), b = Reales(p.nor), c = Reales(p.uv); peso = Reales(p.peso); v = new Vector3[p.n]; n = new Vector3[p.n]; var uv = new Vector2[p.n];
            for (int i = 0; i < p.n; i++)
            {
                v[i] = new Vector3(-a[3 * i], a[3 * i + 2] + suelo, -a[3 * i + 1]); n[i] = new Vector3(-b[3 * i], b[3 * i + 2], -b[3 * i + 1]); uv[i] = new Vector2(c[2 * i], c[2 * i + 1]);
            }
            var tri = Enteros(p.tri); for (int i = 0; i < tri.Length; i += 3) (tri[i + 1], tri[i + 2]) = (tri[i + 2], tri[i + 1]);      // seen from outside, as Unity turns them
            if (p.almohada) Afina(ref v, ref n, ref uv, ref tri);
            var m = new Mesh { name = p.nombre, indexFormat = v.Length > 65000 ? IndexFormat.UInt32 : IndexFormat.UInt16 }; m.vertices = v; m.normals = n; m.uv = uv; m.triangles = tri; m.RecalculateBounds(); return m;
        }
        // A finer cloth: each triangle becomes four, and each new point leans out toward the round the cloth has there
        // (it is carried part of the way onto the planes its two neighbors lie on), so that a pillow's edge is a curve.
        static void Afina(ref Vector3[] v, ref Vector3[] n, ref Vector2[] uv, ref int[] tri)
        {
            var V = new System.Collections.Generic.List<Vector3>(v); var N = new System.Collections.Generic.List<Vector3>(n); var U = new System.Collections.Generic.List<Vector2>(uv);
            var medios = new System.Collections.Generic.Dictionary<long, int>(); var T = new int[tri.Length * 4]; Vector3[] v0 = v, n0 = n; Vector2[] uv0 = uv;
            int Medio(int a, int b)
            {
                long k = a < b ? ((long)a << 32) | (uint)b : ((long)b << 32) | (uint)a; if (medios.TryGetValue(k, out var i)) return i;
                Vector3 m = (v0[a] + v0[b]) * 0.5f, pa = m - Vector3.Dot(m - v0[a], n0[a]) * n0[a], pb = m - Vector3.Dot(m - v0[b], n0[b]) * n0[b];
                V.Add(Vector3.Lerp(m, (pa + pb) * 0.5f, 0.65f)); N.Add((n0[a] + n0[b]).normalized); U.Add((uv0[a] + uv0[b]) * 0.5f); medios[k] = V.Count - 1; return V.Count - 1;
            }
            for (int t = 0; t < tri.Length; t += 3)
            {
                int a = tri[t], b = tri[t + 1], c = tri[t + 2], ab = Medio(a, b), bc = Medio(b, c), ca = Medio(c, a); int o = t * 4;
                T[o] = a; T[o + 1] = ab; T[o + 2] = ca; T[o + 3] = ab; T[o + 4] = b; T[o + 5] = bc; T[o + 6] = ca; T[o + 7] = bc; T[o + 8] = c; T[o + 9] = ab; T[o + 10] = bc; T[o + 11] = ca;
            }
            v = V.ToArray(); n = N.ToArray(); uv = U.ToArray(); tri = T;
        }

        public static Color Tinta(float[] c) { return new Color(c[0], c[1], c[2], 1); }

        // What a part is made of. The pattern is the entity's own (entidades/patron.mjs), worked out again on the card.
        public static Material Material(Piel piel, ParteDePiel p)
        {
            var d = piel.materiales[p.material]; int clase = Mathf.Max(0, Array.IndexOf(CLASES, d.clase)); var m = new Material(Shader.Find("ALMA/Piel")) { name = d.nombre };
            m.SetVector("_A", Tinta(d.a)); m.SetVector("_B", Tinta(d.b)); m.SetFloat("_Clase", clase); m.SetVector("_Medida", new Vector4(p.medida[0], p.medida[1], 0, 0));
            // How the pattern lies on it: twice around, so that it closes on itself; knit shows it always, as a second yarn.
            bool usa = d.estampa || clase == 1; m.SetVector("_Patron", new Vector4(2f, clase == 1 ? 0.8f : 0.9f, clase == 1 ? 0.04f : clase == 2 ? 0.02f : 0.03f, usa ? 1 : 0));
            var modos = new Vector4[6]; int k = Mathf.Min(6, piel.patron.Length); for (int i = 0; i < k; i++) modos[i] = new Vector4(piel.patron[i].n, piel.patron[i].m, piel.patron[i].a, piel.patron[i].s);
            m.SetVectorArray("_Modos", modos); m.SetFloat("_Cuantos", k); return m;
        }
    }
}
