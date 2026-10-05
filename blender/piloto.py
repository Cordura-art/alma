# The pilot of a skin: one character of an ALMA entity dressed in cushions, after Universal Everything's walking
# figures. The body is not seen: a cloud of large tied pillows hides it, pressed against one another, and only its
# legs and its shoes come out below, mid-step. Each defined center of its chart is one of the big pillows and its
# first gates are the rest; the pillows wear the entity's colors, and two of them wear its pattern
# (entidades/patron.mjs) as a print. Its ajna is the dark glossy one on top.
# It reads the file `npm run genes -- <id>` writes, and is drawn with Cycles (slow and true) unless told otherwise.
#
#   blender --background --factory-startup --python blender/piloto.py -- <genes.json> <salida.png> [--motor cycles|eevee] [--alto 2000] [--muestras 160] [--giro 0.7] [--blend f]
import bpy, json, math, random, sys, os
from mathutils import Vector, Quaternion, Matrix

argv = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
def opcion(nombre, defecto):
    if nombre not in argv: return defecto
    i = argv.index(nombre); v = argv[i + 1]; del argv[i:i + 2]; return v
MOTOR, ALTO, MUESTRAS, GIRO, BLEND = opcion('--motor', 'cycles'), int(opcion('--alto', 2000)), int(opcion('--muestras', 160)), float(opcion('--giro', 1.05)), opcion('--blend', '')
if len(argv) < 2: sys.exit('Uso: blender --background --factory-startup --python blender/piloto.py -- <genes.json> <salida.png> [--motor cycles|eevee] [--alto 2000] [--muestras 160] [--giro 0.7] [--blend f]')
D = json.load(open(argv[0], encoding='utf-8')); SALIDA = argv[1]; G = D['genes']; C = D['personaje']['medidas']; AND = D['personaje']['andar']; MODOS = D['patron']['modos']; TOK = D.get('materiales', {})
R = random.Random(G['semilla'] + '|cojines'); centros = set(G.get('centros', []))

def lineal(hex):
    c = [int(hex[i:i + 2], 16) / 255 for i in (1, 3, 5)]
    return [v / 12.92 if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4 for v in c] + [1.0]
def mezcla(a, b, t): return [a[i] + (b[i] - a[i]) * t for i in range(3)] + [1.0]
b = G['pieza']['barras']
MANDA, ACENTO, CLARO, GRIS, OSCURO = lineal(b[1]), lineal(b[3]), lineal(G['pieza']['tinta']), lineal(b[4]), lineal(G['pieza']['base'])
FONDO = mezcla(mezcla(MANDA, GRIS, 0.86), OSCURO, 0.3)                # the ground: the leading color, hushed

# ---------- Its joints (the same as blender/personaje.py), then a pose: one step of its walk, leaning as it leans.
def altura(z):
    c = C['cadera'] * C['alto']; return z / 0.48 * c if z <= 0.48 else c + (z - 0.48) / 0.52 * (C['alto'] - c)
a, h, m = C['ancho'], C['ancho'] * C['hombros'], C['miembro']
J = {'cadera': (0, 0, altura(0.48)), 'cintura': (0, 0, altura(0.56)), 'pecho': (0, 0, altura(0.64)), 'cuello': (0, 0, altura(0.77)), 'coronilla': (0, 0, altura(0.77) + 0.2 * C['cabeza'])}
for L, s in (('I', 1), ('D', -1)):
    J['hombro.' + L] = (s * 0.115 * h, 0, altura(0.745)); J['codo.' + L] = (s * (0.115 * h + 0.085), 0.01, altura(0.6)); J['muneca.' + L] = (s * (0.115 * h + 0.13), -0.03, altura(0.46)); J['dedos.' + L] = (s * (0.115 * h + 0.14), -0.045, altura(0.46) - 0.07)
    J['ingle.' + L] = (s * 0.07 * a, 0, altura(0.47)); J['rodilla.' + L] = (s * (0.07 * a + 0.015), -0.015, altura(0.265)); J['tobillo.' + L] = (s * (0.07 * a + 0.025), 0.01, 0.06); J['punta.' + L] = (s * (0.07 * a + 0.035), -0.11 * C['pie'], 0.035)
J = {k: Vector(v) for k, v in J.items()}
X = Vector((1, 0, 0)); g = math.radians
def gira(nombres, pivote, grados, eje=X):
    q = Quaternion(eje, g(grados)); p = J[pivote].copy()
    for n in nombres: J[n] = p + q @ (J[n] - p)
tronco = ['cintura', 'pecho', 'cuello', 'coronilla'] + [k + L for L in ('.I', '.D') for k in ('hombro', 'codo', 'muneca', 'dedos')]
gira(tronco, 'cadera', min(16, -AND.get('inclina', -8)) * 0.8); gira(['coronilla'], 'cuello', -8)
# One instant of its own walk (the same rules as its walk in Blender and Unity, a little larger than life): which
# foot leads is its own, its stride and the bend of its knee are its own, the lame leg takes the short step, and a
# heavy one walks lower.
paso, rod, peso, coj, coja = AND.get('paso', 28), AND.get('rodilla', 50), AND.get('peso', 0.4), AND.get('cojera', 0.0), AND.get('pataCoja', 'I')
fase = random.Random(G['semilla'] + '|pose').choice([0.42, 0.58, 1.42, 1.58]) * math.pi
for L, s in (('I', 0.0), ('D', math.pi)):
    an_ = fase + s; corto = 1 - 0.5 * coj if L == coja else 1.0
    muslo = -paso * 1.3 * corto * math.sin(an_) - 6 * peso; dobla = rod * 1.15 * corto * max(0.0, math.cos(an_)) ** 1.5 + 5 + 12 * peso + (26 if math.sin(an_) < 0 else 0)
    gira(['rodilla.' + L, 'tobillo.' + L, 'punta.' + L], 'ingle.' + L, muslo); gira(['tobillo.' + L, 'punta.' + L], 'rodilla.' + L, dobla)
    gira(['punta.' + L], 'tobillo.' + L, -(muslo + dobla) * (0.95 if math.sin(an_) > 0 else 0.35))                # the leading foot lies flat; the one behind trails

