let lineGrid = [];
let startPos = {};
let spacing;
let mid = { x: 0, y: 0 };

function getWedges() {
  angleMode(RADIANS);
  const arr = [];
  const numPoints = random(100, 600);
  const radius = 1000;
  const inc = TAU / numPoints;
  let counter = 0;
  const epicenter = {
    x: mid.x + random(-200, 200),
    y: mid.y + random(-200, 200),
  };
  let currentWedge = {
    points: [{ x: epicenter.x, y: epicenter.y }],
    n: 0,
  };
  for (let p = 0; p < numPoints; p += 1) {
    currentWedge.points.push({
      x: epicenter.x + cos(counter) * radius,
      y: epicenter.y + sin(counter) * radius,
    });
    counter += inc;
    if (p % 2 === 1) {
      arr.push(currentWedge);
      currentWedge = {
        points: [{ x: epicenter.x, y: epicenter.y }],
        n: p,
      };
    }
  }
  return arr;
}

function drawWedges(options) {
  const { wedges, canvas, hue } = options;
  wedges.forEach((w) => {
    const { points } = w;
    canvas.fill(100);
    canvas.beginShape();
    points.forEach((p) => {
      const { x, y } = p;
      canvas.vertex(x, y);
    });
    canvas.endShape(CLOSE);
  });
}

function getShape(opts) {
  const { r, c } = opts;
  const y = startPos.y + r * spacing;
  const drawFns = ["rect", "circle"];
  const minSize = 10;
  const style = {
    lineWidth: random() > 0.2 ? random(0.5, 5) : 0,
    strokeColor: random() > 0.2 ? random(0, 100) : random(101, 199),
    fillColor: random(255),
    isVisible: random() > 0.25 ? true : false,
  };
  const shape = {
    size:
      random() > 0.05
        ? random(minSize, minSize + y * 0.1)
        : random(minSize, 350),
    rotation: 0.7854 * round(random()),
    fn: random(drawFns),
    r,
    c,
  };
  return { ...shape, ...style };
}

function getLine(opts) {
  const style = {
    lineWidth: random() > 0.2 ? random(0.5, 5) : 0,
    strokeColor: random() > 0.2 ? random(0, 100) : random(101, 199),
    isVisible: random() > 0.25 ? true : false,
  };
  return { ...opts, ...style, rotation: 90 * round(random(3)) };
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
function getLineGrid() {
  const arr = [];
  const numCols = 10;
  const numRows = 10;
  spacing = windowWidth * 0.09;
  startPos = {
    x: spacing * 1,
    y: spacing * 1,
  };
  for (let c = 0; c < numCols; c += 1) {
    for (let r = 0; r < numRows; r += 1) {
      arr.push(getLine({ c, r }));
    }
  }
  return arr;
}

function getArtGrid() {
  const arr = [];
  // lineGrid = [];
  const numCols = 10;
  const numRows = 10;
  spacing = windowWidth * 0.09;
  startPos = {
    x: spacing * 1,
    y: spacing * 1,
  };
  for (let c = 0; c < numCols; c += 1) {
    for (let r = 0; r < numRows; r += 1) {
      arr.push(getShape({ c, r }));
      // lineGrid.push(getLine({ c, r }));
    }
  }
  return arr;
}

function getMoreArtGrid(artGrid) {
  const arr = [];
  const threshold = 100;
  artGrid.forEach( shape => {
    const { size, r, c } = shape;
    if (size > threshold) {
      const stackedShape = getShape({c, r});
      stackedShape.size = size - 50;
      arr.push(stackedShape);
    }
  });
  return arr;
}
function drawShape(options) {
  const {shape, shapesCanvas, maskCanvas} = options;
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
  } = shape;
  const x = startPos.x + c * spacing;
  const y = startPos.y + r * spacing;
  const needsTexture = random() > 0.8;
  if (isVisible === true) {
    shapesCanvas.push();
    shapesCanvas.fill(fillColor);
    shapesCanvas.stroke(strokeColor);
    shapesCanvas.strokeWeight(lineWidth);
    shapesCanvas.translate(x, y);
    shapesCanvas.rotate(rotation);
    shapesCanvas[fn](0, 0, size, size);
    shapesCanvas.pop();
    if (needsTexture === true) {
      maskCanvas.push();
      maskCanvas.fill(100);
      maskCanvas.strokeWeight(0);
      maskCanvas.translate(x, y);
      maskCanvas.rotate(rotation);
      maskCanvas[fn](0, 0, size, size);
      maskCanvas.pop();
    }
  }
}

function drawGrid(artData) {
  const { artGrid, shapesCanvas, maskCanvas } = artData;
  artGrid.forEach((shape) => {
    drawShape({shape, shapesCanvas, maskCanvas});
  });
}

function drawLines(arr) {
  arr.forEach((line) => {
    drawLine(line);
  });
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  const shapesCanvas = createGraphics(windowWidth, windowHeight);
  const maskCanvas = createGraphics(windowWidth, windowHeight);
  const shapesCanvas2 = createGraphics(windowWidth, windowHeight);
  const maskCanvas2 = createGraphics(windowWidth, windowHeight);
  const sunburstCanvas = createGraphics(windowWidth, windowHeight);
  const sunburstCanvas2 = createGraphics(windowWidth, windowHeight);

  const compositeCanvas = createGraphics(windowWidth, windowHeight);
  compositeCanvas.angleMode(DEGREES);
  compositeCanvas.noStroke();
  compositeCanvas.colorMode(HSB);

  const compositeCanvas2 = createGraphics(windowWidth, windowHeight);
  compositeCanvas2.angleMode(DEGREES);
  compositeCanvas2.noStroke();
  compositeCanvas2.colorMode(HSB);

  mid = {
    x: windowWidth * 0.5,
    y: windowHeight * 0.5,
  };
  colorMode(HSB);
  angleMode(DEGREES);
  rectMode(CENTER);
  noLoop();

  // grid
  drawLines(getLineGrid());
  const artGrid = getArtGrid();
  drawGrid({ artGrid, shapesCanvas, maskCanvas });
  const moreArtGrid = getMoreArtGrid(artGrid);
  drawGrid({artGrid: moreArtGrid, shapesCanvas: shapesCanvas2, maskCanvas: maskCanvas2});
  //
  drawWedges({ wedges: getWedges(), canvas: sunburstCanvas, hue: 40 });
  drawWedges({ wedges: getWedges(), canvas: sunburstCanvas2, hue: 40 });

  compositeCanvas.image(sunburstCanvas, 0, 0);
  compositeCanvas.drawingContext.globalCompositeOperation = "destination-in";
  compositeCanvas.image(maskCanvas, 0, 0);

  compositeCanvas2.image(sunburstCanvas2, 0, 0);
  compositeCanvas2.drawingContext.globalCompositeOperation = "destination-in";
  compositeCanvas2.image(maskCanvas2, 0, 0);

  image(shapesCanvas, 0, 0);
  image(compositeCanvas, 0, 0);
  image(shapesCanvas2, 0 ,0);
  image(compositeCanvas2, 0, 0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  clear();
  spacing = windowWidth * 0.09;
  drawGrid(getArtGrid());
}

function keyPressed() {
  if (key === "g") {
    clear();
    // drawLines();
    drawGrid(getArtGrid());
  }
  if (key === "s") {
    saveCanvas("br-grid-00", "png");
  }
  // return false;
}

// modularize the artGrid
// so that I can draw *n* grids

// save grid layout as json
// load grid json
