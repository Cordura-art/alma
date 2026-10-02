-- Cordura · Micelio de silicio holográfico — Rive Node Script (Luau)
--
-- Port de cordura-micelio.html. Parámetros por defecto = los tuyos:
--   crecimiento 4 s · pausa 4 s · maduración 32% · holograma 10%
--   línea en crecimiento #041419 · relleno #000000 · fondo #060606
--   profundidad 9 · relleno 1% · tamaño mínimo 3% · semilla 90794
--   focos 4 · irregularidad 60% · pausa en bifurcaciones 30%
--
-- Uso en Rive:
--   1) Artboard de 430 x 932 (iPhone 16 Plus, 1290 x 2796 px @3x).
--   2) Assets > + > Script > Node Script. Nómbralo EXACTAMENTE: CorduraMicelio
--   3) Pega este archivo, luego clic derecho en el artboard y elige el script.
--      El Node debe quedar en la posición (0, 0) del artboard.
--   4) Pulsa Play: el editor no anima en modo estático.
--
-- Inclinación del holograma:
--   autoSway = true  -> vaivén automático (swaySpeed, swayAmp)
--   autoSway = false -> usa tiltX / tiltY (grados, -45..45). Enlázalos a tu
--                       view model (sensor, puntero, scroll, state machine).

type CorduraMicelio = {
  -- Ciclo
  grow: Input<number>,       -- s de colonización
  hold: Input<number>,       -- s con la textura completa
  mature: Input<number>,     -- tiempo de maduración (%)
  holo: Input<number>,       -- intensidad del holograma (%)
  reseed: Input<boolean>,    -- nueva estructura en cada ciclo
  fillProb: Input<number>,   -- probabilidad de celda rellena (%)
  loop: Input<boolean>,      -- false = crece una sola vez y se queda ahí (sin fundido ni reinicio)
  startDelay: Input<number>, -- s de espera antes de empezar a crecer (para sincronizar con el Timeline)
  -- Color (canales 0-255; Rive no expone un Input<Color> nativo, así que
  -- cada color se controla como tres números independientes)
  bgColorR: Input<number>, bgColorG: Input<number>, bgColorB: Input<number>,
  growColorR: Input<number>, growColorG: Input<number>, growColorB: Input<number>,
  -- Inclinación
  autoSway: Input<boolean>,
  tiltX: Input<number>,
  tiltY: Input<number>,
  swaySpeed: Input<number>,  -- centésimas de Hz (15 = 0.15 Hz)
  swayAmp: Input<number>,    -- grados
  -- Holograma
  hgAngle: Input<number>,      -- ángulo de la red de difracción (°)
  hgPeriod: Input<number>,     -- período del espectro (pt)
  hgDisp: Input<number>,       -- dispersión x100 (45 = 0.45 espectros / 10°)
  hgSat: Input<number>,        -- pureza espectral (%)
  hgFacet: Input<number>,      -- variación entre facetas (%)
  hgSheen: Input<number>,      -- brillo especular (%)
  hgSheenSize: Input<number>,  -- radio del destello (pt)
  hgParallax: Input<number>,   -- paralaje (pt a 30°)
  hgSel: Input<number>,        -- selectividad angular (%)

  -- Estado interno
  time: number,
  clock: number,
  cycle: number,
  tx: number,
  ty: number,
  geo: any,
  cardPath: any,
  paths: any,
  neutralPaint: any,
  holoPaints: any,
  sheenPaint: any,
  fillPaint: any,
  bgPaint: any,
  sheenStops: any,
  spectrum: any,
}

-- ---------------------------------------------------------
-- Tipos de la estructura geométrica (una sola forma para
-- segmentos verticales y horizontales, sin campos opcionales,
-- para que Luau no tenga que unificar formas de tabla distintas).
-- ---------------------------------------------------------
type Seg = {
  v: boolean,
  x: number, ya: number, yb: number,   -- usados si v = true (segmento vertical)
  xa: number, xb: number, y: number,   -- usados si v = false (segmento horizontal)
  pts: {number},                       -- puntos de cruce a lo largo del segmento
}

