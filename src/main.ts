// This is the entry point to the application as referenced by webpack which handles all the dependencies required herein.

import "phaser";
import MenuScene from "./scenes/menu";
import GameScene from "./scenes/game";
import PauseScene from "./scenes/pause";

import DiagnosticsScene from "./scenes/diagnostics";

import Settings from "./static/settings";
import { FB } from "./static/facebook";
import Logger from "./utilities/logger";

const logger: Logger = new Logger('main');
var game: Phaser.Game = null;
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
// 2) Load all assets and inform Facebook SDK of progress
function preload() {
    this.load.on('progress', (value: number) => {
        const percent = Math.abs(100 * value);
        FB.setLoadingProgress(percent);
    });
    this.load.on('complete', () => {
        logger.Success('Game loading complete')
    });
    this.load.on('filecomplete', (file: any) => {
        logger.Success(`${file} file loaded`);
    });
    this.load.svg('exit', 'assets/images/exit.svg');
    this.load.svg('pause', 'assets/images/pause.svg');
    this.load.svg('play', 'assets/images/play.svg');
    this.load.svg('restart', 'assets/images/restart.svg');
}

// 3) Start menu scene after starting Facebook SDK
function create() {
    FB.startGameAsync()
        .then((value: boolean) => {
            this.scene.start(Settings.menuScene);
        });
}
function resize(width: number, height: number) {
    var windowRatio = width / height;
    var gameRatio = Settings.gameRatio;
    if (windowRatio < gameRatio) {
        game.canvas.style.width = width + "px";
        game.canvas.style.height = (width / gameRatio) + "px";
    } else {
        game.canvas.style.width = (height * gameRatio) + "px";
        game.canvas.style.height = height + "px";
    }
}

window.onload = () => {

    // 1) Initialize Facebook and Phaser Game
    FB.initializeAsync()
        .then((value: boolean) => {
            game = new Phaser.Game(config);

            // Game Scenes
            game.scene.add(Settings.menuScene, MenuScene);
            game.scene.add(Settings.gameScene, GameScene);
            game.scene.add(Settings.pauseScene, PauseScene);

            // Facebook Specific Scenes
            game.scene.add(Settings.diagnosticsScene, DiagnosticsScene);

            game.events.on('resize', resize, game);

            game.events.emit('resize', window.innerWidth, window.innerHeight);

            window.addEventListener('resize', (event) => {
                game.events.emit('resize', window.innerWidth, window.innerHeight);
            }, false);
        });
}