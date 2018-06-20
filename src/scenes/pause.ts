import Settings from "../static/settings";

export default class PauseScene extends Phaser.Scene {

    constructor() {
        super({ key: Settings.pauseScene });

        console.log("PauseScene.constructor()");
    }

    // 1st function called by the Phaser game engine
    public init() {
        console.log("PauseScene.init()");
    }

    // 3rd function called by the Phaser game engine, preload is 2nd
    public create() {
        console.log("PauseScene.create()");

        const background = this.add.graphics();
        background.fillStyle(0xff0000, 1);
        background.fillRect(360 * 0.5, 640 * 0.5, 360, 640);

        const resumeButton = this.add.image(360, 640, 'play');
        resumeButton.setInteractive();
        resumeButton.on('pointerup', this.onResumeButtonClicked, this);



    }


    private onResumeButtonClicked(pointer: Phaser.Input.Pointer) {
        this.scene.resume(Settings.gameScene);
        this.scene.setVisible(false);

    }

}
