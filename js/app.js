// Enemies our player must avoid
//Constructor function. - N
var Enemy = function(x, y, speed) {

  this.x = x;
  this.y = y;
  this.width = 75;
  this.height = 50;
  this.speed = speed;
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
};

var high;
var speed = 100;
var lowSpeed = 65;
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed*dt;
    if (this.x > 500){
      this.x = -50;
    }
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    drawBox(this.x, this.y + 77, 100, 67, "yellow");
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y) {
  this.x = x;
  this.y = y;
  this.width = 50;
  this.height = 75;
  this.sprite = "images/char-horn-girl.png";
};

Player.prototype.reset = function() {
        this.y = 400;
        this.x = 200;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy (-360, 60, 100);
var enemy2 = new Enemy (-80, 60, 100);
var enemy3 = new Enemy (-300, 140, 100);
var enemy4 = new Enemy (-50, 230, 100);

var allEnemies = [];
allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);
allEnemies.push(enemy4);

var player = new Player(200, 400);

player.update = function(dt) {
  this.checkCollisions();
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  drawBox(this.x, this.y + 77, 100, 67, "pink");
};


var playerBox = {x: player.x + 16 , y: player.y + 63 , width: 70, height: 75};

Player.prototype.checkCollisions = function() {
    console.log("checkCollisions");
    for(var i = 0; i < allEnemies.length; i++){
      if ((player.x < allEnemies[i].x + allEnemies[i].width && player.x + player.width > allEnemies[i].x)&&(player.y < allEnemies[i].y + allEnemies[i].height && player.y + player.height > allEnemies[i].y)&& (player.y > 50)){
        console.log("Collision!");
            this.reset();
        }
    }

  }


    //position plus size . make a foor lopp to go through each enemy and see the position.

player.handleInput = function(direction){
  if(direction === 'left' && this.x >= 100) {
    this.x -= 100;
  }
  if(direction === 'up' && this.y >= 30) {
    this.y -= 82.5;
  }
  if(direction === 'right' && this.x <= 305) {
    this.x += 100;
  }
  if(direction === 'down' && this.y <= 350){
    this.y += 82.5;
    }
}

function drawBox(x, y, width, height, color) {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.stroke();
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
