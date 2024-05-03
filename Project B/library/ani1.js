let teenSmokeImg, adultImg, elderSmokeImg;

function preload() {
  // Load images
  teenSmokeImg = loadImage('assets/teensmoke.png');
  adultImg = loadImage('assets/adultsmoke.png');
  elderSmokeImg = loadImage('assets/eldersmoke.png');
}

function setup() {
  createCanvas(800, 600); // Adjust canvas size as needed

  // Display images at the bottom
  let imgWidth = 200;
  let imgHeight = 200;
  let margin = 50; // Margin between images
  let totalWidth = 3 * imgWidth + 2 * margin; // Total width of all images and margins

  let startX = (width - totalWidth) / 2; // Starting x-coordinate to center images horizontally
  let startY = height - imgHeight - margin; // Starting y-coordinate at the bottom with a margin

  image(teenSmokeImg, startX, startY, imgWidth, imgHeight);
  image(adultImg, startX + imgWidth + margin, startY, imgWidth, imgHeight);
  image(elderSmokeImg, startX + 2 * (imgWidth + margin), startY, imgWidth, imgHeight);

  // Add text above the images
  textAlign(CENTER, CENTER);
  textSize(14);
  fill(255);
  text("Teens: 3 years of smoking", startX + imgWidth / 2, startY - 30);
  text("Adult: 20 years of smoking", startX + imgWidth + margin + imgWidth / 2, startY - 30);
  text("Elder: 60 years of smoking", startX + 2 * (imgWidth + margin) + imgWidth / 2, startY - 30);
}

function mousePressed() {
  let imgWidth = 200;
  let imgHeight = 200;
  let margin = 50;
  let startX = (width - 3 * imgWidth - 2 * margin) / 2;
  let startY = height - imgHeight - margin;

  // Check if the mouse is within the area of the teen image
  if (mouseX >= startX && mouseX <= startX + imgWidth && mouseY >= startY && mouseY <= startY + imgHeight) {
    // Redirect to another p5.js sketch or URL for teens
    window.location.href = "animation2.html";
  }

  // Check if the mouse is within the area of the adult image
  if (mouseX >= startX + imgWidth + margin && mouseX <= startX + 2 * (imgWidth + margin) && mouseY >= startY && mouseY <= startY + imgHeight) {
    // Redirect to another p5.js sketch or URL for adults
    window.location.href = "animation3.html";
  }

  // Check if the mouse is within the area of the elder image
  if (mouseX >= startX + 2 * (imgWidth + margin) && mouseX <= startX + 3 * (imgWidth + margin) && mouseY >= startY && mouseY <= startY + imgHeight) {
    // Redirect to another p5.js sketch or URL for elders
    window.location.href = "animation4.html";
  }
  
}

