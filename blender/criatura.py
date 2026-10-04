# A creature of an ALMA entity, in Blender. It reads the file `npm run genes -- <id>` writes and builds the creature
# the page draws (entidades/volumen.mjs): a round body, a second solid on its front, two eyes and its rings, in the
# entity's colors, without light or shade: each color is exactly its token. Then it renders it, without a window.
#
#   blender --background --factory-startup --python blender/criatura.py -- <genes.json> <salida.png> [opciones]
#     --nombre "Ana Rojas"   which creature (the first one, if not said)
#     --giro 0               where the camera stands around it, in radians (0 is the front)
#     --lado 1024            the side of the picture, in pixels
#     --fundida              the two solids melt into one body, with a soft joint (only Blender can do this)
#
# The page's space has y up and z toward the viewer; Blender's has z up and -y toward the viewer.
import bpy, json, math, sys
from mathutils import Vector

argv = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
if len(argv) < 2:
    sys.exit('Uso: blender --background --factory-startup --python blender/criatura.py -- <genes.json> <salida.png> [--nombre N] [--giro 0] [--lado 1024] [--fundida]')
def opcion(nombre, defecto):
    return argv[argv.index(nombre) + 1] if nombre in argv else defecto
DATOS = json.load(open(argv[0], encoding='utf-8'))
NOMBRE, GIRO, LADO, FUNDIDA = opcion('--nombre', ''), float(opcion('--giro', 0)), int(opcion('--lado', 1024)), '--fundida' in argv
K = next((c for c in DATOS['criaturas'] if c['nombre'] == NOMBRE), None) if NOMBRE else DATOS['criaturas'][0]
if K is None:
    sys.exit(f"No hay una criatura «{NOMBRE}». Las que hay: {', '.join(c['nombre'] for c in DATOS['criaturas'])}")

def a_blender(p):
    return Vector((p[0], -p[2], p[1]))
def lineal(hex):
    # A token's color is written for a screen; Blender mixes light, so it wants it undone.
    c = [int(hex[i:i + 2], 16) / 255 for i in (1, 3, 5)]
    return [v / 12.92 if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4 for v in c] + [1.0]
def tinta(nombre, hex, linea=None):
    # A material that only shows its color: no light, no shade.
    m = bpy.data.materials.new(nombre); m.use_nodes = True
    n = m.node_tree.nodes; n.clear()
    e, s = n.new('ShaderNodeEmission'), n.new('ShaderNodeOutputMaterial')
    e.inputs['Color'].default_value = lineal(hex); m.node_tree.links.new(e.outputs['Emission'], s.inputs['Surface'])
    m.line_color = lineal(linea or hex)
    return m
def activo(o):
    for x in bpy.context.selected_objects: x.select_set(False)
    o.select_set(True); bpy.context.view_layer.objects.active = o

# ---------- An empty scene that shows colors as they are.
for o in list(bpy.data.objects): bpy.data.objects.remove(o, do_unlink=True)
E = bpy.context.scene
E.render.engine = 'BLENDER_EEVEE'
E.render.resolution_x = E.render.resolution_y = LADO; E.render.resolution_percentage = 100
E.view_settings.view_transform = 'Standard'; E.view_settings.look = 'None'; E.display_settings.display_device = 'sRGB'
E.render.image_settings.file_format = 'PNG'; E.render.film_transparent = False
mundo = bpy.data.worlds.new('fondo'); E.world = mundo; mundo.use_nodes = True
mundo.node_tree.nodes['Background'].inputs['Color'].default_value = lineal(K['fondo'])
mundo.node_tree.nodes['Background'].inputs['Strength'].default_value = 1.0

LLENO, FONDO, TRAZO = K['lleno'], K['fondo'], K['trazo'] * 0.00654
FUERA = 1.012 if FUNDIDA else 1.004   # how far out of the body its rings sit: the melted skin is a little rougher
solidos = K['solidos']

def esfera(s, mat):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=128, ring_count=64, radius=1, location=a_blender(s['centro']))
    o = bpy.context.object; r = s['radios']; o.scale = (r[0], r[2], r[1])
    bpy.ops.object.shade_smooth(); o.data.materials.append(mat)
    return o

