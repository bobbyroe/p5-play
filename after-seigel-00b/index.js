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
  const numSquares = 32;
  let size = 1000;
  const ratio = .15;
  let hypot = Math.hypot(size, size * ratio);
  let rotation =  Math.asin(size / hypot) - (ratio * 0.25);
  for (let i = 0; i < numSquares; i += 1) {
    size = i === 0 ? size : size * (1 - ratio);
    squares.push({
      i,
      x: mid.x,
      y: mid.y,
      w: size,
      h: size,
      r: i * rotation,
      hue: 280 - 10 * i, 
      strkWt: 0.5
    });
  } 
  squares.forEach(s => {
    const { i, x, y, w, h, r, hue, strkWt } = s;
    push();
    // fill(100 - c);
    stroke(hue, 100 - i * 3, 100);
    strokeWeight(strkWt);
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
      const { x, y, w, h, r, hue, strkWt, i } = s;
      push();
      stroke(hue, 100, 100);
      strokeWeight(strkWt);
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
