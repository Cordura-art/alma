# A scanned thing (a .glb from a lidar or photo scan) as a lattice of dots: it is looked at from all around through
# a regular grid, and wherever a line of sight first meets it, there is a dot, set on a lattice of even steps. Each dot
# knows its place, how light the thing's own color is there, and which way its surface faces. A page can then draw
# the thing with some thousands of small marks, in its own colors, light it, turn it, and take it apart.
#
#   blender --background --factory-startup --python blender/escaneo.py -- <archivo.glb> <salida.json> [--filas 150 | --pasos 400] [--frente -y|+y|-x|+x] [--desde 0.18] [--vueltas 8] [--dentro]
#
# `--frente` says which way the thing's front looks in the file; `--desde` leaves out that much of its height from
# the bottom (a plinth, say); `--vueltas` is from how many sides it is looked at, besides from above and from below.
# `--pasos` sets the lattice by the thing's longest side instead of by its height, for a thing far longer than tall.
# `--dentro` is for a place, scanned from within: the lines of sight go on through it, so that every surface they meet
# has its dots and not only the first, and each dot faces the way the scan left it, toward whoever stood inside.
# The file it writes: { alma: 2, nombre, columnas, filas, hondos, alto, peso (how many bytes the scan weighed), puntos },
# where `puntos` is seven bytes a dot, as base64: its column (left to right), its row (from the top), its depth (from
# the front), its tone 0–255, and the way its surface faces (to the right, up, to the front), each -127–127 plus 128.
# A lattice of more than 255 steps a side is written as `alma: 3`: the same, with column, row and depth in two bytes
# each (the low one first), ten bytes a dot.
import bpy, sys, os, json, base64, math
from mathutils import Vector
from mathutils.bvhtree import BVHTree
from mathutils.interpolate import poly_3d_calc

argv = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
def opcion(nombre, defecto):
    if nombre not in argv: return defecto
    i = argv.index(nombre); v = argv[i + 1]; del argv[i:i + 2]; return v
DENTRO = '--dentro' in argv
if DENTRO: argv.remove('--dentro')
FILAS, PASOS, FRENTE, DESDE, VUELTAS = int(opcion('--filas', 150)), int(opcion('--pasos', 0)), opcion('--frente', '-y'), float(opcion('--desde', 0)), int(opcion('--vueltas', 8))
if len(argv) < 2: sys.exit('Uso: blender --background --factory-startup --python blender/escaneo.py -- <archivo.glb> <salida.json> [--filas 150 | --pasos 400] [--frente -y|+y|-x|+x] [--desde 0.18] [--vueltas 8] [--dentro]')
ARCHIVO, SALIDA = argv[0], argv[1]

for o in list(bpy.data.objects): bpy.data.objects.remove(o, do_unlink=True)
bpy.ops.import_scene.gltf(filepath=ARCHIVO)
mallas = [o for o in bpy.context.scene.objects if o.type == 'MESH']
if not mallas: sys.exit('ALMA: el archivo no trae ninguna malla.')

# Everything it is made of, in the world, as plain triangles; and for each, where on its picture its corners are.
vertices, caras, uvs, fotos = [], [], [], []
for o in mallas:
    me = o.data; me.calc_loop_triangles(); base = len(vertices); M = o.matrix_world
    vertices += [M @ v.co for v in me.vertices]; capa = me.uv_layers.active
    # (a scan may be painted with several pictures, a part with each: every triangle keeps the one of its own material)
    imagenes = []
    for ranura in o.material_slots:
        arbol = ranura.material.node_tree if ranura.material and ranura.material.use_nodes else None
        imagenes.append(next((n.image for n in (arbol.nodes if arbol else []) if n.type == 'TEX_IMAGE' and n.image), None))
    for t in me.loop_triangles:
        caras.append(tuple(base + i for i in t.vertices)); uvs.append([tuple(capa.data[l].uv) for l in t.loops] if capa else None)
        fotos.append(imagenes[t.material_index] if t.material_index < len(imagenes) else None)

# Turned so that its front looks toward -y, whatever way it came, and measured.
giro = {'-y': 0, '+x': -90, '+y': 180, '-x': 90}.get(FRENTE, 0)
if giro:
    c, s = math.cos(math.radians(giro)), math.sin(math.radians(giro)); vertices = [Vector((v.x * c - v.y * s, v.x * s + v.y * c, v.z)) for v in vertices]
xs, ys, zs = [v.x for v in vertices], [v.y for v in vertices], [v.z for v in vertices]
x0, x1, y0, y1, z0, z1 = min(xs), max(xs), min(ys), max(ys), min(zs), max(zs)
z0 += DESDE * (z1 - z0); ALTO = z1 - z0
if PASOS: FILAS = max(1, int(round(PASOS * ALTO / max(x1 - x0, y1 - y0, ALTO))))
paso = ALTO / FILAS
COLUMNAS, HONDOS = max(1, int(math.ceil((x1 - x0) / paso))), max(1, int(math.ceil((y1 - y0) / paso)))
if max(COLUMNAS, FILAS, HONDOS) > 65535: sys.exit('ALMA: la trama no puede pasar de 65535 pasos por lado.')
arbol = BVHTree.FromPolygons([tuple(v) for v in vertices], caras)

