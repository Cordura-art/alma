# A character of an ALMA entity, in Blender: bones first, then a body grown on them with geometry nodes.
# It reads the files `npm run genes -- <id>` writes; one character per file, standing side by side.
#
#   blender --background --factory-startup --python blender/personaje.py -- <salida.png> <genes.json> [<genes.json> …]
#     --blend archivo.blend   also keep the scene, to open it in Blender
#     --ancho 1800            the width of the picture, in pixels
#     --giro 0.45             where the camera stands around them, in radians (0 is the front)
#     --tema light|dark       ALMA's light ground (the default: a white studio) or its dark one
#     --motor eevee|cycles    eevee is fast (seconds a frame); cycles is slow and true: use it when glass matters
#     --arcilla               no materials: grey clay, to judge the form alone
#     --camina                they walk on the spot; --cuadro 12 says which frame the picture shows
#     --video archivo.mp4     the walk as a video (--ciclos 3: how many steps of each foot)
#
# How a character is made:
#   1. Bones (`esqueleto`): the same eighteen for every entity; the chart only changes their measures.
#   2. Lumps (`bultos`): points with a radius, each tied to a bone and belonging to a piece. The pieces: the body
#      (trunk, head and limbs), one for each defined center (a mass on the body), one for each channel (a strap from
#      one center to the other, standing off the trunk), one for the gates (a button, a ring or a spike each), its
#      eyes, its hair (locks on the head, as many as the entity has points) and the plates: a shell
#      over each zone of the body where the entity has three gates or more.
#      An entity without roundness is made of blocks instead of balls.
#   3. Skin (`piel`, a geometry-nodes group): the lumps of a piece become one surface and its creases are filled.
#      Each piece has its own skin, so pieces meet at a seam and can later take different materials.
#      The skin is made after the bones move the lumps, so posing the bones poses the character.
# One unit is the height of a plain character. Blender's z is up and -y is toward the viewer.
import bpy, json, math, random, sys
from mathutils import Vector

argv = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
def opcion(nombre, defecto):
    if nombre not in argv: return defecto
    i = argv.index(nombre); v = argv[i + 1]; del argv[i:i + 2]; return v
BLEND, ANCHO, GIRO, TEMA = opcion('--blend', ''), int(opcion('--ancho', 1800)), float(opcion('--giro', 0.45)), opcion('--tema', 'light')
MOTOR = opcion('--motor', 'eevee')
VIDEO, CICLOS, CUADRO = opcion('--video', ''), int(opcion('--ciclos', 3)), int(opcion('--cuadro', 1))
ARCILLA, CAMINA = '--arcilla' in argv, '--camina' in argv or bool(VIDEO)
for x in ('--arcilla', '--camina'):
    if x in argv: argv.remove(x)
if len(argv) < 2:
    sys.exit('Uso: blender --background --factory-startup --python blender/personaje.py -- <salida.png> <genes.json> [<genes.json> …] [--blend archivo.blend] [--ancho 1800] [--giro 0.45]')
SALIDA, ARCHIVOS = argv[0], argv[1:]

def lineal(hex):
    c = [int(hex[i:i + 2], 16) / 255 for i in (1, 3, 5)]
    return [v / 12.92 if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4 for v in c] + [1.0]
def mezcla(a, b, t): return a + (b - a) * t

# ---------- What the chart decides.
# The type gives the build: (how tall, how wide the trunk, how thick the limbs, how big the head).
CONTEXTURA = {'generador manifestante': (1.0, 1.3, 1.0, 1.0), 'generador': (0.96, 1.2, 1.2, 1.05), 'manifestor': (1.04, 1.1, 1.25, 0.95),
              'proyector': (1.06, 0.9, 0.88, 1.05), 'reflector': (1.0, 0.78, 0.76, 1.15)}
# Within its type, each entity has its own measures: they come from its date of birth (its seed), its roundness and
# its numbers. `cadera` is how high the hips are (long or short legs); `panza` is how much each limb swells between
# its joints; `mano` and `pie` are how big its ends are.
def contextura(G):
    t = (G.get('tipo') or '').lower(); alto, ancho, miembro, cabeza = next((v for k, v in CONTEXTURA.items() if k in t), (1.0, 1.0, 1.0, 1.0))
    R = random.Random(G['semilla'] + '|forma'); red = G.get('redondez', 0.5); u = lambda a, b: mezcla(a, b, R.random())
    return {'alto': alto * u(0.92, 1.08), 'ancho': ancho * u(0.85, 1.3), 'miembro': miembro * u(0.85, 1.35), 'cabeza': cabeza * u(0.8, 1.3), 'cadera': u(0.38, 0.52),
            'anguloso': red < 0.25, 'panza': 0.25 + 1.1 * red, 'mano': u(0.9, 1.6), 'pie': u(1.0, 1.6), 'hombros': u(0.9, 1.35)}
# Where each center sits on a plain character (x to its left, y back, z up), the bone that carries it and its size.
CENTROS = {'cabeza': ((0, 0.0, 1.0), 'cabeza', 0.085), 'ajna': ((0, -0.075, 0.945), 'cabeza', 0.062), 'garganta': ((0, -0.04, 0.775), 'pecho', 0.075),
           'g': ((0, -0.1, 0.67), 'pecho', 0.085), 'corazon': ((0.075, -0.085, 0.635), 'pecho', 0.07), 'bazo': ((-0.115, -0.03, 0.56), 'columna', 0.078),
           'plexo': ((0.115, -0.03, 0.56), 'columna', 0.078), 'sacral': ((0, -0.09, 0.5), 'cadera', 0.085), 'raiz': ((0, 0.07, 0.445), 'cadera', 0.1)}

# ---------- 1. Bones. A plain character's hips are at 0.48 and its neck at 0.77; `altura` moves a plain height to
# this character's: below the hips it follows its legs, above them its trunk.
def altura(C, z):
    c = C['cadera'] * C['alto']
    return z / 0.48 * c if z <= 0.48 else c + (z - 0.48) / 0.52 * (C['alto'] - c)
