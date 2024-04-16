let lungImg, darkLungImg;
let cigaretteImg, pillImg;
let cigarette, pill;
let draggedObject = null;
let showDarkLung = false;
let darkLungOpacity = 255;

function preload() {
  lungImg = loadImage('assests/lung.png');
  darkLungImg = loadImage('assests/dark_lung.png');
  cigaretteImg = loadImage('assests/cigarette.png');
  pillImg = loadImage('assests/pill.png');
}

function setup() {
  pillImg.resize(0, 50)
  cigaretteImg.resize(0,50)
  image(darkLungImg,0,0)
  createCanvas(800, 600);
  cigarette = new Draggable(100, 100, cigaretteImg.width, cigaretteImg.height, cigaretteImg);
  pill = new Draggable(200, 100, pillImg.width, pillImg.height, pillImg);
}

function draw() {
  background(255);

  if (showDarkLung) {
    // 居中显示缩放后的肺部图片
    let lungWidth = lungImg.width * 1.5;
    let lungHeight = lungImg.height * 1.5;
    let lungX = (width - lungWidth) / 2;
    let lungY = (height - lungHeight) / 2;

    // 绘制正常的肺部图片
    image(lungImg, lungX, lungY, lungWidth, lungHeight);

    // 绘制染黑的肺部图片,并设置透明度
    tint(255, darkLungOpacity);
    image(darkLungImg, lungX, lungY, lungWidth, lungHeight);
    noTint();
  } else {
    // 绘制干净的肺部图片
    image(lungImg, (width - lungImg.width) / 2, (height - lungImg.height) / 2);
  }

  // 绘制香烟和药丸
  cigarette.display();
  pill.display();

  // 检查是否有对象被拖动
  if (draggedObject) {
    draggedObject.drag();

    // 检查对象是否在肺部上
    if (draggedObject.isOver((width - lungImg.width * 1.5) / 2, (height - lungImg.height * 1.5) / 2, lungImg.width * 1.5, lungImg.height * 1.5)) {
      if (draggedObject === cigarette) {
        // 让肺部变得更黑
        darkLungOpacity = min(darkLungOpacity + 5, 255);
      } else if (draggedObject === pill) {
        // 让肺部变亮
        darkLungOpacity = max(darkLungOpacity - 5, 0);
      }
    }
  }
}

function mousePressed() {
  if (cigarette.isOver(mouseX, mouseY)) {
    draggedObject = cigarette;
  } else if (pill.isOver(mouseX, mouseY)) {
    draggedObject = pill;
  } else if (mouseX > (width - lungImg.width) / 2 && mouseX < (width + lungImg.width) / 2 && mouseY > (height - lungImg.height) / 2 && mouseY < (height + lungImg.height) / 2) {
    // 如果点击了肺部图片,切换到缩放后的肺部图片
    showDarkLung = true;
    darkLungOpacity = 255;
  }
}

function mouseReleased() {
  draggedObject = null;
}

class Draggable {
  constructor(x, y, w, h, img) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.img = img;
  }

  display() {
    // 绘制对象(香烟或药丸)
    image(this.img, this.x, this.y);
  }

  isOver(x, y, w, h) {
    return mouseX > x && mouseX < x + w && 
           mouseY > y && mouseY < y + h;
  }

  drag() {
    this.x = mouseX - this.w / 2;
    this.y = mouseY - this.h / 2;
  }
}