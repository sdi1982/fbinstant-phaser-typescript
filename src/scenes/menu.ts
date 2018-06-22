import { FB, FBPlayer, FBAds, FBAnalytics, FBContext } from "../static/facebook";

import Settings from "../static/settings";
import Logger from "../utilities/logger";

const logger: Logger = new Logger('menu');
export default class MenuScene extends Phaser.Scene {

    constructor() {
        super({ key: Settings.menuScene });
    }

    public create() {
        this.addButtons();
        this.addTitle();
        this.fadeIn();
    }

    private addTitle() {
        const title = this.add.text(Settings.gameWidth * 0.5, 80, Settings.menuScene, Settings.textTitleStyle);
        title.setOrigin(0.5, 0.5);
    }

    private addButtons() {
        const diagnosticsText = this.make.text({
            x: 80,
            y: 1000,
            text: 'Launch Facebook Diagnostics',
            style: Settings.textSubtitleStyle
        });
        diagnosticsText.setOrigin(0, 0.5);
        diagnosticsText.setInteractive();
        diagnosticsText.on('pointerup', () => {
            this.scene.launch(Settings.diagnosticsScene);
        }, this);

        const playText = this.make.text({
            x: 80,
            y: 1100,
            text: 'Start Game Scene',
            style: Settings.textSubtitleStyle
        });
        playText.setOrigin(0, 0.5);
        playText.setInteractive();
        playText.on('pointerup', () => {
            this.scene.start(Settings.gameScene);
        }, this);
    }

    private onPlayButtonClicked(pointer: Phaser.Input.Pointer) {
        this.scene.start(Settings.gameScene);
    }

    private fadeIn() {
        this.cameras.main.fadeFrom(1000, 0, 0, 0);
    }
}