// Only way to assume Facebook Instant Games SDK is available in TypeScript is to declare the namespace it will encompass
declare var FBInstant: any;

// Basically im not a fan of declaring anything because it requires assuming something that is difficult to use without 
// having a solid understanding of the documentation. So this one is very basic.


export default class FacebookInstant {

    private static _interstitial: any = null;

    private static _hasStarted: boolean = false;
    private static _hasInitialized: boolean = false;
    private static _hasLoaded: boolean = false;

    public static get initialized(): boolean {
        return this._hasInitialized;
    }
    public static get started(): boolean {
        return this._hasStarted;
    }
    public static get loaded(): boolean {
        return this._hasLoaded;
    }

    /*
     * Initializes the SDK library. This should be called before any other SDK functions.
     */
    public static InitializeAsync(): Promise<boolean> {
        console.log('1.InitializeAsync()');
        console.log('window.location.host', );
        console.log('Initialized:', this._hasInitialized);
        return new Promise<boolean>((resolve) => {
            if (!this._hasInitialized && window.location.host != "localhost:8080") {

                console.log('Starting to Initialize Facebook Instant');
                FBInstant.initializeAsync()

                    .then(() => {
                        console.log('FacebookInstant Initialization Success');
                        this._hasInitialized = true;
                        resolve(true);
                    })
                    .catch((err: any) => {
                        console.log('FacebookInstant Initialization Error', err);
                        this._hasInitialized = false;
                        resolve(false);
                    });
            } else if (this._hasInitialized) {
                console.log('FacebookInstant Initialization Already Called');
                resolve(true);
            } else {
                console.log('FacebookInstant Initialization Not Available');

                resolve(false);
            }
        })
    }
    /*
     * Report the game's initial loading progress.
     * @param percentage number A number between 0 and 100.
     */
    public static SetLoadingProgress(percentage: number) {
        console.log('2.SetLoadingProgress()');
        console.log('Initialized:', this._hasInitialized, 'Loaded:', this._hasLoaded);

        if (this._hasInitialized && !this._hasLoaded) {
            FBInstant.setLoadingProgress(percentage);
            if (percentage >= 100) {

                this._hasLoaded = true;
            }
        }
    }

    /*
     * This indicates that the game has finished initial loading and is ready to start. Context information will be up-to-date when the returned promise resolves.
     */
    public static StartGameAsync(): Promise<boolean> {
        console.log('3.StartGameAsync()');
        console.log('Initialized:', this._hasInitialized, 'Loaded:', this._hasLoaded, 'Started:', this._hasStarted);

        return new Promise<boolean>((resolve) => {
            if (this._hasInitialized && this._hasLoaded && !this._hasStarted) {
                FBInstant.startGameAsync()
                    .then(() => {
                        console.log('FacebookInstant StartGame Success');

                        this._hasStarted = true;
                        resolve(true);
                    })
                    .catch((err: any) => {
                        console.log('FacebookInstant StartGame Error', err);

                        this._hasStarted = false;
                        resolve(false);
                    });
            } else {
                console.log('FacebookInstant StartGame Not Available');

                this._hasStarted = false;
                resolve(false);
            }
        })
    }

    //    var playerName = FBInstant.player.getName();
    //var playerPic = FBInstant.player.getPhoto();
    //var playerId = FBInstant.player.getID();

    /*
     * 
     */
    public static GetPlayerName(): string {
        if (this._hasStarted) {
            return FBInstant.player.getName();
        }
        return "";
    }
    public static GetPlayerPhoto(): string {
        if (this._hasStarted) {
            return FBInstant.player.getPhoto();
        }
        return "";
    }
}