# ---------- A cushion: a soft-cornered solid (round where `p` is 2, boxy as it grows), with a map of its own skin in
# real measures, so that its stitches keep their size and stay on it when it moves.
COJINES = []
def cojin(nombre, centro, giro, medios, p, material, clase='cojin', nudo=None, forma=None):
    # `nudo`: where the pillow is tied (a direction of its own), how deep, and how many pleats run from the knot.
    U, V = (176, 112) if nudo else (112, 72); v, caras, uv, norma = [], [], [], []
    if nudo:
        kd = Vector(nudo[0]).normalized(); e1 = kd.cross(Vector((0.3, 0.5, 0.8))).normalized(); e2 = kd.cross(e1)
    ax, ay, az = medios; ancho = math.pi * (ax + ay); alto = 2 * az * 1.25
    for j in range(V + 1):
        f = math.pi * j / V
        for i in range(U + 1):
            t = math.tau * i / U; d = Vector((math.sin(f) * math.cos(t), math.sin(f) * math.sin(t), math.cos(f)))
            r = (abs(d.x / ax) ** p + abs(d.y / ay) ** p + abs(d.z / az) ** p) ** (-1 / p)
            if nudo:
                th = math.acos(max(-1.0, min(1.0, d.dot(kd)))); fi = math.atan2(d.dot(e2), d.dot(e1)); pliegue = abs(math.sin(nudo[2] * fi / 2)) ** 0.7
                r *= 1 - nudo[1] * math.exp(-(th / 0.3) ** 2) - 0.085 * math.exp(-(th / 0.95) ** 2) * pliegue - 0.02 * math.exp(-((th - 1.9) / 0.9) ** 2) * abs(math.sin((nudo[2] + 3) * fi / 2 + 1.0)) ** 2
            v.append(forma(d * r) if forma else d * r); uv.append((i / U * ancho, j / V * alto)); norma.append((i / U, j / V))
    for j in range(V):
        for i in range(U):
            k = j * (U + 1) + i; caras.append((k, k + 1, k + U + 2, k + U + 1))
    me = bpy.data.meshes.new(nombre); me.from_pydata(v, [], caras); me.update()
    for nombre_uv, datos in (('medida', uv), ('entero', norma)):
        capa = me.uv_layers.new(name=nombre_uv)
        for l in me.loops: capa.data[l.index].uv = datos[l.vertex_index]
    for f in me.polygons: f.use_smooth = True
    o = bpy.data.objects.new(nombre, me); bpy.context.scene.collection.objects.link(o); o.location = centro; o.rotation_mode = 'QUATERNION'; o.rotation_quaternion = giro; me.materials.append(material)
    COJINES.append((o, Vector(centro), giro, Vector(medios), p, clase)); return o
def a_lo_largo(desde, hasta, frente=Vector((0, -1, 0))):
    # A turn that lays a cushion's long axis along a stretch, keeping its face toward the front.
    z = (hasta - desde).normalized(); x = frente.cross(z); x = x.normalized() if x.length > 1e-4 else Vector((1, 0, 0)); y = z.cross(x)
    return Matrix((x, y, z)).transposed().to_quaternion()
def sobre(nombre, k0, k1, ancho, fondo, material, sobra=1.16, p=None, corre=0.5):
    p0, p1 = J[k0], J[k1]; u = lambda: 1 + (R.random() - 0.5) * 0.3
    return cojin(nombre, p0.lerp(p1, corre), a_lo_largo(p0, p1), (ancho * u(), fondo * u(), (p1 - p0).length / 2 * sobra), p or R.uniform(2.3, 3.1), material)

# ---------- Materials. The knit asks the pattern where its second yarn goes; suede and rubber are plain.
def cuenta(A, op, x, y=None):
    n = A.nodes.new('ShaderNodeMath'); n.operation = op
    for i, w in enumerate((x, y)):
        if w is None: continue
        if isinstance(w, (int, float)): n.inputs[i].default_value = w
        else: A.links.new(w, n.inputs[i])
    return n.outputs[0]
def nuevo(nombre):
    mt = bpy.data.materials.new(nombre); mt.use_nodes = True; return mt, mt.node_tree, mt.node_tree.nodes['Principled BSDF']
def pon(p, **k):
    for n, w in k.items():
        if n.replace('_', ' ') in p.inputs: p.inputs[n.replace('_', ' ')].default_value = w
def relieve(A, p, altura_, fuerza, hondo):
    n = A.nodes.new('ShaderNodeBump'); n.inputs['Strength'].default_value = fuerza; n.inputs['Distance'].default_value = hondo; A.links.new(altura_, n.inputs['Height'])
    if p.inputs['Normal'].links: A.links.new(p.inputs['Normal'].links[0].from_socket, n.inputs['Normal'])
    A.links.new(n.outputs['Normal'], p.inputs['Normal'])
def mapa(A, nombre):
    n, s = A.nodes.new('ShaderNodeUVMap'), A.nodes.new('ShaderNodeSeparateXYZ'); n.uv_map = nombre; A.links.new(n.outputs['UV'], s.inputs['Vector']); return s.outputs['X'], s.outputs['Y']
