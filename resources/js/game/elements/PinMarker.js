import Phaser from "phaser";

class PinMarker extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, scene.cameras.main.centerX, scene.cameras.main.centerY, 'pinMarkerImage');

        this.scene = scene;
        this.obtainX.bind(this);
        this.obtainY.bind(this);

        this.setOrigin(0.5, 0.5);

        let x = this.obtainX(scene.game.markerObject.x);
        let y = this.obtainY(scene.game.markerObject.y);

        this.setX(x);
        this.setY(y);

        this.setFrame(0);

        this.loading = false;

        this.scene.add.existing(this);

        this.markerListener();

        this.loadingListener();

        this.moveTween.bind(this);
    }

    update([time, delta]) {
        if (this.loading) {
            this.angle += 5;
        }
    }

    markerListener() {
        this.scene.game.emitter.on("marker", (markerObject) => {
            let targetY = this.obtainY(markerObject.y);
            let targetX = this.obtainX(markerObject.x);

            this.moveTween(targetY, targetX);
        });
    }

    loadingListener() {
        this.scene.game.emitter.on("loading", (loadingValue) => {
            if (loadingValue) {
                this.loading = true;
                this.setFrame(1);
                return;
            }

            this.loading = false;
            this.setFrame(0);
            this.setAngle(0);
        });
    }

    obtainY(objY) {
        objY = parseInt(objY);

        let y = this.scene.cameras.main.height - objY;

        if (0 >= (y - this.displayHeight / 2)) {
            y += this.displayHeight / 2;
        }

        if (this.scene.cameras.main.height <= (y + this.displayHeight / 2)) {
            y -= this.displayHeight / 2;
        }

        return y;
    }

    obtainX(objX) {
        let x = parseInt(objX);

        if (0 >= (x - this.displayWidth / 2)) {
            x += this.displayWidth / 2;
        }

        if (this.scene.cameras.main.width <= (x + this.displayWidth / 2)) {
            x -= this.displayWidth / 2;
        }

        return x;
    }

    moveTween(targetY, targetX) {
        this.scene.tweens.add({
            targets: this,
            y: targetY,
            x: targetX,
            duration: 500,
            ease: Phaser.Math.Easing.Sine.InOut,
        });
    }
}

export default PinMarker;
