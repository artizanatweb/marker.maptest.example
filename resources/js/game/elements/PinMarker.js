import Phaser from "phaser";

class PinMarker extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, scene.cameras.main.centerX, scene.cameras.main.centerY, 'pinMarkerImage');

        this.scene = scene;

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
    }

    update([time, delta]) {
        if (this.loading) {
            this.angle += 5;
        }
    }

    markerListener() {
        this.scene.game.emitter.on("marker", (markerObject) => {
            this.setX(this.obtainX(markerObject.x));
            this.setY(this.obtainY(markerObject.y));
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
        let y = this.scene.cameras.main.height - objY;

        if (0 >= (objY - this.displayHeight)) {
            y -= this.displayHeight / 2;
        }

        if (this.scene.cameras.main.height <= (objY + this.displayHeight)) {
            y += this.displayHeight / 2;
        }

        return y;
    }

    obtainX(objX) {
        let x = objX;

        if (0 >= (objX - this.displayWidth)) {
            x += this.displayWidth / 2;
        }

        if (this.scene.cameras.main.width <= (objX + this.displayWidth)) {
            x -= this.displayWidth / 2;
        }

        return x;
    }
}

export default PinMarker;
