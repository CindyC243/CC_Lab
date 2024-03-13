let peas = [];
let num = 50;
let creature = [];
let segments = 20;
let background_1 = 20;
let background_2 = 0;
let gameOver = false;
let gameStarted = false;
let user_creature = false;
let maxSpeed = 5;
let peaSpeed = 3;
let time_left = 20;
let b_width = 150;
let b_height = 60;
let X;
let Y;
let time_text = 16;
let interaction = true;

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.id("p5canvas")
  canvas.parent("p5Container")
  X = width / 2 - b_width / 2;
  Y = height / 2 + 100 - b_height / 2;
  for (let i = 0; i < num; i++) {
    if (i < num * 0.8) {
      peas.push({ pos: createVector(random(width), random(height)), color: color(255, 255, 0) });
    } else {
      peas.push({ pos: createVector(random(width), random(height)), color: color(255, 0, 0) });
    }
  }
}

function draw() {
  drawBackground();
  
  if (!gameStarted) {
    fill(255);
    textSize(24);
    textAlign(CENTER, CENTER);
    text("Instructions:", width / 2, height / 2 - 100);
    textSize(18);
    text("1. Move your creature with the mouse.", width / 2, height / 2 - 50);
    text("2. Eat yellow peas to grow. Avoid red peas.", width / 2, height / 2 - 20);
    text("3. Survive as long as possible.", width / 2, height / 2 + 10);
    text("GOAL: Eat 100 peas, REACH THE EARTH!", width / 2, height / 2 + 40);
    stroke(255);
    strokeWeight(1);
    fill(0);
    rect(X, Y, b_width, b_height);
    fill(255);
    textSize(20);
    textAlign(CENTER, CENTER);
    text("Press to Start", width / 2, height / 2 + 100);
  } else {
    peas.forEach(pea => {
      movePea(pea);
      fill(pea.color);
      ellipse(pea.pos.x, pea.pos.y, 10, 10);
    });

    if (creature.length > 0 && !gameOver) {
      movement(creature[0]);
    }

    for (let i = creature.length - 1; i >= 0; i--) {
      let c_creature = creature[i];
      if (i > 0 && !gameOver) {
       move_creature(c_creature);
      }
      displayCreature(c_creature);
      if (!gameOver) {
        c_creature.peasEaten += eat_peas(c_creature);
      }
      if (!user_creature && i === 0) {
        user_creature = true;
        startTimer();
        interaction = false;
      }
      if (collision(c_creature, i)) {
        gameOver = true;
      }
    }

    if (gameOver) {
     gameover_pre();
    } else {
      fill(255);
      textSize(time_text);
      textAlign(LEFT, TOP);
      text(`Time Remaining: ${time_left}`, 10, 20);

      textAlign(RIGHT, TOP);
      for (let i = 0; i < creature.length; i++) {
        let yPosition = 20 * (i + 1);
        text(`Peas Eaten: ${creature[i].peasEaten}`, width - 10, yPosition);
      }
    }

    if (frameCount % 60 === 0 && time_left > 0) {
      time_left--;
      if (time_left === 0) {
        if (creature.some(creature => creature.peasEaten >= 100)) {
          gameOver = true;
         gameover_pre(true);
        } else {
          gameOver = true;
         gameover_pre(false);
        }
      }
    }
  }
}

function drawBackground() {
  for (let y = 0; y < height; y += background_1) {
    for (let x = 0; x < width; x += background_1) {
      let c = color(
        100 + sin(background_2 + x * 0.01 + y * 0.01) * 100,
        100 + sin(background_2 + x * 0.01 + y * 0.01) * 50,
        150 + cos(background_2 + x * 0.01 + y * 0.01) * 100
      );
      fill(c);
      noStroke();
      triangle(x, y, x + background_1, y, x, y + background_1);
      triangle(x + background_1, y, x + background_1, y + background_1, x, y + background_1);
    }
  }
  background_2 += 0.02;
}

function movePea(pea) {
  pea.pos.x += random(-peaSpeed, peaSpeed);
  pea.pos.y += random(-peaSpeed, peaSpeed);
  pea.pos.x = (pea.pos.x + width) % width;
  pea.pos.y = (pea.pos.y + height) % height;
}

