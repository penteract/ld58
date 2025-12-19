"use strict";

//ctx.fillRect(1,1,20,20)
//ctx.strokeRect(ox,oy,w,h)
// let p = {x:ox+w/2,y:oy+h/2}
//let ptsz=2

//drawPartdivs(parts)
//drawFractal(10000)

// DOM manip helpers
function hide(x){x.classList.add("hidden")}
function unhide(x){x.classList.remove("hidden")}

// continue (alerts)
let cont = undefined // Shouldn't be able to click on continue button while it's hidden
function askContinue(msg, k){
  unhide(outeralert)
  alertmsg.innerHTML = msg
  cont = (arg) => {k(arg); hide(outeralert)}
}

// Dealing with parts
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
function resetParts(){
  drawPartdivs(parts)
  selectPart(parts[0])
  drawCarefully()
  //drawFractal(10000)
}
function logparts(){
  console.log("[" + parts.map(p=> "{"+["x","y","w","h","rot"].map(c=>c+":"+p[c]).join(",")+"}" ).join(",")+"]")
}
function copyparts(parts){
  return parts.map(p=>({"x":p.x,"y":p.y,"w":p.w,"h":p.h,"rot":p.rot}))
}

initHist(); // depends on copyparts

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
  let newCanvas = mkSmallCanvas(pts,quick?(carefulDrawCount*2)/(saved.length+1):carefulDrawCount, 100,100)
  sidediv.prepend(newCanvas)
  newCanvas.addEventListener("click",(e)=>{
    parts = copyparts(pts)
    resetParts()
  })
  return newCanvas
}
for(let im of saved){
  //parts=copyparts(im)
  mkSideCanvas(im,true)
}
//resetParts()
// saveImage()
//drawBoxes()


// Handling the challenges
// ========================

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

let targetset

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
// Initialisation of parts and main canvas
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
