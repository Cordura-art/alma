// The stage: black, a dark floor, one light, a camera at the side, and a character of each entity walking across,
// each at its own pace, as in a parade. It builds itself when the game starts, in whatever scene is open.
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Rendering;
using UnityEngine.Rendering.Universal;

namespace Alma
{
    public class Desfile : MonoBehaviour
    {
        public string[] ids = { "ensayo", "cordura", "automata" };
        public float separacion = 1.7f;      // how far apart they walk
        public float margen = 0.45f;          // how far past the edge of the picture one goes before it comes back in by the other side
        float medio;                         // half the length of the path: as many gaps as characters
        public bool enVivo = true;           // false while frames are being taken one by one (see Captura)
        public readonly List<Personaje> personajes = new List<Personaje>();
        readonly List<Transform> rotulos = new List<Transform>();

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.AfterSceneLoad)]
        static void Arranca() { if (FindFirstObjectByType<Desfile>() == null) new GameObject("ALMA desfile").AddComponent<Desfile>(); }

        void Start()
        {
            Application.runInBackground = true;
            var entidades = new List<Entidad>(); foreach (var id in ids) entidades.Add(Lector.Lee(id)); var G = entidades[0].genes;
            foreach (var c in FindObjectsByType<Camera>(FindObjectsSortMode.None)) c.gameObject.SetActive(false);
            foreach (var l in FindObjectsByType<Light>(FindObjectsSortMode.None)) l.gameObject.SetActive(false);
            foreach (var v in FindObjectsByType<Volume>(FindObjectsSortMode.None)) v.gameObject.SetActive(false);

            var cam = new GameObject("camara") { tag = "MainCamera" }.AddComponent<Camera>(); cam.clearFlags = CameraClearFlags.SolidColor; cam.backgroundColor = Lector.Tinta(G.fondo.dark.@base);
            medio = separacion * entidades.Count / 2f;
            // The camera stands just far enough to see the whole path but its two ends: there, out of sight, a character leaves and comes back.
            float mitadVista = Mathf.Max(1f, medio - margen), campo = 24f, lejos = mitadVista / (Mathf.Tan(campo * 0.5f * Mathf.Deg2Rad) * 16f / 9f);
            lejosDeCamara = lejos; cam.fieldOfView = campo; cam.transform.position = new Vector3(0, 0.7f, -lejos); cam.transform.LookAt(new Vector3(0, 0.6f, 0)); cam.nearClipPlane = 0.1f; cam.farClipPlane = 50; cam.allowHDR = false; cam.allowMSAA = true;
            if (GraphicsSettings.currentRenderPipeline is UniversalRenderPipelineAsset urp) { urp.msaaSampleCount = 4; urp.shadowDistance = 14; }      // thin hairs need smooth edges
            RenderSettings.ambientMode = AmbientMode.Flat; RenderSettings.ambientLight = Color.black; RenderSettings.fog = false; RenderSettings.reflectionIntensity = 0;

            // The light comes from above, a little in front and from the side the parade walks toward.
            var luz = new GameObject("luz").AddComponent<Light>(); luz.type = LightType.Directional; luz.intensity = 1.25f; luz.shadows = LightShadows.Soft; luz.shadowStrength = 0.85f; luz.shadowBias = 0.02f; luz.shadowNormalBias = 0.2f;
            luz.transform.rotation = Quaternion.Euler(48, -28, 0);
            var piso = GameObject.CreatePrimitive(PrimitiveType.Plane); piso.name = "piso"; Destroy(piso.GetComponent<Collider>()); piso.transform.localScale = Vector3.one * 6;
            var m = new Material(Shader.Find("Universal Render Pipeline/Lit")) { color = Lector.Tinta(G.pieza.@base) }; m.SetFloat("_Smoothness", 0f); piso.GetComponent<MeshRenderer>().sharedMaterial = m;

            // Seen from the side: each faces along x and walks from left to right, in its own lane.
            for (int i = 0; i < entidades.Count; i++)
            {
                var o = new GameObject(entidades[i].nombre); o.transform.position = new Vector3(-medio + 2f * medio * (i + 0.5f) / entidades.Count, 0, 0);
                o.transform.rotation = Quaternion.Euler(0, 90, 0); var p = o.AddComponent<Personaje>(); p.Nace(entidades[i]); personajes.Add(p);
                rotulos.Add(Rotulo(entidades[i], cam));
            }
        }
        // Its label: its number and its name, in ALMA's typeface (Roboto Flex at the system's width, grade and body
        // weight), standing on the floor in front of it, toward the camera.
        const float FRENTE = -1.5f; float lejosDeCamara = 5f;
        Transform Rotulo(Entidad e, Camera cam)
        {
            var fuente = Resources.Load<Font>("Fuentes/RobotoFlex-ALMA"); var raiz = new GameObject("rotulo de " + e.nombre).transform; if (fuente == null) return raiz;
            TextMesh Linea(string texto, float alto, float y, Color color)
            {
                var o = new GameObject(texto); o.transform.SetParent(raiz, false); o.transform.localPosition = new Vector3(0, y, 0);
                var t = o.AddComponent<TextMesh>(); t.font = fuente; t.fontSize = 96; t.characterSize = alto / 9.6f; t.anchor = TextAnchor.LowerCenter; t.alignment = TextAlignment.Center; t.text = texto; t.color = color;
                o.GetComponent<MeshRenderer>().sharedMaterial = fuente.material; return t;
            }
            Linea(e.nombre, 0.04f, 0.012f, Lector.Tinta(e.genes.pieza.tinta).gamma); Linea("#" + e.personaje.numero, 0.026f, 0.064f, Lector.Tinta(e.genes.pieza.barras[4]).gamma);
            return raiz;
        }
        void Update() { if (enVivo) Avanza(Mathf.Min(Time.deltaTime, 1f / 30f)); }
        // One moment of the parade. Each character has its own walk and its own speed, and yet they keep their places:
        // each one's time runs a little faster or slower, so that all advance at the pace of the group, and one that
        // has come too near the one ahead, or fallen behind, eases back to the middle of its gap. Its steps still
        // fit the ground it covers: it is its whole walk that goes quicker or slower, not its feet that slide.
        public void Avanza(float dt)
        {
            int n = personajes.Count; if (n == 0) return;
            float largo = 2f * medio, media = 0; foreach (var p in personajes) media += p.velocidad / n;
            for (int i = 0; i < n; i++)
            {
                var uno = personajes[i]; float x = uno.transform.position.x, delante = personajes[(i + 1) % n].transform.position.x, detras = personajes[(i + n - 1) % n].transform.position.x;
                float aDelante = Mathf.Repeat(delante - x, largo), aDetras = Mathf.Repeat(x - detras, largo); if (n == 1) aDelante = aDetras = largo;
                float ritmo = media / Mathf.Max(0.05f, uno.velocidad) * Mathf.Clamp(1f + 1.2f * (aDelante - aDetras) / largo, 0.75f, 1.25f), suyo = dt * ritmo;
                var q = uno.transform.position; q.x += uno.velocidad * suyo; bool vuelve = q.x > medio; if (vuelve) q.x -= largo; uno.transform.position = q;
                if (vuelve) uno.Salta(Vector3.left * largo);
                uno.Avanza(suyo);
                // The label stands nearer the camera than the character: it is moved toward the middle by as much, so that it is seen right under it.
                if (i < rotulos.Count) rotulos[i].position = new Vector3(q.x * (lejosDeCamara + FRENTE) / lejosDeCamara, 0, FRENTE);
            }
        }
    }
}
