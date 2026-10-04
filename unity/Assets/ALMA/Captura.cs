// Frames taken one by one, each exactly `dt` after the one before, whatever the machine is doing: the stage is
// stepped by hand and the camera draws into a picture that is saved. This is how a video of the parade is made, and how
// it can be looked at from outside the Editor.
using System.IO;
using UnityEngine;

namespace Alma
{
    public static class Captura
    {
        // One character alone, mid-step, close: its portrait, `lado` pixels a side, saved as a PNG.
        public static string Retrato(string nombre, string archivo, int lado = 1200)
        {
            var d = Object.FindFirstObjectByType<Desfile>(); var cam = Camera.main; if (d == null || cam == null) return "no hay desfile: entra en modo juego primero";
            Personaje uno = null; foreach (var p in d.personajes) if (p.entidad.id == nombre || p.entidad.nombre == nombre) uno = p; if (uno == null) return "no hay un personaje " + nombre;
            d.enVivo = false; foreach (var p in d.personajes) p.Muestra(p == uno);
            Vector3 antes = cam.transform.position; Quaternion giro = cam.transform.rotation; float campo = cam.fieldOfView;
            var mueve = new Vector3(-0.1f - uno.transform.position.x, 0, -uno.transform.position.z); uno.transform.position += mueve; uno.Salta(mueve);
            for (int i = 0; i < 150; i++) { var q = uno.transform.position; uno.Avanza(1f / 60f); uno.transform.position = q; }      // it walks on the spot until its coat has settled into the walk
            cam.transform.position = new Vector3(0.9f, 0.72f, -3.3f); cam.transform.LookAt(new Vector3(-0.1f, 0.6f, 0)); cam.fieldOfView = 24;
            var rt = new RenderTexture(lado, lado, 24, RenderTextureFormat.ARGB32) { antiAliasing = 4 }; var tex = new Texture2D(lado, lado, TextureFormat.RGB24, false); var previa = cam.targetTexture;
            uno.Avanza(1f / 60f); cam.targetTexture = rt; cam.Render(); RenderTexture.active = rt; tex.ReadPixels(new Rect(0, 0, lado, lado), 0, 0); tex.Apply();
            Directory.CreateDirectory(Path.GetDirectoryName(archivo)); File.WriteAllBytes(archivo, tex.EncodeToPNG());
            cam.targetTexture = previa; RenderTexture.active = null; Object.Destroy(rt); Object.Destroy(tex); cam.transform.position = antes; cam.transform.rotation = giro; cam.fieldOfView = campo;
            foreach (var p in d.personajes) p.Muestra(true); d.enVivo = true;
            return archivo;
        }

        // `cuadros` pictures of `ancho` × `alto` into `carpeta`, as cuadro-0000.png…; `antes` seconds pass first, unseen.
        public static string Serie(string carpeta, int cuadros = 48, float dt = 1f / 24f, int ancho = 1600, int alto = 900, float antes = 0f)
        {
            var d = Object.FindFirstObjectByType<Desfile>(); var cam = Camera.main; if (d == null || cam == null) return "no hay desfile: entra en modo juego primero";
            d.enVivo = false; Directory.CreateDirectory(carpeta);
            for (float t = 0; t < antes; t += 1f / 60f) d.Avanza(1f / 60f);
            var rt = new RenderTexture(ancho, alto, 24, RenderTextureFormat.ARGB32) { antiAliasing = 4 }; var tex = new Texture2D(ancho, alto, TextureFormat.RGB24, false); var previa = cam.targetTexture;
            for (int i = 0; i < cuadros; i++)
            {
                d.Avanza(dt * 0.5f); d.Avanza(dt * 0.5f);
                cam.targetTexture = rt; cam.Render(); RenderTexture.active = rt; tex.ReadPixels(new Rect(0, 0, ancho, alto), 0, 0); tex.Apply();
                File.WriteAllBytes(Path.Combine(carpeta, "cuadro-" + i.ToString("0000") + ".png"), tex.EncodeToPNG());
            }
            cam.targetTexture = previa; RenderTexture.active = null; Object.Destroy(rt); Object.Destroy(tex); d.enVivo = true;
            return cuadros + " cuadros en " + carpeta;
        }
    }
}
