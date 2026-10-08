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
            d.enVivo = false; d.Rotulos(false); foreach (var p in d.personajes) p.Muestra(p == uno);
            Vector3 antes = cam.transform.position; Quaternion giro = cam.transform.rotation; float campo = cam.fieldOfView;
            var mueve = new Vector3(-0.1f - uno.transform.position.x, 0, -uno.transform.position.z); uno.transform.position += mueve; uno.Salta(mueve);
            for (int i = 0; i < 150; i++) { var q = uno.transform.position; uno.Avanza(1f / 60f); uno.transform.position = q; }      // it walks on the spot until its coat has settled into the walk
            // The camera stands back as far as its height asks: dressed, it is taller.
            float alto = uno.alto, lejos = Mathf.Max(3.3f, alto * 0.5f * 1.16f / Mathf.Tan(12f * Mathf.Deg2Rad));
            cam.transform.position = new Vector3(0.27f * lejos, alto * 0.56f, -lejos); cam.transform.LookAt(new Vector3(-0.1f, alto * 0.48f, 0)); cam.fieldOfView = 24;
            var rt = new RenderTexture(lado, lado, 24, RenderTextureFormat.ARGB32) { antiAliasing = 4 }; var tex = new Texture2D(lado, lado, TextureFormat.RGB24, false); var previa = cam.targetTexture;
            uno.Avanza(1f / 60f); cam.targetTexture = rt; cam.Render(); RenderTexture.active = rt; tex.ReadPixels(new Rect(0, 0, lado, lado), 0, 0); tex.Apply();
            Directory.CreateDirectory(Path.GetDirectoryName(archivo)); File.WriteAllBytes(archivo, tex.EncodeToPNG());
            cam.targetTexture = previa; RenderTexture.active = null; Object.Destroy(rt); Object.Destroy(tex); cam.transform.position = antes; cam.transform.rotation = giro; cam.fieldOfView = campo;
            foreach (var p in d.personajes) p.Muestra(true); d.Rotulos(true); d.enVivo = true;
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

        // The planet from far to near: one picture from each height (in radii above the ground), each taken once
        // everything that eye asks for has been made. Says how much there was to draw in each.
        public static string Planeta(string carpeta, int ancho = 1600, int alto = 900)
        {
            var e = Object.FindFirstObjectByType<EscenaPlaneta>(); if (e == null) return "no hay planeta: elige ALMA > Planeta y entra en modo juego";
            var p = e.planeta; var cam = e.cam; EscenaPlaneta.enVivo = false; Directory.CreateDirectory(carpeta); string dice = p.id + ":";
            var rt = new RenderTexture(ancho, alto, 24, RenderTextureFormat.ARGB32) { antiAliasing = 4 }; var tex = new Texture2D(ancho, alto, TextureFormat.RGB24, false); var previa = cam.targetTexture;
            Vector3 lugar = p.Llegada, lado = Vector3.Cross(lugar, Vector3.forward).normalized; float[] alturas = { 2.4f, 0.7f, 0.16f, 0.03f, 0.004f };
            for (int i = 0; i < alturas.Length; i++)
            {
                // (it comes down leaning: from straight above in space to nearly level with the ground at the end)
                float t = i / (alturas.Length - 1f); Vector3 arriba = Quaternion.AngleAxis(-t * 2.5f, lado) * lugar; float suelo = p.RadioDelSuelo(arriba);
                cam.transform.position = arriba * (suelo + p.radio * alturas[i]); Vector3 mira = Vector3.Slerp(-arriba, Vector3.Cross(lado, arriba).normalized, t * 0.86f);
                cam.transform.rotation = Quaternion.LookRotation(mira, arriba); float alt = Mathf.Max(0.5f, p.Altitud(cam.transform.position));
                e.Ambiente(alt);
                var reloj = System.Diagnostics.Stopwatch.StartNew(); p.Mira(cam.transform.position, true); reloj.Stop(); if (e.hitos != null) e.hitos.Avanza(0);
                cam.targetTexture = rt; cam.Render(); RenderTexture.active = rt; tex.ReadPixels(new Rect(0, 0, ancho, alto), 0, 0); tex.Apply();
                File.WriteAllBytes(Path.Combine(carpeta, p.id + "-" + i + ".png"), tex.EncodeToPNG());
                dice += " [a " + Mathf.Round(alt) + " m: " + p.trozosALaVista + " trozos, " + p.triangulosALaVista + " triángulos, " + reloj.ElapsedMilliseconds + " ms]";
            }
            cam.targetTexture = previa; RenderTexture.active = null; Object.Destroy(rt); Object.Destroy(tex); EscenaPlaneta.enVivo = true;
            return dice + " · " + p.trozosHechos + " trozos hechos en total";
        }

        // A walk on the planet: it is let fall onto dry land, and walks straight ahead; a picture where it lands and
        // one every so often after. Says how high its eyes were above the ground each time, and how far it got.
        public static string Paseo(string carpeta, int fotos = 4, float segundos = 14f, int ancho = 1600, int alto = 900)
        {
            var e = Object.FindFirstObjectByType<EscenaPlaneta>(); if (e == null) return "no hay planeta: elige ALMA > Planeta y entra en modo juego";
            var p = e.planeta; var cam = e.cam; EscenaPlaneta.enVivo = false; Directory.CreateDirectory(carpeta); string dice = p.id + " a pie:";
            var rt = new RenderTexture(ancho, alto, 24, RenderTextureFormat.ARGB32) { antiAliasing = 4 }; var tex = new Texture2D(ancho, alto, TextureFormat.RGB24, false); var previa = cam.targetTexture;
            Vector3 lugar = p.Llegada; cam.transform.position = lugar * (p.RadioDelSuelo(lugar) + 30f); cam.transform.rotation = Quaternion.LookRotation(Vector3.Cross(lugar, Vector3.forward).normalized, lugar);
            e.APie(true); Vector3 partida = cam.transform.position; float dt = 1f / 30f; int caidaEn = 0; for (int i = 0; i < 300 && p.Altitud(cam.transform.position) > 1.75f; i++) { e.Camina(dt, Vector2.zero, false, false); caidaEn++; }
            for (int f = 0; f < fotos; f++)
            {
                if (f > 0) for (float t = 0; t < segundos; t += dt) { e.Camina(dt, Vector2.up, true, false); p.Mira(cam.transform.position); }
                e.inclina = -4f; e.Camina(0f, Vector2.zero, false, false); p.Mira(cam.transform.position, true); if (e.hitos != null) e.hitos.Avanza(0);
                cam.targetTexture = rt; cam.Render(); RenderTexture.active = rt; tex.ReadPixels(new Rect(0, 0, ancho, alto), 0, 0); tex.Apply();
                File.WriteAllBytes(Path.Combine(carpeta, p.id + "-paseo-" + f + ".png"), tex.EncodeToPNG());
                dice += " [ojos a " + p.Altitud(cam.transform.position).ToString("0.00") + " m, " + Mathf.Round(Vector3.Angle(partida, cam.transform.position) * Mathf.Deg2Rad * p.radio) + " m andados, " + p.trozosALaVista + " trozos, " + p.triangulosALaVista + " triángulos de suelo, " + p.cosasALaVista + " árboles y rocas]";
            }
            cam.targetTexture = previa; RenderTexture.active = null; Object.Destroy(rt); Object.Destroy(tex); EscenaPlaneta.enVivo = true;
            return dice + " · cayó en " + (caidaEn * dt).ToString("0.0") + " s";
        }

        // What stands on the planet that is ALMA's own, each from where someone would look at it: the bust, the
        // underpass, a figure, and its character after it has walked a while.
        public static string Hitos(string carpeta, int ancho = 1600, int alto = 900)
        {
            var e = Object.FindFirstObjectByType<EscenaPlaneta>(); if (e == null || e.hitos == null) return "no hay planeta con hitos: elige ALMA > Planeta y entra en modo juego";
            var p = e.planeta; var h = e.hitos; var cam = e.cam; EscenaPlaneta.enVivo = false; Directory.CreateDirectory(carpeta); string dice = p.id + ": " + h.figurasPuestas + " figuras puestas;";
            var rt = new RenderTexture(ancho, alto, 24, RenderTextureFormat.ARGB32) { antiAliasing = 4 }; var tex = new Texture2D(ancho, alto, TextureFormat.RGB24, false); var previa = cam.targetTexture;
            void Foto(string nombre, Vector3 dirSuya, float lejos, float sube, float mira)
            {
                Vector3 arriba = p.transform.TransformDirection(dirSuya).normalized, punto = arriba * p.RadioDelSuelo(arriba), lado = Vector3.Cross(arriba, Vector3.forward).normalized, desde = (punto + lado * lejos).normalized;
                cam.transform.position = desde * (p.RadioDelSuelo(desde) + sube); cam.transform.rotation = Quaternion.LookRotation(punto + arriba * mira - cam.transform.position, cam.transform.position.normalized); e.Ambiente(Mathf.Max(0.5f, p.Altitud(cam.transform.position)));
                p.Mira(cam.transform.position, true); h.Avanza(0); cam.targetTexture = rt; cam.Render(); RenderTexture.active = rt; tex.ReadPixels(new Rect(0, 0, ancho, alto), 0, 0); tex.Apply();
                File.WriteAllBytes(Path.Combine(carpeta, p.id + "-" + nombre + ".png"), tex.EncodeToPNG()); dice += " " + nombre + " (" + h.aLaVista + " hitos a la vista)";
            }
            Foto("busto", h.busto, 34f, 9f, 7f); Foto("tunel", h.tunel, 34f, 6f, 1.5f); Foto("figura", h.unaFigura, 8f, 2.4f, 2f); Foto("llegada", p.UnLugar(), 45f, 22f, 2f);
            if (h.habitante != null) { for (int i = 0; i < 240; i++) h.Avanza(1f / 30f); Foto("habitante", p.transform.InverseTransformPoint(h.habitante.transform.position).normalized, 4.5f, 1.2f, 0.7f); dice += " habitante a " + p.Altitud(h.habitante.transform.position).ToString("0.00") + " m del suelo"; } else dice += " SIN habitante";
            cam.targetTexture = previa; RenderTexture.active = null; Object.Destroy(rt); Object.Destroy(tex); EscenaPlaneta.enVivo = true; return dice;
        }
    }
}
