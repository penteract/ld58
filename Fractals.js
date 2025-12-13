"use strict";

//ctx.fillRect(1,1,20,20)
//ctx.strokeRect(ox,oy,w,h)
// let p = {x:ox+w/2,y:oy+h/2}
//let ptsz=2

let targetset
function drawFractal(n,count){
  bigPic.width|=0
  ctx.fillStyle="#FFF"
  ctx.strokeStyle="#FFF"
  
  let r = drawFractalAt(parts,ctx,n,count)
  return r
}


function deletepart(p){
  let ix = parts.indexOf(p)
  if(ix==-1 || !selected){
    return
  }
  parts.splice(ix,1)
  resetParts()
}
function newpart(p){
  if(!p){
    p={x:1/2,y:1/2,w:1/2,h:1/2,rot:0}
    parts.push(p)
  }
  let n = document.createElement("div")
  n.classList.add("part")
  n.style.transform=partToMatrix(p).translate(ox,oy) // First move it into the coordinate system the matrix is expecting
  n.addEventListener("pointerdown",e=>moveAction=selectAndMovePart(p,e))
  p.div=n
  partsdiv.append(n)
}

function drawPartdivs(parts){
  partsdiv.replaceChildren()
  for(let p of parts){
    newpart(p)
  }
}

function mksvgel(tag){
  return document.createElementNS("http://www.w3.org/2000/svg",tag)
}


function hide(x){x.classList.add("hidden")}
function unhide(x){x.classList.remove("hidden")}
let cont = undefined // Shouldn't be able to click on continue button while it's hidden
function askContinue(msg, k){
  unhide(outeralert)
  alertmsg.innerHTML = msg
  cont = (arg) => {k(arg); hide(outeralert)}
}

// UI
let selected
let hist = [[JSON.stringify(copyparts(parts)), parts.indexOf(selected)]]
let histIx = 0

let moveAction=()=>{}
function drawBox(part){
  let box = mksvgel("g")
  for (let dx of [-1,0,1])for (let dy of [-1,0,1]) {
    let c = mksvgel("circle")
    part[[dx,dy]]=c
    if(dx*dy==1) c.style.cursor="nwse-resize"
    else if(dx*dy==-1){
      c.style.cursor="nesw-resize"
    }
    else if (!(dx||dy)) {
      c.style.cursor="grab"
      c.classList.add("rot")
    }
    else if (dx==0) c.style.cursor="ns-resize"
    else if (dy==0) c.style.cursor="ew-resize"
    c.addEventListener("pointerdown",()=>moveAction=chooseResize(dx,dy,part))
    box.append(c)
  }
  return box
}

