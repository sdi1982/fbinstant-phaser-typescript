import Settings from "../static/settings";
import FacebookInstant from "../static/facebook";

export default class LoadScene extends Phaser.Scene {
    private _loaded: boolean = false;

    constructor() {
        super({ key: Settings.loadScene });
    }

    public preload() {
        if (!this._loaded) {
            if (FacebookInstant.available && !FacebookInstant.started) {
                FacebookInstant.InitializeAsync()
                    .then(() => {
                        this.load.on('progress', (value: number) => {
                            FacebookInstant.SetLoadingProgress(value * 100);
                        });
                        this.load.on('complete', () => {
                            this._loaded = true;
                            FacebookInstant.StartGameAsync()
                                .then(() => {
                                    this.startMenuScene();
                                })
                                .catch(() => {
                                    this.cantStartFacebook();
                                })
                        });
                        this.loadAssets();
                    })
                    .catch(() => {
                        this.cantInitializeFacebook();
                    });
            } else {
                this.cantInitializeFacebook();

            }
        } else {
            this.startMenuScene();
        }
    }

    private cantInitializeFacebook() {
        this.load.on('complete', () => {
            this._loaded = true;
            this.startMenuScene();
        });
        this.loadAssets();
    }

    private cantStartFacebook() {
        this.startMenuScene();
    }

    private loadAssets() {
        this.load.pack('assets', 'assets/assets.json');

    }
    private startMenuScene() {
        this.scene.start(Settings.menuScene);
    }
}