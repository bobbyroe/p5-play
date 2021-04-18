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
  strokeWeight(map(len, 10, 300, 0.5, 25));
  line(0, 0, 0, 0, -len, 0);
  translate(0, -len, 0);

  if (len > 40) {
    for (let i = 0; i < 3; i +=1) {
      rotateY(random(100, 140));
      push();
      rotateZ(random(20, 50));
      branch(len * 0.65);
      pop();
    }
  } else {
   drawLeaf();
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  colorMode(HSB);
  angleMode(DEGREES);
  // noLoop();
  mid = {
    x: windowWidth * 0.5,
    y: windowHeight * 0.5,
  };
}

function draw() {
  clear();
  randomSeed(1);
  translate(0, 500, 0);
  rotateY(frameCount);
  branch(300);
}
