# Material samples of an ALMA entity: four square pieces, side by side, each one a material, all cut by the same
# drawing: the entity's own pattern (entidades/patron.mjs, a Chladni figure made with its numbers). The pattern is
# not painted on them: it decides what each one is made of.
#   tejido    a knit of two yarns: the pattern says which yarn goes where, stitch by stitch
#   recorte   two layers: the top one is cut away where the pattern is high, and shows the one below, with its eyelets
#   resina    a solid grown along the pattern's lines, translucent, in a blend of the two colors
#   goma      a slab whose ribs follow the pattern, like the tread of a sole
# Two of the entity's colors and no more. It reads the file `npm run genes -- <id>` writes.
#
#   blender --background --factory-startup --python blender/probetas.py -- <genes.json> <salida.png> [--ancho 2400] [--motor eevee|cycles] [--blend archivo.blend]
import bpy, json, math, sys, os
from mathutils import Vector

argv = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
def opcion(nombre, defecto):
    if nombre not in argv: return defecto
    i = argv.index(nombre); v = argv[i + 1]; del argv[i:i + 2]; return v
ANCHO, MOTOR, BLEND = int(opcion('--ancho', 2400)), opcion('--motor', 'eevee'), opcion('--blend', '')
if len(argv) < 2: sys.exit('Uso: blender --background --factory-startup --python blender/probetas.py -- <genes.json> <salida.png> [--ancho 2400] [--motor eevee|cycles] [--blend archivo.blend]')
D = json.load(open(argv[0], encoding='utf-8')); SALIDA = argv[1]; G = D['genes']; MODOS = D['patron']['modos']; T = D.get('materiales', {})
ZOOM = 0.62        # how much of the pattern a sample shows: the whole figure would be too fine for one piece

def lineal(hex):
    c = [int(hex[i:i + 2], 16) / 255 for i in (1, 3, 5)]
    return [v / 12.92 if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4 for v in c] + [1.0]
def mezcla(a, b, t): return [a[i] + (b[i] - a[i]) * t for i in range(3)] + [1.0]
b = G['pieza']['barras']; UNO, DOS = lineal(b[1]), lineal(b[2])          # the deep one of its first color and the light one of its second
PAPEL, TINTA = lineal(G['fondo']['light']['base']), lineal(G['fondo']['light']['tinta'])

# ---------- The pattern, as nodes. The same sum of waves works inside a material and inside a geometry-nodes group.
def cuenta(A, op, a, b=None, c=None):
    n = A.nodes.new('ShaderNodeMath'); n.operation = op
    for i, v in enumerate((a, b, c)):
        if v is None: continue
        if isinstance(v, (int, float)): n.inputs[i].default_value = v
        else: A.links.new(v, n.inputs[i])
    return n.outputs[0]
def patron(A, u, v, modos=None):
    u, v = cuenta(A, 'MULTIPLY', u, ZOOM), cuenta(A, 'MULTIPLY', v, ZOOM); total = None
    for m in (modos or MODOS):
        cu = lambda k, x: cuenta(A, 'COSINE', cuenta(A, 'MULTIPLY', x, k * math.pi))
        t = cuenta(A, 'ADD', cuenta(A, 'MULTIPLY', cu(m['n'], u), cu(m['m'], v)), cuenta(A, 'MULTIPLY', cuenta(A, 'MULTIPLY', cu(m['m'], u), cu(m['n'], v)), m['s']))
        t = cuenta(A, 'MULTIPLY', t, m['a']); total = t if total is None else cuenta(A, 'ADD', total, t)
    return total
def uv_de_material(A):
    # Where a point is on its sample, from 0 to 1 each way (the sample is one unit wide, centered on its own origin).
    c, s = A.nodes.new('ShaderNodeTexCoord'), A.nodes.new('ShaderNodeSeparateXYZ'); A.links.new(c.outputs['Object'], s.inputs['Vector'])
    return cuenta(A, 'ADD', s.outputs['X'], 0.5), cuenta(A, 'ADD', s.outputs['Y'], 0.5), s.outputs['Z']
def material(nombre):
    m = bpy.data.materials.new(nombre); m.use_nodes = True; return m, m.node_tree, m.node_tree.nodes['Principled BSDF']
