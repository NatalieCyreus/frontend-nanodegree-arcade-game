// Score and level board
var Score = function() {
	ctx.clearRect(1, 405, 300, 350);
	ctx.font = "19px Arial";
	ctx.fillStyle = "black";
	ctx.textAlign = "left";
	ctx.fillText("Score " + player.score, 2.5, 350);
	ctx.fillText("Level " + player.level, 105, 350);
}

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
	this.x = x;
	this.y = y;
	this.width = 37.5;
	this.height = 25;
	this.speed = speed;
	this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game, Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	// You should multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers.
	this.x += this.speed * dt;
	if (this.x > 250) {
		this.x = -25;
	}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function(x, y) {
	this.x = x;
	this.y = y;
	this.width = 25;
	this.height = 37.5;
	this.sprite = 'images/char-horn-girl.png';
	this.score = 0;
	this.level = 1;

};

Player.prototype.reset = function() {
	this.y = 250;
	this.x = 100;
};

var enemy1 = new Enemy(-180, 85, 50);
var enemy2 = new Enemy(-40, 85, 50);
var enemy3 = new Enemy(-150, 140, 25);
var enemy4 = new Enemy(-25, 180, 25);
var allEnemies = [enemy1, enemy2, enemy3, enemy4];

var player = new Player(100, 250);

player.update = function(dt) {
	this.checkCollisions();
	this.checkWinning();
};

Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	Score();
};



function getRandomNum() {
	return Math.floor((Math.random() * 225) + 1);
};

//The gem class
var Gem = function(x, y) {
	this.x = x;
	this.y = y;
	this.width = 25;
	this.height = 37.5;
	this.sprite = "images/Gem-orange.png";
}

var gem = new Gem(getRandomNum(), 40);

Gem.prototype.reset = function() {
	this.y = 20;
	this.x = getRandomNum();
};


Gem.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width, this.height);
};

//This functions reset player and the gem get's a new random position.
Player.prototype.checkCollisions = function() {
  var allEnemiesLength = allEnemies.length;
	for (var i = 0; i < allEnemiesLength ; i++) {
		if ((this.x < allEnemies[i].x + allEnemies[i].width && this.x + this.width > allEnemies[i].x) && (this.y < allEnemies[i].y + allEnemies[i].height && this.y + this.height > allEnemies[i].y) && (this.y > 40)) {
			console.log("Collision!");
			gem.x = getRandomNum();
			this.reset();
		}
	}
}

// This function checks if gems are collected. If so the level increases and the gem colored images appear. For each level they become gray again.
Player.prototype.checkWinning = function() {
	if ((this.x < gem.x + gem.width && this.x + this.width > gem.x) && (this.y < gem.y + gem.height && this.y + this.height > gem.y)) {
		this.score += 1;
		if ((this.score === 1) || (this.score === 6) || (this.score === 11) || (this.score === 16)) {
			$('#gem1').replaceWith('<img src="images/Gem-orange.png">');

		}
		if ((this.score === 2) || (this.score === 7) || (this.score === 12) || (this.score === 17)) {
			$('#gem2').replaceWith('<img src="images/Gem-orange.png">');
		}
		if ((this.score === 3) || (this.score === 8) || (this.score === 13) || (this.score === 18)) {
			$('#gem3').replaceWith('<img src="images/Gem-orange.png">');
		}
		if ((this.score === 4) || (this.score === 9) || (this.score === 14) || (this.score === 19)) {
			$('#gem4').replaceWith('<img src="images/Gem-orange.png">');
		}
		if ((this.score === 5) || (this.score === 10) || (this.score === 15) || (this.score === 20)) {
			$('#gem5').replaceWith('<img src="images/Gem-orange.png">');
		}
		console.log(this.score);
		if ((this.score === 5) || (this.score === 10) || (this.score === 15) || (this.score === 20)) {
			this.level += 1;
			enemy1.speed += 15;
			enemy2.speed += 15;
			enemy3.speed += 20;
			enemy4.speed += 15;
		}
    // The grey gem images
		var greyGems = '<img src="images/Gem-orange-grey.png"id="gem1"><img src="images/Gem-orange-grey.png"id="gem2"><img src="images/Gem-orange-grey.png"id="gem3"><img src="images/Gem-orange-grey.png"id="gem4"><img src="images/Gem-orange-grey.png"id="gem5">';

		if ((this.level === 2) && (this.score === 5)) {
			$('#boy').replaceWith('<img src="images/char-boy.png">')
			start();
			$('#gems').replaceWith('<div class="row" id="gemsLevel2">' + greyGems + '</div>');
		}
		if ((this.level === 3) && (this.score === 10)) {
			$('#cat').replaceWith('<img src="images/char-cat-girl.png">')
			start();
			$('#gemsLevel2').replaceWith('<div class="row" id="gemsLevel3">' + greyGems + '</div>');
		}
		if ((this.level === 4) && (this.score === 15)) {
			$('#pink').replaceWith('<img src="images/char-pink-girl.png">')
			start();
			$('#gemsLevel3').replaceWith('<div class="row" id="gemsLevel4">' + greyGems + '</div>');
		}
		if ((this.level === 5) && (this.score === 20)) {

			$('#princess').replaceWith('<img src="images/char-princess-girl.png">')
			winnerText();
			this.level = 1;
			this.score = 0;

		}
		setTimeout(this.reset(), 1600);
		gem.x = getRandomNum();
	}
}


// Level Up message
$(document).ready(function() {
	$("#someDiv").hide();
});

function start() {
	$("#someDiv").show();
	setTimeout(function() {
		$("#someDiv").fadeOut(1000, function() {
			$(this).hide();
		});
	}, 2000);
}

// Winner message
$(document).ready(function() {
	$("#winnerMessage").hide();
});

function winnerText() {
	$("#winnerMessage").show();
}

//position plus size . make a foor lopp to go through each enemy and see the position.
player.handleInput = function(direction) {
	if (direction === 'left' && this.x >= 50) {
		this.x -= 50;
	}
	if (direction === 'up' && this.y >= 15) {
		this.y -= 40;
	}
	if (direction === 'right' && this.x <= 152.5) {
		this.x += 50;
	}
	if (direction === 'down' && this.y <= 152.5) {
		this.y += 40;
	}
}


// This listens for key presses and sends the keys to your Player.handleInput() method.
document.addEventListener('keyup', function(e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});

// The start modal
var modal = document.getElementById('myModal');

var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function() {
	modal.style.display = "block";
}
span.onclick = function() {
	modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it.
window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
}
