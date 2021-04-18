let paused = false;
let mid = { x: 0, y: 0 };
let ctx;
const squares = [];
let squaresCanvas;
let compCanvas;
let sunburstCanvas;

function getWedges() {
  const arr = [];
  const numPoints = 128;
  const radius = 1000;
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

function getSquare(props) {
  const { canvas, r, c } = props;
  const spacing = 205;
  const pos = {
    x: mid.x * 0.25 + c * spacing + random(-100, 100),
    y: mid.y * 0.25 + r * spacing + random(-100, 100),
  };
  const rate = 0.1;
  let goal = {
    x: pos.x,
    y: pos.y,
  };

  const rotation = random(-45, 45);

  function update() {
    if (random() < 0.05) {
      goal = {
        x: pos.x + random(-200, 200),
        y: pos.y + random(-200, 200),
      };
    }
    pos.x -= (pos.x - goal.x) * rate;
    pos.y -= (pos.y - goal.y) * rate;
  }

  function render() {
    const { x, y } = pos;
    canvas.fill(255);
    canvas.push();
    canvas.translate(x, y);
    canvas.rotate(rotation);
    canvas.rect(0, 0, 160);
    canvas.pop();
  }

  return {
    pos,
    update,
    render,
  };
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  sunburstCanvas = createGraphics(windowWidth, windowHeight);
  squaresCanvas = createGraphics(windowWidth, windowHeight);
  compCanvas = createGraphics(windowWidth, windowHeight);
  mid = {
    x: windowWidth * 0.5,
    y: windowHeight * 0.5,
  };

  sunburstCanvas.colorMode(HSB);
  sunburstCanvas.angleMode(DEGREES);
  sunburstCanvas.noStroke();

  squaresCanvas.noStroke();
  squaresCanvas.rectMode(CENTER);

  const numRows = 5;
  const numCols = 5;

  for (let c = 0; c < numCols; c += 1) {
    for (let r = 0; r < numRows; r += 1) {
      squares.push(getSquare({ canvas: squaresCanvas, r, c }));
    }
  }
  const wedges = getWedges();
  drawWedges({ wedges, canvas: sunburstCanvas });

  squares.forEach((s) => {
    s.render();
  });
  // compCanvas.image(sunburstCanvas, 0, 0);
  // compCanvas.drawingContext.globalCompositeOperation = "destination-in";
  // compCanvas.image(squaresCanvas, 0, 0);
  // image(compCanvas, 0, 0);
}

function draw() {
  if (paused === false) {
    clear();
    squaresCanvas.clear();
    // compCanvas.clear();
    // sunburstCanvas.clear();
    squares.forEach((s) => {
      s.update();
      s.render();
    });
    compCanvas.image(sunburstCanvas, 0, 0);
    compCanvas.drawingContext.globalCompositeOperation = "destination-in";
    compCanvas.image(squaresCanvas, 0, 0);
    image(compCanvas, 0, 0);
    
  }
}

function keyPressed() {
  if (keyCode === ESCAPE) {
    paused = !paused;
  }
  return false;
}
