let paused = true;
let mid = { x: 0, y: 0 };
const squares = [];

function getSquare () {
  return {
    x: 100,
    y: 100,
    w: 100,
    h: 100
  }
} 

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  rectMode(CENTER);
  stroke(255);
  noFill();
  mid = {
    x: windowWidth * 0.5,
    y: windowHeight * 0.5,
  };
  const numSquares = 20;
  const size = 1000;
  for (let i = 0; i < numSquares; i += 1) {
    squares.push({
      i,
      x: mid.x,
      y: mid.y,
      w: size - i * (size / numSquares),
      h: size - i * (size / numSquares),
      r: i * 0.05,
      c: 100, // (100 / numSquares) * i,
      lw: 2 // (numSquares - i) * 0.1
    });
  } 
  squares.forEach(s => {
    const { x, y, w, h, r, c, lw } = s;
    push();
    // fill(100 - c);
    stroke(c);
    strokeWeight(lw);
    translate(x, y);
    rotate(r);
    rect(0, 0, w, h);
    pop();
  });
  
}

let counter = 0;
let inc = 0.001;
function draw() {
  if (paused === false) {
    clear();
    counter += inc;
    squares.forEach(s => {
      const { x, y, w, h, r, c, lw, i } = s;
      push();
      stroke(c);
      strokeWeight(lw);
      translate(x, y);
      rotate(r + counter * i);
      rect(0, 0, w, h);
      pop();
    });
  }
}

function keyPressed() {
  // console.log(key, keyCode);
  if (keyCode === ESCAPE) {
    paused = !paused;
  }
  if(key === "=") {
    inc = abs(inc);
  }
  if(key === "-") {
    inc = abs(inc) * -1;
  }
  return false;
}
