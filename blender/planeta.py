# The planet of an ALMA entity: a round world made whole by one geometry-nodes tree, from the entity's genes. Nothing
# in it is modelled by hand: a sphere is raised into continents and mountains by noise, a second sphere is its sea, and
# trees and rocks are scattered where the land allows. Every entity gets its own, and the same entity always the same.
# What it takes from the entity (the file `npm run genes -- <id>` writes):
#   semilla → which world it is · grupos → how many continents · redondez → soft hills or sharp ridges
#   puntas → how high its mountains · complejidad → how much detail · trazo → how much sea · focos → how much forest
#   its colors → the land from shore to peak, the sea, the trees and the air
# The tree's inputs are left open on the modifier (Semilla, Relieve, Mar, Bosque…), to be moved by hand in the file
# `--blend` writes. It is drawn with Cycles.
#
#   blender --background --factory-startup --python blender/planeta.py -- <genes.json> <salida.png> [--alto 1600] [--muestras 48] [--subdiv 8] [--giro 0.6] [--blend f]
import bpy, json, math, random, sys, os

argv = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
def opcion(nombre, defecto):
    if nombre not in argv: return defecto
    i = argv.index(nombre); v = argv[i + 1]; del argv[i:i + 2]; return v
ALTO, MUESTRAS, SUBDIV, GIRO, BLEND = int(opcion('--alto', 1600)), int(opcion('--muestras', 48)), int(opcion('--subdiv', 8)), float(opcion('--giro', 0.6)), opcion('--blend', '')
if len(argv) < 2: sys.exit('Uso: blender --background --factory-startup --python blender/planeta.py -- <genes.json> <salida.png> [--alto 1600] [--muestras 48] [--subdiv 8] [--giro 0.6] [--blend f]')
D = json.load(open(argv[0], encoding='utf-8')); SALIDA = argv[1]; G = D['genes']

def lineal(hex):
    c = [int(hex[i:i + 2], 16) / 255 for i in (1, 3, 5)]
    return [v / 12.92 if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4 for v in c] + [1.0]
def mezcla(a, b, t): return [a[i] + (b[i] - a[i]) * t for i in range(3)] + [1.0]
b = G['pieza']['barras']; TINTA, BASE, ACENTO = lineal(G['pieza']['tinta']), lineal(G['pieza']['base']), lineal(G['pieza']['acento'])
HONDO = lineal(G['fondo']['dark']['acento'])

# What the genes say, as the tree's numbers.
VALORES = {
    'Semilla': random.Random(G['semilla'] + '|planeta').randrange(1, 9999),
    'Radio': 1.0,
    'Continentes': 0.75 + 0.45 * G.get('grupos', 2),
    'Angulosidad': 1.0 - G.get('redondez', 0.5),
    'Relieve': 0.08 + 0.012 * G.get('puntas', 5),
    'Detalle': 3.0 + 1.5 * G.get('complejidad', 3),
    'Mar': 0.44 + (1.0 - G.get('trazo', 1.0)) * 0.3,
    'Bosque': 5000.0 * G.get('focos', 3),
    'Rocas': 6000.0,
    'Subdivisiones': SUBDIV,
}

for o in list(bpy.data.objects): bpy.data.objects.remove(o, do_unlink=True)

# ---- What it is made of
def material(nombre, color, aspero, **mas):
    m = bpy.data.materials.new(nombre); m.use_nodes = True; p = m.node_tree.nodes['Principled BSDF']
    p.inputs['Base Color'].default_value = color; p.inputs['Roughness'].default_value = aspero
    for k, v in mas.items(): p.inputs[k].default_value = v
    return m
