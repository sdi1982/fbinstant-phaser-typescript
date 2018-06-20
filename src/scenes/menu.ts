import FacebookInstant from "../static/facebook";
import Settings from "../static/settings";

export default class MenuScene extends Phaser.Scene {

    constructor() {
        super({ key: Settings.menuScene });
        console.log("MenuScene.constructor()");
    }
    public init() {
        console.log("MenuScene.init()");
    }
    public create() {
        console.log("MenuScene.create()");
        this.addButtons();
        this.addFacebookDiagnostics();
        this.addFacebookData();
        this.fadeIn();
    }

    private addFacebookDiagnostics() {

        const title = this.add.text(Settings.gameWidth * 0.5, 0, 'Facebook Instant Diagnostics', { fontFamily: 'Arial', fontSize: 40, color: '#B6FF0D', align: 'left' });

        const initialized = this.add.text(Settings.gameWidth * 0.5, 50, `Initialized: ${FacebookInstant.initialized ? 'Yes' : 'No'}`, { fontFamily: 'Arial', fontSize: 30, color: '#B6FF0D', align: 'left' });
        const loaded = this.add.text(Settings.gameWidth * 0.5, 100, `Loaded: ${FacebookInstant.loaded ? 'Yes' : 'No'}`, { fontFamily: 'Arial', fontSize: 30, color: '#B6FF0D', align: 'left' });
        const started = this.add.text(Settings.gameWidth * 0.5, 150, `Started: ${FacebookInstant.started ? 'Yes' : 'No'}`, { fontFamily: 'Arial', fontSize: 30, color: '#B6FF0D', align: 'left' });

        title.setOrigin(0.5, 0);
        initialized.setOrigin(0.5, 0);
        loaded.setOrigin(0.5, 0);
        started.setOrigin(0.5, 0);
        

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
        const playButton = this.add.image(360, 1200, 'play');
        playButton.setInteractive();
        playButton.on('pointerup', this.onPlayButtonClicked, this);
    }

    private onPlayButtonClicked(pointer: Phaser.Input.Pointer) {
        this.scene.start(Settings.gameScene);
    }

    private fadeIn() {
        this.cameras.main.fadeFrom(1000, 0, 0, 0);
    }
}
