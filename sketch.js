var checkpoint
var die,jump
var trexstop
var PLAY=1
var END=0
var gamestate=PLAY
var score=0
var gameover,gameoverImage,restart,restartimage
var cactusGroup
var cloud,cloudImage,cloudgroup
var trex,treximage,ground,groundimage,invisibleground
var obstacle1Image,obstacle2Image,obstacle3Image,obstacle4Image,obstacle5Image,obstacle6Image,cactuss
function preload(){
 treximage=loadAnimation("trex1.png","trex3.png","trex4.png")
 groundimage=loadImage("ground2.png")
 cloudImage=loadImage("cloud.png")
obstacle1Image=loadImage("obstacle1.png")
obstacle2Image=loadImage("obstacle2.png")
obstacle3Image=loadImage("obstacle3.png")
obstacle4Image=loadImage("obstacle4.png")
obstacle5Image=loadImage("obstacle5.png")
obstacle6Image=loadImage("obstacle6.png")
gameoverImage=loadImage("gameOver.png")
restartimage=loadImage("restart.png")
trexstop=loadAnimation("trex_collided.png")
die=loadSound("die.mp3")
jump=loadSound("jump.mp3")
checkpoint=loadSound("checkPoint.mp3")  
}
function setup(){
 createCanvas(600,200)
 trex=createSprite(50,180,20,20)
 trex.addAnimation("treximage",treximage)
 trex.scale=0.5
trex.addAnimation("trexstop",trexstop)  
 ground=createSprite(300,180,600,30)
 ground.addImage("groundImage",groundimage)
  invisibleground=createSprite(300,187,600,5)
 invisibleground.visible=false
 cloudgroup=new Group()
cactusGroup=new Group()
gameover=createSprite(240,50,10,10)
gameover.addImage(gameoverImage)
gameover.visible=false
 restart=createSprite(240,120,10,10)
restart.addImage(restartimage)
restart.visible=false
  
}
function draw(){
 background("white")
drawSprites()
text("score-"+score,280,30)
if(score%100===0){checkpoint.play()}  
 if(gamestate===PLAY){
if(frameCount%3         ===0){score=score+1}   
if(ground.x<0){
 ground.x=ground.width/2  
 }
 console.log(trex.y) 
 ground.velocityX=-3 
if(keyDown("space")&&trex.y>120){
  trex.velocityY=-10
jump.play()  
  }
trex.velocityY=trex.velocityY+0.8
clouds()
cactus() 
if(cactusGroup.isTouching(trex)){
gamestate=END
die.play()  
}
 }    
  
else if(gamestate===END){
ground.velocityX=0
trex.velocityY=0
cloudgroup.setVelocityXEach(0)
cactusGroup.setVelocityXEach(0)  
gameover.visible=true
restart.visible=true
cloudgroup.setLifetimeEach(-1)
cactusGroup.setLifetimeEach(-5)
trex.changeAnimation("trexstop",trexstop)
if(mousePressedOver(restart)){
reset()  
}  
}  
 
      
 trex.collide(invisibleground)
 
 
}
function clouds(){
if(frameCount%60===0){
 cloud=createSprite(600,100,10,10)
cloud.velocityX=-3
cloud.y=Math.round(random(5,150))  
cloud.addImage("cloudImage",cloudImage)
cloud.lifetime=600/3
cloud.depth=trex.depth
trex.depth=trex.depth+1
cloudgroup.add(cloud)  
}
 
} 
function cactus(){
if(frameCount%100===0){
cactuss=createSprite(600,160,10,10)
cactuss.velocityX=-5
var abc=Math.round(random(1,6))
switch(abc){
  case 1:cactuss.addImage(obstacle1Image)
break
case 2:cactuss.addImage(obstacle2Image)
break
case 3:cactuss.addImage(obstacle3Image)
break
case 4:cactuss.addImage(obstacle4Image)
break
case 5:cactuss.addImage(obstacle5Image)
break
case 6:cactuss.addImage(obstacle6Image)
break
default:break

}
cactuss.scale=0.5
cactuss.lifetime=120
cactusGroup.add(cactuss)    
}

}
function reset(){
gamestate=PLAY
gameover.visible=false
restart.visible=false
score=0
cloudgroup.destroyEach()
cactusGroup.destroyEach()
trex.changeAnimation("treximage",treximage)  
  
}