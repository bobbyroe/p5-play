let artGrid = [];
let lineGrid = [];
let startPos = {};
let spacing;

function getShape(opts) {
  const { r, c } = opts;
  const y = startPos.y + r * spacing;
  const drawFns = [rect, circle];
  const minSize = 10;
  const style = {
    lineWidth: random() > 0.2 ? random(0.5, 5) : 0,
    strokeColor: random() > 0.2 ? random(0, 100) : random(101, 199),
    fillColor: random(5, 100),
    isVisible: random() > 0.25 ? true : false,
  };
  const shape = {
    size:
      random() > 0.05
        ? random(minSize, minSize + y * 0.1)
        : random(minSize, 350),
    rotation: 45 * round(random()),
    fn: random(drawFns),
    r,
    c,
  };
  return { ...shape, ...style };
}

function getLine(opts) {
  // const { c, r } = opts;
  const style = {
    lineWidth: random() > 0.2 ? random(0.5, 5) : 0,
    strokeColor: random() > 0.2 ? random(0, 100) : random(101, 199),
    isVisible: random() > 0.25 ? true : false,
  };
  return { ...opts, ...style, rotation: 90 * round(random(3)), };
}

function drawShape(props) {
  const {
    r,
    c,
    size,
    rotation,
    fn,
    lineWidth,
    strokeColor,
    isVisible,
    fillColor,
  } = props;
  const x = startPos.x + c * spacing;
  const y = startPos.y + r * spacing;
  if (isVisible === true) {
    push();
    fill(fillColor);
    stroke(strokeColor);
    strokeWeight(lineWidth);
    translate(x, y);
    rotate(rotation);
    fn(0, 0, size, size);
    pop();
  }
}

function drawLine(props) {
  const { c, r, strokeColor, lineWidth, isVisible, rotation } = props;
  const x = startPos.x + c * spacing;
  const y = startPos.y + r * spacing;
  if (isVisible === true) {
    push();
    stroke(strokeColor);
    strokeWeight(lineWidth);
    translate(x, y);
    rotate(rotation);
    line(0, 0, spacing * random(2), 0);
    pop();
  }
}

function createGrid() {
  artGrid = [];
  lineGrid = [];
  const numCols = 10;
  const numRows = 10;
  spacing = windowWidth * 0.09;
  startPos = {
    x: spacing * 1,
    y: spacing * 1,
  };
  for (let c = 0; c < numCols; c += 1) {
    for (let r = 0; r < numRows; r += 1) {
      artGrid.push(getShape({ c, r }));
      lineGrid.push(getLine({ c, r }));
    }
  }
}

function drawGrid() {
  artGrid.forEach((shape) => {
    drawShape(shape);
  });
}

function drawLines() {
  lineGrid.forEach((line) => {
    drawLine(line);
  });
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  angleMode(DEGREES);
  rectMode(CENTER);
  noLoop();

  // grid
  createGrid();
  drawLines();
  drawGrid();
  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  clear();
  spacing = windowWidth * 0.09;
  drawGrid();
}

function keyPressed() {
  if (key === "g") {
    clear();
    createGrid();
    drawLines();
    drawGrid();
  }
  if (key === "s") {
    saveCanvas("br-grid-00", "png");
  }
  // return false;
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

// save grid layout as json
// load grid json
