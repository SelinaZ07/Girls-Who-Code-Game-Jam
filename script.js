//Press a button to choose your path
//See the README file for more information

/* VARIABLES */
let enterButton;
let a1Button;
let a2Button;
let b1Button;
let b2Button;
let screen = 0;
let catcher, fallingObject;
let score=0;
let missedObjects = [];
let baseline = 500;
let catcherImg;
let fallingObjectImg;
let backgroundImg;

function preload(){
  catcherImg= loadImage("assets/Screenshot 2025-08-06 194422.png");
  fallingObjectImg= loadImage("assets/images.png");
  backgroundImg= loadImage("assets/istockphoto-1545193103-612x612.jpg");
}
/* SETUP RUNS ONCE */
function setup() {
  createCanvas(500, 500);
  textAlign(CENTER);
  textWrap(WORD); 
  noStroke();
//resize images
  catcherImg.resize(80,0);  
  fallingObjectImg.resize(50,0);
  // Set up the home screen
  background("lavender");
  textSize(24);
  textFont("Impact")
  text(
    "Welcome to Catch the Hope!",
    width / 2,
    height / 2 - 100
  );
  //Create falling object and catcher
  fallingObject = new Sprite(fallingObjectImg,-1000,-1000,30);
  fallingObject.color = color(139,69,19); 
  fallingObject.vel.y = 0;
  fallingObject.bounciness = 0; 

  //Create catcher 
  catcher = new Sprite(catcherImg,-1000,-1000,70,70,"k");
  catcher.color = color(95,158,160);
  catcher.bounciness = 0; 

  // Create buttons for all screens
  textSize(18);
enterButton= new Sprite (width/2, height/2 + 100);
  a1Button= new Sprite (-200, -200);
  a2Button= new Sprite (-50, -50);
  b1Button= new Sprite (-100, -100);
  b2Button= new Sprite (-150, -150);
  c1Button= new Sprite (-200, -200);
}

/* DRAW LOOP REPEATS */
function draw() {
  // Display enter button only on screen 0
  if (screen == 0) {
    enterButton.width = 100;
    enterButton.height = 50;
    enterButton.collider = "k";
    enterButton.color = "orange";
    enterButton.text = "Start";
  }
  // Check enter button only on screen 0
  if (screen == 0 && enterButton.mouse.presses()) {
    print("pressed");
    showScreen1();
    screen = 1;
  }
  if (screen==1){
    if (a1Button.mouse.presses ()){
      print ("display screen 2");
      showScreen2();
      screen=2;
    } else if (a2Button.mouse.presses ()){
      print ("display screen 5");
      showScreen3();
      screen=3;
    }
  } else if (screen==2){
    if (b1Button.mouse.presses ()){
      print ("display screen 3");
      showScreen3();
      screen=3;
    } else if (b2Button.mouse.presses ()){
      showScreen4();
      screen=4;
    }
  }else if (screen==4){
    if (c1Button.mouse.presses ()){
      print ("display screen 3");
      showScreen3();
      screen=3;
    }
  }
  if (screen == 3){
    background(backgroundImg);
    textSize(20);
    text("Score:"+ score, 50, 20);
    text("Missed: " + missedObjects.length, 50, 45);
    
    // Draw the baseline
    stroke(255, 0, 0);
    strokeWeight(2);
    line(0, baseline, width, baseline);
    noStroke();
    
    if (mouseIsPressed){
      catcher.vel.y = -3;
      catcher.vel.x = 0;
    } else{
      catcher.vel.y = 1;
      catcher.vel.x = 0;
    }
  }
  // Only update falling object physics when on screen 3
  if (screen == 3) {
    //If falling object reaches baseline, it becomes a missed object
    if (fallingObject.y >= baseline - 15) {
      // Create a new missed object at the baseline
      let missedObj = new Sprite(fallingObject.x, baseline - 15, 30);
      missedObj.color = color(139,69,19);
      missedObj.vel.y = 0;
      missedObj.collider = "n"; 
      missedObj.bounciness = 0; 
      missedObjects.push(missedObj);
      
      // Raise the baseline
      baseline -= 3;
      
      // Reset falling object to top, constrained within canvas bounds
      fallingObject.y = 0;
      fallingObject.x = random(15, width - 15); 
      fallingObject.vel.y = random(1,5);
      fallingObject.vel.x = 0; 
    }
    //move catcher with left and right arrow keys
    if (kb.pressing("left")){
      catcher.vel.x = -3;
    }
      else if (kb.pressing("right")){
      catcher.vel.x = 3;
      } else {
      catcher.vel.x = 0;
    }
    //stop catcher at edges of screen
    if (catcher.x < 50){
      catcher.x = 50;
    }
    else if (catcher.x > 500){
      catcher.x = 500;
    }
    //Check if catcher hits the rising baseline
    if (catcher.y + 35 >= baseline) {
      print ("display screen 4");
      showScreen4();
      screen=4;
    }
    
    //If fallingObject collide with catcher, move fallingObject back to random at top
    if (fallingObject.collides(catcher)){
      fallingObject.y = 0;
      fallingObject.x = random(15, width - 15);
      fallingObject.vel.y = random(1,3);
      fallingObject.vel.x = 0;
      fallingObject.direction = "down";
      score=score+1;
    }
    
  } else {
    // Stop the falling object movement when not on screen 3
    fallingObject.vel.y = 0;
    catcher.vel.x = 0;
  }
}