def patron(A, u, v):
    total = None
    for mo in MODOS:
        cu = lambda k, x: cuenta(A, 'COSINE', cuenta(A, 'MULTIPLY', x, k * math.pi))
        t = cuenta(A, 'ADD', cuenta(A, 'MULTIPLY', cu(mo['n'], u), cu(mo['m'], v)), cuenta(A, 'MULTIPLY', cuenta(A, 'MULTIPLY', cu(mo['m'], u), cu(mo['n'], v)), mo['s']))
        t = cuenta(A, 'MULTIPLY', t, mo['a']); total = t if total is None else cuenta(A, 'ADD', total, t)
    return total
def tejido(nombre, color, otro, grueso=1.0):
    mt, A, p = nuevo(nombre); V = TOK.get('tela', {}); pon(p, Roughness=V.get('aspereza', 0.9), Sheen_Weight=V.get('brilloDeBorde', 1.0), Sheen_Roughness=0.45, Specular_IOR_Level=0.25)
    u, v = mapa(A, 'medida'); ancho, alto = 0.0042 * grueso, 0.003 * grueso
    fila = cuenta(A, 'DIVIDE', v, alto); col = cuenta(A, 'ADD', cuenta(A, 'DIVIDE', u, ancho), cuenta(A, 'MULTIPLY', cuenta(A, 'FLOOR', fila), 0.5))
    du, dv = cuenta(A, 'SUBTRACT', cuenta(A, 'FRACT', col), 0.5), cuenta(A, 'SUBTRACT', cuenta(A, 'FRACT', fila), 0.5)
    puntada = cuenta(A, 'SUBTRACT', 1.0, cuenta(A, 'MULTIPLY', cuenta(A, 'SQRT', cuenta(A, 'ADD', cuenta(A, 'MULTIPLY', du, du), cuenta(A, 'MULTIPLY', dv, dv))), 1.7))
    eu, ev = mapa(A, 'entero'); lado = A.nodes.new('ShaderNodeMapRange'); lado.inputs['From Min'].default_value = -0.04; lado.inputs['From Max'].default_value = 0.04
    A.links.new(patron(A, cuenta(A, 'MULTIPLY', eu, 2.0), cuenta(A, 'MULTIPLY', ev, 0.8)), lado.inputs['Value'])           # twice around: the pattern closes on itself
    hilo = A.nodes.new('ShaderNodeMix'); hilo.data_type = 'RGBA'; hilo.inputs['A'].default_value = color; hilo.inputs['B'].default_value = otro; A.links.new(lado.outputs['Result'], hilo.inputs['Factor'])
    hondo = A.nodes.new('ShaderNodeMix'); hondo.data_type = 'RGBA'; hondo.blend_type = 'MULTIPLY'; hondo.inputs['B'].default_value = (0.42, 0.42, 0.42, 1); A.links.new(hilo.outputs['Result'], hondo.inputs['A'])
    A.links.new(cuenta(A, 'SUBTRACT', 1.0, cuenta(A, 'MINIMUM', cuenta(A, 'MAXIMUM', cuenta(A, 'MULTIPLY', puntada, 1.5), 0.0), 1.0)), hondo.inputs['Factor']); A.links.new(hondo.outputs['Result'], p.inputs['Base Color'])
    relieve(A, p, puntada, 1.0, 0.0024 * grueso); relieve(A, p, lado.outputs['Result'], 0.4, 0.004)
    # Its seam: where the knit closes on itself, a fine dark groove down the back of the piece.
    costura = cuenta(A, 'MINIMUM', cuenta(A, 'MULTIPLY', cuenta(A, 'ABSOLUTE', cuenta(A, 'SUBTRACT', eu, 0.25)), 160.0), 1.0); relieve(A, p, costura, 0.8, 0.004)                               # the second yarn stands a little prouder, like a rib
    return mt
def gamuza(nombre, color):
    mt, A, p = nuevo(nombre); V = TOK.get('arcilla', {}); pon(p, Roughness=0.82, Sheen_Weight=0.7, Sheen_Roughness=0.5, Specular_IOR_Level=0.2)
    gr = A.nodes.new('ShaderNodeTexNoise'); gr.inputs['Scale'].default_value = 700; gr.inputs['Detail'].default_value = 4; relieve(A, p, gr.outputs['Fac'], 0.25, 0.0012)
    man = A.nodes.new('ShaderNodeTexNoise'); man.inputs['Scale'].default_value = 9; c = A.nodes.new('ShaderNodeMix'); c.data_type = 'RGBA'; c.inputs['A'].default_value = mezcla(color, (0, 0, 0, 1), 0.12); c.inputs['B'].default_value = mezcla(color, (1, 1, 1, 1), 0.08)
    A.links.new(man.outputs['Fac'], c.inputs['Factor']); A.links.new(c.outputs['Result'], p.inputs['Base Color']); return mt
def goma(nombre, color):
    mt, A, p = nuevo(nombre); p.inputs['Base Color'].default_value = color; pon(p, Roughness=0.42, Subsurface_Weight=0.15, Subsurface_Radius=(0.02, 0.02, 0.02), Coat_Weight=0.15); return mt
def vidrio(nombre, color):
    mt, A, p = nuevo(nombre); p.inputs['Base Color'].default_value = color; pon(p, Roughness=0.03, Transmission_Weight=1.0, IOR=1.45, Coat_Weight=1.0, Coat_Roughness=0.02)
    if hasattr(mt, 'use_raytrace_refraction'): mt.use_raytrace_refraction = True
    return mt