def pon(p, **k):
    for nombre, valor in k.items():
        if nombre.replace('_', ' ') in p.inputs: p.inputs[nombre.replace('_', ' ')].default_value = valor
def dos_colores(A, factor, a, b_):
    n = A.nodes.new('ShaderNodeMix'); n.data_type = 'RGBA'; n.inputs['A'].default_value = a; n.inputs['B'].default_value = b_; A.links.new(factor, n.inputs['Factor']); return n
def relieve(A, p, altura, fuerza, hondo):
    n = A.nodes.new('ShaderNodeBump'); n.inputs['Strength'].default_value = fuerza; n.inputs['Distance'].default_value = hondo; A.links.new(altura, n.inputs['Height'])
    if p.inputs['Normal'].links: A.links.new(p.inputs['Normal'].links[0].from_socket, n.inputs['Normal'])
    A.links.new(n.outputs['Normal'], p.inputs['Normal'])
def punto(A, u, v, ancho, alto):
    # A knit: rows of stitches, each row shifted half a stitch. Returns the height of the stitch at this point (0 to
    # 1) and the place of its middle, so that a whole stitch takes one yarn.
    fila = cuenta(A, 'DIVIDE', v, alto); corre = cuenta(A, 'MULTIPLY', cuenta(A, 'FLOOR', fila), 0.5); col = cuenta(A, 'ADD', cuenta(A, 'DIVIDE', u, ancho), corre)
    du, dv = cuenta(A, 'SUBTRACT', cuenta(A, 'FRACT', col), 0.5), cuenta(A, 'SUBTRACT', cuenta(A, 'FRACT', fila), 0.5)
    lejos = cuenta(A, 'SQRT', cuenta(A, 'ADD', cuenta(A, 'MULTIPLY', du, du), cuenta(A, 'MULTIPLY', dv, dv)))
    um = cuenta(A, 'MULTIPLY', cuenta(A, 'SUBTRACT', cuenta(A, 'ADD', cuenta(A, 'FLOOR', col), 0.5), corre), ancho); vm = cuenta(A, 'MULTIPLY', cuenta(A, 'ADD', cuenta(A, 'FLOOR', fila), 0.5), alto)
    return cuenta(A, 'SUBTRACT', 1.0, cuenta(A, 'MULTIPLY', lejos, 1.6)), um, vm
def tela(p):
    V = T.get('tela', {}); pon(p, Roughness=V.get('aspereza', 0.9), Sheen_Weight=V.get('brilloDeBorde', 1.0), Sheen_Roughness=0.4, Specular_IOR_Level=0.2)

# ---------- The four materials.
def tejido():
    m, A, p = material('tejido'); u, v, _ = uv_de_material(A); tela(p)
    alto, um, vm = punto(A, u, v, 0.0105, 0.0075); lado = cuenta(A, 'GREATER_THAN', patron(A, um, vm), 0.0)          # the pattern, asked stitch by stitch
    color = dos_colores(A, lado, UNO, DOS); sombra = A.nodes.new('ShaderNodeMix'); sombra.data_type = 'RGBA'; sombra.blend_type = 'MULTIPLY'; sombra.inputs['B'].default_value = (0.5, 0.5, 0.5, 1)
    A.links.new(color.outputs['Result'], sombra.inputs['A']); A.links.new(cuenta(A, 'SUBTRACT', 1.0, cuenta(A, 'MAXIMUM', cuenta(A, 'MINIMUM', cuenta(A, 'MULTIPLY', alto, 1.6), 1.0), 0.0)), sombra.inputs['Factor'])
    A.links.new(sombra.outputs['Result'], p.inputs['Base Color']); relieve(A, p, alto, 0.9, 0.004)
    # The yarn that is the pattern's high side stands a little prouder, as a rib does.
    relieve(A, p, cuenta(A, 'MULTIPLY', lado, 1.0), 0.35, 0.006)
    return m