/* FUNCTIONS TO DISPLAY SCREENS */
function showScreen1(){
  background("paleturquoise");
  textSize(24); 
  textFont("Comic Sans MS")
  text(
    "Please choose an option below to proceed!",
    width / 2,
    height / 2 - 100

  );
  enterButton.pos = {x: -1000, y: -1000}; 
  // Hide catcher and fallingObject on screen 1
  catcher.pos = { x: -1000, y: -1000 };
  fallingObject.pos = { x: -1000, y: -1000 };
  fallingObject.vel.y = 0;
  // Add A1 button
  a1Button.pos = { x: width / 2 - 90, y: height / 2 + 120 };
  a1Button.width = 150;
  a1Button.height = 50;
  a1Button.collider = "k";
  a1Button.color = "plum";
  a1Button.text = "View Instructions";
  // Add A2 button
  a2Button.pos = { x: width / 2 + 90, y: height / 2 + 120 };
  a2Button.width = 150;
  a2Button.height = 50;
  a2Button.collider = "k";
  a2Button.color = "plum";
  a2Button.text = "Start Game";

}
function showScreen2(){
  background("lightblue");
  textSize(20);
  textFont("Georgia")
  text(
    "Please read the instructions below carefully:",
    width / 2,
    height / 2 - 130
  );

  textSize(18); 
  text(
    "In this game, you need to keep pressing your mouse\nto keep the bird in the sky. If the bird hits the baseline,\nyou will lose the game. You can also use your left and\nright keys on your keyboard to collect the rewards\nin the sky. The awards that you missed will accumulate\nat the bottom, eventually shifting your baseline up!",
    width / 2,
    height / 2 - 60
  );
  a1Button.pos = { x:-200, y:-200 };
  a2Button.pos = {x: -50, y:-50 };
  // Hide catcher and fallingObject on screen 2
  catcher.pos = { x: -1000, y: -1000 };
  fallingObject.pos = { x: -1000, y: -1000 };
  fallingObject.vel.y = 0;
  // Add B1 button
  textSize(12); 
  b1Button.pos = { x: width / 2 , y: height / 2 +120 };
  b1Button.width = 150;
  b1Button.height = 50;
  b1Button.collider = "k";
  b1Button.color = "plum";
  b1Button.text = "Start Game";
  // Add B2 button
  // b2Button.pos = { x: width / 2 + 50, y: height / 2 + 100 };
  // b2Button.width = 50;
  // b2Button.height = 50;
  // b2Button.collider = "k";
  // b2Button.color = "plum";
  // b2Button.text = "B2";
}
function showScreen3(){
  background(backgroundImg);

  b1Button.pos = { x:-100, y:-100 };
  b2Button.pos = {x: -150, y:-150 };
  a1Button.pos = { x:-200, y:-200 };
  a2Button.pos = {x: -150, y:-150 };
  c1Button.pos = { x:-200, y:-200 };

  // Position catcher and fallingObject for screen 3
  fallingObject.pos = { x: 100, y: 0 };
  fallingObject.vel.y = 2;
  catcher.pos = { x: width/2, y: height/2 };
  
  // Reset missed objects and baseline for new game
  for (let obj of missedObjects) {
    obj.remove();
  }
  missedObjects = [];
  baseline = 500;
}
function showScreen4(){
  // Game Over!
  background("red");
  textSize(30);
  text("Oops! You lost the game!", width/2, height/2-50);
  text("Final Score: " + score, width/2, height/2 -10);
  c1Button.pos = { x: width / 2, y: height / 2 + 40 };
  c1Button.width = 100;
  c1Button.height = 50;
  c1Button.collider = "k";
  c1Button.color = "White";
  c1Button.text = "Restart";
  score=0;
  // Hide all game sprites
  catcher.pos = { x: -1000, y: -1000 };
  fallingObject.pos = { x: -1000, y: -1000 };
  catcher.vel.x = 0;
  catcher.vel.y = 0;
  fallingObject.vel.y = 0;
  
  // Remove all missed objects from the screen
  for (let obj of missedObjects) {
    obj.pos = { x: -1000, y: -1000 };
  }
  
  // Hide all buttons
  enterButton.pos = {x: -1000, y: -1000}; 
  a1Button.pos = { x:-200, y:-200 };
  a2Button.pos = {x: -150, y:-150 };
  b1Button.pos = { x:-100, y:-100 };
  b2Button.pos = {x: -150, y:-150 };
}