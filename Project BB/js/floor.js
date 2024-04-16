function drawFloor() {
  push();

  let perspY = height * 0.3;
  let tileW = width / 30;

  for (let x = -150; x <= width + 150; x += tileW) {
    stroke(45);
    line(width / 2, perspY, x, height);
  }
  let dy = 5;
  let y = height * 0.6;
  while (y <= height) {
    line(0, y, width, y);
    dy *= 1.05;
    y += dy;
  }

  fill(0);
  noStroke();

  beginShape();
  vertex(-151, height);
  vertex(width / 2, perspY);
  vertex(-151, perspY);
  endShape();

  beginShape();
  vertex(width + 151, height);
  vertex(width / 2 + 1, perspY);
  vertex(width + 151, perspY);
  endShape();

  rect(0, 0, width, height * 0.6);

  fill(180);
  textSize(10);
  text("note: the grey grid in the background is for reference only.", 10, height - 20);
  text("It represents the 'floor' on which your dancer dances.", 35, height - 9);

  pop();
}

function setup() {
  createCanvas(200, 200);
  dancer = new CindyDancer();
}

function draw() {
  background(0);
  dancer.update();
  dancer.display();
}

class CindyDancer {
  constructor() {
    this.angle = 0;
    this.amplitude = 10;
  }

  update() {
    this.angle += 0.2;
  }

  display() {
    // Draw the dancer based on its current properties

    // Feet
    rectMode(CENTER);
    let feetmove = sin(this.angle) * this.amplitude;
    rect(76, 180 + feetmove, 45, 20, 65, 65, 65, 65);
    rect(117, 180 - feetmove, 45, 20, 65, 65, 65, 65);

    // Body
    fill(30, 144, 255);
    rectMode(CENTER);
    let bodymove = sin(this.angle) * this.amplitude/2;
    rect(100, 140 + bodymove, 90, 90, 65, 65, 65, 65);
    circle(85, 60 + bodymove / 2, 50);

    // Belly
    fill(255);
    let bellymove = sin(this.angle) * this.amplitude / 4;
    circle(100, 140 + bellymove, 70);

    // Head
    fill(30, 144, 255);
    circle(100, 53 + bodymove / 2, 100);
    fill(255);
    circle(100, 60 + bodymove / 2, 80);

    // Nose
    fill(255, 0, 0);
    let nosemove = sin(this.angle) * this.amplitude / 4;
    circle(97.5 + nosemove, 43 + bodymove / 2, 15);
    fill(255);
    circle(95 + nosemove / 2, 40 + bodymove / 2, 5);

    // Whisker
    let whiskermove = sin(this.angle) * this.amplitude / 8;
    line(80 + whiskermove, 53 + bodymove / 2, 40 + whiskermove, 53 + bodymove / 2);
    line(80 + whiskermove, 60 + bodymove / 2, 40 + whiskermove, 65 + bodymove / 2);
    line(80 + whiskermove, 67 + bodymove / 2, 40 + whiskermove, 77 + bodymove / 2);
    line(120 - whiskermove, 53 + bodymove / 2, 160 - whiskermove, 53 + bodymove / 2);
    line(120 - whiskermove, 60 + bodymove / 2, 160 - whiskermove, 65 + bodymove / 2);
    line(120 - whiskermove, 67 + bodymove / 2, 160 - whiskermove, 77 + bodymove / 2);

    // Eyes
    fill(255); // White
    let eyemove = sin(this.angle) * this.amplitude / 8;
    circle(85 + eyemove, 28 + bodymove / 2, 25);
    circle(110 + eyemove, 28 + bodymove / 2, 25);
    fill(0); // Black
    circle(90 + eyemove / 2, 28 + bodymove / 2, 8);
    circle(105 + eyemove / 2, 28 + bodymove / 2, 8);
    fill(255); // White
    circle(90 + eyemove / 2, 28 + bodymove / 2, 3);
    circle(105 + eyemove / 2, 28 + bodymove / 2, 3);

    // Mouth
    let mouthmove = sin(this.angle) * this.amplitude / 4;
    arc(100 + mouthmove / 2, 65 + bodymove / 2, 60, 40, 0.2, PI - 0.2);
    line(97.5 + mouthmove / 2, 50 + bodymove / 2, 98 + mouthmove / 2, 83 + bodymove / 2);

    // Pocket
    fill(255);
    let pocketmove = sin(this.angle) * this.amplitude / 4;
    arc(100 + pocketmove / 2, 135 + bodymove / 2, 45, 50, 0, PI);
    rectMode(CENTER);
    rect(100 + pocketmove / 2, 135 + bodymove / 2, 45, 0.5);

    // Bell
    fill(255, 0, 0);
    let bellmove = sin(this.angle) * this.amplitude / 4;
    rectMode(CENTER);
    rect(100 + bellmove / 2, 104 + bodymove / 2, 50, 6, 65, 65);
    fill(255, 255, 0);
    circle(99 + bellmove / 2, 107 + bodymove / 2, 13);

    // Hand
    fill(255);
    let handmove = sin(this.angle) * this.amplitude / 2;
    circle(145 + handmove / 2, 120 + bodymove / 2, 25);
    circle(55 + handmove / 2, 120 + bodymove / 2, 25);
  }
}
