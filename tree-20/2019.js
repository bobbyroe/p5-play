// Tree code converted from Jean-no's excellent Processing example : http://www.openprocessing.org/visuals/?visualID=1758
let mid = { x: 0, y: 0 };

function branch(pos, length, angle) {
  // width is a % of the length
  strokeWeight(length * 0.06);

  const new_pos = {
    x: pos.x + Math.cos(angle) * length,
    y: pos.y + Math.sin(angle) * length,
  };

  line(pos.x, pos.y, new_pos.x, new_pos.y);

  if (length > 10) {
    // branch on left
    branch(
      new_pos,
      length * random(0.55, 0.8),
      angle - radians(random(17, 12))
    );
    // branch on right
    branch(
      new_pos,
      length * random(0.55, 0.8),
      angle + radians(random(17, 12))
    );
  }
}
function radians(a) {
  return (a * Math.PI) / 180;
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB);
    angleMode(DEGREES);
    mid = {
      x: windowWidth * 0.5,
      y: windowHeight * 0.9,
    };
    stroke("#0CF");
    //   ctx.lineCap = "round";
    // ctx.lineJoin = "round";
    // START! – pos, length, angle
    branch(mid, 300, radians(270));
  }

  function draw() {
      
  }