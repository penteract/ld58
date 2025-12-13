let spmat = new DOMMatrix().translate(-ox-w/2,-oy-h/2) // convert from canvas coordinates to logical ones (500x500)

function partToMatrix(p){
  // return new DOMMatrix().translate(-ox-w/2,-oy-h/2) .translate(ox+(p.x-p.w/2)*h,oy+(p.y-p.h/2)*w).scale(p.w,p.h).rotate(p.rot).translate(ox+w/2,oy+h/2)
  //
  let m = spmat.inverse().translate((p.x-1/2)*h,(p.y-1/2)*w).rotate(p.rot).scale(p.w,p.h).multiply(spmat)
  //.translate(-ox-w/2,-oy-h/2)
  //  return new DOMMatrix().translate((p.x-p.w/2)*h,(p.y-p.h/2)*w).scale(p.w,p.h).rotate(p.rot)
  return m
}

// how much detail should be used to track the sets
let MaxSearchDepth = 8;

// Draw a fractal described by parts onto canvas with context ctx using n iterations and
// returning a 2d segment tree describing the set of visited points if count is true
function drawFractalAt(parts,ctx,n,count){
  if (parts.length<1) return;
  let mats = parts.map(partToMatrix)
  let ptsz = Math.sqrt(w*h/n)
  //ptsz*ptsz*n=w*h
  let p = {x:ox+w/2,y:oy+h/2}
  let containers
  if(count){
    containers = []
    for(let i=0;i<=Math.min(MaxSearchDepth,Math.log2(n));i++){
      let l=[]
      for(let x=0;x<(1<<i);x++)
        l.push(new Array(1<<i).fill(0))
      containers.push(l)
    }
  }
  let rtn = Math.sqrt(n)
  let mxs = {x:-Infinity,y:-Infinity}
  let mns = {x:Infinity,y:Infinity}
  for(let i=0;i<100;i++){
    p = mats[(Math.random()*mats.length)|0].transformPoint(p)
  }
  for(let i=0;i<rtn;i++){
    p = mats[(Math.random()*mats.length)|0].transformPoint(p)
    for(let c of "xy"){
      if(mxs[c]<p[c])mxs[c]=p[c]
      if(mns[c]>p[c])mns[c]=p[c]
    }
  }
  for(let i=0;i<n;i++){
    p = mats[(Math.random()*mats.length)|0].transformPoint(p)
    ctx.fillRect(p.x-ptsz/2,p.y-ptsz/2,ptsz,ptsz)
    if(count){
      let x=p.x-ox
      let y=p.y-oy
      if(x>=0 && x<w && y>=0 && y<h){
        containers.map((c,i)=>c[((x*(1<<i))/w)|0 ][((y*(1<<i))/h)|0]+=1)
      }
    }
  }
  ctx.strokeRect(ox,oy,w,h)
  return containers
}


let ctx = bigPic.getContext("2d")
function drawFractal(n,count){
  bigPic.width|=0
  ctx.fillStyle="#FFF"
  ctx.strokeStyle="#FFF"

  let r = drawFractalAt(parts,ctx,n,count)
  return r
}
