let paused = false;
let mid = { x: 0, y: 0 };
let photo;
let maskCanvas;
function drawCircle () {
  maskCanvas.noFill();
  maskCanvas.strokeWeight(1);
  maskCanvas.stroke(0, 0, 100);
  maskCanvas.circle(mid.x, mid.y, 300);
}

function preload () {
  photo = loadImage('../assets/DRAW-ME.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  maskCanvas = createGraphics(photo.width * 0.5, photo.height * 0.5);
  colorMode(HSB);
  mid = {
    x: windowWidth * 0.5,
    y: windowHeight * 0.5,
  };
  drawCircle();
  console.log(photo);
  photo.mask(maskCanvas);
  image(photo, mid.x - photo.width * 0.25, mid.y - photo.height * 0.25, photo.width * 0.5, photo.height * 0.5);
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
