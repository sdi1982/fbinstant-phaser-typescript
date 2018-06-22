import { FB, FBPlayer, FBContext } from "../static/facebook";

import Settings from "../static/settings";
import Logger from "../utilities/logger";

const logger: Logger = new Logger('diagnostics');
export default class DiagnosticsScene extends Phaser.Scene {

    constructor() {
        super({ key: Settings.diagnosticsScene });
    }


    public create() {
        this.addBackground();
        this.addButtons();
        this.addTitle();
        this.addDiagnostics();
    }

    private addBackground() {
        const rect = this.add.graphics();
        rect.fillStyle(0xff0000, 1);
        rect.fillRect(80, 80, Settings.gameWidth - 160, Settings.gameHeight);


    }

    private addTitle() {
        const title = this.add.text(Settings.gameWidth * 0.5, 80, Settings.diagnosticsScene, Settings.textTitleStyle);
        title.setOrigin(0.5, 0.5);
    }

    private addDiagnostics() {
        const fbTitle = this.add.text(80, 140, 'FB Properties', Settings.textSubtitleStyle);
        const fbInitialized = this.add.text(80, 160, `initialized: ${FB.initialized ? 'Yes' : 'No'}`, Settings.textParagraphStyle);
        const fbLoaded = this.add.text(80, 180, `loaded: ${FB.loaded ? 'Yes' : 'No'}`, Settings.textParagraphStyle);
        const fbStarted = this.add.text(80, 200, `started: ${FB.started ? 'Yes' : 'No'}`, Settings.textParagraphStyle);
        const fbLocale = this.add.text(80, 220, `locale: ${FB.locale}`, Settings.textParagraphStyle);
        const fbPlatform = this.add.text(80, 240, `platform: ${FB.platform}`, Settings.textParagraphStyle);
        const fbVersion = this.add.text(80, 260, `SDK Version: ${FB.SDKVersion}`, Settings.textParagraphStyle);
        const fbEntryPointData = this.add.text(80, 280, `entryPointData: ${JSON.stringify(FB.entryPointData, null, 4)}`, Settings.textParagraphStyle);

        const fbContextTitle = this.add.text(80, 320, 'FBContext Properties', Settings.textSubtitleStyle);
        const fbContextID = this.add.text(80, 340, `id: ${FBContext.id}`, Settings.textParagraphStyle);
        const fbContextType = this.add.text(80, 360, `type: ${FBContext.type}`, Settings.textParagraphStyle);

        const fbPlayerTitle = this.add.text(80, 400, 'FBPlayer Properties', Settings.textSubtitleStyle);

        const fbPlayerID = this.add.text(80, 420, `id: ${FBPlayer.playerID}`, Settings.textParagraphStyle);
        const fbPlayerName = this.add.text(80, 440, `name: ${FBPlayer.playerName}`, Settings.textParagraphStyle);
        const fbPlayerPhoto = this.add.text(80, 460, `photo: ${FBPlayer.playerPhoto}`, Settings.textParagraphStyle);



        fbPlayerPhoto.setOrigin(0, 0.5);
        fbPlayerName.setOrigin(0, 0.5);
        fbPlayerID.setOrigin(0, 0.5);
        fbPlayerTitle.setOrigin(0, 0.5);

        fbContextType.setOrigin(0, 0.5);
        fbContextID.setOrigin(0, 0.5);

        fbContextTitle.setOrigin(0, 0.5);



        fbEntryPointData.setOrigin(0, 0.5);
        fbVersion.setOrigin(0, 0.5);

        fbPlatform.setOrigin(0, 0.5);

        fbTitle.setOrigin(0, 0.5);

        fbLocale.setOrigin(0, 0.5);
        fbInitialized.setOrigin(0, 0.5);
        fbLoaded.setOrigin(0, 0.5);
        fbStarted.setOrigin(0, 0.5);
    }

    private addButtons() {
        const menuText = this.make.text({
            x: 80,
            y: 1200,
            text: 'Close',
            style: Settings.textSubtitleStyle
        });
        menuText.setOrigin(0, 0.5);
        menuText.setInteractive();
        menuText.on('pointerup', () => {
            this.scene.start(Settings.menuScene);
        }, this);
    }
}