def capa(nombre, color, ojales):
    m, A, p = material(nombre); u, v, _ = uv_de_material(A); tela(p); alto, um, vm = punto(A, u, v, 0.008, 0.006); relieve(A, p, alto, 0.8, 0.003)
    if ojales:
        # Eyelets: small holes in rows, seen as dark dots.
        hoyo, hu, hv = punto(A, u, v, 0.062, 0.062); esta = cuenta(A, 'GREATER_THAN', hoyo, 0.72)
        c = dos_colores(A, esta, color, mezcla(color, (0, 0, 0, 1), 0.82)); A.links.new(c.outputs['Result'], p.inputs['Base Color']); relieve(A, p, cuenta(A, 'SUBTRACT', 1.0, esta), 0.8, 0.006)
    else: p.inputs['Base Color'].default_value = color
    return m
def resina():
    m, A, p = material('resina'); u, v, z = uv_de_material(A); V = T.get('acrilico', {})
    pon(p, Roughness=V.get('aspereza', 0.06) + 0.06, Coat_Weight=V.get('capa', 1.0), Coat_Roughness=0.03, Subsurface_Weight=V.get('luzInterior', 0.9), Subsurface_Scale=0.08, Transmission_Weight=V.get('pasoDeLuz', 0.12) + 0.2, IOR=1.49)
    pon(p, Subsurface_Radius=(1.0, 1.0, 1.0))
    # One color in the middle of the sample and the other toward its edges, blended.
    du, dv = cuenta(A, 'SUBTRACT', u, 0.5), cuenta(A, 'SUBTRACT', v, 0.5); lejos = cuenta(A, 'SQRT', cuenta(A, 'ADD', cuenta(A, 'MULTIPLY', du, du), cuenta(A, 'MULTIPLY', dv, dv)))
    r = A.nodes.new('ShaderNodeMapRange'); r.inputs['From Min'].default_value = 0.16; r.inputs['From Max'].default_value = 0.5; A.links.new(lejos, r.inputs['Value'])
    c = dos_colores(A, r.outputs['Result'], mezcla(DOS, (1, 1, 1, 1), 0.15), mezcla(UNO, (1, 1, 1, 1), 0.1)); A.links.new(c.outputs['Result'], p.inputs['Base Color'])
    for k in ('use_raytrace_refraction',):
        if hasattr(m, k): setattr(m, k, True)
    return m
def goma():
    m, A, p = material('goma'); u, v, _ = uv_de_material(A); V = T.get('arcilla', {})
    pon(p, Roughness=0.72, Sheen_Weight=0.1, Subsurface_Weight=0.05)
    lado = cuenta(A, 'GREATER_THAN', patron(A, u, v), 0.0)                                   # two rubbers: the pattern says which
    c = dos_colores(A, lado, mezcla(UNO, PAPEL, 0.8), mezcla(DOS, UNO, 0.1)); A.links.new(c.outputs['Result'], p.inputs['Base Color'])
    g = A.nodes.new('ShaderNodeTexNoise'); g.inputs['Scale'].default_value = 900; relieve(A, p, g.outputs['Fac'], 0.1, 0.0006)
    return m

# ---------- The pieces. Each is a flat grid shaped by a geometry-nodes group that asks the pattern point by point.
def grupo(nombre, armar):
    g = bpy.data.node_groups.new(nombre, 'GeometryNodeTree'); g.interface.new_socket('Entra', in_out='INPUT', socket_type='NodeSocketGeometry'); g.interface.new_socket('Sale', in_out='OUTPUT', socket_type='NodeSocketGeometry')
    ent, sal, pos, sep = g.nodes.new('NodeGroupInput'), g.nodes.new('NodeGroupOutput'), g.nodes.new('GeometryNodeInputPosition'), g.nodes.new('ShaderNodeSeparateXYZ'); g.links.new(pos.outputs['Position'], sep.inputs['Vector'])
    u, v = cuenta(g, 'ADD', sep.outputs['X'], 0.5), cuenta(g, 'ADD', sep.outputs['Y'], 0.5); g.links.new(armar(g, ent.outputs['Entra'], u, v), sal.inputs['Sale']); return g
def quita(g, geo, donde):
    n = g.nodes.new('GeometryNodeDeleteGeometry'); n.domain = 'FACE'; g.links.new(geo, n.inputs['Geometry']); g.links.new(donde, n.inputs['Selection']); return n.outputs['Geometry']