type Piece = {number}  -- [p0, p1, faceta]

type Edge = {
  a: number, b: number,
  len: number, w: number,
  pieces: {Piece},
}

type GNode = {
  x: number, y: number,
  adj: {number},
  din: number, dout: number, dwell: number,
}

type Leaf = {
  x: number, y: number, w: number, h: number,
  fill: boolean,
  path: Path?,
  f: number,
}

type Geo = {
  segs: {Seg},
  leaves: {Leaf},
  nodes: {GNode},
  edges: {Edge},
  sc: number,
}

-- ---------------------------------------------------------
-- Configuración fija (edita aquí lo que no es Input)
-- ---------------------------------------------------------
local CONFIG = {
  seed = 90794,
  depth = 9,
  minSize = 3,           -- % del lado menor del espacio de trabajo
  foci = 4,              -- focos de colonización
  irreg = 60,            -- % irregularidad de velocidad de las hifas
  dwell = 30,            -- % pausa en cada bifurcación
  fillColor = 0x000000,  -- color de celda rellena (fijo; bg/growColor ahora son Inputs)
  drawBackground = true,
}

-- Tarjeta iPhone 16 Plus: 430 x 932 pt
local W, H, CORNER = 430, 932, 55
local SPX, SPY = W * 1.02, H * 1.02
local X0 = W / 2 - SPX / 2
local Y0 = H / 2 - SPY / 2

local FADE = 1.6            -- disolución final (s)
local GAP = 0.4             -- silencio entre ciclos (s)
local LEVELS = 10           -- niveles de maduración
local NEUTRAL_FLOOR = 0.251 -- opacidad residual de la línea base
local FACETS = 4            -- clases de faceta
local PIECE = 36            -- largo máx. de tramo para colorear por edad (pt)
local TIP_LAG = 0.03
local SPEC_N = 24           -- segmentos por medio período del espectro

local TWO32 = 4294967296

-- ---------------------------------------------------------
-- Utilidades
-- ---------------------------------------------------------
local function clamp01(v: number): number
  if v < 0 then return 0 end
  if v > 1 then return 1 end
  return v
end

local function smooth(v: number): number
  v = clamp01(v)
  return v * v * (3 - 2 * v)
end

local function hexRGB(hex: number): (number, number, number)
  return bit32.band(bit32.rshift(hex, 16), 255), bit32.band(bit32.rshift(hex, 8), 255), bit32.band(hex, 255)
end

local function hexColor(hex: number, a: number?)
  local r, g, b = hexRGB(hex)
  return Color.rgba(r, g, b, a or 255)
end

-- Math.imul sin signo: producto mod 2^32 usando mitades de 16 bits
local function imul(a: number, b: number): number
  local ah, al = bit32.rshift(a, 16), bit32.band(a, 0xFFFF)
  local bh, bl = bit32.rshift(b, 16), bit32.band(b, 0xFFFF)
  return (al * bl + bit32.lshift(bit32.band(ah * bl + al * bh, 0xFFFF), 16)) % TWO32
end

-- mulberry32: misma secuencia que el HTML
local function mulberry32(seed: number)
  local a = seed % TWO32
  return function(): number
    a = (a + 0x6D2B79F5) % TWO32
    local t = imul(bit32.bxor(a, bit32.rshift(a, 15)), bit32.bor(1, a))
    t = bit32.bxor((t + imul(bit32.bxor(t, bit32.rshift(t, 7)), bit32.bor(61, t))) % TWO32, t)
    return bit32.bxor(t, bit32.rshift(t, 14)) / TWO32
  end
end

-- Semilla de cada ciclo (secuencia determinista; el HTML usa Math.random)
local function seedForCycle(cycle: number): number
  return (CONFIG.seed + cycle * 40503) % 100000
