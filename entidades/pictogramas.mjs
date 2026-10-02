// The pictograms of an entity: line drawings (a shield, a scale, a chart, a clock, a spiral). The user wants them
// small, as icons that tell things apart with a funky touch: a chapter, a project, a tag gets its own drawing from its
// name. They do not replace Carbon's icons, which stay for actions and states: a pictogram distinguishes, it does not
// say what a control does. The 32 drawings, each with up to eight compositions chosen by the key, are the user's own,
// from the "Neo-banking Icon System v14" study (referencias/icon_system_v14.html), kept as written. What changed: the
// ink, the ground and the stroke are the entity's, line ends follow the entity's corners (square for straight
// corners, round otherwise), and randomness is the generator's.
import { hash, azar, rasgos } from './semilla.mjs';

// Each drawing: (S, r, T) → SVG. S size, r seeded randomness, T traits of the concept (T.variant picks the composition).
function dibujosPictograma(SW, INK, BG, CAP, JOIN) {
  const π=Math.PI,τ=π*2;
  const f3=n=>(+n).toFixed(3);
  const sS=()=>`fill="none" stroke="${INK}" stroke-width="${f3(SW)}" stroke-linecap="${CAP}" stroke-linejoin="${JOIN}"`;
  const sR=()=>`fill="none" stroke="${INK}" stroke-width="${f3(SW)}" stroke-linecap="round" stroke-linejoin="round"`;
  const sD=()=>`fill="none" stroke="${INK}" stroke-width="${f3(SW)}" stroke-linecap="${CAP}" stroke-dasharray="${f3(SW*2.2)} ${f3(SW*1.4)}"`;
  const fF=(op=1)=>`fill="${INK}" stroke="none" opacity="${op}"`;

  const Ln=(x1,y1,x2,y2,a)=>`<line x1="${f3(x1)}" y1="${f3(y1)}" x2="${f3(x2)}" y2="${f3(y2)}" ${a||sS()}/>`;
  const Ci=(cx,cy,r,a)=>`<circle cx="${f3(cx)}" cy="${f3(cy)}" r="${f3(r)}" ${a||sS()}/>`;
  const Dt=(cx,cy,r,op=1)=>`<circle cx="${f3(cx)}" cy="${f3(cy)}" r="${f3(r)}" ${fF(op)}/>`;
  const Re=(x,y,w,h,a)=>w>0&&h>0?`<rect x="${f3(x)}" y="${f3(y)}" width="${f3(w)}" height="${f3(h)}" ${a||sS()}/>`:'';
  const RF=(x,y,w,h,op=1)=>w>0&&h>0?`<rect x="${f3(x)}" y="${f3(y)}" width="${f3(w)}" height="${f3(h)}" ${fF(op)}/>`:'';
  const El=(cx,cy,rx,ry,rot,a)=>`<ellipse cx="${f3(cx)}" cy="${f3(cy)}" rx="${f3(rx)}" ry="${f3(ry)}" transform="rotate(${f3(rot)} ${f3(cx)} ${f3(cy)})" ${a||sS()}/>`;

  function Ar(cx,cy,r,a0,span,a){
    if(Math.abs(span)>=τ-.01) return Ci(cx,cy,r,a||sR());
    const a1=a0+span,laf=Math.abs(span)>π?1:0,sf=span>0?1:0;
    const sx=cx+r*Math.cos(a0),sy=cy+r*Math.sin(a0);
    const ex=cx+r*Math.cos(a1),ey=cy+r*Math.sin(a1);
    return`<path d="M${f3(sx)} ${f3(sy)} A${f3(r)} ${f3(r)} 0 ${laf} ${sf} ${f3(ex)} ${f3(ey)}" ${a||sR()}/>`;
  }
  function Po(pts,cl,a){
    if(!pts||pts.length<2)return'';
    return`<path d="${pts.map((p,i)=>`${i?'L':'M'}${f3(p[0])} ${f3(p[1])}`).join('')}${cl?'Z':''}" ${a||sS()}/>`;
  }
  function Sec(cx,cy,r1,r2,a0,span,op=1){
    if(Math.abs(span)<.003)return'';
    const lg=Math.abs(span)>π?1:0;
    const c=(r,a)=>[cx+r*Math.cos(a),cy+r*Math.sin(a)];
    const [ox0,oy0]=c(r2,a0),[ox1,oy1]=c(r2,a0+span);
    const [ix0,iy0]=c(r1,a0),[ix1,iy1]=c(r1,a0+span);
    return`<path d="M${f3(ox0)} ${f3(oy0)} A${f3(r2)} ${f3(r2)} 0 ${lg} 1 ${f3(ox1)} ${f3(oy1)} L${f3(ix1)} ${f3(iy1)} A${f3(r1)} ${f3(r1)} 0 ${lg} 0 ${f3(ix0)} ${f3(iy0)} Z" ${fF(op)}/>`;
  }
  function arrowHead(ex,ey,angle,len,a){
    const ax=ex+Math.cos(angle+π*.78)*len,ay=ey+Math.sin(angle+π*.78)*len;
    const bx=ex+Math.cos(angle-π*.78)*len,by=ey+Math.sin(angle-π*.78)*len;
    return Po([[ax,ay],[ex,ey],[bx,by]],false,a||sR());
  }
  return [
/* 00 — RADIAL-SPOKES
   variant 0-3: uniform / alternating weight / partial arc / inward burst
   variant 4-7: with inner polygon / double ring / offset centre / sector mix */
(S,r,T)=>{
  const cx=S/2,cy=S/2,pad=S*.1,R=S/2-pad;
  const n=4+T.n%10, base=T.phase/n;
  const v=T.variant;
  let o='';
  if(v<2){
    // spokes with alternating length
    const r0=R*(v===0?.15:.08), r1=R*(.72+T.ratio*.25);
    for(let i=0;i<n;i++){
      const a=base+i*τ/n;
      const len=T.alt&&i%2===0?r1:r1*(v===0?1:.65);
      const w=T.alt&&i%2===0?SW*1.6:SW;
      o+=`<line x1="${f3(cx+Math.cos(a)*r0)}" y1="${f3(cy+Math.sin(a)*r0)}" x2="${f3(cx+Math.cos(a)*len)}" y2="${f3(cy+Math.sin(a)*len)}" stroke="${INK}" stroke-width="${f3(w)}" stroke-linecap="${CAP}"/>`;
    }
    if(v===0) o+=Ci(cx,cy,r0);
  } else if(v<4){
    // partial arcs radiating out
    const r0=R*(.18+T.ratio*.2), span=T.angle*.8+.6;
    for(let i=0;i<n;i++){
      const a=base+i*τ/n;
      o+=Ar(cx+Math.cos(a)*r0*1.4,cy+Math.sin(a)*r0*1.4,r0,a-span/2,span,sR());
    }
  } else if(v<6){
    // concentric rings of dots
    const rings=1+T.n2%3;
    for(let ri=0;ri<rings;ri++){
      const rr=R*(.3+ri*(.6/rings));
      const ni=3+(ri+1)*3;
      for(let i=0;i<ni;i++) o+=Dt(cx+Math.cos(base+i*τ/ni)*rr,cy+Math.sin(base+i*τ/ni)*rr,SW*.9+T.ratio*SW*.5);
    }
  } else {
    // sector wedges (filled pie slices)
    const gap=r.f(.05,.18)*τ/n;
    for(let i=0;i<n;i++){
      const op=.3+((i+T.weight)%n)/n*.7;
      o+=Sec(cx,cy,R*(.18+T.ratio*.2),R*.92,base+i*τ/n+gap/2,τ/n-gap,op);
    }
  }
  o+=Dt(cx,cy,SW*1.1);
  return o;
},

/* 01 — CONCENTRIC-RINGS
   variant 0-1: full circles / arcs
   variant 2-3: rectangles / mixed round+square
   variant 4-5: spiral / logarithmic spacing
   variant 6-7: partial + dash / radial+concentric combo */
(S,r,T)=>{
  const cx=S/2,cy=S/2,pad=S*.1,R=S/2-pad;
  const n=2+T.n2%5, v=T.variant;
  let o='';
  if(v<2){
    for(let i=0;i<n;i++){
      const t=(i+1)/(n+.5);
      const rr=v===0?R*t:R*(1-Math.pow(1-t,1.8));
      if(T.alt&&i%2===0) o+=Ar(cx,cy,rr,T.phase,π*(1.1+T.ratio*.8),sR());
      else o+=Ci(cx,cy,rr);
    }
  } else if(v<4){
    // concentric rectangles
    for(let i=0;i<n;i++){
      const d=pad+i*(S/2-pad)*.4;
      o+=v===2?Re(d,d,S-d*2,S-d*2):Re(d+S*.04,d,S-d*2-S*.08,S-d*2);
    }
  } else if(v<6){
    // spiral
    const turns=1.5+T.ratio*1.5, steps=100;
    let d='';
    for(let i=0;i<=steps;i++){
      const t=i/steps, a=T.phase+t*τ*turns, rad=R*.1+R*.85*t;
      d+=i?`L${f3(cx+Math.cos(a)*rad)} ${f3(cy+Math.sin(a)*rad)}`:`M${f3(cx+Math.cos(a)*rad)} ${f3(cy+Math.sin(a)*rad)}`;
    }
    o+=`<path d="${d}" ${v===4?sR():sD()}/>`;
  } else {
    // concentric arcs with rotation offset each ring
    for(let i=0;i<n;i++){
      const t=(i+1)/(n+.5), rr=R*t;
      const rot=T.phase+i*(.3+T.ratio*.4);
      const span=π*(.6+T.ratio*.9);
      o+=Ar(cx,cy,rr,rot,span,sR());
      if(v===7) o+=Ar(cx,cy,rr,rot+π,span*.7,sD());
    }
  }
  return o;
},

/* 02 — LINEAR-FLOW
   variant 0: two parallel arrows (transfer)
   variant 1: arrows converging to centre (merge)
   variant 2: arrows diverging from centre (fork)
   variant 3: staggered offset arrows
   variant 4: single thick arrow with decorations
   variant 5: chain of dots+lines
   variant 6: branching tree
   variant 7: circular flow */
(S,r,T)=>{
  const pad=S*.1,f=S-pad*2,cx=S/2,cy=S/2;
  const v=T.variant, aH=f*(.09+T.ratio*.07);
  let o='';
  if(v===0){
    const gap=f*(.18+T.ratio*.14);
    const y1=cy-gap/2,y2=cy+gap/2,x0=pad+f*.04,x1=S-pad-f*.04;
    o+=Ln(x0,y1,x1-aH,y1)+arrowHead(x1,y1,0,aH);
    o+=Ln(x1,y2,x0+aH,y2)+arrowHead(x0,y2,π,aH);
  } else if(v===1){
    const n=2+T.n2%4;
    for(let i=0;i<n;i++){
      const a=T.phase+i*τ/n, x0=cx+Math.cos(a)*f*.44, y0=cy+Math.sin(a)*f*.44;
      o+=Ln(x0,y0,cx+Math.cos(a)*aH*1.5,cy+Math.sin(a)*aH*1.5);
      o+=arrowHead(cx,cy,a+π,aH);
    }
    o+=Dt(cx,cy,SW*1.4);
  } else if(v===2){
    const n=2+T.n2%4;
    for(let i=0;i<n;i++){
      const a=T.phase+i*τ/n, ex=cx+Math.cos(a)*f*.44, ey=cy+Math.sin(a)*f*.44;
      o+=Ln(cx,cy,ex-Math.cos(a)*aH*1.5,ey-Math.sin(a)*aH*1.5);
      o+=arrowHead(ex,ey,a,aH);
    }
    o+=Dt(cx,cy,SW*1.4);
  } else if(v===3){
    const n=2+T.n2%3;
    for(let i=0;i<n;i++){
      const off=(i-(n-1)/2)*(f*.18+T.ratio*f*.08);
      const stagger=(i%2===0?1:-1)*f*.06;
      o+=Ln(pad,cy+off,S-pad-aH,cy+off+stagger);
      o+=arrowHead(S-pad,cy+off+stagger,0,aH);
    }
  } else if(v===4){
    const w=f*(.38+T.ratio*.3);
    o+=Po([[cx-w/2,cy-f*.08],[cx+w/2-aH*1.5,cy-f*.08],[cx+w/2-aH*1.5,cy-f*.16],[cx+w/2,cy],[cx+w/2-aH*1.5,cy+f*.16],[cx+w/2-aH*1.5,cy+f*.08],[cx-w/2,cy+f*.08]],true);
  } else if(v===5){
    const n=3+T.n2%4;
    const xs=Array.from({length:n},(_,i)=>pad+f*.05+i*f*.9/(n-1));
    xs.forEach((x,i)=>{
      o+=Dt(x,cy,SW*(1.2+T.ratio));
      if(i<n-1) o+=Ln(x+SW*(1.2+T.ratio),cy,xs[i+1]-SW*(1.2+T.ratio),cy);
    });
  } else if(v===6){
    // binary tree
    const depth=2+T.mode%2, rootX=cx, rootY=pad+f*.08;
    const draw=(x,y,d,spread)=>{
      if(d<=0){o+=Dt(x,y,SW*.9);return;}
      const ly=y+f*.28, lx=x-spread/2, rx=x+spread/2;
      o+=Ln(x,y,lx,ly)+Ln(x,y,rx,ly);
      draw(lx,ly,d-1,spread*.55); draw(rx,ly,d-1,spread*.55);
    };
    o+=Dt(rootX,rootY,SW*1.1); draw(rootX,rootY+SW,depth,f*(.32+T.ratio*.2));
  } else {
    // circular flow with arrows
    const n=3+T.n2%3, rad=f*(.28+T.ratio*.14);
    for(let i=0;i<n;i++){
      const a0=T.phase+i*τ/n, a1=a0+τ/n-τ*.1;
      o+=Ar(cx,cy,rad,a0,τ/n-τ*.12,sR());
      const ex=cx+rad*Math.cos(a1),ey=cy+rad*Math.sin(a1);
      o+=arrowHead(ex,ey,a1+π/2,aH*.7);
    }
  }
  return o;
},

/* 03 — WAVEFORM
   variant 0: sine / 1: double sine / 2: square wave
   variant 3: damped wave / 4: two crossing waves
   variant 5: spectrum bars / 6: sawtooth / 7: step+ramp */
(S,r,T)=>{
  const pad=S*.1,f=S-pad*2,cx=S/2,cy=S/2;
  const v=T.variant, freq=.8+T.ratio*1.8, amp=f*(.18+T.ratio*.18), steps=80;
  const wave=(ph,freq2,amp2,a)=>{
    let d=''; for(let i=0;i<=steps;i++){const t=i/steps,x=pad+t*f,y=cy-Math.sin(t*τ*freq2+ph)*amp2;d+=i?`L${f3(x)} ${f3(y)}`:`M${f3(x)} ${f3(y)}`;}
    return`<path d="${d}" ${a||sR()}/>`;
  };
  if(v===0) return Ln(pad,cy,S-pad,cy,`fill="none" stroke="${INK}" stroke-width="${f3(SW*.35)}" stroke-linecap="${CAP}"`)+wave(T.phase,freq,amp);
  if(v===1) return wave(T.phase,freq,amp)+wave(T.phase+π,freq,amp*(.55+T.ratio*.3),sD());
  if(v===2){
    // square wave
    const n=3+T.n2%4; let d='';
    for(let i=0;i<=n*2;i++){const t=i/(n*2),x=pad+t*f,y=cy+(i%2===0?-1:1)*amp;d+=i?`L${f3(x)} ${f3(y)}`:`M${f3(x)} ${f3(y)}`;}
    return`<path d="${d}" ${sS()}/>`;
  }
  if(v===3){
    // damped wave
    let d=''; for(let i=0;i<=steps;i++){const t=i/steps,x=pad+t*f,damp=Math.exp(-t*2.5),y=cy-Math.sin(t*τ*freq*1.4+T.phase)*amp*damp;d+=i?`L${f3(x)} ${f3(y)}`:`M${f3(x)} ${f3(y)}`;}
    return`<path d="${d}" ${sR()}/>`;
  }
  if(v===4) return wave(T.phase,freq,amp)+wave(T.phase+π*.3,freq*1.4,amp*.6);
  if(v===5){
    // spectrum bars
    const n=5+T.n%8, byR=S-pad*1.4, maxH=f*(.5+T.ratio*.38);
    let o=Ln(pad,byR,S-pad,byR);
    for(let i=0;i<n;i++){const t=i/(n-1),h=maxH*Math.exp(-Math.pow((t-T.ratio)*4,2));o+=Ln(pad+t*f,byR,pad+t*f,byR-h);}
    return o;
  }
  if(v===6){
    // sawtooth
    const n=3+T.n2%4; let d='';
    for(let i=0;i<=n;i++){const t=i/n,x=pad+t*f;d+=`${d?'L':'M'}${f3(x)} ${f3(cy+amp)} L${f3(x)} ${f3(cy-amp)} `;}
    return`<path d="${d}" ${sS()}/>`;
  }
  // v===7: step function + ramp
  const n=3+T.n2%3; let d='';
  for(let i=0;i<n;i++){const t=i/n,t2=(i+1)/n,x1=pad+t*f,x2=pad+t2*f,y=cy-((i%2===0?-1:1)*amp*(1-t));d+=`${i?'L':'M'}${f3(x1)} ${f3(y)} L${f3(x2)} ${f3(y)}`;}
  return`<path d="${d}" ${sS()}/>`;
},

/* 04 — GRID-STRUCTURES
   variant 0: regular grid (filled cell) / 1: sparse grid
   variant 2: T-account (ledger) / 3: matrix with highlight row
   variant 4: checkerboard / 5: stepped grid
   variant 6: grid with diagonal / 7: hierarchical boxes */
(S,r,T)=>{
  const pad=S*.1,f=S-pad*2,cx=S/2,cy=S/2;
  const v=T.variant;
  if(v<2){
    const cols=2+T.n2%4, rows=T.n2%3||2;
    const cw=f/cols,ch=f/rows;
    let o=Re(pad,pad,f,f);
    for(let c=1;c<cols;c++) o+=Ln(pad+c*cw,pad,pad+c*cw,S-pad);
    for(let rr=1;rr<rows;rr++) o+=Ln(pad,pad+rr*ch,S-pad,pad+rr*ch);
    if(v===0){const hc=T.h%cols,hr=(T.h>>4)%rows;o+=RF(pad+hc*cw+SW*.5,pad+hr*ch+SW*.5,cw-SW,ch-SW,.9);}
    return o;
  }
  if(v===2){
    // T-account ledger
    let o=Re(pad,pad,f,f)+Ln(cx,pad,cx,S-pad,`${sS()} stroke-width="${f3(SW*1.4)}"`);
    const rows=2+T.n2%3;
    for(let i=1;i<rows;i++) o+=Ln(pad,pad+i*f/rows,S-pad,pad+i*f/rows);
    [[0,0],[0,1],[1,1],[rows-1,0]].forEach(([ri,ci])=>{if(ri<rows)o+=Dt(pad+ci*(f/2)+f*.35,pad+ri*(f/rows)+f*.08,SW*.7);});
    return o;
  }
  if(v===3){
    // matrix with highlighted row
    const cols=3+T.n2%3,rows=3+T.n2%3;
    const cw=f/cols,ch=f/rows;
    const hr=(T.h>>3)%rows;
    let o=Re(pad,pad,f,f);
    for(let c=1;c<cols;c++) o+=Ln(pad+c*cw,pad,pad+c*cw,S-pad);
    for(let rr=1;rr<rows;rr++) o+=Ln(pad,pad+rr*ch,S-pad,pad+rr*ch);
    o+=RF(pad,pad+hr*ch+SW*.5,f,ch-SW,.88);
    return o;
  }
  if(v===4){
    // checkerboard 3×3
    const n=3,cw=f/n,ch=f/n;
    let o='';
    for(let ri=0;ri<n;ri++) for(let ci=0;ci<n;ci++)
      if((ri+ci)%2===0) o+=RF(pad+ci*cw,pad+ri*ch,cw,ch,.85);
    o+=Re(pad,pad,f,f);
    return o;
  }
  if(v===5){
    // stepped grid — columns of different heights
    const n=3+T.n2%3,bW=f/n*.8;
    let o=Ln(pad,S-pad,S-pad,S-pad);
    for(let i=0;i<n;i++){
      const h=f*(.28+T.ratio*.6*(i+1)/n);
      const x=pad+(i+.1)*f/n;
      o+=Re(x,S-pad-h,bW,h);
    }
    return o;
  }
  if(v===6){
    // grid with diagonal cut
    const cols=2,rows=2,cw=f/cols,ch=f/rows;
    let o=Re(pad,pad,f,f);
    o+=Ln(pad,pad,S-pad,S-pad);
    for(let c=1;c<cols;c++) o+=Ln(pad+c*cw,pad,pad+c*cw,S-pad);
    for(let rr=1;rr<rows;rr++) o+=Ln(pad,pad+rr*ch,S-pad,pad+rr*ch);
    return o;
  }
  // v===7: nested boxes (hierarchy)
  const n=2+T.n2%3;
  let o='';
  const bW=f*.82/n,bH=f*.7/n;
  for(let i=0;i<n;i++) o+=Re(pad+i*f*.08,pad+i*f*.1,f-i*f*.16,bH+i*f*.1*(n-1));
  return o;
},

/* 05 — BARS-AND-CHARTS
   variant 0: vertical bars / 1: horizontal bars
   variant 2: step chart / 3: area chart
   variant 4: two-axis chart / 5: bar + trend line
   variant 6: diverging bars / 7: stacked bars */
(S,r,T)=>{
  const pad=S*.1,f=S-pad*2,cx=S/2,cy=S/2;
  const baseY=S-pad-f*.06, baseX=pad+f*.04;
  const v=T.variant;
  const n=3+T.n%4;
  const hs=Array.from({length:n},(_,i)=>f*(.28+((T.h>>(i*4))&0xf)/15*.65));
  const bW=f*.82/(n*1.4);
  const totalW=n*bW+(n-1)*bW*.4;
  let o='';
  if(v===0){
    o+=Ln(baseX,pad+f*.04,baseX,baseY)+Ln(baseX,baseY,S-pad,baseY);
    hs.forEach((h,i)=>{const x=baseX+f*.06+i*(bW+bW*.4);o+=RF(x,baseY-h,bW,h*.97,.9)+Re(x,baseY-h,bW,h);});
  } else if(v===1){
    o+=Ln(baseX,pad,baseX,baseY)+Ln(baseX,baseY,S-pad,baseY);
    hs.forEach((h,i)=>{const y=pad+f*.06+i*(f*.76/n);o+=RF(baseX,y,h*.7,bW*.9,.9)+Re(baseX,y,h*.7,bW*.9);});
  } else if(v===2){
    o+=Ln(baseX,pad,baseX,baseY)+Ln(baseX,baseY,S-pad,baseY);
    let d=`M${f3(baseX)} ${f3(baseY)}`;
    hs.forEach((h,i)=>{const x1=baseX+f*.06+i*(f*.84/n),x2=x1+f*.84/n;d+=`L${f3(x1)} ${f3(baseY-h)} L${f3(x2)} ${f3(baseY-h)}`;});
    o+=`<path d="${d}" ${sS()}/>`;
  } else if(v===3){
    o+=Ln(baseX,pad,baseX,baseY)+Ln(baseX,baseY,S-pad,baseY);
    const pts=hs.map((h,i)=>[baseX+f*.06+i*f*.88/(n-1),baseY-h]);
    const d=`M${f3(baseX)} ${f3(baseY)} `+pts.map(p=>`L${f3(p[0])} ${f3(p[1])}`).join(' ')+` L${f3(S-pad)} ${f3(baseY)} Z`;
    o+=`<path d="${d}" ${fF(.25)}/>`;
    o+=Po(pts,false,sR());
  } else if(v===4){
    o+=Ln(baseX,pad,baseX,baseY)+Ln(baseX,baseY,S-pad,baseY);
    hs.forEach((h,i)=>{const x=baseX+f*.06+i*(bW+bW*.4);o+=Re(x,baseY-h,bW,h);});
    let d2='';
    for(let i=0;i<30;i++){const t=i/29,x=baseX+f*.06+t*f*.84,y=baseY-f*(.4+Math.sin(t*τ*T.ratio)*f*.25/f);d2+=i?`L${f3(x)} ${f3(y)}`:`M${f3(x)} ${f3(y)}`;}
    o+=`<path d="${d2}" fill="none" stroke="${INK}" stroke-width="${f3(SW*.6)}" stroke-linecap="round" stroke-dasharray="${f3(SW*1.5)} ${f3(SW)}"/>`;
  } else if(v===5){
    o+=Ln(baseX,pad,baseX,baseY)+Ln(baseX,baseY,S-pad,baseY);
    hs.forEach((h,i)=>{const x=baseX+f*.06+i*(bW+bW*.4);o+=RF(x,baseY-h,bW,h*.97,.9)+Re(x,baseY-h,bW,h);});
    const pts2=hs.map((h,i)=>[baseX+f*.06+i*(bW+bW*.4)+bW/2,baseY-h]);
    o+=Po(pts2,false,`fill="none" stroke="${INK}" stroke-width="${f3(SW*.65)}" stroke-linecap="round" stroke-linejoin="round"`);
  } else if(v===6){
    o+=Ln(baseX,pad,baseX,baseY)+Ln(baseX,baseY,S-pad,baseY)+Ln(baseX,cy,S-pad,cy);
    hs.forEach((h,i)=>{const x=baseX+f*.06+i*(bW+bW*.4),up=i%2===0;o+=RF(x,up?cy-h:cy,bW,h*.97,up?.9:.7)+Re(x,up?cy-h:cy,bW,h);});
  } else {
    // stacked bars
    o+=Ln(baseX,pad,baseX,baseY)+Ln(baseX,baseY,S-pad,baseY);
    const segs=2+T.n2%3;
    for(let i=0;i<n;i++){
      const x=baseX+f*.06+i*(bW+bW*.4);
      let y=baseY, total=f*(.5+T.ratio*.4);
      for(let s=0;s<segs;s++){const h=total*(s===segs-1?.4:.3);o+=RF(x,y-h,bW,h,.4+(s+1)*(0.5/segs));y-=h;}
      o+=Re(x,y,bW,baseY-y);
    }
  }
  return o;
},

/* 06 — ORBITAL-SYSTEMS
   variant 0: single ellipse + bodies / 1: multiple orbits
   variant 2: orrery (nested ellipses, different tilts)
   variant 3: orbit + transmission arcs
   variant 4: figure-8 orbit / 5: circular + dot trail
   variant 6: lemniscate / 7: spirograph */
(S,r,T)=>{
  const cx=S/2,cy=S/2,pad=S*.1,R=S/2-pad;
  const v=T.variant;
  const tilt=T.angle*(T.flip?-1:1)*180/π;
  const rx=R*(.55+T.ratio*.3),ry=rx*(.22+T.ratio*.28);
  if(v<2){
    const n=1+(v===1?T.n2%3:0);
    let o='';
    for(let i=0;i<n;i++){
      const sc=1-i*.25;
      o+=El(cx,cy,rx*sc,ry*sc,tilt+(i*22));
    }
    const sa=T.phase;
    const sx=cx+rx*Math.cos(sa)*Math.cos(T.angle)-ry*Math.sin(sa)*Math.sin(T.angle);
    const sy=cy+rx*Math.cos(sa)*Math.sin(T.angle)+ry*Math.sin(sa)*Math.cos(T.angle);
    return o+Dt(cx,cy,R*(.09+T.ratio*.08))+Dt(sx,sy,R*(.04+T.ratio*.04));
  }
  if(v===2){
    // orrery
    const n=2+T.n2%3;
    let o='';
    for(let i=0;i<n;i++) o+=El(cx,cy,R*(.3+i*.22),R*(.12+i*.1),tilt+i*35);
    return o+Dt(cx,cy,R*.1);
  }
  if(v===3){
    const corners=[[pad,S-pad],[S-pad,S-pad],[S-pad,pad],[pad,pad]];
    const [ox,oy]=corners[T.mode];
    const tcx=S/2-ox,tcy=S/2-oy,baseA=Math.atan2(tcy,tcx);
    const n=2+T.n2%3,maxR=R*(.7+T.ratio*.25),span=(.45+T.ratio*.3)*π;
    let o='';
    for(let i=0;i<n;i++) o+=Ar(ox,oy,maxR*(i+1)/n,baseA-span/2,span,sR());
    return o;
  }
  if(v===4){
    // figure-8 / lemniscate
    const a=R*(.28+T.ratio*.12),rot=T.angle,steps=180;
    let d='';
    for(let i=0;i<=steps;i++){
      const t=i/steps*τ,denom=1+Math.sin(t)*Math.sin(t);
      const px=a*Math.cos(t)/denom,py=a*Math.sin(t)*Math.cos(t)/denom;
      const x=cx+px*Math.cos(rot)-py*Math.sin(rot),y=cy+px*Math.sin(rot)+py*Math.cos(rot);
      d+=i?`L${f3(x)} ${f3(y)}`:`M${f3(x)} ${f3(y)}`;
    }
    return`<path d="${d}Z" ${sR()}/>`;
  }
  if(v===5){
    // circular trail
    const n=6+T.n%8, rad=R*(.42+T.ratio*.3), dotR=R*(.05+T.ratio*.04);
    let o=Ci(cx,cy,rad);
    for(let i=0;i<n;i++) o+=Dt(cx+Math.cos(T.phase+i*τ/n)*rad,cy+Math.sin(T.phase+i*τ/n)*rad,dotR*(1-i/n*.6));
    return o;
  }
  if(v===6){
    const turns=1.8+T.ratio*1.4,steps=100,maxR=R*(.85+T.ratio*.1);
    let d='';
    for(let i=0;i<=steps;i++){const t=i/steps,a=T.phase+t*τ*turns,rad=maxR*Math.pow(t,.72);d+=i?`L${f3(cx+Math.cos(a)*rad)} ${f3(cy+Math.sin(a)*rad)}`:`M${f3(cx)} ${f3(cy)}`;}
    return`<path d="${d}" ${sR()}/>`;
  }
  // v===7: epicycloid
  const k=2+T.n2%4,steps=200,R1=R*.55,R2=R*.22;
  let d='';
  for(let i=0;i<=steps;i++){
    const t=i/steps*τ,x=cx+(R1+R2)*Math.cos(t)-R2*Math.cos((R1/R2+1)*t),y=cy+(R1+R2)*Math.sin(t)-R2*Math.sin((R1/R2+1)*t);
    d+=i?`L${f3(x)} ${f3(y)}`:`M${f3(x)} ${f3(y)}`;
  }
  return`<path d="${d}" ${sR()}/>`;
},

/* 07 — SHIELD-LOCK-SECURITY
   variant 0: shield + check / 1: shield + X
   variant 2: padlock / 3: key
   variant 4: fingerprint arcs / 5: eye
   variant 6: hash symbol / 7: certificate frame */
(S,r,T)=>{
  const pad=S*.1,f=S-pad*2,cx=S/2,cy=S/2;
  const v=T.variant;
  const shield=(inner)=>{
    const sW=f*(.5+T.ratio*.18),sH=f*(.6+T.ratio*.18),sx=cx-sW/2,sy=cy-sH/2;
    return`<path d="M${f3(cx)} ${f3(sy)} L${f3(sx+sW)} ${f3(sy+sH*.28)} Q${f3(sx+sW)} ${f3(sy+sH*.72)} ${f3(cx)} ${f3(sy+sH)} Q${f3(sx)} ${f3(sy+sH*.72)} ${f3(sx)} ${f3(sy+sH*.28)} Z" ${sS()}/>`+inner;
  };
  if(v===0){const ck=f*.12,ckx=cx,cky=cy+f*.04;return shield(Po([[ckx-ck*.55,cky],[ckx-ck*.14,cky+ck*.55],[ckx+ck*.55,cky-ck*.4]],false,sR()));}
  if(v===1){const xM=f*.1,xY=f*.1;return shield(Ln(cx-xM,cy-xY,cx+xM,cy+xY,sR())+Ln(cx+xM,cy-xY,cx-xM,cy+xY,sR()));}
  if(v===2){
    const bW=f*(.42+T.ratio*.14),bH=f*(.36+T.ratio*.12),bY=cy-bH*.15,shR=bW*(.22+T.ratio*.06);
    let o=Re(cx-bW/2,bY,bW,bH);
    o+=`<path d="M${f3(cx-shR)} ${f3(bY)} A${f3(shR)} ${f3(shR*(1+T.ratio*.5))} 0 0 1 ${f3(cx+shR)} ${f3(bY)}" ${sS()}/>`;
    o+=Dt(cx,bY+bH*.42,SW*1.1)+Ln(cx,bY+bH*.42+SW*1.2,cx,bY+bH*.68);
    return o;
  }
  if(v===3){
    const angle=T.ratio*π*.6+.4,kR=f*(.18+T.ratio*.06),kL=f*(.42+T.ratio*.12);
    const hx=cx-Math.cos(angle)*kL*.3,hy=cy-Math.sin(angle)*kL*.3;
    let o=Ci(hx,hy,kR)+Dt(hx,hy,kR*.38);
    const tx=hx+Math.cos(angle)*kL,ty=hy+Math.sin(angle)*kL;
    o+=Ln(hx+Math.cos(angle)*kR,hy+Math.sin(angle)*kR,tx,ty);
    const pa=angle+π/2;
    [[.22,.08],[.42,.06]].forEach(([fr,len])=>{const bx=tx-Math.cos(angle)*kL*fr,by=ty-Math.sin(angle)*kL*fr;o+=Ln(bx,by,bx+Math.cos(pa)*f*len,by+Math.sin(pa)*f*len);});
    return o;
  }
  if(v===4){
    const n=4+T.n2%4,maxR=f*(.36+T.ratio*.08);
    let o='';
    for(let i=0;i<n;i++){const rad=maxR*(i+1)/(n+.5),gap=.12+T.ratio*.1;o+=Ar(cx,cy,rad,π+gap,-τ+gap*2,sR());}
    return o+Dt(cx,cy,SW*.9);
  }
  if(v===5){
    const eW=f*(.66+T.ratio*.16),eH=f*(.28+T.ratio*.1),lx=cx-eW/2,rx=cx+eW/2;
    let o=`<path d="M${f3(lx)} ${f3(cy)} Q${f3(cx)} ${f3(cy-eH)} ${f3(rx)} ${f3(cy)} Q${f3(cx)} ${f3(cy+eH)} ${f3(lx)} ${f3(cy)} Z" ${sS()}/>`;
    const iR=eH*(.44+T.ratio*.14);
    return o+Ci(cx,cy,iR)+Dt(cx,cy,iR*(.28+T.ratio*.18));
  }
  if(v===6){
    const gS=f*(.24+T.ratio*.08),gO=gS*(.35+T.ratio*.15);
    return Ln(cx-gO,cy-gS,cx-gO,cy+gS)+Ln(cx+gO,cy-gS,cx+gO,cy+gS)+Ln(cx-gS,cy-gO,cx+gS,cy-gO)+Ln(cx-gS,cy+gO,cx+gS,cy+gO);
  }
  // v===7: certificate frame
  const dW=f*(.58+T.ratio*.2),dH=f*(.68+T.ratio*.14),fold=dW*(.2+T.ratio*.1);
  const dx=cx-dW/2,dy=cy-dH/2;
  let o=Po([[dx,dy],[dx+dW-fold,dy],[dx+dW,dy+fold],[dx+dW,dy+dH],[dx,dy+dH]],true);
  o+=Po([[dx+dW-fold,dy],[dx+dW-fold,dy+fold],[dx+dW,dy+fold]],false);
  [.32,.46,.6,.74].forEach(t=>o+=Ln(dx+dW*.1,dy+dH*t,dx+dW*(.38+T.ratio*.5),dy+dH*t));
  return o;
},

/* 08 — SCALE-BALANCE-MEASURE
   variant 0: balance scale / 1: horizontal ruler
   variant 2: vernier (two scales) / 3: speedometer arc
   variant 4: thermometer / 5: gauge/dial
   variant 6: level with bubble / 7: progress bar */
(S,r,T)=>{
  const pad=S*.1,f=S-pad*2,cx=S/2,cy=S/2;
  const v=T.variant;
  if(v===0){
    const bW=f*(.68+T.ratio*.18),sH=f*(.22+T.ratio*.1),piv=cy-f*.08;
    const lD=r.f(-.07,.07)*f,rD=r.f(-.07,.07)*f;
    let o=Ln(cx-bW/2,piv,cx+bW/2,piv)+Ln(cx,piv,cx,piv+sH)+Ln(cx-bW*.28,piv+sH,cx+bW*.28,piv+sH);
    o+=Ar(cx-bW*.4,piv+lD,bW*.12,0,π)+Ar(cx+bW*.4,piv+rD,bW*.12,0,π);
    o+=Ln(cx-bW*.5,piv,cx-bW*.4+bW*.12,piv+lD)+Ln(cx-bW*.3,piv,cx-bW*.4-bW*.12,piv+lD);
    o+=Ln(cx+bW*.3,piv,cx+bW*.4+bW*.12,piv+rD)+Ln(cx+bW*.5,piv,cx+bW*.4-bW*.12,piv+rD);
    return o;
  }
  if(v===1){
    const y=cy,n=6+T.n%6;
    let o=Ln(pad,y,S-pad,y,`${sS()} stroke-width="${f3(SW*1.3)}"`);
    for(let i=0;i<=n;i++){const x=pad+i*f/n,h=i%3===0?f*.14:i%2===0?f*.1:f*.06;o+=Ln(x,y-h/2,x,y+h/2);}
    return o;
  }
  if(v===2){
    const gap=f*(.16+T.ratio*.12),y1=cy-gap/2,y2=cy+gap/2,n1=4+T.n2%6,n2=n1-1;
    let o=Ln(pad,y1,S-pad,y1)+Ln(pad,y2,S-pad,y2);
    for(let i=0;i<n1;i++){const x=pad+i*f/(n1-1),h=(i===0||i===n1-1)?f*.14:f*.08;o+=Ln(x,y1-h/2,x,y1+h/2);}
    for(let i=0;i<n2;i++){const x=pad+i*f/(n2-1),h=(i===0||i===n2-1)?f*.14:f*.08;o+=Ln(x,y2-h/2,x,y2+h/2);}
    return o;
  }
  if(v===3){
    const R=f*(.36+T.ratio*.08),cy2=cy+f*.06;
    let o=Ar(cx,cy2,R,π*.75,π*1.5,sS());
    for(let i=0;i<=7;i++){const a=π*.75+i*(π*1.5/7),tL=f*(i===0||i===7?.1:.06);o+=Ln(cx+Math.cos(a)*(R-tL),cy2+Math.sin(a)*(R-tL),cx+Math.cos(a)*R,cy2+Math.sin(a)*R);}
    const nA=π*.75+T.ratio*π*1.5;
    return o+Ln(cx,cy2,cx+Math.cos(nA)*R*.72,cy2+Math.sin(nA)*R*.72,`${sR()} stroke-width="${f3(SW*1.2)}"`)+Dt(cx,cy2,SW*1.4);
  }
  if(v===4){
    // thermometer
    const tH=f*(.68+T.ratio*.18),tW=f*.1,bR=tW*.65;
    const tx=cx,ty=cy-tH/2+bR;
    let o=Ln(tx-tW/2,ty,tx-tW/2,cy+tH/2-bR)+Ar(tx,cy+tH/2-bR,tW/2,π,π);
    o+=Ln(tx+tW/2,ty,tx+tW/2,cy+tH/2-bR)+Ar(tx,ty,tW/2,π,π);
    const fillH=tH*(T.ratio*.7+.15);
    o+=RF(tx-tW/2+SW*.5,cy+tH/2-bR-fillH,tW-SW,fillH,.88);
    return o;
  }
  if(v===5){
    const R=f*(.38+T.ratio*.08),cy2=cy+f*.06;
    let o=Ar(cx,cy2,R,π,π,sS());
    const n=5+T.n%5;
    for(let i=0;i<=n;i++){const a=π+i*(π/n),tL=f*(i%2===0?.1:.06);o+=Ln(cx+Math.cos(a)*(R-tL),cy2+Math.sin(a)*(R-tL),cx+Math.cos(a)*R,cy2+Math.sin(a)*R);}
    const zones=[{op:.3,span:π/3},{op:.6,span:π/3},{op:.9,span:π/3}];
    let a=π;
    zones.forEach(z=>{o+=Sec(cx,cy2,R*.62,R*.88,a,z.span,z.op);a+=z.span;});
    const nA=π+T.ratio*π;
    return o+Ln(cx,cy2,cx+Math.cos(nA)*R*.7,cy2+Math.sin(nA)*R*.7,`${sR()} stroke-width="${f3(SW*1.2)}"`)+Dt(cx,cy2,SW*1.4);
  }
  if(v===6){
    // level with bubble
    const lW=f*(.8+T.ratio*.15),lH=f*.16,ly=cy,lx=cx-lW/2;
    let o=Re(lx,ly-lH/2,lW,lH);
    const bubPos=T.ratio-.5,bR=lH*.38,bubX=cx+bubPos*lW*.7;
    o+=Ci(bubX,ly,bR);
    return o+Ln(cx,ly-lH/2-f*.06,cx,ly+lH/2+f*.06);
  }
  // v===7: progress/fill bar
  const bW=f*(.78+T.ratio*.16),bH=f*(.18+T.ratio*.08);
  let o=Re(cx-bW/2,cy-bH/2,bW,bH);
  o+=RF(cx-bW/2+SW*.5,cy-bH/2+SW*.5,(bW-SW)*(.2+T.ratio*.65),bH-SW,.9);
  return o;
},

/* 09 — TOPOLOGY-NETWORK
   variant 0: hub-and-spoke / 1: mesh / 2: tree
   variant 3: chain / 4: ring network / 5: pipeline
   variant 6: layered (hierarchical) / 7: scatter with links */
(S,r,T)=>{
  const pad=S*.1,f=S-pad*2,cx=S/2,cy=S/2;
  const v=T.variant, nR=f*(.07+T.ratio*.04);
  let o='';
  if(v===0){
    const n=3+T.n2%5,R=f*(.32+T.ratio*.12);
    for(let i=0;i<n;i++){const a=T.phase+i*τ/n,nx=cx+Math.cos(a)*R,ny=cy+Math.sin(a)*R;o+=Ln(cx,cy,nx,ny)+Re(nx-nR,ny-nR,nR*2,nR*2);}
    return o+Dt(cx,cy,nR*1.3);
  }
  if(v===1){
    const n=4+T.n2%4,R=f*(.3+T.ratio*.12);
    const pts=Array.from({length:n},(_,i)=>[cx+Math.cos(T.phase+i*τ/n)*R,cy+Math.sin(T.phase+i*τ/n)*R]);
    for(let i=0;i<n;i++) for(let j=i+1;j<n;j++) o+=Ln(pts[i][0],pts[i][1],pts[j][0],pts[j][1]);
    pts.forEach(([x,y])=>o+=Dt(x,y,nR));
    return o;
  }
  if(v===2){
    // binary tree
    const draw=(x,y,d,spread,depth=0)=>{
      o+=Dt(x,y,nR*(1+depth*.2));
      if(d<=0) return;
      const ly=y+f*.26,lx=x-spread/2,rx=x+spread/2;
      o+=Ln(x,y,lx,ly)+Ln(x,y,rx,ly);
      draw(lx,ly,d-1,spread*.5,depth+1); draw(rx,ly,d-1,spread*.5,depth+1);
    };
    draw(cx,pad+f*.08,2+T.mode%2,f*(.28+T.ratio*.16));
    return o;
  }
  if(v===3){
    // chain
    const n=3+T.n2%5,y=cy;
    const xs=Array.from({length:n},(_,i)=>pad+f*.05+i*f*.9/(n-1));
    xs.forEach((x,i)=>{o+=Ci(x,y,nR);if(i<n-1){o+=Ln(x+nR,y,xs[i+1]-nR,y);}});
    return o;
  }
  if(v===4){
    // ring network
    const n=4+T.n2%4,R=f*(.3+T.ratio*.12);
    const pts=Array.from({length:n},(_,i)=>[cx+Math.cos(T.phase+i*τ/n)*R,cy+Math.sin(T.phase+i*τ/n)*R]);
    for(let i=0;i<n;i++) o+=Ln(pts[i][0],pts[i][1],pts[(i+1)%n][0],pts[(i+1)%n][1]);
    pts.forEach(([x,y])=>o+=Dt(x,y,nR));
    return o;
  }
  if(v===5){
    // pipeline
    const n=2+T.n2%4,bH=f*.14,bW=f*.18,gap=f*(.12+T.ratio*.1);
    const total=n*bW+(n-1)*gap,x0=cx-total/2;
    for(let i=0;i<n;i++){
      const x=x0+i*(bW+gap);
      o+=Re(x,cy-bH/2,bW,bH);
      if(i<n-1){const mx=x+bW,aH=f*.06;o+=Ln(mx,cy,mx+gap-aH,cy)+arrowHead(mx+gap,cy,0,aH);}
    }
    return o;
  }
  if(v===6){
    // layered
    const layers=2+T.mode%3,nodesPerLayer=[1,2+T.n2%2,1+T.n2%3].slice(0,layers);
    const yStep=f/(layers+.5),startY=pad+yStep*.5;
    const pts2=nodesPerLayer.map((n,li)=>Array.from({length:n},(_,ni)=>[cx+(ni-(n-1)/2)*f*.55/(n+.5),startY+li*yStep]));
    // connections
    for(let li=0;li<pts2.length-1;li++) for(const p1 of pts2[li]) for(const p2 of pts2[li+1]) o+=Ln(p1[0],p1[1],p2[0],p2[1]);
    pts2.forEach(layer=>layer.forEach(([x,y])=>o+=Re(x-nR,y-nR,nR*2,nR*2)));
    return o;
  }
  // v===7: scatter with links
  const n=4+T.n2%5;
  const pts3=Array.from({length:n},(_,i)=>[pad+f*(.1+((T.h>>(i*5))&0x1f)/31*.8),pad+f*(.1+((T.h>>(i*5+3))&0x1f)/31*.8)]);
  for(let i=0;i<n;i++) if(i+1<n) o+=Ln(pts3[i][0],pts3[i][1],pts3[i+1][0],pts3[i+1][1]);
  pts3.forEach(([x,y])=>o+=Dt(x,y,nR));
  return o;
},

/* 10 — POLYGON-SOLID
   variant 0-1: outlined polygon (3-8 sides) / 2: filled polygon
   variant 3: polygon with inner echo / 4: star polygon
   variant 5: diamond family / 6: trapezoid family
   variant 7: overlapping shapes */
(S,r,T)=>{
  const pad=S*.1,f=S-pad*2,cx=S/2,cy=S/2;
  const R=f/2*(.68+T.ratio*.24);
  const sides=3+T.variant+(T.n2%3);
  const rot=T.phase/sides-π/2;
  const v=T.variant;
  const ngon=(n,rad,rt)=>Array.from({length:n},(_,i)=>[cx+Math.cos(rt+i*τ/n)*rad,cy+Math.sin(rt+i*τ/n)*rad]);
  if(v<2){
    const pts=ngon(sides,R,rot);
    return Po(pts,true,sS())+(T.sub?Po(ngon(sides,R*.58,rot),true,sS()):'');
  }
  if(v===2){
    const pts=ngon(sides,R,rot);
    return Po(pts,true,`${fF()} stroke="${INK}" stroke-width="${f3(SW*.5)}" stroke-linejoin="${JOIN}"`)+
      (T.sub?Po(ngon(sides,R*.55,rot),true,`fill="none" stroke="${BG}" stroke-width="${f3(SW*1.5)}" stroke-linejoin="${JOIN}"`):``);
  }
  if(v===3){
    const pts=ngon(sides,R,rot);
    return Po(pts,true,sS())+Po(ngon(sides,R*.55,rot+π/sides),true,sS());
  }
  if(v===4){
    // star
    const pts=[];
    for(let i=0;i<sides*2;i++){const a=rot+i*π/sides,rad=i%2===0?R:R*(.35+T.ratio*.25);pts.push([cx+Math.cos(a)*rad,cy+Math.sin(a)*rad]);}
    return Po(pts,true,sS());
  }
  if(v===5){
    // diamond family
    const w=R*(.55+T.ratio*.3),h=R*(.9+T.ratio*.1);
    const pts=[[cx,cy-h],[cx+w,cy],[cx,cy+h],[cx-w,cy]];
    return Po(pts,true,sS())+(T.sub?Po([[cx,cy-h*.55],[cx+w*.55,cy],[cx,cy+h*.55],[cx-w*.55,cy]],true,sS()):'');
  }
  if(v===6){
    const tw=R*(1.1+T.ratio*.2),bw=R*(.35+T.ratio*.45),hh=R*(.75+T.ratio*.2);
    return Po([[cx-tw/2,cy-hh],[cx+tw/2,cy-hh],[cx+bw/2,cy+hh],[cx-bw/2,cy+hh]],true,sS());
  }
  // v===7: two overlapping polygons
  const s1=3+T.n2%3,s2=4+T.n2%4;
  return Po(ngon(s1,R,rot),true,sS())+Po(ngon(s2,R*.72,rot+T.angle),true,sS());
},

/* 11 — CURVES-AND-PATHS
   variant 0: bezier S-curve / 1: arc pair (bracket)
   variant 2: smooth closed curve / 3: catenary
   variant 4: two parallel curves / 5: involute
   variant 6: parametric curve / 7: path with nodes */
(S,r,T)=>{
  const pad=S*.1,f=S-pad*2,cx=S/2,cy=S/2;
  const v=T.variant;
  if(v===0){
    const ox=f*(.2+T.ratio*.2);
    return`<path d="M${f3(cx-f*.35)} ${f3(cy-f*.3)} C${f3(cx-ox)} ${f3(cy-f*.3)} ${f3(cx+ox)} ${f3(cy+f*.3)} ${f3(cx+f*.35)} ${f3(cy+f*.3)}" ${sR()}/>`;
  }
  if(v===1){
    const h=f*(.6+T.ratio*.3),d2=f*(.26+T.ratio*.22),curv=.35+T.ratio*.3;
    const brk=(ox,dir)=>{const sg=dir?-1:1,top=[ox+sg*d2/2,cy-h/2],bot=[ox+sg*d2/2,cy+h/2],mid=[ox-sg*d2*curv,cy];return`<path d="M${f3(top[0])} ${f3(top[1])} Q${f3(mid[0])} ${f3(mid[1])} ${f3(bot[0])} ${f3(bot[1])}" ${sR()}/>`;};
    return T.flip?brk(cx-f*.12,0)+brk(cx+f*.12,1):brk(cx,T.alt?1:0);
  }
  if(v===2){
    const n=4+T.n2%4,pts=Array.from({length:n+1},(_,i)=>{const a=i*τ/n+T.phase,rad=f*(.28+Math.sin(a*2+T.ratio*π)*.12);return[cx+Math.cos(a)*rad,cy+Math.sin(a)*rad];});
    let d=`M${f3(pts[0][0])} ${f3(pts[0][1])}`;
    for(let i=1;i<pts.length;i++){const p=pts[i],pp=pts[i-1];d+=` Q${f3((pp[0]+p[0])/2)} ${f3((pp[1]+p[1])/2)} ${f3(p[0])} ${f3(p[1])}`;}
    return`<path d="${d}Z" ${sR()}/>`;
  }
  if(v===3){
    // catenary
    const steps=40,width=f*(.8+T.ratio*.16),sag=f*(.2+T.ratio*.3);
    let d='';
    for(let i=0;i<=steps;i++){const t=i/steps,x=cx-width/2+t*width,y=cy-sag+sag*Math.cosh((t-.5)*3)/Math.cosh(1.5);d+=i?`L${f3(x)} ${f3(y)}`:`M${f3(x)} ${f3(y)}`;}
    let o=`<path d="${d}" ${sR()}/>`;
    o+=Ln(cx-width/2,cy-sag+f*.02,cx-width/2,cy-sag+f*.22)+Ln(cx+width/2,cy-sag+f*.02,cx+width/2,cy-sag+f*.22);
    return o;
  }
  if(v===4){
    const gap=f*(.12+T.ratio*.1);
    const curve=(dy)=>{const c=`<path d="M${f3(pad)} ${f3(cy+dy)} Q${f3(cx)} ${f3(cy+dy-(f*.25+T.ratio*f*.2)*(dy>0?-1:1))} ${f3(S-pad)} ${f3(cy+dy)}" ${sR()}/>`; return c;};
    return curve(-gap/2)+curve(gap/2);
  }
  if(v===5){
    // wavy path with nodes
    const n=5+T.n2%5,steps=50;
    let d='';
    for(let i=0;i<=steps;i++){const t=i/steps,x=pad+t*f,y=cy+Math.sin(t*τ*(1+T.n2%3)+T.phase)*f*(.15+T.ratio*.12);d+=i?`L${f3(x)} ${f3(y)}`:`M${f3(x)} ${f3(y)}`;}
    let o=`<path d="${d}" ${sR()}/>`;
    for(let i=0;i<n;i++) o+=Ci(pad+i*f/(n-1),cy+Math.sin(i*τ*(1+T.n2%3)/(n-1)+T.phase)*f*(.15+T.ratio*.12),SW*1.1);
    return o;
  }
  if(v===6){
    // Lissajous
    const kx=1+T.n2%3,ky=2+T.n2%2,steps=200,R=f*(.36+T.ratio*.1);
    let d='';
    for(let i=0;i<=steps;i++){const t=i/steps*τ,x=cx+R*Math.sin(kx*t+T.phase),y=cy+R*Math.sin(ky*t);d+=i?`L${f3(x)} ${f3(y)}`:`M${f3(x)} ${f3(y)}`;}
    return`<path d="${d}" ${sR()}/>`;
  }
  // v===7: path with endpoint nodes
  const steps2=30;
  let d='';
  for(let i=0;i<=steps2;i++){const t=i/steps2,x=pad+t*f,y=cy+Math.sin(t*τ*(1+T.ratio)+T.phase)*f*(.18+T.ratio*.15);d+=i?`L${f3(x)} ${f3(y)}`:`M${f3(x)} ${f3(y)}`;}
  return`<path d="${d}" ${sR()}/>`+Dt(pad,cy+Math.sin(T.phase)*f*(.18+T.ratio*.15),SW*1.3)+Dt(S-pad,cy+Math.sin(τ+T.phase)*f*(.18+T.ratio*.15),SW*1.3);
},

/* 12–31: Additional 20 unique draw functions */
/* 12 — SCATTER + TREND */
(S,r,T)=>{
  const pad=S*.1,f=S-pad*2,cx=S/2,cy=S/2;
  const n=5+T.n%8,v=T.variant;
  let o=Ln(pad+f*.04,pad,pad+f*.04,S-pad)+Ln(pad+f*.04,S-pad,S-pad,S-pad);
  const pts=Array.from({length:n},(_,i)=>[(pad+f*.08)+((T.h>>(i*4))&0xf)/15*f*.84,(S-pad)-((T.h>>(i*4+2))&0xf)/15*f*.84]);
  pts.forEach(([x,y])=>o+=v<4?Ci(x,y,f*.04):Dt(x,y,f*.035));
  if(T.sub){const sorted=[...pts].sort((a,b)=>a[0]-b[0]);o+=Po(sorted,false,`fill="none" stroke="${INK}" stroke-width="${f3(SW*.55)}" stroke-linecap="round" stroke-dasharray="${f3(SW*1.4)} ${f3(SW)}"`); }
  return o;
},

/* 13 — DOCUMENT */
(S,r,T)=>{
  const pad=S*.1,f=S-pad*2,cx=S/2,cy=S/2;
  const dW=f*(.52+T.ratio*.18),dH=f*(.66+T.ratio*.16),fold=dW*(.18+T.ratio*.12);
  const dx=cx-dW/2,dy=cy-dH/2,v=T.variant;
  let o=Po([[dx,dy],[dx+dW-fold,dy],[dx+dW,dy+fold],[dx+dW,dy+dH],[dx,dy+dH]],true);
  o+=Po([[dx+dW-fold,dy],[dx+dW-fold,dy+fold],[dx+dW,dy+fold]],false);
  const rows=3+T.n2%4;
  for(let i=0;i<rows;i++){
    const t=.28+i*(.66/rows),w=dW*(T.alt&&i%2===0?.72:.52+T.ratio*.26);
    o+=Ln(dx+dW*.1,dy+dH*t,dx+dW*.1+w,dy+dH*t);
  }
  if(v===4||v===5){const ck=f*.09,ckx=dx+dW*.12,cky=dy+dH*.35;o+=Po([[ckx,cky],[ckx+ck*.4,cky+ck*.55],[ckx+ck,cky-ck*.35]],false,sR());}
  return o;
},

/* 14 — DROPLET-LIQUID */
(S,r,T)=>{
  const pad=S*.1,f=S-pad*2,cx=S/2,cy=S/2,v=T.variant;
  if(v<3){
    const dH=f*(.72+T.ratio*.16),dW=f*(.42+T.ratio*.14),tipY=cy-dH/2,baseY=cy+dH/2,ctrl=dW*(.55+T.ratio*.2);
    let o=`<path d="M${f3(cx)} ${f3(tipY)} Q${f3(cx+ctrl)} ${f3(cy+dH*.15)} ${f3(cx+dW/2)} ${f3(baseY-dH*.2)} A${f3(dW/2)} ${f3(dH*.25)} 0 0 1 ${f3(cx-dW/2)} ${f3(baseY-dH*.2)} Q${f3(cx-ctrl)} ${f3(cy+dH*.15)} ${f3(cx)} ${f3(tipY)} Z" ${sS()}/>`;
    if(v===1) o+=Dt(cx,baseY-dH*.3,dW*.12);
    if(v===2){const fillH=dH*(T.ratio*.6+.2);o+=RF(cx-dW/2+SW*.5,baseY-dH*.2-fillH+SW*.5,dW-SW,fillH,.88);}
    return o;
  }
  if(v<6){
    // multiple drops
    const n=2+T.n2%3,spread=f*(.28+T.ratio*.2);
    let o='';
    for(let i=0;i<n;i++){
      const sx=cx+(i-(n-1)/2)*spread,size=(.7+T.ratio*.3)*(1-i*.15);
      const dH2=f*.4*size,dW2=f*.24*size,ctrl2=dW2*.6;
      const tipY2=cy-dH2*.6,baseY2=cy+dH2*.4;
      o+=`<path d="M${f3(sx)} ${f3(tipY2)} Q${f3(sx+ctrl2)} ${f3((tipY2+baseY2)/2)} ${f3(sx+dW2/2)} ${f3(baseY2-dH2*.2)} A${f3(dW2/2)} ${f3(dH2*.25)} 0 0 1 ${f3(sx-dW2/2)} ${f3(baseY2-dH2*.2)} Q${f3(sx-ctrl2)} ${f3((tipY2+baseY2)/2)} ${f3(sx)} ${f3(tipY2)} Z" ${sS()}/>`;
    }
    return o;
  }
  // fill indicator
  const bW=f*(.38+T.ratio*.22),bH=f*(.62+T.ratio*.18);
  let o=Re(cx-bW/2,cy-bH/2,bW,bH);
  const fillFrac=T.ratio*.7+.15;
  o+=RF(cx-bW/2+SW*.5,cy+bH/2-bH*fillFrac,bW-SW,bH*fillFrac,.88);
  return o;
},

/* 15 — STAIRCASE-STEPS */
(S,r,T)=>{
  const pad=S*.1,f=S-pad*2,v=T.variant;
  const n=2+T.n2%5,dir=T.flip?1:-1;
  if(v<4){
    const pts=[];
    for(let i=0;i<=n;i++){const col=pad+i*f/n,row=dir>0?pad+(n-i)*f/n:pad+i*f/n;if(i>0)pts.push([col,pts[pts.length-1][1]]);pts.push([col,row]);}
    let o=Po(pts,false,sS());
    if(v===1) for(let i=0;i<pts.length;i+=2) if(i<pts.length) o+=Dt(pts[i][0],pts[i][1],SW*1.0);
    if(v===2){const aH=f*.08;o+=arrowHead(pts[pts.length-1][0],pts[pts.length-1][1],dir>0?-π/2:π/2,aH);}
    if(v===3) o+=Po(pts.map(([x,y])=>[x,y+f*.06]),false,sD());
    return o;
  }
  // v 4-7: amortizing/growing bars
  let o=Ln(pad,S-pad,S-pad,S-pad);
  for(let i=0;i<n;i++){
    const t=(i+1)/n,h=f*(T.flip?t:1-t)*(.7+T.ratio*.25);
    const x=pad+i*f/n,bW=f/n*.8;
    o+=RF(x,S-pad-h,bW,h*.97,.9)+Re(x,S-pad-h,bW,h);
  }
  return o;
},

/* 16 — LOCK-GATE */
(S,r,T)=>{
  const pad=S*.1,f=S-pad*2,cx=S/2,cy=S/2,v=T.variant;
  if(v<3){
    const w=f*(.5+T.ratio*.18),bot=cy+f*.26,archH=f*(.38+T.ratio*.18);
    const lx=cx-w/2,rx=cx+w/2,top=bot-archH,rad=(rx-lx)/2;
    let o=Ln(lx,bot,lx,top)+Ln(rx,bot,rx,top)+Ar(cx,top,rad,π,π,sS());
    if(v===1){const iW=w*(.52+T.ratio*.18),iTop=top+f*(.1+T.ratio*.08);const ilx=cx-iW/2,irx=cx+iW/2;o+=Ln(ilx,bot-f*.04,ilx,iTop)+Ln(irx,bot-f*.04,irx,iTop)+Ar(cx,iTop,(irx-ilx)/2,π,π,sS());}
    if(v===2){const aH=f*.09;o+=Ln(cx-f*.22,cy,cx+f*.22,cy)+arrowHead(cx+f*.22,cy,0,aH);}
    return o;
  }
  if(v<6){
    // circuit gate symbols
    const gW=f*(.44+T.ratio*.12),gH=f*(.34+T.ratio*.12);
    let o=Ln(pad,cy,cx-gW/2,cy);
    if(v===3){
      o+=Re(cx-gW/2,cy-gH/2,gW,gH);
      o+=Ln(cx+gW/2,cy,S-pad,cy);
    } else if(v===4){
      o+=`<path d="M${f3(cx-gW/2)} ${f3(cy-gH/2)} L${f3(cx)} ${f3(cy-gH/2)} Q${f3(cx+gW/2)} ${f3(cy-gH/2)} ${f3(cx+gW/2)} ${f3(cy)} Q${f3(cx+gW/2)} ${f3(cy+gH/2)} ${f3(cx)} ${f3(cy+gH/2)} L${f3(cx-gW/2)} ${f3(cy+gH/2)} Z" ${sS()}/>`;
      o+=Ln(cx+gW/2,cy,S-pad,cy);
    } else {
      o+=Ci(cx,cy,gW/2)+Ln(cx+gW/2,cy,S-pad,cy);
    }
    return o;
  }
  // v 6-7: turnstile / revolving door
  const R=f*(.3+T.ratio*.12),n=3+T.n2%3;
  let o=Ci(cx,cy,R);
  for(let i=0;i<n;i++) o+=Ln(cx,cy,cx+Math.cos(T.phase+i*τ/n)*R,cy+Math.sin(T.phase+i*τ/n)*R);
  if(v===7) o+=Ar(cx,cy,R*1.28,T.phase,τ*.72,sD());
  return o;
},

/* 17 — ARROWS-COLLECTION */
(S,r,T)=>{
  const pad=S*.1,f=S-pad*2,cx=S/2,cy=S/2,v=T.variant;
  const aH=f*(.1+T.ratio*.08);
  if(v===0){
    // single large arrow
    const w=f*(.38+T.ratio*.3);
    return Po([[cx-w/2,cy-f*.08],[cx+w/2-aH*1.5,cy-f*.08],[cx+w/2-aH*1.5,cy-f*.16],[cx+w/2,cy],[cx+w/2-aH*1.5,cy+f*.16],[cx+w/2-aH*1.5,cy+f*.08],[cx-w/2,cy+f*.08]],true);
  }
  if(v===1){
    // double-headed
    const len=f*(.7+T.ratio*.2);
    return Ln(cx-len/2+aH,cy,cx+len/2-aH,cy)+arrowHead(cx+len/2,cy,0,aH)+arrowHead(cx-len/2,cy,π,aH);
  }
  if(v===2){
    // curved arrow (arc)
    const rad=f*(.28+T.ratio*.12),sweep=(.6+T.ratio*.6)*τ,a0=T.phase;
    const a1=a0+sweep,ex=cx+rad*Math.cos(a1),ey=cy+rad*Math.sin(a1),ta=a1+π/2;
    return Ar(cx,cy,rad,a0,sweep,sR())+arrowHead(ex,ey,ta,aH)+Dt(cx,cy,SW*1.1);
  }
  if(v===3){
    // 4 cardinal arrows
    return[0,π/2,π,3*π/2].map(a=>{const ex=cx+Math.cos(a)*f*.38,ey=cy+Math.sin(a)*f*.38;return Ln(cx+Math.cos(a)*f*.08,cy+Math.sin(a)*f*.08,ex-Math.cos(a)*aH,ey-Math.sin(a)*aH)+arrowHead(ex,ey,a,aH);}).join('');
  }
  if(v===4){
    // diagonal arrows (NE, SW)
    const len=f*.38;
    const a1=-π/4,a2=3*π/4;
    return[a1,a2].map(a=>Ln(cx-Math.cos(a)*len,cy-Math.sin(a)*len,cx+Math.cos(a)*len-Math.cos(a)*aH,cy+Math.sin(a)*len-Math.sin(a)*aH)+arrowHead(cx+Math.cos(a)*len,cy+Math.sin(a)*len,a,aH)).join('');
  }
  if(v===5){
    // zigzag arrow
    const n=3+T.n2%3,xs=[],ys=[];
    for(let i=0;i<=n;i++){xs.push(pad+i*f/n);ys.push(cy+(i%2===0?-1:1)*f*(.12+T.ratio*.1));}
    const pts=xs.map((x,i)=>[x,ys[i]]);
    return Po(pts,false,sR())+arrowHead(pts[pts.length-1][0],pts[pts.length-1][1],0,aH);
  }
  if(v===6){
    // rotating arrows (cycle)
    const n=3+T.n2%3,rad=f*(.28+T.ratio*.14);
    let o='';
    for(let i=0;i<n;i++){const a0=T.phase+i*τ/n,a1=a0+τ/n-τ*.1;o+=Ar(cx,cy,rad,a0,τ/n-τ*.12,sR());const ex=cx+rad*Math.cos(a1),ey=cy+rad*Math.sin(a1);o+=arrowHead(ex,ey,a1+π/2,aH*.7);}
    return o;
  }
  // v===7: stacked arrows (same direction, offset)
  const n=2+T.n2%3,gap=f*.14;
  let o='';
  for(let i=0;i<n;i++){const y=cy+(i-(n-1)/2)*gap,len=f*(.65+T.ratio*.2)*(1-i*.1);o+=Ln(cx-len/2,y,cx+len/2-aH,y)+arrowHead(cx+len/2,y,0,aH);}
  return o;
},

/* 18 — BRACKET-NOTATION */
(S,r,T)=>{
  const pad=S*.1,f=S-pad*2,cx=S/2,cy=S/2,v=T.variant;
  const h=f*(.58+T.ratio*.32),d2=f*(.24+T.ratio*.22),curv=.35+T.ratio*.3;
  const brk=(ox,dir)=>{const sg=dir?-1:1,top=[ox+sg*d2/2,cy-h/2],bot=[ox+sg*d2/2,cy+h/2],mid=[ox-sg*d2*curv,cy];return`<path d="M${f3(top[0])} ${f3(top[1])} Q${f3(mid[0])} ${f3(mid[1])} ${f3(bot[0])} ${f3(bot[1])}" ${sR()}/>`;};
  if(v<2) return T.flip?brk(cx-f*.12,0)+brk(cx+f*.12,1):brk(cx,v===0?0:1);
  if(v===2){
    // square brackets
    const bW=f*(.12+T.ratio*.08),bH=h;
    return Re(cx-f*.18-bW,cy-bH/2,bW,bH,sS())+Re(cx+f*.18,cy-bH/2,bW,bH,sS());
  }
  if(v===3){
    // angle brackets < >
    const bW=f*(.18+T.ratio*.1);
    return Po([[cx-bW,cy-h/2],[cx-bW*2,cy],[cx-bW,cy+h/2]],false,sS())+Po([[cx+bW,cy-h/2],[cx+bW*2,cy],[cx+bW,cy+h/2]],false,sS());
  }
  if(v===4){
    // nested brackets
    const o1=brk(cx-f*.15,0)+brk(cx+f*.15,1);
    const h2=h*.65,d3=d2*.65,curv2=curv;
    const brk2=(ox,dir)=>{const sg=dir?-1:1,top=[ox+sg*d3/2,cy-h2/2],bot=[ox+sg*d3/2,cy+h2/2],mid=[ox-sg*d3*curv2,cy];return`<path d="M${f3(top[0])} ${f3(top[1])} Q${f3(mid[0])} ${f3(mid[1])} ${f3(bot[0])} ${f3(bot[1])}" ${sR()}/>`;};
    return o1+brk2(cx-f*.06,0)+brk2(cx+f*.06,1);
  }
  if(v===5){
    // math brace { }
    const bH=h,bW2=f*.16,kink=f*.06;
    return`<path d="M${f3(cx-f*.08)} ${f3(cy-bH/2)} Q${f3(cx-bW2)} ${f3(cy-bH/2)} ${f3(cx-bW2)} ${f3(cy-kink)} Q${f3(cx-bW2)} ${f3(cy)} ${f3(cx-f*.24)} ${f3(cy)} Q${f3(cx-bW2)} ${f3(cy)} ${f3(cx-bW2)} ${f3(cy+kink)} Q${f3(cx-bW2)} ${f3(cy+bH/2)} ${f3(cx-f*.08)} ${f3(cy+bH/2)}" ${sR()}/>
      <path d="M${f3(cx+f*.08)} ${f3(cy-bH/2)} Q${f3(cx+bW2)} ${f3(cy-bH/2)} ${f3(cx+bW2)} ${f3(cy-kink)} Q${f3(cx+bW2)} ${f3(cy)} ${f3(cx+f*.24)} ${f3(cy)} Q${f3(cx+bW2)} ${f3(cy)} ${f3(cx+bW2)} ${f3(cy+kink)} Q${f3(cx+bW2)} ${f3(cy+bH/2)} ${f3(cx+f*.08)} ${f3(cy+bH/2)}" ${sR()}/>`;
  }
  // v 6-7: sigma / integral notation style
  const pts1=[[cx-f*.08,cy-h*.45],[cx+f*.14,cy-h*.45],[cx-f*.14,cy],[cx+f*.08,cy+h*.45],[cx+f*.22,cy+h*.45]];
  let o=Po(pts1,false,sR());
  if(v===7) o+=Ln(cx+f*.16,cy-h*.5,cx+f*.3,cy-h*.5)+Ln(cx+f*.04,cy+h*.5,cx+f*.18,cy+h*.5);
  return o;
},

/* 19 — TRANSMISSION-SIGNAL */
(S,r,T)=>{
  const pad=S*.1,f=S-pad*2,cx=S/2,cy=S/2,v=T.variant;
  const corners=[[pad,S-pad],[S-pad,S-pad],[S-pad,pad],[pad,pad]];
  const [ox,oy]=corners[T.mode];
  const tcx=S/2-ox,tcy=S/2-oy,baseA=Math.atan2(tcy,tcx);
  const n=2+T.n2%4,maxR=f*(.65+T.ratio*.28),span=(.42+T.ratio*.28)*π;
  if(v<4){
    let o='';
    for(let i=0;i<n;i++) o+=Ar(ox,oy,maxR*(i+1)/n,baseA-span/2,span,v%2===0?sR():sD());
    if(v>=2) o+=Dt(ox,oy,SW*1.1);
    return o;
  }
  // centred wifi/broadcast
  const R=f*(.38+T.ratio*.1),n2=2+T.n2%4,gapA=π*.15;
  let o='';
  for(let i=0;i<n2;i++){const rr=R*(i+1)/(n2+.4),sp=π-gapA;o+=Ar(cx,cy+R*.28,rr,-π/2-sp/2,sp,sR());}
  o+=Dt(cx,cy+R*.28+R*(.6/(n2+.4)),SW*1.1);
  return o;
},

/* 20 — GROWTH-DECAY-TREND */
(S,r,T)=>{
  const pad=S*.1,f=S-pad*2,v=T.variant;
  const steps=40,x0=pad,x1=S-pad,y0=S-pad-f*.08,y1=pad+f*.08;
  const baseX=pad+f*.04,baseY=S-pad-f*.04;
  let o=Ln(baseX,pad,baseX,baseY)+Ln(baseX,baseY,S-pad,baseY);
  if(v===0){
    // exponential growth
    let d='';
    for(let i=0;i<=steps;i++){const t=i/steps,x=x0+t*(x1-x0),y=y0+Math.pow(t,1.8)*(y1-y0);d+=i?`L${f3(x)} ${f3(y)}`:`M${f3(x)} ${f3(y)}`;}
    return o+`<path d="${d}" ${sR()}/>`;
  }
  if(v===1){
    // drawdown: peak then fall
    const peakT=T.ratio*.5+.2,peakY=pad+f*.08,baseY2=S-pad-f*.1;
    let d='';
    for(let i=0;i<=steps;i++){const t=i/steps,x=x0+t*(x1-x0);const y=t<peakT?baseY2+(peakY-baseY2)*(t/peakT):peakY+(baseY2-peakY)*Math.pow((t-peakT)/(1-peakT),1.4);d+=i?`L${f3(x)} ${f3(y)}`:`M${f3(x)} ${f3(y)}`;}
    return o+`<path d="${d}" ${sR()}/>`;
  }
  if(v===2){
    // forecast: solid then dashed
    const split=x0+(x1-x0)*(.38+T.ratio*.25);
    let d1='',d2='';
    for(let i=0;i<=steps;i++){const t=i/steps,x=x0+t*(x1-x0),y=y0+Math.pow(t,.9)*(y1-y0);const cmd=`${f3(x)} ${f3(y)}`;if(i===0){d1='M'+cmd;}else if(x<=split){d1+='L'+cmd;}else{if(d2==='')d2='M'+cmd;else d2+='L'+cmd;}}
    return o+`<path d="${d1}" ${sR()}/><path d="${d2}" ${sD()}/>`;
  }
  if(v===3){
    // yield curve shape
    let d='';
    for(let i=0;i<=steps;i++){const t=i/steps,x=x0+t*(x1-x0),y=y0+(y1-y0)*(1-Math.exp(-t*3));d+=i?`L${f3(x)} ${f3(y)}`:`M${f3(x)} ${f3(y)}`;}
    return o+`<path d="${d}" ${sR()}/>`;
  }
  // v 4-7: compound/spiral growth
  const cx2=S/2,cy2=S/2,turns=1.8+T.ratio*1.4,steps2=100,maxR=f*(.38+T.ratio*.1);
  let d='';
  for(let i=0;i<=steps2;i++){const t=i/steps2,a=T.phase+t*τ*turns,rad=maxR*Math.pow(t,.68);d+=i?`L${f3(cx2+Math.cos(a)*rad)} ${f3(cy2+Math.sin(a)*rad)}`:`M${f3(cx2)} ${f3(cy2)}`;}
  return`<path d="${d}" ${sR()}/>`;
},

/* 21 — HATCHING-FILL */
(S,r,T)=>{
  const pad=S*.1,f=S-pad*2,cx=S/2,cy=S/2,v=T.variant;
  const n=4+T.n%8,angle=T.angle,id=`hp${T.h&0xffff}`;
  let o=`<clipPath id="${id}"><rect x="${pad}" y="${pad}" width="${f}" height="${f}"/></clipPath><g clip-path="url(#${id})">`;
  if(v<3){
    // diagonal lines fill
    const spacing=f/n;
    for(let i=-n;i<n*2;i++){
      const x=pad+i*spacing;
      if(v===0) o+=Ln(x,pad,x+f*Math.sin(angle)*2,S-pad,`stroke="${INK}" stroke-width="${f3(SW*.55)}" stroke-linecap="${CAP}"`);
      else if(v===1) o+=Ln(x-f,cy+Math.tan(angle)*(x-f-cx),x+f,cy+Math.tan(angle)*(x+f-cx),`stroke="${INK}" stroke-width="${f3(SW*.5)}" stroke-linecap="${CAP}"`);
      else o+=Ln(pad+(i%n)*spacing+((i/n|0)*spacing/n),pad,pad+(i%n)*spacing+f*.3,S-pad,`stroke="${INK}" stroke-width="${f3(SW*.45)}" stroke-linecap="${CAP}"`);
    }
  } else if(v<6){
    // crosshatch
    for(let i=0;i<n;i++){const x=pad+i*f/n;o+=Ln(x,pad,x,S-pad,`stroke="${INK}" stroke-width="${f3(SW*.45)}" stroke-linecap="${CAP}"`);}
    for(let i=0;i<n;i++){const y=pad+i*f/n;o+=Ln(pad,y,S-pad,y,`stroke="${INK}" stroke-width="${f3(SW*.45)}" stroke-linecap="${CAP}"`);}
  } else {
    // dot grid
    for(let i=0;i<n;i++) for(let j=0;j<n;j++) o+=Dt(pad+(i+.5)*f/n,pad+(j+.5)*f/n,SW*(.4+T.ratio*.4));
  }
  o+='</g>';
  o+=Re(pad,pad,f,f);
  return o;
},

/* 22 — SPLIT-DIVIDE */
(S,r,T)=>{
  const pad=S*.1,f=S-pad*2,cx=S/2,cy=S/2,v=T.variant;
  // No large solid fill rectangles — always structural/linear
  if(v===0){
    // diagonal cut only
    const angle=T.angle+π/6;
    return Re(pad,pad,f,f)+Ln(cx-Math.cos(angle)*f*.52,cy-Math.sin(angle)*f*.52,cx+Math.cos(angle)*f*.52,cy+Math.sin(angle)*f*.52);
  }
  if(v===1){
    // two-section frame with contrasting lines
    const pos=pad+f*(.35+T.ratio*.3);
    return Re(pad,pad,f,f)+Ln(pos,pad,pos,S-pad,`${sS()} stroke-width="${f3(SW*1.4)}"`)
      +[.38,.52,.66].map(t=>Ln(pad+f*.04,pad+f*t,pos-f*.04,pad+f*t)).join('')
      +[.38,.52,.66].map(t=>Ln(pos+f*.04,pad+f*t,S-pad-f*.04,pad+f*t)).join('');
  }
  if(v===2){
    // horizontal split with different textures
    const pos=pad+f*(.4+T.ratio*.2);
    let o=Re(pad,pad,f,f)+Ln(pad,pos,S-pad,pos,`${sS()} stroke-width="${f3(SW*1.4)}"`);
    for(let i=0;i<5;i++) o+=Ln(pad+i*f/5,pad,pad+(i+1)*f/5,pos);
    return o;
  }
  if(v===3){
    // radial split
    const n=2+T.n2%4;
    let o='';
    for(let i=0;i<n;i++) o+=Ln(cx,cy,cx+Math.cos(T.phase+i*τ/n)*f*.48,cy+Math.sin(T.phase+i*τ/n)*f*.48);
    return o+Ci(cx,cy,f*(.12+T.ratio*.1));
  }
  if(v===4){
    // fork/branch
    const stem=f*.28,branchL=f*(.2+T.ratio*.18),spread=(.3+T.ratio*.4);
    const baseY=cy+stem,topY=cy-stem*.6;
    let o=Ln(cx,baseY,cx,topY);
    const n=2+T.n2%3;
    for(let i=0;i<n;i++){const a=-π/2+(i-(n-1)/2)*spread;o+=Ln(cx,topY,cx+Math.cos(a)*branchL,topY+Math.sin(a)*branchL);}
    return o;
  }
  if(v===5){
    // Venn circles
    const R=f*(.26+T.ratio*.1),dist=R*(.65+T.ratio*.3);
    return Ci(cx-dist/2,cy,R)+Ci(cx+dist/2,cy,R);
  }
  if(v===6){
    // X split
    const l=f*.42;
    return Ln(cx-l,cy-l,cx+l,cy+l)+Ln(cx+l,cy-l,cx-l,cy+l)+Ci(cx,cy,f*(.08+T.ratio*.06));
  }
  // v===7: plus/minus split
  const aL=f*(.36+T.ratio*.12);
  return Ci(cx,cy,f*(.3+T.ratio*.1))+Ln(cx-aL,cy,cx+aL,cy)+Ln(cx,cy-aL,cx,cy+aL);
},

/* 23 — CONCENTRIC-ARCS-PARTIAL */
(S,r,T)=>{
  const cx=S/2,cy=S/2,pad=S*.1,R=S/2-pad,v=T.variant;
  const n=2+T.n2%5;
  if(v<4){
    // arcs from different starting angles
    const baseA=T.phase,gapStep=(.05+T.ratio*.2)*π;
    let o='';
    for(let i=0;i<n;i++){
      const t=(i+1)/(n+.5),rr=R*(1-Math.pow(1-t,1.5));
      const rot=baseA+i*gapStep,span=π*(.55+T.ratio*(v<2?1.3:.7));
      const gap=(.04+T.ratio*.14)*(2-t);
      o+=Ar(cx,cy,rr,rot+gap/2,span-gap,v===1?sD():sR());
    }
    return o+(T.alt?Dt(cx,cy,SW*1.1):'');
  }
  if(v<6){
    // rotating offset arcs
    let o='';
    for(let i=0;i<n;i++){
      const rr=R*(.22+i*(.7/n)),rot=T.phase+i*π/3,span=π*(.8+T.ratio*.5);
      o+=Ar(cx,cy,rr,rot,span,sR());
    }
    return o;
  }
  // v 6-7: sector ring
  const gap=(.06+T.ratio*.18)*τ/n,base=T.phase-π/2;
  const r1=R*(.32+T.ratio*.22),r2=R*(.7+T.ratio*.26);
  let o='';
  for(let i=0;i<n;i++){const op=T.alt?Math.pow(T.decay,i)*.65+.35:1;o+=Sec(cx,cy,r1,r2,base+i*τ/n+gap/2,τ/n-gap,op);}
  return o+(T.sub?Dt(cx,cy,SW*1.1):'');
},

/* 24 — HATCHED-POLYGON */
(S,r,T)=>{
  const pad=S*.1,f=S-pad*2,cx=S/2,cy=S/2,R=f/2*(.68+T.ratio*.24),v=T.variant;
  const sides=3+T.variant%5+(T.n2%3),rot=T.phase/sides-π/2;
  const ngon=(n,rad,rt)=>Array.from({length:n},(_,i)=>[cx+Math.cos(rt+i*τ/n)*rad,cy+Math.sin(rt+i*τ/n)*rad]);
  const pts=ngon(sides,R,rot);
  const id=`hpoly${T.h&0xffff}`;
  let o=`<clipPath id="${id}">${Po(pts,true,`fill="black"`)}</clipPath>`;
  // hatching inside
  const n=6+T.n%6,angle=T.angle;
  o+=`<g clip-path="url(#${id})">`;
  for(let i=-n;i<n*2;i++){const x=cx-f+i*f/n;o+=`<line x1="${f3(x)}" y1="${pad}" x2="${f3(x+f*Math.tan(angle))}" y2="${f3(S-pad)}" stroke="${INK}" stroke-width="${f3(SW*.45)}" stroke-linecap="${CAP}"/>`;}
  o+='</g>';
  return o+Po(pts,true,sS());
},

/* 25 — RADAR-COMPASS */
(S,r,T)=>{
  const cx=S/2,cy=S/2,pad=S*.1,R=S/2-pad,v=T.variant;
  const n=4+T.n%6;
  if(v<3){
    // radar chart
    const rings=2+T.n2%3;
    let o='';
    for(let ri=0;ri<rings;ri++){
      const rr=R*(ri+1)/rings;
      const pts=Array.from({length:n},(_,i)=>[cx+Math.cos(T.phase+i*τ/n)*rr,cy+Math.sin(T.phase+i*τ/n)*rr]);
      o+=Po(pts,true,v===0?sS():sD());
    }
    for(let i=0;i<n;i++) o+=Ln(cx,cy,cx+Math.cos(T.phase+i*τ/n)*R,cy+Math.sin(T.phase+i*τ/n)*R);
    if(v===2){
      // data shape
      const vals=Array.from({length:n},(_,i)=>R*(.3+((T.h>>(i*4))&0xf)/15*.68));
      const dpts=vals.map((v2,i)=>[cx+Math.cos(T.phase+i*τ/n)*v2,cy+Math.sin(T.phase+i*τ/n)*v2]);
      o+=Po(dpts,true,`${fF(.3)} stroke="${INK}" stroke-width="${f3(SW*.6)}" stroke-linejoin="round"`);
    }
    return o;
  }
  // v 3-7: compass variants
  const primary=R*(.42+T.ratio*.06),secondary=primary*(.6+T.ratio*.2),base=T.phase;
  let o='';
  for(let i=0;i<n;i++){
    const a=base+i*τ/n,isPrimary=i%2===0,len=isPrimary?primary:secondary;
    const w=isPrimary?SW:SW*.6;
    o+=`<line x1="${f3(cx)}" y1="${f3(cy)}" x2="${f3(cx+Math.cos(a)*len)}" y2="${f3(cy+Math.sin(a)*len)}" stroke="${INK}" stroke-width="${f3(w)}" stroke-linecap="${CAP}"/>`;
  }
  if(v===4) o+=Ci(cx,cy,R*.55);
  if(v===5) o+=Ci(cx,cy,R*.32)+Ci(cx,cy,R*.72);
  return o+Dt(cx,cy,SW*1.2);
},

/* 26 — FUNNEL-FILTER */
(S,r,T)=>{
  const pad=S*.1,f=S-pad*2,cx=S/2,cy=S/2,v=T.variant;
  if(v<4){
    const topW=f*(.72+T.ratio*.18),botW=f*(.18+T.ratio*.28);
    const top=cy-f*(.28+T.ratio*.1),bot=cy+f*(.22+T.ratio*.1);
    let o=Po([[cx-topW/2,top],[cx+topW/2,top],[cx+botW/2,bot],[cx-botW/2,bot]],true,sS());
    if(v===1){const aH=f*.09;o+=Ln(cx,bot,cx,S-pad-aH*1.1)+arrowHead(cx,S-pad,π/2,aH);}
    if(v===2) o+=Ln(cx-topW*.4,top+f*.08,cx+topW*.4,top+f*.08)+Ln(cx-topW*.3,top+f*.18,cx+topW*.3,top+f*.18);
    if(v===3){
      const fillH=(bot-top)*T.ratio*.7;
      o+=RF(cx-botW/2+(cx-topW/2-cx+botW/2)*((bot-top-fillH)/(bot-top)),bot-fillH,(topW-botW)*fillH/(bot-top)+botW,fillH,.88);
    }
    return o;
  }
  if(v<6){
    // layered filter stages
    const n=2+T.n2%3,stageH=f*.18;
    let o='';
    for(let i=0;i<n;i++){
      const y=pad+f*.1+i*(stageH+f*.06),w2=f*(.8-i*.2);
      o+=Re(cx-w2/2,y,w2,stageH);
      const slits=3+i;
      for(let s=0;s<slits;s++) o+=Ln(cx-w2/2+s*w2/slits+w2/(slits*2),y+stageH*.2,cx-w2/2+s*w2/slits+w2/(slits*2),y+stageH*.8);
    }
    return o;
  }
  // v 6-7: hourglass
  const topW2=f*(.68+T.ratio*.2),midW=f*(.08+T.ratio*.1);
  const top2=pad+f*.1,bot2=S-pad-f*.1,mid2=(top2+bot2)/2;
  return Po([[cx-topW2/2,top2],[cx+topW2/2,top2],[cx+midW/2,mid2],[cx+topW2/2,bot2],[cx-topW2/2,bot2],[cx-midW/2,mid2]],true,sS());
},

/* 27 — SCAN-DETECT */
(S,r,T)=>{
  const pad=S*.1,f=S-pad*2,cx=S/2,cy=S/2,v=T.variant;
  if(v<3){
    // magnifier
    const mR=f*(.24+T.ratio*.06),mOff=f*(.1+T.ratio*.1);
    const mCx=cx-(v===0?mOff:0),mCy=cy-(v===0?mOff:0);
    let o=Ci(mCx,mCy,mR);
    const ha=π*.7,hL=f*(.24+T.ratio*.06);
    o+=Ln(mCx+Math.cos(ha)*mR,mCy+Math.sin(ha)*mR,mCx+Math.cos(ha)*(mR+hL),mCy+Math.sin(ha)*(mR+hL),`${sS()} stroke-width="${f3(SW*1.3)}"`);
    if(v===1){const lx=cx+mOff*.3,lT=cy-f*.24;[0,.16,.3].forEach(t=>o+=Ln(lx,lT+f*t,lx+f*(.2+T.ratio*.16),lT+f*t));}
    if(v===2) o+=Ci(mCx,mCy,mR*.5,sD());
    return o;
  }
  if(v<6){
    // radar scan
    const R=f*(.36+T.ratio*.1),n=2+T.n2%3;
    let o='';
    for(let i=0;i<n;i++) o+=Ci(cx,cy,R*(i+1)/(n+.5));
    o+=Ln(cx,cy,cx+Math.cos(T.phase)*R*.95,cy+Math.sin(T.phase)*R*.95,`${sS()} stroke-width="${f3(SW*1.2)}"`);
    o+=Dt(cx+Math.cos(T.phase+(.3+T.ratio*.4))*R*(.4+T.ratio*.4),cy+Math.sin(T.phase+(.3+T.ratio*.4))*R*(.4+T.ratio*.4),SW*1.0);
    return o+Dt(cx,cy,SW*.9);
  }
  // v 6-7: corner brackets (scan frame)
  const bL=f*(.22+T.ratio*.12),bT=f*.06;
  const corners2=[[pad,pad],[S-pad,pad],[S-pad,S-pad],[pad,S-pad]];
  const dirs2=[[1,1],[-1,1],[-1,-1],[1,-1]];
  let o='';
  corners2.forEach(([x,y],ci)=>{const [dx,dy]=dirs2[ci];o+=Ln(x,y,x+dx*bL,y)+Ln(x,y,x,y+dy*bL);});
  if(v===7) o+=Dt(cx,cy,SW*1.2)+Ci(cx,cy,f*(.18+T.ratio*.14),sD());
  return o;
},

/* 28 — CLOCK-TIME */
(S,r,T)=>{
  const pad=S*.1,f=S-pad*2,cx=S/2,cy=S/2,R=f*(.36+T.ratio*.08),v=T.variant;
  let o=Ci(cx,cy,R);
  if(v<4){
    const n=v<2?12:4,len=v===0||v===2?f*.1:f*.07;
    for(let i=0;i<n;i++){const a=i*τ/n-π/2;o+=Ln(cx+Math.cos(a)*(R-len),cy+Math.sin(a)*(R-len),cx+Math.cos(a)*R,cy+Math.sin(a)*R);}
    const hA=-π/2+T.ratio*τ,mA=-π/2+T.phase;
    o+=Ln(cx,cy,cx+Math.cos(hA)*R*.48,cy+Math.sin(hA)*R*.48,`${sR()} stroke-width="${f3(SW*1.3)}"`);
    o+=Ln(cx,cy,cx+Math.cos(mA)*R*.7,cy+Math.sin(mA)*R*.7,sR());
    if(v===1||v===3){const sA=-π/2+T.phase*.3;o+=Ln(cx,cy,cx+Math.cos(sA)*R*.82,cy+Math.sin(sA)*R*.82,`${sR()} stroke-width="${f3(SW*.55)}"`); }
    return o+Dt(cx,cy,SW*.9);
  }
  if(v<6){
    // arc timer
    o=Ar(cx,cy,R,-π/2,T.ratio*τ,sR())+Ci(cx,cy,R*.22)+Dt(cx,cy,SW*.9);
    if(v===5) o+=Ci(cx,cy,R,sD());
    return o;
  }
  // v 6-7: hourglass time
  const hW=f*(.42+T.ratio*.16),hH=f*(.72+T.ratio*.12);
  const hx=cx-hW/2,hy=cy-hH/2,midW=hW*.08;
  let o2=Po([[hx,hy],[hx+hW,hy],[cx+midW/2,cy],[hx+hW,hy+hH],[hx,hy+hH],[cx-midW/2,cy]],true,sS());
  if(v===7){const fillH=(cy-hy)*T.ratio*.88;o2+=RF(cx-midW/2-(fillH/(cy-hy))*(hW/2-midW/2),cy-fillH,(midW+(fillH/(cy-hy))*(hW-midW)),fillH,.88);}
  return o2;
},

/* 29 — MODULAR-COMPOSITION */
(S,r,T)=>{
  const pad=S*.1,f=S-pad*2,cx=S/2,cy=S/2,v=T.variant;
  // This composer creates complex compositions from simple primitives
  // variant determines the overall structural metaphor
  if(v===0){
    // stack of heterogeneous shapes
    const items=[()=>Re(cx-f*.3,cy-f*.36,f*.6,f*.2),()=>Ci(cx,cy-f*.04,f*.14),()=>Re(cx-f*.22,cy+f*.12,f*.44,f*.2)];
    return items.map(fn=>fn()).join('');
  }
  if(v===1){
    // node graph small
    const pts=[[cx-f*.28,cy-f*.18],[cx+f*.12,cy-f*.28],[cx+f*.32,cy+f*.08],[cx-f*.08,cy+f*.28],[cx-f*.3,cy+f*.08]];
    let o='';
    pts.forEach((p,i)=>pts.forEach((q,j)=>{if(j>i&&(T.h>>(i*j%16))&1)o+=Ln(p[0],p[1],q[0],q[1]);}));
    pts.forEach(([x,y])=>o+=Ci(x,y,f*.055));
    return o;
  }
  if(v===2){
    // overlapping circles (venn-like)
    const n=2+T.n2%3,R2=f*(.2+T.ratio*.12);
    let o='';
    for(let i=0;i<n;i++){const a=i*τ/n+T.phase,d=R2*(.65+T.ratio*.3);o+=Ci(cx+Math.cos(a)*d,cy+Math.sin(a)*d,R2);}
    return o;
  }
  if(v===3){
    // interlocked rectangles
    const w=f*(.42+T.ratio*.14),h=f*(.42+T.ratio*.14),off=f*(.12+T.ratio*.1);
    return Re(cx-w/2-off,cy-h/2-off,w,h)+Re(cx-w/2+off,cy-h/2+off,w,h);
  }
  if(v===4){
    // three-layer hierarchy
    const widths=[f*.88,f*.64,f*.38],heights=[f*.14,f*.14,f*.14],gap=f*.06;
    const startY=cy-heights[0]-heights[1]/2-gap;
    return widths.map((w2,i)=>Re(cx-w2/2,startY+i*(heights[0]+gap),w2,heights[i])).join('');
  }
  if(v===5){
    // circuit layout
    let o='';
    const nodes=[[pad+f*.12,cy],[cx,pad+f*.12],[S-pad-f*.12,cy],[cx,S-pad-f*.12]];
    nodes.forEach(([x,y],i)=>{o+=Re(x-f*.05,y-f*.05,f*.1,f*.1);if(i<nodes.length-1){const [nx,ny]=nodes[(i+1)%nodes.length];o+=Ln(x,y,nx,ny);}});
    o+=Dt(cx,cy,SW*1.2);
    return o;
  }
  if(v===6){
    // small multiples
    const n=3,bS=f*.22;
    let o='';
    for(let i=0;i<n;i++){const x=pad+f*.12+i*(bS+f*.06);o+=Ci(x+bS/2,cy-f*.08,bS/2)+Re(x,cy+f*.06,bS,bS*.7);}
    return o;
  }
  // v===7: abstract composition
  return Ci(cx-f*.14,cy-f*.1,f*.2)+Re(cx+f*.04,cy-f*.22,f*.24,f*.44)+Ln(pad,cy+f*.16,S-pad,cy+f*.16);
},

/* 30 — DIVERGE-CONVERGE */
(S,r,T)=>{
  const pad=S*.1,f=S-pad*2,cx=S/2,cy=S/2,v=T.variant;
  const aH=f*(.08+T.ratio*.07);
  if(v<2){
    // fork: one to many
    const n=2+T.n2%4,stem=f*.24,branchL=f*(.2+T.ratio*.2),spread=(.28+T.ratio*.45);
    const rootX=cx,rootY=v===0?cy+stem:cy-stem,baseY=v===0?cy-stem*.5:cy+stem*.5;
    let o=Ln(rootX,rootY,rootX,baseY);
    for(let i=0;i<n;i++){const a=-π/2+(i-(n-1)/2)*spread*(v===0?1:-1),ex=rootX+Math.cos(a)*branchL,ey=baseY+Math.sin(a)*branchL;o+=Ln(rootX,baseY,ex-Math.cos(a)*aH*1.2,ey-Math.sin(a)*aH*1.2)+arrowHead(ex,ey,a,aH);}
    return o+Dt(rootX,rootY,SW*1.1);
  }
  if(v===2){
    // merge: many to one
    const n=2+T.n2%4,R=f*(.32+T.ratio*.12);
    let o='';
    for(let i=0;i<n;i++){const a=T.phase+i*τ/n,sx=cx+Math.cos(a)*R,sy=cy+Math.sin(a)*R;o+=Ln(sx,sy,cx+Math.cos(a)*aH*1.5,cy+Math.sin(a)*aH*1.5)+arrowHead(cx,cy,a+π,aH);}
    return o+Dt(cx,cy,SW*1.4);
  }
  if(v===3){
    // waterfall
    const n=3+T.n2%3,h=f*.8/(n*2);
    let o='',x=pad,y=pad+f*.12;
    for(let i=0;i<n;i++){const w2=f*.8/(i+1);o+=Ln(x,y,x+w2,y);if(i<n-1){o+=Ln(x+w2,y,x+w2,y+h*2);}y+=h*2;x+=f*.06;}
    return o;
  }
  if(v===4){
    // binary split tree
    let o='',lines=[[cx,pad+f*.08,f*.52]];
    for(let d=0;d<2+T.mode%2;d++){
      const next=[];
      lines.forEach(([x,y,sp])=>{const ny=y+f*.25,lx=x-sp/2,rx=x+sp/2;o+=Ln(x,y,lx,ny)+Ln(x,y,rx,ny);o+=Dt(lx,ny,SW*.9)+Dt(rx,ny,SW*.9);next.push([lx,ny,sp*.5],[rx,ny,sp*.5]);});
      lines=next;
    }
    return o+Dt(cx,pad+f*.08,SW*1.1);
  }
  // v 5-7: radial explode
  const n2=3+T.n%5,R=f*(.28+T.ratio*.16);
  let o='';
  for(let i=0;i<n2;i++){
    const a=T.phase+i*τ/n2,sx=cx+Math.cos(a)*R*.3,sy=cy+Math.sin(a)*R*.3;
    const ex=cx+Math.cos(a)*R,ey=cy+Math.sin(a)*R;
    o+=Ln(sx,sy,ex-Math.cos(a)*aH*1.2,ey-Math.sin(a)*aH*1.2)+arrowHead(ex,ey,a,aH);
    if(v>=6) o+=Dt(ex,ey,SW*1.0);
  }
  return o+(T.sub?Dt(cx,cy,SW*1.4):'');
},

/* 31 — MULTI-RING-ACCENT */
(S,r,T)=>{
  const cx=S/2,cy=S/2,pad=S*.1,R=S/2-pad,v=T.variant;
  if(v<3){
    // concentric with one dominant
    const n=2+T.n2%4;
    let o='';
    for(let i=0;i<n;i++){
      const rr=R*(i+1)/(n+.4);
      const attr=i===T.weight%n?`${sS()} stroke-width="${f3(SW*2)}"`:sS();
      o+=Ci(cx,cy,rr,attr);
    }
    if(v===2) o+=Ln(cx,pad,cx,S-pad,sD())+Ln(pad,cy,S-pad,cy,sD());
    return o+(T.alt?Dt(cx,cy,SW*1.1):'');
  }
  if(v<6){
    // arc segments with gaps
    const n=3+T.n%6,gap=(.06+T.ratio*.22)*τ/n,base=T.phase-π/2;
    const r1=R*(.18+T.ratio*.2),r2=R*(.88);
    let o='';
    for(let i=0;i<n;i++){
      const op=1-i*(0.55/n);
      o+=Sec(cx,cy,r1,r2,base+i*τ/n+gap/2,τ/n-gap,op);
    }
    if(v===5) o+=Ci(cx,cy,r1*.85);
    return o;
  }
  // v 6-7: complex ring system
  const layers=2+T.mode%3;
  let o='';
  for(let l=0;l<layers;l++){
    const n2=3+(l+1)*2,rr=R*(.25+(l*.6/layers));
    const gap2=(.08+T.ratio*.16)*τ/n2,base2=T.phase+l*π/n2;
    for(let i=0;i<n2;i++) o+=Ar(cx,cy,rr,base2+i*τ/n2+gap2/2,τ/n2-gap2,v===7?sD():sR());
  }
  return o+(T.alt?Dt(cx,cy,SW*1.1):'');
},

  ];
}

