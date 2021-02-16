
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var background;
var score = 0;
var banana, obstacle;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
 
  var survivalTime = 0;
  
  monkey = createSprite(80,315,10,10);
monkey.addAnimation("moving", monkey_running);
monkey.scale=0.1; 
 
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  
 foodGroup = new Group(); 
  obstacleGroup = new Group();
  
}

function draw() {
background(255);
 
 score = score + Math.round(frameCount/60);  
  
if(ground.x<0) {
ground.x=ground.width/2;
  } 
 
  if(keyDown("space") ) {
  monkey.velocityY = -12;
}

  monkey.velocityY = monkey.velocityY + 0.8; 
  
 monkey.collide(ground); 
 spawnFood();
 spawnObstacles();
  
  drawSprites(); 

stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+score, 500, 50);

  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time: "+ survivalTime, 100,50);
  
    if(obstacleGroup.isTouching(monkey)){
        ground.velocityX = 0;
        monkey.velocityY = 0;
        obstacleGroup.setVelocityXEach(0);
        foodGroup.setVelocityXEach(0);
        obstacleGroup.setLifetimeEach(-1);
        foodGroup.setLifetimeEach(-1);
    } 
}
 
  function spawnFood() {
   
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    
    banana.lifetime = 300;
    banana.scale=0.15;
     
    banana.addImage(bananaImage);
    monkey.depth = banana.depth + 1;
    foodGroup.add(banana);
  }
  }
function spawnObstacles() {

 if (frameCount % 150 === 0){  
   obstacle = createSprite(420,317,200,200);
  obstacle.velocityX= -7;

  obstacle.addImage(obstacleImage);
 obstacle.scale=0.15;
  
obstacle.lifetime=300;  
obstacle.addImage(obstacleImage);
 obstacle.scale=0.15;
  obstacleGroup.add(obstacle);
 }
}

