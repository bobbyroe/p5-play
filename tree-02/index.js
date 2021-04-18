// Tree code converted from Jean-no's excellent Processing example : http://www.openprocessing.org/visuals/?visualID=1758
let tree;
let mid = { x: 0, y: 0 };
const TO_RADIANS = Math.PI / 180;

function getLeaf() {
  const size = random(15, 45);
  let hue = random(80, 140);
  let brightness = random(50, 100);
  let rotation = random(-1, 1);
  let otherBrightness = random(50, 100);

  let counter = 0;
  let multiplier = random(0.01, 0.1);
  let growth = 0;
  let growthSpeed = 0;
  const windResistance = 32; // smaller = more wind
  function _update () {
    counter += 1;
    growthSpeed *= 0.8;
    growthSpeed += (1 - growth) * random(0.005, 0.1);
    growth += growthSpeed;
  }
  function render () {
    let curSize = size * growth;
    _update();
    fill(hue, 0, brightness);
    noStroke();
    // ...(x1, y1, cp1x, cp1y, cp2x, cp2y, x2, y2);
    rotate(rotation + (Math.sin(counter * multiplier) * Math.PI) / windResistance);
    bezier(0, 0, curSize * 0.4, curSize * -0.5, curSize, 0, curSize, 0);
    line(0, curSize, 0, 0);
    fill(hue, 0, otherBrightness);
    bezier(0, 0, curSize * 0.4, curSize * 0.5, curSize, 0, curSize, 0);
    line(0, curSize, 0, 0);
  }
  return {
    render
  }
}

function getBranch(props) {
  let { length, angle, generation } = props;
  let children = [];
  let counter = 0;
  let multiplier = random(0.01, 0.1);
  let growth = 0;
  let growthSpeed = 0;
  let probability = Math.random();
  const windResistance = 128; // smaller = more wind
  const maxGenerations = 11;
  if (generation < maxGenerations) {
    if (probability < 0.75) {
      children.push(
        getBranch({
          length: length * random(0.7, 0.95),
          angle: random(0, Math.PI / 6),
          generation: generation + 1,
        })
      );
    }
    if (probability > 0.25) {
      children.push(
        getBranch({
          length: length * random(0.7, 0.95),
          angle: random(0, -Math.PI / 6),
          generation: generation + 1,
        })
      );
    }
  }
  if (generation === maxGenerations) {
    children.push(
      getLeaf({
        length: length * random(0.7, 0.95),
        angle: random(0, -Math.PI / 6),
        generation: generation + 1,
      })
    );
  }
  function _update () {
    counter += 1;
    growthSpeed *= 0.8;
    growthSpeed += (1 - growth) * random(0.005, 0.1);
    growth += growthSpeed;
  }

  function render() {
    _update();
    push();
    stroke(0, 0, 0);
    strokeWeight(2 + maxGenerations - generation);
    rotate(angle + (Math.sin(counter * multiplier) * Math.PI) / windResistance);
    line(0, 0, length * growth, 0);
    translate(length * growth, 0);

    if (growth > 0.6) {
      children.forEach(child => child.render())
    }
    pop();
  }
  return {
    render,
  };
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  angleMode(RADIANS);
  tree = getBranch({ length: 180, angle: 0, generation: 0 });
  mid = {
    x: windowWidth * 0.5,
    y: windowHeight * 0.5,
  };
}

function draw() {
  push();
  clear();
  // background(`rgba(0,0,20,0.05)`);
  translate(mid.x, mid.y + 400);
  rotate(-Math.PI / 2);
  tree.render();
  pop();
}
