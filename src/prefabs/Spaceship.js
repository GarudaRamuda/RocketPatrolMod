class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.setScale(1.5);
        this.points = pointValue;
        this.moveSpeed = game.settings.spaceshipSpeed;
        this.moveReverse = (Math.floor(Math.random() * 2) ? true : false);
        if (this.moveReverse) {
            this.flipX = true;
        }
    }

    update() {
        this.x -= (this.moveReverse ? this.moveSpeed * -1 : this.moveSpeed);

        if (this.moveReverse ? this.x >= game.config.width + this.width : this.x <= 0 - this.width) {
            this.reset();
        }

    }
    reset() {
            this.x = (this.moveReverse ? 0 - this.width : game.config.width);
    }
}

class Striker extends Spaceship {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame, pointValue);
        this.moveSpeed = Math.floor(this.moveSpeed * 1.4);
    }
}