export const PICTOGRAMAS = dibujosPictograma(1, '', '', '', '').length;

// The drawings a name may get. As an icon, two are left out: the scatter with its trend (12) and the hatching (21)
// fill in at 24 px.
function dibujosComoIcono(icono) { return Array.from({ length: PICTOGRAMAS }, (_, n) => n).filter((n) => !icono || (n !== 12 && n !== 21)); }

// The pictograms of a list of things that sit together (the chapters of a book, the tags of a project): each name gets
// its own drawing, and no two share one while there are drawings left. A name keeps the drawing its own hash asks for
// unless an earlier name of the list took it; then it takes the next free one. The same list gives the same icons.
export function pictogramasDe(G, claves, o = {}) { const cuales = dibujosDe(G, claves, o); return claves.map((clave, n) => pictograma(G, clave, { ...o, dibujo: cuales[n] })); }
// The same deal, as the number of the drawing each name gets (what the Pictogram component takes as `drawing`).
export function dibujosDe(G, claves, o = {}) {
  const cuales = dibujosComoIcono(o.modo === 'icono'), usados = new Set();
  return claves.map((clave) => {
    let p = hash(`dibujo|${G.semilla}|${String(clave).trim().toLowerCase()}`) % cuales.length;
    for (let n = 0; n < cuales.length && usados.has(cuales[p]); n++) p = (p + 1) % cuales.length;
    usados.add(cuales[p]);
    return cuales[p];
  });
}

