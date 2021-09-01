import Phaser from "phaser";

class PinMarker extends Phaser.Physics.Arcade.Sprite {
    minY = 0;
    maxY = 0;
    minX = 0;
    maxX = 0;

    constructor(scene) {
        super(scene, scene.cameras.main.centerX, scene.cameras.main.centerY, 'pinMarkerImage');

        this.scene = scene;
        this.obtainX.bind(this);
        this.obtainY.bind(this);

        this.setOrigin(0.5, 0.5);

        this.setMinMaxY();
        this.setMinMaxX();

        let x = this.obtainX(scene.game.markerObject.x);
        let y = this.obtainY(scene.game.markerObject.y);

        this.setX(x);
        this.setY(y);

        this.setFrame(0);

        this.loading = false;

        this.scene.add.existing(this);

        this.markerListener();

        this.loadingListener();

        this.resizeListener();

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
            this.setAngle(0);
        });
    }

    resizeListener() {
        this.scene.game.emitter.on("resized", () => {
            this.setMinMaxY();
            this.setMinMaxX();

        });
    }

    obtainY(objY) {
        objY = parseInt(objY);

        let y = this.scene.cameras.main.height - objY;

        if (y < this.minY) {
            return this.minY;
        }

        if (y > this.maxY) {
            return this.maxY
        }

        return y;
    }

    obtainX(objX) {
        let x = parseInt(objX);

        if (x < this.minX) {
            return this.minX;
        }

        if (x > this.maxX) {
            return this.maxX;
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

    setMinMaxY() {
        this.minY = parseInt(this.displayHeight / 2);
        this.maxY = parseInt(this.scene.cameras.main.height - this.displayHeight / 2);
    }

    setMinMaxX() {
        this.minX = parseInt(this.displayWidth / 2);
        this.maxX = parseInt(this.scene.cameras.main.width - this.displayWidth / 2);
    }
}

export default PinMarker;
