const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

var engine;
var world;

var batsman, stumps1,stumps2;
var ground;
var ball, sling;
var bowlerImg; 
var umpire,umpireImg;

var stadium1,stadium2
var score = 0;
var wickets = 0;
var MaxWickets = 10;

var cricket;

var background;

var start;

var gameState = "start";
var gameState = "play";
var gameState= "end";

var umpire,umpireImg

function preload(){
stadium1 = loadImage("IMAGES/stadium1.jpg");
stadium2 = loadImage("IMAGES/stadium2.jpg");
bowlerImg = loadImage("IMAGES/bowler.png");
umpireImg = loadImage("IMAGES/umpire.png");
cricket = loadImage("IMAGES/cricket.jpg");
start = loadImage("IMAGES/start.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
engine = Engine.create();
world = engine.world;

ground = new Ground(windowWidth/2, 600, windowWidth, 50);

ground2 = new Ground2(200,600,10,50);
ground3 = new Ground2(300,600,10,50);
ground4 = new Ground2(1190,600,10,50);
ground5 = new Ground2(575,2650,5);
ground6 = new Ground2(10,625,2700,5);

batsman = new Batsman(1250, 550, 65, 100);
stumps1 = new Wickets(1350, 550, 40, 150);
stumps2 = new Wickets(130, 550, 40, 150);
ball = new Ball(200, 450, 20, 20);
sling = new Sling(ball.body, {x: 240, y: 455});


}

function draw() {
  background(stadium1);  

  push();
  if(gameState="start"){
    
   fill("yellow");
  textSize(25);
  text("1]Press space to start and play , get the ball back " , 380,50);

  }
  if(keyCode===32){
    gameState="play"

  fill("yellow");
  textSize(25);
  text("Runs: " + score, 50,50);
  text("Wickets: " + wickets, 50, 100);
  text("2]drag the ball in order to release it. ", 380, 100);

  fill("yellow");
  textSize(25);
  text("Runs: " + score, 50,50);
  text("Wickets: " + wickets, 50, 100);
  text("3]take 10 wickets ", 380, 150);
pop();

Engine.update(engine);


cricket.depth=stadium1.depth+1

  ground.display();

  image(umpireImg, 10, 480, 80, 100);
  image(bowlerImg, 200, 400, 80, 200);
  batsman.display();
  stumps1.display();
  stumps2.display();
  sling.display();
  ball.display();

  ground2.display();
  ground3.display();
  ground4.display();
  ground5.display();
  ground6.display();

drawSprites()


detectcollision1();
detectcollision2();

if(wickets >= MaxWickets){
gameState = "end";
textSize(40);
text("GAME OVER", 680, 300);
text("Runs: "+ score, 680, 350);
text("Wickets: "+ wickets, 680, 400);
}
  }
if(gameState==="end"){
  
}
}

function mouseDragged(){
  Matter.Body.setPosition(ball.body, {x: mouseX, y: mouseY});
}

function detectcollision1(){
var distance = dist(ball.body.position.x, ball.body.position.y, batsman.body.position.x, batsman.body.position.y);

if((distance <= ball.width + batsman.width) && ball.body.velocity.x > 20){
score = score + 1
}
}
function detectcollision2(){
  var distance = dist(ball.body.position.x, ball.body.position.y, stumps1.body.position.x, stumps1.body.position.y);
  
  if((distance < ball.width + stumps1.width) && ball.body.velocity.x >1){
  wickets = wickets + 1;
  }
  }
  function keyPressed(){
    if(keyCode === 32){
      Matter.Body.setPosition(ball.body, {x: 240, y: 455});
      sling.attach(ball.body);
    }
  }
  function mouseReleased(){
    sling.fly();
    }
  