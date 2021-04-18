let paused = false;
let mid = { x: 0, y: 0 };
let stars;
let starsCanvas;

function createStarfield() {
  const arr = [];
  const numStars = 100;
  const halfWidth = windowWidth * 0.5;
  const halfHeight = windowHeight * 0.5;
  for (let i = 0; i < numStars; i+= 1) {
    let hue = random(360);
    let pos = {
      x: random(-halfWidth, halfWidth), 
      y: random(-halfHeight,halfHeight),
      z: random(-100, 100)
    };
    let diameter = 1; // random(1, 3) * 3;
    let rate = random(1, 3);
    function _update () {
      pos.z += rate;
    }
    function render (c) {
      _update();
      c.fill(hue, 0, 100);
      c.circle(pos.x, pos.y, pos.z, diameter);
    }
    
    arr.push({
      hue,
      pos,
      diameter,
      rate,
      render
    });
  }
  
  return arr;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  mid = {
    x: windowWidth * 0.5,
    y: windowHeight * 0.5,
  };
  
  starsCanvas = createGraphics(windowWidth, windowHeight, WEBGL);
  starsCanvas.colorMode(HSB);
  starsCanvas.noStroke();
  //
  stars = createStarfield();
}

function draw() {
  if (paused === false) {
    clear();
    starsCanvas.clear();
    stars.forEach( s => s.render(starsCanvas));
    image(starsCanvas, 0, 0);
  }
}

function keyPressed() {
  if (keyCode === ESCAPE) {
    paused = !paused;
  }
  return false;
}
