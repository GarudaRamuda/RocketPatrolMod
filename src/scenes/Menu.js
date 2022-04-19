class Menu extends Phaser.Scene {
    constructor() {
        super("menu");
    }

    preload() {
        //load audio
        this.load.audio('sfx_select', './assets/select.wav');
        this.load.audio('sfx_shoot', './assets/shoot.wav');
        this.load.audio('sfx_explosion', './assets/explosion.wav');
    }

    create() {
        let menuConfig = {
            fontFamily: 'Corbel',
            fontSize: '28px',
            backgroundColor: '#92E8C0',
            color: '#000000',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 0
        }
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Use ←→ to move & (F) to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize * 2 + borderPadding * 4, 'Left click or right click\n for Novice and Expert mouse controls', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize * 4 + borderPadding * 4, `High Score: ${game.highScore}`, menuConfig).setOrigin(0.5);
    
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        pointer = this.input.activePointer;
        this.input.mouse.disableContextMenu();
    }

    update() {
        console.log(pointer.leftButtonDown());
        if (Phaser.Input.Keyboard.JustDown(keyLEFT) || pointer.leftButtonDown()) {
            // easy mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 30000,
                mouseMode: (pointer.leftButtonDown() ? true : false),
            }
            this.sound.play('sfx_select');
            this.scene.start('play');
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT) || pointer.rightButtonDown()) {
            // hard mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 25000,
                mouseMode: (pointer.rightButtonDown() ? true : false),
            }
            this.sound.play('sfx_select');
            this.scene.start('play');
        }
    }
}