def articulaciones(C):
    z = lambda v: altura(C, v); a, h = C['ancho'], C['ancho'] * C['hombros']
    J = {'cadera': (0, 0, z(0.48)), 'cintura': (0, 0, z(0.56)), 'pecho': (0, 0, z(0.64)), 'cuello': (0, 0, z(0.77)), 'coronilla': (0, 0, z(0.77) + 0.2 * C['cabeza'])}
    for lado, s in (('I', 1), ('D', -1)):
        J['hombro.' + lado] = (s * 0.115 * h, 0, z(0.745)); J['codo.' + lado] = (s * (0.115 * h + 0.085), 0.01, z(0.6))
        J['muneca.' + lado] = (s * (0.115 * h + 0.13), -0.03, z(0.46)); J['dedos.' + lado] = (s * (0.115 * h + 0.14), -0.045, z(0.46) - 0.07)
        J['ingle.' + lado] = (s * 0.07 * a, 0, z(0.47)); J['rodilla.' + lado] = (s * (0.07 * a + 0.015), -0.015, z(0.265))
        J['tobillo.' + lado] = (s * (0.07 * a + 0.025), 0.01, 0.06); J['punta.' + lado] = (s * (0.07 * a + 0.035), -0.11 * C['pie'], 0.035)
    return {k: Vector(v) for k, v in J.items()}
# name: (from, to, parent)
HUESOS = {'cadera': ('cadera', 'cintura', None), 'columna': ('cintura', 'pecho', 'cadera'), 'pecho': ('pecho', 'cuello', 'columna'), 'cabeza': ('cuello', 'coronilla', 'pecho')}
for L in ('I', 'D'):
    HUESOS.update({'hombro.' + L: ('cuello', 'hombro.' + L, 'pecho'), 'brazo.' + L: ('hombro.' + L, 'codo.' + L, 'hombro.' + L), 'antebrazo.' + L: ('codo.' + L, 'muneca.' + L, 'brazo.' + L),
                   'mano.' + L: ('muneca.' + L, 'dedos.' + L, 'antebrazo.' + L), 'muslo.' + L: ('ingle.' + L, 'rodilla.' + L, 'cadera'), 'pierna.' + L: ('rodilla.' + L, 'tobillo.' + L, 'muslo.' + L),
                   'pie.' + L: ('tobillo.' + L, 'punta.' + L, 'pierna.' + L)})

ZONAS = ['cabeza', 'pecho', 'columna', 'cadera', 'hombro', 'brazo', 'antebrazo', 'mano', 'muslo', 'pierna', 'pie']

def esqueleto(nombre, J, donde):
    arm = bpy.data.armatures.new('huesos-' + nombre); o = bpy.data.objects.new('huesos-' + nombre, arm); bpy.context.scene.collection.objects.link(o)
    o.location = donde; bpy.context.view_layer.objects.active = o; bpy.ops.object.mode_set(mode='EDIT')
    for h, (a, b, _) in HUESOS.items():
        e = arm.edit_bones.new(h); e.head, e.tail = J[a], J[b]
    for h, (_, _, padre) in HUESOS.items():
        if padre: arm.edit_bones[h].parent = arm.edit_bones[padre]; arm.edit_bones[h].use_connect = (arm.edit_bones[h].head - arm.edit_bones[padre].tail).length < 1e-6
    bpy.ops.object.mode_set(mode='OBJECT'); arm.display_type = 'STICK'; o.show_in_front = True
    return o