function mousePressed() {
  if (!gameStarted && interaction) {
    if (mouseX > X && mouseX < X + b_width && mouseY > Y && mouseY < Y + b_height) {
      gameStarted = true;
      addCreature();
    }
  } else {
    if (gameOver) {
      restartGame();
    }
  }
}

function restartGame() {
  gameOver = false;
  peas = [];
  creature = [];
  time_left = 20;
  gameStarted = false;
  user_creature = false;
  interaction = true;
  setup();
}

function addCreature() {
  let x = random(width);
  let y = random(height);
  let segments = [{ pos: createVector(x, y), col: color(random(255), random(255), random(255)) }];
  let xSpeed = random(-maxSpeed, maxSpeed);
  let ySpeed = random(-maxSpeed, maxSpeed);
  creature.push({ x, y, xSpeed, ySpeed, segments, initialSegments: 1, peasEaten: 0 });
}

function move_creature(c_creature) {
  c_creature.x += c_creature.xSpeed;
  c_creature.y += c_creature.ySpeed;

  if (c_creature.x < 0 || c_creature.x > width) c_creature.xSpeed *= -1;
  if (c_creature.y < 0 || c_creature.y > height) c_creature.ySpeed *= -1;

  update_pos(c_creature);
}

function movement(c_creature) {
  c_creature.x = mouseX;
  c_creature.y = mouseY;
  update_pos(c_creature);
}

function update_pos(c_creature) {
  let head_color = color(random(255), random(255), random(255));
  c_creature.segments.unshift({ pos: createVector(c_creature.x, c_creature.y), col: head_color });
  if (c_creature.segments.length > c_creature.initialSegments) {
    c_creature.segments.pop();
  }
}

function displayCreature(c_creature) {
  c_creature.segments.forEach(segment => {
    fill(segment.col);
    ellipse(segment.pos.x, segment.pos.y, segments, segments);
  });

  let seg_1 = c_creature.segments[0];
  fill(255);
  ellipse(seg_1.pos.x - 7, seg_1.pos.y - 7, 8, 8);
  ellipse(seg_1.pos.x + 7, seg_1.pos.y - 7, 8, 8);
  fill(0);
  ellipse(seg_1.pos.x - 7, seg_1.pos.y - 7, 4, 4);
  ellipse(seg_1.pos.x + 7, seg_1.pos.y - 7, 4, 4);
  fill(255, 0, 0);
  ellipse(seg_1.pos.x, seg_1.pos.y + 4, 12, 6);
}

function eat_peas(c_creature) {
  let peasEaten = 0;
  for (let i = peas.length - 1; i >= 0; i--) {
    if (dist(c_creature.x, c_creature.y, peas[i].pos.x, peas[i].pos.y) < segments / 2 + 5) {
      if (peas[i].color.levels[1] === 255) {
        peas.splice(i, 1);
        c_creature.initialSegments++;
        peasEaten++;
        peas.push({ pos: createVector(random(width), random(height)), color: color(255, 255, 0) });
      } else {
        gameOver = true;
      }
    }

    if (collision(c_creature, i)) {
      gameOver = true;
    }
  }
  return peasEaten;
}

function collision(c_creature, index) {
  for (let i = 0; i < peas.length; i++) {
    let pea = peas[i];
    let d = dist(c_creature.x, c_creature.y, pea.pos.x, pea.pos.y);
    if (d < segments / 2 + 5 && pea.color.levels[1] !== 255) {
      return true; // Collision detected with a red pea
    }
  }
  return false; // No collision detected
}

function gameover_pre() {
  background(0);
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);

  text(`Game Over`, width / 2, height / 2 - 30);
  text(`Peas Eaten: ${getTotalPeasEaten()}`, width / 2, height / 2 + 30);
}

function getTotalPeasEaten() {
  let totalPeasEaten = 0;
  for (let i = 0; i < creature.length; i++) {
    totalPeasEaten += creature[i].peasEaten;
  }
  return totalPeasEaten;
}

function startTimer() {
  gameStarted = true;
}
