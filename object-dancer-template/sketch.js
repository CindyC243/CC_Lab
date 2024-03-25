/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new Cindy_Dancer (width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class Cindy_Dancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.angle = 0;
    this.amplitude = 10;
    // add properties for your dancer here:
    //..
    //..
    //..
    this.col = (200,300,200)
  }
  update() {
    this.angle += 0.2;
  }
  display() {
    // the push and pop, along with the translate 
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.

    push();
    translate(this.x, this.y);
    rectMode(CENTER);
    push();
translate(-100, -100);
    // ******** //
    // ⬇️ draw your dancer from here ⬇️
 // Feet
 
 let feetmove = sin(this.angle) * this.amplitude;
 rect(76, 180 + feetmove, 45, 20, 65, 65, 65, 65);
 rect(117, 180 - feetmove, 45, 20, 65, 65, 65, 65);

 // Body
 fill(30, 144, 255);
 rectMode(CENTER);
 let bodymove = sin(this.angle) * this.amplitude/2;
 rect(100, 140 + bodymove, 90, 90, 65, 65, 65, 65);
 circle(85, 60 + bodymove / 2, 50);

 // Belly
 fill(255);
 let bellymove = sin(this.angle) * this.amplitude / 4;
 circle(100, 140 + bellymove, 70);

 // Head
 fill(30, 144, 255);
 circle(100, 53 + bodymove / 2, 100);
 fill(255);
 circle(100, 60 + bodymove / 2, 80);

 // Nose
 fill(255, 0, 0);
 let nosemove = sin(this.angle) * this.amplitude / 4;
 circle(97.5 + nosemove, 43 + bodymove / 2, 15);
 fill(255);
 circle(95 + nosemove / 2, 40 + bodymove / 2, 5);

 // Whisker
 let whiskermove = sin(this.angle) * this.amplitude / 8;
 line(80 + whiskermove, 53 + bodymove / 2, 40 + whiskermove, 53 + bodymove / 2);
 line(80 + whiskermove, 60 + bodymove / 2, 40 + whiskermove, 65 + bodymove / 2);
 line(80 + whiskermove, 67 + bodymove / 2, 40 + whiskermove, 77 + bodymove / 2);
 line(120 - whiskermove, 53 + bodymove / 2, 160 - whiskermove, 53 + bodymove / 2);
 line(120 - whiskermove, 60 + bodymove / 2, 160 - whiskermove, 65 + bodymove / 2);
 line(120 - whiskermove, 67 + bodymove / 2, 160 - whiskermove, 77 + bodymove / 2);

 // Eyes
 fill(255); // White
 let eyemove = sin(this.angle) * this.amplitude / 8;
 circle(85 + eyemove, 28 + bodymove / 2, 25);
 circle(110 + eyemove, 28 + bodymove / 2, 25);
 fill(0); // Black
 circle(90 + eyemove / 2, 28 + bodymove / 2, 8);
 circle(105 + eyemove / 2, 28 + bodymove / 2, 8);
 fill(255); // White
 circle(90 + eyemove / 2, 28 + bodymove / 2, 3);
 circle(105 + eyemove / 2, 28 + bodymove / 2, 3);

 // Mouth
 let mouthmove = sin(this.angle) * this.amplitude / 4;
 arc(100 + mouthmove / 2, 65 + bodymove / 2, 60, 40, 0.2, PI - 0.2);
 line(97.5 + mouthmove / 2, 50 + bodymove / 2, 98 + mouthmove / 2, 83 + bodymove / 2);

 // Pocket
 fill(255);
 let pocketmove = sin(this.angle) * this.amplitude / 4;
 arc(100 + pocketmove / 2, 135 + bodymove / 2, 45, 50, 0, PI);
 rectMode(CENTER);
 rect(100 + pocketmove / 2, 135 + bodymove / 2, 45, 0.5);

 // Bell
 fill(255, 0, 0);
 let bellmove = sin(this.angle) * this.amplitude / 4;
 rectMode(CENTER);
 rect(100 + bellmove / 2, 104 + bodymove / 2, 50, 6, 65, 65);
 fill(255, 255, 0);
 circle(99 + bellmove / 2, 107 + bodymove / 2, 13);

 // Hand
 fill(255);
 let handmove = sin(this.angle) * this.amplitude / 2;
 circle(145 + handmove / 2, 120 + bodymove / 2, 25);
 circle(55 + handmove / 2, 120 + bodymove / 2, 25);
pop();




    // ⬆️ draw your dancer above ⬆️
    // ******** //

    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    // of your dancer.
    // it is using "this" because this function, too, 
    // is a part if your Dancer object.
    // comment it out or delete it eventually.
    // this.drawReferenceShapes()

    pop();
       
    }
    
    
  
  drawReferenceShapes() {
    noFill();
    stroke(255, 0, 0);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);
    rect(0, 0, 200, 200);
    fill(255);
    stroke(0);
  }

}


/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/