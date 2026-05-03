// ── PARTICLE CANVAS ──
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let W, H, particles = [];

function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize();
window.addEventListener('resize', resize);

class Particle {
  constructor() { this.reset(true); }
  reset(init) {
    this.x = Math.random() * W;
    this.y = init ? Math.random() * H : H + 10;
    this.r = Math.random() * 2 + 0.5;
    this.speed = Math.random() * 0.6 + 0.2;
    this.opacity = Math.random() * 0.6 + 0.1;
    this.drift = (Math.random() - 0.5) * 0.4;
    this.flicker = Math.random() * Math.PI * 2;
    this.flickerSpeed = Math.random() * 0.04 + 0.01;
    const hues = ['155,93,229', '199,125,255', '100,60,180', '200,214,229'];
    this.color = hues[Math.floor(Math.random() * hues.length)];
  }
  update() {
    this.y -= this.speed;
    this.x += this.drift;
    this.flicker += this.flickerSpeed;
    this.opacity = 0.1 + Math.abs(Math.sin(this.flicker)) * 0.55;
    if (this.y < -10) this.reset(false);
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color},${this.opacity})`;
    ctx.fill();
  }
}

for (let i = 0; i < 130; i++) particles.push(new Particle());

// ── SHOOTING STARS ──
let shooters = [];

class Shooter {
  constructor() {
    this.x = Math.random() * W;
    this.y = Math.random() * H * 0.5;
    this.len = Math.random() * 120 + 60;
    this.speed = Math.random() * 10 + 8;
    this.opacity = 1;
    this.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.4;
  }
  update() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    this.opacity -= 0.025;
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    const g = ctx.createLinearGradient(
      this.x, this.y,
      this.x - Math.cos(this.angle) * this.len,
      this.y - Math.sin(this.angle) * this.len
    );
    g.addColorStop(0, 'rgba(199,125,255,1)');
    g.addColorStop(1, 'rgba(199,125,255,0)');
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - Math.cos(this.angle) * this.len, this.y - Math.sin(this.angle) * this.len);
    ctx.strokeStyle = g;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();
  }
}

setInterval(() => { if (Math.random() < 0.4) shooters.push(new Shooter()); }, 2200);

// ── ANIMATION LOOP ──
function animate() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => { p.update(); p.draw(); });
  shooters = shooters.filter(s => s.opacity > 0);
  shooters.forEach(s => { s.update(); s.draw(); });
  requestAnimationFrame(animate);
}
animate();

// ── STAR FIELD ──
const sf = document.getElementById('stars');
for (let i = 0; i < 80; i++) {
  const s = document.createElement('div');
  s.classList.add('star');
  const sz = Math.random() * 2.5 + 0.5;
  s.style.cssText = `width:${sz}px;height:${sz}px;top:${Math.random() * 100}%;left:${Math.random() * 100}%;--dur:${(Math.random() * 3 + 2).toFixed(1)}s;--delay:${(Math.random() * 4).toFixed(1)}s;opacity:0.15;`;
  sf.appendChild(s);
}