function transformChanged(part,noRedrawFractal){
  let mat = partToMatrix(part)
  for (let dx of [-1,0,1])for (let dy of [-1,0,1]) {
    let c=part[[dx,dy]]
    if(c){
      if (!(dx||dy)) dy-=1.4
      let {x,y} = mat.transformPoint({x:ox+w*(1+dx)/2,y:oy+h*(1+dy)/2})
      c.setAttribute("cx",x)
      c.setAttribute("cy",y)
      c.setAttribute("r",5)
    }
  }
  part.div.style.transform = mat.translate(ox,oy)
  if(!noRedrawFractal) drawFractal(10000)
}
/*
function drawBoxes(){
  parts.map(part=>boxui.append(drawBox(part)))
}*/
function selectAndMovePart(p,e){
  selectPart(p)
  let initex=e.pageX
  let initey=e.pageY
  let original = {x:p.x,y:p.y}
  return (e)=>{
    p.x = original.x+(e.pageX-initex)/w
    p.y = original.y+(e.pageY-initey)/h
    if(snappositions.checked){
      p.x = snapTo(p.x,possnaps)
      p.y = snapTo(p.y,possnaps)
    }
    transformChanged(p)
  }
}
function selectPart(p){
  if(p && selected!==p){
    selected=p
    boxui.replaceChildren(drawBox(p))
    transformChanged(p,true)
  }
}
function deselect(){
  selected=undefined
  boxui.replaceChildren()
}
let ot = bigPic.offsetTop // for adjusting the mouse 
let ol = bigPic.offsetLeft
function chooseResize(dx,dy,part){
  // set the moveAction while the mouse is held over handles dx,dy
  if(!(dx||dy)){
    let cx = part.x*w+ox+ol
    let cy = part.y*h+oy+ot
    return (e) => {
      part.rot = Math.atan2((e.pageY-cy)*Math.sign(part.h),(e.pageX-cx)*Math.sign(part.h) )*180/Math.PI + 360+90
      if(snaprotations.checked){//(cliprot){
        part.rot-=((part.rot+7.5)%15 -7.5)
        part.rot|=0
      }
      transformChanged(part)
    }
  }
  let o = {w:part.w,h:part.h}
  //transform original into rotated coordinates
  let cmat = idmat.translate(1/2,1/2).rotate(-part.rot).translate(-1/2,-1/2)
  let cmati = cmat.inverse()
  let ro = cmat.transformPoint({x:part.x,y:part.y})

  // Transform m into unit-square (rotated) coordinates
  let unrot = idmat.scale(1/w,1/h).translate(w/2,h/2).rotate(-part.rot).translate(-w/2-ox,-h/2-oy).translate(-ol,-ot);
  return (e) => {
    let m = unrot.transformPoint({x:e.pageX,y:e.pageY})

    if(center.checked){
      //if center preserving:
      // ro.x+dx*n.w/2 = m.x
      if(dx){
        part.w = (m.x-ro.x)*2/dx
      }
      if(dy){
        part.h = (m.y-ro.y)*2/dy
      }
    }
    else{
      // if not center preserving
      // ro.x-dx*o.w/2 = n.x-dx*n.w/2
      // n.x+dx*n.w/2 = m.x (not always true when match.checked)
      if(dx){
        part.w=(m.x-ro.x+dx*o.w/2)/dx
      }
      if(dy){
        part.h=(m.y-ro.y+dy*o.h/2)/dy
      }
    }
    if(match.checked){
      if(!dx) part.w=Math.abs(part.h)*Math.sign(o.w)
      else if(!dy) part.h=Math.abs(part.w)*Math.sign(o.h)
      else {
        let delta = (part.h*Math.sign(o.h) - part.w*Math.sign(o.w)) / 2 // preserve agreement of sign
        part.h-=delta*Math.sign(o.h)
        part.w+=delta*Math.sign(o.w)
      }
    }
    if(snapsizes.checked){
      if(dx || match.checked) part.w = snapTo(part.w,sizesnaps)
      if(dy || match.checked) part.h = snapTo(part.h,sizesnaps)
    }
    if(!center.checked){
      let nx = dx?ro.x+dx*(part.w-o.w)/2:ro.x
      let ny = dy?ro.y+dy*(part.h-o.h)/2:ro.y
      /*
      // let nx=dx?(m.x+ro.x-dx*o.w/2)/2:ro.x
      // let ny=dy?(m.y+ro.y-dy*o.h/2)/2:ro.y
      nx=dx?m.x-dx*part.w/2:ro.x
      ny=dy?m.y-dy*part.h/2:ro.y
      if(delta){
        // I'm ashamed to admit that I did this bit by trial and error
        // rather than the honest way of deriving it, then bugfixing by trial and error
        nx+=dx*delta
        ny-=dy*delta
      }*/
      let {x,y}=cmati.transformPoint({x:nx,y:ny})
      part.x=x
      part.y=y // need to change both regardless of dy/dx in case of rotation
    }
    //spmat.inverse().translate((part.x-1/2)*h,(p.y-1/2)*w).rotate(part.rot).multiply(spmat);
    transformChanged(part);
  }
}

document.addEventListener("pointermove",(e)=> {moveAction(e)})
let conts
function pointerEnd(e){
  if(e.target.parentElement!=sidediv) drawCarefully()
  moveAction = ()=>{}
}
let carefulDrawCount = 100000
function drawCarefully(){
  let jparts = JSON.stringify(copyparts(parts))
  if(jparts!=hist[histIx][0]) hist.splice(++histIx, 0, [jparts,parts.indexOf(selected)])
  clearTimeout(keyboardTimeout)
  conts = drawFractal(carefulDrawCount,true)
  checkAnswer(conts)
  //console.log(calcDim(conts))
}
document.addEventListener("pointerup",pointerEnd)
document.addEventListener("pointercancel",pointerEnd)

