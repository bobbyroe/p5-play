let paused = false;
let mid = { x: 0, y: 0 };
const canvas = document.getElementById('stage');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particles = [];

const mouse = {
  x: null,
  y: null,
  radius: 150
};

window.addEventListener('mousemove', (evt) => {
  let { x, y } = evt;
  mouse.x = x;
  mouse.y = y;
});

ctx.fillStyle = 'white';
ctx.font = '60px Verdana';
ctx.fillText('Roe', 100, 100);

// const imageData = ctx.getImageData(99, 99, 201, 201);

class Particle {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.size = 3;
    this.homeX = this.x;
    this.homeY = this.y;
    this.density = (Math.random() * 30) + 1;
  }

  draw () {
    const { x, y, size} = this;
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
  update () {
    let { x, y } = this;
    let dx = mouse.x - x;
    let dy = mouse.y - y;
    let distance = Math.hypot(dx, dy);
    if (distance < 150) {
      this.size = 50;
    } else {
      this.size = 3;
    }
  }
}

function init () {
  particles = [];
  let numParticles = 500;
  for (let i = 0; i < numParticles; i += 1) {
    let x= Math.random() * canvas.width;
    let y= Math.random() * canvas.height;
    particles.push(new Particle (x, y));
  }
}
init();

function animate () {
  ctx.clearRect(0,0, canvas.width, canvas.height);
  particles.forEach( p => {
    p.update();
    p.draw()
  });
  requestAnimationFrame(animate);
}
animate();