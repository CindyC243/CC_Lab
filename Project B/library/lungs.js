let lungImg, cigaretteImg, pillImg, boneImg;
let lungX, lungY; // Dynamic centering of the lung image, with adjustment
let lungScale = 1; // Starting scale for the lung image
let cigaretteX = 100, cigaretteY = 100;
let pillX = 600, pillY = 100;
let boneX, boneY, boneScale = 1;
let showBone = true; // Initially, the bone image is visible
let draggingItem = null;
let clickable = true;
let damageSpots = []; // Array to hold damage spots

function preload() {
  lungImg = loadImage('assets/lung.png');
  cigaretteImg = loadImage('assets/cigarette.png');
  pillImg = loadImage('assets/pill.png');
  boneImg = loadImage('assets/bone.png');
  darkImg = loadImage('assets/dark_lung.png');
}

function setup() {
  createCanvas(800, 600);
  pillImg.resize(0, 50);
  cigaretteImg.resize(0, 50);

  // Center lung initially, then move slightly to the left
  lungX = width / 2 - 4;
  lungY = height / 2;

  boneX = (width - (boneImg.width * boneScale)) / 2 - 50;
  boneY = (height - (boneImg.height * boneScale)) / 2;
}

function draw() {
  background(255);
  imageMode(CENTER);
  image(lungImg, lungX, lungY, lungImg.width * lungScale, lungImg.height * lungScale);
  imageMode(CORNER);

  // Drawing damage spots
  fill(0, 0, 0, 100); // Semi-transparent black
  noStroke();
  damageSpots.forEach(spot => {
    ellipse(spot.x, spot.y, 20, 20); // Draw an ellipse at each damage spot
  });

  if (showBone) {
    tint(255, 150);
    image(boneImg, boneX, boneY, boneImg.width * boneScale, boneImg.height * boneScale);
  }

  noTint();

  if (lungScale >= 1.5) {
    image(cigaretteImg, cigaretteX, cigaretteY);
    image(pillImg, pillX, pillY);
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
    } else if (dist(mouseX, mouseY, pillX, pillY) < 50) {
      draggingItem = 'pill';
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
        // Add damage spot if the pixel is part of the lung
        damageSpots.push({x: mouseX, y: mouseY});
      }
    }
  } else if (draggingItem === 'pill') {
    pillX = mouseX;
    pillY = mouseY;
    // Check for collision with existing damage spots and remove them
    damageSpots = damageSpots.filter(spot => dist(mouseX, mouseY, spot.x, spot.y) > 20);
  }
}

function mouseReleased() {
  draggingItem = null;
}
