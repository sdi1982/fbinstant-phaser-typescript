import Settings from "../static/settings";

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: Settings.gameScene });

        console.log("GameScene.constructor()");
    }

    // 1st function called by the Phaser game engine
    public init() {
        console.log("GameScene.init()");
    }
    
    // 3rd function called by the Phaser game engine, preload is 2nd
    public create() {

        console.log("GameScene.create()");
        this.addButtons();
        this.addTitle();
        this.fadeIn();
    }

    private fadeIn() {
        this.cameras.main.fadeFrom(1000, 0, 0, 0);
    }

    private addTitle() {
        const title = this.add.text(Settings.gameWidth * 0.5, 80, Settings.gameScene, { fontFamily: 'Arial', fontSize: 40, color: '#FFFFFF', align: 'left' });
        title.setOrigin(0.5, 0.5);
    }

    private addButtons() {
        const pauseButton = this.add.image(360, Settings.gameHeight, 'pause');
        const exitButton = this.add.image(180, Settings.gameHeight, 'exit');
        const restartButton = this.add.image(540, Settings.gameHeight, 'restart');

        this.tweens.add({
            targets: pauseButton,
            x: 360,
            y: 1200,
            duration: 200,
            ease: 'Quad.easeIn',
            onComplete: () => {
                pauseButton.setInteractive();
                pauseButton.on('pointerup', this.onPauseButtonClicked, this);
            }
        });
        this.tweens.add({
            targets: exitButton,
            x: 180,
            y: 1200,
            duration: 200,
            ease: 'Quad.easeIn',
            onComplete: () => {
                exitButton.setInteractive();
                exitButton.on('pointerup', this.onExitButtonClicked, this);
            }
        });
        this.tweens.add({
            targets: restartButton,
            x: 540,
            y: 1200,
            duration: 200,
            ease: 'Quad.easeIn',
            onComplete: () => {
                restartButton.setInteractive();
                restartButton.on('pointerup', this.onRestartButtonClicked, this);
            }
        });
    }

    private onPauseButtonClicked(pointer: Phaser.Input.Pointer) {
        this.scene.pause(Settings.gameScene);
        this.scene.launch(Settings.pauseScene);
    }

    private onExitButtonClicked(pointer: Phaser.Input.Pointer) {
        this.scene.start(Settings.menuScene);
    }

    private onRestartButtonClicked(pointer: Phaser.Input.Pointer) {
        this.scene.restart();
    }
}