def tela(nombre, color, estampa=None):
    # Cloth with a fine rib and the soft creases of a stuffed thing. With `estampa`, it wears the entity's pattern as a
    # print: its second color where the pattern is high.
    mt, A, p = nuevo(nombre); V = TOK.get('tela', {}); pon(p, Roughness=0.78, Sheen_Weight=V.get('brilloDeBorde', 1.0) * 0.8, Sheen_Roughness=0.5, Specular_IOR_Level=0.3)
    u, v = mapa(A, 'medida'); eu, ev = mapa(A, 'entero')
    canal = cuenta(A, 'ABSOLUTE', cuenta(A, 'SINE', cuenta(A, 'MULTIPLY', v, math.pi / 0.0052))); relieve(A, p, canal, 0.55, 0.0016)
    ar = A.nodes.new('ShaderNodeTexNoise'); ar.inputs['Scale'].default_value = 7.0; ar.inputs['Detail'].default_value = 2.5; est = A.nodes.new('ShaderNodeMapping'); est.inputs['Scale'].default_value = (1.0, 5.0, 1.0)
    cu = A.nodes.new('ShaderNodeCombineXYZ'); A.links.new(cuenta(A, 'MULTIPLY', eu, 6.0), cu.inputs['X']); A.links.new(ev, cu.inputs['Y']); A.links.new(cu.outputs['Vector'], est.inputs['Vector']); A.links.new(est.outputs['Vector'], ar.inputs['Vector'])
    relieve(A, p, ar.outputs['Fac'], 0.5, 0.01)
    if estampa:
        lado = A.nodes.new('ShaderNodeMapRange'); lado.inputs['From Min'].default_value = -0.03; lado.inputs['From Max'].default_value = 0.03
        A.links.new(patron(A, cuenta(A, 'MULTIPLY', eu, 2.0), cuenta(A, 'MULTIPLY', ev, 0.9)), lado.inputs['Value'])
        c = A.nodes.new('ShaderNodeMix'); c.data_type = 'RGBA'; c.inputs['A'].default_value = color; c.inputs['B'].default_value = estampa; A.links.new(lado.outputs['Result'], c.inputs['Factor']); A.links.new(c.outputs['Result'], p.inputs['Base Color'])
    else: p.inputs['Base Color'].default_value = color
    return mt
def vinilo(nombre, color, estampa=None):
    mt, A, p = nuevo(nombre); p.inputs['Base Color'].default_value = color
    if estampa:
        eu, ev = mapa(A, 'entero'); lado_ = A.nodes.new('ShaderNodeMapRange'); lado_.inputs['From Min'].default_value = -0.02; lado_.inputs['From Max'].default_value = 0.02
        A.links.new(patron(A, cuenta(A, 'MULTIPLY', eu, 2.0), cuenta(A, 'MULTIPLY', ev, 0.9)), lado_.inputs['Value']); c_ = A.nodes.new('ShaderNodeMix'); c_.data_type = 'RGBA'; c_.inputs['A'].default_value = color; c_.inputs['B'].default_value = estampa
        A.links.new(lado_.outputs['Result'], c_.inputs['Factor']); A.links.new(c_.outputs['Result'], p.inputs['Base Color'])
    pon(p, Roughness=0.24, Coat_Weight=1.0, Coat_Roughness=0.05, Specular_IOR_Level=0.6)
    ar = A.nodes.new('ShaderNodeTexNoise'); ar.inputs['Scale'].default_value = 11.0; ar.inputs['Detail'].default_value = 3.0; relieve(A, p, ar.outputs['Fac'], 0.35, 0.012); return mt

for o in list(bpy.data.objects): bpy.data.objects.remove(o, do_unlink=True)
E = bpy.context.scene
T1 = tejido('tejido', MANDA, mezcla(MANDA, CLARO, 0.2)); T2 = tejido('tejido hondo', mezcla(MANDA, OSCURO, 0.32), mezcla(MANDA, OSCURO, 0.1))
GA = gamuza('gamuza', ACENTO); GC = gamuza('gamuza clara', mezcla(ACENTO, CLARO, 0.3)); BOT = goma('goma clara', mezcla(CLARO, ACENTO, 0.12)); BOT2 = goma('goma', mezcla(ACENTO, OSCURO, 0.25)); DOMO = vidrio('domo', mezcla(MANDA, OSCURO, 0.72))

# ---------- The pieces. A cloud of pillows around the trunk, and the legs under it.
# Each defined center is a big pillow where that center is; its first gates are the others, set around the trunk by
# their number. No two are the same size. Its colors take turns, and two pillows wear its pattern.
CLARO2 = lineal(b[0]); DURAZNO = lineal(b[2]); CARMIN = lineal(G['pieza']['acento'])
# Its skin: one material for the whole cloud, chosen by where the weight of its chart is. Most of its defined centers
# in the head and throat: blown vinyl, glossy. Most in the body: a chunky knit. Half and half: ribbed cloth.
arriba_n = sum(1 for c_ in centros if c_ in ('cabeza', 'ajna', 'garganta')); abajo_n = len(centros) - arriba_n
PIEL = (D['personaje'].get('piel') or {}).get('id') or ('vinilo' if arriba_n > abajo_n else 'punto' if abajo_n > arriba_n else 'pana')      # the rule lives in entidades/personaje.mjs (pielDe)
def de_piel(nombre, color, estampa=None):
    if PIEL == 'vinilo': return vinilo(nombre, color, estampa)
    if PIEL == 'punto': return tejido(nombre, color, estampa or mezcla(color, CLARO, 0.16), 2.4)
    return tela(nombre, color, estampa)