# ---------- 2. Lumps, by piece: {piece: [(place, radius, bone)]}.
def bultos(G, J, C):
    R = random.Random(G['semilla'] + '|bultos'); numeros = G.get('numeros') or [4]; P = {'cuerpo': []}; B = P['cuerpo']
    a, m = C['ancho'], C['miembro']
    def tramo(hueso, r0, r1, panza=0.0):
        # Close lumps along a bone, so they read as one limb and not as a string of beads; it swells in the middle.
        p0, p1 = J[HUESOS[hueso][0]], J[HUESOS[hueso][1]]; n = max(3, math.ceil((p1 - p0).length / (0.3 * min(r0, r1))))
        for i in range(n + 1):
            t = i / n; r = (r0 + r1) / 2 if C['anguloso'] else mezcla(r0, r1, t) * (1 + panza * C['panza'] * math.sin(math.pi * t) ** 2)     # blocks: one clean bar per bone
            B.append((p0.lerp(p1, t), r, hueso))
    cintura = 0.092 * a if G.get('grupos', 1) == 1 else 0.066 * a        # two groups: a waist between chest and hips
    tramo('cadera', 0.105 * a, cintura); tramo('columna', cintura, 0.1 * a); tramo('pecho', 0.112 * a * C['hombros'], 0.07 * a, 0.15)
    B.append((J['cuello'].lerp(J['coronilla'], 0.58), 0.108 * C['cabeza'], 'cabeza')); B.append((J['cuello'].lerp(J['coronilla'], 0.1), 0.05, 'cabeza'))
    for L in ('I', 'D'):
        tramo('hombro.' + L, 0.058 * m, 0.056 * m); tramo('brazo.' + L, 0.044 * m, 0.04 * m, 0.35); tramo('antebrazo.' + L, 0.036 * m, 0.04 * m, 0.6)
        B.append((J['dedos.' + L], 0.045 * m * C['mano'], 'mano.' + L))
        tramo('muslo.' + L, 0.07 * m, 0.05 * m, 0.4); tramo('pierna.' + L, 0.044 * m, 0.05 * m, 0.75); tramo('pie.' + L, 0.05 * m * C['pie'], 0.046 * m * C['pie'])
    en = lambda p: Vector((p[0] * a, p[1] * a, altura(C, p[2])))
    def fuera(p, cuanto):
        # Push a point of the trunk out to `cuanto` from its upright axis, toward where it already leans (the front, if nowhere).
        h = Vector((p.x, p.y, 0)); d = h.normalized() if h.length > 0.015 else Vector((0, -1, 0))
        return Vector((d.x * max(h.length, cuanto), d.y * max(h.length, cuanto), p.z))
    # A mass on each defined center: a big lump and a few smaller ones around it, as many as the entity's numbers say.
    for i, c in enumerate(G.get('centros', [])):
        if c not in CENTROS: continue
        p, h, r = CENTROS[c]; p = en(p); r *= (0.95 + 0.04 * numeros[i % len(numeros)]); L = P.setdefault('centro-' + c, []); L.append((p, r, h))
        for k in range(1 + numeros[i % len(numeros)] % 3):
            g = R.random() * math.tau; d = (Vector((math.cos(g), -abs(math.sin(g)) * 0.6, math.sin(g) * 0.8)) + Vector((p.x, p.y, 0)) * 4).normalized()
            L.append((p + d * r * 0.75, r * (0.5 + 0.2 * R.random()), h))
    # A strap along each channel, lying on the trunk from one center to the other.
    for k, (c0, c1) in enumerate(G.get('canales', [])):
        if c0 not in CENTROS or c1 not in CENTROS: continue
        p0, p1 = en(CENTROS[c0][0]), en(CENTROS[c1][0]); n = max(8, math.ceil((p0 - p1).length / 0.008)); lado = (0.02 if k % 2 else -0.02) * (1 + k // 2)
        lado *= 2.2; P['canal-%d' % k] = [(fuera(p0.lerp(p1, i / n) + Vector((lado, 0, 0)), 0.125 * a * (1 + 0.55 * math.sin(math.pi * i / n))), 0.028, CENTROS[c0][1] if i < n / 2 else CENTROS[c1][1]) for i in range(n + 1)]
    # A button for each gate, on the surface of a lump of the body; the gate says where, its line says how big.
    cuerpo = list(B); P['puertas'] = []; DETALLES = P['_detalles'] = []
    # Two eyes on the front of the head.
    cc, cr = J['cuello'].lerp(J['coronilla'], 0.58), 0.108 * C['cabeza'] * (0.85 if C['anguloso'] else 1.0)
    P['ojos'] = [(cc + Vector((sx * cr * 0.42, -cr * (1.0 if C['anguloso'] else 0.88), -cr * 0.22)), 0.02 * C['cabeza'], 'cabeza') for sx in (-1, 1)]
    for g in G.get('puertas', []):
        if isinstance(g, str): continue
        p, r, h = cuerpo[(g['n'] * 37) % len(cuerpo)]; ang = g['n'] * 2.39996; e = math.cos(g['n'] * 1.7) * 0.6
        d = Vector((math.cos(ang) * math.cos(e), -abs(math.sin(ang)) * math.cos(e) * (1 if g['n'] % 4 else -1), math.sin(e)))
        # Its line says what it is: a button (lines 1 and 2), a ring (3 and 4) or a spike (5 and 6).
        if g['l'] <= 2: P['puertas'].append((p + d * r, 0.02 + 0.005 * g['l'], h))
        elif g['l'] <= 4: DETALLES.append(('aro', p + d * (r + 0.004), d, 0.016 + 0.004 * g['l'], h))
        else: DETALLES.append(('pua', p + d * r * 0.9, d, 0.012 + 0.002 * g['l'], h))
    # A plate over each zone of the body where three gates or more fall: the lumps of that zone, a little fatter,
    # with their own skin. On the head it is a helmet: it sits up and back, and leaves the face.
    cuenta = {}
    for g in G.get('puertas', []):
        if not isinstance(g, str): cuenta[ZONAS[g['n'] % len(ZONAS)]] = cuenta.get(ZONAS[g['n'] % len(ZONAS)], 0) + 1
    for zona, cuantas in cuenta.items():
        if cuantas < 3: continue
        for hueso in ([zona] if zona in HUESOS else [zona + '.I', zona + '.D']):
            L = [x for x in cuerpo if x[2] == hueso]
            if zona == 'cabeza': P['coraza-' + hueso] = [(p + Vector((0, 0.03, 0.035)) * C['cabeza'], r + 0.012, h) for p, r, h in L[:1]]
            else: P['coraza-' + hueso] = [(p, r + 0.014, h) for p, r, h in L[1:-1]] or [(p, r + 0.014, h) for p, r, h in L]
    return P

# ---------- Details that are not lumps: small meshes of their own, tied to a bone.
def tubo(puntos, radios, lados=7, cerrado=False):
    # A tube along a path. Its section turns to face along the path at each point.
    v, caras, n = [], [], len(puntos)
    for i, p in enumerate(puntos):
        a, b = puntos[(i - 1) % n if cerrado else max(i - 1, 0)], puntos[(i + 1) % n if cerrado else min(i + 1, n - 1)]
        q = (b - a).normalized().to_track_quat('Z', 'Y')
        v += [p + q @ Vector((math.cos(math.tau * j / lados) * radios[i], math.sin(math.tau * j / lados) * radios[i], 0)) for j in range(lados)]
    for i in range(n if cerrado else n - 1):
        for j in range(lados):
            i2, j2 = (i + 1) % n, (j + 1) % lados; caras.append((i * lados + j, i2 * lados + j, i2 * lados + j2, i * lados + j2))
    return v, caras
def cabello(G, J, C, casco=False):
    # Hair grows on the head in as many locks as the entity has points. Its direction says how it grows: gathered on
    # top (foco), out all around (estallido), combed around (giro), winding down (espiral) or to both sides (espejo).
    # Round entities have locks that fall and curl; an entity of blocks has straight rods.
    R = random.Random(G['semilla'] + '|pelo'); red = G.get('redondez', 0.5); recto = C['anguloso']; modo = G.get('direccion', 'foco')
    cc, cr = J['cuello'].lerp(J['coronilla'], 0.58), 0.108 * C['cabeza'] + 0.01
    if casco: cc = cc + Vector((0, 0.03, 0.035)) * C['cabeza']; cr += 0.012          # it grows on the helmet, when there is one
    mechones = max(3, G.get('puntas', 5)); largo = 0.07 + 0.02 * G.get('complejidad', 3)
    V, F = [], []
    for k in range(mechones):
        a = math.tau * k / mechones + R.random() * 0.3
        polar = {'foco': 0.1 + 0.45 * (k % 3) / 2, 'estallido': 0.35 + 0.9 * R.random(), 'giro': 0.75, 'espiral': 0.15 + 1.1 * k / mechones, 'espejo': 1.05}.get(modo, 0.4)
        if modo == 'espejo': a = (0 if k % 2 else math.pi) + (R.random() - 0.5) * 0.9
        d = Vector((math.cos(a) * math.sin(polar), math.sin(a) * math.sin(polar), math.cos(polar)))
        if d.y < -0.35 and d.z < 0.75: d.y = -d.y                                  # not over the face
        lado = d.cross(Vector((0, 0, 1))); lado = lado.normalized() if lado.length > 0.05 else Vector((1, 0, 0)); otro = d.cross(lado)
        for hebra in range(2 if recto else 12):
            j1, j2 = (R.random() - 0.5), (R.random() - 0.5); raiz_d = (d + lado * j1 * 0.5 + otro * j2 * 0.5).normalized()
            if recto:
                raiz = cc + Vector((raiz_d.x * cr * 0.6, raiz_d.y * cr * 0.6, cr * 0.8)); L = largo * (1.0 + 0.8 * R.random()); pts = [raiz + Vector((0, 0, L * i / 2)) for i in range(3)]
                v, f = tubo(pts, [0.007, 0.007, 0.007], 4); n = len(V); V += v; F += [tuple(n + x for x in c) for c in f]
                bola = [pts[-1] + Vector((0, 0, 0.004 * i)) for i in range(3)]; v, f = tubo(bola, [0.013, 0.013, 0.013], 4); n = len(V); V += v; F += [tuple(n + x for x in c) for c in f]
                continue
            raiz = cc + raiz_d * cr * 0.97; L = largo * (0.7 + 0.6 * R.random()); fase = R.random() * math.tau; cae = 0.5 + 0.9 * red; rizo = 0.016 * red
            tira = (lado if modo == 'giro' else Vector((0, 0, 0))) * 0.8
            pts, rad = [], []
            for i in range(10):
                t = i / 9
                pts.append(raiz + raiz_d * L * t + tira * L * t * t + Vector((0, 0, -1)) * L * cae * t * t + (lado * math.cos(fase + 7 * t) + otro * math.sin(fase + 7 * t)) * rizo * t)
                rad.append(0.0058 * (1 - 0.75 * t))
            v, f = tubo(pts, rad, 6); n = len(V); V += v; F += [tuple(n + x for x in c) for c in f]
    return V, F
def detalle(clase, p, d, r):
    if clase == 'aro':
        q = d.to_track_quat('Z', 'Y'); return tubo([p + q @ Vector((math.cos(math.tau * i / 20) * r, math.sin(math.tau * i / 20) * r, 0)) for i in range(20)], [r * 0.3] * 20, 8, True)
    return tubo([p + d * r * 3.2 * t for t in (0, 0.33, 0.66, 1)], [r, r * 0.72, r * 0.4, r * 0.05], 10)
def malla_de(nombre, V, F, de, huesos, mat, liso=True):
    m = bpy.data.meshes.new(nombre); m.from_pydata(V, [], F); m.update(); o = bpy.data.objects.new(nombre, m); bpy.context.scene.collection.objects.link(o)
    for f in m.polygons: f.use_smooth = liso
    for h in HUESOS: o.vertex_groups.new(name=h)
    for i, h in enumerate(de): o.vertex_groups[h].add([i], 1.0, 'REPLACE')
    a = o.modifiers.new('huesos', 'ARMATURE'); a.object = huesos; o.parent = huesos; m.materials.append(mat)
    return o

def pieza_de(nombre, B, huesos, giros, cajas=False):
    # Balls: one point per lump, with its radius. Blocks: a real box per lump, lying along its bone; all its corners
    # belong to that bone, so the box turns with it.
    m = bpy.data.meshes.new('bultos-' + nombre); de = []
    if cajas:
        v, caras = [], []
        for p, r, h in B:
            n = len(v); s = r * 0.85; v += [p + giros[h] @ Vector((x * s, y * s, z * s)) for x in (-1, 1) for y in (-1, 1) for z in (-1, 1)]; de += [h] * 8
            caras += [tuple(n + k for k in c) for c in ((0, 1, 3, 2), (4, 6, 7, 5), (0, 4, 5, 1), (2, 3, 7, 6), (0, 2, 6, 4), (1, 5, 7, 3))]
        m.from_pydata(v, [], caras)
    else:
        m.from_pydata([b[0] for b in B], [], []); de = [b[2] for b in B]
        radio = m.attributes.new('radio', 'FLOAT', 'POINT')
        for i, b in enumerate(B): radio.data[i].value = b[1]
    o = bpy.data.objects.new(nombre, m); bpy.context.scene.collection.objects.link(o)
    for h in HUESOS: o.vertex_groups.new(name=h)
    for i, h in enumerate(de): o.vertex_groups[h].add([i], 1.0, 'REPLACE')
    a = o.modifiers.new('huesos', 'ARMATURE'); a.object = huesos; o.parent = huesos
    return o

# ---------- 3. Skin: the geometry-nodes group. Lumps → one surface, creases filled, smoothed.
def piel(anguloso=False):
    g = bpy.data.node_groups.new('ALMA piel angulosa' if anguloso else 'ALMA piel', 'GeometryNodeTree'); I = g.interface
    I.new_socket('Bultos', in_out='INPUT', socket_type='NodeSocketGeometry'); I.new_socket('Piel', in_out='OUTPUT', socket_type='NodeSocketGeometry')
    def entrada(nombre, tipo, valor, minimo, maximo):
        s = I.new_socket(nombre, in_out='INPUT', socket_type=tipo); s.default_value = valor; s.min_value = minimo; s.max_value = maximo; return s
    entrada('Detalle', 'NodeSocketFloat', 0.004, 0.002, 0.05)       # the size of the grid the skin is made on
    entrada('Fusión', 'NodeSocketInt', 4, 0, 60)                     # how much the creases between lumps are filled
    entrada('Suavidad', 'NodeSocketInt', 2, 0, 20)                   # how much the whole skin is smoothed
    entrada('Grosor', 'NodeSocketFloat', 0.0, -0.05, 0.05)           # fatter or thinner, all over
    entrada('Pulido', 'NodeSocketInt', 6, 0, 40)                     # how much the finished skin is polished, so gloss shows no grid
    I.new_socket('Material', in_out='INPUT', socket_type='NodeSocketMaterial')
    N, K = g.nodes, g.links
    def nodo(tipo, x): n = N.new(tipo); n.location = (x, 0); return n
    ent, sal = nodo('NodeGroupInput', -800), nodo('NodeGroupOutput', 1000)
    radio = nodo('GeometryNodeInputNamedAttribute', -800); radio.data_type = 'FLOAT'; radio.inputs['Name'].default_value = 'radio'; radio.location = (-800, -200)
    puntos, sdf, relleno, media, grosor, malla, liso, mat = (nodo(t, x) for t, x in (('GeometryNodeMeshToPoints', -560), ('GeometryNodePointsToSDFGrid', -340), ('GeometryNodeSDFGridFillet', -120),
        ('GeometryNodeSDFGridMean', 80), ('GeometryNodeSDFGridOffset', 280), ('GeometryNodeGridToMesh', 480), ('GeometryNodeSetShadeSmooth', 660), ('GeometryNodeSetMaterial', 830)))
    K.new(ent.outputs['Bultos'], puntos.inputs['Mesh']); K.new(radio.outputs['Attribute'], puntos.inputs['Radius'])
    K.new(puntos.outputs['Points'], sdf.inputs['Points']); K.new(radio.outputs['Attribute'], sdf.inputs['Radius']); K.new(ent.outputs['Detalle'], sdf.inputs['Voxel Size'])
    if anguloso:
        # Blocks: the piece already comes as boxes; they become one solid and its skin, with flat faces.
        masa, deMasa = nodo('GeometryNodeMeshToVolume', -120), nodo('GeometryNodeVolumeToMesh', 280)
        K.new(ent.outputs['Bultos'], masa.inputs['Mesh']); liso.inputs['Shade Smooth'].default_value = False
        masa.inputs['Resolution Mode'].default_value = 'Size'; K.new(ent.outputs['Detalle'], masa.inputs['Voxel Size']); masa.inputs['Interior Band Width'].default_value = 0.03
        deMasa.inputs['Resolution Mode'].default_value = 'Grid'; deMasa.inputs['Threshold'].default_value = 0.1
        K.new(masa.outputs['Volume'], deMasa.inputs['Volume']); K.new(deMasa.outputs['Mesh'], liso.inputs['Mesh'])
    else:
        K.new(sdf.outputs['SDF Grid'], relleno.inputs['Grid']); K.new(ent.outputs['Fusión'], relleno.inputs['Iterations'])
        K.new(relleno.outputs['Grid'], media.inputs['Grid']); K.new(ent.outputs['Suavidad'], media.inputs['Iterations'])
        K.new(media.outputs['Grid'], grosor.inputs['Grid']); K.new(ent.outputs['Grosor'], grosor.inputs['Distance'])
        donde, pule, mueve = nodo('GeometryNodeInputPosition', 480), nodo('GeometryNodeBlurAttribute', 560), nodo('GeometryNodeSetPosition', 600)
        for x in (donde, pule): x.location = (x.location[0], -250)
        pule.data_type = 'FLOAT_VECTOR'; K.new(donde.outputs['Position'], pule.inputs['Value']); K.new(ent.outputs['Pulido'], pule.inputs['Iterations'])
        K.new(grosor.outputs['Grid'], malla.inputs['Grid']); K.new(malla.outputs['Mesh'], mueve.inputs['Geometry']); K.new(pule.outputs['Value'], mueve.inputs['Position']); K.new(mueve.outputs['Geometry'], liso.inputs['Mesh'])
    K.new(liso.outputs['Mesh'], mat.inputs['Geometry'])
    K.new(ent.outputs['Material'], mat.inputs['Material']); K.new(mat.outputs['Geometry'], sal.inputs['Piel'])
    return g
def con(modificador, nombre, valor):
    s = next(x for x in modificador.node_group.interface.items_tree if getattr(x, 'name', '') == nombre and getattr(x, 'in_out', '') == 'INPUT')
    getattr(modificador.properties.inputs, s.identifier).value = valor

# ---------- Materials. Four ways of taking light; the color always comes from the entity's tokens, and how each one
# takes light comes from ALMA's material tokens (family `material`), which travel in the genes file.
MATERIALES = {}
def material(nombre, clase, hex, hex2=None):
    m = bpy.data.materials.new(nombre); m.use_nodes = True; T = m.node_tree; N, K = T.nodes, T.links; p = N['Principled BSDF']; p.inputs['Base Color'].default_value = lineal(hex)
    def pon(entrada, valor):
        if entrada in p.inputs: p.inputs[entrada].default_value = valor
    V = MATERIALES.get(clase, {}); lugar = N.new('ShaderNodeNewGeometry')
    def relieve(altura, fuerza, hondo):
        b = N.new('ShaderNodeBump'); b.inputs['Strength'].default_value = fuerza; b.inputs['Distance'].default_value = hondo; K.new(altura, b.inputs['Height']); K.new(b.outputs['Normal'], p.inputs['Normal'])
    def sombrea(factor, cuanto):
        # The color goes a little darker where `factor` is low: the hollows of a grain or a weave.
        r = N.new('ShaderNodeMix'); r.data_type = 'RGBA'; c = lineal(hex); r.inputs['A'].default_value = [v * cuanto for v in c[:3]] + [1.0]; r.inputs['B'].default_value = c
        K.new(factor, r.inputs['Factor']); K.new(r.outputs['Result'], p.inputs['Base Color'])
    if clase == 'arcilla':
        # Matte and soft to the touch, with a very fine grain.
        pon('Roughness', 0.55); pon('Sheen Weight', 0.25); pon('Sheen Roughness', 0.5); pon('Subsurface Weight', 0.12); pon('Subsurface Radius', (0.02, 0.02, 0.02))
        g = N.new('ShaderNodeTexNoise'); g.inputs['Scale'].default_value = 420; g.inputs['Detail'].default_value = 3; K.new(lugar.outputs['Position'], g.inputs['Vector']); relieve(g.outputs['Fac'], V.get('relieve', 0.12), 0.001)
        if hex2:
            # Two clays kneaded together: wide veins of the second color, with a clean edge between them.
            veta, corte, dos = N.new('ShaderNodeTexNoise'), N.new('ShaderNodeMapRange'), N.new('ShaderNodeMix'); dos.data_type = 'RGBA'
            veta.inputs['Scale'].default_value = 3.2; veta.inputs['Detail'].default_value = 0.8; veta.inputs['Distortion'].default_value = 1.6
            corte.inputs['From Min'].default_value = 0.5; corte.inputs['From Max'].default_value = 0.53
            K.new(lugar.outputs['Position'], veta.inputs['Vector']); K.new(veta.outputs['Fac'], corte.inputs['Value']); K.new(corte.outputs['Result'], dos.inputs['Factor'])
            dos.inputs['A'].default_value = lineal(hex); dos.inputs['B'].default_value = lineal(hex2); K.new(dos.outputs['Result'], p.inputs['Base Color'])
    elif clase == 'laca':
        # A lacquered toy: clean highlights over a color with some depth.
        pon('Roughness', 0.16); pon('Coat Weight', 1.0); pon('Coat Roughness', 0.03); pon('Subsurface Weight', 0.2); pon('Subsurface Radius', (0.03, 0.03, 0.03)); pon('Specular IOR Level', 0.6)
    elif clase == 'acrilico':
        # Acrylic: a polished solid that light goes into. It glows from inside where it is thin and keeps its color.
        pon('Roughness', 0.06); pon('Coat Weight', 1.0); pon('Coat Roughness', 0.0); pon('Specular IOR Level', 0.7); pon('IOR', 1.49)
        pon('Subsurface Weight', 0.9); pon('Subsurface Radius', (1.0, 1.0, 1.0)); pon('Subsurface Scale', 0.06); pon('Transmission Weight', 0.12)
    elif clase == 'tela':
        # A knit: rows of small stitches you can see, rough, with the soft edge light of cloth.
        pon('Roughness', 0.9); pon('Sheen Weight', 1.0); pon('Sheen Roughness', 0.35); pon('Specular IOR Level', 0.2)
        # The stitches stand in order: straight rows, each one shifted half a stitch from the one below, as in a knit.
        ancho_punto, alto_punto = 0.0075, 0.0052
        parte, junta = N.new('ShaderNodeSeparateXYZ'), N.new('ShaderNodeCombineXYZ'); K.new(lugar.outputs['Position'], parte.inputs['Vector'])
        def cuenta(op, a, b=None):
            n = N.new('ShaderNodeMath'); n.operation = op
            for i, v in enumerate((a, b)):
                if v is None: continue
                if isinstance(v, (int, float)): n.inputs[i].default_value = v
                else: K.new(v, n.inputs[i])
            return n.outputs[0]
        fila = cuenta('DIVIDE', parte.outputs['Z'], alto_punto); corre = cuenta('MULTIPLY', cuenta('FLOOR', fila), 0.5)      # half a stitch, every other row
        # Around the body: the stitches run along x on what faces front or back, and along y on what faces the sides.
        cara = N.new('ShaderNodeSeparateXYZ'); K.new(lugar.outputs['Normal'], cara.inputs['Vector'])
        de_lado = cuenta('GREATER_THAN', cuenta('ABSOLUTE', cara.outputs['X']), cuenta('ABSOLUTE', cara.outputs['Y']))
        a_lo_ancho = N.new('ShaderNodeMix'); a_lo_ancho.data_type = 'FLOAT'; K.new(de_lado, a_lo_ancho.inputs['Factor']); K.new(parte.outputs['X'], a_lo_ancho.inputs['A']); K.new(parte.outputs['Y'], a_lo_ancho.inputs['B'])
        col = cuenta('ADD', cuenta('DIVIDE', a_lo_ancho.outputs['Result'], ancho_punto), corre)
        # Inside each stitch, a rounded bump: high in the middle, low at its edges.
        u, v = cuenta('SUBTRACT', cuenta('FRACT', col), 0.5), cuenta('SUBTRACT', cuenta('FRACT', fila), 0.5)
        lejos = cuenta('SQRT', cuenta('ADD', cuenta('MULTIPLY', u, u), cuenta('MULTIPLY', v, v)))
        alto = cuenta('SUBTRACT', 1.0, cuenta('MULTIPLY', lejos, 1.6))
        rampa = N.new('ShaderNodeMapRange'); rampa.inputs['From Min'].default_value = 0.1; rampa.inputs['From Max'].default_value = 0.75; K.new(alto, rampa.inputs['Value'])
        relieve(alto, V.get('relieve', 0.7), 0.003); sombrea(rampa.outputs['Result'], 0.66)
    # What the system's tokens say about this material goes last, over the recipe above.
    for entrada, token in (('Roughness', 'aspereza'), ('Coat Weight', 'capa'), ('Subsurface Weight', 'luzInterior'), ('Sheen Weight', 'brilloDeBorde'), ('Transmission Weight', 'pasoDeLuz')):
        if token in V: pon(entrada, V[token])
    return m
# The authority says which material leads (the plates wear it) and which one follows (the centers wear it).
MATERIAL_DE = {'emocional': ('tela', 'laca'), 'sacral': ('arcilla', 'laca'), 'espl': ('laca', 'arcilla'), 'ego': ('laca', 'tela'), 'coraz': ('laca', 'tela'),
               'g': ('arcilla', 'acrilico'), 'mental': ('acrilico', 'laca'), 'ambiental': ('acrilico', 'laca'), 'lunar': ('acrilico', 'tela')}
def materiales(G):
    a = (G.get('autoridad') or '').lower(); manda, sigue = next((v for k, v in MATERIAL_DE.items() if a.startswith(k)), ('arcilla', 'laca')); T = G['pieza']; b = T['barras']; i = G['id']
    if ARCILLA:
        g, c = material(i + ' arcilla', 'arcilla', b[4]), material(i + ' arcilla clara', 'arcilla', T['tinta'])
        return {'cuerpo': g, 'coraza': c, 'centro': [c], 'canal': g, 'puertas': c, 'cabello': c, 'ojos': g}, ('arcilla', 'arcilla')
    return {'cuerpo': material(i + ' cuerpo', 'arcilla', b[1], b[0]), 'coraza': material(i + ' coraza', manda, b[0]),
            'cabello': material(i + ' cabello', 'laca', T['acento']), 'ojos': material(i + ' ojos', 'laca', T['base']),
            'centro': [material(i + ' centro a', sigue, b[2]), material(i + ' centro b', sigue, b[3])],
            'canal': material(i + ' canal', 'acrilico', T['acento']), 'puertas': material(i + ' puertas', 'laca', T['tinta'])}, (manda, sigue)

# ---------- The scene: ALMA's ground (dark, or light), studio light.
for o in list(bpy.data.objects): bpy.data.objects.remove(o, do_unlink=True)
E = bpy.context.scene; E.render.engine = 'BLENDER_EEVEE'
DATOS = [json.load(open(f, encoding='utf-8')) for f in ARCHIVOS]
for D in DATOS: D['genes']['id'] = D['id']
MATERIALES.update(DATOS[0].get('materiales', {}))
FONDO = DATOS[0]['genes']['pieza']['base'] if TEMA == 'dark' else DATOS[0]['genes']['fondo']['light']['base']
def arcilla(nombre, hex, aspereza=0.62):
    m = bpy.data.materials.new(nombre); m.use_nodes = True; p = m.node_tree.nodes['Principled BSDF']; p.inputs['Base Color'].default_value = lineal(hex); p.inputs['Roughness'].default_value = aspereza; return m
ESQUELETOS = []; GRUPOS = {False: piel(False), True: piel(True)}; PASO = 0.85; n = len(DATOS)
for i, D in enumerate(DATOS):
    G = D['genes']; C = dict(D['personaje']['medidas']); G['andar'] = D['personaje']['andar']; J = articulaciones(C)       # the measures ALMA worked out (entidades/personaje.mjs)
    red = G.get('redondez', 0.5); M, (manda, sigue) = materiales(G)
    giros = {h: (J[b] - J[a]).to_track_quat('Z', 'Y') for h, (a, b, _) in HUESOS.items()}
    h = esqueleto(D['id'], J, Vector(((i - (n - 1) / 2) * PASO, 0, 0))); P = bultos(G, J, C); centros = 0; ESQUELETOS.append((h, G, C))
    extras = P.pop('_detalles')
    V, F = cabello(G, J, C, 'coraza-cabeza' in P); malla_de(D['id'] + '-cabello', V, F, ['cabeza'] * len(V), h, M['cabello'], not C['anguloso'])
    V, F, de = [], [], []
    for clase, p, d, r, hueso in extras:
        v, f = detalle(clase, p, d, r); k = len(V); V += v; F += [tuple(k + x for x in c) for c in f]; de += [hueso] * len(v)
    if V: malla_de(D['id'] + '-detalles', V, F, de, h, M['puertas'])
    for nombre, B in P.items():
        if not B: continue
        clase = nombre.split('-')[0]; cubos = C['anguloso'] and clase in ('cuerpo', 'coraza', 'centro', 'ojos')
        o = pieza_de(D['id'] + '-' + nombre, B, h, giros, cubos); m = o.modifiers.new('piel', 'NODES'); m.node_group = GRUPOS[cubos]
        fusion, suave = {'cuerpo': (int(round(3 + 6 * red)), 3), 'coraza': (int(round(2 + 5 * red)), 3), 'centro': (int(round(1 + 4 * red)), 2), 'canal': (0, 2), 'puertas': (0, 1), 'ojos': (0, 1)}[clase]
        mat = M[clase]
        if clase == 'centro': mat = mat[centros % len(mat)]; centros += 1
        con(m, 'Fusión', 1 if cubos else fusion); con(m, 'Suavidad', 1 if cubos else suave); con(m, 'Material', mat)
    print(f"ALMA: {D['nombre']}: {len(P)} piezas ({', '.join(sorted(k for k in P if P[k]))}) · {'bloques' if C['anguloso'] else 'bolas'} · manda {manda}, sigue {sigue}")

# ---------- The walk, on the spot. One step of each foot lasts the entity's rhythm (in seconds). Every turn is given
# around the character's own axes (x: its side, z: upright) and then handed to each bone in the bone's own terms.
from mathutils import Quaternion
FPS = 24
def caminata(h, G, C, cuadros):
    A = G['andar']; N = max(12, round(FPS * A['ritmo'])); desfase = A['desfase']
    paso, brazos, rodilla = math.radians(A['paso']), math.radians(A['brazos']), math.radians(A['rodilla'])
    pierna_larga = C['cadera'] * C['alto']
    for b in h.pose.bones: b.rotation_mode = 'QUATERNION'
    def gira(hueso, eje, angulo):
        b = h.pose.bones[hueso]; r = b.bone.matrix_local.to_quaternion(); b.rotation_quaternion = r.inverted() @ Quaternion(eje, angulo) @ r
    X, Z = (1, 0, 0), (0, 0, 1)
    for f in range(1, cuadros + 1):
        t = math.tau * (f - 1) / N + desfase
        for L, s in (('I', 0.0), ('D', math.pi)):
            a = t + s; muslo = -paso * math.sin(a); dobla = rodilla * max(0.0, math.cos(a)) ** 1.5 + math.radians(4)
            gira('muslo.' + L, X, muslo); gira('pierna.' + L, X, dobla); gira('pie.' + L, X, -0.5 * dobla - muslo * 0.6)
            gira('brazo.' + L, X, brazos * math.sin(a)); gira('antebrazo.' + L, X, -math.radians(14) - brazos * 0.5 * max(0.0, -math.sin(a)))
        gira('columna', Z, math.radians(5) * math.sin(t)); gira('cabeza', Z, -math.radians(4) * math.sin(t)); gira('pecho', X, -math.radians(3))
        # The hips drop when the legs are apart, so the foot on the ground stays on it.
        c = h.pose.bones['cadera']; baja = pierna_larga * (1 - math.cos(paso * math.sin(t)))
        c.location = c.bone.matrix_local.to_3x3().inverted() @ Vector((0, 0, -baja))
        c.keyframe_insert('location', frame=f)
        for b in h.pose.bones: b.keyframe_insert('rotation_quaternion', frame=f)
    return N
E.render.fps = FPS; E.frame_start = 1
if CAMINA:
    largo = max(round(FPS * G['andar']['ritmo']) for _, G, _ in ESQUELETOS) * CICLOS
    for h, G, C in ESQUELETOS: caminata(h, G, C, largo)
    E.frame_end = largo; E.frame_set(CUADRO)

# The studio. Light theme: a white room; the camera sees the ground's color, and the room lights the figures softly
# from everywhere, with a big key light for shape. Dark theme: ALMA's black, lit only by the lamps.
CLARO = TEMA != 'dark'
piso = arcilla('piso', FONDO, 0.32 if CLARO else 0.8)
if CLARO:
    # (The floor could give light of its own; it does not: an even light from above keeps it white, see below.)
    q = piso.node_tree.nodes['Principled BSDF']; q.inputs['Emission Color'].default_value = lineal(FONDO); q.inputs['Emission Strength'].default_value = 0.0
bpy.ops.mesh.primitive_plane_add(size=80, location=(0, 0, 0)); bpy.context.object.name = 'piso'; bpy.context.object.data.materials.append(piso)
mundo = bpy.data.worlds.new('fondo'); E.world = mundo; mundo.use_nodes = True; W = mundo.node_tree; fondo = W.nodes['Background']; fondo.inputs['Color'].default_value = lineal(FONDO)
rayo, cuanto = W.nodes.new('ShaderNodeLightPath'), W.nodes.new('ShaderNodeMix'); cuanto.data_type = 'FLOAT'
cuanto.inputs['A'].default_value = 0.62 if CLARO else 1.0; cuanto.inputs['B'].default_value = 1.0     # what lights the scene; what the camera sees
if CLARO:
    # What lights the scene is not even: bright above, dimmer toward the floor and with a darker band at the back.
    # Gloss and glass need something with shape to mirror, or they look flat.
    hacia, partes, sube, banda, junto = W.nodes.new('ShaderNodeTexCoord'), W.nodes.new('ShaderNodeSeparateXYZ'), W.nodes.new('ShaderNodeMapRange'), W.nodes.new('ShaderNodeMapRange'), W.nodes.new('ShaderNodeMath')
    W.links.new(hacia.outputs['Generated'], partes.inputs['Vector']); W.links.new(partes.outputs['Z'], sube.inputs['Value']); W.links.new(partes.outputs['Y'], banda.inputs['Value'])
    sube.inputs['From Min'].default_value = -0.3; sube.inputs['From Max'].default_value = 0.7; sube.inputs['To Min'].default_value = 0.55; sube.inputs['To Max'].default_value = 0.98
    banda.inputs['From Min'].default_value = 0.2; banda.inputs['From Max'].default_value = 0.9; banda.inputs['To Min'].default_value = 1.0; banda.inputs['To Max'].default_value = 0.72
    junto.operation = 'MULTIPLY'; W.links.new(sube.outputs['Result'], junto.inputs[0]); W.links.new(banda.outputs['Result'], junto.inputs[1]); W.links.new(junto.outputs[0], cuanto.inputs['A'])
W.links.new(rayo.outputs['Is Camera Ray'], cuanto.inputs['Factor']); W.links.new(cuanto.outputs['Result'], fondo.inputs['Strength'])
def luz(nombre, donde, fuerza, lado):
    d = bpy.data.lights.new(nombre, 'AREA'); d.energy = fuerza; d.size = lado; o = bpy.data.objects.new(nombre, d); E.collection.objects.link(o)
    o.location = donde; o.rotation_euler = (Vector((0, 0, 0.55)) - Vector(donde)).to_track_quat('-Z', 'Y').to_euler()
if CLARO:
    # An even light from above, the same everywhere: with the room's own it takes the floor to white as far as the
    # eye goes (no horizon), and where a figure stands in its way there is a soft shadow.
    d = bpy.data.lights.new('cenital', 'SUN'); d.energy = 2.7; d.angle = math.radians(18); o = bpy.data.objects.new('cenital', d); E.collection.objects.link(o); o.rotation_euler = (math.radians(32), math.radians(-18), 0)
    luz('principal', (-2.0, -3.2, 3.6), 60, 5.0); luz('contra', (1.2, 3.2, 2.8), 70, 2.5)
else: luz('principal', (-2.2, -3.0, 3.2), 190, 3.0); luz('relleno', (3.0, -2.2, 1.2), 50, 4.0); luz('contra', (1.2, 3.2, 2.6), 170, 2.0)
try:
    E.eevee.use_raytracing = True; E.eevee.taa_render_samples = 96; r = E.eevee.ray_tracing_options
    r.resolution_scale = '1'; r.screen_trace_quality = 1.0; r.trace_max_roughness = 0.5
except Exception: pass
E.view_settings.view_transform = 'Standard'; E.view_settings.look = 'None'
if MOTOR == 'cycles':
    import addon_utils; addon_utils.enable('cycles'); E.render.engine = 'CYCLES'; E.cycles.samples = 96; E.cycles.use_denoising = True
    try:
        pref = bpy.context.preferences.addons['cycles'].preferences; pref.compute_device_type = 'METAL'; pref.get_devices()
        for d in pref.devices: d.use = True
        E.cycles.device = 'GPU'
    except Exception as e: print('ALMA: cycles sin tarjeta gráfica:', e)
    E.cycles.max_bounces = 12; E.cycles.transmission_bounces = 12; E.cycles.glossy_bounces = 6

ancho_escena = PASO * n + 0.3; cam = bpy.data.objects.new('camara', bpy.data.cameras.new('camara')); E.collection.objects.link(cam); E.camera = cam
cam.data.lens = 85; cam.data.sensor_fit = 'HORIZONTAL'; mitad = math.atan(18 / 85); lejos = (ancho_escena / 2) / math.tan(mitad)
E.render.resolution_x = ANCHO; E.render.resolution_y = max(480, int(ANCHO * max(0.5, 1.6 / ancho_escena))); E.render.resolution_percentage = 100
cam.location = (math.sin(GIRO) * lejos, -math.cos(GIRO) * lejos, 0.75); cam.rotation_euler = (Vector((0, 0, 0.6)) - cam.location).to_track_quat('-Z', 'Y').to_euler()
E.render.image_settings.file_format = 'PNG'; E.render.filepath = SALIDA
bpy.ops.render.render(write_still=True); print('ALMA: imagen →', SALIDA)
if VIDEO:
    I = E.render.image_settings
    if hasattr(I, 'media_type'): I.media_type = 'VIDEO'
    I.file_format = 'FFMPEG'; E.render.ffmpeg.format = 'MPEG4'; E.render.ffmpeg.codec = 'H264'; E.render.ffmpeg.constant_rate_factor = 'HIGH'
    E.render.filepath = VIDEO; bpy.ops.render.render(animation=True); print('ALMA: video →', VIDEO, f'({E.frame_end} cuadros a {FPS} por segundo)')
if BLEND: bpy.ops.wm.save_as_mainfile(filepath=BLEND); print('ALMA: escena →', BLEND)
