import "phaser";
import MenuScene from "./scenes/menu";
import GameScene from "./scenes/game";

const gameWidth: number = 720;
const gameHeight: number = 1280;
var htmlCanvas: HTMLCanvasElement = null;

const resize = () => {
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var windowRatio = windowWidth / windowHeight;
    var gameRatio = gameWidth / gameHeight;
    if (windowRatio < gameRatio) {
        htmlCanvas.style.width = windowWidth + "px";
        htmlCanvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else {
        htmlCanvas.style.width = (windowHeight * gameRatio) + "px";
        htmlCanvas.style.height = windowHeight + "px";
    }
}

export default class Game extends Phaser.Game {
    constructor() {
        super({
            width: gameWidth,
            height: gameHeight,
            type: Phaser.AUTO,
            backgroundColor: '#0C46E8',
            title: "FBInstant - Phaser TypeScript",
            scene: [MenuScene, GameScene]
        });
        htmlCanvas = this.canvas;
        window.focus()
        resize();
        window.addEventListener("resize", resize, false);
    }
}