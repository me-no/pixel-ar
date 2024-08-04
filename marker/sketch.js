let scal = 1; // キャンバス全体の拡大（scal 倍）
let cwidth = 400*scal; // キャンバス（外枠）の大きさ
let bRectEdge = 20*scal;
let blackWidth = cwidth - bRectEdge*2;
let innerWidth = blackWidth/2;// キャンバス（内部の白部分）の大きさ
let innerEdge = bRectEdge + innerWidth/2;
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
}

function draw() {
  for(let i =0; i<grids; i++) {
    if(mouseX > i*px +innerEdge && mouseX < (i+1)*px +innerEdge) {
      for(let j =0; j<grids; j++) {
        if(mouseY > j*px +innerEdge && mouseY < (j+1)*px + innerEdge) {
          if(drawnArea[grids*j+i]%2==0){
            fill(255);
            rect(i*px+innerEdge, j*px+innerEdge, px, px);
          } else {
            fill(0);
            rect(i*px+innerEdge, j*px+innerEdge, px, px);
          }
        }
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
