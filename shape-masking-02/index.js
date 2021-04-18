let paused = false;
let mid = { x: 0, y: 0 };
let ctx;

function getWedges() {
  const arr = [];
  const numPoints = 128;
  const radius = 600;
  const inc = TAU / numPoints;
  let counter = 0;
  let currentWedge = {
    points: [{ x: mid.x, y: mid.y }],
    n: 0,
  };
  for (let p = 0; p < numPoints; p += 1) {
    currentWedge.points.push({
      x: mid.x + cos(counter) * radius,
      y: mid.y + sin(counter) * radius,
    });
    counter += inc;
    if (p % 2 === 1) {
      arr.push(currentWedge);
      currentWedge = {
        points: [{ x: mid.x, y: mid.y }],
        n: p,
      };
    }
  }
  return arr;
}

function drawWedges(options) {
  const { wedges, canvas } = options;
  wedges.forEach((w) => {
    const { points } = w;
    // canvas.fill(random(360), 100, 100);
    canvas.fill(255);
    canvas.beginShape();
    points.forEach((p) => {
      const { x, y } = p;
      canvas.vertex(x, y);
    });
    canvas.endShape(CLOSE);
  });
}

function drawCircle(canvas) {
  canvas.noFill();
  canvas.strokeWeight(1);
  canvas.stroke(0, 0, 100);
  canvas.circle(mid.x, mid.y, 300);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  const sunburstCanvas = createGraphics(windowWidth, windowHeight);
  const squaresCanvas = createGraphics(windowWidth, windowHeight);
  const compCanvas = createGraphics(windowWidth, windowHeight);
  mid = {
    x: windowWidth * 0.5,
    y: windowHeight * 0.5,
  };

  sunburstCanvas.colorMode(HSB);
  sunburstCanvas.angleMode(DEGREES);
  sunburstCanvas.noStroke();

  squaresCanvas.noStroke();

  const numRows = 5;
  const numCols = 5;
  const spacing = 205;
  for (let c = 0; c < numCols; c += 1) {
    for (let r = 0; r < numRows; r += 1) {
      squaresCanvas.push();
      squaresCanvas.translate(
        mid.x * 0.25 + c * spacing + random(-20, 20),
        mid.y * 0.25 + r * spacing + random(-20, 20)
      );
      squaresCanvas.rotate(random(-45,45));
      squaresCanvas.rect(0, 0, 160);
      squaresCanvas.pop();
    }
  }
  const wedges = getWedges();
  drawWedges({ wedges, canvas: sunburstCanvas });

  compCanvas.image(sunburstCanvas, 0, 0);
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
