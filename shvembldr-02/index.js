let artGrid;
let startPos = {};
let spacing;
function getShape(opts) {
  const { r, c } = opts;
  const y = startPos.y + r * spacing;
  const drawFns = [rect, circle];
  const minSize = 10;
  const shape = {
    size:
      random() > 0.05
        ? random(minSize, minSize + y * 0.1)
        : random(minSize, 250),
    rotation: 45 * round(random()),
    fn: random(drawFns),
    r, c
  };
  return shape;
}

function drawShape(shape) {
  const { r, c, size, rotation, fn } = shape;
  const x = startPos.x + c * spacing;
  const y = startPos.y + r * spacing;
  push();
  translate(x, y);
  rotate(rotation);
  fn(0, 0, size, size);
  pop();
}

function creatGrid() {
  const arr = [];
  const numCols = 10;
  const numRows = 10;
  spacing = windowWidth * 0.1;
  startPos = {
    x: spacing * 0.5,
    y: spacing * 0.5,
  };
  for (let c = 0; c < numCols; c += 1) {
    for (let r = 0; r < numRows; r += 1) {
      arr.push(
        getShape({ c, r })
      );
    }
  }
  return arr;
}

function drawGrid() {
  artGrid.forEach((shape) => {
    drawShape(shape);
  });
}

function resizeGrid () {

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  angleMode(DEGREES);
  rectMode(CENTER);
  noLoop();

  // grid
  artGrid = creatGrid();
  drawGrid();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  clear();
  spacing = windowWidth * 0.1;
  drawGrid();
}

function keyPressed() {
  if (key === 'g') {
    // grid
    clear();
    artGrid = creatGrid();
    drawGrid();
  }
  if (key === 's') {
    saveCanvas("br-grid-00", "png");
  }
  // return false;
}