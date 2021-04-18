let mid = { x: 0, y: 0 };
let tree;

function getLeaf() {
  const size = random(5, 15);
  let hue = random(80, 140);
  let brightness = random(50, 100);

  let counter = 0;
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
    sphere(curSize);
  }
  return {
    render
  }
}

function getBranch(props) {
  let { length, angleX, angleZ, generation } = props;
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
          angleX: random(0, Math.PI / 6),
          angleZ: random(-Math.PI /6, Math.PI /6),
          generation: generation + 1,
        })
      );
    }
    if (probability > 0.25) {
      children.push(
        getBranch({
          length: length * random(0.7, 0.95),
          angleX: random(0, -Math.PI / 6),
          angleZ: random(-Math.PI /6, Math.PI / 6),
          generation: generation + 1,
        })
      );
    }
  }
  if (generation === maxGenerations) {
    children.push(
      getLeaf()
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
    strokeWeight(map(generation, 1, maxGenerations, 50, 5));// (2 + maxGenerations - generation);
    rotateX(angleX + (Math.sin(counter * multiplier) * Math.PI) / windResistance);
    rotateZ(angleZ);
    line(0, 0, 0, 0, -length * growth, 0);

    translate(0, -length * growth, 0);

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
  createCanvas(windowWidth, windowHeight, WEBGL);
  colorMode(HSB);
  angleMode(RADIANS);
  tree = getBranch({ length: 180, angleX: 0, angleZ: 0, generation: 0 });
  mid = {
    x: windowWidth * 0.5,
    y: windowHeight * 0.5,
  };
}

function draw() {
  clear();
  randomSeed(1);
  translate(0, 500, 0);
  rotateY(frameCount * 0.01);
  tree.render();
}
