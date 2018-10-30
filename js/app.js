"use strict";

var winDialog = document.querySelector('#modalDlg.w3-modal');

// Enemies our player must avoid
var Enemy = function(locX, locY, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
	this.x = locX;
	this.y = locY;
	this.speed = speed;
	this.width = 171;
	this.height = 101;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	if(this.x >= 500){
		this.x=  0;
	}
	this.x += dt + Math.floor(Math.random() * 10);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
var Player = function() {
	this.sprite = 'images/char-horn-girl.png';
	this.x = 200;
	this.y = 400;
	this.width = 171;
	this.height = 101;
};

// update function for collision with enemies or by reaching the water
Player.prototype.update = function(dt) {
	for (let enemy = 0; enemy < allEnemies.length; enemy++) {
      if (allEnemies[enemy].x < this.x &&
        allEnemies[enemy].x + 70 > this.x &&
        allEnemies[enemy].y < this.y &&
        30 + allEnemies[enemy].y > this.y) {
          this.reset();
      }
	  if (this.y === -15) {
		  this.win();
	  }
    } 
};

Player.prototype.win = function() {
	// open win dialog
	winDialog.style.display="inline";
	// block user input with player
	Player.prototype.handleInput = undefined;
};

/* // play again: it doesn't work
document.querySelector('#playAgain').addEventListener('click', function(){
	winDialog.style.display="none";
	
	
}) */


// render player
Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// reset player position when collision occurs
Player.prototype.reset = function() {
	this.x = 200;
	this.y = 400;
};

// change player position
Player.prototype.handleInput = function(key) {	
	if(key === "left" && this.x > 0){
		this.x-=101;
	}
	if(key === "right" && this.x < 402){
		this.x+=101;
	}
	if(key === "down" && this.y < 390){
		this.y+=83;
	}
	if(key === "up" && this.y > 0){
		this.y-=83;
	}
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemy1 = new Enemy(0,58);
var enemy2 = new Enemy(0,141);
var enemy3 = new Enemy(0,228);
var allEnemies=[enemy1,enemy2,enemy3];

var player = new Player();


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




