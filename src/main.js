// James Jek
// Rocket Patrol Mod
// 4/18/22
// 5 hours to complete

// Breakdown
// +5  - High score persists across scenes and displayed in UI
// +5  - Each ship's movement direction randomized at start of play
// +10 - Display time remaining on screen
// +20 - New spaceship type; faster, smaller, more points
// +20 - Add time for each ship destroyed
// +20 - Mouse control, click to fire
// +20 - New assets for ship, rocket, explosion
// Total: 100/100
let config = {
    type: Phaser.CANVAS,
    width:640,
    height:480,
    scene: [Menu, Play]
};

// set up game borders
let borderUISize = config.height / 15;
let borderPadding = borderUISize / 3;

let game = new Phaser.Game(config);
let keyF, keyR, keyLEFT, keyRIGHT, pointer;
game.highScore = 0;