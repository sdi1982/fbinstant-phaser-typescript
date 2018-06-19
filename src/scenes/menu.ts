import FacebookInstant from "../static/facebook";
import Settings from "../static/settings";

export default class MenuScene extends Phaser.Scene {

    constructor() {
        super({ key: Settings.menuScene });
    }

    public create() {
        this.addButtons();
        this.addFacebookData();
        this.fadeIn();
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
        } else {
            const unavailableMessage = this.add.text(Settings.gameWidth * 0.5, Settings.gameHeight * 0.5, 'Facebook Instant is not available', { fontFamily: 'Arial', fontSize: 40, color: '#B6FF0D', align: 'center' });
            unavailableMessage.setOrigin(0.5, 0.5);
            unavailableMessage.setShadow(0, 0, '#000000', 10, false, true);
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
