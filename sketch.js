var PLAY = 1;
var END = 0;
var gameState = PLAY;

var canva;
var bgImg;
var spaceShip,SpaceShipImg;

var score = 0;

function preload(){
    SpaceShipImg = loadImage("SpaceShipimg.png")
    enemyImage = loadImage("enemy.png");
    bullateImage = loadImage("bullate.png");

    restartImg = loadImage("restart.png");
    gameOverImg = loadImage("gameOver.png");
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);

  spaceShip = createSprite(displayWidth/2, displayHeight/2+200,100,100);
  spaceShip.addImage("SpaceShip",SpaceShipImg);
  spaceShip.scale=0.2;
  //  spaceShip.debug = true
  spaceShip.setCollider("rectangle",0,0,300,300);

  gameOver = createSprite(displayWidth/2 - 40 , displayHeight/2 - 80);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.5;

  restart = createSprite(displayWidth/2 - 30, displayHeight/2-30);
  restart.addImage(restartImg);
  restart.scale=0.5;

  enemyGroup = new Group();
  bullateGroup = new Group();
}
function draw(){
  background(225);
  if(gameState === PLAY){
      gameOver.visible = false;
      restart.visible = false;

   if (keyDown("space")) {
    createBullate();
  } 
  if(keyDown("right_arrow")){
    spaceShip.x = spaceShip.x + 3;
  }  
   if(keyDown("left_arrow")){
    spaceShip.x = spaceShip.x - 3;
  } 
  if(keyIsDown(UP_ARROW)){
    spaceShip.y = spaceShip.y - 3;
  }
  if(keyIsDown(DOWN_ARROW)){
    spaceShip.y = spaceShip.y + 3;
  }  
  if(bullateGroup.isTouching(enemyGroup)){
    enemyGroup.destroyEach();
    bullateGroup.destroyEach();
    score=score+1;
  }
  if(enemyGroup.isTouching(spaceShip)){
    gameState = END;  
}
CreateEnemy();
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;

    enemyGroup.setLifetimeEach(-1);
       enemyGroup.setVelocityYEach(0);

         bullateGroup.setLifetimeEach(-1);
       bullateGroup.setVelocityYEach(0);

       spaceShip.velocityY = 0;
    }
    if(mousePressedOver(restart)) {
      reset();
    }
  drawSprites();
  textSize(20);
  text("score: "+score,1200,600);
}
function reset(){
  
  gameState=PLAY;
  
  gameOver.visible=false;
  restart.visible=false;
  
  enemyGroup.destroyEach();
  bullateGroup.destroyEach();
    
  score=0;
  
}
function CreateEnemy(){
   if (frameCount % 50 === 0){
  enemy = createSprite(500,100,10,10);
  enemy.addImage(enemyImage);
  enemy.x=Math.round(random(10,1200));
  enemy.velocityY = +5; 
  enemy.lifetime = 200;
  //  enemy.debug = true
  enemy.setCollider("rectangle",0,0,80,50);
  enemyGroup.add(enemy);
  }}
  function createBullate() {
    var bullate= createSprite(100, 100, 60, 10);
    bullate.addImage(bullateImage);
    bullate.x = 360;
    bullate.x=spaceShip.x;
    bullate.y=spaceShip.y;
    bullate.velocityY = -4;
    bullate.lifetime = 200;
    bullate.scale = 1.5;
    bullateGroup.add(bullate);
  }  