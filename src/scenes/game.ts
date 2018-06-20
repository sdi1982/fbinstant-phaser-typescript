import Settings from "../static/settings";

export default class GameScene extends Phaser.Scene {
    private pauseButton: Phaser.GameObjects.Image = null;
    private restartButton: Phaser.GameObjects.Image = null;
    private exitButton: Phaser.GameObjects.Image = null;

    private scoreText: Phaser.GameObjects.Text = null;
    private score: number;
    // This property is toggled when the pause button is pressed, use this to manage operations
    private paused: boolean;

    constructor() {
        super({ key: Settings.gameScene });

        console.log("GameScene.constructor()");
    }

    // 1st function called by the Phaser game engine
    public init() {
        console.log("GameScene.init()");
        this.paused = false;
    }
    
    // 3rd function called by the Phaser game engine, preload is 2nd
    public create() {

        console.log("GameScene.create()");
        this.createButtons();
        this.addButtonListeners();
        this.fadeIn();
    }

    private fadeIn() {
        this.cameras.main.fadeFrom(1000, 0, 0, 0);
    }

    private createButtons() {
        this.pauseButton = this.add.image(360, 1200, 'pause');
        this.exitButton = this.add.image(180, 1200, 'exit');
        this.restartButton = this.add.image(540, 1200, 'restart');
    }

    private addButtonListeners() {
        this.pauseButton.setInteractive()
        this.exitButton.setInteractive();
        this.restartButton.setInteractive();
        this.pauseButton.on('pointerup', this.onPauseButtonClicked, this);
        this.exitButton.on('pointerup', this.onExitButtonClicked, this);
        this.restartButton.on('pointerup', this.onRestartButtonClicked, this);
    }


    private onPauseButtonClicked(pointer: Phaser.Input.Pointer) {
        this.paused = !this.paused;
    }

    private onExitButtonClicked(pointer: Phaser.Input.Pointer) {
        this.startMenuScene();
    }

    private startMenuScene() {
        this.scene.start(Settings.menuScene);
    }

    private onRestartButtonClicked(pointer: Phaser.Input.Pointer) {
        this.scene.restart();
    }
}
