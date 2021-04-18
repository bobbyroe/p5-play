let paused = true;
let mid = { x: 0, y: 0 };
const wedges = [];

function getWedge(n) {
  const x = 300;
  const y = 300;
  const length = 600;
  const height = 60;
  const startX = n === 0 || n === 3 ? x : x + length + height;
  const startY = n === 2 || n === 3 ? y + length + height: y;

  const hypot = Math.hypot(height, length);
  const lenAngle = 180 / Math.PI * Math.asin(length/hypot);
  console.log(lenAngle);

  return {
    n,
    rotation: 90 * n,
    pos: {
      x: startX,
      y: startY
    },
    verts: [
      { x: 0, y: 0 },
      { x: length, y: 0 },
      { x: 0, y: height },
    ],
  };
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  rectMode(CENTER);
  stroke(255);
  noFill();
  angleMode(DEGREES);
  mid = {
    x: windowWidth * 0.5,
    y: windowHeight * 0.5,
  };
  const numWedges = 4;
  for (let i = 0; i < numWedges; i += 1) {
    wedges.push(getWedge(i));
  }
  wedges.forEach((w) => {
    const { verts, rotation, pos, n } = w;
    const { x, y } = pos;
    console.log(w);
    push();
    // strokeWeight(n + 1);
    translate(x, y);
    rotate(rotation);
    
    beginShape();
    verts.forEach((v) => {
      const { x, y } = v;
      vertex(x, y);
    });
    endShape(CLOSE);
    pop();
  });
}

let counter = 0;
let inc = 0.001;
function draw() {
  if (paused === false) {
    // clear();
    counter += inc;
  }
}

function keyPressed() {
  if (keyCode === ESCAPE) {
    paused = !paused;
  }
  if (key === "=") {
    inc = abs(inc);
  }
  if (key === "-") {
    inc = abs(inc) * -1;
  }
  return false;
}
