import Phaser from "phaser";
import DefaultScene from "./scenes/DefaultScene";

class MapGame extends Phaser.Game {
    constructor(container, mapObject, markerObject, emitter) {
        const config = {
            type: Phaser.AUTO,
            backgroundColor: 0xeaeaea,
            scale: {
                mode: Phaser.Scale.FIT,
                parent: container,
                autoCenter: Phaser.Scale.CENTER_BOTH,
                width: parseInt(mapObject.width),
                height: parseInt(mapObject.height),
            },
            scene: [
                DefaultScene,
            ],
            physics: {
                default: "arcade",
                arcade: {
                    fps: 30,
                    debug: false,
                    gravity: { y: 0 }
                },
            },
        };

        super(config);

        this.parentElement = container;

        this.emitter = emitter;

        this.markerObject = markerObject;

        this.activateListeners();
    }

    activateListeners() {
        this.emitter.on("map", (mapObject) => {
            let height = parseInt(mapObject.height);
            let width = parseInt(mapObject.width);

            this.scale.setGameSize(width, height);
            this.renderer.resize(width, height);

            this.canvas.style.margin = 0;
        });
    }
}

export default MapGame;
