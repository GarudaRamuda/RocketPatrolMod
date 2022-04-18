class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super (scene, x, y, texture, frame);

        scene.add.existing(this);
        this.isFiring = false;
        this.moveSpeed = 4;
        this.sfxRocket = scene.sound.add('sfx_shoot');
    }

    update() {
        if (!this.isFiring) {
            if (keyLEFT.isDown && !game.settings.mouseMode || (pointer.worldX < this.x && game.settings.mouseMode) && this.x >= borderUISize + this.width ) {
                this.x -= this.moveSpeed;
            } else if (keyRIGHT.isDown && !game.settings.mouseMode || (pointer.worldX > this.x && game.settings.mouseMode) && this.x <= game.config.width - borderUISize - this.width) {
                this.x += this.moveSpeed;
            }
        }

        if ((Phaser.Input.Keyboard.JustDown(keyF) && !game.settings.mouseMode || pointer.isDown && game.settings.mouseMode) && !this.isFiring) {
            this.isFiring = true;
            this.sfxRocket.play();
        }

        if (this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
        }

        if (this.y <= borderUISize * 3 + borderPadding) {
            this.isFiring = false;
            this.y = game.config.height - borderUISize - borderPadding;
        }
    }

    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}