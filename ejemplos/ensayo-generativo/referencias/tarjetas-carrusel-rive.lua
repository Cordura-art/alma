-- REFERENCE ONLY, not used by any build. A Rive script (Luau) the user made before and pasted on 2026-10-02 as a part
-- to reuse in the generative identity: a ring of cards that turns in perspective, drawn back to front, each card an
-- image mesh that leans as it goes round. Kept exactly as pasted.

type TarjetasCarrusel = {
  radius: Input<number>,   -- px, radio del anillo
  period: Input<number>,   -- segundos por vuelta completa
  bob: Input<number>,      -- px, amplitud del balanceo vertical
  lean: Input<number>,     -- grados, inclinacion maxima de cada tarjeta
  focal: Input<number>,    -- px, distancia focal (mas chico = perspectiva mas fuerte)
  count: Input<number>,    -- cantidad de tarjetas en el anillo
  cardSize: Input<number>, -- px, ancho de la tarjeta mas cercana (escala 1)
  tilt: Input<number>,     -- grados, inclinacion del punto de vista sobre el anillo
  t: number,
  cardImage: any,
  sampler: any,
}

local DEG = math.pi / 180
local CARD_ASPECT = 1901.0 / 1199.0
local TWO_PI = 2 * math.pi

local function cardCorners(cx: number, cy: number, halfW: number, halfH: number, tiltRad: number): (number, number, number, number, number, number, number, number)
  local ct, st = math.cos(tiltRad), math.sin(tiltRad)
  local function rot(lx: number, ly: number): (number, number)
    return cx + lx * ct - ly * st, cy + lx * st + ly * ct
  end
  local x0, y0 = rot(-halfW, -halfH) -- TL
  local x1, y1 = rot(halfW, -halfH)  -- TR
  local x2, y2 = rot(halfW, halfH)   -- BR
  local x3, y3 = rot(-halfW, halfH)  -- BL
  return x0, y0, x1, y1, x2, y2, x3, y3
end

local function init(self: TarjetasCarrusel, context: Context): boolean
  self.cardImage = context:image('card')
  self.sampler = ImageSampler('clamp', 'clamp', 'bilinear')
  self.t = 0
  return true
end

local function advance(self: TarjetasCarrusel, seconds: number): boolean
  self.t = (self.t + seconds) % 1000000
  return true
end

local function update(self: TarjetasCarrusel)

end

local function draw(self: TarjetasCarrusel, renderer: Renderer)
  if not self.cardImage then
    return
  end

  local n = math.max(1, math.floor(self.count + 0.5))
  local period = math.max(0.05, self.period)
  local omega = TWO_PI / period
  local focal = math.max(1, self.focal)
  local baseHalfW = math.max(1, self.cardSize) / 2
  local baseHalfH = baseHalfW / CARD_ASPECT
  local tiltRad = self.tilt * DEG
  local ct, st = math.cos(tiltRad), math.sin(tiltRad)

  local ang: { [number]: number } = {}
  local zCam: { [number]: number } = {}
  local screenX: { [number]: number } = {}
  local screenY: { [number]: number } = {}
  local scale: { [number]: number } = {}
  for i = 0, n - 1 do
    local a = (TWO_PI * i / n) + omega * self.t
    ang[i] = a
    local x3 = self.radius * math.sin(a)
    local y3 = self.bob * math.sin(a)
    local z3 = self.radius * (1 - math.cos(a)) -- 0 = mas cerca, 2*radius = mas lejos
    local yT = y3 * ct - z3 * st
    local zT = y3 * st + z3 * ct
    zT = math.max(zT, -focal + 1) -- nunca deja que focal+zT se acerque a 0
    zCam[i] = zT
    local s = focal / (focal + zT) -- escala de perspectiva (1 = frente)
    scale[i] = s
    screenX[i] = x3 * s
    screenY[i] = yT * s
  end

  -- Orden de dibujo: de atras (mayor profundidad de camara) hacia adelante.
  local order = {}
  for i = 0, n - 1 do
    order[i + 1] = i
  end
  table.sort(order, function(a, b)
    if zCam[a] ~= zCam[b] then
      return zCam[a] > zCam[b]
    end
    return a < b
  end)

  for k = 1, n do
    local i = order[k]
    local a = ang[i]
    local s = scale[i]
    local halfW = baseHalfW * s
    local halfH = baseHalfH * s
    local cardTiltRad = (self.lean * DEG) * math.sin(a)

    local opacity = math.min(1, math.max(0.7, 0.85 + 0.15 * s))

    local x0, y0, x1, y1, x2, y2, x3c, y3c = cardCorners(screenX[i], screenY[i], halfW, halfH, cardTiltRad)

    local vb = VertexBuffer()
    vb:add(Vector.xy(x0, y0))
    vb:add(Vector.xy(x1, y1))
    vb:add(Vector.xy(x2, y2))
    vb:add(Vector.xy(x3c, y3c))

    local uvb = VertexBuffer()
    uvb:add(Vector.xy(0, 0))
    uvb:add(Vector.xy(1, 0))
    uvb:add(Vector.xy(1, 1))
    uvb:add(Vector.xy(0, 1))

    -- Indices base-0 (confirmado en vivo con Cover Tarjetas Orbita).
    local tb = TriangleBuffer()
    tb:add(0, 1, 2)
    tb:add(0, 2, 3)

    renderer:drawImageMesh(self.cardImage, self.sampler, vb, uvb, tb, 'srcOver', opacity)
  end
end

return function(): Node<TarjetasCarrusel>
  return {
    radius = 380,
    period = 9,
    bob = 18,
    lean = 14,
    focal = 900,
    count = 12,
    cardSize = 260,
    tilt = 16,
    t = 0,
    cardImage = nil,
    sampler = nil,
    init = init,
    advance = advance,
    update = update,
    draw = draw,
  }
end