end

-- ---------------------------------------------------------
-- 1) Estructura: subdivisión recursiva -> segmentos + hojas
-- ---------------------------------------------------------
local function buildTree(seed: number, fillProbPct: number): ({Seg}, {Leaf})
  local rand = mulberry32(seed + 777)
  rand(); rand(); rand()          -- mantiene la secuencia de las versiones anteriores
  local segs: {Seg} = {}
  local leaves: {Leaf} = {}
  local minSize = math.min(SPX, SPY) * (CONFIG.minSize / 100)
  local fillProb = fillProbPct / 100

  local function sub(x: number, y: number, w: number, h: number, depth: number)
    local big = w * h > SPX * SPY * 0.05
    local stop = depth <= 0 or w < minSize or h < minSize or ((not big) and rand() < 0.14)
    if stop then
      local fill = rand() < fillProb
      rand()
      table.insert(leaves, { x = x, y = y, w = w, h = h, fill = fill, path = nil, f = 0 })
      return
    end
    local vertical
    if w >= h then vertical = rand() < 0.72 else vertical = rand() < 0.28 end
    if vertical then
      local sx = x + w * (0.32 + rand() * 0.36)
      -- xa/xb/y no aplican a un segmento vertical: se rellenan en 0 para que
      -- todos los Seg compartan una única forma de tabla (evita uniones).
      table.insert(segs, { v = true, x = sx, ya = y, yb = y + h, xa = 0, xb = 0, y = 0, pts = {} })
      rand()
      sub(x, y, sx - x, h, depth - 1)
      sub(sx, y, x + w - sx, h, depth - 1)
    else
      local sy = y + h * (0.32 + rand() * 0.36)
      table.insert(segs, { v = false, y = sy, xa = x, xb = x + w, x = 0, ya = 0, yb = 0, pts = {} })
      rand(); rand()
      sub(x, y, w, sy - y, depth - 1)
      sub(x, sy, w, y + h - sy, depth - 1)
    end
  end

  sub(X0, Y0, SPX, SPY, CONFIG.depth)
  return segs, leaves
end