# ---------- The body. Filled, each solid is a field of its color. In line, it is the ground's color, and its outline
# (drawn by Freestyle, below) takes the solid's color.
mats = [tinta(f'solido{i}', s['color'] if LLENO else FONDO, s['color']) for i, s in enumerate(solidos)]
if not FUNDIDA:
    for s, m in zip(solidos, mats): esfera(s, m)
else:
    # The two solids as one body: joined, rebuilt as one skin, and smoothed only where they meet. Each face then
    # takes the color of the solid it is nearer to.
    a, b = esfera(solidos[0], mats[0]), esfera(solidos[1], mats[1])
    activo(a); bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    activo(b); bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    activo(a); u = a.modifiers.new('union', 'BOOLEAN'); u.operation = 'UNION'; u.object = b; bpy.ops.object.modifier_apply(modifier='union')
    bpy.data.objects.remove(b, do_unlink=True)
    r = a.modifiers.new('piel', 'REMESH'); r.mode = 'VOXEL'; r.voxel_size = 0.006; r.use_smooth_shade = True; bpy.ops.object.modifier_apply(modifier='piel')
    def lejos(p, s):
        c, q = a_blender(s['centro']), s['radios']
        return math.sqrt(((p.x - c.x) / q[0]) ** 2 + ((p.y - c.y) / q[2]) ** 2 + ((p.z - c.z) / q[1]) ** 2)
    # Only the crease where the two meet is smoothed: there, a point is near the surface of both solids at once.
    junta = a.vertex_groups.new(name='junta'); mundo_a = a.matrix_world
    for v in a.data.vertices:
        p = mundo_a @ v.co; d0, d1 = lejos(p, solidos[0]), lejos(p, solidos[1])
        junta.add([v.index], math.exp(-((d0 - 1) / 0.3) ** 2 - ((d1 - 1) / 0.3) ** 2), 'REPLACE')
    s = a.modifiers.new('suave', 'SMOOTH'); s.factor = 1.0; s.iterations = 120; s.vertex_group = 'junta'; bpy.ops.object.modifier_apply(modifier='suave')
    # One material for the whole body: each point carries the color of the solid it came from, so the border between
    # the two colors is a clean line and not the steps of the skin's little faces.
    c0, c1 = lineal(solidos[0]['color'] if LLENO else FONDO), lineal(solidos[1]['color'] if LLENO else FONDO)
    capa = a.data.color_attributes.new('tinta', 'FLOAT_COLOR', 'POINT')
    for v in a.data.vertices:
        p = v.co; t = min(1.0, max(0.0, 0.5 + (lejos(p, solidos[0]) - lejos(p, solidos[1])) / 0.004))
        capa.data[v.index].color = [c0[n] * (1 - t) + c1[n] * t for n in range(3)] + [1.0]
    m = bpy.data.materials.new('cuerpo'); m.use_nodes = True; n = m.node_tree.nodes; n.clear()
    at, e, sal = n.new('ShaderNodeAttribute'), n.new('ShaderNodeEmission'), n.new('ShaderNodeOutputMaterial'); at.attribute_name = 'tinta'
    m.node_tree.links.new(at.outputs['Color'], e.inputs['Color']); m.node_tree.links.new(e.outputs['Emission'], sal.inputs['Surface'])
    m.line_color = lineal(solidos[0]['color'])
    a.data.materials.clear(); a.data.materials.append(m)
    bpy.ops.object.shade_smooth()

def aro(centro, a, b, grueso, pasos=128, lados=10):
    # A ring as a thin tube: an ellipse of half-axes a and b, lying flat at `centro`.
    v, caras = [], []
    for i in range(pasos):
        t = 2 * math.pi * i / pasos; p = Vector((a * math.cos(t), b * math.sin(t), 0)); n = Vector((b * math.cos(t), a * math.sin(t), 0)).normalized()
        for j in range(lados):
            w = 2 * math.pi * j / lados; v.append(p + n * (grueso * math.cos(w)) + Vector((0, 0, grueso * math.sin(w))))
    for i in range(pasos):
        for j in range(lados):
            i2, j2 = (i + 1) % pasos, (j + 1) % lados; caras.append((i * lados + j, i2 * lados + j, i2 * lados + j2, i * lados + j2))
    m = bpy.data.meshes.new('aro'); m.from_pydata(v, [], caras); m.update()
    o = bpy.data.objects.new('aro', m); o.location = centro; E.collection.objects.link(o)
    for f in m.polygons: f.use_smooth = True
    return o

