// The emblems of an entity: abstract radial drawings (stars, rings, spirals, counterforms), one per concept.
// The 32 drawings are the user's own, from the "Neo-banking Icons v15" study (ejemplos/ensayo-generativo/referencias/icon_system_v15.html), kept as
// written, except three (nested_stars, hex_core, dual_star) that now also read the traits of the concept. What changed:
// no palette, background or stroke of their own (they take the entity's), the points, the
// complexity and fill-or-line come from the entity's genes instead of sliders, and randomness is the generator's.
import { hash, azar, rasgos } from './semilla.mjs';

// Each drawing: (S, r, T, pal, im, pts, cx) → SVG. S size, r seeded randomness, T traits of the concept, pal five
// colors, im "fill" or "line", pts points, cx complexity 1–5. SW is the stroke, BASE the ground, mid() a mask id.
function dibujosEmblema(SW, BASE, mkRng, mid) {
  const pi=Math.PI,tau=pi*2;
  const f2=n=>(+n).toFixed(2);
  const polar=(cx,cy,a,r)=>[cx+Math.cos(a)*r,cy+Math.sin(a)*r];
  function starPath(cx,cy,n,r1,r2,off=0){
    let d='';
    for(let i=0;i<n*2;i++){const a=tau*i/(n*2)+off;const[x,y]=polar(cx,cy,a,i%2===0?r1:r2);d+=(i?'L':'M')+f2(x)+','+f2(y);}
    return d+'Z';
  }
  function ngon(cx,cy,n,r,off=0){
    let d='';
    for(let i=0;i<n;i++){const a=tau*i/n+off;const[x,y]=polar(cx,cy,a,r);d+=(i?'L':'M')+f2(x)+','+f2(y);}
    return d+'Z';
  }
  const pickC=(pal,r)=>pal[Math.floor(r()*pal.length)];
  return [
// 00 starburst
(S,r,T,pal,im,pts,cx)=>{
  const h=S/2,R=h*.88,inner=R*(.18+T.ratio*.35);
  const c1=pickC(pal,r),c2=pickC(pal,r),c3=pickC(pal,r),lm=im==='line';
  let o=`<path d="${starPath(h,h,pts,R,inner)}" fill="${lm?'none':c1}" stroke="${lm?c1:'none'}" stroke-width="${SW}" stroke-linejoin="round"/>`;
  if(cx>2) o+=`<path d="${starPath(h,h,pts,inner*1.1,inner*.35,pi/pts)}" fill="${lm?'none':c2}" stroke="${lm?c2:'none'}" stroke-width="${SW}"/>`;
  if(cx>3) o+=`<circle cx="${h}" cy="${h}" r="${inner*.4}" fill="${c3}"/>`;
  return o;
},

// 01 asterisk — thick bars
(S,r,T,pal,im,pts,cx)=>{
  const h=S/2,R=h*.88,th=R*(.055+T.ratio*.065),lm=im==='line';
  const c2=pickC(pal,r);
  let o='';
  for(let i=0;i<pts;i++){
    const a=tau*i/pts+T.phase/pts,p2=a+pi/2;
    const [x2,y2]=polar(h,h,a,R);
    const ox=Math.cos(p2)*th,oy=Math.sin(p2)*th;
    const col=pal[i%pal.length];
    o+=`<path d="M${f2(h+ox)},${f2(h+oy)} L${f2(x2+ox)},${f2(y2+oy)} L${f2(x2-ox)},${f2(y2-oy)} L${f2(h-ox)},${f2(h-oy)}Z" fill="${lm?'none':col}" stroke="${lm?col:'none'}" stroke-width="${SW}"/>`;
  }
  if(cx>2) o+=`<circle cx="${h}" cy="${h}" r="${th*2.2}" fill="${c2}"/>`;
  return o;
},

// 02 ring_dots
(S,r,T,pal,im,pts,cx)=>{
  const h=S/2,R=h*.88,rings=Math.min(cx,3),lm=im==='line';
  let o='';
  for(let ri=0;ri<rings;ri++){
    const rad=R*(.28+ri*.26),n=pts+ri*2,dotR=R*(.058-ri*.008);
    for(let i=0;i<n;i++){
      const a=tau*i/n+T.phase;const[x,y]=polar(h,h,a,rad);
      const col=pal[ri%pal.length];
      o+=`<circle cx="${f2(x)}" cy="${f2(y)}" r="${f2(dotR)}" fill="${lm?'none':col}" stroke="${lm?col:'none'}" stroke-width="${SW}"/>`;
    }
  }
  if(cx>3) o+=`<circle cx="${h}" cy="${h}" r="${R*.1}" fill="${pal[2]}"/>`;
  return o;
},

// 03 spiral
(S,r,T,pal,im,pts,cx)=>{
  const h=S/2,R=h*.9,turns=1.4+cx*.45,steps=pts*cx*4;
  const c1=pal[0],c2=pal[2];
  const mkS=(ph)=>{let d=`M${h},${h}`;for(let i=1;i<=steps;i++){const t=i/steps,a=t*tau*turns+ph,rad=t*R;const[x,y]=polar(h,h,a,rad);d+=`L${f2(x)},${f2(y)}`;}return d;};
  let o=`<path d="${mkS(T.phase)}" fill="none" stroke="${c1}" stroke-width="${SW}" stroke-linecap="round"/>`;
  if(cx>2) o+=`<path d="${mkS(T.phase+pi)}" fill="none" stroke="${c2}" stroke-width="${SW*.8}" stroke-linecap="round"/>`;
  return o;
},

// 04 radial_lines
(S,r,T,pal,im,pts,cx)=>{
  const h=S/2,R=h*.9,n=pts*cx;
  let o='';
  for(let i=0;i<n;i++){
    const a=tau*i/n+T.phase/n;
    const[x1,y1]=polar(h,h,a,R*(.12+T.ratio*.2));
    const[x2,y2]=polar(h,h,a,R*(.62+T.ratio*.35));
    o+=`<line x1="${f2(x1)}" y1="${f2(y1)}" x2="${f2(x2)}" y2="${f2(y2)}" stroke="${pal[i%pal.length]}" stroke-width="${SW}" stroke-linecap="round"/>`;
  }
  return o;
},

// 05 cross_burst — alternating long/short
(S,r,T,pal,im,pts,cx)=>{
  const h=S/2,R=h*.9,lm=im==='line',c1=pickC(pal,r),c2=pickC(pal,r);
  let o='';
  for(let i=0;i<pts*2;i++){
    const a=tau*i/(pts*2)+T.phase,long=i%2===0;
    const rr=long?R*.9:R*.52,th=R*(.06+T.ratio*.06)*(long?1:.65);
    const p2=a+pi/2,ox=Math.cos(p2)*th,oy=Math.sin(p2)*th;
    const[x2,y2]=polar(h,h,a,rr),col=long?c1:c2;
    o+=`<path d="M${f2(h+ox)},${f2(h+oy)} L${f2(x2+ox)},${f2(y2+oy)} L${f2(x2-ox)},${f2(y2-oy)} L${f2(h-ox)},${f2(h-oy)}Z" fill="${lm?'none':col}" stroke="${lm?col:'none'}" stroke-width="${SW}"/>`;
  }
  o+=`<circle cx="${h}" cy="${h}" r="${R*(.1+T.ratio*.08)}" fill="${pal[4]}" stroke="none"/>`;
  return o;
},

// 06 nested_stars
(S,r,T,pal,im,pts,cx)=>{
  // (the concept's traits set the depth of the points, the turn and the inner color: in v15 only the sliders did)
  const h=S/2,R=h*.88,inner=R*(.24+T.ratio*.22),lm=im==='line',off=T.phase/pts,c2=pal[T.alt?1:2];
  let o=`<path d="${starPath(h,h,pts,R*.9,inner,off)}" fill="${lm?'none':pal[0]}" stroke="${lm?pal[0]:'none'}" stroke-width="${SW}" stroke-linejoin="round"/>`;
  o+=`<path d="${starPath(h,h,pts,inner*1.15,inner*.32,off+pi/pts)}" fill="${lm?'none':c2}" stroke="${lm?c2:'none'}" stroke-width="${SW}" stroke-linejoin="round"/>`;
  if(cx>2) o+=`<circle cx="${h}" cy="${h}" r="${R*.09}" fill="${pal[4]}"/>`;
  return o;
},

// 07 orbital
(S,r,T,pal,im,pts,cx)=>{
  const h=S/2,R=h*.85,tilt=T.angle*180/pi;
  const rx=R*(.62+T.ratio*.28),ry=rx*(.22+T.ratio*.28);
  const sa=T.phase,sx=h+rx*Math.cos(sa)*Math.cos(T.angle)-ry*Math.sin(sa)*Math.sin(T.angle);
  const sy=h+rx*Math.cos(sa)*Math.sin(T.angle)+ry*Math.sin(sa)*Math.cos(T.angle);
  let o='';
  const nn=cx>3?2:1;
  for(let i=0;i<nn;i++) o+=`<ellipse cx="${h}" cy="${h}" rx="${f2(rx*(1-i*.28))}" ry="${f2(ry*(1-i*.28))}" transform="rotate(${f2(tilt+i*25)} ${h} ${h})" fill="none" stroke="${pal[i*2]}" stroke-width="${SW}"/>`;
  o+=`<circle cx="${h}" cy="${h}" r="${R*(.1+T.ratio*.07)}" fill="${pal[0]}"/>`;
  o+=`<circle cx="${f2(sx)}" cy="${f2(sy)}" r="${R*(.045+T.ratio*.04)}" fill="${pal[3]}"/>`;
  return o;
},

// 08 arc_flower
(S,r,T,pal,im,pts,cx)=>{
  const h=S/2,R=h*.85,pR=R*(.42+T.ratio*.22),lm=im==='line';
  let o='';
  for(let i=0;i<pts;i++){
    const a=tau*i/pts+T.phase;
    const[pcx,pcy]=polar(h,h,a,pR*.7),col=pal[i%pal.length];
    o+=`<ellipse cx="${f2(pcx)}" cy="${f2(pcy)}" rx="${f2(pR*.45)}" ry="${f2(pR*.28)}" transform="rotate(${f2(a*180/pi+90)} ${f2(pcx)} ${f2(pcy)})" fill="${lm?'none':col}" stroke="${lm?col:'none'}" stroke-width="${SW}" opacity="${.75+T.ratio*.2}"/>`;
  }
  o+=`<circle cx="${h}" cy="${h}" r="${R*.14}" fill="${pal[2]}"/>`;
  return o;
},

// 09 thorn
(S,r,T,pal,im,pts,cx)=>{
  const h=S/2,R=h*.88,n=pts*2,lm=im==='line';
  let d='';
  for(let i=0;i<n;i++){
    const a=tau*i/n+T.phase/n,t=i%3;
    const rad=t===0?R*.92:t===1?R*(.38+T.ratio*.2):R*(.62+T.ratio*.18);
    const[x,y]=polar(h,h,a,rad);d+=(i?'L':'M')+f2(x)+','+f2(y);
  }
  return`<path d="${d}Z" fill="${lm?'none':pal[0]}" stroke="${lm?pal[0]:pal[3]}" stroke-width="${SW}" stroke-linejoin="round"/>`;
},

// 10 lens_burst
(S,r,T,pal,im,pts,cx)=>{
  const h=S/2,R=h*.88,n=Math.min(cx,4);
  let o='';
  for(let i=0;i<n;i++){
    const rr=R*(.28+i*.2),span=pi*(.6+T.ratio*.9),base=T.phase+i*.22;
    const gap=.06+T.ratio*.1,a0=base+gap,a1=base+span-gap;
    const[sx,sy]=polar(h,h,a0,rr),[ex,ey]=polar(h,h,a1,rr);
    const lg=span>pi?1:0;
    o+=`<path d="M${f2(sx)} ${f2(sy)} A${f2(rr)} ${f2(rr)} 0 ${lg} 1 ${f2(ex)} ${f2(ey)}" fill="none" stroke="${pal[i%pal.length]}" stroke-width="${SW}" stroke-linecap="round"/>`;
  }
  for(let i=0;i<pts;i++){
    const a=tau*i/pts+T.phase;
    const[x1,y1]=polar(h,h,a,R*.15),[x2,y2]=polar(h,h,a,R*.88);
    o+=`<line x1="${f2(x1)}" y1="${f2(y1)}" x2="${f2(x2)}" y2="${f2(y2)}" stroke="${pal[i%pal.length]}" stroke-width="${SW*.5}" stroke-linecap="round" opacity=".5"/>`;
  }
  return o;
},

// 11 hex_core
(S,r,T,pal,im,pts,cx)=>{
  // (the concept's traits set which way the hexagon points, the step between layers and the order of the colors)
  const h=S/2,R=h*.9,layers=Math.min(cx,4),lm=im==='line',rot=T.flip?0:pi/6,step=.2+T.ratio*.08,c0=T.variant%4;
  let o='';
  for(let l=layers-1;l>=0;l--){
    const hexR=R*(.95-l*step),col=pal[(l+c0)%4];
    o+=`<path d="${ngon(h,h,6,hexR,rot)}" fill="${lm?'none':col}" stroke="${lm?col:(l>0?pal[4]:'none')}" stroke-width="${lm?SW:SW*.6}" stroke-linejoin="round"/>`;
  }
  if(cx>3){for(let i=0;i<6;i++){const a=pi/3*i+rot;const[x,y]=polar(h,h,a,R*(.95-step*1.55));o+=`<circle cx="${f2(x)}" cy="${f2(y)}" r="${R*.06}" fill="${pal[(c0+2)%4]}"/>`;}}
  return o;
},

// 12 feather_radial
(S,r,T,pal,im,pts,cx)=>{
  const h=S/2,R=h*.88,r2=mkRng(T.h^0xabcd);
  let o='';
  for(let i=0;i<pts;i++){
    const a=tau*i/pts+T.phase,barbN=cx+2,col=pal[i%2===0?0:2];
    for(let j=0;j<barbN;j++){
      const t=j/barbN,bR=R*.14+t*(R*.82-R*.14);
      const[bx,by]=polar(h,h,a,bR),bLen=R*(.07+r2.f(0,.05))*(1-t*.5),ba=a+pi/2;
      o+=`<line x1="${f2(bx)}" y1="${f2(by)}" x2="${f2(bx+Math.cos(ba)*bLen)}" y2="${f2(by+Math.sin(ba)*bLen)}" stroke="${col}" stroke-width="${SW*.7}"/>`;
      o+=`<line x1="${f2(bx)}" y1="${f2(by)}" x2="${f2(bx-Math.cos(ba)*bLen)}" y2="${f2(by-Math.sin(ba)*bLen)}" stroke="${col}" stroke-width="${SW*.7}"/>`;
    }
    const[tx,ty]=polar(h,h,a,R*.88);
    o+=`<line x1="${h}" y1="${h}" x2="${f2(tx)}" y2="${f2(ty)}" stroke="${col}" stroke-width="${SW*.9}" stroke-linecap="round"/>`;
  }
  return o;
},

// 13 dot_ring
(S,r,T,pal,im,pts,cx)=>{
  const h=S/2,R=h*.88,n=pts*cx,lm=im==='line',r2=mkRng(T.h^0x1234);
  let o='';
  for(let i=0;i<n;i++){
    const a=tau*i/n+T.phase,vary=r2.f(-.1,.1);
    const[x,y]=polar(h,h,a,R*(.7+vary)),sz=R*(.042+r2.f(0,.055));
    const col=pal[Math.floor(r2()*pal.length)];
    o+=`<circle cx="${f2(x)}" cy="${f2(y)}" r="${f2(sz)}" fill="${lm?'none':col}" stroke="${lm?col:'none'}" stroke-width="${SW}"/>`;
  }
  if(cx>2) o+=`<circle cx="${h}" cy="${h}" r="${R*.14}" fill="${pal[0]}"/>`;
  return o;
},

// 14 arrow_star
(S,r,T,pal,im,pts,cx)=>{
  const h=S/2,R=h*.9,lm=im==='line';
  let o='';
  for(let i=0;i<pts;i++){
    const a=tau*i/pts+T.phase;
    const[tx,ty]=polar(h,h,a,R*.88),[bx1,by1]=polar(h,h,a-.38,R*.34),[bx2,by2]=polar(h,h,a+.38,R*.34),[mx,my]=polar(h,h,a,R*.5);
    const col=pal[i%2===0?0:1];
    o+=`<path d="M${f2(bx1)},${f2(by1)} L${f2(mx)},${f2(my)} L${f2(bx2)},${f2(by2)} L${f2(tx)},${f2(ty)}Z" fill="${lm?'none':col}" stroke="${lm?col:'none'}" stroke-width="${SW}" stroke-linejoin="round"/>`;
  }
  o+=`<circle cx="${h}" cy="${h}" r="${R*.16}" fill="${pal[4]}"/>`;
  return o;
},

// 15 zig_burst
(S,r,T,pal,im,pts,cx)=>{
  const h=S/2,R=h*.9,lm=im==='line',n=pts*3;
  let d='';
  for(let i=0;i<n;i++){
    const a=tau*i/n+T.phase,t=i%3;
    const rad=t===0?R*.92:t===1?R*(.45+T.ratio*.15):R*(.68+T.ratio*.14);
    const[x,y]=polar(h,h,a,rad);d+=(i?'L':'M')+f2(x)+','+f2(y);
  }
  let o=`<path d="${d}Z" fill="${lm?'none':pal[0]}" stroke="${lm?pal[0]:pal[3]}" stroke-width="${SW}" stroke-linejoin="round"/>`;
  if(cx>2) o+=`<circle cx="${h}" cy="${h}" r="${R*.18}" fill="${lm?'none':pal[2]}" stroke="${lm?pal[2]:'none'}" stroke-width="${SW}"/>`;
  return o;
},

// 16 crystal
(S,r,T,pal,im,pts,cx)=>{
  const h=S/2,R=h*.9,mid2=R*.48,lm=im==='line';
  let o='';
  for(let i=0;i<pts;i++){
    const a1=tau*i/pts+T.phase,a2=tau*(i+1)/pts+T.phase;
    const[ox1,oy1]=polar(h,h,a1,R),[ox2,oy2]=polar(h,h,a2,R),[mx,my]=polar(h,h,(a1+a2)/2,mid2);
    const col=pal[i%pal.length],st=lm?col:pal[4];
    o+=`<path d="M${h},${h} L${f2(ox1)},${f2(oy1)} L${f2(mx)},${f2(my)}Z" fill="${lm?'none':col}" stroke="${st}" stroke-width="${SW*.5}" opacity="${.75+T.ratio*.2}"/>`;
    o+=`<path d="M${h},${h} L${f2(ox2)},${f2(oy2)} L${f2(mx)},${f2(my)}Z" fill="${lm?'none':pal[(i+2)%pal.length]}" stroke="${st}" stroke-width="${SW*.5}" opacity=".6"/>`;
  }
  return o;
},

// 17 contra_ring
(S,r,T,pal,im,pts,cx)=>{
  const h=S/2,R=h*.88,outerR=R*.9,innerR=R*.42;
  let o='';
  for(let i=0;i<pts;i++){
    const a1=tau*i/pts+T.phase,a2=tau*(i+.5)/pts+T.phase;
    const[ox,oy]=polar(h,h,a1,outerR),[ix,iy]=polar(h,h,a2,innerR);
    const col=i%2===0?pal[0]:pal[2];
    o+=`<line x1="${f2(ox)}" y1="${f2(oy)}" x2="${f2(ix)}" y2="${f2(iy)}" stroke="${col}" stroke-width="${SW}" stroke-linecap="round"/>`;
    o+=`<circle cx="${f2(ox)}" cy="${f2(oy)}" r="${R*.062}" fill="${col}"/>`;
  }
  for(let i=0;i<pts;i++){const a=tau*(i+.5)/pts+T.phase;const[ix,iy]=polar(h,h,a,innerR);o+=`<circle cx="${f2(ix)}" cy="${f2(iy)}" r="${R*.044}" fill="${pal[3]}"/>`;}
  return o;
},

// 18 dual_star
(S,r,T,pal,im,pts,cx)=>{
  // (the concept's traits set the depth of the points, the size of the second star and whether its points line up)
  const h=S/2,R=h*.88,inner=R*(.2+T.ratio*.26),lm=im==='line',off=-T.phase/pts,r2=inner*(1.05+T.decay*.5),c1=pal[T.alt?2:0],c2=pal[T.alt?0:3];
  let o=`<path d="${starPath(h,h,pts,R*.88,inner,off)}" fill="${lm?'none':c1}" stroke="${lm?c1:'none'}" stroke-width="${SW}" stroke-linejoin="round"/>`;
  o+=`<path d="${starPath(h,h,pts,r2,inner*.34,off+(T.flip?0:pi/pts))}" fill="${lm?'none':c2}" stroke="${lm?c2:'none'}" stroke-width="${SW}" stroke-linejoin="round"/>`;
  if(cx>2) o+=`<circle cx="${h}" cy="${h}" r="${R*.1}" fill="${pal[4]}"/>`;
  return o;
},

// 19 eyelet
(S,r,T,pal,im,pts,cx)=>{
  const h=S/2,R=h*.86,r2=mkRng(T.h^0x5678),lm=im==='line';
  let o='';
  for(let i=0;i<pts;i++){
    const a=tau*i/pts+T.phase,cx2=h+Math.cos(a)*R*.54,cy2=h+Math.sin(a)*R*.54;
    const er=R*(.22+r2.f(0,.1)),col=pal[i%pal.length];
    o+=`<ellipse cx="${f2(cx2)}" cy="${f2(cy2)}" rx="${f2(er)}" ry="${f2(er*.54)}" transform="rotate(${f2(a*180/pi+90)} ${f2(cx2)} ${f2(cy2)})" fill="${lm?'none':col}" stroke="${lm?col:pal[4]}" stroke-width="${SW*.8}"/>`;
  }
  o+=`<circle cx="${h}" cy="${h}" r="${R*.13}" fill="${pal[0]}" stroke="${pal[4]}" stroke-width="${SW*.8}"/>`;
  return o;
},

// 20 CONTRA: radial slots cut from disc
(S,r,T,pal,im,pts,cx)=>{
  const h=S/2,R=h*.88,id=mid(),n=pts,slotW=(tau/n)*(.32+T.ratio*.36);
  const r0=R*(.08+T.ratio*.1),col=pickC(pal,r);
  let mask=`<mask id="${id}"><rect width="${S}" height="${S}" fill="white"/>`;
  for(let i=0;i<n;i++){
    const a=tau*i/n+T.phase,a0=a-slotW/2,a1=a+slotW/2;
    const[ox0,oy0]=polar(h,h,a0,R),[ox1,oy1]=polar(h,h,a1,R);
    const[ix0,iy0]=polar(h,h,a0,r0),[ix1,iy1]=polar(h,h,a1,r0);
    mask+=`<path d="M${f2(ix0)},${f2(iy0)} L${f2(ox0)},${f2(oy0)} A${f2(R)},${f2(R)} 0 0 1 ${f2(ox1)},${f2(oy1)} L${f2(ix1)},${f2(iy1)} A${f2(r0)},${f2(r0)} 0 0 0 ${f2(ix0)},${f2(iy0)}Z" fill="black"/>`;
  }
  return`${mask}</mask><circle cx="${h}" cy="${h}" r="${R}" fill="${col}" mask="url(#${id})"/>`;
},

// 21 CONTRA: 4-pointed bezier star solid
(S,r,T,pal,im,pts,cx)=>{
  const h=S/2,R=h*.88,col=pickC(pal,r);
  const sp=R*(.78+T.ratio*.16),ip=R*(.1+T.ratio*.12);
  const d=`M${h},${f2(h-sp)} Q${f2(h+ip)} ${f2(h-ip)} ${f2(h+sp*(.5+T.ratio*.18))},${h} Q${f2(h+ip)} ${f2(h+ip)} ${h},${f2(h+sp)} Q${f2(h-ip)} ${f2(h+ip)} ${f2(h-sp*(.5+T.ratio*.18))},${h} Q${f2(h-ip)} ${f2(h-ip)} ${h},${f2(h-sp)}Z`;
  return`<path d="${d}" fill="${col}" stroke="none"/>`;
},

// 22 CONTRA: clean ring of dots
(S,r,T,pal,im,pts,cx)=>{
  const h=S/2,R=h*.88,n=pts*(cx>3?2:1);
  const ringR=R*(.62+T.ratio*.26),dotR=R*(.068+T.ratio*.04),col=pickC(pal,r);
  return Array.from({length:n},(_,i)=>{const a=T.phase+i*tau/n;const[x,y]=polar(h,h,a,ringR);return`<circle cx="${f2(x)}" cy="${f2(y)}" r="${f2(dotR)}" fill="${col}"/>`;}).join('');
},

// 23 CONTRA: asterisk with hexagonal core removed
(S,r,T,pal,im,pts,cx)=>{
  const h=S/2,R=h*.88,id=mid(),n=pts,th=R*(.09+T.ratio*.07),cR=R*(.18+T.ratio*.1),col=pickC(pal,r);
  let bars='';
  for(let i=0;i<n;i++){
    const a=tau*i/n+T.phase,p2=a+pi/2;
    const[x2,y2]=polar(h,h,a,R*.9),ox=Math.cos(p2)*th,oy=Math.sin(p2)*th;
    bars+=`<path d="M${f2(h+ox)},${f2(h+oy)} L${f2(x2+ox)},${f2(y2+oy)} L${f2(x2-ox)},${f2(y2-oy)} L${f2(h-ox)},${f2(h-oy)}Z" fill="${col}"/>`;
  }
  return`<mask id="${id}"><rect width="${S}" height="${S}" fill="white"/><path d="${ngon(h,h,6,cR,pi/6)}" fill="black"/></mask><g mask="url(#${id})">${bars}</g>`;
},

// 24 CONTRA: polygon evenodd ring
(S,r,T,pal,im,pts,cx)=>{
  const h=S/2,R=h*.88,col=pickC(pal,r);
  const sides=3+T.n2%5,rot=T.phase/sides-pi/2;
  const outerD=ngon(h,h,sides,R*.88,rot);
  const innerD=ngon(h,h,sides,R*(.38+T.ratio*.32),rot+(T.flip?pi/sides:0));
  return`<path d="${outerD}${innerD}" fill="${col}" fill-rule="evenodd" stroke="none"/>`;
},

// 25 CONTRA: disc with parallel slit cuts
(S,r,T,pal,im,pts,cx)=>{
  const h=S/2,R=h*.88,id=mid(),col=pickC(pal,r);
  const n=Math.max(3,pts-1),slitH=R*(.1+T.ratio*.06);
  let mask=`<mask id="${id}"><rect width="${S}" height="${S}" fill="white"/>`;
  for(let i=0;i<n;i++){
    const y=h-R*.72+i*R*1.44/(n-1);
    mask+=`<rect x="${f2(h-R*.88)}" y="${f2(y-slitH/2)}" width="${f2(R*1.76)}" height="${f2(slitH)}" fill="black"/>`;
  }
  return`${mask}</mask><circle cx="${h}" cy="${h}" r="${R*.88}" fill="${col}" mask="url(#${id})"/>`;
},

// 26 CONTRA: chain links evenodd
(S,r,T,pal,im,pts,cx)=>{
  const h=S/2,R=h*.82,col=pickC(pal,r);
  const lkR=R*(.36+T.ratio*.12),dist=lkR*(1.18+T.ratio*.28),ang=T.angle+pi/6;
  const lnk=(lx,ly)=>{const or=lkR,ir=or*(.44+T.ratio*.24);return`M${f2(lx+or)} ${f2(ly)} A${or} ${or} 0 1 0 ${f2(lx-or)} ${f2(ly)} A${or} ${or} 0 1 0 ${f2(lx+or)} ${f2(ly)} Z M${f2(lx+ir)} ${f2(ly)} A${ir} ${ir} 0 1 0 ${f2(lx-ir)} ${f2(ly)} A${ir} ${ir} 0 1 0 ${f2(lx+ir)} ${f2(ly)} Z`;};
  const l1x=h-Math.cos(ang)*dist/2,l1y=h-Math.sin(ang)*dist/2;
  const l2x=h+Math.cos(ang)*dist/2,l2y=h+Math.sin(ang)*dist/2;
  return`<path d="${lnk(l1x,l1y)}" fill="${col}" fill-rule="evenodd" stroke="none"/>
<path d="${lnk(l2x,l2y)}" fill="${col}" fill-rule="evenodd" stroke="none"/>`;
},

// 27 CONTRA: filled ring + BG-colour radial accents
(S,r,T,pal,im,pts,cx)=>{
  const h=S/2,R=h*.88,col=pickC(pal,r),acc=BASE;
  const r1=R*(.3+T.ratio*.22),r2=R*.9;
  const ringD=`M${f2(h+r2)} ${h} A${r2} ${r2} 0 1 0 ${f2(h-r2)} ${h} A${r2} ${r2} 0 1 0 ${f2(h+r2)} ${h}Z M${f2(h+r1)} ${h} A${r1} ${r1} 0 1 0 ${f2(h-r1)} ${h} A${r1} ${r1} 0 1 0 ${f2(h+r1)} ${h}Z`;
  let o=`<path d="${ringD}" fill="${col}" fill-rule="evenodd" stroke="none"/>`;
  for(let i=0;i<pts;i++){
    const a=T.phase+i*tau/pts;
    const[x1,y1]=polar(h,h,a,r2),[x2,y2]=polar(h,h,a,r1*.1);
    o+=`<line x1="${f2(x1)}" y1="${f2(y1)}" x2="${f2(x2)}" y2="${f2(y2)}" stroke="${acc}" stroke-width="${SW}" stroke-linecap="round"/>`;
  }
  return o;
},

// 28 CONTRA: 3-way Venn evenodd
(S,r,T,pal,im,pts,cx)=>{
  const h=S/2,R=h*.82,col=pickC(pal,r);
  const vR=R*(.44+T.ratio*.12),dist=vR*(.6+T.ratio*.28);
  let d='';
  for(let i=0;i<3;i++){
    const a=-pi/2+i*tau/3+T.phase;
    const[lx,ly]=polar(h,h,a,dist);
    d+=`M${f2(lx+vR)} ${f2(ly)} A${f2(vR)} ${f2(vR)} 0 1 0 ${f2(lx-vR)} ${f2(ly)} A${f2(vR)} ${f2(vR)} 0 1 0 ${f2(lx+vR)} ${f2(ly)} Z`;
  }
  return`<path d="${d}" fill="${col}" fill-rule="evenodd" stroke="none"/>`;
},

// 29 mixed orbital (filled bodies + stroke orbit)
(S,r,T,pal,im,pts,cx)=>{
  const h=S/2,R=h*.85,tilt=T.angle*180/pi;
  const rx=R*(.62+T.ratio*.26),ry=rx*(.24+T.ratio*.26);
  const sa=T.phase,col=pickC(pal,r),col2=pickC(pal,r);
  const sx=h+rx*Math.cos(sa)*Math.cos(T.angle)-ry*Math.sin(sa)*Math.sin(T.angle);
  const sy=h+rx*Math.cos(sa)*Math.sin(T.angle)+ry*Math.sin(sa)*Math.cos(T.angle);
  let o=`<ellipse cx="${h}" cy="${h}" rx="${f2(rx)}" ry="${f2(ry)}" transform="rotate(${f2(tilt)} ${h} ${h})" fill="none" stroke="${col}" stroke-width="${SW}"/>`;
  o+=`<circle cx="${h}" cy="${h}" r="${R*.1}" fill="${col}"/>`;
  o+=`<circle cx="${f2(sx)}" cy="${f2(sy)}" r="${R*.055}" fill="${col2}"/>`;
  if(cx>2){const a2=sa+pi*2/3;const sx2=h+rx*.65*Math.cos(a2)*Math.cos(T.angle)-ry*.65*Math.sin(a2)*Math.sin(T.angle);const sy2=h+rx*.65*Math.cos(a2)*Math.sin(T.angle)+ry*.65*Math.sin(a2)*Math.cos(T.angle);o+=`<circle cx="${f2(sx2)}" cy="${f2(sy2)}" r="${R*.038}" fill="${pal[3]}"/>`;}
  return o;
},

// 30 scatter dots
(S,r,T,pal,im,pts,cx)=>{
  const h=S/2,R=h*.9,n=pts*Math.max(1,cx-1),r2=mkRng(T.h^0x9abc);
  let o='';
  for(let i=0;i<n;i++){
    const a=r2()*tau,dist=Math.pow(r2(),.8)*R*.85;
    const[x,y]=polar(h,h,a,dist),sz=R*(.04+r2()*.07);
    o+=`<circle cx="${f2(x)}" cy="${f2(y)}" r="${f2(sz)}" fill="${pal[Math.floor(r2()*pal.length)]}"/>`;
  }
  return o;
},

// 31 concentric_arcs_color
(S,r,T,pal,im,pts,cx)=>{
  const h=S/2,R=h*.88,n=Math.min(cx+1,5);
  let o='';
  for(let i=0;i<n;i++){
    const t=(i+1)/(n+.4),rr=R*t,col=pal[i%pal.length];
    const gap=.06+T.ratio*.1,rot=T.phase+i*(.15+T.ratio*.2),span=tau-gap*2;
    const[sx,sy]=polar(h,h,rot+gap,rr),[ex,ey]=polar(h,h,rot+gap+span,rr);
    const laf=span>pi?1:0;
    o+=`<path d="M${f2(sx)} ${f2(sy)} A${f2(rr)} ${f2(rr)} 0 ${laf} 1 ${f2(ex)} ${f2(ey)}" fill="none" stroke="${col}" stroke-width="${SW+(i===0?SW*.5:0)}" stroke-linecap="round"/>`;
  }
  return o;
},
  ];
}

export const EMBLEMAS = dibujosEmblema(1, '', azar, () => '').length;

// An emblem for a concept (any word). The same entity and the same word always give the same emblem; `dibujo` forces
// one of the drawings. It sits on ink with the entity's piece palette; the accent is the fifth color, which the
// drawings use for centers and thin strokes, so it marks and does not fill. Decorative unless `nombre` is given.
export function emblema(G, clave, o = {}) {
  const S = 96, k = String(clave).trim().toLowerCase(), h = hash(`emblema|${G.semilla}|${k}`), C = G.pieza;
  const D = dibujosEmblema(1.5 * S / 72 * G.trazo, C.base, azar, () => 'e' + h.toString(36));
  const i = o.dibujo ?? hash(`dibujo|${G.semilla}|${k}`) % D.length;
  const marca = o.nombre ? `role="img" aria-label="${String(o.nombre).replace(/[&<>"]/g, '')}"` : 'aria-hidden="true"';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S}" ${marca}><rect width="${S}" height="${S}" fill="${C.base}"/>` +
    D[i](S, azar(h ^ 0x9e3779b9), rasgos(h), [...C.barras.slice(0, 4), C.acento], G.relleno ? 'fill' : 'line', G.puntas, G.complejidad) + '</svg>';
}
