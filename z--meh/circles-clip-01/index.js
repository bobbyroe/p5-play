let paused = false;
let mid = { x: 0, y: 0 };
let photo;
let ctx;

function drawCircle (canvas) {
  canvas.noFill();
  canvas.strokeWeight(1);
  canvas.stroke(0, 0, 100);
  canvas.circle(mid.x, mid.y, 300);
}

function preload () {
  photo = loadImage('../assets/DRAW-ME.jpg');
}

//
function getSquareVertices(squareSize) {
  const verts = [];

  const numSides = 4;
  let startAngle = 45;
  for (let i = 0; i < numSides; i += 1) {
    verts.push({
      x: squareSize * cos(startAngle),
      y: squareSize * sin(startAngle),
    });
    startAngle += 360 / numSides;
  }
  return verts;
}

function getSquare(vertices) {
  const squareSideDotsCount = 30;
  const len = vertices.length;
  const arr = [];
  vertices.forEach((currentVertex, i) => {
    let nextVertex = vertices[(i + 1) % len];
    for (let j = 0; j < squareSideDotsCount; j += 1) {
      let amt = j / squareSideDotsCount;
      arr.push({
        x: lerp(currentVertex.x, nextVertex.x, amt),
        y: lerp(currentVertex.y, nextVertex.y, amt),
      });
    }
  });
  return arr;
}

function getGrid(squareSize) {
  const arr = [];
  const innerRectSide = squareSize * 1.3;
  const cellCount = 8;
  const pointCount = cellCount ** 2;
  const cellSide = innerRectSide / cellCount;
  const startPoint = -(cellSide * (cellCount - 1)) / 2;
  
  for (let rowIndex = 0; rowIndex < cellCount; rowIndex += 1) {
    for (let colIndex = 0; colIndex < cellCount; colIndex += 1) {
      arr.push({
        x: startPoint + colIndex * cellSide,
        y: startPoint + rowIndex * cellSide,
        rowIndex,
        colIndex,
        cellSide
      });
    }
  }
  return arr;
}

function drawBorderShapes(options) {
  const { canvas, polygon } = options;
  const colors = ['#FFF', '#000', '#888', '#444', '#CCC'];
  const borderColors = ['#F0F0F0', '#101010']; // [random(colors), random(colors)];
  const len = polygon.length;
  polygon.forEach((sq, i) => {
    const nextSq = polygon[(i + 1) % len];
    canvas.push();
    canvas.noStroke();
    if (i % 2 === 0) {
      canvas.fill('rgba(0,0,0,0.0)');
    } else {
      canvas.fill(borderColors[0]);
    }
    canvas.beginShape();
    canvas.vertex(sq.x, sq.y);
    canvas.vertex(0, 0);
    canvas.vertex(nextSq.x, nextSq.y);
    canvas.endShape(CLOSE);
    canvas.pop();
  });
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  ctx = drawingContext;
  const circlesCanvas = createGraphics(photo.width * 0.5, photo.height * 0.5);
  // const maskCanvas = createGraphics(photo.width * 0.5, photo.height * 0.5);
  const circCtx = circlesCanvas.drawingContext;
  // colorMode(HSB);
  circlesCanvas.angleMode(DEGREES);
  circlesCanvas.rectMode(CENTER);
  mid = {
    x: windowWidth * 0.5,
    y: windowHeight * 0.5,
  };
  // circle mask
  // drawCircle(maskCanvas);
  // photo.mask(maskCanvas);
  // image(photo, mid.x - photo.width * 0.25, mid.y - photo.height * 0.25, photo.width * 0.5, photo.height * 0.5);


  // clipping
  circCtx.save();
  circCtx.beginPath();
  circlesCanvas.noFill();
  // strokeWeight(5);
  // stroke(255);
  const numCircles = 10;
  for (let i = 0; i < numCircles; i += 1) {
    circlesCanvas.circle(mid.x + random(-300, 300), mid.y + random(-300, 300), random(50, 200));
    circCtx.clip();
    circlesCanvas.push();
    circlesCanvas.translate(mid.x, mid.y);
    const squareSize = 565;
    // const grid = getGrid(squareSize);
    drawBorderShapes({ canvas: circlesCanvas, polygon: getSquare(getSquareVertices(squareSize))});
    circlesCanvas.pop();
    circCtx.restore();
    
  }
  image(circlesCanvas, 0, 0);
  // fill(180,100 ,100);
  // rect(mid.x + 300, mid.y, 350, 350);

  // ctx.restore();
  // strokeWeight(2);
  // stroke(128);
  // fill(240, 100 ,100);
  // rect(mid.x + 225, mid.y - 150, 100, 100);

  // draw sunburst square
  
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
