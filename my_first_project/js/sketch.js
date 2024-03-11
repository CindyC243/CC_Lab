let peas = []; // Array to store peas
let num = 50; // Number of peas
let creature = []; // Array to store creature
let segments = 20; // Size of the creature's segments
let background_1 = 20; // Size of the background rectbackground_2s
let background_2 = 0; // background_2 for background color variation
let gameOver = false; // Flag to indicate if the game is over
let gameStarted = false; // Flag to track if the game has started
let user_creature = false; // Flag to track if the user's creature is present
let maxSpeed = 5; // Maximum speed for creature
let peaSpeed = 3; // Speed of peas
let time_left = 20; // Countdown timer in seconds
let b_width = 150; // Width of the start button
let b_height = 60; // Height of the start button
let X; // X-coordinate of the start button
let Y; // Y-coordinate of the start button
let time_text = 16; // Text size for time remaining
let interaction = true; // Flag to control mouse interaction

function setup() {
  let canvas = createCanvas(800, 500); // Create canvas
  canvas.id("p5canvas")
  canvas.parent("p5Container")
  X = width / 2 - b_width / 2; // Calculate button X-coordinate
  Y = height / 2 + 100 - b_height / 2; // Calculate button Y-coordinate
  for (let i = 0; i < num; i++) { // Initialize peas
    if (i < num * 0.8) { // 80% of peas are yellow
      peas.push({ pos: createVector(random(width), random(height)), color: color(255, 255, 0) });
    } else { // 20% of peas are red
      peas.push({ pos: createVector(random(width), random(height)), color: color(255, 0, 0) });
    }
  }
}

function draw() {
  drawBackground(); // Draw background
  
  if (!gameStarted) {
    // Instruction Page
    fill(255);
    textSize(24);
    textAlign(CENTER, CENTER);
    text("Instructions:", width / 2, height / 2 - 100);
    textSize(18);
    text("1. Move your creature with the mouse.", width / 2, height / 2 - 50);
    text("2. Eat yellow peas to grow. Avoid red peas.", width / 2, height / 2 - 20);
    text("3. Survive as long as possible.", width / 2, height / 2 + 10);
    text("GOAL: Eat 100 peas, REACH THE EARTH!", width / 2, height / 2 + 40);
    // "Press to Start" button
    stroke(255);
    strokeWeight(1);
    fill(0);
    rect(X, Y, b_width, b_height);
    fill(255);
    textSize(20);
    textAlign(CENTER, CENTER);
    text("Press to Start", width / 2, height / 2 + 100);
  } else {
    // Gameplay
    peas.forEach(pea => {
      movePea(pea);
      fill(pea.color);
      ellipse(pea.pos.x, pea.pos.y, 10, 10);
    });

    if (creature.length > 0 && !gameOver) {
      movement(creature[0]);
    }

    for (let i = creature.length - 1; i >= 0; i--) {
      let c_creature = creature[i]; // Rename to avoid conflict
      if (i > 0 && !gameOver) {
       move_creature(c_creature);
      }
      displayCreature(c_creature);
      if (!gameOver) {
        c_creature.peasEaten += eat_peas(c_creature); // Increment peas eaten by the amount returned
      }
      if (!user_creature && i === 0) {
        user_creature = true; // User's creature is now present on the canvas
        startTimer();
        interaction = false; // Disable further mouse interaction
      }
      if (collision(c_creature, i)) {
        gameOver = true;
      }
    }

    if (gameOver) {
     gameover_pre();
    } else {
      // Display time remaining
      fill(255);
      textSize(time_text);
      textAlign(LEFT, TOP);
      text(`Time Remaining: ${time_left}`, 10, 20);

      // Display pea counter for each creature
      textAlign(RIGHT, TOP);
      for (let i = 0; i < creature.length; i++) {
        let yPosition = 20 * (i + 1);
        text(`Peas Eaten: ${creature[i].peasEaten}`, width - 10, yPosition);
      }
    }

    // Decrement time remaining
    if (frameCount % 60 === 0 && time_left > 0) {
      time_left--;
      if (time_left === 0) {
        if (creature.some(creature => creature.peasEaten >= 100)) {
          gameOver = true;
         gameover_pre(true); // Display congratulations message
        } else {
          gameOver = true;
         gameover_pre(false); // Display regular game over message
        }
      }
    }
  }
}