document.addEventListener("pointerdown",(e)=>
  console.log(e,e.x,e.y)
)
let keyboardTimeout
document.addEventListener("keydown",(e)=>{
  let unhandled=undefined;
  switch(e.key){
    case "z":
      if(!e.shiftKey){
        if (e.ctrlKey && histIx>0){
          let oldlen = parts.length
          let oldIx = hist[histIx][1]
          parts = JSON.parse(hist[--histIx][0])
          let newIx = parts.length==oldlen && oldIx!=-1  ? oldIx : hist[histIx][1]
          resetParts()
          if(newIx!=-1) selectPart(parts[newIx])
          unhandled=false;
        }
        break;
      }
    case "Z":
    case "y": // Ctrl+y or Ctrl+Shift+z to redo
      if(e.ctrlKey && histIx+1<hist.length){
          parts = JSON.parse(hist[++histIx][0])
          resetParts()
          if(hist[histIx][1]!=-1) selectPart(parts[hist[histIx][1]])
          unhandled=false;
      }
  }

  if(selected){
    console.log(e)
    switch(e.key){
      case "d":
      case "ArrowRight":
        if (snappositions.checked) snapNext(selected,"x",possnaps)
        else selected.x+=1/60
        transformChanged(selected)
        break;
      case "a":
      case "ArrowLeft":
        if (snappositions.checked) snapPrev(selected,"x",possnaps)
        else selected.x-=1/60
        transformChanged(selected)
        break;
      case "s":
      case "ArrowDown":
        if (snappositions.checked) snapNext(selected,"y",possnaps)
        else selected.y+=1/60
        transformChanged(selected)
        break;
      case "w":
      case "ArrowUp":
        if(snappositions.checked) snapPrev(selected,"y",possnaps)
        else selected.y-=1/60
        transformChanged(selected)
        break;
      case "q":
        selected.rot-=15
        transformChanged(selected)
        break;
      case "e":
        selected.rot+=15
        transformChanged(selected)
        break;
      case "Delete":
        deletepart(selected)
        break;
      case " ":
        drawCarefully()
        break;
      case "Tab":
      case "n":
        for(let i=0;i<parts.length;i++){
          if(selected==parts[i]) {
            selectPart(parts[(i+1)%parts.length])/*
            if(i+1<parts.length) selectPart(parts[i+1])
            else deselect()*/
            break;
          }
          if(i+1==parts.length)selectPart(parts[0])
        }
        break;
      default:
        if(unhandled!==false) unhandled=true
    }
    if(!unhandled && selected){
      e.preventDefault()
      if(e.key!=" "){
        clearTimeout(keyboardTimeout)
        keyboardTimeout = setTimeout(drawCarefully
          ,500)
      }
      // stops scrolling (arrow keys and space) and might do something about tab
    }
  }
})

//drawPartdivs(parts)
//drawFractal(10000)

function logparts(){
  console.log("[" + parts.map(p=> "{"+["x","y","w","h","rot"].map(c=>c+":"+p[c]).join(",")+"}" ).join(",")+"]")
}
function calcDim(conts){
  return conts.map((c,i)=>{
    let ni = c.reduce(((a,r)=>a+r.reduce(((a,b)=>a+(b!=0)),0)),0)
    return Math.log2(ni)/i
  })

}
function copyparts(parts){
  return parts.map(p=>({"x":p.x,"y":p.y,"w":p.w,"h":p.h,"rot":p.rot}))
}
//Save/load
let saved = JSON.parse(localStorage.getItem("parts"))
if(saved===null) saved=[]
function saveImage(){
  let pts = copyparts(parts)
  saved.push(pts)
  localStorage.setItem("parts",JSON.stringify(saved))
  mkSideCanvas(pts)
}
function mkSideCanvas(pts,quick){// assumes pts is never mutated
  let op=parts
  parts=pts
  drawFractal(quick?(carefulDrawCount*2)/(saved.length+1):carefulDrawCount)
  let newCanvas = document.createElement("canvas")
  newCanvas.width=100
  newCanvas.height=100
  sidediv.prepend(newCanvas)
  //newCanvas.parts = pts
  newCanvas.addEventListener("click",(e)=>{
    parts = copyparts(pts)
    resetParts()
  })
  let ctx=newCanvas.getContext("2d")
  ctx.drawImage(bigPic, ox, oy, w, h, 0, 0, newCanvas.width, newCanvas.height)
  parts = op
  return newCanvas
}
for(let im of saved){
  //parts=copyparts(im)
  mkSideCanvas(im,true)
}
function resetParts(){
  drawPartdivs(parts)
  selectPart(parts[0])
  drawCarefully()
  //drawFractal(10000)
}
//resetParts()
// saveImage()
//drawBoxes()
/*
TODO: 
Set comparison
Better fractal dimension calculation
puzzles / achievements
*/


