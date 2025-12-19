"use strict";

let challenges = [
  {
    target : [{x:0.5,y:0.33333333333333337,w:0.5,h:0.5,rot:360},{x:0.33333333333333337,y:0.5833333333333334,w:0.5,h:0.5,rot:0},{x:0.7071067811865475,y:0.6666666666666667,w:0.5,h:0.5,rot:0}]
    /* [{x:0.75,y:0.25,w:0.5,h:0.5,rot:360},{x:0.25,y:0.75,w:0.5,h:0.5,rot:0},{x:0.75,y:0.75,w:0.5,h:0.5,rot:0}]*/
  , init : [{x:0.25,y:0.25,w:0.5,h:0.5,rot:360},{x:0.2916666666666667,y:0.7083333333333334,w:0.5,h:0.5,rot:0},{x:0.7083333333333334,y:0.7083333333333334,w:0.5,h:0.5,rot:0}]
  /*[{x:0.25,y:0.25,w:0.5,h:0.5,rot:360},{x:0.25,y:0.75,w:0.5,h:0.5,rot:0},{x:0.75,y:0.75,w:0.5,h:0.5,rot:0}]*/
  , hints : ["Move the parts around using the mouse or arrow keys",
    "Reset the challenge if you're stuck. For this one, you only need to move the grey squares around which you can do by dragging the middle of them"
  ]
  , name : "Controls: Move"
  },
  {
    target : [{x:0.75,y:0.25,w:0.5,h:0.5,rot:360},{x:0.25,y:0.75,w:0.5,h:0.5,rot:0},{x:0.75,y:0.75,w:0.5,h:0.5,rot:0},{x:0.25,y:0.25,w:0.5,h:0.5,rot:0}]
  , init : [{x:0.75,y:0.25,w:0.5,h:0.5,rot:360},{x:0.25,y:0.75,w:0.5,h:0.5,rot:0},{x:0.75,y:0.75,w:0.5,h:0.5,rot:0},{x:0.5,y:0.5,w:0.5,h:0.5,rot:0}]
  , hints : ["A square can be formed out of 4 smaller squares, one in each corner.",
      "Reset the challenge if you're stuck. This can be solved by moving the part in the middle into the top left corner"
  ]
  , name : "Solid square" 
  , thresholdFactor : 10
  },
  {
    target : [{x:0.6666666666666666,y:0.375,w:0.5,h:0.5,rot:360},{x:0.3333333333333333,y:0.625,w:0.5,h:0.5,rot:0},{x:0.625,y:0.6666666666666666,w:0.5,h:0.5,rot:0},{x:0.375,y:0.3333333333333333,w:0.5,h:0.5,rot:0}]
  , init :[{x:0.625,y:0.25,w:0.5,h:0.5,rot:360},{x:0.25,y:0.75,w:0.5,h:0.5,rot:0},{x:0.75,y:0.625,w:0.5,h:0.5,rot:0},{x:0.2916666666666667,y:0.4583333333333333,w:0.5,h:0.5,rot:0}]
  , hints : ["Here's a smaller square. You don't need to rotate or resize any of the parts for this challenge.",
      "Reset the challenge if you're stuck. This can be solved without doing anything except moving the parts. Try and use each part to get a different corner of the square in the right places"
  ]
  , name : "Repositioning"
  , thresholdFactor : 10
  },
  {
    target : [{x:0.25,y:0.75,w:0.5,h:0.5,rot:90},{x:0.75,y:0.75,w:0.5,h:0.5,rot:360},{x:0.75,y:0.25,w:0.5,h:0.5,rot:270}]
  , init : [{x:0.75,y:0.25,w:0.5,h:0.5,rot:360},{x:0.25,y:0.75,w:0.5,h:0.5,rot:0},{x:0.75,y:0.75,w:0.5,h:0.5,rot:0}]
  , hints : ["Parts can be rotated using the top handle (the blue circle which appears above a part when you click on it) or Q/E on the keyboard.",
      "Reset the challenge if you're stuck. Rotate the bottom left part by 90 degrees clockwise and"+
      " the top right part by 90 degrees clockwise."]
  , name : "Controls: Rotate"
  },
  {
    target :[{x:0.5,y:0.25,w:0.5,h:0.5,rot:360},{x:0.25,y:0.75,w:0.5,h:0.5,rot:0},{x:0.75,y:0.75,w:0.5,h:0.5,rot:0},{x:0.5,y:0.75,w:0.5,h:0.5,rot:540}]
  , init : [{x:0.75,y:0.25,w:0.5,h:0.5,rot:360},{x:0.25,y:0.75,w:0.5,h:0.5,rot:0},{x:0.75,y:0.75,w:0.5,h:0.5,rot:0},{x:0.5,y:0.5,w:0.5,h:0.5,rot:0}]
  , hints : [
    "Now for a solid triangle.",
    "Like with a square, you can make a triangle out of 4 smaller ones",
    "One of the 4 copies needs to be upsidedown",
    "Reset the challenge if you're stuck. Rotate one copy by 180 degrees, nothing needs to be resized"
  ]
  , name : "Solid Triangle"
  , thresholdFactor : 10
  , group : "Polygons"
  },
  {
    target: [{x:0.2916666666666667,y:0.5,w:0.7071067811865475,h:0.7071067811865475,rot:495},{x:0.5833333333333334,y:0.4583333333333333,w:0.7071067811865475,h:0.7071067811865475,rot:585}]
  , init : [{x:0.6666666666666666,y:0.375,w:0.7071067811865475,h:0.7071067811865475,rot:360},{x:0.375,y:0.4583333333333333,w:0.7071067811865475,h:0.7071067811865475,rot:360}]
  , hints : ["These parts each have half the area of the full square, allowing for some interesting patterns with solid areas.",
           "Can you see a way to make the red triangle out of 2 copies of itself? How much do they need to be rotated by?",
           "Try rotating both parts by 135 degrees in opposite directions (3/8ths of a full circle). Reset the challenge if you're stuck.",
           "The snap rotation setting in 'control configuration' below can be useful"]
  , name : "Right Isoceles triangle"
  , group : "Polygons"
  },
  {
    target:[{x:0.6666666666666666,y:0.5,w:0.7071067811865475,h:0.7071067811865475,rot:585},{x:0.3333333333333333,y:0.5,w:-0.7071067811865475,h:-0.7071067811865475,rot:585}]
  , init : [{x:0.6666666666666666,y:0.375,w:0.7071067811865475,h:0.7071067811865475,rot:360},{x:0.375,y:0.4583333333333333,w:0.7071067811865475,h:0.7071067811865475,rot:360}]
  , hints : ["Now we move onto some dragons",
           "Could you fit a smaller copy of the target shape into itself? You'll need to rotate something.",
           "Try rotating both parts by 45 degrees clockwise. Reset the challenge if you're stuck.",
           "The snap rotation setting in 'control configuration' below can be useful"]
  , name : "Twin Dragon"
  , group : "Dragons"
  },
  {
    target : [{x:0.6666666666666667,y:0.5,w:0.7071067811865475,h:0.7071067811865475,rot:405},{x:0.33333333333333337,y:0.5,w:0.7071067811865475,h:0.7071067811865475,rot:315}]
  , init : [{x:0.6666666666666666,y:0.375,w:0.7071067811865475,h:0.7071067811865475,rot:360},{x:0.375,y:0.4583333333333333,w:0.7071067811865475,h:0.7071067811865475,rot:360}]
  , hints : ["Can you see how copies of the target shape could fit within it?",
            "Try rotating the parts by 45 degrees in different directions. Reset the challenge if you're stuck.",
            "The snap rotation setting in 'control configuration' below can be useful"]
  , name : "Lévy Dragon"
  , group : "Dragons"
  },
  {
    target : [{x:0.75,y:0.375,w:0.7071067811865475,h:0.7071067811865475,rot:495},{x:0.4166666666666667,y:0.6666666666666666,w:0.7071067811865475,h:0.7071067811865475,rot:405}]
  , init : [{x:0.6666666666666666,y:0.375,w:0.7071067811865475,h:0.7071067811865475,rot:360},{x:0.375,y:0.4583333333333333,w:0.7071067811865475,h:0.7071067811865475,rot:360}]
  , hints : ["Can you see smaller copies of the target shape within it?",
            "Try rotating the parts by 45 degrees and 135 degrees. Reset the challenge if you're stuck.",
            "The snap rotation setting in 'control configuration' below can be useful"]
  , name : "Heighway Dragon"
  , group : "Dragons"
  },

  {
    target : [{x:0.2916666666666667,y:0.5833333333333334,w:0.5,h:0.5,rot:0},{x:0.625,y:0.4166666666666667,w:0.5,h:0.5,rot:0}]
  , init : [{x:0.5,y:0.25,w:0.5,h:0.5,rot:360},{x:0.2916666666666667,y:0.5833333333333334,w:0.5,h:0.5,rot:0},{x:0.6666666666666666,y:0.5,w:0.5,h:0.5,rot:0}]
  , hints : ["Try deleting a part using the Delete key or the 'Delete Part' button below.",
    "Reset the challenge if you're stuck. This one can be solved by deleting a single part and then moving parts until the white line matches the red line"
  ]
  , name : "Controls: Delete"
  },
  {
    target : [{x:0.8333333333333334,y:0.8333333333333334,w:0.3333333333333333,h:0.3333333333333333,rot:360},{x:0.16666666666666666,y:0.16666666666666666,w:-0.3333333333333333,h:0.3333333333333333,rot:360},{x:0.16666666666666666,y:0.8333333333333334,w:0.3333333333333333,h:0.3333333333333333,rot:0},{x:0.8333333333333334,y:0.16666666666666666,w:0.3333333333333333,h:0.3333333333333333,rot:360}]
    //[{x:0.75,y:0.8333333333333334,w:0.25,h:0.25,rot:360},{x:0.6666666666666667,y:0.33333333333333337,w:0.6666666666666666,h:0.6666666666666666,rot:360},{x:0.16666666666666666,y:0.16666666666666666,w:0.3333333333333333,h:0.3333333333333333,rot:0}]
  , init : [{x:0.75,y:0.75,w:0.5,h:0.5,rot:360},{x:0.16666666666666666,y:0.16666666666666666,w:0.3333333333333333,h:0.3333333333333333,rot:360},{x:0.25,y:0.75,w:0.5,h:0.5,rot:0},{x:0.75,y:0.25,w:0.5,h:0.5,rot:360}]
  // [{x:0.75,y:0.25,w:0.5,h:0.5,rot:360},{x:0.25,y:0.75,w:0.5,h:0.5,rot:0},{x:0.75,y:0.75,w:0.5,h:0.5,rot:0}]
  , hints : ["Try making parts bigger/smaller using the side/corner handles (green circles).",
    "Reset the challenge if you're stuck. This one can be solved by making one of the parts bigger and three of them smaller."
  ]
  , name : "Controls: Resize"
  },

  {
    target : [{x:0.75,y:0.25,w:0.5,h:0.5,rot:630},{x:0.25,y:0.75,w:0.5,h:0.5,rot:450},{x:0.75,y:0.75,w:0.5,h:0.5,rot:0},{x:0.25,y:0.25,w:0.5,h:0.5,rot:0}]
  , init : [{x:0.75,y:0.25,w:0.5,h:0.5,rot:360},{x:0.25,y:0.75,w:0.5,h:0.5,rot:0},{x:0.75,y:0.75,w:0.5,h:0.5,rot:0}]
  , hints : ["A square again. Create a new part using the button below and put it in the gap.",
      "Reset the challenge if you're stuck. This can be solved by creating a new part and moving it into the top left corner"
  ]
  , name : "Controls: Create"
  , thresholdFactor : 10
  },
  {
    target : [{x:0.5,y:0.25,w:0.5,h:0.5,rot:360},{x:0.25,y:0.75,w:0.5,h:0.5,rot:0},{x:0.75,y:0.75,w:0.5,h:0.5,rot:0},{x:0.5,y:0.625,w:0.25,h:0.25,rot:0}]
  , init : [{x:0.5,y:0.25,w:0.5,h:0.5,rot:360},{x:0.25,y:0.75,w:0.5,h:0.5,rot:0},{x:0.75,y:0.75,w:0.5,h:0.5,rot:0}]
  , hints : ["Looks like something's missing. Create a new part using the button below and modify it appropriately.",
    "If you've got something that covers some of the solution, but not all of it, look for the largest red piece which could be covered by a copy of the whole thing, then create a part which makes something that covers that",
    "Reset the challenge if you're stuck. This one can be solved by creating a part, making it a bit smaller, and putting it in the middle"
  ]
  , name : "Sierpiński Plus"
  },
  {
    target : [{x:0.5,y:0.16666666666666666,w:0.3333333333333333,h:0.3333333333333333,rot:360},{x:0.16666666666666666,y:0.16666666666666666,w:0.3333333333333333,h:0.3333333333333333,rot:360},{x:0.8333333333333334,y:0.8333333333333334,w:0.3333333333333333,h:0.3333333333333333,rot:0},{x:0.8333333333333334,y:0.16666666666666666,w:0.3333333333333333,h:0.3333333333333333,rot:0},{x:0.8333333333333334,y:0.5,w:0.3333333333333333,h:0.3333333333333333,rot:0},{x:0.16666666666666666,y:0.5,w:0.3333333333333333,h:0.3333333333333333,rot:0},{x:0.16666666666666666,y:0.8333333333333334,w:0.3333333333333333,h:0.3333333333333333,rot:0},{x:0.5,y:0.8333333333333334,w:0.3333333333333333,h:0.3333333333333333,rot:0}]
  , init : [{x:0.5,y:0.25,w:0.5,h:0.5,rot:360},{x:0.25,y:0.75,w:0.5,h:0.5,rot:0},{x:0.75,y:0.75,w:0.5,h:0.5,rot:0}]
  , hints : ["You'll need to make a few new pieces for this one"]
  , name : "Sierpiński carpet"
  },
  
  {
    target :[{x:0.6666666666666666,y:0.4166666666666667,w:0.7071067811865475,h:0.7071067811865475,rot:450},{x:0.375,y:0.5416666666666666,w:0.7071067811865475,h:0.7071067811865475,rot:450}]
  , init : [{x:0.75,y:0.25,w:0.5,h:0.5,rot:360},{x:0.25,y:0.75,w:0.5,h:0.5,rot:0},{x:0.75,y:0.75,w:0.5,h:0.5,rot:0}]
  , hints : [
    "You are expected to create or delete a part for this challenge",
    "This could be done like the square, with 4 parts 1/2 the length and height",
    "But there's a way to use fewer parts: this rectangle has the same aspect ratio as a piece of A4 paper.",
    "If you cut a piece of A4 paper in half, you get 2 A5 pieces with the same aspect ratio as the original.",
    "The short edges of the A5 sheet form the long edges of the A4 sheet, so both parts need a 90 degree rotation",
    "Make sure the parts have sides that are 1/√2 of the full square. Some of the dragons used squares that size, so clicking a saved fractal to load it might help"
  ]
  , name : "Solid Rectangle"
  , thresholdFactor : 10
  //, group : "Polygons"
  },
  {
    target : [{x:0.5416666666666666,y:0.375,w:-0.75,h:0.75,rot:360.9338669250746},{x:0.6666666666666666,y:0.7083333333333334,w:0.5833333333333334,h:0.5833333333333334,rot:396.69768666306084}]
  , init : [{x:0.6666666666666666,y:0.625,w:0.5,h:0.5,rot:360},{x:0.4583333333333333,y:0.4166666666666667,w:0.5,h:0.5,rot:360}]
  , hints : [ "What a pretty fern",
    "you'll need to resize parts for this",
    "A piece can become a scaled reflection of the whole thing if you drag one of the side handles to give it a negative width or height"
  ]
  , name : "Fern"
  },
  /*
  {
    target : 
  , init : 
  , hints : 
  , name : 
  },
  */
  /*
  {
    target : 
  , init : 
  , hints : 
  , name : 
  },
  */
]

