// The card faces of an entity: textures for a card of the ID-1 proportion (85.60 × 53.98 mm, a bank card), one per key.
// The fifteen patterns and the guilloché are the user's own, from the "Placa" study
// (referencias/placa-generador-texturas-tarjeta.html), kept as written. What changed: no palettes of its own (the face
// takes the entity's piece colors; where a pattern needs volume, its lights and shadows are tones derived from those
// colors, as in the original), the sliders are set by the key and the entity's genes, the shadow of the planks is a
// tone of the ground instead of black, and randomness is the generator's. Left out: the bank layer (chip, contactless,
// network mark, holder), the film grain, the secondary mix and the relief of the isotype, which needs a canvas.
import { hash, rng, azar } from '../../entidades/semilla.mjs';

// The drawings, as in the original: they read the sliders from `state`. buildPatternLayer(shape, rand, palette) gives
// { bg, shapes } and buildGuillocheLayer(palette) the engraved rosettes. `palette` is { bg, ink, colors }.
function dibujosPlaca(state, W, H, mulberry32, buildReliefMask) {
  function buildPoints(rand){
    const spacing = W / state.density;
    const pts = [];
    const margin = spacing * 0.6;

    if(state.layout === 'grid' || state.layout === 'wave'){
      const cols = Math.ceil((W + margin*2) / spacing);
      const rows = Math.ceil((H + margin*2) / spacing);
      for(let r=-1;r<=rows;r++){
        for(let c=-1;c<=cols;c++){
          pts.push({x: c*spacing + spacing/2, y: r*spacing + spacing/2});
        }
      }
    } else if(state.layout === 'hex'){
      const vSpacing = spacing * 0.866;
      const rows = Math.ceil(H / vSpacing) + 2;
      const cols = Math.ceil(W / spacing) + 2;
      for(let r=-1;r<=rows;r++){
        const offset = (r % 2 === 0) ? 0 : spacing/2;
        for(let c=-1;c<=cols;c++){
          pts.push({x: c*spacing + offset, y: r*vSpacing});
        }
      }
    } else if(state.layout === 'radial'){
      const cx = W/2, cy = H/2;
      const maxR = Math.hypot(W,H)/2 + spacing;
      let ring = 0;
      for(let rad = spacing*0.3; rad < maxR; rad += spacing*0.85){
        const circumference = 2*Math.PI*rad;
        const count = Math.max(6, Math.round(circumference / spacing));
        const angleOffset = ring * 0.35;
        for(let i=0;i<count;i++){
          const a = (i/count)*Math.PI*2 + angleOffset;
          pts.push({x: cx + Math.cos(a)*rad, y: cy + Math.sin(a)*rad});
        }
        ring++;
      }
    }

    return pts.filter(p => p.x > -spacing && p.x < W+spacing && p.y > -spacing && p.y < H+spacing);
  }

  /* ---------------------------------------------------------
     Atractores para tamaño/opacidad orgánicos
  --------------------------------------------------------- */
  function buildAttractors(rand){
    const n = 2 + Math.floor(rand()*3); // 2-4
    const list = [];
    for(let i=0;i<n;i++){
      list.push({
        x: rand()*W,
        y: rand()*H,
        sigma: (0.18 + rand()*0.28) * Math.max(W,H),
        strength: 0.6 + rand()*1.0,
      });
    }
    return list;
  }
  function attractorInfluence(x,y,attractors){
    let sum = 0;
    for(const a of attractors){
      const dx=x-a.x, dy=y-a.y;
      const d2 = dx*dx+dy*dy;
      sum += a.strength * Math.exp(-d2/(2*a.sigma*a.sigma));
    }
    return sum;
  }

  function buildPlanksBackground(palette){
    return `<rect x="0" y="0" width="${W}" height="${H}" fill="${shade(palette.ink,-0.5)}"/>`;
  }

  function buildPlanksLayer(rand, palette){
    const cols = Math.max(5, Math.round(state.density*0.9));
    const spacingX = W/cols;
    const spacingY = spacingX * 0.55 * (state.baseSize/60);
    const rowsCount = Math.ceil(H/spacingY)+2;
    const tileW = spacingX * 0.92;
    const tileH = spacingY * 0.72;

    const baseTilt = (state.rotation/100)*24 - 8;
    const jitterAmt = state.jitter/100;
    const shadowAmt = 6 + (state.cluster/100)*22;

    const lightTone = lighten(palette.bg, 0.62);
    const darkTone = shade(palette.bg, -0.35);

    function hash(i,j,o){
      const v = Math.sin(i*127.1+j*311.7+state.seed*0.013+o)*43758.5453;
      return v-Math.floor(v);
    }

    let defs = '';
    let out = '';
    let gradId = 0;

    for(let row=-1; row<=rowsCount; row++){
      const rowOffset = (row % 2 === 0) ? 0 : spacingX/2;
      const y = row*spacingY + spacingY/2;
      if(y < -spacingY || y > H+spacingY) continue;

      for(let col=-1; col<=cols+1; col++){
        const x = col*spacingX + spacingX/2 + rowOffset;
        if(x < -spacingX || x > W+spacingX) continue;

        const jr = (hash(col,row,0)-0.5) * 12 * jitterAmt;
        const rotation = baseTilt + jr;
        const toneJ = hash(col,row,50);
        const gId = `pg${gradId++}`;
        const a1 = lighten(lightTone, toneJ*0.12);
        const a2 = shade(darkTone, -toneJ*0.15);

        defs += `<linearGradient id="${gId}" x1="0%" y1="0%" x2="100%" y2="35%">
          <stop offset="0%" stop-color="${a1}"/>
          <stop offset="60%" stop-color="${shade(a1,-0.28)}"/>
          <stop offset="100%" stop-color="${a2}"/>
        </linearGradient>`;

        const w=tileW, h=tileH;
        const path = `M ${-w/2},${-h/2} L ${w/2},${-h/2} L ${w/2},${h/2} L ${-w/2},${h/2} Z`;

        out += `<g transform="translate(${(x+shadowAmt*0.4).toFixed(2)},${(y+shadowAmt*0.5).toFixed(2)}) rotate(${rotation.toFixed(2)})">
          <path d="${path}" fill="${shade(palette.ink,-0.8)}" opacity="0.42"/>
        </g>`;
        out += `<g transform="translate(${x.toFixed(2)},${y.toFixed(2)}) rotate(${rotation.toFixed(2)})">
          <path d="${path}" fill="url(#${gId})"/>
        </g>`;
      }
    }
    return `<defs>${defs}</defs>${out}`;
  }

  /* ---------------------------------------------------------
     Malla deformada — grilla continua tipo "tejido" curvado
     por puntos de abultamiento (lente), en vez de formas sueltas.
  --------------------------------------------------------- */
  function lighten(hex, amt){
    const n = hex.replace('#','');
    const r = parseInt(n.substring(0,2),16);
    const g = parseInt(n.substring(2,4),16);
    const b = parseInt(n.substring(4,6),16);
    const mix = c => Math.round(c + (255-c)*amt);
    const toHex = c => c.toString(16).padStart(2,'0');
    return `#${toHex(mix(r))}${toHex(mix(g))}${toHex(mix(b))}`;
  }

  // amt en [-1,1]: positivo aclara (mezcla blanco), negativo oscurece (mezcla negro)
  function shade(hex, amt){
    const n = hex.replace('#','');
    const r = parseInt(n.substring(0,2),16);
    const g = parseInt(n.substring(2,4),16);
    const b = parseInt(n.substring(4,6),16);
    const mix = c => amt >= 0 ? c + (255-c)*amt : c * (1+amt);
    const toHex = c => Math.max(0,Math.min(255,Math.round(c))).toString(16).padStart(2,'0');
    return `#${toHex(mix(r))}${toHex(mix(g))}${toHex(mix(b))}`;
  }


  function buildMeshBackground(palette){
    const bgA = palette.bg;
    const bgB = lighten(palette.bg, 0.4);
    return `<defs>
        <linearGradient id="meshGrad" x1="0" y1="0" x2="${W}" y2="${(H*0.2).toFixed(1)}">
          <stop offset="0%" stop-color="${bgA}"/>
          <stop offset="100%" stop-color="${bgB}"/>
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="${W}" height="${H}" fill="url(#meshGrad)"/>`;
  }

  function buildMeshLayer(rand, palette){
    const cols = Math.max(6, Math.round(state.density * 1.6));
    const rows = Math.max(4, Math.round(cols / (W/H)));
    const colW = W/cols, rowH = H/rows;

    const bulges = buildAttractors(rand);
    const warpAmt = (state.cluster/100) * Math.max(colW,rowH) * 3.2;
    const sigmaScale = 0.5 + (state.waveFreq/6);
    const jitterAmt = (state.jitter/100) * Math.min(colW,rowH) * 0.18;

    function hashJitter(i,j,offset){
      const v = Math.sin(i*127.1 + j*311.7 + state.seed*0.013 + offset) * 43758.5453;
      return v - Math.floor(v);
    }

    const iMin=-1, iMax=cols+1, jMin=-1, jMax=rows+1;
    const grid = {};
    for(let j=jMin;j<=jMax;j++){
      for(let i=iMin;i<=iMax;i++){
        const x0 = i*colW, y0 = j*rowH;
        let dx=0, dy=0;
        bulges.forEach(b=>{
          const ddx=x0-b.x, ddy=y0-b.y;
          const dist = Math.hypot(ddx,ddy) || 0.0001;
          const sigma = b.sigma * sigmaScale;
          const falloff = Math.exp(-(dist*dist)/(2*sigma*sigma));
          const push = b.strength * falloff * warpAmt;
          dx += (ddx/dist)*push;
          dy += (ddy/dist)*push;
        });
        dx += (hashJitter(i,j,0)-0.5) * jitterAmt * 2;
        dy += (hashJitter(i,j,50)-0.5) * jitterAmt * 2;
        grid[j+'_'+i] = {x:x0+dx, y:y0+dy};
      }
    }

    const strokeW = Math.max(1.5, (state.baseSize/100) * Math.min(colW,rowH) * 0.55);
    const ink = palette.ink;

    let paths = '';
    for(let i=iMin;i<=iMax;i++){
      let d = '';
      for(let j=jMin;j<=jMax;j++){
        const p = grid[j+'_'+i];
        d += (j===jMin ? 'M' : 'L') + p.x.toFixed(2)+','+p.y.toFixed(2)+' ';
      }
      paths += `<path d="${d}" fill="none" stroke="${ink}" stroke-width="${strokeW.toFixed(2)}" stroke-linejoin="round" stroke-linecap="round"/>`;
    }
    for(let j=jMin;j<=jMax;j++){
      let d = '';
      for(let i=iMin;i<=iMax;i++){
        const p = grid[j+'_'+i];
        d += (i===iMin ? 'M' : 'L') + p.x.toFixed(2)+','+p.y.toFixed(2)+' ';
      }
      paths += `<path d="${d}" fill="none" stroke="${ink}" stroke-width="${strokeW.toFixed(2)}" stroke-linejoin="round" stroke-linecap="round"/>`;
    }

    return paths;
  }

  /* ---------------------------------------------------------
     Tejas — tiles de tamaño uniforme, filas trabadas (offset
     tipo ladrillo), con sombra proyectada y giro en remolino
     (fuerte a la izquierda, se endereza hacia la derecha).
  --------------------------------------------------------- */
  function buildBricksBackground(palette){
    return `<rect x="0" y="0" width="${W}" height="${H}" fill="${palette.ink}"/>`;
  }

  function sampleRelief(mask, x, y){
    if(!mask) return 0;
    const mx = Math.min(mask.w-1, Math.max(0, Math.round((x/W)*mask.w)));
    const my = Math.min(mask.h-1, Math.max(0, Math.round((y/H)*mask.h)));
    const idx = (my*mask.w+mx)*4;
    return mask.data[idx+3]/255;
  }

  function buildGuillocheLayer(palette){
    const gRand = mulberry32(state.seed + 9973);
    const ink = state.guillocheColor;
    const opacity = state.guillocheOpacity/100;
    const strokeW = Math.max(0.3, (state.guillocheStroke/100) * 2.2);
    const petals = state.guillochePetals;
    const amp = state.guillocheAmp/100;
    const twist = state.guillocheTwist/100;
    const sizeScale = state.guillocheSize/100;
    const ringCount = Math.round(8 + (state.guillocheDensity/100)*50);

    function centersFor(count){
      const centers = [];
      for(let i=0;i<count;i++){
        centers.push({
          cx: W * (0.18 + gRand()*0.64),
          cy: H * (0.18 + gRand()*0.64),
          phaseBase: gRand()*Math.PI*2,
        });
      }
      return centers;
    }

    let out = '';

    if(state.guillocheType === 'rosette'){
      // Círculos concéntricos con el radio modulado por una onda de N pétalos.
      const centers = centersFor(state.guillocheCount);
      const maxR = Math.min(W,H) * 0.5 * sizeScale;
      const ampR = amp * 0.30;
      const twistR = twist * 0.6;
      const steps = 140;
      centers.forEach(c=>{
        for(let i=0;i<ringCount;i++){
          const rr = maxR * (i+1)/ringCount;
          const phase = c.phaseBase + i*twistR;
          let d = '';
          for(let s=0;s<=steps;s++){
            const t = (s/steps) * Math.PI*2;
            const radius = rr * (1 + ampR*Math.sin(petals*t + phase));
            const x = c.cx + radius*Math.cos(t), y = c.cy + radius*Math.sin(t);
            d += (s===0 ? 'M' : 'L') + x.toFixed(2)+','+y.toFixed(2)+' ';
          }
          out += `<path d="${d}Z" fill="none" stroke="${ink}" stroke-width="${strokeW.toFixed(2)}" opacity="${opacity.toFixed(2)}"/>`;
        }
      });
    }

    else if(state.guillocheType === 'radial'){
      // Igual estructura que la roseta, pero con cúspides filosas (valor
      // absoluto) en vez de lóbulos suaves — efecto engranaje/estrella.
      const centers = centersFor(state.guillocheCount);
      const maxR = Math.min(W,H) * 0.5 * sizeScale;
      const ampR = amp * 0.35;
      const twistR = twist * 0.6;
      const steps = 160;
      centers.forEach(c=>{
        for(let i=0;i<ringCount;i++){
          const rr = maxR * (i+1)/ringCount;
          const phase = c.phaseBase + i*twistR;
          let d = '';
          for(let s=0;s<=steps;s++){
            const t = (s/steps) * Math.PI*2;
            const radius = rr * (1 + ampR*Math.abs(Math.sin(petals*t/2 + phase)));
            const x = c.cx + radius*Math.cos(t), y = c.cy + radius*Math.sin(t);
            d += (s===0 ? 'M' : 'L') + x.toFixed(2)+','+y.toFixed(2)+' ';
          }
          out += `<path d="${d}Z" fill="none" stroke="${ink}" stroke-width="${strokeW.toFixed(2)}" opacity="${opacity.toFixed(2)}"/>`;
        }
      });
    }

    else if(state.guillocheType === 'spiro'){
      // Hipotrocoide real (curva de Espirógrafo): un círculo rodando dentro
      // de otro, con la pluma a distancia d del centro del círculo pequeño.
      const centers = centersFor(state.guillocheCount);
      const rOuter = Math.min(W,H) * 0.5 * sizeScale;
      const ringCountS = Math.min(ringCount, 22);
      const p = Math.max(3, petals);
      const steps = Math.min(640, 36*p);
      centers.forEach(c=>{
        for(let i=0;i<ringCountS;i++){
          const Rr = rOuter * (0.35 + 0.65*(i+1)/ringCountS);
          const rr = Rr / p;
          const dd = amp * rr * 0.92;
          const kRatio = (Rr-rr)/rr;
          const phase = c.phaseBase + i*twist*0.5;
          let d = '';
          for(let s=0;s<=steps;s++){
            const t = (s/steps) * Math.PI*2 * p;
            const tt = t + phase;
            const x = c.cx + (Rr-rr)*Math.cos(tt) + dd*Math.cos(kRatio*tt);
            const y = c.cy + (Rr-rr)*Math.sin(tt) - dd*Math.sin(kRatio*tt);
            d += (s===0 ? 'M' : 'L') + x.toFixed(2)+','+y.toFixed(2)+' ';
          }
          out += `<path d="${d}" fill="none" stroke="${ink}" stroke-width="${strokeW.toFixed(2)}" opacity="${opacity.toFixed(2)}"/>`;
        }
      });
    }

    else if(state.guillocheType === 'waves'){
      // Bandas horizontales de líneas onduladas paralelas, con la fase
      // avanzando banda a banda — interferencia moiré tipo borde de billete.
      const bandCount = ringCount;
      const spacing = H / Math.max(4, bandCount);
      const freq = Math.max(1, petals);
      const ampPx = amp * spacing * 1.9 * sizeScale;
      const phaseBase = gRand()*Math.PI*2;
      const stepsX = 160;
      const mask = state.guillocheRelief ? buildReliefMask(sizeScale, state.guillocheReliefX/100, state.guillocheReliefY/100) : null;
      const reliefAmt = (state.guillocheReliefAmount/100) * 70;
      for(let i=-1;i<=bandCount+1;i++){
        const y0 = i*spacing;
        if(y0 < -spacing || y0 > H+spacing) continue;
        const phase = phaseBase + i*twist*2.2;
        let d = '';
        for(let s=0;s<=stepsX;s++){
          const xx = (s/stepsX)*W;
          const relief = mask ? sampleRelief(mask, xx, y0) : 0;
          const yy = y0 + Math.sin((xx/W)*freq*Math.PI*2 + phase)*ampPx - reliefAmt*relief;
          d += (s===0 ? 'M' : 'L') + xx.toFixed(2)+','+yy.toFixed(2)+' ';
        }
        out += `<path d="${d}" fill="none" stroke="${ink}" stroke-width="${strokeW.toFixed(2)}" opacity="${opacity.toFixed(2)}"/>`;
      }
    }

    return out;
  }

  function regularShapePath(shape, size){
    if(shape==='square') return `M ${-size/2},${-size/2} L ${size/2},${-size/2} L ${size/2},${size/2} L ${-size/2},${size/2} Z`;
    if(shape==='triangle') return `M ${-size/2},${size/2} L ${size/2},${size/2} L 0,${-size/2} Z`;
    return '';
  }
  function smoothOpenPath(pts){
    if(pts.length<2) return '';
    let d = `M ${pts[0].x.toFixed(2)},${pts[0].y.toFixed(2)} `;
    for(let i=0;i<pts.length-1;i++){
      const mx=(pts[i].x+pts[i+1].x)/2, my=(pts[i].y+pts[i+1].y)/2;
      d += `Q ${pts[i].x.toFixed(2)},${pts[i].y.toFixed(2)} ${mx.toFixed(2)},${my.toFixed(2)} `;
    }
    const last = pts[pts.length-1];
    d += `L ${last.x.toFixed(2)},${last.y.toFixed(2)} `;
    return d;
  }
  function smoothClosedPath(pts){
    return smoothOpenPath([...pts, pts[0], pts[1]]) + 'Z';
  }

  function buildChecker(rand, palette){
    const cols = Math.max(6, Math.round(state.density*1.3));
    const cellSize = W/cols;
    const rows = Math.ceil(H/cellSize)+1;
    const attrCount = 1 + Math.floor((state.jitter/100)*2.4);
    const attractors = [];
    for(let i=0;i<attrCount;i++) attractors.push({x:rand()*W, y:rand()*H});
    const radius = 100 + (state.cluster/100)*420;
    const minSize = Math.max(1.5, (state.baseSize/100)*10);
    const maxSize = minSize + (state.baseSize/100)*46;
    const rotateToward = state.rotation > 40;

    let out = '';
    for(let i=0;i<cols;i++) for(let j=0;j<rows;j++){
      const x = i*cellSize+cellSize/2, y = j*cellSize+cellSize/2;
      let nearest=null, dmin=Infinity;
      attractors.forEach(a=>{ const d=Math.hypot(x-a.x,y-a.y); if(d<dmin){dmin=d; nearest=a;} });
      const size = dmin<radius ? (maxSize - (maxSize-minSize)*Math.min(1,dmin/radius)) : minSize;
      const rotationDeg = (rotateToward && nearest) ? Math.atan2(y-nearest.y,x-nearest.x)*180/Math.PI : 0;
      const shapeOpts = ['circle','square','triangle'];
      const shape = shapeOpts[Math.floor(rand()*3)];
      out += `<g transform="translate(${x.toFixed(2)},${y.toFixed(2)}) rotate(${rotationDeg.toFixed(1)})">`;
      if(shape==='circle') out += `<circle r="${(size/2).toFixed(2)}" fill="${palette.ink}"/>`;
      else if(shape==='square') out += `<g transform="rotate(45)"><path d="${regularShapePath('square',size)}" fill="${palette.ink}"/></g>`;
      else out += `<path d="${regularShapePath('triangle',size)}" fill="${palette.ink}"/>`;
      out += `</g>`;
    }
    return out;
  }

  function buildCurves(rand, palette){
    const rows = Math.max(12, Math.round(state.density*4.5));
    const numPts = 7;
    const vertical = state.rotation > 50;
    const spanAlong = vertical ? H : W;
    const spanAcross = vertical ? W : H;
    const separation = spanAcross/(rows-1);
    const jitter = (state.jitter/100)*30;
    const strokeW = Math.max(0.4, (state.baseSize/100)*2.4);
    const filled = state.cluster > 55;

    const rowsV = [];
    for(let r=0;r<rows;r++){
      const v = new Array(numPts);
      if(r===0){ for(let k=0;k<numPts;k++) v[k]=0; }
      else{
        v[0]=r*separation; v[numPts-1]=r*separation;
        for(let k=1;k<numPts-1;k++) v[k] = rowsV[r-1][k] + separation + (rand()-0.5)*2*jitter;
      }
      rowsV.push(v);
    }
    let out = '';
    for(let r=0;r<rows;r++){
      const pts = [];
      for(let k=0;k<numPts;k++){
        const along = k*(spanAlong/(numPts-1));
        pts.push(vertical ? {x:rowsV[r][k], y:along} : {x:along, y:rowsV[r][k]});
      }
      const d = smoothOpenPath(pts);
      out += filled
        ? `<path d="${d}Z" fill="${palette.ink}" opacity="0.2" stroke="none"/>`
        : `<path d="${d}" fill="none" stroke="${palette.ink}" stroke-width="${strokeW.toFixed(2)}"/>`;
    }
    return out;
  }

  function buildVortex(rand, palette){
    const cx = W/2 + (rand()-0.5)*W*0.1, cy = H/2 + (rand()-0.5)*H*0.1;
    const rings = Math.max(6, Math.round(state.density*1.7));
    const step = 2 + (state.cluster/100)*44;
    const sizeInit = 40 + (state.baseSize/100)*(Math.min(W,H)-60);
    const angle = (state.rotation/100)*90;
    const strokeW = Math.max(0.4, (state.jitter/100)*2.6+0.4);
    const crossed = state.rotation > 60;

    let out = `<g transform="translate(${cx.toFixed(2)},${cy.toFixed(2)}) rotate(${angle.toFixed(2)})">`;
    for(let i=0;i<rings;i++){
      const rx = Math.max(0.5,(sizeInit-step*i)/2), ry = Math.max(0.5,(sizeInit+step*i)/2);
      out += `<ellipse rx="${rx.toFixed(2)}" ry="${ry.toFixed(2)}" fill="none" stroke="${palette.ink}" stroke-width="${strokeW.toFixed(2)}"/>`;
      if(crossed) out += `<ellipse rx="${ry.toFixed(2)}" ry="${rx.toFixed(2)}" fill="none" stroke="${palette.ink}" stroke-width="${strokeW.toFixed(2)}"/>`;
    }
    return out + `</g>`;
  }

  function buildWeb(rand, palette){
    const cx = W/2 + (rand()-0.5)*W*0.14, cy = H/2 + (rand()-0.5)*H*0.14;
    const numPts = 10 + Math.round((state.rotation/100)*22);
    const rings = Math.max(5, Math.round(state.density*1.3));
    let radius = 10 + (state.cluster/100)*100;
    const growth = 4 + (state.baseSize/100)*36;
    const jitter = (state.jitter/100)*24;
    const filled = state.cluster > 65;
    const angleStep = Math.PI*2/numPts;

    let out = '';
    for(let r=0;r<rings;r++){
      const pts = [];
      for(let k=0;k<numPts;k++){
        const a = angleStep*k;
        const jx = r===0?0:(rand()-0.5)*2*jitter, jy = r===0?0:(rand()-0.5)*2*jitter;
        pts.push({x:Math.cos(a)*radius+cx+jx, y:Math.sin(a)*radius+cy+jy});
      }
      const d = smoothClosedPath(pts);
      out += filled ? `<path d="${d}" fill="${palette.ink}" opacity="0.16" stroke="none"/>` : `<path d="${d}" fill="none" stroke="${palette.ink}" stroke-width="1"/>`;
      radius += growth;
    }
    return out;
  }

  function buildHole(rand, palette){
    const cx = W/2 + (rand()-0.5)*W*0.08, cy = H/2 + (rand()-0.5)*H*0.08;
    const count = Math.max(10, Math.round(state.density*4));
    const size = 30 + (state.baseSize/100)*(Math.max(W,H)-30);
    const angleStep = (state.cluster/100)*0.12 + 0.004;
    const initAngle = (state.rotation/100)*Math.PI/2;
    const strokeW = Math.max(0.3, (state.jitter/100)*1.8+0.3);
    const shapeOpts = ['square','triangle'];
    const shape = shapeOpts[Math.floor(rand()*2)];

    let out = `<g transform="translate(${cx.toFixed(2)},${cy.toFixed(2)})">`;
    for(let i=0;i<count;i++){
      const rot = (i*angleStep+initAngle)*180/Math.PI;
      out += `<path d="${regularShapePath(shape,size)}" fill="none" stroke="${palette.ink}" stroke-width="${strokeW.toFixed(2)}" transform="rotate(${rot.toFixed(2)})"/>`;
    }
    return out + `</g>`;
  }

  function buildBricksLayer(rand, palette){
    const cols = Math.max(6, Math.round(state.density * 1.3));
    const spacingX = W / cols;
    const spacingY = spacingX * 0.62;
    const rowsCount = Math.ceil(H / spacingY) + 2;
    const sizeScale = state.baseSize / 60;
    const tileW = spacingX * 0.86 * sizeScale;
    const tileH = spacingY * 0.7 * sizeScale;

    const tileColor = lighten(palette.bg, 0.55);
    const swirlAmt = state.cluster/100;
    const freq = Math.max(0.25, state.waveFreq/3);
    const jitterAmt = state.jitter/100;
    const baseTilt = (state.rotation/100) * 40 - 20;
    const sizeVarAmt = state.sizeVar/100;
    const toneVarAmt = state.toneVar/100;
    const roundAmt = state.roundness/100;

    function hash(i,j,o){
      const v = Math.sin(i*127.1 + j*311.7 + state.seed*0.013 + o) * 43758.5453;
      return v - Math.floor(v);
    }

    let out = '';
    for(let row=-1; row<=rowsCount; row++){
      const rowOffset = (row % 2 === 0) ? 0 : spacingX/2;
      const y = row*spacingY + spacingY/2;
      if(y < -spacingY || y > H+spacingY) continue;

      for(let col=-1; col<=cols+1; col++){
        const x = col*spacingX + spacingX/2 + rowOffset;
        if(x < -spacingX || x > W+spacingX) continue;

        const nx = x/W, ny = y/H;
        // Campo de remolino: rotación fuerte cerca del borde izquierdo, se
        // endereza hacia la derecha. La curvatura (derivada del campo) mide
        // qué tan brusco es el giro en ese punto — se usa para modular el
        // grosor del trazo, como una línea grabada de billete.
        const envelope = Math.pow(Math.max(0, 1-nx), 1.6);
        const localWave = Math.sin(ny*freq*Math.PI*2) * envelope * swirlAmt * 85;
        const curvature = envelope * Math.abs(Math.cos(ny*freq*Math.PI*2));
        const jr = (hash(col,row,0)-0.5) * 10 * jitterAmt;
        const rotation = baseTilt + localWave + jr;

        // Variación orgánica por teja: tamaño, tono y redondez de esquina.
        const sx = 1 + (hash(col,row,100)-0.5) * 2 * sizeVarAmt * 0.4;
        const sy = 1 + (hash(col,row,150)-0.5) * 2 * sizeVarAmt * 0.4;
        const w = tileW * sx, h = tileH * sy;
        const rx = Math.min(w,h)/2 * roundAmt * 0.85;

        const toneJ = (hash(col,row,200)-0.5) * 2 * toneVarAmt;
        const fill = shade(tileColor, toneJ*0.4);

        out += `<g transform="translate(${x.toFixed(2)},${y.toFixed(2)}) rotate(${rotation.toFixed(2)})">`;
        out += `<rect x="${(-w/2).toFixed(2)}" y="${(-h/2).toFixed(2)}" width="${w.toFixed(2)}" height="${h.toFixed(2)}" rx="${rx.toFixed(2)}" fill="${fill}"/>`;
        out += `</g>`;
      }
    }
    return out;
  }

  function shapeMarkup(type, r, color, opacity, strokeW){
    switch(type){
      case 'circle':
        return `<circle cx="0" cy="0" r="${r.toFixed(2)}" fill="${color}" opacity="${opacity.toFixed(2)}"/>`;
      case 'petal':
        return `<path d="M 0 ${(-r).toFixed(2)} Q ${(r*0.92).toFixed(2)} 0 0 ${r.toFixed(2)} Q ${(-r*0.92).toFixed(2)} 0 0 ${(-r).toFixed(2)} Z" fill="${color}" opacity="${opacity.toFixed(2)}"/>`;
      case 'arc':
        return `<path d="M ${(-r).toFixed(2)} 0 A ${r.toFixed(2)} ${r.toFixed(2)} 0 0 1 ${r.toFixed(2)} 0" stroke="${color}" stroke-width="${strokeW.toFixed(2)}" fill="none" stroke-linecap="round" opacity="${opacity.toFixed(2)}"/>`;
      case 'line':
        return `<line x1="0" y1="${(-r).toFixed(2)}" x2="0" y2="${r.toFixed(2)}" stroke="${color}" stroke-width="${strokeW.toFixed(2)}" stroke-linecap="round" opacity="${opacity.toFixed(2)}"/>`;
      case 'ring':
        return `<circle cx="0" cy="0" r="${(r*0.7).toFixed(2)}" fill="none" stroke="${color}" stroke-width="${strokeW.toFixed(2)}" opacity="${opacity.toFixed(2)}"/>`;
      case 'card': {
        const w = r*1.7, h = w/1.586, rx = h*0.16;
        return `<rect x="${(-w/2).toFixed(2)}" y="${(-h/2).toFixed(2)}" width="${w.toFixed(2)}" height="${h.toFixed(2)}" rx="${rx.toFixed(2)}" fill="${color}" opacity="${opacity.toFixed(2)}"/>`;
      }
      default:
        return '';
    }
  }

  /* ---------------------------------------------------------
     Render principal
  --------------------------------------------------------- */
  function buildOrganicLayer(shapeId, rand, palette){
    const points = buildPoints(rand);
    const attractors = buildAttractors(rand);

    const jitterAmt = state.jitter/100;
    const clusterAmt = state.cluster/100;
    const rotAmt = state.rotation/100;
    const spacing = W / state.density;
    const baseR = (state.baseSize/100) * (spacing*0.62);

    let maxInfluence = 0.0001;
    const infl = points.map(p=>{
      const v = attractorInfluence(p.x,p.y,attractors);
      if(v>maxInfluence) maxInfluence=v;
      return v;
    });

    const isWave = state.layout === 'wave';
    const wavePhase = (state.seed % 1000) / 1000 * Math.PI * 2;
    let shapes = '';

    points.forEach((p,i)=>{
      let waveVal = 0;
      if(isWave){
        const nx = p.x / W, ny = p.y / H;
        const wx = Math.sin(nx * state.waveFreq * Math.PI * 2 + wavePhase);
        const wy = Math.cos(ny * state.waveFreq * Math.PI * 2 + wavePhase * 0.7);
        waveVal = wx * wy;
      }

      const jx = (rand()-0.5) * spacing * jitterAmt * (isWave ? 0.5 : 1.4);
      const jy = (rand()-0.5) * spacing * jitterAmt * (isWave ? 0.5 : 1.4);
      const x = p.x + jx, y = p.y + jy;
      if(x < -spacing || x > W+spacing || y < -spacing || y > H+spacing) return;

      const normInfl = infl[i] / maxInfluence;
      let sizeFactor = 1 + (normInfl - 0.4) * clusterAmt * 1.6;
      if(isWave) sizeFactor *= 1 + waveVal * 0.4 * clusterAmt;
      const rndSize = 0.55 + rand()*0.9;
      let r = baseR * Math.max(0.18, sizeFactor) * rndSize;
      r = Math.max(1.5, r);

      let rotation;
      if(isWave){
        rotation = waveVal * 55 + (rand()-0.5) * 40 * rotAmt;
      } else {
        rotation = (rand()*360) * rotAmt;
      }
      const opacity = 0.35 + normInfl*0.4 + rand()*0.25;
      const clampedOpacity = Math.min(0.98, Math.max(0.18, opacity));
      const strokeW = Math.max(1, r*0.16);

      let type = shapeId;
      if(type === 'mixed'){
        const opts = ['circle','petal','arc','line','ring','card'];
        type = opts[Math.floor(rand()*opts.length)];
      }
      const color = palette.colors[Math.floor(rand()*palette.colors.length)];
      const shapeInner = shapeMarkup(type, r, color, clampedOpacity, strokeW);

      let rotGroup;
      if(state.animate){
        const oscAmp = 6 + rand()*16;
        const dur = (2.5 + rand()*4).toFixed(2);
        const begin = (rand()*3).toFixed(2);
        const from = (rotation - oscAmp).toFixed(1);
        const to = (rotation + oscAmp).toFixed(1);
        rotGroup = `<g transform="rotate(${rotation.toFixed(1)})"><animateTransform attributeName="transform" attributeType="XML" type="rotate" values="${from} 0 0;${to} 0 0;${from} 0 0" dur="${dur}s" begin="${begin}s" repeatCount="indefinite"/>${shapeInner}</g>`;
      } else {
        rotGroup = `<g transform="rotate(${rotation.toFixed(1)})">${shapeInner}</g>`;
      }
      shapes += `<g transform="translate(${x.toFixed(2)},${y.toFixed(2)})">${rotGroup}</g>`;
    });
    return shapes;
  }

  /* Despachador único: cualquier forma/textura/patrón se resuelve acá,
     así una misma función sirve para la capa principal y la de mezcla. */
  function buildPatternLayer(shapeId, rand, palette){
    if(shapeId === 'mesh') return {bg: buildMeshBackground(palette), shapes: buildMeshLayer(rand, palette)};
    if(shapeId === 'bricks') return {bg: buildBricksBackground(palette), shapes: buildBricksLayer(rand, palette)};
    if(shapeId === 'planks') return {bg: buildPlanksBackground(palette), shapes: buildPlanksLayer(rand, palette)};
    if(shapeId === 'checker') return {bg: null, shapes: buildChecker(rand, palette)};
    if(shapeId === 'curves') return {bg: null, shapes: buildCurves(rand, palette)};
    if(shapeId === 'vortex') return {bg: null, shapes: buildVortex(rand, palette)};
    if(shapeId === 'web') return {bg: null, shapes: buildWeb(rand, palette)};
    if(shapeId === 'hole') return {bg: null, shapes: buildHole(rand, palette)};
    return {bg: null, shapes: buildOrganicLayer(shapeId, rand, palette)};
  }

  return { buildPatternLayer, buildGuillocheLayer };
}

