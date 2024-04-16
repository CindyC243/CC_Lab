/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 80; i++) {
    particles.push(new Particle());
  }
  // Apply a subtle blur effect to the canvas for smoother edges
  drawingContext.filter = 'blur(2px)';
}

function draw() {
  background(0);
  particles.forEach((p, index) => {
    p.update();
    p.show();
    if (p.isFinished()) {
      particles.splice(index, 1);
    }
  });
  if (particles.length < 80) {
    particles.push(new Particle());
  }
}

class Particle {
  constructor() {
    // Start lower to give particles time to rise
    this.pos = createVector(random(width), height + 50); 
    // Increased upward velocity for a larger rise
    this.vel = createVector(0, random(-0.5, -2)); 
    this.noiseOffsetX = random(1000);
    this.noiseOffsetY = random(1000);
    // Adjust size for variety
    this.size = random(30, 50); 
    // Longer lifespan so they can rise higher
    this.lifespan = random(200, 255); 
    this.noiseScale = random(0.02, 0.1);
  }

  update() {
    let noiseStrength = map(this.lifespan, 255, 0, 1, 3);
    this.vel.x = map(noise(this.noiseOffsetX), 0, 1, -noiseStrength, noiseStrength);
    // Slow down vertical speed as they rise
    this.vel.y *= 0.98; 
    this.pos.add(this.vel);
    this.noiseOffsetX += 0.01;
    this.noiseOffsetY += 0.01;
    // Increase size slower
    this.size += 0.05; 
    // Fade out slower
    this.lifespan -= 1; 
  }

  show() {
    noStroke();
    // More transparent gradient for smoother edges
    let gradient = drawingContext.createRadialGradient(
      this.pos.x, this.pos.y, 0,
      this.pos.x, this.pos.y, this.size
    );
    gradient.addColorStop(0, `rgba(255, 255, 255, ${(0.2 * this.lifespan) / 255})`);
    gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

    drawingContext.fillStyle = gradient;
    beginShape();
    const noiseVal = this.lifespan / 255;
    for (let angle = 0; angle < TWO_PI; angle += 0.01) {
      let xOff = sin(angle) * this.size + noise(this.noiseOffsetX + cos(angle) * noiseVal) * this.noiseScale * 100;
      let yOff = cos(angle) * this.size + noise(this.noiseOffsetY + sin(angle) * noiseVal) * this.noiseScale * 100;
      let x = this.pos.x + xOff;
      let y = this.pos.y + yOff;
      vertex(x, y);
    }
    endShape(CLOSE);
  }

  isFinished() {
    // Check if the particle is above half the canvas and faded out
    return (this.lifespan < 0) || (this.pos.y < height / 2 && this.lifespan < 50);
  }
}



/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/