# The land: its color is how high it is, from the shore to the peaks, a little darker where it is steep.
TIERRA = material('ALMA tierra', BASE, 0.9); T = TIERRA.node_tree; pr = T.nodes['Principled BSDF']
alt = T.nodes.new('ShaderNodeAttribute'); alt.attribute_name = 'altura'; llano = T.nodes.new('ShaderNodeAttribute'); llano.attribute_name = 'llano'
rampa = T.nodes.new('ShaderNodeValToRGB'); E = rampa.color_ramp.elements; E[0].position = 0.0; E[0].color = mezcla(lineal(b[4]), BASE, 0.25); E[1].position = 1.0; E[1].color = TINTA
for pos, col in ((0.06, lineal(b[1])), (0.3, lineal(b[3])), (0.55, mezcla(lineal(b[0]), BASE, 0.35)), (0.8, lineal(b[0]))): e = E.new(pos); e.color = col
sombra = T.nodes.new('ShaderNodeMapRange'); sombra.inputs['From Min'].default_value = 0.55; sombra.inputs['From Max'].default_value = 0.95; sombra.inputs['To Min'].default_value = 0.45; sombra.inputs['To Max'].default_value = 1.0
mult = T.nodes.new('ShaderNodeMixRGB'); mult.blend_type = 'MULTIPLY'; mult.inputs['Fac'].default_value = 1.0
T.links.new(alt.outputs['Fac'], rampa.inputs['Fac']); T.links.new(llano.outputs['Fac'], sombra.inputs['Value']); T.links.new(rampa.outputs['Color'], mult.inputs['Color1']); T.links.new(sombra.outputs['Result'], mult.inputs['Color2']); T.links.new(mult.outputs['Color'], pr.inputs['Base Color'])
AGUA = material('ALMA mar', mezcla(mezcla(HONDO, BASE, 0.55), ACENTO, 0.08), 0.22)      # (deep and dark, so that the land is read against it)
ARBOL = material('ALMA árbol', mezcla(lineal(b[2]), BASE, 0.2), 0.8)
ROCA = material('ALMA roca', mezcla(lineal(b[4]), BASE, 0.4), 0.95)

# ---- The tree
g = bpy.data.node_groups.new('ALMA planeta', 'GeometryNodeTree'); I = g.interface
I.new_socket('Planeta', in_out='OUTPUT', socket_type='NodeSocketGeometry')
ENTRADAS = {}
for nombre, tipo, minimo, maximo in (('Semilla', 'Int', 0, 9999), ('Radio', 'Float', 0.1, 100), ('Continentes', 'Float', 0.3, 6), ('Angulosidad', 'Float', 0, 1), ('Relieve', 'Float', 0, 0.5),
                                     ('Detalle', 'Float', 0, 15), ('Mar', 'Float', 0, 1), ('Bosque', 'Float', 0, 20000), ('Rocas', 'Float', 0, 20000), ('Subdivisiones', 'Int', 1, 9)):
    s = I.new_socket(nombre, in_out='INPUT', socket_type='NodeSocket' + tipo); s.default_value = VALORES[nombre]; s.min_value = minimo; s.max_value = maximo; ENTRADAS[nombre] = s
