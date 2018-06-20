// This is the entry point to the application as referenced by webpack which handles all the dependencies required herein.

import "phaser";
import MenuScene from "./scenes/menu";
import GameScene from "./scenes/game";
import Settings from "./static/settings";
import FacebookInstant from "./static/facebook";


class Load extends Phaser.Scene {
    private _loaded: boolean = false;

    constructor() {
        super({ key: Settings.loadScene });
    }

    public async preload() {
        if (!this._loaded) {
            this.load.on('progress', (value: number) => {
                const percent = Math.abs(100 * value);
                FacebookInstant.SetLoadingProgress(percent);
            });
            this.load.on('complete', async () => {
                this._loaded = true;
                console.log('loaded')
                FacebookInstant.SetLoadingProgress(100);
            });
            this.load.svg('exit', 'assets/images/exit.svg');
            this.load.svg('happy', 'assets/images/happy.svg');
            this.load.svg('pause', 'assets/images/pause.svg');
            this.load.svg('play', 'assets/images/play.svg');
            this.load.svg('restart', 'assets/images/restart.svg');
        } else {
            this.scene.start(Settings.menuScene);
        }
    }

    public create() {
        console.log('create')
        FacebookInstant.StartGameAsync()
            .then(() => {
                console.log('start')
                this.scene.start(Settings.menuScene);
            });
    }
}

class Main extends Phaser.Game {
    constructor() {
        super({
            type: Phaser.AUTO,
            width: Settings.gameWidth,
            height: Settings.gameHeight,
            backgroundColor: Settings.backgroundColour,
            title: Settings.gameTitle,
            scene: [Load, MenuScene, GameScene]
        });

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
var main: Main = null;

window.onload = async () => {
    await FacebookInstant.InitializeAsync();
    main = new Main();
    main.resize(window.innerWidth, window.innerHeight);

    window.addEventListener('resize', (event) => {
        main.resize(window.innerWidth, window.innerHeight);
    }, false);
}
