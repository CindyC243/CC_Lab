let teenSmokeImg, adultImg, elderSmokeImg, blacklung;

function preload() {
  teenSmokeImg = loadImage('assets/teensmoke.png');
  adultImg = loadImage('assets/adultsmoke.png');
  elderSmokeImg = loadImage('assets/eldersmoke.png');
  blacklung = loadImage('assets/darklung.png');
  normallung = loadImage('assets/lung.png')
}

function setup() {
  createCanvas(800, 600);

  let imgWidth = 200;
  let imgHeight = 200;
  let margin = 50;
  let totalWidth = 3 * imgWidth + 2 * margin;

  //hi

  let startX = (width - totalWidth) / 2;
  let startY = height - imgHeight - margin;

  image(teenSmokeImg, startX, startY, imgWidth, imgHeight);
  image(adultImg, startX + imgWidth + margin, startY, imgWidth, imgHeight);
  image(elderSmokeImg, startX + 2 * (imgWidth + margin), startY, imgWidth, imgHeight);

  textAlign(CENTER, CENTER);
  textSize(14);
  fill(255);
  text("Teens: 3 years of smoking", startX + imgWidth / 2, startY - 30);
  text("Adult: 20 years of smoking", startX + imgWidth + margin + imgWidth / 2, startY - 30);
  text("Elder: 60 years of smoking", startX + 2 * (imgWidth + margin) + imgWidth / 2, startY - 30);
  text("Normal?", startX + imgWidth + margin + imgWidth / 2, startY - 270);

  textSize(30);
  text("Click On The Age Group You Want To Explore", width / 2, 50);

  let blacklungWidth = 200; 
  let blacklungHeight = 200; 
  let blacklungX = width / 2 - blacklungWidth / 2;
  let blacklungY = 100; 
  image(blacklung, blacklungX, blacklungY, blacklungWidth, blacklungHeight);
}

function mousePressed() {
  let imgWidth = 200;
  let imgHeight = 200;
  let margin = 50;
  let startX = (width - 3 * imgWidth - 2 * margin) / 2;
  let startY = height - imgHeight - margin;


  if (mouseX >= startX && mouseX <= startX + imgWidth && mouseY >= startY && mouseY <= startY + imgHeight) {
    window.location.href = "animation2.html";
  }

  if (mouseX >= startX + imgWidth + margin && mouseX <= startX + 2 * (imgWidth + margin) && mouseY >= startY && mouseY <= startY + imgHeight) {
    window.location.href = "animation3.html";
  }

  if (mouseX >= startX + 2 * (imgWidth + margin) && mouseX <= startX + 3 * (imgWidth + margin) && mouseY >= startY && mouseY <= startY + imgHeight) {
    window.location.href = "animation4.html";
  }

}