TELAS = [de_piel('piel manda', MANDA), de_piel('piel clara', CLARO2), de_piel('piel acento', ACENTO), de_piel('piel durazno', DURAZNO), de_piel('estampa', MANDA, mezcla(OSCURO, MANDA, 0.1)), de_piel('estampa clara', CLARO2, CARMIN)]
ORDEN = [4, 2, 5, 0, 3, 1, 0, 2, 4, 1, 3]        # the first pillows, the big ones of its centers, wear its pattern
BRILLO = vinilo('vinilo oscuro', mezcla(OSCURO, MANDA, 0.1))
tronco_ = J['cintura'].lerp(J['cuello'], 0.45); adelante = Vector((0, -1, 0)); nube = []
LUGAR = {'cabeza': (Vector((0, 0.0, 0.34)), 0.2), 'ajna': (Vector((0, -0.05, 0.3)), 0.2), 'garganta': (Vector((0.02, -0.13, 0.13)), 0.15), 'g': (Vector((0, -0.16, 0.02)), 0.17), 'corazon': (Vector((0.11, -0.12, 0.05)), 0.14),
         'bazo': (Vector((-0.17, -0.02, -0.06)), 0.15), 'plexo': (Vector((0.17, -0.04, -0.07)), 0.16), 'sacral': (Vector((0, -0.15, -0.16)), 0.17), 'raiz': (Vector((-0.02, 0.15, -0.14)), 0.2)}
arriba_ya = False
for c in G.get('centros', []):
    if c not in LUGAR: continue
    donde_ = LUGAR[c][0] if not (c == 'ajna' and 'cabeza' in centros) else Vector((0.04, -0.14, 0.2))      # with a head center too, the ajna sits in front of it
    arriba_ya = arriba_ya or c in ('cabeza', 'ajna'); nube.append((c, donde_, LUGAR[c][1] * (0.8 if c == 'ajna' and 'cabeza' in centros else 1.0), c == 'ajna'))
for k, pu in enumerate([x for x in G.get('puertas', []) if not isinstance(x, str)][:max(0, 9 - len(nube))]):
    ang = pu['n'] * 2.39996; alto_ = -0.2 + 0.42 * ((pu['n'] * 5) % 7) / 6; nube.append(('puerta %d' % pu['n'], Vector((math.cos(ang) * 0.15, math.sin(ang) * 0.13, alto_)), 0.1 + 0.014 * pu['l'], False))