def rejilla(nombre, lados, x, z=0.0):
    bpy.ops.mesh.primitive_grid_add(x_subdivisions=lados, y_subdivisions=lados, size=1.0, location=(x, 0, z)); o = bpy.context.object; o.name = nombre
    for f in o.data.polygons: f.use_smooth = True
    return o
def con_nodos(o, g): m = o.modifiers.new('patron', 'NODES'); m.node_group = g
def grueso(o, cuanto): m = o.modifiers.new('grueso', 'SOLIDIFY'); m.thickness = cuanto; m.offset = 1.0

for o in list(bpy.data.objects): bpy.data.objects.remove(o, do_unlink=True)
E = bpy.context.scene; PASO = 1.28; X = [(i - 1.5) * PASO for i in range(4)]

o = rejilla('tejido', 4, X[0]); grueso(o, 0.012); o.data.materials.append(tejido())

o = rejilla('recorte abajo', 4, X[1]); grueso(o, 0.01); o.data.materials.append(capa('capa de abajo', mezcla(DOS, UNO, 0.0), True))
o = rejilla('recorte arriba', 300, X[1], 0.014); con_nodos(o, grupo('recorte', lambda g, geo, u, v: quita(g, geo, cuenta(g, 'GREATER_THAN', patron(g, u, v), 0.12)))); grueso(o, 0.028); o.data.materials.append(capa('capa de arriba', UNO, False))

o = rejilla('resina', 260, X[2], 0.01)
con_nodos(o, grupo('resina', lambda g, geo, u, v: quita(g, geo, cuenta(g, 'GREATER_THAN', cuenta(g, 'ABSOLUTE', patron(g, u, v)), 0.36)))); grueso(o, 0.11)
r = o.modifiers.new('fundida', 'REMESH'); r.mode = 'VOXEL'; r.voxel_size = 0.007; r.use_smooth_shade = True
s = o.modifiers.new('suave', 'SMOOTH'); s.factor = 0.9; s.iterations = 60; o.data.materials.append(resina())

def surcos(g, geo, u, v):
    # Ribs that follow the pattern's level lines, flat on top.
    P = patron(g, u, v); ola = cuenta(g, 'SINE', cuenta(g, 'MULTIPLY', P, 15.0)); cresta = cuenta(g, 'MINIMUM', cuenta(g, 'MAXIMUM', cuenta(g, 'MULTIPLY', cuenta(g, 'ADD', ola, 0.25), 2.2), 0.0), 1.0)
    alto = cuenta(g, 'MULTIPLY', cresta, 0.028)
    z = g.nodes.new('ShaderNodeCombineXYZ'); g.links.new(alto, z.inputs['Z']); n = g.nodes.new('GeometryNodeSetPosition'); g.links.new(geo, n.inputs['Geometry']); g.links.new(z.outputs['Vector'], n.inputs['Offset']); return n.outputs['Geometry']
o = rejilla('goma', 420, X[3], 0.03); con_nodos(o, grupo('goma', surcos)); grueso(o, 0.03); o.data.materials.append(goma())

# ---------- The table: ALMA's light ground with a fine grid of dots, and each sample's name under it.
m, A, p = material('mesa'); pon(p, Roughness=0.9); c, s = A.nodes.new('ShaderNodeTexCoord'), A.nodes.new('ShaderNodeSeparateXYZ'); A.links.new(c.outputs['Object'], s.inputs['Vector'])
hoyo, _, _ = punto(A, s.outputs['X'], s.outputs['Y'], 0.08, 0.08); d = dos_colores(A, cuenta(A, 'GREATER_THAN', hoyo, 0.86), PAPEL, mezcla(PAPEL, TINTA, 0.28)); A.links.new(d.outputs['Result'], p.inputs['Base Color'])
bpy.ops.mesh.primitive_plane_add(size=40, location=(0, 0, -0.012)); bpy.context.object.name = 'mesa'; bpy.context.object.data.materials.append(m)