// A pictogram for a key (any word). The same entity and the same word always give the same pictogram.
// `modo` "icono" (what the user chose on 2026-10-02) is a small icon to tell things apart: drawn on Carbon's grid of 32
// with a stroke near Carbon's 2, no ground, and `currentColor` as its ink, so it takes the color of the text around it
// and any of ALMA's icon sizes. Its counts are kept low (a concept's traits ask for up to 14 spokes or bars, which
// clog at 16 px). The other modes are one ink on one ground, at 96: "pieza" is ink ground with light lines and "fondo"
// the page color with the text color of the theme. Decorative unless `nombre` is given.
// Of the entity it only needs `semilla`, `trazo` (1 = the base stroke) and `redondez` (0 = straight corners), plus its
// `pieza` and `fondo` colors for the two modes with a ground.
export function pictograma(G, clave, o = {}) {
  const P = trazosPictograma(G, clave, o), marca = o.nombre ? `role="img" aria-label="${String(o.nombre).replace(/[&<>"]/g, '')}"` : 'aria-hidden="true"';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${P.lado} ${P.lado}" ${marca}>` + (P.fondo ? `<rect width="${P.lado}" height="${P.lado}" fill="${P.fondo}"/>` : '') + P.trazos + '</svg>';
}
// The same pictogram in parts: `dibujo` the number of its drawing, `lado` the side of its grid, `trazos` its shapes as
// SVG, and `fondo` its ground color (none as an icon). The Pictogram component puts `trazos` inside its own <svg>.
export function trazosPictograma(G, clave, o = {}) {
  const icono = o.modo === 'icono', S = icono ? 32 : 96, k = String(clave).trim().toLowerCase(), h = hash(`pictograma|${G.semilla}|${k}`);
  const C = icono ? { tinta: 'currentColor', base: 'none' } : o.modo === 'fondo' ? G.fondo[o.tema === 'light' ? 'light' : 'dark'] : G.pieza, recto = G.redondez === 0;
  const D = dibujosPictograma((icono ? 2 : 2.5 * S / 80) * G.trazo, C.tinta, C.base, recto ? 'square' : 'round', recto ? 'miter' : 'round');
  const cuales = dibujosComoIcono(icono);
  const i = o.dibujo ?? cuales[hash(`dibujo|${G.semilla}|${k}`) % cuales.length], T = rasgos(h);
  if (o.variante !== undefined) T.variant = o.variante;
  if (icono) { T.n = 3 + T.n % 4; T.n2 = 2 + T.n2 % 2; }
  return { dibujo: i, lado: S, trazos: D[i](S, azar(h ^ 0x9e3779b9), T), fondo: icono ? null : C.base };
}