if not arriba_ya: nube.append(('arriba', Vector((0, 0, 0.33)), 0.18, False))
nube.append(('falda delante', Vector((0.05, -0.12, -0.2)), 0.13, False)); nube.append(('falda detras', Vector((-0.06, 0.12, -0.21)), 0.125, False))      # two more, low, so that the hips stay hidden
# The pillows are cloth, and they are blown up. Each starts as a small flat cushion where it belongs, sewn shut;
# all of them grow and fill with air at once, and as they meet they press, crease and pucker against one another and
# against the body they hide. Nothing is cut: it is the cloth that gives way.
import bmesh
def nube_de_tela(lista, cuadros=40):
    V_, F_, UVm, UVe, MAT, ANCLA, CHICO = [], [], [], [], [], [], []; mats = []
    for k, (nombre, donde, radio, oscuro) in enumerate(lista):
        r = radio * (0.5 + 0.5 * C['ancho']) * R.uniform(0.95, 1.15); centro = tronco_ + Vector((donde.x * C['ancho'], donde.y, donde.z))
        hacia = (tronco_ - centro); hacia = hacia.normalized() if hacia.length > 1e-4 else Vector((0, 0, -1))
        # It lies flat against the body: its thin side faces the trunk, turned a little so no two lie the same way.
        giro_ = hacia.to_track_quat('Z', 'Y') @ Quaternion((0, 0, 1), R.uniform(0, math.tau)) @ Quaternion((1, 0, 0), R.uniform(-0.35, 0.35))
        # An entity of blocks has squarer cushions.
        ax, ay, az, pe = r * 1.62 * R.uniform(0.92, 1.12), r * 1.5 * R.uniform(0.9, 1.1), r * 0.58, (5.0 if C.get('anguloso') else 2.6)
        U, W = 52, 30; base = len(V_); mat = BRILLO if oscuro else TELAS[ORDEN[k % len(ORDEN)]]
        if mat not in mats: mats.append(mat)
        ancho = math.pi * (ax + ay); alto = 2 * (ax + az) * 0.8
        def punto_(i, jj):
            f = math.pi * jj / W; t = math.tau * i / U; d = Vector((math.sin(f) * math.cos(t), math.cos(f), math.sin(f) * math.sin(t)))      # its poles lie on its rim, where a cushion is sewn
            return centro + giro_ @ (d * (abs(d.x / ax) ** pe + abs(d.y / ay) ** pe + abs(d.z / az) ** pe) ** (-1 / pe))
        polo0 = base; V_.append(punto_(0, 0))
        for jj in range(1, W):
            for i in range(U): V_.append(punto_(i, jj))
        polo1 = len(V_); V_.append(punto_(0, W)); anillo = lambda jj, i: base + 1 + (jj - 1) * U + (i % U)
        def cara(vs, uvs): F_.append(vs); UVm.append([(u * ancho, w * alto) for u, w in uvs]); UVe.append(uvs); MAT.append(mats.index(mat))
        for i in range(U):
            cara((polo0, anillo(1, i + 1), anillo(1, i)), [((i + 0.5) / U, 0), ((i + 1) / U, 1 / W), (i / U, 1 / W)])
            cara((polo1, anillo(W - 1, i), anillo(W - 1, i + 1)), [((i + 0.5) / U, 1), (i / U, (W - 1) / W), ((i + 1) / U, (W - 1) / W)])
            for jj in range(1, W - 1): cara((anillo(jj, i), anillo(jj, i + 1), anillo(jj + 1, i + 1), anillo(jj + 1, i)), [(i / U, jj / W), ((i + 1) / U, jj / W), ((i + 1) / U, (jj + 1) / W), (i / U, (jj + 1) / W)])
        for q in range(base, len(V_)):
            CHICO.append(centro + (V_[q] - centro) * 0.2); ANCLA.append(1.0 if (V_[q] - centro).normalized().dot(hacia) > 0.93 else 0.0)
    me = bpy.data.meshes.new('nube'); me.from_pydata(V_, [], F_); me.update()
    # Every face must look outward, or the air would push the cloth in instead of out.
    bm = bmesh.new(); bm.from_mesh(me); bmesh.ops.recalc_face_normals(bm, faces=bm.faces); volteadas = [f.index for f in bm.faces if False]; bm.to_mesh(me); bm.free(); me.update()
    # (recalc keeps each face's corners in a new order: the maps below are written by corner position in space, not by order)
    for nombre_uv, datos in (('medida', UVm), ('entero', UVe)):
        capa = me.uv_layers.new(name=nombre_uv)
        for f in me.polygons:
            de_vertice = {vi: datos[f.index][n] for n, vi in enumerate(F_[f.index])}
            for l in f.loop_indices: capa.data[l].uv = de_vertice[me.loops[l].vertex_index]
    for mt_ in mats: me.materials.append(mt_)
    for f in me.polygons: f.material_index = MAT[f.index]; f.use_smooth = True
    o = bpy.data.objects.new('nube', me); E.collection.objects.link(o); bpy.context.view_layer.objects.active = o
    grupo = o.vertex_groups.new(name='ancla')
    for q, w in enumerate(ANCLA):
        if w: grupo.add([q], 1.0, 'REPLACE')
    o.shape_key_add(name='entera'); chico = o.shape_key_add(name='chica')
    for q, w in enumerate(CHICO): chico.data[q].co = w
    crece = 24
    chico.value = 1.0; chico.keyframe_insert('value', frame=1); chico.value = 0.0; chico.keyframe_insert('value', frame=crece)
    # What they lean on: the trunk they hide, as a plain solid no one sees.
    tr = cojin('tronco oculto', J['cadera'].lerp(J['cuello'], 0.5), a_lo_largo(J['cadera'], J['cuello']), (0.085 * C['ancho'], 0.07, (J['cuello'] - J['cadera']).length * 0.62), 2.2, TELAS[0], 'oculto')
    tr.modifiers.new('choque', 'COLLISION'); tr.collision.thickness_outer = 0.006; tr.name = 'tronco'      # it shows where the cloud opens, dressed like the legs
    cl = o.modifiers.new('tela', 'CLOTH'); s = cl.settings; s.quality = 6; s.mass = 0.22; s.tension_stiffness = 14; s.compression_stiffness = 14; s.shear_stiffness = 6; s.bending_stiffness = 0.5
    s.tension_damping = 6; s.compression_damping = 6; s.shear_damping = 6; s.bending_damping = 0.6; s.air_damping = 3.0
    s.use_pressure = True; s.uniform_pressure_force = 11.0; s.pressure_factor = 1.0; s.vertex_group_mass = 'ancla'; s.pin_stiffness = 1.0; s.use_dynamic_mesh = True; s.effector_weights.gravity = 0.0
    c = cl.collision_settings; c.use_collision = True; c.distance_min = 0.004; c.use_self_collision = True; c.self_distance_min = 0.0045; c.collision_quality = 4; c.self_friction = 8
    cl.point_cache.frame_start = 1; cl.point_cache.frame_end = cuadros; E.frame_start = 1; E.frame_end = cuadros
    for f in range(1, cuadros + 1): E.frame_set(f)
    hecha = bpy.data.meshes.new_from_object(o.evaluated_get(bpy.context.evaluated_depsgraph_get())); hecha.name = 'nube hecha'
    for f in hecha.polygons: f.use_smooth = True
    final = bpy.data.objects.new('almohadas', hecha); E.collection.objects.link(final); bpy.data.objects.remove(o, do_unlink=True); E.frame_set(1)
    sub = final.modifiers.new('fina', 'SUBSURF'); sub.levels = 1; sub.render_levels = 2
    COJINES.append((final, tronco_, Quaternion(), Vector((0.3, 0.3, 0.3)), 2.0, 'nube')); return final
NUBE = nube_de_tela(nube)

# ---------- Its legs and its shoes: the only part of its body that shows.
def tubo(nombre, camino, radios, material, lados=22):
    v, caras = [], []; n = len(camino)
    for i, pt in enumerate(camino):
        d = (camino[min(i + 1, n - 1)] - camino[max(i - 1, 0)]).normalized(); q = d.to_track_quat('Z', 'Y')
        v += [pt + q @ Vector((math.cos(math.tau * k / lados) * radios[i], math.sin(math.tau * k / lados) * radios[i], 0)) for k in range(lados)]
    for i in range(n - 1):
        for k in range(lados): caras.append((i * lados + k, i * lados + (k + 1) % lados, (i + 1) * lados + (k + 1) % lados, (i + 1) * lados + k))
    caras.append(tuple(range(lados - 1, -1, -1))); caras.append(tuple((n - 1) * lados + k for k in range(lados)))
    me = bpy.data.meshes.new(nombre); me.from_pydata(v, [], caras); me.update()
    for f in me.polygons: f.use_smooth = True
    o = bpy.data.objects.new(nombre, me); E.collection.objects.link(o); me.materials.append(material); o.modifiers.new('fina', 'SUBSURF').render_levels = 2; return o
def curva(puntos, pasos=10):
    # A smooth path through the points (Catmull-Rom), so that a knee is a bend and not a corner.
    P_ = [puntos[0]] + list(puntos) + [puntos[-1]]; sale = []
    for i in range(1, len(P_) - 2):
        for s in range(pasos):
            t = s / pasos; a0, a1, a2, a3 = P_[i - 1], P_[i], P_[i + 1], P_[i + 2]
            sale.append(0.5 * ((2 * a1) + (-a0 + a2) * t + (2 * a0 - 5 * a1 + 4 * a2 - a3) * t * t + (-a0 + 3 * a1 - 3 * a2 + a3) * t * t * t))
    return sale + [puntos[-1]]