FUENTE = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'unity', 'Assets', 'ALMA', 'Resources', 'Fuentes', 'RobotoFlex-ALMA.ttf')
fuente = bpy.data.fonts.load(FUENTE) if os.path.exists(FUENTE) else None
letra, _, pl = material('letra'); pl.inputs['Base Color'].default_value = TINTA; pon(pl, Roughness=1.0)
def texto(dice, x, y, alto, lado='LEFT'):
    c = bpy.data.curves.new(dice[:20], 'FONT'); c.body = dice; c.size = alto; c.align_x = lado
    if fuente: c.font = fuente
    o = bpy.data.objects.new(dice[:20], c); E.collection.objects.link(o); o.location = (x, y, -0.011); c.materials.append(letra); return o
modos = ' + '.join(f"{m['n']}·{m['m']}" for m in MODOS)
texto(f"Entidad {D['nombre']}  #{D['personaje']['numero']}", X[0] - 0.5, 0.66, 0.06); texto(f"Patrón {modos}", X[3] + 0.5, 0.66, 0.06, 'RIGHT')
for x, nombre, nota in zip(X, ('Tejido', 'Recorte', 'Resina', 'Goma'), ('Dos hilos: el patrón dice cuál va en cada puntada.', 'Dos capas: la de arriba se abre donde el patrón sube.', 'Crece sobre las líneas del patrón.', 'Sus surcos siguen el patrón.')):
    texto(nombre, x - 0.5, -0.66, 0.06); texto(nota, x - 0.5, -0.75, 0.042)

# ---------- Light of a product shot, and a camera looking down, a little from the front.
E.render.engine = 'BLENDER_EEVEE'; mundo = bpy.data.worlds.new('fondo'); E.world = mundo; mundo.use_nodes = True
mundo.node_tree.nodes['Background'].inputs['Color'].default_value = PAPEL; mundo.node_tree.nodes['Background'].inputs['Strength'].default_value = 0.42
def luz(tipo, nombre, donde, fuerza, lado=None, mira=(0, 0, 0)):
    d = bpy.data.lights.new(nombre, tipo); d.energy = fuerza
    if lado: d.size = lado
    if tipo == 'SUN': d.angle = math.radians(12)
    o = bpy.data.objects.new(nombre, d); E.collection.objects.link(o); o.location = donde; o.rotation_euler = (Vector(mira) - Vector(donde)).to_track_quat('-Z', 'Y').to_euler()
luz('SUN', 'principal', (-3, 2.2, 6), 1.75); luz('AREA', 'relleno', (3.5, -3.5, 3.5), 60, 6.0)
try:
    E.eevee.use_raytracing = True; E.eevee.taa_render_samples = 96; r = E.eevee.ray_tracing_options; r.resolution_scale = '1'; r.screen_trace_quality = 1.0
except Exception: pass
E.view_settings.view_transform = 'Standard'; E.view_settings.look = 'None'
if MOTOR == 'cycles':
    import addon_utils; addon_utils.enable('cycles'); E.render.engine = 'CYCLES'; E.cycles.samples = 64; E.cycles.use_denoising = True
    try:
        pref = bpy.context.preferences.addons['cycles'].preferences; pref.compute_device_type = 'METAL'; pref.get_devices()
        for d in pref.devices: d.use = True
        E.cycles.device = 'GPU'
    except Exception as e: print('ALMA: cycles sin tarjeta gráfica:', e)
cam = bpy.data.objects.new('camara', bpy.data.cameras.new('camara')); E.collection.objects.link(cam); E.camera = cam; cam.data.type = 'ORTHO'
ancho_mesa = PASO * 4 + 0.16; cam.data.ortho_scale = ancho_mesa; alto_mesa = 1.78
cam.location = (0, -2.6, 6.0); cam.rotation_euler = (Vector((0, -0.03, 0)) - cam.location).to_track_quat('-Z', 'Y').to_euler()
E.render.resolution_x = ANCHO - ANCHO % 2; E.render.resolution_y = int(ANCHO * alto_mesa / ancho_mesa) // 2 * 2; E.render.resolution_percentage = 100
E.render.image_settings.file_format = 'PNG'; E.render.filepath = SALIDA
bpy.ops.render.render(write_still=True); print('ALMA: probetas de', D['nombre'], '→', SALIDA)
if BLEND: bpy.ops.wm.save_as_mainfile(filepath=BLEND)