# The pictures it is painted with, once each, as plain numbers.
pixeles = {}
def color_en(imagen, uv):
    if imagen is None: return 0.8
    if imagen.name not in pixeles:
        # (a scan's picture is very large; a thousand pixels a side says how light it is well enough, and is read in a moment)
        if max(imagen.size) > 1024: imagen.scale(1024 * imagen.size[0] // max(imagen.size), 1024 * imagen.size[1] // max(imagen.size))
        w, h = imagen.size; datos = [0.0] * (w * h * imagen.channels)
        if w and h: imagen.pixels.foreach_get(datos)
        pixeles[imagen.name] = (w, h, imagen.channels, datos if w and h else [])
    w, h, canales, p = pixeles[imagen.name]
    if not p: return 0.8
    i = (min(h - 1, max(0, int((uv[1] % 1.0) * h))) * w + min(w - 1, max(0, int((uv[0] % 1.0) * w)))) * canales
    return 0.2126 * p[i] + 0.7152 * p[i + 1] + 0.0722 * p[i + 2]      # how light it is there; its hue is not kept

# From each side in turn, and then from above and from below: a grid of lines of sight across it, and where each first
# meets it, a dot in that cell of the lattice, if none is there yet. So its whole outside is covered, evenly, and nothing
# inside it; unless it is a place (`--dentro`), where a line of sight goes on, and every surface it meets has its dot.
medio = Vector(((x0 + x1) / 2, (y0 + y1) / 2, 0)); ancho = math.hypot(x1 - x0, y1 - y0) / 2 + paso; celdas = {}
octeto = lambda v: max(1, min(255, int(round(v * 127)) + 128))
def mira(origen, hacia):
    while True:
        donde, normal, cual, _ = arbol.ray_cast(origen, hacia)
        if donde is None: return
        celda = (int((donde.x - x0) / paso), int((z1 - donde.z) / paso), int((donde.y - y0) / paso))
        if celda not in celdas and 0 <= celda[0] < COLUMNAS and 0 <= celda[1] < FILAS and 0 <= celda[2] < HONDOS:
            pa, pb, pc = (vertices[i] for i in caras[cual]); pesos = poly_3d_calc([pa, pb, pc], donde); uv = uvs[cual]
            tono = color_en(fotos[cual], (sum(pesos[j] * uv[j][0] for j in range(3)), sum(pesos[j] * uv[j][1] for j in range(3)))) if uv else 0.8
            if not DENTRO and normal.dot(hacia) > 0: normal = -normal
            celdas[celda] = (max(0, min(255, int(round(255 * tono)))), octeto(normal.x), octeto(normal.z), octeto(-normal.y))
        if not DENTRO: return
        origen = donde + hacia * (paso * 0.25)
for k in range(VUELTAS):
    a = 2 * math.pi * k / VUELTAS; de_lado, hacia = Vector((math.cos(a), -math.sin(a), 0)), Vector((math.sin(a), math.cos(a), 0)); n = int(math.ceil(ancho / paso))
    for fila in range(FILAS):
        z = z1 - (fila + 0.5) * paso
        for col in range(-n, n + 1):
            origen = medio + de_lado * ((col + 0.5) * paso) - hacia * (ancho + 1.0); origen.z = z; mira(origen, hacia)
for hacia, z in ((Vector((0, 0, -1)), z1 + 1.0), (Vector((0, 0, 1)), min(zs) - 1.0)):
    for col in range(COLUMNAS):
        for hondo in range(HONDOS): mira(Vector((x0 + (col + 0.5) * paso, y0 + (hondo + 0.5) * paso, z)), hacia)
ANCHOS = max(COLUMNAS, FILAS, HONDOS) > 255; puntos = bytearray()
for (cx, fila, cy), (tono, nx, nu, nf) in sorted(celdas.items()):
    puntos += (bytes((cx & 255, cx >> 8, fila & 255, fila >> 8, cy & 255, cy >> 8)) if ANCHOS else bytes((cx, fila, cy))) + bytes((tono, nx, nu, nf))

nombre = os.path.splitext(os.path.basename(ARCHIVO))[0].strip()
os.makedirs(os.path.dirname(os.path.abspath(SALIDA)), exist_ok=True)
json.dump({'alma': 3 if ANCHOS else 2, 'nombre': nombre, 'columnas': COLUMNAS, 'filas': FILAS, 'hondos': HONDOS, 'alto': ALTO, 'peso': os.path.getsize(ARCHIVO), 'puntos': base64.b64encode(bytes(puntos)).decode('ascii')}, open(SALIDA, 'w', encoding='utf-8'))
print(f"ALMA: escaneo de «{nombre}»: {len(puntos) // (10 if ANCHOS else 7)} puntos, visto desde {VUELTAS} lados, desde arriba y desde abajo, en una trama de {COLUMNAS} × {FILAS} × {HONDOS} → {SALIDA}")
