let scal = 1; // キャンバス全体の拡大（scal 倍）
let cwidth = 400*scal; // キャンバス全体の大きさ (px)
let bRectEdge = 20*scal;
let blackWidth = cwidth - bRectEdge*2;
let patternRatio = 0.8;
let innerWidth = blackWidth*patternRatio;// キャンバス（内部の白部分）の大きさ
let innerEdge = bRectEdge + (blackWidth-innerWidth)/2;// 黒枠の太さだけ加算
let grids = 8; // キャンバスのピクセル数（一辺）
let px = innerWidth/grids; // 1ドットの長さ(px)

let drawnArea = [];

function setup() {
  createCanvas(cwidth, cwidth);
  background(255);
  noStroke();
  fill(0);
  rect(bRectEdge, bRectEdge, blackWidth, blackWidth);
  fill(255);
  rect(innerEdge, innerEdge, innerWidth, innerWidth);
  
  for (let i =0; i<grids*grids; i++) {
    drawnArea.push(0);
  }

  console.log(blackWidth,innerWidth);
}

function draw() {
  for(let i =0; i<grids; i++) {
    for(let j=0;j<grids;j++) {
      noFill();
      if(drawnArea[grids*j+i]%2==0){
        stroke(200,200,200);
        rect(i*px+innerEdge, j*px+innerEdge, px, px);
      } else {
        stroke(0);
        rect(i*px+innerEdge, j*px+innerEdge, px, px);
      }
    }
  }
}


function touchStarted() {
  for(let i =0; i<grids; i++) {
    if(mouseX > i*px +innerEdge && mouseX < (i+1)*px +innerEdge) {
      for(let j =0; j<grids; j++) {
        if(mouseY > j*px +innerEdge && mouseY < (j+1)*px + innerEdge) {
          if(drawnArea[grids*j+i]%2==0){
            fill(0);
            rect(i*px+innerEdge, j*px+innerEdge, px, px);
            drawnArea[grids*j+i]=1;
          } else {
            fill(255);
            rect(i*px+innerEdge, j*px+innerEdge, px, px);
            drawnArea[grids*j+i]=0;
          }
        }
      }
    }
  }
}