let dependencies = {
  "Controls: Move" : [] ,
  "Solid square" : ["Controls: Move"] ,
  "Repositioning" : ["Solid square"] ,
  "Controls: Rotate" : ["Controls: Move"] ,
  "Polygons" : ["Controls: Move", "Controls: Rotate"] ,
  "Dragons" : ["Controls: Move", "Controls: Rotate"] ,
  "Controls: Delete" : ["Controls: Move", "Controls: Rotate"] ,
  "Controls: Resize" : ["Controls: Move", "Controls: Rotate"] ,
  "Controls: Create" : ["Solid square"] ,
  "Sierpiński Plus" : ["Controls: Move", "Controls: Resize"] ,
  "Sierpiński carpet" : ["Controls: Move", "Controls: Create", "Controls: Resize"] ,
  "Solid Rectangle" : ["Polygons", "Controls: Create", "Controls: Delete"] ,
  "Fern" : ["Controls: Move", "Controls: Create", "Controls: Delete", "Controls: Resize","Sierpiński carpet"] ,
}

function mkArrow(dir){
  let arr = document.createElementNS("http://www.w3.org/2000/svg","svg")
  arr.classList.add(dir+"Arrow")
  let r=0
  let x=0
  let y=0
  let w=20
  let h=100
  for(let i=0; dir!="left" && i-1<(dir=="right") ; i++ ){
    r-=90
    ;[w,h] = [h,w]
    ;[x,y]=[y,100-(x+h)]
  }
  arr.innerHTML = '<path transform="rotate('+r+' 50 50)" fill="white" d="M0,50 L10,0 L10,25 L20,25 L20,75 L10,75 L 10,100 Z">'
  arr.setAttribute("viewBox",[x,y,w,h].join(" "))
  //<rect fill="white" x="120" width="100" height="100" rx="15"> </rect>\
  //<rect fill="black" x="0" y="0" width="100" height="100"> </rect>'
  return arr
}
function levelBox(name,position,arrow){
  let [x,y] = position;
  let div = document.createElement("div")
  div.style = 'grid-column:'+x+';grid-row:'+y+';'
  div.classList.add("lvlbox")
  div.classList.add("locked")
  div.append(name)
  if(arrow)div.append(arrow)
  return div
}
function singleLvlBox(lvl,position,container,arrow){
  console.log(position)

  let div = levelBox(lvl.name,position,arrow)
  div.append(document.createElement("br"))
  div.append(mkSmallCanvas(lvl.target,10000,100,100))
  div.append(document.createElement("br"))
  let sp = document.createElement("span")
  sp.innerHTML="incomplete"
  div.append(sp)
  lvl.box=div
  container.append(div)
  occupied[position]=true
  return div
}
function lvlGroupBox(grp,position,container,arrow){
  console.log(position)
  let [[x1,x2],[y1,y2]] = position
  let h = document.createElement("h2")
  h.append(grp)
  let div = levelBox(h,[x1+"/"+x2,y1+"/"+y2],arrow)
  div.classList.add("lvlgroup")
  let i=x1
  let j=y1
  for(let x of inGroup[grp]){
    //console.log(i,j)
    let lvldiv= singleLvlBox(x,[i-x1+1,j-y1+1],div)
    lvldiv.classList.remove("locked")
    if (i+1>=x2){j+=1;i=x1} else{i+=1}
  }
  for(let i=x1;i<x2;i++){
    for(let j=y1;j<y2;j++){
      occupied[[i,j]]=true
    }
  }
  container.append(div)
  return div
}
let inGroup = {}
for(let x in dependencies){
  inGroup[x] = []
}
for(let x of challenges){
  if (x.group){
    inGroup[x.group].push(x)
  }
  else if(x.name in inGroup){
    inGroup[x.name].push(x)
    if(inGroup[x.name].length!=1) throw "name conflict"
  }
  else{
    throw ("level without specified dependencies: "+x.name)
  }
}
let positions = {}
let occupied = {}
let i=0
for(let grp in dependencies){
  console.log(grp)
  let itms = inGroup[grp]
  let deps = dependencies[grp]
  if (grp.startsWith("Controls: ")){
    i++
    deps.box=singleLvlBox(itms[0],[3,i],levelSelectgrid,deps.length && mkArrow("down"))
    positions[grp] = [[3,4],[i,i+1]]
    // s+='<div style="grid-column:'+3+';grid-row:'+i+';">'+x.name+"<canvas width=100 height=100 /> </div>"
    //console.log(levelSelect.innerHTML)
  }
  else{
    let y = Math.max(... dependencies[grp].map(d => positions[d][1][1]-1 ))
    function getXs(ps){
      return [ps[0],ps[1]-1]
    }
    let x = 2
    //let x = Math.max(dependencies[grp].flatMap(d => [positions[d][0][0],positions[d][0][1]-1]).map(x=>[Math.abs(x-3),x]))[1]
    //x += Math.sign(x-3) // Move one step in the right direction
    while(occupied[[x,y]]){
      x=(x<3?6:5)-x
    }
    if(itms.length<=1){
      deps.box=singleLvlBox(itms[0],[x,y],levelSelectgrid,mkArrow(x<3?"left":"right"))
      positions[grp] = [[x,x+1],[y,y+1]]
    }
    else{
      let w=1
      if(Math.abs(x-3)<=1){ w=2; if(x<3) x-=1 }
      positions[grp] = [[x,x+w],[y,y+(itms.length+w-1)/w|0]]
      deps.box=lvlGroupBox(grp,positions[grp],levelSelectgrid,mkArrow(x<3?"left":"right"))
    }
  }
  //let positions[grp]
  //let [[x1,x2],[y1,y2]] = positions[grp]
  //if(x.position)drawLevel(x,levelSelectgrid)
}
function calcDeps(){
  for(let grp in dependencies){
    let deps = dependencies[grp]
    if(!deps.some(x=>!challenges[x].status)){
      deps.box.classList.remove("locked")
    }
  }
}
calcDeps()
