let paused = false;
let mid = { x: 0, y: 0 };
let paper;
let guidePaper;

function getNumLoops(a, b, c, d) {
  if (!c) {
    c = a;
  }
  if (!d) {
    d = b;
  }
  let dividend = Math.max(a, b);
  let divisor = Math.min(a, b);
  let quotient = Math.floor(dividend / divisor);
  let remainder = dividend % divisor;
  let numLoops = 0;
  if (remainder === 0) {
    numLoops = (c * d) / divisor / d;
  } else {
    numLoops = getNumLoops(divisor, remainder, c, d);
  }
  return numLoops;
}

function drawSpirograph(opts) {
  guidePaper.clear();
  const scaleFactor = 5;
  let { ringCircumference, wheelCircumference, fraction, rotation, hue, saturation, brightness } = opts;
  ringCircumference *= scaleFactor;
  wheelCircumference *= scaleFactor;
  let x = mid.x;
  let y = mid.y;
  const radius = ringCircumference - wheelCircumference;

  let ratio = ringCircumference / wheelCircumference - 1;
  let rate = (1 / ratio) * 0.02; // speed of drawing & curve fidelity
  let pen;
  let prevPen;
  let counter = 0;
  const numLoops = getNumLoops(ringCircumference, wheelCircumference);
  const counterMax = (Math.PI * 2 * numLoops) / (ratio + 1.0) + 0.2;

  guidePaper.push();
  guidePaper.translate(x, y);
  guidePaper.rotate(radians(rotation));
  guidePaper.translate(-x, -y);
  while (counter < counterMax) {
    pen = {
      x:
        x +
        radius * cos(counter) +
        fraction * wheelCircumference * cos(counter * ratio),
      y:
        y +
        radius * sin(counter) -
        fraction * wheelCircumference * sin(counter * ratio),
    };
    if (prevPen === undefined) {
      prevPen = {
        x: pen.x,
        y: pen.y,
      };
    }
    counter += rate;
    guidePaper.stroke(hue, saturation, brightness); //
    guidePaper.strokeWeight(1);
    guidePaper.line(prevPen.x, prevPen.y, pen.x, pen.y);

    prevPen = {
      x: pen.x,
      y: pen.y,
    };
  }
  guidePaper.pop();
}

function saveToPaper() {
  paper.image(guidePaper, 0, 0);
}
const options = {
  ringCircumference: 96,
  wheelCircumference: 84,
  fraction: 0.78, // 'fraction' corresponds to the 'hole' on the wheel, between 0.78 - 0.15
  rotation: 0,
  hue: 0,
  saturation: 100,
  brightness: 100
};

// https://developer.mozilla.org/en-US/docs/Learn/Forms/HTML5_input_types#color_picker_control
function setupSliderControl(props) {
  const { id, outId, attr } = props;
  const slider = document.querySelector(id);
  const output = document.querySelector(outId);
  slider.addEventListener("input", (evt) => {
    const { target } = evt;
    const { value } = target;
    output.textContent = value;
    options[attr] = +value;
    drawSpirograph(options);
  });
}

function setupRadioControls() {
  const footer = document.querySelector("footer");
  footer.addEventListener("change", (evt) => {
    const { target } = evt;
    const { name, id, value } = target;
    console.log(name, id, value);
    if (name === "ring-circ") {
      options.ringCircumference = +value;
      drawSpirograph(options);
    }
    if (name === "wheel-circ") {
      options.wheelCircumference = +value;
      drawSpirograph(options);
    }
  });
}
/*
 *
 * SETUP
 *
 */
function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);
  mid = {
    x: windowWidth * 0.5,
    y: windowHeight * 0.38,
  };

  // "2nd canvas"
  paper = createGraphics(windowWidth - 20, windowHeight - 20);

  // "3rd" canvas"
  guidePaper = createGraphics(windowWidth - 20, windowHeight - 20);
  guidePaper.colorMode(HSB);
  guidePaper.noFill();
  guidePaper.stroke(0, 0, 100);
  guidePaper.strokeWeight(0.5);
  drawSpirograph(options);
  setupSliderControl({
    id: "#fraction",
    outId: "#fraction-output",
    attr: "fraction",
  });
  setupSliderControl({
    id: "#rotation",
    outId: "#rotation-output",
    attr: "rotation",
  });
  setupSliderControl({ id: "#hue", outId: "#hue-output", attr: "hue" });
  setupSliderControl({ id: "#saturation", outId: "#saturation-output", attr: "saturation" });
  setupSliderControl({ id: "#brightness", outId: "#brightness-output", attr: "brightness" });
  setupRadioControls();
}

/*
 *
 * DRAW
 *
 */
function draw() {
  clear();
  if (paused === false) {
    image(guidePaper, 0, 0);
    image(paper, 0, 0);
  }
}
const ringCircumferences = [96, 105];
const wheelCircumference = [
  84,
  80,
  75,
  72,
  63,
  60,
  56,
  52,
  48,
  45,
  42,
  40,
  32,
  30,
  24,
];
let ringIndex = 0;
let wheelIndex = 0;
function keyPressed() {
  const S = 83;
  const SPACE = 32;

  if (keyCode === ESCAPE) {
    paused = !paused;
  }
  if (keyCode === S) {
    saveToPaper();
  }
  if (keyCode === SPACE) {
    saveCanvas("Spirography-xxxx", "png");
  }
}
