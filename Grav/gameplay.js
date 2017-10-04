var xmlns = 'https://www.w3.org/2000/svg'

//set scene variables
var titleScene = document.querySelector('#home');
var gameScene = document.querySelector('#game');
var replayScene = document.querySelector('#replay');

//set game variables
var svg = document.querySelector('svg')
var player = svg.children[0];
var ceiling = svg.children[1];
var floor = svg.children[2];
var enemy1 = svg.children[3];
var enemy2 = svg.children[4];
var enemy3 = svg.children[5];
var enemy4 = svg.children[6];
var enemy5 = svg.children[7];
var enemy6 = svg.children[8];
var enemy7 = svg.children[9];
var enemy8 = svg.children[10];
var enemy9 = svg.children[11];
var enemy10 = svg.children[12];
var enemy11 = svg.children[13];
var enemySpeed = 0;
var enemies = [];
var chance = .5;
var scoreText = document.querySelector("#score");
var score = 0;
var endScore = document.querySelector("#endScore");

// display title scene
{
 var showTitle = function() {
   titleScene.style.display = 'block'
   gameScene.style.display = 'none'
   replayScene.style.display = 'none'
   player.accel = 0;
   player.speed = 0;
 }
}
 

 // display game
{
 var showGame = function() {
	score = 0;
	titleScene.style.display = 'none'
	gameScene.style.display = 'block'
	replayScene.style.display = 'none'
	enemySpeed = -7;
 }
}
 
 
 // display replay
{
 var showReplay = function() {
   titleScene.style.display = 'none'
   gameScene.style.display = 'none'
   replayScene.style.display = 'block'
   player.accel = 0;
   player.speed = 0;
   enemySpeed = 0;
   enemyReset();
   endScore.innerHTML = "Score: " + score;   
 }
}

 var createNewEnemy = function() {
	enemies.push(enemy1);
	enemies.push(enemy2);
	enemies.push(enemy3);
	enemies.push(enemy4);
	enemies.push(enemy5);
	enemies.push(enemy6);
	enemies.push(enemy7);
	enemies.push(enemy8);
	enemies.push(enemy9);
	enemies.push(enemy10);
	enemies.push(enemy11);
	
  }



//change the speed
document.onkeydown = changeAccel;
player.speed = 0;
function changeAccel(e) {
	
	e = window.event;
	
	//down arrow
	if(e.keyCode === 38)
	{
		player.accel = -.4;		
	}
	//up arrow
	else if(e.keyCode === 40)
	{
		player.accel = .4;			
	}	
} 

document.ontouchstart = changeAccel2;
function changeAccel2(e) {
	
	e = window.event;
	
	//set accel
	player.accel = .4;
	
	if(e.bubbles)
	{
		player.accel *= -1;
	}
}

var changeSpeed = function()
{
	player.speed += player.accel;
}

//move the player
var movePlayer = function(){	
	var yPos = parseFloat( player.getAttribute( 'y' ) )
      yPos += player.speed
      player.setAttribute( 'y', yPos )	  
}

//move the enemy
var moveEnemy = function(enemy){	
	var xPos = parseFloat( enemy.getAttribute( 'x' ) )
      xPos += Math.random() * enemySpeed
      enemy.setAttribute( 'x', xPos )
	  
	  if(xPos < 0)
	  {
		xPos = Math.random() * 2000 + 1500;
		enemy.setAttribute( 'x', xPos )		  
	  }
	  
}

//set the collision on the floor
var floorCollision = function()
{
	//gets the bounding box for the svg element
	var playerBox = player.getBBox()
	var ceilingBox = ceiling.getBBox()
	var floorBox = floor.getBBox()
	
	//collision check for ceiling
		if(playerBox.x + playerBox.width > ceilingBox.x && playerBox.x < ceilingBox.x + ceilingBox.width)
			{
				if(playerBox.y + playerBox.height > ceilingBox.y && playerBox.y < ceilingBox.y + ceilingBox.height)
					{
						//stop movement and reset height						
						player.speed = 0;						
						player.setAttribute('y', 50);
					}
			}
			
		//collision check for floor
		if(playerBox.x + playerBox.width > floorBox.x && playerBox.x < floorBox.x + floorBox.width)
			{
				if(playerBox.y + playerBox.height > floorBox.y && playerBox.y < floorBox.y + floorBox.height)
					{
						//stop movement and reset height						
						player.speed = 0;
						player.setAttribute('y', 360);
					}
			}

		
}

var enemyCollision = function(enemy)
{
	var playerBox = player.getBBox()
	var enemyBox = enemy.getBBox()
	
	//collision check for ceiling
		if(playerBox.x + playerBox.width > enemyBox.x && playerBox.x < enemyBox.x + enemyBox.width)
			{
				if(playerBox.y + playerBox.height > enemyBox.y && playerBox.y < enemyBox.y + enemyBox.height)
					{
						showReplay()
					}
			}
}

var enemyReset = function(){
	enemy1.setAttribute('x',1500);
	enemy2.setAttribute('x',1900);
	enemy3.setAttribute('x',1900);
	enemy4.setAttribute('x',2300);
	enemy5.setAttribute('x',2300);
	enemy6.setAttribute('x',1800);
	enemy7.setAttribute('x',1800);
	enemy8.setAttribute('x',2000);
	enemy9.setAttribute('x',2000);
	enemy10.setAttribute('x',2600);
	enemy11.setAttribute('x',2600);
}

 var changeScore = function()
 {
	// update score
    score += 10
    
    // in a SVG <text> tag we update via the .textContent property
    scoreText.textContent = 'score: ' + score
 }


//update
setInterval( function() {changeSpeed()}, 1000/60 )
setInterval( function() {movePlayer()}, 1000/60 )
setInterval( function() {enemies.forEach( moveEnemy )}, 1000/60)
setInterval( function() {enemies.forEach( enemyCollision )}, 1000/60)
setInterval( function() {floorCollision()}, 1000/60 )
setInterval( function() {changeScore()}, 1000 )


 
// assign action to "start game" button
var startBtn = document.querySelector('#start')
startBtn.onclick = showGame
 
var replayBtn = document.querySelector('#re')
replayBtn.onclick = showGame

 showTitle();
 createNewEnemy();
 

