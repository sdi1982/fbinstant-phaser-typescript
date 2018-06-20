// This is the entry point to the application as referenced by webpack which handles all the dependencies required herein.

import "phaser";
import MenuScene from "./scenes/menu";
import GameScene from "./scenes/game";
import PauseScene from "./scenes/pause";
import Settings from "./static/settings";
import FacebookInstant from "./static/facebook";

var game: Phaser.Game = null;

function preload() {
    console.log('Game.preload()');
    this.load.on('progress', (value: number) => {
        const percent = Math.abs(100 * value);
        FacebookInstant.SetLoadingProgress(percent);
    });
    this.load.on('complete', () => {
        console.log('Game loading complete')
    });
    this.load.on('filecomplete', (file: any) => {
        console.log(`${file} file loaded`);
    })
    this.load.svg('exit', 'assets/images/exit.svg');
    this.load.svg('pause', 'assets/images/pause.svg');
    this.load.svg('play', 'assets/images/play.svg');
    this.load.svg('restart', 'assets/images/restart.svg');
}

function create() {
    console.log('Game.create()');
    FacebookInstant.StartGameAsync()
        .then((value: boolean) => {
            console.log('FBInstant StartGameAsync', value);
            this.scene.start(Settings.menuScene);
        });
}
function resize(width: number, height: number) {
    console.log(`Game.resize(${width},${height})`);
    var windowRatio = width / height;
    var gameRatio = Settings.gameRatio;
    if (windowRatio < gameRatio) {
        game.canvas.style.width = width + "px";
        game.canvas.style.height = (width / gameRatio) + "px";
    }
    else {
        game.canvas.style.width = (height * gameRatio) + "px";
        game.canvas.style.height = height + "px";
    }
}


const config: GameConfig = {
    type: Phaser.AUTO,
    width: Settings.gameWidth,
    height: Settings.gameHeight,
    backgroundColor: Settings.backgroundColour,
    title: Settings.gameTitle,
    scene: {
        preload: preload,
        create: create,
        resize: resize
    }
};

window.onload = () => {
    FacebookInstant.InitializeAsync()
        .then((value: boolean) => {
            console.log('FBInstant InitializeAsync', value);

            game = new Phaser.Game(config);
            game.scene.add(Settings.menuScene, MenuScene);
            game.scene.add(Settings.gameScene, GameScene);
            game.scene.add(Settings.pauseScene, PauseScene);
            game.events.on('resize', resize, game);

            game.events.emit('resize', window.innerWidth, window.innerHeight);

            window.addEventListener('resize', (event) => {
                game.events.emit('resize', window.innerWidth, window.innerHeight);
            }, false);
        });
}