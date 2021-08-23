import Phaser from "phaser";
import PinMarkerImage from "./../../../assets/marker.png";
import PinMarker from "../elements/PinMarker";

class DefaultScene extends Phaser.Scene {
    constructor() {
        super("DefaultScene");
    }

    preload() {
        this.load.spritesheet('pinMarkerImage', PinMarkerImage, {
            frameHeight: 64,
            frameWidth: 64,
        });
    }

    create() {
        this.pinMarker = new PinMarker(this);
    }

    update(time, delta) {
        this.pinMarker.update([time, delta]);
    }
}

export default DefaultScene;
