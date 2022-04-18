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