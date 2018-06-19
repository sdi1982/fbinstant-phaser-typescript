import Settings from "../static/settings";

export default class LoadScene extends Phaser.Scene {
    private _loaded: boolean = false;

    constructor() {
        super({ key: Settings.loadScene });
    }

    public async preload() {
        if (!this._loaded) {
            this.loadAssets();
        } else {
            this.startMenuScene();
        }
    }

    private loadAssets() {
        this.load.pack('assets', 'assets/assets.json');

    }
    private startMenuScene() {
        this.scene.start(Settings.menuScene);
    }
}