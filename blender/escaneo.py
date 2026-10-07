# A scanned thing (a .glb from a lidar or photo scan) as a screen of dots: it is looked at from the front through a
# regular grid, and wherever a line of sight meets it, there is a dot. Each dot knows its place on the grid, how deep
# the thing is there, and how light its surface is there (its own color, and how it faces the light). A page can
# then draw the thing with a few thousand small marks, in its own colors, and take it apart.
#
#   blender --background --factory-startup --python blender/escaneo.py -- <archivo.glb> <salida.json> [--filas 120] [--frente -y|+y|-x|+x] [--desde 0.18] [--vista vista.png]
#
# `--frente` says which way the thing's front looks in the file; `--desde` leaves out that much of its height from
# the bottom (a plinth, say).
# The file it writes: { nombre, columnas, filas, alto, peso (how many bytes the scan weighed), puntos }, where `puntos` is four bytes a dot (its column, its
# row from the top, its depth 0–255 from back to front, its light 0–255), as base64. `--vista` leaves a small picture
# of the screen of dots, to check that the thing was looked at from its front.
import bpy, sys, os, json, base64, math
from mathutils import Vector
from mathutils.bvhtree import BVHTree
from mathutils.interpolate import poly_3d_calc

argv = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
def opcion(nombre, defecto):
    if nombre not in argv: return defecto
    i = argv.index(nombre); v = argv[i + 1]; del argv[i:i + 2]; return v
FILAS, FRENTE, VISTA, DESDE = int(opcion('--filas', 120)), opcion('--frente', '-y'), opcion('--vista', ''), float(opcion('--desde', 0))
if len(argv) < 2: sys.exit('Uso: blender --background --factory-startup --python blender/escaneo.py -- <archivo.glb> <salida.json> [--filas 120] [--frente -y|+y|-x|+x] [--vista vista.png]')
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
    imagen = None
    for ranura in o.material_slots:
        arbol = ranura.material.node_tree if ranura.material and ranura.material.use_nodes else None
        for n in (arbol.nodes if arbol else []):
            if n.type == 'TEX_IMAGE' and n.image: imagen = n.image; break
        if imagen: break
    for t in me.loop_triangles:
        caras.append(tuple(base + i for i in t.vertices)); uvs.append([tuple(capa.data[l].uv) for l in t.loops] if capa else None); fotos.append(imagen)

# Turned so that its front looks toward -y, whatever way it came, and measured.
giro = {'-y': 0, '+x': -90, '+y': 180, '-x': 90}.get(FRENTE, 0)
if giro:
    c, s = math.cos(math.radians(giro)), math.sin(math.radians(giro)); vertices = [Vector((v.x * c - v.y * s, v.x * s + v.y * c, v.z)) for v in vertices]
xs, ys, zs = [v.x for v in vertices], [v.y for v in vertices], [v.z for v in vertices]
x0, x1, y0, y1, z0, z1 = min(xs), max(xs), min(ys), max(ys), min(zs), max(zs)
z0 += DESDE * (z1 - z0); ALTO = z1 - z0; paso = ALTO / FILAS; COLUMNAS = max(1, int(math.ceil((x1 - x0) / paso)))
if COLUMNAS > 255 or FILAS > 255: sys.exit('ALMA: la trama no puede pasar de 255 filas ni columnas.')
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

LUZ = Vector((-0.22, -0.86, 0.46)).normalized()      # from the front, a little to one side and from above: a face is read by its front
puntos = bytearray(); cuadro = [[0.0] * COLUMNAS for _ in range(FILAS)]; hondo = max(1e-6, y1 - y0)
for fila in range(FILAS):
    z = z1 - (fila + 0.5) * paso
    for col in range(COLUMNAS):
        x = (x0 + x1) / 2 + (col + 0.5 - COLUMNAS / 2) * paso
        donde, normal, cual, _ = arbol.ray_cast(Vector((x, y0 - 1.0, z)), Vector((0, 1, 0)))
        if donde is None: continue
        a, b, c = (vertices[i] for i in caras[cual]); pesos = poly_3d_calc([a, b, c], donde); uv = uvs[cual]
        tono = color_en(fotos[cual], (sum(pesos[k] * uv[k][0] for k in range(3)), sum(pesos[k] * uv[k][1] for k in range(3)))) if uv else 0.8
        if normal.y > 0: normal = -normal
        luz = max(0.0, min(1.0, tono * (0.18 + 0.82 * max(0.0, normal.dot(LUZ)))))
        puntos += bytes((col, fila, int(round(255 * (y1 - donde.y) / hondo)), int(round(255 * luz)))); cuadro[fila][col] = luz

nombre = os.path.splitext(os.path.basename(ARCHIVO))[0].strip()
os.makedirs(os.path.dirname(os.path.abspath(SALIDA)), exist_ok=True)
json.dump({'alma': 1, 'nombre': nombre, 'columnas': COLUMNAS, 'filas': FILAS, 'alto': ALTO, 'peso': os.path.getsize(ARCHIVO), 'puntos': base64.b64encode(bytes(puntos)).decode('ascii')}, open(SALIDA, 'w', encoding='utf-8'))
if VISTA:
    # The screen of dots as a small picture, eight pixels a dot: lighter where the thing is lighter.
    K = 8; w, h = COLUMNAS * K, FILAS * K; px = [0.0, 0.0, 0.0, 1.0] * (w * h)
    for fila in range(FILAS):
        for col in range(COLUMNAS):
            v = cuadro[fila][col]
            if v <= 0: continue
            r = 1 + v * (K / 2 - 1)
            for dy in range(K):
                for dx in range(K):
                    if (dx - K / 2 + 0.5) ** 2 + (dy - K / 2 + 0.5) ** 2 <= r * r:
                        i = ((h - 1 - (fila * K + dy)) * w + col * K + dx) * 4; px[i] = px[i + 1] = px[i + 2] = 1.0
    foto = bpy.data.images.new('vista', w, h); foto.pixels = px; foto.filepath_raw = os.path.abspath(VISTA); foto.file_format = 'PNG'; foto.save()
print(f"ALMA: escaneo de «{nombre}»: {len(puntos) // 4} puntos en una trama de {COLUMNAS} × {FILAS} → {SALIDA}")
