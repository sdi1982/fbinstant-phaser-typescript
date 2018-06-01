import "phaser";
import MenuScene from "./scenes/menu";
import GameScene from "./scenes/game";

const gameWidth: number = 720;
const gameHeight: number = 1280;
var htmlCanvas: HTMLCanvasElement = null;

// Not entirely sure how this works but there is maths involved so it should resize the canvas associated with the game correctly.
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
    // The game is configured using a predefined resolution so it is easier to design assets for
    
    constructor() {
        super({
            width: gameWidth,
            height: gameHeight,
            type: Phaser.AUTO, // WebGL or Canvas, it doesn't matter :)
            backgroundColor: '#0C46E8',
            title: "FBInstant - Phaser TypeScript",
            scene: [MenuScene, GameScene] // Load the scenes in external files to manage them independently
        });
        htmlCanvas = this.canvas;
        window.focus()
        resize();
        // Listen to the documents event for when the window is resized and call the resize function to handle the change in resolution
        window.addEventListener("resize", resize, false);
    }
}
