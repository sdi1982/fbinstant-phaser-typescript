import FacebookInstant from "../static/facebook";
import Settings from "../static/settings";

export default class MenuScene extends Phaser.Scene {
    private menuText: Phaser.GameObjects.Text = null;
    private scoreText: Phaser.GameObjects.Text = null;
    private nameText: Phaser.GameObjects.Text = null;
    private playButton: Phaser.GameObjects.Image = null;


    constructor() {
        super({ key: Settings.menuScene });
    }

    public create() {
        this.createButtons();
        this.addButtonListeners();
        this.createTitleText();
        this.fadeIn();
    }

    private setNameText(name: string) {
        this.nameText.text = `Welcome, ${name}`;
    }

    private setScoreText(score: any) {
        this.scoreText.text = `Your current score is ${score}`;
    }

    private onPlayButtonClicked(pointer: Phaser.Input.Pointer) {
        this.scene.start(Settings.gameScene);
    }

    private createBackground() {
        this.add.image(360, 640, 'grid');
    }

    private createButtons() {
        this.playButton = this.add.image(360, 1200, 'play');
    }

    private addButtonListeners() {
        this.playButton.setInteractive()
        this.playButton.on('pointerup', this.onPlayButtonClicked, this);
    }

    private createTitleText() {
        this.menuText = this.add.text(360, 80, this.sys.game.config.gameTitle, { fontFamily: 'Arial', fontSize: 50, color: '#B6FF0D', align: 'center' });
        this.menuText.setShadow(0, 0, '#000000', 20, false, true);
        this.menuText.setOrigin(0.5, 0.5);
    }

    //private createNameText() {
    //    this.nameText = this.add.text(360, 640, `Welcome${FacebookInstant.playerName != null ? ", " + FacebookInstant.playerName : ""}`, { fontFamily: 'Arial', fontSize: 40, color: '#B6FF0D', align: 'center' });
    //    this.nameText.setShadow(0, 0, '#000000', 10, false, true);
    //    this.nameText.setOrigin(0.5, 0.5);
    //}

    //private createScoreText() {
    //    this.scoreText = this.add.text(360, 920, `Your current score is ${Settings.score}`, { fontFamily: 'Arial', fontSize: 40, color: '#B6FF0D', align: 'center' });
    //    this.scoreText.setShadow(0, 0, '#000000', 10, false, true);
    //    this.scoreText.setOrigin(0.5, 0.5);
    //}

    private fadeIn() {
        this.cameras.main.fadeFrom(1000, 0, 0, 0);
    }
}