def perfil(t):
    # How thick a leg is from hip (0) to ankle (1): a thigh, a knee, a calf and a narrow ankle.
    claves = [(0, 0.062), (0.2, 0.06), (0.47, 0.041), (0.53, 0.04), (0.68, 0.047), (0.85, 0.033), (1, 0.027)]
    for (t0, r0), (t1, r1) in zip(claves, claves[1:]):
        if t <= t1: u = (t - t0) / (t1 - t0); u = u * u * (3 - 2 * u); return r0 + (r1 - r0) * u
    return claves[-1][1]
# Its legs are long and slim, as a dressmaker's figure has them, and each skin has its own legs and shoes:
#   vinilo  tights and a chunky white sneaker       punto  bare legs in a lighter tone and an ankle boot in its color
#   pana    straight trousers that stop above the ankle, and a pointed flat shoe
PIERNA = {'vinilo': 'malla', 'punto': 'media', 'pana': 'pantalon'}[PIEL]
MALLA = gamuza('malla', mezcla(MANDA, OSCURO, 0.3)) if PIERNA != 'media' else goma('pierna', mezcla(mezcla(MANDA, CLARO, 0.55), GRIS, 0.2)); PANTALON = tela('pantalon', mezcla(MANDA, OSCURO, 0.42))
ZAPATO = goma('zapato', mezcla(CLARO, CLARO2, 0.06)) if PIEL == 'vinilo' else goma('zapato', ACENTO if PIEL == 'punto' else mezcla(OSCURO, MANDA, 0.25)); SUELA = goma('suela', CLARO if PIEL != 'pana' else mezcla(OSCURO, MANDA, 0.1)); RIBETE = goma('ribete', ACENTO if PIEL == 'vinilo' else CLARO)
for o_ in bpy.data.objects:
    if o_.name == 'tronco': o_.data.materials.clear(); o_.data.materials.append(PANTALON if PIERNA == 'pantalon' else MALLA)
def perfil(t):
    claves = [(0, 0.052), (0.22, 0.05), (0.47, 0.034), (0.53, 0.033), (0.68, 0.038), (0.86, 0.025), (1, 0.021)]
    for (t0, r0), (t1, r1) in zip(claves, claves[1:]):
        if t <= t1: u = (t - t0) / (t1 - t0); u = u * u * (3 - 2 * u); return r0 + (r1 - r0) * u
    return claves[-1][1]
for L, s in (('I', 1), ('D', -1)):
    arriba_ = J['ingle.' + L] + Vector((0, 0, 0.06)); tob = J['tobillo.' + L]; camino = curva([arriba_, J['ingle.' + L], J['rodilla.' + L], tob + (tob - J['rodilla.' + L]).normalized() * 0.012], 10)
    largo_total = sum((camino[i + 1] - camino[i]).length for i in range(len(camino) - 1)); acum = 0; radios = []; ts = []
    for i in range(len(camino)):
        t_ = acum / largo_total; ts.append(t_); radios.append(perfil(t_) * (0.8 + 0.2 * m) * (0.85 + 0.15 * (C['muslo'] if t_ < 0.5 else C['pierna']))); acum += (camino[i + 1] - camino[i]).length if i < len(camino) - 1 else 0
    tubo('pierna ' + L, camino, radios, MALLA)
    if PIERNA == 'pantalon':
        corte = max(i for i, t_ in enumerate(ts) if t_ <= 0.84) + 1      # trousers: a straight, looser leg over it, that stops above the ankle
        tubo('pantalon ' + L, camino[:corte], [max(r_ * 1.22, 0.043 * (0.8 + 0.2 * m)) for r_ in radios[:corte]], PANTALON)
    p0, p1 = J['tobillo.' + L], J['punta.' + L]; q = a_lo_largo(p0, p1, Vector((0, 0, 1))); largo_ = (p1 - p0).length * 0.66; an = 0.043 * (0.8 + 0.2 * m) * (0.75 + 0.25 * C['pie'])
    punta_ = {'vinilo': 0.0, 'punto': 0.45, 'pana': 0.7}[PIEL]; gordo_ = {'vinilo': 1.25, 'punto': 1.0, 'pana': 0.72}[PIEL]; suela_alto = {'vinilo': 0.02, 'punto': 0.012, 'pana': 0.007}[PIEL]
    afina = lambda w: 1 - punta_ * max(0.0, w.z / largo_) ** 2                                               # a pointed toe narrows toward the front
    def suela_(w): return Vector((w.x * afina(w), w.y + 0.014 * max(0.0, w.z / largo_) ** 2, w.z))
    def empeine(w): t = (w.z / largo_ + 1) / 2; return Vector((w.x * afina(w) * (0.92 + 0.12 * math.sin(math.pi * t)), w.y * (1.4 - 0.85 * t) * gordo_ + 0.014 * max(0.0, w.z / largo_) ** 2, w.z))
    medio = p0.lerp(p1, 0.42) + q @ Vector((0, -0.012, 0)); alza = 0.028 * gordo_
    cojin('pie suela ' + L, medio + q @ Vector((0, -alza - suela_alto * 0.4, 0)), q, (an * 1.1, suela_alto, largo_ * (1.04 + 0.1 * punta_)), 3.6, SUELA, 'zapato', forma=suela_)
    cojin('pie ' + L, medio, q, (an, 0.03, largo_ * (1.0 + 0.1 * punta_)), 2.5, ZAPATO, 'zapato', forma=empeine)
    if PIEL == 'vinilo': cojin('pie ribete ' + L, medio + q @ Vector((0, -alza + 0.008, 0)), q, (an * 1.07, 0.006, largo_ * 1.02), 3.2, RIBETE, 'zapato', forma=suela_)
    if PIEL == 'punto':
        # A boot: its shaft climbs the shin, wider at the top.
        sube = (J['rodilla.' + L] - p0).normalized(); tubo('pie caña ' + L, [p0 - sube * 0.01 + sube * 0.11 * k / 6 for k in range(7)], [0.03 + 0.006 * k / 6 for k in range(7)], ZAPATO)
    else: cojin('pie cuello ' + L, p0 + q @ Vector((0, 0.012, -0.012)), a_lo_largo(J['tobillo.' + L], J['rodilla.' + L]), (0.03, 0.03, 0.016), 2.4, ZAPATO if PIEL == 'vinilo' else MALLA, 'zapato')