function drawBackground() {
  // Background
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
  // Move the pea randomly
  pea.pos.x += random(-peaSpeed, peaSpeed);
  pea.pos.y += random(-peaSpeed, peaSpeed);
  // Wrap around the canvas
  pea.pos.x = (pea.pos.x + width) % width;
  pea.pos.y = (pea.pos.y + height) % height;
}

function mousePressed() {
  if (!gameStarted && interaction) {
    if (mouseX > X && mouseX < X + b_width && mouseY > Y && mouseY < Y + b_height) {
      gameStarted = true;
      // Create the user's creature
      addCreature();
    }
  } else {
    if (gameOver) {
      restartGame();
    } else {
      // Don't create creature if the game is not over
      // addCreature();
    }
  }
}

function restartGame() {
  gameOver = false;
  peas = []; // Reset the peas array
  creature = [];
  time_left = 20; // Reset time remaining
  gameStarted = false; // Reset game started flag
  user_creature = false; // Reset user's creature present flag
  interaction = true; // Re-enable mouse interaction
  setup(); // Call the setup function to reinitialize the peas
}

function addCreature() {
  let x = random(width);
  let y = random(height);
  let segments = [{ pos: createVector(x, y), col: color(random(255), random(255), random(255)) }];
  let xSpeed = random(-maxSpeed, maxSpeed); // Random x-speed
  let ySpeed = random(-maxSpeed, maxSpeed); // Random y-speed
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

  // Draw face on the first segment
  let seg_1 = c_creature.segments[0];
  fill(255); // White
  ellipse(seg_1.pos.x - 7, seg_1.pos.y - 7, 8, 8); // Left eye
  ellipse(seg_1.pos.x + 7, seg_1.pos.y - 7, 8, 8); // Right eye
  fill(0); // Black
  ellipse(seg_1.pos.x - 7, seg_1.pos.y - 7, 4, 4); // Left pupil
  ellipse(seg_1.pos.x + 7, seg_1.pos.y - 7, 4, 4); // Right pupil
  fill(255, 0, 0); // Red
  ellipse(seg_1.pos.x, seg_1.pos.y + 4, 12, 6); // Mouth
}

function eat_peas(c_creature) {
  let peasEaten = 0; // Variable to track peas eaten by this c_creature
  for (let i = peas.length - 1; i >= 0; i--) {
    if (dist(c_creature.x, c_creature.y, peas[i].pos.x, peas[i].pos.y) < segments / 2 + 5) {
      if (peas[i].color.levels[1] === 255) { // If the pea is yellow
        peas.splice(i, 1);
        c_creature.initialSegments++;
        peasEaten++;
        peas.push({ pos: createVector(random(width), random(height)), color: color(255, 255, 0) });
      } else { // If the pea is red
        gameOver = true;
      }
    }
  }
  return peasEaten; // Return the number of peas eaten by this c_creature
}

function collision(c_creature, index) {
  for (let i = 0; i < creature.length; i++) {
    if (i !== index) {
      let other = creature[i];
      if (dist(c_creature.x, c_creature.y, other.x, other.y) < segments) {
        return true; // Collision detected
      }
    }
  }
  return false; // No collision
}

function gameover_pre() {
  background(0); // Set background color to black
  fill(255); // Set fill color to white
  textSize(32); // Set text size
  textAlign(CENTER, CENTER); // Set text alignment to center

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

function startTimer() { // Function to start the game timer
  gameStarted = true; // Set game started flag to true
}



