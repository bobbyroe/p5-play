let paused = false;
let mid = { x: 0, y: 0 };
const canvas = document.getElementById("stage");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particles = [];

// const mouse = {
//   x: null,
//   y: null,
//   radius: 200,
// };

// window.addEventListener("mousemove", (evt) => {
//   let { x, y } = evt;
//   mouse.x = x;
//   mouse.y = y;
// });

ctx.fillStyle = "white";
ctx.font = "30px Verdana";
ctx.fillText("Roe", 100, 100);

// debug rect for image data
// ctx.strokeStyle ="white";
// ctx.beginPath();
// ctx.rect(95, 70, 70, 35);
// ctx.stroke();

const textData = ctx.getImageData(95, 70, 70, 35);

// SHIP
let ship;

function getShip() {
  let center = { x: canvas.width * 0.5, y: canvas.height * 0.5 };
  let goalCenter = { x: 0, y: 0 };
  let delta = { x: 0, y: 0 };
  let goal = { x: 0, y: 0 };
  let angle = 0;
  let direction = 1;
  let shipAngle = Math.random(Math.PI * 2);
  let randomDist = Math.random(100, 300);
  let speed = 0.5;
  let pos = {
    x: center.x + Math.cos(shipAngle) * randomDist,
    y: center.y + Math.sin(shipAngle) * randomDist,
  };

  function update() {
    let { x, y } = pos;

    if (Math.random() < 0.03) {
      direction = Math.random() < 0.5 ? -1 : 1;
      speed = Math.random(0.05, 0.2);
      randomDist = Math.random(10, 300);
    }
    if (Math.random() < 0.03) {
      goalCenter = {
        x: Math.random() * (canvas.width - 200) + 100,
        y: Math.random() * (canvas.height - 200) + 100,
      };
    }

    shipAngle += direction * speed;
    center.x -= (center.x - goalCenter.x) * 0.3;
    center.y -= (center.y - goalCenter.y) * 0.3;
    goal = {
      x: center.x + Math.cos(shipAngle) * randomDist,
      y: center.y + Math.sin(shipAngle) * randomDist,
    };
    delta = {
      x: goal.x - pos.x,
      y: goal.y - pos.y,
    };
    angle = Math.atan2(-delta.x, delta.y);
    pos.x -= (pos.x - goal.x) * speed;
    pos.y -= (pos.y - goal.y) * speed;
  }

  function _line(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  function draw() {
    let { x, y } = pos;
    ctx.save();
    ctx.strokeStyle = `rgba(0,255,0,1.0)`;
    ctx.lineWidth = 4;
    ctx.translate(x, y);
    ctx.rotate(angle);
    _line(10, -15, 0, 15); // /
    _line(0, 15, -10, -15); // \
    _line(10, -15, 0, -9); // /
    _line(0, -9, -10, -15); // \
    ctx.restore();
  }
  return {
    pos,
    update,
    draw,
    radius: 400
  };
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 3;
    this.homeX = this.x;
    this.homeY = this.y;
    this.density = Math.random() * 30 + 5;
  }

  draw() {
    const { x, y, size } = this;
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
  update() {
    let { x, y, density, homeX, homeY } = this;
    let dx = ship.pos.x - x;
    let dy = ship.pos.y - y;
    let distance = Math.hypot(dx, dy);
    let forceDirectionX = dx / distance;
    let forceDirectionY = dy / distance;
    let maxDistance = ship.radius;
    let force = (maxDistance - distance) / maxDistance;
    let directionX = forceDirectionX * force * density;
    let directionY = forceDirectionY * force * density;

    if (distance < ship.radius) {
      this.x -= directionX;
      this.y -= directionY;
    } else {
      if (x !== homeX) {
        let homeDX = x - homeX;
        this.x -= homeDX * 0.1;
      }
      if (y !== homeY) {
        let homeDY = y - homeY;
        this.y -= homeDY * 0.1;
      }
    }
  }
}

function init() {
  particles = [];
  const yHeight = textData.height;
  const xWidth = textData.width;
  for (let y = 0; y < yHeight; y += 1) {
    for (let x = 0; x < xWidth; x += 1) {
      let alphaIndex = y * 4 * xWidth + x * 4 + 3;
      if (textData.data[alphaIndex] > 128) {
        particles.push(new Particle(x * 20, 200 + y * 20));
      }
    }
  }
  ship = getShip();
}
init();

function connect() {
  let opacity = 1;
  const len = particles.length;
  for (let a = 0; a < len; a += 1) {
    let { x: ax, y: ay } = particles[a];
    for (let b = a; b < len; b += 1) {
      let { x: bx, y: by } = particles[b];
      let dx = ax - bx;
      let dy = ay - by;
      let distance = Math.hypot(dx, dy);
      if (distance < 50) {
        opacity = 1 - distance * 0.02;
        ctx.strokeStyle = `rgba(255,255,255,${opacity})`;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ship.update();
  ship.draw();
  particles.forEach((p) => {
    p.update();
    p.draw();
  });
  connect();
  requestAnimationFrame(animate);
}
animate();
