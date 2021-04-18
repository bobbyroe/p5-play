let paused = false;
let mid = { x: 0, y: 0 };
let ctx;

function drawCircle(canvas) {
  canvas.noFill();
  canvas.strokeWeight(1);
  canvas.stroke(0, 0, 100);
  canvas.circle(mid.x, mid.y, 300);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  const circlesCanvas = createGraphics(windowWidth, windowHeight);
  const squaresCanvas = createGraphics(windowWidth, windowHeight);
  const compCanvas = createGraphics(windowWidth, windowHeight);
  mid = {
    x: windowWidth * 0.5,
    y: windowHeight * 0.5,
  };

  circlesCanvas.colorMode(HSB);
  circlesCanvas.angleMode(DEGREES);
  circlesCanvas.noStroke();
  
  squaresCanvas.noStroke();
  squaresCanvas.fill(255);
  squaresCanvas.rectMode(CENTER);

  const numRows = 10;
  const numCols = 10;
  const spacing = 105;
  for (let c = 0; c < numCols; c += 1) {
    for (let r = 0; r < numRows; r += 1) {
      circlesCanvas.fill(random(360), 100, 100);
      circlesCanvas.circle(
        mid.x * 0.25 + c * spacing + random(-20, 20),
        mid.y * 0.25 + r * spacing + random(-20, 20),
        100
      );
      circlesCanvas.fill(random(360), 100, 100);
      circlesCanvas.circle(
        mid.x * 0.25 + c * spacing + random(-20, 20),
        mid.y * 0.25 + r * spacing + random(-20, 20),
        30
      );
      squaresCanvas.rect(
        mid.x * 0.25 + c * spacing + random(-20, 20),
        mid.y * 0.25 + r * spacing + random(-20, 20),
        60
      );
    }
  }

  compCanvas.image(circlesCanvas, 0, 0);
  compCanvas.drawingContext.globalCompositeOperation = "destination-in";
  compCanvas.image(squaresCanvas, 0, 0);
  image(compCanvas, 0, 0);
  
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
