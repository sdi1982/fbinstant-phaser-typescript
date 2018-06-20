import FacebookInstant from "../static/facebook";
import Settings from "../static/settings";

export default class MenuScene extends Phaser.Scene {

    constructor() {
        super({ key: Settings.menuScene });
        console.log("MenuScene.constructor()");
    }

    public create() {
        console.log("MenuScene.create()");
        this.addButtons();
        this.addTitle();
        this.addFacebookDiagnostics();
        this.addFacebookData();
        this.fadeIn();
    }

    private addTitle() {
        const title = this.add.text(Settings.gameWidth * 0.5, 80, Settings.menuScene, { fontFamily: 'Arial', fontSize: 40, color: '#FFFFFF', align: 'left' });
        title.setOrigin(0.5, 0.5);
    }

    private addFacebookDiagnostics() {
        const fontStyle = { fontFamily: 'Arial', fontSize: 30, color: '#B6FF0D', align: 'left' }
        const title = this.add.text(Settings.gameWidth * 0.1, 160, 'Facebook Instant Diagnostics', fontStyle);

        const initialized = this.add.text(Settings.gameWidth * 0.1, 220, `Initialized: ${FacebookInstant.initialized ? 'Yes' : 'No'}`, fontStyle);
        const loaded = this.add.text(Settings.gameWidth * 0.1, 280, `Loaded: ${FacebookInstant.loaded ? 'Yes' : 'No'}`, fontStyle);
        const started = this.add.text(Settings.gameWidth * 0.1, 340, `Started: ${FacebookInstant.started ? 'Yes' : 'No'}`, fontStyle);
        const name = this.add.text(Settings.gameWidth * 0.1, 400, `Player Name: ${FacebookInstant.GetPlayerName()}`, fontStyle)
        const photo = this.add.text(Settings.gameWidth * 0.1, 460, `Player Photo: ${FacebookInstant.GetPlayerPhoto()}`, fontStyle)
        title.setOrigin(0, 0);
        initialized.setOrigin(0, 0);
        loaded.setOrigin(0, 0);
        started.setOrigin(0, 0);
        name.setOrigin(0, 0);
        photo.setOrigin(0, 0);


    }

    private addFacebookData() {
        if (FacebookInstant.started) {
            const playerName: string = FacebookInstant.GetPlayerName();
            const playerPhoto: string = FacebookInstant.GetPlayerPhoto();
            const welcomeMessage = this.add.text(Settings.gameWidth * 0.5, Settings.gameHeight * 0.5, `Welcome ${playerName}`, { fontFamily: 'Arial', fontSize: 40, color: '#B6FF0D', align: 'center' });
            welcomeMessage.setOrigin(0.5, 0.5);
            welcomeMessage.setShadow(0, 0, '#000000', 10, false, true);
            this.load.image('player', playerName);
            const playerImage = this.add.image(Settings.gameWidth * 0.5, Settings.gameHeight + 200, 'player');
        }
    }

    private addButtons() {
        const playButton = this.add.image(360, Settings.gameHeight, 'play');

        this.tweens.add({
            targets: playButton,
            x: 360,
            y: 1200,
            duration: 200,
            ease: 'Quad.easeIn',
            onComplete: () => {
                playButton.setInteractive();
                playButton.on('pointerup', this.onPlayButtonClicked, this);
            }
        });
    }

    private onPlayButtonClicked(pointer: Phaser.Input.Pointer) {
        this.scene.start(Settings.gameScene);
    }

    private fadeIn() {
        this.cameras.main.fadeFrom(1000, 0, 0, 0);
    }
}
