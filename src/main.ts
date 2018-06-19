// This is the entry point to the application as referenced by webpack which handles all the dependencies required herein.

import "phaser";
import MenuScene from "./scenes/menu";
import GameScene from "./scenes/game";
import LoadScene from "./scenes/load";
import Settings from "./static/settings";

var main: Main = null;

class Main extends Phaser.Game {
    constructor() {
        super({
            type: Phaser.AUTO,
            width: Settings.gameWidth,
            height: Settings.gameHeight,
            backgroundColor: Settings.backgroundColour,
            title: Settings.gameTitle,
            scene: [LoadScene, MenuScene, GameScene]

        });
        this.resize(window.innerWidth, window.innerHeight);

        window.addEventListener('resize', (event) => {
            this.resize(window.innerWidth, window.innerHeight);
        }, false);
        this.events.on('resize', this.resize, this);
    }

    public resize(width: number, height: number) {
        var windowRatio = width / height;
        var gameRatio = Settings.gameRatio;
        if (windowRatio < gameRatio) {
            this.canvas.style.width = width + "px";
            this.canvas.style.height = (width / gameRatio) + "px";
        }
        else {
            this.canvas.style.width = (height * gameRatio) + "px";
            this.canvas.style.height = height + "px";
        }
    }
}

window.onload = () => {
    if (main == null) {
        main = new Main();
    }
}
