let ball, ball2;
let balls = [];
function setup() {
  let canvas = createCanvas(500, 400);
  canvas.parent("canvasContainer");
  background(220);

  ball = new Ball(200,100);
  ball2 = new Ball(100,200);

  for(let i = 0; i < 20; i++){
    let b = new Ball(random(width), random(height))
    balls.push(b);
  }

  console.log(balls);
}

function draw() {
  background(200);
  /*ball.display();
  ball.move();
  ball.bounce();

  ball2.display();
  ball2.move();
  ball2.bounce();*/

  for(let i = 0; i < balls.length; i++){
    balls[i].display();
    balls[i].move();
    balls[i].bounce();
  }
}


class Ball{

  constructor(xPos, yPos){
    this.x = xPos;
    this.y = yPos;
    this.xSpd = random(-3,3);
    this.ySpd = random(-3,3);
    this.size = random(5,50);
    this.col = [random(255), random(255), random(255)]
  }

  move(){
    this.x += this.xSpd;
    this.y += this.ySpd;
  }

  bounce(){
    if(this.x > width || this.x < 0){
      this.xSpd *= -1
    }
    if(this.y > height || this.y < 0){
      this.ySpd *= -1;
  }
}

  display(){
    fill(this.col[0], this.col[1], this.col[2]);
    circle(this.x, this.y, this.size);
  }
}