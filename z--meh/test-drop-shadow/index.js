let paused = false;
let mid = { x: 0, y: 0 };
let ctx;
let blurCanvas;
function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  angleMode(DEGREES);
  ctx = drawingContext;
  blurCanvas = createGraphics(windowWidth, windowHeight);
  mid = {
    x: windowWidth * 0.5,
    y: windowHeight * 0.5,
  };
  ctx.setLineDash([5, 5]);
  circle(mid.x + 200, mid.y + 200, 100);
  rect(800, 200, 200, 200);

  // blur
  blurCanvas.push();
  blurCanvas.drawingContext.filter = 'blur(25px)';
  blurCanvas.translate(1000, 1000);
  blurCanvas.rotate(45);
  blurCanvas.rect(0, 0, 100);
  blurCanvas.pop();
  image(blurCanvas, 0, 0);

  // drop shadow
  ctx.filter = 'drop-shadow(0 0 50px white)';
  // ctx.shadowOffsetX = 10;
  // ctx.shadowOffsetY = 10;
  // ctx.shadowBlur = 10;
  // ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
  ctx.setLineDash([20, 20]);
  circle(mid.x, mid.y, 300);
  rect(200, 200, 200, 200);

  circle(mid.x - 200, mid.y + 200, 100);
  rect(200, 1000, 200, 200);
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

// here's how the 'zebra' texture could work
// draw shapes on first offscreen canvas
// load photo (or draw on another offscreen canvas)
// mask photo with first offscreen canvas
// image(photo);


// Here's how the drop shadow could work:
// create a offscreen canvas
// draw shit on it
// apply filter to canvas
// image(offscreenCanvas)
// enjoy!