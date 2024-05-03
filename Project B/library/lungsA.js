let lungImg, cigaretteImg, boneImg;
let lungX, lungY; // Dynamic centering of the lung image, with adjustment
let lungScale = 1; // Starting scale for the lung image
let cigaretteX = 100, cigaretteY = 100;
let boneX, boneY, boneScale = 1;
let showBone = true; // Initially, the bone image is visible
let draggingItem = null;
let clickable = true;
let damageSpots = []; // Array to hold damage spots
let currentSpot = null; // Variable to hold the current spot
let spotGrowthRate = 0.1; // Rate at which the spot grows
let maxSpotSize = 50; // Maximum size for the spot
let backButton;

let breathDirection = 1; // Variable to control the direction of breathing
let breathSpeed = 0.003; // Speed at which the lung breathes

function preload() {
  lungImg = loadImage('assets/lung.png');
  cigaretteImg = loadImage('assets/cigarette.png');
  boneImg = loadImage('assets/bone.png');
}

function setup() {
  createCanvas(800, 600);
  cigaretteImg.resize(0, 50);

  // Center lung initially, then move slightly to the left
  lungX = width / 2 - 4;
  lungY = height / 2;

  boneX = (width - (boneImg.width * boneScale)) / 2 - 50;
  boneY = (height - (boneImg.height * boneScale)) / 2;

  // Create back button
  backButton = createButton('Back');
  backButton.position(100, 190);
  backButton.mousePressed(goBack);
  // Style the button
  backButton.style('padding', '10px 20px');
  backButton.style('background-color', '#ffcc00'); // Cartoonish yellow
  backButton.style('border', 'none');
  backButton.style('border-radius', '10px');
  backButton.style('font-size', '18px');
  backButton.style('font-weight', 'bold');
  backButton.style('color', '#ffffff'); // White text
  backButton.style('text-transform', 'uppercase');
  backButton.style('cursor', 'pointer');
  backButton.style('transition', 'background-color 0.3s');
}


function draw() {
  background(255);
  
  // Adjust lung scale based on breathing
  lungScale += breathDirection * breathSpeed;
  
  // Reverse direction if lung is fully expanded or contracted
  if (lungScale >= 1.2 || lungScale <= 1) {
    breathDirection *= -1;
  }
  
  // Draw lung image with dynamic scale and dark tint
  tint(150); // Apply a dark tint
  imageMode(CENTER);
  image(lungImg, lungX, lungY, lungImg.width * lungScale, lungImg.height * lungScale);
  imageMode(CORNER);
  noTint(); // Reset tint

  // Drawing damage spots
  fill(0, 0, 0, 100); // Semi-transparent black
  noStroke();
  damageSpots.forEach(spot => {
    ellipse(spot.x, spot.y, spot.size, spot.size); // Draw an ellipse at each damage spot with dynamic size
    if (spot.size < maxSpotSize) {
      spot.size += spot.growing ? spotGrowthRate : 0; // Increase size if it's marked as growing
      if (spot.size >= maxSpotSize) {
        spot.growing = false; // Stop growing if it reaches the maximum size
      }
    }
  });

  if (showBone) {
    tint(255, 150);
    image(boneImg, boneX, boneY, boneImg.width * boneScale, boneImg.height * boneScale);
  }

  noTint();

  if (lungScale >= 1.5) {
    image(cigaretteImg, cigaretteX, cigaretteY);
  }

  clickable = lungScale < 1.5;
}

function mousePressed() {
  if (showBone) {
    showBone = false;
  }

  if (clickable && dist(mouseX, mouseY, lungX, lungY) < lungImg.width * lungScale / 2) {
    lungScale = Math.min(lungScale + 0.1, 1.5);
  }

  if (lungScale >= 1.5) {
    if (dist(mouseX, mouseY, cigaretteX, cigaretteY) < 50) {
      draggingItem = 'cigarette';
    }
  }
}

function mouseDragged() {
  if (draggingItem === 'cigarette') {
    cigaretteX = mouseX;
    cigaretteY = mouseY;
    
    // Check if the pixel under the cigarette is part of the lung
    if (dist(mouseX, mouseY, lungX, lungY) < lungImg.width * lungScale / 2) {
      // Convert canvas coordinates to image coordinates
      let imgX = Math.floor((mouseX - lungX + (lungImg.width * lungScale / 2)) / lungScale);
      let imgY = Math.floor((mouseY - lungY + (lungImg.height * lungScale / 2)) / lungScale);

      lungImg.loadPixels();
      let index = (imgY * lungImg.width + imgX) * 4;
      
      // Check if the pixel alpha value is not zero
      if (lungImg.pixels[index + 3] > 0) {
        // Check if the spot already exists at this location
        currentSpot = damageSpots.find(spot => dist(spot.x, spot.y, mouseX, mouseY) < spot.size / 2);
        
        if (!currentSpot) {
          // Add new damage spot if one doesn't already exist
          damageSpots.push({x: mouseX, y: mouseY, size: 20, growing: true});
        }
      }
    }
  }
}

function mouseReleased() {
  draggingItem = null;
  currentSpot = null;
}

function goBack() {
  // Redirect to another HTML page
  window.location.href = "animation.html";
}
