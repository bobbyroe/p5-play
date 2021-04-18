let artGrid = [];
let lineGrid = [];
let startPos = {};
let spacing;
let canvas;
let dropShadowCanvas;
let glowCanvas;
let canvases;

function getShape(opts) {
  const { r, c } = opts;
  const y = startPos.y + r * spacing;
  const drawFns = ['rect', 'circle'];
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
    lineDashes: random() > 0.5 ? [0, 0] : [random(10, 20), random(10, 20)]
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
  const curCanvas = random(canvases);
  if (isVisible === true) {
    curCanvas.push();
    curCanvas.fill(fillColor);
    curCanvas.stroke(strokeColor);
    curCanvas.strokeWeight(lineWidth);
    curCanvas.translate(x, y);
    curCanvas.rotate(rotation);
    curCanvas[fn](0, 0, size, size);
    curCanvas.pop();
  }
}

function drawLine(props) {
  const { c, r, strokeColor, lineWidth, isVisible, rotation, lineDashes } = props;
  const x = startPos.x + c * spacing;
  const y = startPos.y + r * spacing;
  const curCanvas = random(canvases);
  if (isVisible === true) {
    curCanvas.push();
    curCanvas.stroke(strokeColor);
    curCanvas.strokeWeight(lineWidth);
    curCanvas.drawingContext.setLineDash(lineDashes);
    curCanvas.translate(x, y);
    curCanvas.rotate(rotation);
    curCanvas.line(0, 0, spacing * random(2), 0);
    curCanvas.pop();
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

function layerShapesOnGrid () {
  console.log('BURP');
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

function getOffScreenCanvas () {
  const c = createGraphics(windowWidth, windowHeight);
  c.colorMode(HSB);
  c.angleMode(DEGREES);
  c.rectMode(CENTER);
  c.noLoop();
  return c;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  canvas = getOffScreenCanvas();
  dropShadowCanvas = getOffScreenCanvas();
  dropShadowCanvas.drawingContext.filter = 'drop-shadow(0 0 30px rgba(0, 0, 0, 0.8))';
  glowCanvas = getOffScreenCanvas();
  glowCanvas.drawingContext.filter = 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.6))';
  canvases = [dropShadowCanvas, glowCanvas, canvas];
  
  // grid
  createGrid();
  layerShapesOnGrid();
  drawLines();
  drawGrid();
  canvases.forEach( c => image(c, 0, 0));  
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

// ??? 
// here's how the 'zebra' texture could work
// draw shapes on first offscreen canvas
// load photo (or draw on another offscreen canvas)
// mask photo with first offscreen canvas
// image(photo);

// save grid layout as json
// load grid json
