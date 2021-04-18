let paused = false;
let mid = { x: 0, y: 0 };

function drawLeaf() {
  const size = random(15, 45);
  let hue = random(80, 140);
  fill(hue, 100, random(50, 100));
  noStroke();
  // ...(x1, y1, cp1x, cp1y, cp2x, cp2y, x2, y2);
  rotate(random(-80, -100));
  bezier(0, 0, size * 0.4, size * -0.5, size, 0, size, 0);
  line(0, size, 0, 0);
  fill(hue, 100, random(50, 100));
  bezier(0, 0, size * 0.4, size * 0.5, size, 0, size, 0);
  line(0, size, 0, 0);
}

function branch(len) {
  push();
  if (len > 20) {
    strokeWeight(map(len, 10, 200, 1, 50));
    stroke(40, 100, random(20, 35));
    line(0, 0, 0, -len);
    translate(0, -len);
    // 1st
    rotate(random(-20, -30));
    branch(len * random(0.7, 0.9));
    // 2nd
    rotate(random(50, 60));
    branch(len * random(0.7, 0.9));
  } else {
    drawLeaf();
  }
  pop();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  angleMode(DEGREES);
  noLoop();
  mid = {
    x: windowWidth * 0.5,
    y: windowHeight * 0.5,
  };
}

function draw() {
  const startLength = 150;
  if (paused === false) {
    translate(mid.x, mid.y + 450);
    branch(startLength);
  }
}

// function keyPressed() {
//   if (keyCode === ESCAPE) {
//     paused = !paused;
//   }
//   return false;
// }
