let paused = false;
let mid = { x: 0, y: 0 };
let moon;
let drawingSurface;
function preload() {
  moon = loadImage("../assets/kissy.png");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  drawingSurface = createGraphics(windowWidth, windowHeight);
    
  colorMode(HSB);
  mid = {
    x: windowWidth * 0.5,
    y: windowHeight * 0.5,
  };
  // drawingSurface.blend(
  //   moon,
  //   0,
  //   0,
  //   moon.width * 2, // why?
  //   moon.height * 2,
  //   0,
  //   0,
  //   moon.width,
  //   moon.height,
  //   ADD
  // );
  // image(
  //   moon,
  //   mid.x - moon.width * 0.25,
  //   mid.y - moon.height * 0.25,
  //   moon.width * 0.5,
  //   moon.height * 0.5
  // );
  image(drawingSurface, 0, 0);
}

let angle = 0;
let gray = 0;
function draw() {
  if (paused === false) {
    angle = mouseX * 0.25;
    gray = mouseY * 0.1;
    drawingSurface.drawingContext.filter = `grayscale(${gray}%) hue-rotate(${angle}deg)`;
    drawingSurface.image(
      moon,
      mid.x - moon.width * 0,
      mid.y - moon.height * 0,
      moon.width * 0.5,
      moon.height * 0.5
    );
    image(drawingSurface, 0, 0);
    console.log(angle);
  }
}

function keyPressed() {
  if (keyCode === ESCAPE) {
    paused = !paused;
  }
  return false;
}