// The patterns, in the three groups of the original: loose shapes on a layout, structured textures, Cordura's patterns.
export const PATRONES = ['circle', 'petal', 'arc', 'line', 'ring', 'card', 'mixed', 'mesh', 'bricks', 'planks', 'checker', 'curves', 'vortex', 'web', 'hole'];
export const NOMBRE_PATRON = { circle: 'Círculo', petal: 'Pétalo', arc: 'Arco', line: 'Línea', ring: 'Anillo', card: 'Tarjeta', mixed: 'Mixta', mesh: 'Malla', bricks: 'Tejas', planks: 'Planchas', checker: 'Grilla', curves: 'Curvas', vortex: 'Vórtice', web: 'Telaraña', hole: 'Agujero' };

// A card face (856 × 540, no rounded corners: the card that carries it rounds them). The same entity and the same key
// always give the same face; `patron` forces one of PATRONES. From the entity: the ink ground and the piece colors
// (the accent in one loose shape in eleven, or as the ink of a line pattern), the roundness of the tiles, and the petals
// of the guilloché, which are the points of its emblem. From the key: the layout, the sliders and whether it is engraved.
export function placa(G, clave, o = {}) {
  const W = 856, H = 540, h = hash(`placa|${G.semilla}|${clave}`), r = azar(h), C = G.pieza;
  const patron = o.patron ?? PATRONES[hash(`patron|${G.semilla}|${clave}`) % PATRONES.length];
  // Tiles and planks are made of one brand color on ink; everything else is drawn on ink with one brand color as its ink.
  const macizo = patron === 'bricks' || patron === 'planks';
  const palette = macizo ? { bg: [C.barras[0], C.barras[2], C.barras[4]][r.i(0, 2)], ink: C.base, colors: [] }
    : { bg: C.base, ink: [C.barras[0], C.barras[2], C.barras[4], C.acento][r.i(0, 3)], colors: [...C.barras, ...C.barras, C.acento] };
  const state = {
    shape: patron, layout: ['hex', 'grid', 'radial', 'wave'][r.i(0, 3)], seed: h % 100000, animate: false,
    // (a web fills its rings above 65: on ink that would cover the whole card with one color, so it stays in lines)
    density: patron === 'planks' ? r.i(8, 13) : r.i(9, 20), baseSize: r.i(40, 80), jitter: r.i(10, 40), cluster: r.i(40, patron === 'web' ? 65 : 90), rotation: r.i(20, 80), waveFreq: r.f(0.8, 3),
    sizeVar: 35, toneVar: 40, roundness: Math.round(G.redondez * 100),
    guilloche: o.guilloche ?? r.b(1 / 3), guillocheType: ['rosette', 'spiro', 'waves', 'radial'][r.i(0, 3)], guillocheCount: r.i(1, 2), guillochePetals: G.puntas,
    guillocheSize: r.i(60, 130), guillocheAmp: 55, guillocheTwist: 45, guillocheStroke: 40, guillocheDensity: r.i(10, 35), guillocheOpacity: 45, guillocheColor: C.tinta,
    guillocheRelief: false, guillocheReliefAmount: 0, guillocheReliefX: 0, guillocheReliefY: 0
  };
  const D = dibujosPlaca(state, W, H, rng, () => null), capa = D.buildPatternLayer(patron, rng(state.seed), palette);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" aria-hidden="true">` +
    `<defs><radialGradient id="sheen" cx="20%" cy="10%" r="90%"><stop offset="0%" stop-color="${C.tinta}" stop-opacity="0.10"/><stop offset="45%" stop-color="${C.tinta}" stop-opacity="0"/></radialGradient></defs>` +
    (capa.bg || `<rect x="0" y="0" width="${W}" height="${H}" fill="${palette.bg}"/>`) + capa.shapes + (state.guilloche ? D.buildGuillocheLayer(palette) : '') +
    `<rect x="0" y="0" width="${W}" height="${H}" fill="url(#sheen)"/></svg>`;
}
