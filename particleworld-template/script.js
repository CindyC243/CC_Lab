// Balloon class definition
class Balloon {
  constructor() {
    this.x = random(width);
    this.y = height + random(100, 100);
    this.velocity = random(1, 3);
    this.color = color(random(200, 255), random(200, 255), random(200, 255));
    this.phase = random(TWO_PI);
    this.amplitude = random(5, 15);
  }

  rise() {
    this.y -= this.velocity;
    this.phase += 0.02;
    if (this.y < -50) {
      this.y = height + random(50, 100);
      this.x = random(width);
      this.phase = random(TWO_PI);
    }
  }

  show() {
    fill(this.color);
    ellipse(this.x, this.y, 30, 40);
    fill(255, 255, 255, 200);
    ellipse(this.x - 7, this.y - 12, 5, 5);
    fill(this.color);
    triangle(this.x - 5, this.y + 20, this.x + 5, this.y + 20, this.x, this.y + 30);
    stroke(0);
    strokeWeight(1);
    let sway = this.x + sin(this.phase) * this.amplitude;
    line(this.x, this.y + 30, sway, this.y + 60);
  }
}

// Confetti class definition
class Confetti {
  constructor() {
    this.x = random(width);
    this.y = random(-50, 0);
    this.velocity = random(2, 5);
    this.size = random(5, 10);
    this.color = color(random(255), random(255), random(255));
  }

  fall() {
    this.y += this.velocity;
    if (this.y > height) {
      this.y = random(-50, 0);
      this.x = random(width);
    }
  }

  show() {
    noStroke();
    fill(this.color);
    rect(this.x, this.y, this.size, this.size);
  }
}

let balloons = [];
let confettis = [];

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent("p5-canvas-container");  // Assuming a similar setup as the previous template

  for (let i = 0; i < 10; i++) {
    balloons.push(new Balloon());
  }
  for (let i = 0; i < 100; i++) {
    confettis.push(new Confetti());
  }
}

function draw() {
  background(243, 221, 222);

  for (let confetti of confettis) {
    confetti.fall();
    confetti.show();
  }

  for (let balloon of balloons) {
    balloon.rise();
    balloon.show();
  }

  // Additional drawing code for the scene, like a cake, can remain here
  // cake base
  fill(255, 204, 153);
  rect(100, 300, 200, 100, 20);
  rect(125, 250, 150, 50, 20);

  // candle
  fill(255, 100, 100);
  rect(195, 230, 10, 30);
  fill(255, 255, 255, 150);
  rect(195, 230, 5, 30);

  // fire
  fill(255, 215, 0);
  ellipse(200, 225, 10, 20);
  fill(255, 165, 0);
  ellipse(200, 225, 6, 14);

  // decoration
  fill(255, 255, 255);
  stroke(255, 20, 147);
  strokeWeight(4);
  arc(200, 300, 180, 100, 0, PI, OPEN);
}
