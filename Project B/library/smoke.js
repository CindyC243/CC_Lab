let particles = [];

function setup() {
  let canvas = createCanvas(220, 220);
  canvas.parent("p5-canvas-container");
  colorMode(HSB, 255);
}

function draw() {
  background(0);

  for (let i = 0; i < 3; i++) {
    let x = width / 2 + random(-50, 50); 
    particles.push(new Particle(x, height));
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
    if (particles[i].finished()) {
      particles.splice(i, 1);
    }
  }
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vy = random(-1, -3); 
    this.alpha = 255;
    this.size = random(10, 20);
    this.hue = 0;
    this.initialX = x; 
  }

  update() {
    this.y += this.vy;
    this.vy *= 0.99; 
    this.alpha -= 2; 
    this.size += 0.1; 
    this.hue += 0.5; 
    this.x = lerp(this.initialX, width / 2, map(this.alpha, 255, 0, 0, 1));
  }

  finished() {
    return this.alpha < 0;
  }

  show() {
    noStroke();
    fill(this.hue, 255, 255, this.alpha);
    ellipse(this.x, this.y, this.size);
  }
}
