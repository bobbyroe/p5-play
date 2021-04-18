let paused = false;
let mid = { x: 0, y: 0 };
let ctx;

function getWedges() {
  const arr = [];
  const numPoints = random(32, 256);
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
    canvas.fill(hue, 100, 100);
    canvas.beginShape();
    points.forEach((p) => {
      const { x, y } = p;
      canvas.vertex(x, y);
    });
    canvas.endShape(CLOSE);
  });
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  const sunburstCanvas = createGraphics(windowWidth, windowHeight);
  const squaresCanvas = createGraphics(windowWidth, windowHeight);
  const compCanvas = createGraphics(windowWidth, windowHeight);

  const sunburstCanvas2 = createGraphics(windowWidth, windowHeight);
  const squaresCanvas2 = createGraphics(windowWidth, windowHeight);
  const compCanvas2 = createGraphics(windowWidth, windowHeight);

  const sunburstCanvas3 = createGraphics(windowWidth, windowHeight);
  const squaresCanvas3 = createGraphics(windowWidth, windowHeight);
  const compCanvas3 = createGraphics(windowWidth, windowHeight);


  mid = {
    x: windowWidth * 0.5,
    y: windowHeight * 0.5,
  };

  [sunburstCanvas, sunburstCanvas2, sunburstCanvas3].forEach((c) => {
    c.colorMode(HSB);
    c.angleMode(DEGREES);
    c.noStroke();
  });

  const squareCanvases = [squaresCanvas, squaresCanvas2, squaresCanvas3];
  squareCanvases.forEach((c) => {
    c.noStroke();
    c.colorMode(HSB);
  });

  const numRows = 5;
  const numCols = 5;
  const spacing = 205;
  let curCanvas;
  for (let c = 0; c < numCols; c += 1) {
    for (let r = 0; r < numRows; r += 1) {
      // curCanvas = random(squareCanvases);
      let deg = round(random()) * 45;
      let fn = random(["rect", "circle"]);
      let size = random(50, 250);
      let value = random(100);
      squareCanvases.forEach(curCanvas => {
        curCanvas.push();
        curCanvas.fill(value);
        curCanvas.translate(
          mid.x * 0.25 + c * spacing,
          mid.y * 0.25 + r * spacing
        );
        curCanvas.rotate(deg);
        // curCanvas.fill(random(255));
        curCanvas[fn](0, 0, size);
        curCanvas.pop();
      });
    }
  }
  const wedges = getWedges();
  drawWedges({ wedges, canvas: sunburstCanvas, hue: 40 });

  const wedges2 = getWedges();
  drawWedges({ wedges: wedges2, canvas: sunburstCanvas2, hue: 60 });

  const wedges3 = getWedges();
  drawWedges({ wedges: wedges3, canvas: sunburstCanvas3, hue: 0 });

  compCanvas.image(sunburstCanvas, 0, 0);
  compCanvas.drawingContext.globalCompositeOperation = "destination-in";
  compCanvas.image(squaresCanvas, 0, 0);

  compCanvas2.image(sunburstCanvas2, 0, 0);
  compCanvas2.drawingContext.globalCompositeOperation = "destination-in";
  compCanvas2.image(squaresCanvas2, 0, 0);

  compCanvas3.image(squaresCanvas3, 0, 0);
  compCanvas3.drawingContext.globalCompositeOperation = "destination-in";
  compCanvas3.image(sunburstCanvas3, 0, 0);

  // image(squaresCanvas, 0, 0);
  image(compCanvas, 0, 0);
  image(compCanvas2, 0, 0);
  image(compCanvas3, 0, 0);
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