entra, sale = g.nodes.new('NodeGroupInput'), g.nodes.new('NodeGroupOutput')
cuenta = [0]
def nodo(tipo, **props):
    n = g.nodes.new(tipo); n.location = (220 * (cuenta[0] % 12), -260 * (cuenta[0] // 12)); cuenta[0] += 1
    for k, v in props.items(): setattr(n, k, v)
    return n
def pon(destino, valor):
    if hasattr(valor, 'is_output'): g.links.new(valor, destino)
    else: destino.default_value = valor
def cuenta_con(operacion, a, b=None, c=None):
    n = nodo('ShaderNodeMath', operation=operacion); pon(n.inputs[0], a)
    if b is not None: pon(n.inputs[1], b)
    if c is not None: pon(n.inputs[2], c)
    return n.outputs[0]
def vector(operacion, a, b=None, escala=None):
    n = nodo('ShaderNodeVectorMath', operation=operacion); pon(n.inputs[0], a)
    if b is not None: pon(n.inputs[1], b)
    if escala is not None: pon(n.inputs['Scale'], escala)
    return n.outputs['Value'] if operacion in ('DOT_PRODUCT', 'LENGTH') else n.outputs['Vector']
def ruido(donde, escala, detalle, aspero):
    n = nodo('ShaderNodeTexNoise', noise_dimensions='3D'); g.links.new(donde, n.inputs['Vector']); pon(n.inputs['Scale'], escala); pon(n.inputs['Detail'], detalle); pon(n.inputs['Roughness'], aspero)
    return n.outputs['Fac']
def suave(valor, desde, hasta):
    n = nodo('ShaderNodeMapRange', interpolation_type='SMOOTHSTEP'); pon(n.inputs['Value'], valor); pon(n.inputs['From Min'], desde); pon(n.inputs['From Max'], hasta); return n.outputs['Result']
def guarda(geo, nombre, valor):
    n = nodo('GeometryNodeStoreNamedAttribute', data_type='FLOAT', domain='POINT'); g.links.new(geo, n.inputs['Geometry']); n.inputs['Name'].default_value = nombre; g.links.new(valor, n.inputs['Value']); return n.outputs['Geometry']
def lee(nombre):
    n = nodo('GeometryNodeInputNamedAttribute', data_type='FLOAT'); n.inputs['Name'].default_value = nombre; return n.outputs['Attribute']
def con(geo, mat):
    n = nodo('GeometryNodeSetMaterial'); g.links.new(geo, n.inputs['Geometry']); n.inputs['Material'].default_value = mat; return n.outputs['Geometry']
E_ = lambda nombre: entra.outputs[nombre]

# The ball, and where on it each point is (as a direction from its middle); the seed moves the noise somewhere else.
bola = nodo('GeometryNodeMeshIcoSphere'); pon(bola.inputs['Radius'], E_('Radio')); pon(bola.inputs['Subdivisions'], E_('Subdivisiones'))
hacia = vector('NORMALIZE', nodo('GeometryNodeInputPosition').outputs['Position'])
corre = nodo('ShaderNodeCombineXYZ'); pon(corre.inputs['X'], cuenta_con('MULTIPLY', E_('Semilla'), 13.71)); pon(corre.inputs['Y'], cuenta_con('MULTIPLY', E_('Semilla'), 7.13)); pon(corre.inputs['Z'], cuenta_con('MULTIPLY', E_('Semilla'), 3.37))
lugar = vector('ADD', hacia, corre.outputs['Vector'])
# Continents (one slow noise), mountains (a faster one, folded into ridges as much as the entity is angular) and grain.
continente = ruido(lugar, E_('Continentes'), 3.0, 0.55)
bulto = ruido(lugar, cuenta_con('MULTIPLY', E_('Continentes'), 3.1), E_('Detalle'), cuenta_con('SUBTRACT', 0.62, cuenta_con('MULTIPLY', cuenta_con('SUBTRACT', 1.0, E_('Angulosidad')), 0.2)))
cresta = cuenta_con('SUBTRACT', 1.0, cuenta_con('ABSOLUTE', cuenta_con('SUBTRACT', cuenta_con('MULTIPLY', bulto, 2.0), 1.0)))
monte = nodo('ShaderNodeMix', data_type='FLOAT'); pon(monte.inputs['Factor'], E_('Angulosidad')); pon(monte.inputs['A'], bulto); pon(monte.inputs['B'], cresta)
grano = ruido(lugar, cuenta_con('MULTIPLY', E_('Continentes'), 14.0), 2.0, 0.6)
tierra = suave(continente, E_('Mar'), cuenta_con('ADD', E_('Mar'), 0.22))                                   # 0 at the shore, 1 inland
altura = cuenta_con('MULTIPLY', tierra, cuenta_con('ADD', cuenta_con('MULTIPLY', monte.outputs['Result'], 0.8), cuenta_con('ADD', 0.14, cuenta_con('MULTIPLY', grano, 0.12))))
bajoElMar = cuenta_con('MULTIPLY', cuenta_con('MINIMUM', cuenta_con('SUBTRACT', continente, E_('Mar')), 0.0), 0.6)
sube = cuenta_con('MULTIPLY', cuenta_con('MULTIPLY', cuenta_con('ADD', altura, bajoElMar), E_('Relieve')), E_('Radio'))
mueve = nodo('GeometryNodeSetPosition'); g.links.new(bola.outputs['Mesh'], mueve.inputs['Geometry']); g.links.new(vector('SCALE', hacia, escala=cuenta_con('ADD', E_('Radio'), sube)), mueve.inputs['Position'])
suelo = guarda(mueve.outputs['Geometry'], 'altura', altura)
suelo = guarda(suelo, 'llano', vector('DOT_PRODUCT', nodo('GeometryNodeInputNormal').outputs['Normal'], vector('NORMALIZE', nodo('GeometryNodeInputPosition').outputs['Position'])))
liso = nodo('GeometryNodeSetShadeSmooth'); g.links.new(suelo, liso.inputs['Geometry']); suelo = con(liso.outputs['Geometry'], TIERRA)

# The sea: a second ball, a hair above where the land begins.
mar = nodo('GeometryNodeMeshIcoSphere'); pon(mar.inputs['Radius'], cuenta_con('MULTIPLY', E_('Radio'), cuenta_con('ADD', 1.0, cuenta_con('MULTIPLY', E_('Relieve'), 0.02)))); pon(mar.inputs['Subdivisions'], 6)
marLiso = nodo('GeometryNodeSetShadeSmooth'); g.links.new(mar.outputs['Mesh'], marLiso.inputs['Geometry']); agua = con(marLiso.outputs['Geometry'], AGUA)

# What grows and what lies on it: trees on low flat land, rocks where it is steep. Each stands along the ground's normal.
def siembra(cuanto, donde, cosa, semilla, chico, grande):
    d = nodo('GeometryNodeDistributePointsOnFaces', distribute_method='RANDOM'); g.links.new(suelo, d.inputs['Mesh']); g.links.new(cuenta_con('MULTIPLY', cuanto, donde), d.inputs['Density']); pon(d.inputs['Seed'], cuenta_con('ADD', E_('Semilla'), semilla))
    azar = nodo('FunctionNodeRandomValue', data_type='FLOAT'); azar.inputs['Min'].default_value = chico; azar.inputs['Max'].default_value = grande; pon(azar.inputs['Seed'], semilla)
    n = nodo('GeometryNodeInstanceOnPoints'); g.links.new(d.outputs['Points'], n.inputs['Points']); g.links.new(cosa, n.inputs['Instance']); g.links.new(d.outputs['Rotation'], n.inputs['Rotation']); g.links.new(azar.outputs['Value'], n.inputs['Scale'])
    return n.outputs['Instances']
def franja(valor, a, b_, c, d):      # 1 between b and c, falling to 0 at a and at d
    return cuenta_con('MULTIPLY', suave(valor, a, b_), cuenta_con('SUBTRACT', 1.0, suave(valor, c, d)))
cono = nodo('GeometryNodeMeshCone'); cono.inputs['Vertices'].default_value = 6; pon(cono.inputs['Radius Bottom'], cuenta_con('MULTIPLY', E_('Radio'), 0.0045)); pon(cono.inputs['Depth'], cuenta_con('MULTIPLY', E_('Radio'), 0.015))
piedra = nodo('GeometryNodeMeshIcoSphere'); pon(piedra.inputs['Radius'], cuenta_con('MULTIPLY', E_('Radio'), 0.0035)); piedra.inputs['Subdivisions'].default_value = 1
arboles = siembra(E_('Bosque'), cuenta_con('MULTIPLY', franja(lee('altura'), 0.03, 0.1, 0.42, 0.6), suave(lee('llano'), 0.86, 0.96)), con(cono.outputs['Mesh'], ARBOL), 11, 0.55, 1.5)
rocas = siembra(E_('Rocas'), cuenta_con('MULTIPLY', suave(lee('altura'), 0.04, 0.2), cuenta_con('SUBTRACT', 1.0, suave(lee('llano'), 0.7, 0.9))), con(piedra.outputs['Mesh'], ROCA), 29, 0.5, 1.8)

junta = nodo('GeometryNodeJoinGeometry')
for parte in (suelo, agua, arboles, rocas): g.links.new(parte, junta.inputs['Geometry'])
g.links.new(junta.outputs['Geometry'], sale.inputs['Planeta']); entra.location = (-300, 0); sale.location = (2900, 0)

# ---- The planet, its air, its sun and whoever looks at it
planeta = bpy.data.objects.new('Planeta de ' + G['nombre'], bpy.data.meshes.new('planeta')); bpy.context.scene.collection.objects.link(planeta)
mod = planeta.modifiers.new('ALMA planeta', 'NODES'); mod.node_group = g
# (the tree's inputs start at what the genes say, so the modifier needs nothing set on it)
planeta.rotation_euler = (math.radians(18), 0, GIRO)
bpy.ops.mesh.primitive_uv_sphere_add(segments=96, ring_count=48, radius=1.07); aire = bpy.context.object; aire.name = 'Aire'; bpy.ops.object.shade_smooth()
A = bpy.data.materials.new('ALMA aire'); A.use_nodes = True; N = A.node_tree.nodes; K = A.node_tree.links; N.remove(N['Principled BSDF'])
borde, nada, luz, mez, pot = N.new('ShaderNodeLayerWeight'), N.new('ShaderNodeBsdfTransparent'), N.new('ShaderNodeEmission'), N.new('ShaderNodeMixShader'), N.new('ShaderNodeMath')
borde.inputs['Blend'].default_value = 0.2; pot.operation = 'POWER'; pot.inputs[1].default_value = 2.2; luz.inputs['Color'].default_value = mezcla(ACENTO, TINTA, 0.35); luz.inputs['Strength'].default_value = 1.6
K.new(borde.outputs['Facing'], pot.inputs[0]); K.new(pot.outputs[0], mez.inputs['Fac']); K.new(nada.outputs['BSDF'], mez.inputs[1]); K.new(luz.outputs['Emission'], mez.inputs[2]); K.new(mez.outputs['Shader'], N['Material Output'].inputs['Surface'])
aire.data.materials.append(A); aire.visible_shadow = False

sc = bpy.context.scene; sc.render.engine = 'CYCLES'; sc.cycles.samples = MUESTRAS; sc.cycles.use_denoising = True; sc.render.resolution_x = sc.render.resolution_y = ALTO; sc.render.film_transparent = False
mundo = bpy.data.worlds.new('negro'); mundo.use_nodes = True; mundo.node_tree.nodes['Background'].inputs['Color'].default_value = (0, 0, 0, 1); sc.world = mundo
sol = bpy.data.objects.new('Sol', bpy.data.lights.new('Sol', 'SUN')); sol.data.energy = 4.5; sol.data.angle = math.radians(1.5); sol.rotation_euler = (math.radians(62), 0, math.radians(48)); sc.collection.objects.link(sol)
relleno = bpy.data.objects.new('Relleno', bpy.data.lights.new('Relleno', 'SUN')); relleno.data.energy = 0.25; relleno.rotation_euler = (math.radians(70), 0, math.radians(-150)); sc.collection.objects.link(relleno)
cam = bpy.data.objects.new('Cámara', bpy.data.cameras.new('Cámara')); cam.data.lens = 70; cam.location = (0, -5.6, 0); cam.rotation_euler = (math.radians(90), 0, 0); sc.collection.objects.link(cam); sc.camera = cam
sc.view_settings.view_transform = 'Standard'

os.makedirs(os.path.dirname(os.path.abspath(SALIDA)), exist_ok=True)
if BLEND: bpy.ops.wm.save_as_mainfile(filepath=os.path.abspath(BLEND))
sc.render.filepath = os.path.abspath(SALIDA); bpy.ops.render.render(write_still=True)
dg = bpy.context.evaluated_depsgraph_get(); ev = planeta.evaluated_get(dg); cosas = sum(1 for i in dg.object_instances if i.is_instance and i.parent and i.parent.original == planeta)
print(f"ALMA: planeta de {G['nombre']}: {len(ev.data.vertices)} vértices de suelo y mar, {cosas} árboles y rocas · " + ', '.join(f'{k} {round(v, 3) if isinstance(v, float) else v}' for k, v in VALORES.items()) + f' → {SALIDA}')