// let s = drawFractal(carefulDrawCount,true) 
// setDist(s,s)
let ctx2 = refPic.getContext("2d")
ctx2.strokeStyle="#FFF"
ctx2.fillStyle="#F00"
ctx2.strokeRect(ox,oy,w,h)

const allowed = {
  move:true,
  rotate:false,
}

function checkAnswer(r){
  if(targetset){
    let d = setDist(targetset,r)*thresholdFactorg
    distance.innerText=d.toFixed(2)
    distance.className=d>100?"nowhere":d>10?"bad":d>1?"near":d>0.1?"good":"exellent"
    if (d<=1 && challengeNum==challengeCount){
      challengeCount+=1
      localStorage.setItem("challengeCount",challengeCount)
      if(challengeNum+1==challenges.length){
        alert("Congratulations, you've completed all the challenges, enjoy playing freestyle")
        console.log("TODO: hide challenge related ui")
        saveImage()
        refPic.classList.add("hidden")
      }
      else{
        askContinue("Congratualtions, Challenge complete (distance "+d.toFixed(3)+").<br>\n Save this fractal and continue to the next challenge?",
          function (contin){
            if (contin){
              challengeNum+=1
              saveImage()
              resetChallenge()
            }
            else{
              nextChallengeButton.classList.remove("hidden")
            }
          })
      }
    }
  }
}
let targetParts
function setTarget(parts){
  refPic.classList.remove("hidden")
  refPic.width|=0
  ctx2.fillStyle="#F00"
  targetParts = parts
  targetset = drawFractalAt(parts,ctx2,carefulDrawCount,true)
}
let curHints=[]
let numHintsShown=0
function setHints(hints){
  hinttext.innerHTML=""
  curHints=hints
  numHintsShown=0
  if(hints.length>0)addHint()
}
function showSol(){
  parts = copyparts(targetParts)
  challengeCount=challengeNum+1
  nextChallengeButton.classList.remove("hidden")
  showSolution.classList.add("hidden")
  resetParts()
}
function addHint(){
  hinttext.innerHTML+="<BR>"+curHints[numHintsShown++]
  if (numHintsShown<curHints.length){
    nextHintSpan.classList.remove("hidden")
    showSolution.classList.add("hidden")
  }
  else{
    nextHintSpan.classList.add("hidden")
    showSolution.classList.remove("hidden")
  }
}
let thresholdFactorg=1
function startChallenge(c,keephints){
  if(challengeCount<=challengeNum) nextChallengeButton.classList.add("hidden")
  let {target,init,hints,thresholdFactor} = c
  thresholdFactorg=thresholdFactor??1
  setTarget(target)
  // targetset = drawFractalAt(target,ctx2,carefulDrawCount,true)
  parts = copyparts(init)
  resetParts()
  drawCarefully()
  if(!keephints) {setHints(hints)}
}
let challengeCount= +localStorage.getItem("challengeCount") // completed challenges
let challengeNum = challengeCount
if(challengeNum<challenges.length) startChallenge(challenges[challengeNum])
else{resetParts()}
function nextChallenge(){
  if(challengeNum<challenges.length-1){
    ++challengeNum
    resetChallenge()
    //startChallenge(challenges[])
  }
  else{
    alert("You're at the end of the challenges, enjoy making whatever fractals you want")
    console.log("TODO: hide challenge related ui")
    refPic.classList.add("hidden")
  }
}
function resetChallenge(keephints){
  startChallenge(challenges[challengeNum],keephints)
}
function resetProgress(){
  challengeCount=0
  challengeNum=0
  resetChallenge()
  localStorage.setItem("challengeCount",challengeCount)
}
