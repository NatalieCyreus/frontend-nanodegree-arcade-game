# Classic Arcade Game 
===============================

## How to play 
The evil monster have hidden your friends and your mission is to save them! 
For each 5 diamonds, the monster give you one friend back. But for each friend you get back, you level up. With each level increase the bugs move faster. 
The player have a startposition on the grass. There is a stone highway where the evil bugs transports. The purpose is to pass the enemies and the water to collect the diamonds on the other side of the river. 

## How it runs
There is 4 classes. 
### 1. Score 
The score class write the score and level board to the canvas. The score and level increases with the player class. 
### 2. Enemy 
The Enemy class creates the enemies and set their speed and position. The enemy objects are listed in an array.  
### 3. Player 
The player class creates the player and its position. The player class is used to check for collisions with the enemy objects and the gem. With collision with the gem the the score increases, and the level increases depending on the score. 
In the `checkWinnig` function the gem images also changes.  
### 4. Gem
The gem class use a function to get a random number so that the gem change position if either a enemy collision, or a gem collection occurs. 

   

