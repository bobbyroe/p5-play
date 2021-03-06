let paused = false;
let mid = { x: 0, y: 0 };
// const colors = ["#869482", "#C3DDD2", "#729FA2", "#576D5D", "#26242A"];
const colors = [
  "#000000",
  "#222222",
  "#444444",
  "#666666",
  "#888888",
  "#AAAAAA",
  "#CCCCCC",
  "#EEEEEE",
  // "#FF0044",
  "#0099FF",
  "#BB6699"
];
let squareSize;
// https://medium.com/@shvembldr/how-to-make-your-first-generative-art-with-p5-js-3f10afc07de2

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

function drawBorderShapes(polygon) {
  const borderColors = [random(colors), random(colors)];
  const len = polygon.length;
  polygon.forEach((sq, i) => {
    const nextSq = polygon[(i + 1) % len];
    push();
    noStroke();
    if (i % 2 === 0) {
      fill(borderColors[0]);
    } else {
      fill(borderColors[1]);
    }
    beginShape();
    vertex(sq.x, sq.y);
    vertex(0, 0);
    vertex(nextSq.x, nextSq.y);
    endShape(CLOSE);
    pop();
  });
}

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

function getGrid() {
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

function drawGrid(grid) {
  grid.forEach((g) => {
    const { x, y, rowIndex, colIndex, cellSide } = g;
    const halfWidth = cellSide * 0.5;
    noStroke();
    if (rowIndex % 2 === 0 && colIndex % 2 === 0) {

      // rect
      fill(random(colors));
      rect(x, y, cellSide, cellSide);
      // smaller offset rect
      fill(`${random(colors)}88`);
      rect(x + 5, y + 5, 25, 25);
      // smaller rect
      fill(random(colors));
      rect(x, y, 25, 25);
      // tiny rect
      fill(random(colors));
      rect(x, y, 2, 2);
    } else {
      // triangle with gradient
      makeLinearGradient({
        x1: x - halfWidth,
        y1: y - halfWidth,
        x2: x + halfWidth,
        y2: y - halfWidth,
        colorStops: [0, 1],
        colors: [`${random(colors)}BB`, `${random(colors)}BB`],
      });
      triangle(
        x - halfWidth,
        y - halfWidth,
        x + halfWidth,
        y - halfWidth,
        x + halfWidth,
        y + halfWidth
      );
      // triangle
      fill(random(colors));
      triangle(
        x - halfWidth,
        y - halfWidth,
        x - halfWidth,
        y + halfWidth,
        x + halfWidth,
        y + halfWidth
      );
      // circle
      fill(random(colors));
      circle(x, y, 50);
      // tiny offset circle
      fill(random(colors));
      circle(x + 5, y + 5, 5);
      // even tinier circle
      fill(random(colors));
      circle(x, y, 3);
      // coupla lines
      strokeWeight(2);
      stroke(random(colors));
      line(x - halfWidth, y, x + halfWidth, y);
      stroke(random(colors));
      line(x, y - halfWidth, x, y + halfWidth);
    }
  });
}

function generate() {
  const squareVertices = getSquareVertices(squareSize);
  const square = getSquare(squareVertices);
  const grid = getGrid();
  const numCols = 3;
  const numRows = 3;
  const startPos = {
    x: width * 0.5 - squareSize * 1.41,
    y: height * 0.5 - squareSize * 1.41,
  };

  
  translate(squareSize * 1.41, -squareSize * 0.5);
  rotate(45);
  for (let c = 0; c < numCols; c += 1) {
    for (let r = 0; r < numRows; r += 1) {
      push();
      translate(
        startPos.x + squareSize * 1.41 * c,
        startPos.y + squareSize * 1.41 * r
      );
      drawBorderShapes(square);
      drawGrid(grid);
      pop();
    }
  }
};

function makeLinearGradient(opts) {
  const ctx = drawingContext;
  const { x1, y1, x2, y2, colorStops, colors } = opts;
  const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
  colorStops.forEach((stop, i) => {
    gradient.addColorStop(stop, colors[i]);
    ctx.fillStyle = gradient;
    return gradient;
  });
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  rectMode(CENTER);
  squareSize = 500;

  generate();

}

function draw() {
  if (paused === false) {
  }
}

function keyPressed() {
  if (keyCode === ESCAPE) {
    paused = !paused;
  }
  if (key === 'g') {
    generate();
  }
  if (key === 's') {
    saveCanvas("shvembldr-xxx", "png");
  }
  return false;
}