PARES = 0

# Everything down to the floor: the lowest point of a foot touches it.
bajo = min((o.matrix_world @ v.co).z for o, *_ in COJINES if o.name.startswith('pie') for v in o.data.vertices) if any(o.name.startswith('pie') for o, *_ in COJINES) else 0
bpy.context.view_layer.update()
bajo = min((o.matrix_world @ v.co).z for o, *_ in COJINES if o.name.startswith('pie') for v in o.data.vertices)
for o in bpy.data.objects:
    if o.type == 'MESH' and o.name != 'fondo': o.location.z -= bajo

# ---------- The studio: a ground that curves up into the wall, in the hushed leading color; soft light.
mt, A, p = nuevo('fondo'); p.inputs['Base Color'].default_value = FONDO; pon(p, Roughness=0.3, Specular_IOR_Level=0.45)      # a floor that mirrors a little, as a polished stage does
perfil = [(-9, 0)] + [(1.6 + 1.2 * math.sin(t), 1.2 - 1.2 * math.cos(t)) for t in [math.pi / 2 * i / 16 for i in range(17)]] + [(2.8, 9)]
v = [(x, y, z) for x in (-12, 12) for (y, z) in perfil]; n = len(perfil); f = [(i, i + 1, n + i + 1, n + i) for i in range(n - 1)]
me = bpy.data.meshes.new('fondo'); me.from_pydata(v, [], f); me.update()
for q in me.polygons: q.use_smooth = True
fo = bpy.data.objects.new('fondo', me); E.collection.objects.link(fo); me.materials.append(mt)
mundo = bpy.data.worlds.new('mundo'); E.world = mundo; mundo.use_nodes = True; mundo.node_tree.nodes['Background'].inputs['Color'].default_value = mezcla(FONDO, (1, 1, 1, 1), 0.5); mundo.node_tree.nodes['Background'].inputs['Strength'].default_value = 0.3
def luz(nombre, donde, fuerza, lado_, mira=(0, 0, 0.55)):
    d = bpy.data.lights.new(nombre, 'AREA'); d.energy = fuerza; d.size = lado_; o = bpy.data.objects.new(nombre, d); E.collection.objects.link(o); o.location = donde; o.rotation_euler = (Vector(mira) - Vector(donde)).to_track_quat('-Z', 'Y').to_euler()
luz('principal', (-2.4, -2.6, 3.0), 170, 3.2); luz('relleno', (2.8, -2.2, 1.0), 36, 4.0); luz('contra', (1.6, 2.2, 2.4), 120, 2.0)

FUENTE = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'unity', 'Assets', 'ALMA', 'Resources', 'Fuentes', 'RobotoFlex-ALMA.ttf')
cam = bpy.data.objects.new('camara', bpy.data.cameras.new('camara')); E.collection.objects.link(cam); E.camera = cam; cam.data.lens = 85; cam.data.sensor_fit = 'VERTICAL'
alto_figura = max((o.matrix_world @ v.co).z for o, *_ in COJINES for v in o.data.vertices) if False else C['alto'] * 1.08
lejos = (alto_figura * 0.5 * 1.42) / math.tan(math.atan(12 / 85)); cam.location = (math.sin(GIRO) * lejos, -math.cos(GIRO) * lejos, alto_figura * 0.56)
cam.rotation_euler = (Vector((0, 0, alto_figura * 0.5)) - cam.location).to_track_quat('-Z', 'Y').to_euler()
E.render.resolution_y = ALTO - ALTO % 2; E.render.resolution_x = int(ALTO * 0.75) // 2 * 2; E.render.resolution_percentage = 100
E.view_settings.view_transform = 'Standard'; E.view_settings.look = 'None'
if MOTOR == 'cycles':
    import addon_utils; addon_utils.enable('cycles'); E.render.engine = 'CYCLES'; E.cycles.samples = MUESTRAS; E.cycles.use_denoising = True
    try:
        pref = bpy.context.preferences.addons['cycles'].preferences; pref.compute_device_type = 'METAL'; pref.get_devices()
        for d in pref.devices: d.use = True
        E.cycles.device = 'GPU'
    except Exception as e: print('ALMA: cycles sin tarjeta gráfica:', e)
else:
    E.render.engine = 'BLENDER_EEVEE'
    try: E.eevee.use_raytracing = True; E.eevee.taa_render_samples = 64
    except Exception: pass
E.render.image_settings.file_format = 'PNG'; E.render.filepath = SALIDA
bpy.ops.render.render(write_still=True); print(f"ALMA: piloto de {D['nombre']}: piel de {PIEL}, {len(nube)} almohadas de tela inflada → {SALIDA}")
if BLEND: bpy.ops.wm.save_as_mainfile(filepath=BLEND)
