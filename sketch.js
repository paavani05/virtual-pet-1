var dogImg, happyDogImg, dog, happyDog, database, foodS, foodStock;

function preload()
{
	dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite(250, 250);
  dog.addImage("dog", dogImg);
  dog.scale = 0.15;
  foodStock = database.ref('food');
  foodStock.on("value", readStock);
}


function draw() { 
  background("green");
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }
  drawSprites();
  fill("white");
  textSize(25);
  text("food remaining:" + foodS, 170, 180);
  text("press up arrow key to feed the dog!", 70, 70);
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    food:x
  })
}

