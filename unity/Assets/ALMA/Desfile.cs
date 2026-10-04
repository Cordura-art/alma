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
        public float medio = 2.9f;           // half the width of the stage: a character leaves by one side and comes back by the other
        public bool enVivo = true;           // false while frames are being taken one by one (see Captura)
        public readonly List<Personaje> personajes = new List<Personaje>();

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
            cam.fieldOfView = 24; cam.transform.position = new Vector3(0, 0.7f, -5.4f); cam.transform.LookAt(new Vector3(0, 0.62f, 0)); cam.nearClipPlane = 0.1f; cam.farClipPlane = 50; cam.allowHDR = false; cam.allowMSAA = true;
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
                var o = new GameObject(entidades[i].nombre); o.transform.position = new Vector3(-medio + 2f * medio * (i + 0.5f) / entidades.Count, 0, (i % 2 == 0 ? 0.18f : -0.18f) * (i == 0 ? 0 : 1));
                o.transform.rotation = Quaternion.Euler(0, 90, 0); var p = o.AddComponent<Personaje>(); p.Nace(entidades[i]); personajes.Add(p);
            }
        }
        void Update() { if (enVivo) Avanza(Mathf.Min(Time.deltaTime, 1f / 30f)); }
        public void Avanza(float dt)
        {
            foreach (var personaje in personajes)
            {
                var p = personaje.transform.position; p.x += personaje.velocidad * dt; bool vuelve = p.x > medio; if (vuelve) p.x -= 2 * medio; personaje.transform.position = p;
                if (vuelve) personaje.Salta(Vector3.left * 2 * medio);
                personaje.Avanza(dt);
            }
        }
    }
}
