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
        this.addFacebookDiagnostics();
        this.fadeIn();
    }

    private addTitle() {
        const title = this.add.text(Settings.gameWidth * 0.5, 80, Settings.menuScene, { fontFamily: 'Arial', fontSize: 40, color: '#FFFFFF', align: 'left' });
        title.setOrigin(0.5, 0.5);
    }

    private addFacebookDiagnostics() {
        const fontStyle = { fontFamily: 'Arial', fontSize: 20, color: '#B6FF0D', align: 'left' }

        const fbTitle = this.add.text(80, 140, 'FB Properties', fontStyle);
        const fbInitialized = this.add.text(80, 160, `initialized: ${FB.initialized ? 'Yes' : 'No'}`, fontStyle);
        const fbLoaded = this.add.text(80, 180, `loaded: ${FB.loaded ? 'Yes' : 'No'}`, fontStyle);
        const fbStarted = this.add.text(80, 200, `started: ${FB.started ? 'Yes' : 'No'}`, fontStyle);
        const fbLocale = this.add.text(80, 220, `locale: ${FB.locale}`, fontStyle);
        const fbPlatform = this.add.text(80, 240, `platform: ${FB.platform}`, fontStyle);
        const fbVersion = this.add.text(80, 260, `SDK Version: ${FB.SDKVersion}`, fontStyle);
        const fbEntryPointData = this.add.text(80, 280, `entryPointData: ${JSON.stringify(FB.entryPointData, null, 4)}`, fontStyle);

        const fbContextTitle = this.add.text(80, 320, 'FBContext Properties', fontStyle);
        const fbContextID = this.add.text(80, 340, `id: ${FBContext.id}`, fontStyle);
        const fbContextType = this.add.text(80, 360, `type: ${FBContext.type}`, fontStyle);

        const fbPlayerTitle = this.add.text(80, 400, 'FBPlayer Properties', fontStyle);

        const fbPlayerID = this.add.text(80, 420, `id: ${FBPlayer.playerID}`, fontStyle);
        const fbPlayerName = this.add.text(80, 440, `name: ${FBPlayer.playerName}`, fontStyle);
        const fbPlayerPhoto = this.add.text(80, 460, `photo: ${FBPlayer.playerPhoto}`, fontStyle);



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

        const playText = this.make.text({
            x: Settings.gameWidth * 0.5,
            y: 1200,
            text: 'Start Game Scene',
            style: {
                fontSize: '30px',
                fontFamily: 'Arial',
                color: '#0000ff',
                align: 'center',
                backgroundColor: '#ffff00'
            }
        });
        playText.setOrigin(0.5, 0.5);
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