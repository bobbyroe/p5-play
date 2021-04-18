let paused = false;
let mid = { x: 0, y: 0 };

function createStarfield() {
  const numStars = 300;
  const c = createGraphics(windowWidth, windowHeight);
  c.colorMode(HSB);
  c.noStroke();
  
  for (let i = 0; i < numStars; i+= 1) {
    c.fill(random(360), 0, 100);
    c.circle(random(windowWidth), random(windowHeight), random(1, 3));
  }
  image(c, 0, 0);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  mid = {
    x: windowWidth * 0.5,
    y: windowHeight * 0.5,
  };
  createStarfield();
  //
  // noFill();
  const numVerts = 12;
  const diameter = 100;
  let counter = 0;
  let inc = TAU / numVerts;
  stroke(40, 100 , 100);
  strokeWeight(5);
  translate(mid.x, mid.y);
  beginShape();
  for(let c = 0; c < numVerts; c += 1) {
    counter += inc;
    curveVertex(cos(counter) * diameter, sin(counter) * diameter);
  }
  
  // beginContour();
  
  for(let c = 0; c < numVerts; c += 1) {
    counter -= inc;
    curveVertex(15 + cos(counter) * diameter * 0.75, sin(counter) * diameter * 0.75);
  }
  // endContour();
  endShape(CLOSE);
}

function draw() {
  if (paused === false) {
  }
}

function keyPressed() {
  if (keyCode === ESCAPE) {
    paused = !paused;
  }
  return false;
}
