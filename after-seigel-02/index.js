let paused = false;
let startPos = { x: 200, y: 100 };
const wedges = [];
let hypot = 0;

function getWedge(props) {
  const { n, height, length } = props;
  const heightToLengthRatio = height / (height + length);
  hypot = Math.hypot(height, length);
  const lenAngle = n === 0 ? 90 : (180 / Math.PI) * Math.asin(length / hypot);
  let verts = [
    { x: 0, y: 0 },
    { x: length, y: 0 },
    { x: 0, y: height },
  ];
  let pos = {
    x: 0,
    y: height + height * heightToLengthRatio,
  };
  return {
    hypot,
    rotation: -(90 - lenAngle),
    pos,
    verts,
    n,
  };
}

function getWedgeGroup(options = { length: 500, height: 100 }) {
  let { length, height, numWedges } = options;
  const heightToLengthRatio = height / (height + length);
  const arr = [];
  let wedge;
  for (let i = 0; i < numWedges; i += 1) {
    wedge = getWedge({ n: i, height, length });
    arr.push(wedge);
    length = wedge.hypot * (1.004 - heightToLengthRatio);
    height = wedge.hypot * heightToLengthRatio;
  }
  return arr;
}

function drawWedgeGroup(options) {
  const { wedges, rotation, length, height, hue } = options;
  const heightToLengthRatio = height / (height + length);
  let { x, y } = startPos;
  if (rotation === 90) {
    x = startPos.x + length + height * 2 + height * heightToLengthRatio;
    y = startPos.y + height + height * heightToLengthRatio;
  }
  if (rotation === 180) {
    x = startPos.x + height + length;
    y = startPos.y + length + height * 3 + height * heightToLengthRatio * 2;
  }
  if (rotation === -90) {
    x = startPos.x - height - height * heightToLengthRatio;
    y = startPos.y + length + height * 2 + height * heightToLengthRatio;
  }
  push();
  translate(x, y);
  rotate(rotation);
  wedges.forEach((w) => {
    const { verts, rotation, pos, n } = w;
    let { x, y } = pos;
    // strokeWeight(10 - n * 0.5);
    fill(hue, 100 - n * 8 + 20, n * 8 + 20);
    translate(x, y);
    rotate(rotation);
    beginShape();
    verts.forEach((v) => {
      const { x, y } = v;
      vertex(x, y);
    });
    endShape(CLOSE);
  });
  pop();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  // noStroke();
  stroke(255);
  // noFill();
  angleMode(DEGREES);
  const length = 700;
  const height = 175;
  const numWedges = 24;
  const topWedges = getWedgeGroup({numWedges, length, height });
  drawWedgeGroup({ wedges: topWedges, rotation: 0, length, height, hue: 230 });
  drawWedgeGroup({ wedges: topWedges, rotation: 90, length, height, hue: 120 });
  drawWedgeGroup({ wedges: topWedges, rotation: 180, length, height, hue: 345 });
  drawWedgeGroup({ wedges: topWedges, rotation: -90, length, height, hue: 280 });
}

let counter = 0;
let inc = 0.5;
let curWedges;

// function draw() {
//   if (paused === false) {
//     clear();
//     counter += inc;
//     curWedges = getWedgeGroup({ numWedges, length, height});
//     drawWedgeGroup({ wedges: curWedges, rotation: 0, length, height, hue: 230 });
//     drawWedgeGroup({ wedges: curWedges, rotation: 90, length, height, hue: 120 });
//     drawWedgeGroup({ wedges: curWedges, rotation: 180, length, height, hue: 345 });
//     drawWedgeGroup({ wedges: curWedges, rotation: -90, length, height, hue: 280 });
//   }
// }

function keyPressed() {
  if (keyCode === ESCAPE) {
    paused = !paused;
  }
  if (key === "=") {
    inc = abs(inc);
  }
  if (key === "-") {
    inc = abs(inc) * -1;
  }
  return false;
}