# ---------- Its rings: around the upright axis of each solid, as many as the entity says (one more on the farther
# solid, as the page draws them), in the ground's color on a filled body and in the solid's color on a line body.
lejanos = sorted(range(len(solidos)), key=lambda i: solidos[i]['centro'][2])
for orden, i in enumerate(lejanos):
    s, n = solidos[i], K['anillos'] + (0 if orden else 1)
    mat = tinta(f'anillo{i}', FONDO if LLENO else s['color'])
    for j in range(1, n + 1):
        f = -math.pi / 2 + math.pi * j / (n + 1); c, r = s['centro'], s['radios']
        o = aro(a_blender([c[0], c[1] + math.sin(f) * r[1], c[2]]), math.cos(f) * r[0] * FUERA, math.cos(f) * r[2] * FUERA, TRAZO * 0.75)
        o.data.materials.append(mat)

# ---------- Its eyes: flat dots lying on the surface, in the ground's color on a filled body.
for n, e in enumerate(K['ojos']):
    s = solidos[e['solido']]; p, c, r = e['punto'], s['centro'], s['radios']
    normal = a_blender([(p[k] - c[k]) / (r[k] * r[k]) for k in range(3)]).normalized()
    bpy.ops.mesh.primitive_uv_sphere_add(segments=48, ring_count=24, radius=1, location=a_blender(p) + normal * 0.002)
    o = bpy.context.object; o.scale = (e['radio'], e['radio'], e['radio'] * 0.12)
    o.rotation_euler = normal.to_track_quat('Z', 'Y').to_euler(); bpy.ops.object.shade_smooth()
    o.data.materials.append(tinta(f'ojo{n}', FONDO if LLENO else s['color']))

# ---------- In line: the outline of each solid, in its color and with the entity's stroke.
if not LLENO:
    E.render.use_freestyle = True; E.render.line_thickness_mode = 'ABSOLUTE'; E.render.line_thickness = 1.0
    capa = bpy.context.view_layer; capa.use_freestyle = True
    ajustes = capa.freestyle_settings
    while len(ajustes.linesets): ajustes.linesets.remove(ajustes.linesets[0])
    lineas = ajustes.linesets.new('contorno')
    cuerpos = bpy.data.collections.new('cuerpos')
    for o in bpy.data.objects:
        if o.name.startswith('Sphere') and o.data.materials and o.data.materials[0].name.startswith(('solido', 'cuerpo')): cuerpos.objects.link(o)
    lineas.select_by_collection = True; lineas.collection = cuerpos; lineas.collection_negation = 'INCLUSIVE'
    lineas.select_silhouette = True; lineas.select_border = False; lineas.select_crease = False; lineas.select_contour = False
    estilo = lineas.linestyle; estilo.color = (1, 1, 1); estilo.thickness = max(1.25, LADO / 96 * K['trazo']); estilo.thickness_position = 'CENTER'
    m = estilo.color_modifiers.new('del material', 'MATERIAL'); m.material_attribute = 'LINE'; m.blend = 'MIX'; m.influence = 1.0

# ---------- The page's camera.
C = DATOS['camara']; medio = (K['alto'] + K['bajo']) / 2
cam = bpy.data.objects.new('camara', bpy.data.cameras.new('camara')); E.collection.objects.link(cam); E.camera = cam
cam.data.sensor_fit = 'HORIZONTAL'; cam.data.angle = math.radians(C['campo']); cam.data.clip_start = 0.1; cam.data.clip_end = 20
cam.location = a_blender([math.sin(GIRO) * C['distancia'], C['altura'], math.cos(GIRO) * C['distancia']])
cam.rotation_euler = (a_blender([0, medio, 0]) - cam.location).to_track_quat('-Z', 'Y').to_euler()

E.render.filepath = argv[1]
bpy.ops.render.render(write_still=True)
print(f"ALMA: {K['nombre']} de {DATOS['nombre']}, {'fundida' if FUNDIDA else 'fiel'}, {'llena' if LLENO else 'en línea'} → {argv[1]}")