-- ---------------------------------------------------------
-- 2) Red de hifas: las líneas de corte forman un grafo
--    (nodos = cruces/extremos, aristas = tramos entre nodos).
--    Dijkstra multi-fuente con pausa en cada nodo: el frente avanza
--    por las líneas, se bifurca en cada cruce y las hifas se fusionan.
-- ---------------------------------------------------------
local function buildGraph(seed: number, segs: {Seg}, leaves: {Leaf}): Geo
  local rand = mulberry32(seed * 31 + 4242)
  local nodes: {GNode} = {}
  local edges: {Edge} = {}
  local map: { [string]: number } = {}

  local function nodeId(x: number, y: number): number
    local key = math.floor(x * 100 + 0.5) .. "," .. math.floor(y * 100 + 0.5)
    local i = map[key]
    if i == nil then
      table.insert(nodes, { x = x, y = y, adj = {}, din = math.huge, dout = math.huge, dwell = 0 })
      i = #nodes
      map[key] = i
    end
    return i
  end

  local EPS = 0.01
  local V: {Seg}, Hs: {Seg} = {}, {}
  for _, s in ipairs(segs) do
    if s.v then
      s.pts = { s.ya, s.yb }
      table.insert(V, s)
    else
      s.pts = { s.xa, s.xb }
      table.insert(Hs, s)
    end
  end
  for _, v in ipairs(V) do
    for _, h in ipairs(Hs) do
      if v.x >= h.xa - EPS and v.x <= h.xb + EPS and h.y >= v.ya - EPS and h.y <= v.yb + EPS then
        table.insert(v.pts, h.y)
        table.insert(h.pts, v.x)
      end
    end
  end

  local I = CONFIG.irreg / 100
  for _, s in ipairs(segs) do
    local p: {number} = {}
    for _, v in ipairs(s.pts) do table.insert(p, v) end
    table.sort(p)
    local u: {number} = { p[1] }
    for i = 2, #p do
      if p[i] - u[#u] > EPS then table.insert(u, p[i]) end
    end
    for i = 1, #u - 1 do
      local a: number, b: number
      if s.v then
        a = nodeId(s.x, u[i]); b = nodeId(s.x, u[i + 1])
      else
        a = nodeId(u[i], s.y); b = nodeId(u[i + 1], s.y)
      end
      if a ~= b then
        local len = u[i + 1] - u[i]
        local w = len * math.exp((rand() - 0.5) * 2 * I * 0.9)   -- velocidad irregular por tramo
        local e: Edge = { a = a, b = b, len = len, w = w, pieces = {} }
        local n = math.max(1, math.ceil(len / PIECE))
        for k = 0, n - 1 do
          local cls = bit32.bxor((#edges * 73856093) % TWO32, (k * 19349663) % TWO32) % FACETS
          table.insert(e.pieces, { k / n, (k + 1) / n, cls })
        end
        table.insert(edges, e)
        table.insert(nodes[a].adj, #edges)
        table.insert(nodes[b].adj, #edges)
      end
    end
  end
  local D = CONFIG.dwell / 100
  for _, n in ipairs(nodes) do n.dwell = D * rand() * 40 end

  -- Focos de colonización cerca del borde inferior
  local nf = CONFIG.foci
  for i = 0, nf - 1 do
    local tx = W * ((i + 0.5) / nf + (rand() - 0.5) * 0.5 / nf)
    local ty = H + 10
    local best, bd = 0, math.huge
    for idx, n in ipairs(nodes) do
      local d = (n.x - tx) ^ 2 + (n.y - ty) ^ 2
      if d < bd then bd = d; best = idx end
    end
    local off = rand() * 40
    if off < nodes[best].din then nodes[best].din = off end
  end

  -- Dijkstra multi-fuente con pausa en cada nodo
  local done: { [number]: boolean } = {}
  while true do
    local u, m = 0, math.huge
    for i = 1, #nodes do
      if not done[i] and nodes[i].din < m then m = nodes[i].din; u = i end
    end
    if u == 0 then break end
    done[u] = true
    local nu = nodes[u]
    nu.dout = nu.din + nu.dwell
    for _, ei in ipairs(nu.adj) do
      local e = edges[ei]
      local o = (e.a == u) and e.b or e.a
      local cand = nu.dout + e.w
      if cand < nodes[o].din then nodes[o].din = cand end
    end
  end

  local maxEnd = 0
  for _, e in ipairs(edges) do
    local t = math.min(nodes[e.a].dout, nodes[e.b].dout) + e.w
    if t < math.huge and t > maxEnd then maxEnd = t end
  end
  for _, n in ipairs(nodes) do
    if n.dout == math.huge then n.dout = maxEnd; n.din = maxEnd end
  end
  local sc = 1
  if maxEnd > 0 then sc = 1 / maxEnd end

  -- Hojas rellenas: aparecen cuando la red llega a su centro
  for _, l in ipairs(leaves) do
    if l.fill then
      local cx, cy = l.x + l.w / 2, l.y + l.h / 2
      local best, bd = 1, math.huge
      for idx, n in ipairs(nodes) do
        local d = (n.x - cx) ^ 2 + (n.y - cy) ^ 2
        if d < bd then bd = d; best = idx end
      end
      l.f = nodes[best].din * sc
      local p = Path.new()
      p:moveTo(Vector.xy(l.x, l.y))
      p:lineTo(Vector.xy(l.x + l.w, l.y))
      p:lineTo(Vector.xy(l.x + l.w, l.y + l.h))
      p:lineTo(Vector.xy(l.x, l.y + l.h))
      p:close()
      l.path = p
    end
  end

  return { segs = segs, leaves = leaves, nodes = nodes, edges = edges, sc = sc }
end

local function rebuild(self: CorduraMicelio, seed: number)
  local segs, leaves = buildTree(seed, self.fillProb)
  self.geo = buildGraph(seed, segs, leaves)
end

-- ---------------------------------------------------------
-- 3) Espectro visible y degradé de difracción
-- ---------------------------------------------------------
local function wl2rgb(w: number): (number, number, number)
  local r, g, b = 0, 0, 0
  if w < 440 then r = -(w - 440) / 60; b = 1
  elseif w < 490 then g = (w - 440) / 50; b = 1
  elseif w < 510 then g = 1; b = -(w - 510) / 20
  elseif w < 580 then r = (w - 510) / 70; g = 1
  elseif w < 645 then r = 1; g = -(w - 645) / 65
  else r = 1 end
  local f = 1
  if w < 420 then f = 0.3 + 0.7 * (w - 380) / 40
  elseif w > 645 then f = 0.3 + 0.7 * (700 - w) / 55 end
  return math.max(0, r * f) ^ 0.8, math.max(0, g * f) ^ 0.8, math.max(0, b * f) ^ 0.8
end

-- Color del espectro en m in [0,1] (violeta -> rojo), con la pureza dada
local function spectrumColor(m: number, sat: number)
  local r, g, b = wl2rgb(400 + 290 * m)
  local function ch(c: number): number
    return math.floor(255 * (c * sat + (1 - sat) * 0.62 * (1 - c * 0.2)) + 0.5)
  end
  return Color.rgb(ch(r), ch(g), ch(b))
end

-- Rive solo tiene gradientes "pad": el "reflect" se simula con periodos
-- espejados. Las paradas dependen solo de n (periodos) y de la pureza;
-- la posición/fase se mueve con los extremos del gradiente.
local function buildSpectrumStops(n: number, sat: number)
  local U0, U1 = -(n + 2), n
  local stops = {}
  local total = U1 - U0
  for k = U0, U1 - 1 do
    local even = (k % 2) == 0
    for i = 0, SPEC_N do
      if not (i == 0 and k > U0) then
        local frac = i / SPEC_N
        local u = k + frac
        local m = even and frac or (1 - frac)
        table.insert(stops, { position = (u - U0) / total, color = spectrumColor(m, sat) })
      end
    end
  end
  return stops
end

-- ---------------------------------------------------------
-- Ciclo
-- ---------------------------------------------------------
local function cycleLen(self: CorduraMicelio): number
  return math.max(0.1, self.grow) + math.max(0, self.hold) + FADE + GAP
end

local function roundedRect(path, x: number, y: number, w: number, h: number, r: number)
  local k = 0.5522847498 * r
  path:moveTo(Vector.xy(x + r, y))
  path:lineTo(Vector.xy(x + w - r, y))
  path:cubicTo(Vector.xy(x + w - r + k, y), Vector.xy(x + w, y + r - k), Vector.xy(x + w, y + r))
  path:lineTo(Vector.xy(x + w, y + h - r))
  path:cubicTo(Vector.xy(x + w, y + h - r + k), Vector.xy(x + w - r + k, y + h), Vector.xy(x + w - r, y + h))
  path:lineTo(Vector.xy(x + r, y + h))
  path:cubicTo(Vector.xy(x + r - k, y + h), Vector.xy(x, y + h - r + k), Vector.xy(x, y + h - r))
  path:lineTo(Vector.xy(x, y + r))
  path:cubicTo(Vector.xy(x, y + r - k), Vector.xy(x + r - k, y), Vector.xy(x + r, y))
  path:close()
end

local function init(self: CorduraMicelio): boolean
  self.time = 0
  self.clock = 0
  self.cycle = 0
  self.tx = 0
  self.ty = 0
  rebuild(self, CONFIG.seed)

  self.cardPath = Path.new()
  roundedRect(self.cardPath, 0, 0, W, H, CORNER)

  -- Una Path por (nivel de maduración, faceta), reutilizadas cada frame
  self.paths = {}
  for j = 0, LEVELS do
    self.paths[j] = {}
    for c = 0, FACETS - 1 do
      self.paths[j][c] = { path = Path.new(), count = 0 }
    end
  end

  self.bgPaint = Paint.new()
  self.bgPaint.style = 'fill'
  self.bgPaint.color = Color.rgba(self.bgColorR, self.bgColorG, self.bgColorB, 255)

  self.fillPaint = Paint.new()
  self.fillPaint.style = 'fill'

  self.neutralPaint = Paint.new()
  self.neutralPaint.style = 'stroke'
  self.neutralPaint.thickness = 0.7
  self.neutralPaint.cap = 'round'
  self.neutralPaint.join = 'round'

  self.holoPaints = {}
  for c = 0, FACETS - 1 do
    local p = Paint.new()
    p.style = 'stroke'
    p.thickness = 0.9
    p.cap = 'round'
    p.join = 'round'
    self.holoPaints[c] = p
  end

  self.sheenPaint = Paint.new()
  self.sheenPaint.style = 'stroke'
  self.sheenPaint.thickness = 1.1
  self.sheenPaint.cap = 'round'
  self.sheenPaint.join = 'round'
  pcall(function() self.sheenPaint.blendMode = 'screen' end)   -- si tu versión no lo acepta, se ignora

  self.sheenStops = {
    { position = 0.0, color = Color.rgba(255, 255, 255, 255) },
    { position = 0.45, color = Color.rgba(255, 255, 255, 89) },   -- 0.35
    { position = 1.0, color = Color.rgba(255, 255, 255, 0) },
  }
  self.spectrum = { n = -1, sat = -1, stops = nil }
  return true
end

-- Inclinación objetivo: vaivén automático o valores externos (Inputs)
local function targetTilt(self: CorduraMicelio): (number, number)
  if self.autoSway then
    local w = self.clock * self.swaySpeed / 100 * 2 * math.pi
    local A = self.swayAmp
    return A * math.sin(w), A * 0.6 * math.sin(w * 0.63 + 1.3)
  end
  return self.tiltX, self.tiltY
end

local function advance(self: CorduraMicelio, seconds: number): boolean
  self.clock += seconds
  -- amortiguación: la inclinación tiene "peso" físico
  local tx, ty = targetTilt(self)
  local k = 1 - math.exp(-seconds * 9)
  self.tx += (tx - self.tx) * k
  self.ty += (ty - self.ty) * k

  local len = cycleLen(self)
  self.time += seconds
  if self.time >= len then
    self.time = self.time % len
    self.cycle += 1
    if self.reseed then
      rebuild(self, seedForCycle(self.cycle))
    end
  end
  return true
end

-- ---------------------------------------------------------
-- Dibujo. Función pura de (time, tilt).
-- Cada tramo de hifa avanza desde sus extremos colonizados; su color
-- depende de la EDAD de cada trozo: punta joven fina y sin color que
-- madura a degradé holográfico dependiente de la inclinación.
-- ---------------------------------------------------------
local function draw(self: CorduraMicelio, renderer: Renderer)
  local grow = math.max(0.1, self.grow)
  local hold = math.max(0, self.hold)
  local holo = self.holo / 100
  local t = self.time
  local geo = self.geo
  local nodes, edges, leaves = geo.nodes, geo.edges, geo.leaves
  local sc = geo.sc

  local tu = t / (sc * 0.9 * grow)
  local secPerUnit = sc * 0.9 * grow
  local lagT = TIP_LAG * grow
  local matT = math.max(0.05, self.mature / 100 * grow * 0.8)
  local fade = 1 - smooth((t - (grow + hold)) / FADE)

  -- Reiniciar rutas
  for j = 0, LEVELS do
    for c = 0, FACETS - 1 do
      local slot = self.paths[j][c]
      slot.path:reset()
      slot.count = 0
    end
  end

  -- Tramos visibles -> rutas por (nivel, faceta)
  for _, e in ipairs(edges) do
    local A, B = nodes[e.a], nodes[e.b]
    local pa = clamp01((tu - A.dout) / e.w)
    local pb = clamp01((tu - B.dout) / e.w)
    if pa > 0 or pb > 0 then
      if pa + pb >= 1 then pa = 1; pb = 1 end
      local dxE, dyE = B.x - A.x, B.y - A.y
      for _, pc in ipairs(e.pieces) do
        local p0, p1, cls = pc[1], pc[2], pc[3]
        local hasA = pa > p0
        local hasB = (1 - pb) < p1
        if hasA or hasB then
          local a0: number?, a1: number?, b0: number?, b1: number?
          if hasA then a0 = p0; a1 = math.min(p1, pa) end
          if hasB then b0 = math.max(p0, 1 - pb); b1 = p1 end
          if a0 and a1 and b0 and b1 and a1 >= b0 - 1e-9 then
            a1 = b1
            b0 = nil; b1 = nil
          end
          local age = -math.huge
          if hasA then age = math.max(age, (tu - (A.dout + p0 * e.w)) * secPerUnit) end
          if hasB then age = math.max(age, (tu - (B.dout + (1 - p1) * e.w)) * secPerUnit) end
          local m = smooth((age - lagT) / matT)
          local lvl = math.floor(m * LEVELS + 0.5)
          local slot = self.paths[lvl][cls]
          local path = slot.path
          if a0 and a1 and a1 - a0 >= 1e-4 then
            path:moveTo(Vector.xy(A.x + dxE * a0, A.y + dyE * a0))
            path:lineTo(Vector.xy(A.x + dxE * a1, A.y + dyE * a1))
            slot.count += 1
          end
          if b0 and b1 and b1 - b0 >= 1e-4 then
            path:moveTo(Vector.xy(A.x + dxE * b0, A.y + dyE * b0))
            path:lineTo(Vector.xy(A.x + dxE * b1, A.y + dyE * b1))
            slot.count += 1
          end
        end
      end
    end
  end

  -- ------------------------------------------------------
  -- Holograma: red de difracción + inclinación
  -- ------------------------------------------------------
  local tx, ty = self.tx, self.ty
  local phi = self.hgAngle * math.pi / 180
  local dx, dy = math.cos(phi), math.sin(phi)
  local P = self.hgPeriod
  local along = tx * dx + ty * dy
  local shift = along / 10 * (self.hgDisp / 100)          -- espectros barridos por la inclinación

  local R = (W * math.abs(dx) + H * math.abs(dy)) / 2 / P
  local n = math.ceil(R) + 1
  local sat = self.hgSat / 100
  local spec = self.spectrum
  if spec.n ~= n or spec.sat ~= sat then
    spec.stops = buildSpectrumStops(n, sat)
    spec.n = n
    spec.sat = sat
  end
  local U0, U1 = -(n + 2), n
  for c = 0, FACETS - 1 do
    local off = shift + (c / FACETS) * (self.hgFacet / 100)
    off = off % 2                                          -- el reflejo tiene periodo 2
    local p0 = P * (U0 + off)
    local p1 = P * (U1 + off)
    self.holoPaints[c].gradient = Gradient.linear(
      Vector.xy(W / 2 + dx * p0, H / 2 + dy * p0),
      Vector.xy(W / 2 + dx * p1, H / 2 + dy * p1),
      spec.stops
    )
  end

  local mag = math.sqrt(tx * tx + ty * ty)
  local gain = 1 - (self.hgSel / 100) * (1 - math.exp(-((mag / 40) ^ 2)))
  local holoOpacity = clamp01(holo * gain)
  local par = self.hgParallax / 30                         -- px por grado
  local parMat = Mat2D.withTranslation(tx * par, ty * par)
  local sheenOpacity = self.hgSheen / 100
  self.sheenPaint.gradient = Gradient.radial(
    Vector.xy(W / 2 + tx * 7, H / 2 + ty * 7), self.hgSheenSize, self.sheenStops
  )

  -- ------------------------------------------------------
  -- Pintar
  -- ------------------------------------------------------
  renderer:save()
  renderer:clipPath(self.cardPath)

  if CONFIG.drawBackground then
    self.bgPaint.color = Color.rgba(self.bgColorR, self.bgColorG, self.bgColorB, 255)
    renderer:drawPath(self.cardPath, self.bgPaint)
  end

  -- Celdas rellenas: aparecen cuando la red las alcanza
  local fr, fg, fb = hexRGB(CONFIG.fillColor)
  for _, l in ipairs(leaves) do
    local lp = l.path
    if l.fill and lp then
      local a = smooth((t - (l.f * 0.9 * grow + 0.05 * grow)) / (0.12 * grow)) * fade
      if a > 0.002 then
        self.fillPaint.color = Color.rgba(fr, fg, fb, math.floor(255 * a + 0.5))
        renderer:drawPath(lp, self.fillPaint)
      end
    end
  end

  -- Capa neutra (hifa joven)
  local gr, gg, gb = self.growColorR, self.growColorG, self.growColorB
  for j = 0, LEVELS do
    local tj = j / LEVELS
    local aN = (1 - (1 - NEUTRAL_FLOOR) * tj) * fade
    self.neutralPaint.color = Color.rgba(gr, gg, gb, math.floor(255 * aN + 0.5))
    for c = 0, FACETS - 1 do
      local slot = self.paths[j][c]
      if slot.count > 0 then renderer:drawPath(slot.path, self.neutralPaint) end
    end
  end

  -- Capa holográfica (con paralaje) y destello especular
  for j = 1, LEVELS do
    local tj = j / LEVELS
    local opH = tj * holoOpacity * fade
    for c = 0, FACETS - 1 do
      local slot = self.paths[j][c]
      if slot.count > 0 then
        if opH > 0.002 then
          renderer:save()
          renderer:transform(parMat)
          renderer:modulateOpacity(opH)
          renderer:drawPath(slot.path, self.holoPaints[c])
          renderer:restore()
        end
        local opS = tj * sheenOpacity * fade
        if opS > 0.002 then
          renderer:save()
          renderer:modulateOpacity(opS)
          renderer:drawPath(slot.path, self.sheenPaint)
          renderer:restore()
        end
      end
    end
  end

  renderer:restore()
end

local function update(self: CorduraMicelio)
end

return function(): Node<CorduraMicelio>
  return {
    -- Inputs (valores por defecto = tus parámetros)
    grow = 4,
    hold = 4,
    mature = 32,
    holo = 10,
    reseed = true,
    fillProb = 1,
    bgColorR = 6, bgColorG = 6, bgColorB = 6,           -- #060606
    growColorR = 4, growColorG = 20, growColorB = 25,   -- #041419

    autoSway = true,
    tiltX = 0,
    tiltY = 0,
    swaySpeed = 15,
    swayAmp = 25,

    hgAngle = 35,
    hgPeriod = 320,
    hgDisp = 45,
    hgSat = 85,
    hgFacet = 35,
    hgSheen = 35,
    hgSheenSize = 240,
    hgParallax = 2,
    hgSel = 40,

    time = 0,
    clock = 0,
    cycle = 0,
    tx = 0,
    ty = 0,
    geo = nil,
    cardPath = nil,
    paths = nil,
    neutralPaint = nil,
    holoPaints = nil,
    sheenPaint = nil,
    fillPaint = nil,
    bgPaint = nil,
    sheenStops = nil,
    spectrum = nil,

    init = init,
    advance = advance,
    update = update,
    draw = draw,
  }
end
