// Which stage opens when the game starts: the parade of characters, or an entity's planet. The choice is kept on this machine.
using UnityEditor;
using UnityEngine;

namespace Alma
{
    public static class Menu
    {
        [MenuItem("ALMA/Desfile")] static void Desfile() { PlayerPrefs.SetString("alma.escena", "desfile"); }
        [MenuItem("ALMA/Planeta de Cordura")] static void Cordura() { Elige("cordura"); }
        [MenuItem("ALMA/Planeta de Ensayo")] static void Ensayo() { Elige("ensayo"); }
        [MenuItem("ALMA/Planeta de Autómata")] static void Automata() { Elige("automata"); }
        static void Elige(string id) { PlayerPrefs.SetString("alma.escena", "planeta"); PlayerPrefs.SetString("alma.planeta", id); }
    }
}
