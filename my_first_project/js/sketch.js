let peas = []; // Array to store peas
let numPeas = 50; // Number of peas
let creatures = []; // Array to store creatures
let circleSize = 20; // Size of the creature's segments
let rectSize = 20; // Size of the background rectangles
let angle = 0; // Angle for background color variation
let gameOver = false; // Flag to indicate if the game is over
let gameStarted = false; // Flag to track if the game has started
let userCreaturePresent = false; // Flag to track if the user's creature is present
let maxSpeed = 5; // Maximum speed for creatures
let peaSpeed = 3; // Speed of peas
let timeRemaining = 20; // Countdown timer in seconds
let buttonWidth = 150; // Width of the start button
let buttonHeight = 60; // Height of the start button
let buttonX; // X-coordinate of the start button
let buttonY; // Y-coordinate of the start button
let timeTextSize = 16; // Text size for time remaining
let allowMouseInteraction = true; // Flag to control mouse interaction

function setup() {
  let canvas = createCanvas(800, 500); // Create canvas
  canvas.id("p5canvas") 
  canvas.parent("p5Container") 
  buttonX = width / 2 - buttonWidth / 2; // Calculate button X-coordinate
  buttonY = height / 2 + 100 - buttonHeight / 2; // Calculate button Y-coordinate
  for (let i = 0; i < numPeas; i++) { // Initialize peas
    if (i < numPeas * 0.8) { // 80% of peas are yellow
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
    rect(buttonX, buttonY, buttonWidth, buttonHeight);
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

    if (creatures.length > 0 && !gameOver) {
      moveCreatureWithMouse(creatures[0]);
    }

    for (let i = creatures.length - 1; i >= 0; i--) {
      let creature = creatures[i];
      if (i > 0 && !gameOver) {
        moveCreature(creature);
      }
      displayCreature(creature);
      if (!gameOver) {
        creature.peasEaten += eatPeas(creature); // Increment peas eaten by the amount returned
      }
      if (!userCreaturePresent && i === 0) {
        userCreaturePresent = true; // User's creature is now present on the canvas
        startTimer();
        allowMouseInteraction = false; // Disable further mouse interaction
      }
      if (checkCollision(creature, i)) {
        gameOver = true;
      }
    }

    if (gameOver) {
      showGameOver();
    } else {
      // Display time remaining
      fill(255);
      textSize(timeTextSize);
      textAlign(LEFT, TOP);
      text(`Time Remaining: ${timeRemaining}`, 10, 20);

      // Display pea counter for each creature
      textAlign(RIGHT, TOP);
      for (let i = 0; i < creatures.length; i++) {
        let yPosition = 20 * (i + 1);
        text(`Peas Eaten: ${creatures[i].peasEaten}`, width - 10, yPosition);
      }
    }

    // Decrement time remaining
    if (frameCount % 60 === 0 && timeRemaining > 0) {
      timeRemaining--;
      if (timeRemaining === 0) {
        if (creatures.some(creature => creature.peasEaten >= 100)) {
          gameOver = true;
          showGameOver(true); // Display congratulations message
        } else {
          gameOver = true;
          showGameOver(false); // Display regular game over message
        }
      }
    }
  }
}

function drawBackground() {
  // Background
  for (let y = 0; y < height; y += rectSize) {
    for (let x = 0; x < width; x += rectSize) {
      let c = color(
        100 + sin(angle + x * 0.01 + y * 0.01) * 100,
        100 + sin(angle + x * 0.01 + y * 0.01) * 50,
        150 + cos(angle + x * 0.01 + y * 0.01) * 100
      );
      fill(c);
      noStroke();
      triangle(x, y, x + rectSize, y, x, y + rectSize);
      triangle(x + rectSize, y, x + rectSize, y + rectSize, x, y + rectSize);
    }
  }
  angle += 0.02;
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
  if (!gameStarted && allowMouseInteraction) {
    if (mouseX > buttonX && mouseX < buttonX + buttonWidth && mouseY > buttonY && mouseY < buttonY + buttonHeight) {
      gameStarted = true;
      // Create the user's creature
      addCreature();
    }
  } else {
    if (gameOver) {
      restartGame();
    } else {
      // Don't create creatures if the game is not over
      // addCreature();
    }
  }
}

function restartGame() {
  gameOver = false;
  peas = []; // Reset the peas array
  creatures = [];
  timeRemaining = 20; // Reset time remaining
  gameStarted = false; // Reset game started flag
  userCreaturePresent = false; // Reset user's creature present flag
  allowMouseInteraction = true; // Re-enable mouse interaction
  setup(); // Call the setup function to reinitialize the peas
}

function addCreature() {
  let x = random(width);
  let y = random(height);
  let segments = [{ pos: createVector(x, y), col: color(random(255), random(255), random(255)) }];
  let xSpeed = random(-maxSpeed, maxSpeed); // Random x-speed
  let ySpeed = random(-maxSpeed, maxSpeed); // Random y-speed
  creatures.push({ x, y, xSpeed, ySpeed, segments, initialSegments: 1, peasEaten: 0 });
}

function moveCreature(creature) {
  creature.x += creature.xSpeed;
  creature.y += creature.ySpeed;

  if (creature.x < 0 || creature.x > width) creature.xSpeed *= -1;
  if (creature.y < 0 || creature.y > height) creature.ySpeed *= -1;

  updateCreaturePosition(creature);
}

function moveCreatureWithMouse(creature) {
  creature.x = mouseX;
  creature.y = mouseY;
  updateCreaturePosition(creature);
}

function updateCreaturePosition(creature) {
  let newHeadColor = color(random(255), random(255), random(255));
  creature.segments.unshift({ pos: createVector(creature.x, creature.y), col: newHeadColor });
  if (creature.segments.length > creature.initialSegments) {
    creature.segments.pop();
  }
}

function displayCreature(creature) {
  creature.segments.forEach(segment => {
    fill(segment.col);
    ellipse(segment.pos.x, segment.pos.y, circleSize, circleSize);
  });

  // Draw face on the first segment
  let firstSegment = creature.segments[0];
  fill(255); // White
  ellipse(firstSegment.pos.x - 7, firstSegment.pos.y - 7, 8, 8); // Left eye
  ellipse(firstSegment.pos.x + 7, firstSegment.pos.y - 7, 8, 8); // Right eye
  fill(0); // Black
  ellipse(firstSegment.pos.x - 7, firstSegment.pos.y - 7, 4, 4); // Left pupil
  ellipse(firstSegment.pos.x + 7, firstSegment.pos.y - 7, 4, 4); // Right pupil
  fill(255, 0, 0); // Red
  ellipse(firstSegment.pos.x, firstSegment.pos.y + 4, 12, 6); // Mouth
}

function eatPeas(creature) {
  let peasEaten = 0; // Variable to track peas eaten by this creature
  for (let i = peas.length - 1; i >= 0; i--) {
    if (dist(creature.x, creature.y, peas[i].pos.x, peas[i].pos.y) < circleSize / 2 + 5) {
      if (peas[i].color.levels[1] === 255) { // If the pea is yellow
        peas.splice(i, 1);
        creature.initialSegments++;
        peasEaten++;
        peas.push({ pos: createVector(random(width), random(height)), color: color(255, 255, 0) });
      } else { // If the pea is red
        gameOver = true;
      }
    }
  }
  return peasEaten; // Return the number of peas eaten by this creature
}

function checkCollision(creature, index) {
  for (let i = 0; i < creatures.length; i++) {
    if (i !== index) {
      let other = creatures[i];
      if (dist(creature.x, creature.y, other.x, other.y) < circleSize) {
        return true; // Collision detected
      }
    }
  }
  return false; // No collision
}

function showGameOver() {
  background(0); // Set background color to black
  fill(255); // Set fill color to white
  textSize(32); // Set text size
  textAlign(CENTER, CENTER); // Set text alignment to center

  text(`Game Over`, width / 2, height / 2 - 30);
  text(`Peas Eaten: ${getTotalPeasEaten()}`, width / 2, height / 2 + 30);
}

function getTotalPeasEaten() {
  let totalPeasEaten = 0;
  for (let i = 0; i < creatures.length; i++) {
    totalPeasEaten += creatures[i].peasEaten;
  }
  return totalPeasEaten;
}


function startTimer() { // Function to start the game timer
  gameStarted = true; // Set game started flag to true
}
