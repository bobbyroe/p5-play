let paused = false;
let mid = { x: 0, y: 0 };

function getWedges() {
  const arr = [];
  const numPoints = 32;
  const radius = 600;
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

function drawWedges(wedges) {
  wedges.forEach((w) => {
    const { points } = w;
    fill(random(360), 100, 100);
    beginShape();
    points.forEach( p => {
      const { x, y } = p;
      vertex(x, y);
    });
    endShape(CLOSE);
  });
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  mid = {
    x: windowWidth * 0.5,
    y: windowHeight * 0.5,
  };
  
  noStroke();

  const wedges = getWedges();
  drawWedges(wedges);
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
