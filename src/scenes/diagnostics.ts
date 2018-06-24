import { FB, FBPlayer, FBContext, Leaderboard, ContextPlayer, SignedPlayerInfo, ConnectedPlayer, FBAds, AdInstance } from "../static/facebook";

import Settings from "../static/settings";
import Logger from "../utilities/logger";

const logger: Logger = new Logger('diagnostics');
export default class DiagnosticsScene extends Phaser.Scene {

    private _fbLeaderboardName: string = 'diagnostic_leaderboard';
    private _fbPlayerDataKeys: string[] = ['diagnostics_data'];
    private _fbPlayerStatsKeys: string[] = ['diagnostics_stats'];
    private _fbPlayerRequestPayload: string = "diagnostics_payload";
    private _fbAdsInterstitialID: string = 'interstitial_placement_id';
    private _fbAdsVideoID: string = "video_placement_id";
    constructor() {
        super({ key: Settings.diagnosticsScene });
    }

    public create() {
        this.addBackground();
        this.addButtons();
        this.addTitle();
        this.addFacebookDiagnosticsText();
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

    private addFacebookDiagnosticsText() {
        // FB Properties
        this.add.text(80, 140, 'FB Properties', Settings.textSubtitleStyle).setOrigin(0, 0.5);
        this.add.text(80, 160, `initialized: ${FB.initialized ? 'Yes' : 'No'}`, Settings.textParagraphStyle).setOrigin(0, 0.5);
        this.add.text(80, 180, `loaded: ${FB.loaded ? 'Yes' : 'No'}`, Settings.textParagraphStyle).setOrigin(0, 0.5);
        this.add.text(80, 200, `started: ${FB.started ? 'Yes' : 'No'}`, Settings.textParagraphStyle).setOrigin(0, 0.5);
        this.add.text(80, 220, `locale: ${FB.locale}`, Settings.textParagraphStyle).setOrigin(0, 0.5);
        this.add.text(80, 240, `platform: ${FB.platform}`, Settings.textParagraphStyle).setOrigin(0, 0.5);
        this.add.text(80, 260, `SDK Version: ${FB.SDKVersion}`, Settings.textParagraphStyle).setOrigin(0, 0.5);
        this.add.text(80, 280, `entryPointData: ${JSON.stringify(FB.entryPointData, null, 4)}`, Settings.textParagraphStyle).setOrigin(0, 0.5);

        // FBContext Properties
        this.add.text(80, 320, 'FBContext Properties', Settings.textSubtitleStyle).setOrigin(0, 0.5);
        this.add.text(80, 340, `id: ${FBContext.id}`, Settings.textParagraphStyle).setOrigin(0, 0.5);
        this.add.text(80, 360, `type: ${FBContext.type}`, Settings.textParagraphStyle).setOrigin(0, 0.5);

        // FBPlayer Properties
        this.add.text(80, 400, 'FBPlayer Properties', Settings.textSubtitleStyle).setOrigin(0, 0.5);
        this.add.text(80, 420, `id: ${FBPlayer.playerID}`, Settings.textParagraphStyle).setOrigin(0, 0.5);
        this.add.text(80, 440, `name: ${FBPlayer.playerName}`, Settings.textParagraphStyle).setOrigin(0, 0.5);
        this.add.text(80, 460, `photo: ${FBPlayer.playerPhoto}`, Settings.textParagraphStyle).setOrigin(0, 0.5);


        // FB Methods
        this.add.text(80, 520, 'FB GET Methods', Settings.textSubtitleStyle).setOrigin(0, 0.5);
        FB.getEntryPointAsync()
            .then((entryPoint: string) => {
                return this.add.text(80, 540, `getEntryPointAsync(): ${entryPoint}`, Settings.textParagraphStyle).setOrigin(0, 0.5);
            });
        FB.canCreateShortcutAsync()
            .then((can: boolean) => {
                return this.add.text(80, 560, `canCreateShortcutAsync(): ${can}`, Settings.textParagraphStyle).setOrigin(0, 0.5);
            });
        FB.checkCanPlayerMatchAsync()
            .then((can: boolean) => {
                return this.add.text(80, 580, `checkCanPlayerMatchAsync(): ${can}`, Settings.textParagraphStyle).setOrigin(0, 0.5);
            });
        FB.getLeaderboardAsync(this._fbLeaderboardName)
            .then((leaderboard: Leaderboard) => {
                return this.add.text(80, 600, `getLeaderboardAsync(): ${leaderboard}`, Settings.textParagraphStyle).setOrigin(0, 0.5);
            });

        // FBContext Methods
        this.add.text(80, 640, 'FBContext GET Methods', Settings.textSubtitleStyle).setOrigin(0, 0.5);
        FBContext.getPlayersAsync()
            .then((players: Array<ContextPlayer>) => {
                return this.add.text(80, 660, `getPlayersAsync(): ${players}`, Settings.textParagraphStyle).setOrigin(0, 0.5);
            });

        // FBPlayer Methods
        this.add.text(80, 700, 'FBPlayer GET Methods', Settings.textSubtitleStyle).setOrigin(0, 0.5);
        FBPlayer.getDataAsync(this._fbPlayerDataKeys)
            .then((data: object) => {
                return this.add.text(80, 720, `getDataAsync(): ${data}`, Settings.textParagraphStyle).setOrigin(0, 0.5);
            });

        FBPlayer.getStatsAsync(this._fbPlayerStatsKeys)
            .then((data: object) => {
                return this.add.text(80, 740, `getStatsAsync(): ${data}`, Settings.textParagraphStyle).setOrigin(0, 0.5);
            });

        FBPlayer.canSubscribeBotAsync()
            .then((can: boolean) => {
                return this.add.text(80, 760, `canSubscribeBotAsync(): ${can}`, Settings.textParagraphStyle).setOrigin(0, 0.5);
            });

        FBPlayer.getSignedPlayerInfoAsync(this._fbPlayerRequestPayload)
            .then((result: SignedPlayerInfo) => {
                return this.add.text(80, 780, `getSignedPlayerInfoAsync(): ${result}`, Settings.textParagraphStyle).setOrigin(0, 0.5);
            });

        FBPlayer.getConnectedPlayersAsync()
            .then((players: Array<ConnectedPlayer>) => {
                return this.add.text(80, 800, `getConnectedPlayersAsync(): ${players}`, Settings.textParagraphStyle).setOrigin(0, 0.5);
            });

        // FBAds Methods
        this.add.text(80, 840, 'FBAds GET Methods', Settings.textSubtitleStyle).setOrigin(0, 0.5);
        FBAds.getInterstitialAdAsync(this._fbAdsInterstitialID)
            .then((interstitial: AdInstance) => {
                return this.add.text(80, 860, `getInterstitialAdAsync(): ${interstitial}`, Settings.textParagraphStyle).setOrigin(0, 0.5);
            });
        FBAds.getRewardedVideoAsync(this._fbAdsVideoID)
            .then((interstitial: AdInstance) => {
                return this.add.text(80, 880, `getRewardedVideoAsync(): ${interstitial}`, Settings.textParagraphStyle).setOrigin(0, 0.5);
            });

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