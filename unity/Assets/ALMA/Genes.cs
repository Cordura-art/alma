// What an ALMA entity gives other programs: the file `npm run genes -- <id>` writes (the same one Blender reads).
// Only what the character uses is declared; the rest of the file is ignored.
using System;
using System.IO;
using UnityEngine;

namespace Alma
{
    [Serializable] public class Puerta { public int n; public int l; }
    [Serializable] public class Pieza { public string @base; public string[] barras; public string acento; public string tinta; }
    [Serializable] public class Tema { public string @base, acento; }
    [Serializable] public class Fondos { public Tema dark; public Tema light; }
    [Serializable]
    public class Genes
    {
        public string semilla, tipo, direccion, autoridad;
        public float redondez = 0.5f, ritmo = 1f, trazo = 1f;
        public int puntas = 5, complejidad = 3, grupos = 1, focos = 3;
        public string[] centros = new string[0];
        public Puerta[] puertas = new Puerta[0];
        public int[] numeros = new int[0];
        public Pieza pieza; public Fondos fondo;
    }
    // The body and the walk ALMA worked out for the character (entidades/personaje.mjs): Blender reads the same ones.
    [Serializable] public class Medidas { public float alto = 1, ancho = 1, miembro = 1, cabeza = 1, cadera = 0.48f, panza = 0.8f, mano = 1, pie = 1, hombros = 1, brazo = 1, antebrazo = 1, muslo = 1, pierna = 1; public bool anguloso; }
    [Serializable] public class Andar { public float paso = 28, brazos = 20, rodilla = 50, desfase, inclina = -5, peso = 0.4f, cojera, rebote = 0.02f, balanceo = 4, ritmo = 1.2f; public string pataCoja = "I"; }
    [Serializable] public class Cuerpo { public string numero = ""; public Medidas medidas; public Andar andar; }
    // ALMA's coat tokens (family `pelaje`): what each kind of coat is like. Lengths are in heights of a plain character.
    [Serializable] public class ClaseDePelaje { public float largoMin = 0.07f, largoMax = 0.14f, caida = 0.7f, firmeza = 0.11f, grosor = 0.006f, densidad = 1f, radio; }
    [Serializable] public class Pelajes { public ClaseDePelaje pelo, rizo, pua, pluma, fleco; }
    [Serializable] public class Entidad { public string id, nombre; public Genes genes; public Cuerpo personaje; public Pelajes pelaje; public string[] nombres; }

    public static class Lector
    {
        public static Entidad Lee(string id)
        {
            var archivo = Path.Combine(Application.streamingAssetsPath, "genes", id + ".json");
            return JsonUtility.FromJson<Entidad>(File.ReadAllText(archivo));
        }
        // A token's color (#RRGGBB) as the renderer wants it.
        public static Color Tinta(string hex) { ColorUtility.TryParseHtmlString(hex, out var c); return c.linear; }
    }

    // Chance that is the same every time for the same words: an entity's date of birth always gives the same character.
    public class Azar
    {
        uint s;
        public Azar(string palabra) { s = 2166136261; foreach (var c in palabra) { s ^= c; s *= 16777619; } if (s == 0) s = 1; for (int i = 0; i < 8; i++) Uno(); }
        public float Uno() { s ^= s << 13; s ^= s >> 17; s ^= s << 5; return (s & 0xFFFFFF) / (float)0x1000000; }
        public float Entre(float a, float b) { return a + (b - a) * Uno(); }
    }
}
