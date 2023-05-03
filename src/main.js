// Wendy Chen
// Rocket Patrol Fighter
// 10 hours
/* Mods 
- Speed increase after 30 secs (5)
- Add your own (copyright-free) background music to the Play scene (please be mindful of the volume) (5)
- Allow the player to control the Rocket after it's fired (5)
- Track a high score that persists across scenes and display it in the UI (5)
- Implement the 'FIRE' UI text from the original game (5)
- Create a new scrolling tile sprite for the background (5)
- Display the time remaining (in seconds) on the screen (10)
- Create a new title screen (e.g., new artwork, typography, layout) (10)
- Create 4 new explosion sound effects and randomize which one plays on impact (10)
- Implement a new timing/scoring mechanism that adds time to the clock for successful hits (15)
- Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (15)
- Implement mouse control for player movement and mouse click to fire (15)
*/
// Cite: https://www.pixilart.com/draw 
// https://pixabay.com/music/search/game%20music/

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
  }

let game = new Phaser.Game(config);

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let input;
let cursorx;
let cursory;
let mousedown = false; 
let highscore = 0;