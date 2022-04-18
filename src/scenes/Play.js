// TODO: finish mouse movement, add mouse option to menu and make the player choose
// TODO: make rocket slightly controllable after launch
// TODO: display highscore on menu, format the highscore
class Play extends Phaser.Scene {
    constructor() {
        super("play");
    }

    preload() {
        //load sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('striker', './assets/striker.png'); // change later
        this.load.image('starfield', './assets/starfield.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 3});
    }

    create() {
        this.starfield = this.add.tileSprite(0,0, 640, 480, 'starfield').setOrigin(0,0);

        console.log(game.highScore);        

        this.p1Rocket = new Rocket(this, game.config.width / 2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0,0);

        this.ship01 = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 4, 'spaceship', 0, 30).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize * 3, borderUISize * 6 + borderPadding, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize * 6 + borderPadding * 4, 'spaceship', 0, 10).setOrigin(0,0);
        this.striker = new Striker(this, game.config.width + borderUISize * 4, borderUISize * 4 + borderPadding * 3, 'striker', 0, 60).setOrigin(0,0);

        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);

        this.ships = [this.ship01, this.ship02, this.ship03, this.striker];
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        pointer = this.input.activePointer;
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 3, first: 0}),
            frameRate: 30
        })

        this.p1Score = 0;

        this.scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, this.scoreConfig);
        this.gameOver = false;
        //clock
        this.scoreConfig.fixedWidth = 0;

        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            if (game.highScore < this.p1Score) game.highScore = this.p1Score;
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', this.scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu',
        this.scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 128, `${game.highScore}`, this.scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
        this.timeDisplay = this.add.text(game.config.width - borderUISize - borderPadding * 4   , borderUISize + borderPadding*2, Math.ceil(this.clock.getRemainingSeconds()), this.scoreConfig);
    }

    update() {
        // check for restart
        this.timeDisplay.text = Math.ceil(this.clock.getRemainingSeconds());
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menu");
        }
        if (!this.gameOver){
            this.starfield.tilePositionX -= 1;
            this.p1Rocket.update();
            for (let i = 0; i < this.ships.length; i++) {
                this.ships[i].update();
            }
        }

        for (let i = 0; i < this.ships.length; i++) {
            if (this.checkCollision(this.ships[i], this.p1Rocket)) {       
            this.p1Rocket.reset();
            this.shipExplode(this.ships[i]);
            }    
        }
    }


    checkCollision(ship, rocket) {
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
                return true;
            } else {
                return false;
            }
    }

    shipExplode(ship) {
        ship.alpha = 0;

        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0,0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;

        this.clock.reset({  delay: this.clock.getRemaining() + ship.points * 30,
                            callback:   () => {
                                            if (game.highScore < this.p1Score) game.highScore = this.p1Score;
                                            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', this.scoreConfig).setOrigin(0.5);
                                            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu',
                                            this.scoreConfig).setOrigin(0.5);
                                            this.add.text(game.config.width/2, game.config.height/2 + 128, `${game.highScore}`, this.scoreConfig).setOrigin(0.5);
                                            this.gameOver = true;
                                        },
                            callbackScope: this,
        })
        this.sound.play('sfx_explosion')
    }
}