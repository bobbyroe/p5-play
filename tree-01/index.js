// Tree code converted from Jean-no's excellent Processing example : http://www.openprocessing.org/visuals/?visualID=1758
let tree;
let mid = { x: 0, y: 0 };
const TO_RADIANS = Math.PI / 180;

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
  function _update () {
    counter += 1;
    growthSpeed *= 0.8;
    growthSpeed += (1 - growth) * random(0.005, 0.1);
    growth += growthSpeed;
  }

  function render() {
    _update();
    push();
    stroke("white");
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
  translate(mid.x, mid.y + 400);
  rotate(-Math.PI / 2);
  tree.render();
  pop();
}
