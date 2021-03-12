class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    car1 = createSprite(150,250,50,100);
    car1.addImage(car1Img);
    car2 = createSprite(350,250,50,100);
    car2.addImage(car2Img);
    car3 = createSprite(550,250,50,100);
    car3.addImage(car3Img);
    car4 = createSprite(750,250,50,100);
    car4.addImage(car4Img);
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();
   // textSize(30);
   // text("Game Start", 120, 100)
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
   //   var display_position = 130;
   var index = 0, x = 175, y
   background(180);
   image(track,0,-displayHeight*4, displayWidth, displayHeight*5);

      for(var plr in allPlayers){
        index = index+1;
        x= x+250;
        y = displayHeight-allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;
        if(index === player.index){
          cars[index-1].shapeColor = "blue";
          
          camera.position.x = displayWidth/2
          camera.position.y = cars[index-1].y;
        } 
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();

      
    }

    if(player.distance > 3860 ){
      gameState = 2;
    }
    drawSprites();

    
  }
  end(){
    console.log('gameOver');
     }
}
