let paused = false;
let mid = { x: 0, y: 0 };

function getNumLoops(a, b, c, d) {
  if (!c) {
    c = a;
  }
  if (!d) {
    d = b;
  }
  let dividend = Math.max(a, b);
  let divisor = Math.min(a, b);
  let remainder = dividend % divisor;
  let numLoops = 0;
  if (remainder === 0) {
    numLoops = (c * d) / divisor / d;
  } else {
    numLoops = getNumLoops(divisor, remainder, c, d);
  }
  return numLoops;
}

function drawCircle() {
  clear();
  const scaleFactor = 5;
  let ringCircumference = 105;
  let wheelCircumference = 85;
  let fraction = 0.78;
  ringCircumference *= scaleFactor;
  wheelCircumference *= scaleFactor;
  let x = mid.x;
  let y = mid.y;
  let radius = ringCircumference - wheelCircumference;

  let ratio = ringCircumference / wheelCircumference - 1;
  let rate = (1 / ratio) * 0.02; // speed of drawing & curve fidelity
  let pen;
  let prevPen;
  let counter = 0;
  const numLoops = getNumLoops(ringCircumference, wheelCircumference);
  const counterMax = (Math.PI * 2 * numLoops) / (ratio + 1.0) + 0.2;
  const clampValue = 0.85;
  while (counter < counterMax) {
    pen ={
      x:
        x + radius * constrain(cos(counter), -clampValue, clampValue),
      y:
        y + radius * constrain(sin(counter), -clampValue, clampValue),
    };
    if (prevPen === undefined) {
      prevPen = {
        x: pen.x,
        y: pen.y,
      };
    }
    counter += rate;
    stroke(0, 100, 100);
    strokeWeight(3);
    line(prevPen.x, prevPen.y, pen.x, pen.y);

    prevPen = {
      x: pen.x,
      y: pen.y,
    };
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  mid = {
    x: windowWidth * 0.5,
    y: windowHeight * 0.5,
  };
  drawCircle();
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
