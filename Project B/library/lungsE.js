let lungImg, cigaretteImg, boneImg, skullImg; // Added skullImg
let lungX, lungY;
let lungScale = 1;
let cigaretteX = 100, cigaretteY = 100;
let boneX, boneY, boneScale = 1;
let showBone = true;
let draggingItem = null;
let clickable = true;
let damageSpots = [];
let currentSpot = null;
let spotGrowthRate = 0.1;
let maxSpotSize = 50;
let backButton;

let breathDirection = 1;
let breathSpeed = 0.001;

let skullAppeared = false; // Added boolean to track if skull has appeared

function preload() {
  lungImg = loadImage('assets/lung.png');
  cigaretteImg = loadImage('assets/cigarette.png');
  boneImg = loadImage('assets/bone.png');
  skullImg = loadImage('assets/skull.png'); 
}

function setup() {
  createCanvas(800, 600);
  cigaretteImg.resize(0, 50);

  lungX = width / 2 - 4;
  lungY = height / 2;

  boneX = (width - (boneImg.width * boneScale)) / 2 - 50;
  boneY = (height - (boneImg.height * boneScale)) / 2;

  backButton = createButton('Back');
  backButton.position(100, 190);
  backButton.mousePressed(goBack);
  backButton.style('padding', '10px 20px');
  backButton.style('background-color', '#ffcc00');
  backButton.style('border', 'none');
  backButton.style('border-radius', '10px');
  backButton.style('font-size', '18px');
  backButton.style('font-weight', 'bold');
  backButton.style('color', '#ffffff');
  backButton.style('text-transform', 'uppercase');
  backButton.style('cursor', 'pointer');
  backButton.style('transition', 'background-color 0.3s');
}

function draw() {
  background(255);

  lungScale += breathDirection * breathSpeed;

  if (lungScale >= 1.2 || lungScale <= 1) {
    breathDirection *= -1;
  }

  tint(50);
  imageMode(CENTER);
  image(lungImg, lungX, lungY, lungImg.width * lungScale, lungImg.height * lungScale);
  imageMode(CORNER);
  noTint();

  fill(0, 0, 0, 100);
  noStroke();
  damageSpots.forEach(spot => {
    ellipse(spot.x, spot.y, spot.size, spot.size);
    if (spot.size < maxSpotSize) {
      spot.size += spot.growing ? spotGrowthRate : 0;
      if (spot.size >= maxSpotSize) {
        spot.growing = false;
      }
    }
  });

  if (showBone) {
    tint(255, 150);
    image(boneImg, boneX, boneY, boneImg.width * boneScale, boneImg.height * boneScale);
  }

  noTint();

  if (lungScale >= 1.5 && !skullAppeared) { // Check if skull hasn't appeared
    image(cigaretteImg, cigaretteX, cigaretteY);
  }

  if (damageSpots.length > 50) {
    image(skullImg, width / 3, height / 4);
    skullAppeared = true; // Set skull appeared to true
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
  if (!skullAppeared && draggingItem === 'cigarette') { 
    cigaretteX = mouseX;
    cigaretteY = mouseY;

    if (dist(mouseX, mouseY, lungX, lungY) < lungImg.width * lungScale / 2) {
      let imgX = Math.floor((mouseX - lungX + (lungImg.width * lungScale / 2)) / lungScale);
      let imgY = Math.floor((mouseY - lungY + (lungImg.height * lungScale / 2)) / lungScale);

      lungImg.loadPixels();
      let index = (imgY * lungImg.width + imgX) * 4;

      if (lungImg.pixels[index + 3] > 0) {
        currentSpot = damageSpots.find(spot => dist(spot.x, spot.y, mouseX, mouseY) < spot.size / 2);
        if (!currentSpot) {
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
  window.location.href = "animation.html";
}
