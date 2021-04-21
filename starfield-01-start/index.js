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
  image(c, -windowWidth * 0.5, -windowHeight * 0.5);
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  colorMode(HSB);
  mid = {
    x: windowWidth * 0.5,
    y: windowHeight * 0.5,
  };
  createStarfield();
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
