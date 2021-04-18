let paused = false;
let mid = { x: 0, y: 0 };
let ctx;

function getWedgeObj() {
  const numPoints = 32;
  const radius = 600;
  const inc = TAU / numPoints;
  let counter = 0;
  const epicenter = { x: mid.x, y: mid.y };
  let points = [];
  for (let p = 0; p < numPoints; p += 1) {
    points.push({
      x: mid.x + cos(counter) * radius,
      y: mid.y + sin(counter) * radius,
    });
    counter += inc;
  }
  return {points, epicenter};
}

function drawWedges(options) {
  const { wedgeObj, canvas } = options;
  const { points, epicenter } = wedgeObj;
  points.forEach((p, n) => {
    const { x, y } = p;
    if (n % 2 === 0) { 
      canvas.fill(190, 100, 100);
      canvas.beginShape(); 
    }
    canvas.vertex(x, y);
    if (n % 2 === 1) { 
      canvas.vertex(epicenter.x, epicenter.y);
      canvas.endShape(CLOSE);
    }
  });
  points.forEach((p, n) => {
    const { x, y } = p;
    console.log(n);
    if (n % 2 === 1) { 
      canvas.fill(0, 100, 100);
      canvas.beginShape(); 
      console.log(n, 'beginShape');
    }
    
    canvas.vertex(x, y);
    if (n % 2 === 0 && n !== 0) { 
      canvas.vertex(epicenter.x, epicenter.y);
      canvas.endShape(CLOSE);
      console.log(n, "CLOSE");
    }
  });
  // last vertices ...
  canvas.vertex(points[0].x, points[0].y);
  canvas.vertex(epicenter.x, epicenter.y);
  canvas.endShape(CLOSE);
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
      squaresCanvas.rect(
        mid.x * 0.25 + c * spacing + random(-20, 20),
        mid.y * 0.25 + r * spacing + random(-20, 20),
        160
      );
    }
  }
  const wedgeObj = getWedgeObj();
  drawWedges({ wedgeObj, canvas: sunburstCanvas});

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
