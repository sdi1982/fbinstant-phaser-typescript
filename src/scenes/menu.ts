import FacebookInstant from "../facebook";
import Settings from "../settings";

export default class MenuScene extends Phaser.Scene {
    private menuText: Phaser.GameObjects.Text = null;
    private scoreText: Phaser.GameObjects.Text = null;
    private nameText: Phaser.GameObjects.Text = null;
    private playButton: Phaser.GameObjects.Image = null;
    
    // This property will be persisted and continue to increment on each init() call by Phaser, use this to define certain behaviours
    private loadCount: number = -1;
    
    // This property is toggled to true after async operations have been completed
    private loading: boolean = true;

    constructor() {
        super({ key: "MenuScene" });
    }

    public init() {
        this.loading = true;
        this.loadCount++;
        switch (this.loadCount) {
            case 0:
                FacebookInstant.GetPlayerName()
                    .then((name: string) => {
                        this.setNameText(name);
                    })
                    .catch((err: any) => {
                        console.error(err);
                    });
                FacebookInstant.GetPlayerScore()
                    .then((score: number) => {
                        Settings.score = score;
                        this.setScoreText(score);
                        this.loading = false;
                    })
                    .catch((err: any) => {
                        console.error(err);
                        this.loading = false;
                    });
                break;
            case 1:
                FacebookInstant.LoadAndShowInterstitial()
                    .then(() => {
                        this.loading = false;
                    })
                    .catch((err: any) => {
                        console.error(err);
                        this.loading = false;
                    })
                break;
            default:
                this.loading = false;
                break;
        }


    }

    public preload() {
        this.load.svg('exit', 'assets/images/exit.svg');
        this.load.svg('happy', 'assets/images/happy.svg');
        this.load.svg('pause', 'assets/images/pause.svg');
        this.load.svg('play', 'assets/images/play.svg');
        this.load.svg('restart', 'assets/images/restart.svg');
    }

    public create() {
        this.createButtons();
        this.addButtonListeners();
        this.createTitleText();
        this.createNameText();
        this.createScoreText();
        this.fadeIn();

    }
    private setNameText(name: string) {
        this.nameText.text = `Welcome, ${name}`;
    }

    private setScoreText(score: any) {
        this.scoreText.text = `Your current score is ${score}`;
    }

    private onPlayButtonClicked(pointer: Phaser.Input.Pointer) {
        if (!this.loading) {
            this.scene.start('GameScene');
        }
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

    private createNameText() {
        this.nameText = this.add.text(360, 640, `Welcome${FacebookInstant.playerName != null ? ", " + FacebookInstant.playerName : ""}`, { fontFamily: 'Arial', fontSize: 40, color: '#B6FF0D', align: 'center' });
        this.nameText.setShadow(0, 0, '#000000', 10, false, true);
        this.nameText.setOrigin(0.5, 0.5);
    }

    private createScoreText() {
        this.scoreText = this.add.text(360, 920, `Your current score is ${Settings.score}`, { fontFamily: 'Arial', fontSize: 40, color: '#B6FF0D', align: 'center' });
        this.scoreText.setShadow(0, 0, '#000000', 10, false, true);
        this.scoreText.setOrigin(0.5, 0.5);
    }

    private fadeIn() {
        this.cameras.main.fadeFrom(1000, 0, 0, 0);
    }
}
