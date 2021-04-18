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
  let { length, angleY, angleZ, generation } = props;
  let children = [];
  let counter = 0;
  let multiplier = random(0.01, 0.1);
  let growth = 0;
  let growthSpeed = 0;
  let probability = Math.random();
  const wind = 2; // larger = more wind
  const maxGenerations = 4;
  if (generation < maxGenerations) {
    // if (probability < 0.75) {
      num = random(1,4);
      for (let i = 0; i < num; i += 1) {
      children.push(
        getBranch({
          length: length * 0.7, // random(0.7, 0.95),
          angleY: 100 * i, // random(100, 140),
          angleZ: 20 + 20 * i, // random(20, 50),
          generation: generation + 1,
        })
      );
    }

    if (probability > 0.25) {
      children.push(
        getBranch({
          length: length * random(0.7, 0.95),
          angleY: random(100, 140),
          angleZ: random(20, 50),
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
    strokeWeight(map(generation, 1, maxGenerations, 10, 2));// (2 + maxGenerations - generation);
    rotateY(angleY + (Math.sin(counter * multiplier) * wind));
    rotateZ(angleZ + (Math.sin(counter * multiplier) * wind));
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
  angleMode(DEGREES);
  tree = getBranch({ length: 300, angleY: 0, angleZ: 0, generation: 0 });
  mid = {
    x: windowWidth * 0.5,
    y: windowHeight * 0.5,
  };
}

function draw() {
  clear();
  randomSeed(1);
  translate(0, 500, 0);
  rotateY(frameCount * 0.5);
  tree.render();
}
