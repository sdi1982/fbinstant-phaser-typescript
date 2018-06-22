import Logger from "../utilities/logger";

// Documentation and implementation based on fbinstant.js SDK version 6.2

// Only way to assume Facebook Instant Games SDK is available in TypeScript is to declare the namespace it will encompass
declare var FBInstant: any;

// Basically im not a fan of declaring anything because it requires assuming something that is difficult to use without 
// having a solid understanding of the documentation. So this one is very basic.




/**
* Contains properties and functions from the top most FBInstant namespace
 */
export class FB {

    private static _logger: Logger = new Logger('FB');
    private static _hasStarted: boolean = false;
    private static _hasInitialized: boolean = false;
    private static _hasLoaded: boolean = false;

    /**
     * @returns whether FBInstant.startGameAsync has resolved successfully
     */
    public static get initialized(): boolean {
        return this._hasInitialized;
    }

    /**
     * @returns whether FBInstant.initializeAsync has resolved successfully
     */
    public static get started(): boolean {
        return this._hasStarted;
    }
    /**
     * @returns whether FBInstant.setLoadingProgress has been called with 100
     */
    public static get loaded(): boolean {
        return this._hasLoaded;
    }

    /**
     * Use this to determine what languages the current game should be localized with. The value will not be accurate until FBInstant.startGameAsync() resolves.
     * @returns The current locale.
     */
    public static get locale(): string {
        if (this._hasStarted) {
            return FBInstant.getLocale();
        }
        return null;
    }

    /**
     * The platform on which the game is currently running. The value will always be null until FBInstant.initializeAsync() resolves.
     * @returns Platform.
     */
    public static get platform(): Platform {
        if (this._hasInitialized) {
            return FBInstant.getPlatform();
        }
        return null;
    }

    /**
     * The string representation of this SDK version.
     * SHOULD RETURN 6.2 as specified in index.html
     * @returns The SDK version.
     */
    public static get SDKVersion(): string {
        if (this._hasInitialized) {
            return FBInstant.getSDKVersion();
        }
        return null;
    }

    /**
     * Returns any data object associated with the entry point that the game was launched from.
     * The contents of the object are developer-defined, and can occur from entry points on different platforms. This will return null for older mobile clients, as well as when there is no data associated with the particular entry point.
     * @returns Data associated with the current entry point.
     */
    public static get entryPointData(): object {
        if (this._hasStarted) {
            return FBInstant.getEntryPointData();
        }
        return null;
    }

    /**
     * Sets the data associated with the individual gameplay session for the current context.
     * This function should be called whenever the game would like to update the current session data. This session data may be used to populate a variety of payloads, such as game play webhooks.
     * @param data An arbitrary data object, which must be less than or equal to 1000 characters when stringified.
     */
    public static set sessionData(data: object) {
        if (this._hasInitialized) {
            FBInstant.setSessionData(data);
            this._logger.Success('setSessionData', data);
        }
    }

    /**
    * Initializes the SDK library. This should be called before any other SDK functions.
    * @returns returns a new Promise with a resolved boolean result
    */
    public static initializeAsync(): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            if (!this._hasInitialized && window.location.host != "localhost:8080") {
                FBInstant.initializeAsync()
                    .then(() => {
                        this._logger.Success('initializeAsync');
                        this._hasInitialized = true;
                        resolve(true);
                    })
                    .catch((err: ErrorCode) => {
                        this._logger.Error('initializeAsync', err);
                        this._hasInitialized = false;
                        resolve(false);
                    });
            } else if (this._hasInitialized) {
                this._logger.Success('initializeAsync - already initialized');

                resolve(true);
            } else if (this._hasInitialized) {
                this._logger.Error('initializeAsync - not available');
                resolve(false);
            }
        });
    }

    /**
    * Report the game's initial loading progress.
    * @param percentage number A number between 0 and 100.
    */
    public static setLoadingProgress(percentage: number) {
        if (this._hasInitialized && !this._hasLoaded) {
            FBInstant.setLoadingProgress(percentage);
            if (percentage >= 100) {
                this._logger.Success('setLoadingProgress');
                this._hasLoaded = true;
            }
        } else {
            this._logger.Error('setLoadingProgress - not available');
        }
    }

    /**
    * This indicates that the game has finished initial loading and is ready to start. Context information will be up-to-date when the returned promise resolves.
    * @returns returns a promise with a resolved boolean result.
    */
    public static startGameAsync(): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            if (this._hasInitialized && this._hasLoaded && !this._hasStarted) {
                FBInstant.startGameAsync()
                    .then(() => {
                        this._logger.Success('startGameAsync');
                        this._hasStarted = true;
                        resolve(true);
                    })
                    .catch((err: ErrorCode) => {
                        this._logger.Error('startGameAsync', err);
                        this._hasStarted = false;
                        resolve(false);
                    });
            } else {
                this._logger.Error('startGameAsync - not available');
                this._hasStarted = false;
                resolve(false);
            }
        });
    }

    /**
     * Returns the entry point that the game was launched from.
     * @returns The name of the entry point from which the user started the game.
     */
    public static getEntryPointAsync(): Promise<string> {
        return new Promise<string>((resolve) => {
            if (this._hasStarted) {
                FBInstant.getEntryPointAsync()
                    .then((entryPoint: string) => {
                        if (entryPoint != null) {
                            this._logger.Success('getEntryPointAsync', entryPoint);
                            resolve(entryPoint);
                        } else {
                            this._logger.Success('getEntryPointAsync - does not exist');
                            resolve(null);
                        }
                    })
                    .catch((err: any) => {
                        this._logger.Error('getEntryPointAsync', err);
                        resolve(null);
                    });
            } else {
                resolve(null);
            }

        });
    }

    /**
     * This invokes a dialog to let the user share specified content, either as a message in Messenger or as a post on the user's timeline. A blob of data can be attached to the share which every game session launched from the share will be able to access from FBInstant.getEntryPointData(). This data must be less than or equal to 1000 characters when stringified. The user may choose to cancel the share action and close the dialog, and the returned promise will resolve when the dialog is closed regardless if the user actually shared the content or not.
     * @param payload Specify what to share.
     * @returns A promise that resolves when the share is completed or cancelled.
     */
    public static shareAsync(payload: SharePayload): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            if (this._hasStarted) {
                FBInstant.shareAsync(payload)
                    .then(() => {
                        this._logger.Success('shareAsync');

                        resolve(true);
                    })
                    .catch((err: ErrorCode) => {
                        this._logger.Error('shareAsync', err);

                        resolve(false);
                    });
            } else {
                this._logger.Error('shareAsync - not available');
                resolve(false);
            }
        });
    }

    /**
     * Informs Facebook of an update that occurred in the game. This will temporarily yield control to Facebook and Facebook will decide what to do based on what the update is. The returned promise will resolve/reject when Facebook returns control to the game.
     * @param payload A payload that describes the update.
     * @returns A promise that resolves when Facebook gives control back to the game.
     */
    public static updateAsync(payload: CustomUpdatePayload): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            if (this._hasStarted) {
                FBInstant.updateAsync(payload)
                    .then(() => {
                        this._logger.Success('updateAsync');
                        resolve(true);
                    })
                    .catch((err: ErrorCode) => {
                        this._logger.Error('updateAsync', err);
                        resolve(false);
                    });
            } else {
                this._logger.Error('updateAsync - not available');
                resolve(false);
            }
        });
    }

    /**
     * Request that the client switch to a different Instant Game. The API will reject if the switch fails - else, the client will load the new game.
     * @param appID The Application ID of the Instant Game to switch to. The application must be an Instant Game, and must belong to the same business as the current game.
     * @param data An optional data payload. This will be set as the entrypoint data for the game being switched to. Must be less than or equal to 1000 characters when stringified.
     * @return a promise that resolves with a boolean result.
     */
    public static switchGameAsync(appID: string, data?: object): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            if (this._hasStarted) {
                FBInstant.switchGameAsync(appID, data)
                    .then(() => {
                        this._logger.Success('switchGameAsync');
                        resolve(true);
                    })
                    .catch((err: ErrorCode) => {
                        this._logger.Error('switchGameAsync', err);
                        resolve(false);
                    })
            } else {
                this._logger.Error('switchGameAsync - not available');
                resolve(false);
            }
        });
    }


    /**
     * Attempts to match the current player with other users looking for people to play with. If successful, a new Messenger group thread will be created containing the matched players and the player will be context switched to that thread. The default minimum and maximum number of players in one matched thread are 2 and 20 respectively, depending on how many players are trying to get matched around the same time. The values can be changed in fbapp-config.json. See the [Bundle Config documentation]
     * @param matchTag Optional extra information about the player used to group them with similar players. Players will only be grouped with other players with exactly the same tag. The tag must only include letters, numbers, and underscores and be 100 characters or less in length.
     * @param switchContextWhenMatched Optional extra parameter that specifies whether the player should be immediately switched to the new context when a match is found. By default this will be false which will mean the player needs explicitly press play after being matched to switch to the new context.
     * @returns A promise that resolves when the player has been added to a group thread and switched into the thread's context.
     */
    public static matchPlayerAsync(matchTag?: string, switchContextWhenMatched?: boolean): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            if (this._hasStarted) {
                FBInstant.matchPlayerAsync(matchTag, switchContextWhenMatched)
                    .then(() => {
                        this._logger.Success('matchPlayerAsync');
                        resolve(true);
                    })
                    .catch((err: any) => {
                        this._logger.Error('matchPlayerAsync', err);
                        resolve(false);
                    });
            } else {
                this._logger.Error('matchPlayerAsync - not available');
                resolve(false);
            }
        });
    }

    /**
     * Fetch a specific leaderboard belonging to this Instant Game.
     * @param name The name of the leaderboard. Each leaderboard for an Instant Game must have its own distinct name.
     * @returns A promise that resolves with the matching leaderboard, rejecting if one is not found.
     */
    public static getLeaderboardAsync(name: string): Promise<Leaderboard> {
        return new Promise<Leaderboard>((resolve) => {
            if (this._hasStarted) {
                FBInstant.getLeaderboardAsync(name)
                    .then((leaderboard: Leaderboard) => {
                        if (leaderboard != null) {
                            this._logger.Success('getLeaderboardAsync', leaderboard);
                            resolve(leaderboard);
                        } else {
                            this._logger.Error('getLeaderboardAsync - does not exist');
                            resolve(null);
                        }
                    })
                    .catch((err: any) => {
                        this._logger.Error('getLeaderboardAsync', err);
                        resolve(null);
                    });
            } else {
                resolve(null);
            }
        });
    }

    /**
     * Quits the game.
     */
    public static quitGame(): void {
        if (this._hasStarted) {
            FBInstant.quit();
            this._logger.Success('quit');
        } else {
            this._logger.Error('quit - not available');
        }
    }

    /**
     * Set a callback to be fired when a pause event is triggered.
     * @param func A function to call when a pause event occurs.
     */
    public static set onPause(func: Function) {
        if (this._hasStarted) {
            FBInstant.onPause(func);
            this._logger.Success('onPause');
        } else {
            this._logger.Error('onPause - not available');

        }
    }
}

/**
 * Contains FBInstant Advertisement functions 
 */
export class FBAds {
    private static _logger: Logger = new Logger('FBAds');

    /**
     * Attempt to create an instance of interstitial ad. This instance can then be preloaded and presented.
     * @param placementID The placement ID that's been setup in your Audience Network settings.
     * @return A promise that resolves with a AdInstance, or rejects with a APIError if it couldn't be created.
     */
    public static getInterstitialAdAsync(placementID: string): Promise<AdInstance | APIError> {
        return new Promise<AdInstance | APIError>((resolve) => {
            if (FB.started) {
                FBInstant.getInterstitialAdAsync(placementID)
                    .then((interstitial: AdInstance) => {
                        this._logger.Success('getInterstitialAdAsync', interstitial);
                        resolve(interstitial);
                    })
                    .catch((err: APIError) => {
                        this._logger.Error('getInterstitialAdAsync', err);
                        resolve(err);
                    });
            } else {
                this._logger.Error('getInterstitialAdAsync - not available');
                resolve(null);
            }
        });
    }

    /**
     * Attempt to create an instance of rewarded video. This instance can then be preloaded and presented.
     * @param placementID The placement ID that's been setup in your Audience Network settings.
     * @return A promise that resolves with a AdInstance, or rejects with a APIError if it couldn't be created.
     */
    public static getRewardedVideoAsync(placementID: string): Promise<AdInstance | APIError> {
        return new Promise<AdInstance | APIError>((resolve) => {
            if (FB.started) {
                FBInstant.getRewardedVideoAsync(placementID)
                    .then((interstitial: AdInstance) => {
                        this._logger.Success('getRewardedVideoAsync', interstitial);
                        resolve(interstitial);
                    })
                    .catch((err: APIError) => {
                        this._logger.Error('getRewardedVideoAsync', err);
                        resolve(err);
                    });
            } else {
                this._logger.Error('getRewardedVideoAsync - not available');
                resolve(null);
            }
        });
    }
}
/**
* Contains FBInstant Analytics functions
 */
export class FBAnalytics {
    private static _logger: Logger = new Logger('FBAnalytics');

    /**
     * Log an app event with FB Analytics.
     * @param eventName Name of the event. Must be 2 to 40 characters, and can only contain '_', '-', ' ', and alphanumeric characters.
     * @param valueToSum An optional numeric value that FB Analytics can calculate a sum with.
     * @param parameters An optional object that can contain up to 25 key-value pairs to be logged with the event. Keys must be 2 to 40 characters, and can only contain '_', '-', ' ', and alphanumeric characters. Values must be less than 100 characters in length.
     * @returns The error if the event failed to log; otherwise returns null.
     */
    public static logEvent(eventName: string, valueToSum: number, parameters: object): Promise<APIError> {
        return new Promise<APIError>((resolve) => {
            if (FB.started) {
                FBInstant.logEvent(eventName, valueToSum, parameters)
                    .then(() => {
                        this._logger.Success('logEvent');
                        resolve(null);
                    })
                    .catch((err: APIError) => {
                        this._logger.Error('logEvent', err);
                        resolve(err);
                    })
            } else {
                this._logger.Error('logEvent - not available');
                resolve(null);
            }
        });
    }

}
/**
* Contains properties and functions from the context object on the FBInstant namespace
 */
export class FBContext {
    private static _logger: Logger = new Logger('FBContext');

    private static get context(): any {
        return FBInstant.context;
    }

    /**
     * A unique identifier for the current game context. This represents a specific context that the game is being played in (for example, a particular messenger conversation or facebook post). The identifier will be null if game is being played in a solo context. This function should not be called until FBInstant.startGameAsync has resolved.
     * @returns string? A unique identifier for the current game context.
     */
    public static get id(): string {
        if (FB.started) {
            return this.context.getID();
        }
        return null;
    }

    /**
     * The type of the current game context. POST - A facebook post. THREAD - A messenger thread. GROUP - A facebook group. SOLO - Default context, where the player is the only participant.
     * @returns string? ("POST" | "THREAD" | "GROUP" | "SOLO") Type of the current game context.
     */
    public static get type(): string {
        if (FB.started) {
            return this.context.getType();
        }
        return null;
    }

    /**
     * This function determines whether the number of participants in the current game context is between a given minimum and maximum, inclusive. If one of the bounds is null only the other bound will be checked against. It will always return the original result for the first call made in a context in a given game play session. Subsequent calls, regardless of arguments, will return the answer to the original query until a context change occurs and the query result is reset. This function should not be called until FBInstant.startGameAsync has resolved.
     * @param minSize The minimum bound of the context size query.
     * @param maxSize The maximum bound of the context size query.
     * @returns ContextSizeResponse?
     */
    public static isSizeBetween(minSize?: number, maxSize?: number): ContextSizeResponse {
        if (FB.started) {
            return this.context.isSizeBetween(minSize, maxSize);
        }
        return null;
    }

    /**
     * Request a switch into a specific context. If the player does not have permission to enter that context, or if the player does not provide permission for the game to enter that context, this will reject. Otherwise, the promise will resolve when the game has switched into the specified context.
     * @param id ID of the desired context.
     * @returns A promise that resolves when the game has switched into the specified context, or rejects otherwise.
     */
    public static switchAsync(id: string): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            if (FB.started) {
                this.context.switchAsync(id)
                    .then(() => {
                        this._logger.Success('switchAsync');
                        resolve(true);
                    })
                    .catch((err: any) => {
                        this._logger.Error('switchAsync', err);
                        resolve(false);
                    });
            } else {
                this._logger.Error('switchAsync - not available');
                resolve(false);
            }
        });
    }

    /**
     * Opens a context selection dialog for the player. If the player selects an available context, the client will attempt to switch into that context, and resolve if successful. Otherwise, if the player exits the menu or the client fails to switch into the new context, this function will reject.
     * @param options An object specifying conditions on the contexts that should be offered.
     * @param filters The set of filters to apply to the context suggestions.
     * @param maxSize The maximum number of participants that a suggested context should ideally have.
     * @param minSize The minimum number of participants that a suggested context should ideally have.
     * @returns A promise that resolves when the game has switched into the context chosen by the user. Otherwise, the promise will reject (if the user cancels out of the dialog, for example).
     */
    public static chooseAsync(options?: object, filters?: Array<ContextFilter>, maxSize?: number, minSize?: number): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            if (FB.started) {
                this.context.chooseAsync({ options: options, filters: filters, maxSize: maxSize, minSize: minSize })
                    .then(() => {
                        this._logger.Success('chooseAsync');
                        resolve(true);
                    })
                    .catch((err: any) => {
                        this._logger.Error('chooseAsync', err);
                        resolve(false);
                    });
            } else {
                this._logger.Error('chooseAsync - not available');
                resolve(false);
            }
        });
    }

    /**
     * Attempts to create or switch into a context between a specified player and the current player. The returned promise will reject if the player listed is not a Connected Player of the current player or if the player does not provide permission to enter the new context. Otherwise, the promise will resolve when the game has switched into the new context.
     * @param playerID ID of the player
     * @returns A promise that resolves when the game has switched into the new context, or rejects otherwise.
     */
    public static createAsync(playerID: string): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            if (FB.started) {
                this.context.createAsync(playerID)
                    .then(() => {
                        this._logger.Success('createAsync');
                        resolve(true);
                    })
                    .catch((err: any) => {
                        this._logger.Error('createAsync', err);
                        resolve(false);
                    });
            } else {
                this._logger.Error('createAsync - not available');
                resolve(false);
            }
        });
    }

    /**
     * Gets an array of #ContextPlayer objects containing information about active players (people who played the game in the last 90 days) that are associated with the current context. This may include the current player.
     * @returns Returns Promise<Array<ContextPlayer>> or null
     */
    public static getPlayersAsync(): Promise<Array<ContextPlayer>> {
        return new Promise<Array<ContextPlayer>>((resolve) => {
            if (FB.started) {
                this.context.getPlayersAsync()
                    .then((players: Array<ContextPlayer>) => {
                        if (players != null) {
                            this._logger.Success('getPlayersAsync', players);
                            resolve(players);
                        } else {
                            this._logger.Error('getPlayersAsync - does not exist');
                            resolve(null);
                        }
                    })
                    .catch((err: any) => {
                        this._logger.Error('getPlayersAsync', err);
                        resolve(null);
                    });
            } else {
                this._logger.Error('getPlayersAsync - not available');
                resolve(null);
            }
        });
    }
}
/**
* Contains properties and functions from the player object on the FBInstant namespace
 */
export class FBPlayer {
    private static _logger: Logger = new Logger('FBPlayer');

    private static get player(): any {
        return FBInstant.player;
    }
    /**
    * A Facebook user's player ID will remain constant, and is scoped to a specific game.
    * @returns string? A unique identifier for the player.
    */
    public static get playerID(): string {
        if (FB.started) {
            return this.player.getID();
        }
        return null;
    }

    /**
    * The player's localized display name.
    * @returns string? A the player's localized display name.
    */
    public static get playerName(): string {
        if (FB.started) {
            return this.player.getName();
        }
        return null;
    }
    /**
    * The photo will always be a square, and with dimensions of at least 200x200.
    * @returns string? A Url to the player's public profile photo.
    */
    public static get playerPhoto(): string {
        if (FB.started) {
            return this.player.getPhoto();
        }
        return null;
    }

    /**
    * Retrieve data from the designated cloud storage of the current player.
    * @param keys An array of unique keys to retrieve data for.
    * @returns A promise that resolves with an object which contains the current key-value pairs for each key specified in the input array, if they exist.
    */
    public static getDataAsync(keys: string[]): Promise<object> {
        return new Promise<object>((resolve) => {
            if (FB.started) {
                this.player.getDataAsync(keys)
                    .then((data: object) => {
                        if (data != null) {
                            this._logger.Success('getDataAsync', data);
                            resolve(data);
                        } else {
                            this._logger.Error('getDataAsync - does not exist');
                            resolve(null);
                        }
                    })
                    .catch((err: any) => {
                        this._logger.Error('getDataAsync', err);
                        resolve(null);
                    });
            } else {
                this._logger.Error('getDataAsync - not available');
                resolve(null);
            }
        });
    }

    /**
    * Set data to be saved to the designated cloud storage of the current player. The game can store up to 1MB of data for each unique player.
    * @param data An object containing a set of key-value pairs that should be persisted to cloud storage. The object must contain only serializable values - any non-serializable values will cause the entire modification to be rejected.
    * @returns returns a promise with a resolved boolean result. NOTE: The promise resolving does not necessarily mean that the input has already been persisted. Rather, it means that the data was valid and has been scheduled to be saved. It also guarantees that all values that were set are now available in player.getDataAsync.
    */
    public static setDataAsync(data: object): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            if (FB.started) {
                this.player.setDataAsync(data)
                    .then(() => {
                        this._logger.Success('setDataAsync');
                        resolve(true);
                    })
                    .catch((err: any) => {
                        this._logger.Error('setDataAsync', err);
                        resolve(false);
                    });
            } else {
                this._logger.Error('setDataAsync - not available');
                resolve(false);
            }
        });
    }

    /**
    * Retrieve stats from the designated cloud storage of the current player.
    * @param keys An optional array of unique keys to retrieve stats for. If the function is called without it, it will fetch all stats.
    * @returns returns a promise that resolves with an object which contains the current key-value pairs for each key specified in the input array, if they exist.
    */
    public static getStatsAsync(keys: string[]): Promise<object> {
        return new Promise<object>((resolve) => {
            if (FB.started) {
                this.player.getStatsAsync(keys)
                    .then((stats: object) => {
                        if (stats != null) {
                            this._logger.Success('getStatsAsync', stats);
                            resolve(stats);
                        } else {
                            this._logger.Error('getStatsAsync - does not exist');
                            resolve(null);
                        }
                    })
                    .catch((err: any) => {
                        this._logger.Error('getStatsAsync', err);
                        resolve(null);
                    });
            } else {
                this._logger.Error('getStatsAsync - not available');
                resolve(null);
            }
        });
    }

    /**
    * Set stats to be saved to the designated cloud storage of the current player.
    * @param stats An object containing a set of key-value pairs that should be persisted to cloud storage as stats, which can be surfaced or used in a variety of ways to benefit player engagement. The object must contain only numerical values - any non-numerical values will cause the entire modification to be rejected.
    * @returns returns a promise that resolves when the input values are set. NOTE: The promise resolving does not necessarily mean that the input has already been persisted. Rather, it means that the data was validated and has been scheduled to be saved. It also guarantees that all values that were set are now available in player.getStatsAsync.
    */
    public static setStatsAsync(stats: object): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            if (FB.started) {
                this.player.setStatsAsync(stats)
                    .then(() => {
                        this._logger.Success('setStatsAsync');
                        resolve(true);
                    })
                    .catch((err: any) => {
                        this._logger.Error('setStatsAsync', err);
                        resolve(false);
                    });
            } else {
                this._logger.Error('setStatsAsync - not available');
                resolve(false);
            }
        });
    }

    /**
    * Increment stats saved in the designated cloud storage of the current player.
    * @param increments An object containing a set of key-value pairs indicating how much to increment each stat in cloud storage. The object must contain only numerical values - any non-numerical values will cause the entire modification to be rejected.
    * @returns returns a promise that resolves with an object which contains the updated key-value pairs for each key specified in the input dictionary. NOTE: The promise resolving does not necessarily mean that the changes have already been persisted. Rather, it means that the increments were valid and have been scheduled to be performed. It also guarantees that all values that were incremented are now available in player.getStatsAsync.
    */
    public static incrementStatsAsync(increments: object): Promise<object> {
        return new Promise<object>((resolve) => {
            if (FB.started) {
                this.player.incrementStatsAsync(increments)
                    .then((stats: object) => {
                        if (stats != null) {
                            this._logger.Success('incrementStatsAsync', stats);
                            resolve(stats);
                        } else {
                            this._logger.Error('incrementStatsAsync - does not exist');
                            resolve(null);
                        }
                    })
                    .catch((err: any) => {
                        this._logger.Error('incrementStatsAsync', err);
                        resolve(null);
                    });
            } else {
                this._logger.Error('incrementStatsAsync - not available');
                resolve(null);
            }
        });
    }

    /**
     * Fetches an array of ConnectedPlayer objects containing information about active players (people who played the game in the last 90 days) that are connected to the current player.
     * @returns A promise that resolves with a list of connected player objects. NOTE: This function should not be called until FBInstant.startGameAsync() has resolved.
     */
    public static getConnectedPlayersAsync(): Promise<Array<ConnectedPlayer>> {
        return new Promise<Array<ConnectedPlayer>>((resolve) => {
            if (FB.started) {
                this.player.getConnectedPlayersAsync()
                    .then((players: Array<ConnectedPlayer>) => {
                        if (players != null) {
                            this._logger.Success('getConnectedPlayersAsync', players);
                            resolve(players);
                        } else {
                            this._logger.Error('getConnectedPlayersAsync - does not exist');
                            resolve(null);
                        }
                    })
                    .catch((err: any) => {
                        this._logger.Error('getConnectedPlayersAsync', err);
                        resolve(null);
                    })
            } else {
                this._logger.Error('getConnectedPlayersAsync - not available');
                resolve(null);
            }
        });
    }
}
/**
 * Represents an instance of an ad.
 */
export interface AdInstance {
    /**
     * Return the Audience Network placement ID of this ad instance.
     */
    getPlacementID(): string;

    /**
     * Preload the ad. The returned promise resolves when the preload completes, and rejects if it failed.
     */
    loadAsync(): Promise<boolean>;

    /**
     * Present the ad. The returned promise resolves when user finished watching the ad, and rejects if it failed to present or was closed during the ad.
     */
    showAsync(): Promise<boolean>;
}
/**
 * An Instant Game leaderboard
 */
export interface Leaderboard {
    /**
     * The name of the leaderboard.
     */
    getName(): string;
    /**
     * The ID of the context that the leaderboard is associated with, or null if the leaderboard is not tied to a particular context.
     */
    getContextID(): string;

    /**
     * Fetches the total number of player entries in the leaderboard.
     */
    getEntryCountAsync(): Promise<number>;

    /**
     * Updates the player's score. If the player has an existing score, the old score will only be replaced if the new score is better than it. NOTE: If the leaderboard is associated with a specific context, the game must be in that context to set a score for the player.
     * @param score The new score for the player. Must be a 64-bit integer number.
     * @param extraData Metadata to associate with the stored score. Must be less than 2KB in size.
     */
    setScoreAsync(score: number, extraData?: string): Promise<LeaderboardEntry>;
}
/**
 * A score entry for an Instant Game leaderboard
 */
export interface LeaderboardEntry {
    /**
     * Gets the score associated with the entry.
     * @returns Returns an integer score value.
     */
    getScore(): number;

    /**
     * Gets the score associated with the entry, formatted with the score format associated with the leaderboard.
     * @returns Returns a formatted score.
     */
    getFormattedScore(): string;

    /**
     * Gets the timestamp of when the leaderboard entry was last updated.
     * @returns Returns a Unix timestamp.
     */
    getTimestamp(): number;

    /**
     * Gets the rank of the player's score in the leaderboard.
     * @returns Returns the entry's leaderboard ranking.
     */
    getRank(): number;

    /**
     * Gets the developer-specified payload associated with the score, or null if one was not set.
     * @returns An optional developer-specified payload associated with the score.
     */
    getExtraData(): string;

    /**
     * Gets information about the player associated with the entry.
     * @returns LeaderboardPlayer
     */
    getPlayer(): LeaderboardPlayer;

}
export interface LeaderboardPlayer {
    /**
     * Gets the player's localized display name.
     * @returns The player's localized display name.
     */
    getName(): string;

    /**
     * Returns a url to the player's public profile photo.
     * @returns Url to the player's public profile photo.
     */
    getPhoto(): string;

    /**
     * Gets the game's unique identifier for the player.
     * @returns The game-scoped identifier for the player.
     */
    getID(): string;
}
export interface ConnectedPlayer {
    /**
     * Get the id of the connected player.
     * @returns The ID of the connected player
     */
    getID(): string;
    /**
     * Get the player's full name.
     * @returns The player's full name
     */
    getName(): string;

    /**
     * Get the player's public profile photo.
     * @returns A url to the player's public profile photo
     */
    getPhoto(): string;
}
/**
 * The answer field is true if the current context size is between the minSize and maxSize values that are specified in the object, and false otherwise.
 */
export type ContextSizeResponse = { answer: boolean, minSize: number, maxSize: number };
/**
 * A filter that may be applied to a Context Choose operation 'NEW_CONTEXT_ONLY' - Prefer to only surface contexts the game has not been played in before. 'INCLUDE_EXISTING_CHALLENGES' - Include the "Existing Challenges" section, which surfaces actively played-in contexts that the player is a part of. 'NEW_PLAYERS_ONLY' - In sections containing individuals, prefer people who have not played the game.
 */
export type ContextFilter = ("NEW_CONTEXT_ONLY" | "INCLUDE_EXISTING_CHALLENGES" | "NEW_PLAYERS_ONLY");
/**
 * Represents the current platform that the user is playing on.
 */
export type Platform = ("IOS" | "ANDROID" | "WEB" | "MOBILE_WEB");
/**
 * Represents information about a player who is in the context that the current player is playing in.
 */
export interface ContextPlayer {
    /**
     * Get the id of the context player.
     * @returns The ID of the context player
     */
    getID(): string;
    /**
     * Get the player's localized display name.
     * @returns The player's localized display name.
     */
    getName(): string;

    /**
     * Get the player's public profile photo.
     * @returns A url to the player's public profile photo
     */
    getPhoto(): string;
}
/**
 * Represents content to be shared by the user.
 */
export type SharePayload = {
    /**
     * Indicates the intent of the share.
     */
    intent: ("INVITE" | "REQUEST" | "CHALLENGE" | "SHARE");
    /**
     * A base64 encoded image to be shared.
     */
    image: string;
    /**
     * A text message to be shared.
     */
    text: string;
    /**
     * A blob of data to attach to the share. All game sessions launched from the share will be able to access this blob through FBInstant.getEntryPointData().
     */
    data?: object;
}
/**
 * Represents a custom update for FBInstant.updateAsync. Note that if localized content is not provided, a Facebook supplied localized string will be used for the call to action and text.
 */
export type CustomUpdatePayload = {
    /**
     * For custom updates, this should be 'CUSTOM'.
     */
    action: UpdateAction;
    /**
     * ID of the template this custom update is using. Templates should be predefined in fbapp-config.json. See the [Bundle Config documentation]
     */
    template: string;
    /**
     * Optional call-to-action button text. By default we will use a localized 'Play' as the button text. To provide localized versions of your own call to action, pass an object with the default cta as the value of 'default' and another object mapping locale keys to translations as the value of 'localizations'.
     */
    cta?: string | LocalizableContent;
    /**
     * Data URL of a base64 encoded image.
     */
    image: string;
    /**
     * A text message, or an object with the default text as the value of 'default' and another object mapping locale keys to translations as the value of 'localizations'.
     */
    text: string | LocalizableContent;
    /**
     * A blob of data to attach to the update. All game sessions launched from the update will be able to access this blob through FBInstant.getEntryPointData(). Must be less than or equal to 1000 characters when stringified.
     */
    data: object;
    /**
     * Specifies how the update should be delivered. This can be one of the following: 'IMMEDIATE' - The update should be posted immediately. 'LAST' - The update should be posted when the game session ends. The most recent update sent using the 'LAST' strategy will be the one sent. 'IMMEDIATE_CLEAR' - The update is posted immediately, and clears any other pending updates (such as those sent with the 'LAST' strategy). If no strategy is specified, we default to 'IMMEDIATE'.
     */
    strategy?: string;
    /**
     * Specifies notification setting for the custom update. This can be 'NO_PUSH' or 'PUSH', and defaults to 'NO_PUSH'. Use push notification only for updates that are high-signal and immediately actionable for the recipients. Also note that push notification is not always guaranteed, depending on user setting and platform policies.
     */
    notification?: string;
}
/**
 * Represents the type of the update action to perform.
 */
export enum UpdateAction {
    "CUSTOM" = "CUSTOM",
    "LEADERBOARD" = "LEADERBOARD"
}
/**
 * Represents a string with localizations and a default value to fall back on.
 */
export type LocalizableContent = {
    /**
     * The default value of the string to use if the viewer's locale is not a key in the localizations object.
     */
    default: string;
    /**
     * Specifies what string to use for viewers in each locale.
     */
    localizations: LocalizationsDict;
}
/**
 * Represents a mapping from locales to translations of a given string. Each property is an optional five-character Facebook locale code of the form xx_XX. See https://origincache.facebook.com/developers/resources/?id=FacebookLocales.xml for a complete list of supported locale codes.
 */
export type LocalizationsDict = {};
/**
 * An API Error returned by the Instant Games SDK
 */
export type APIError = {
    /**
     * The relevant error code
     */
    code: ErrorCodeType;
    /**
     * A message describing the error
     */
    message: string;
}
/**
 * An Instant Games error code, one of #errorcode
 */
export type ErrorCodeType = ErrorCode;
/**
 * Error codes that may be returned by the Instant Games API
 */
export enum ErrorCode {
    "ADS_FREQUENT_LOAD" = "ADS_FREQUENT_LOAD",
    "ADS_NO_FILL" = "ADS_NO_FILL",
    "ADS_NOT_LOADED" = "ADS_NOT_LOADED",
    "ADS_TOO_MANY_INSTANCES" = "ADS_TOO_MANY_INSTANCES",
    "ANALYTICS_POST_EXCEPTION" = "ANALYTICS_POST_EXCEPTION",
    "CLIENT_REQUIRES_UPDATE" = "CLIENT_REQUIRES_UPDATE",
    "CLIENT_UNSUPPORTED_OPERATION" = "CLIENT_UNSUPPORTED_OPERATION",
    "INVALID_OPERATION" = "INVALID_OPERATION",
    "INVALID_PARAM" = "INVALID_PARAM ",
    "LEADERBOARD_NOT_FOUND" = "LEADERBOARD_NOT_FOUND",
    "LEADERBOARD_WRONG_CONTEXT" = "LEADERBOARD_WRONG_CONTEXT",
    "NETWORK_FAILURE" = "NETWORK_FAILURE",
    "PAYMENTS_NOT_INITIALIZED" = "PAYMENTS_NOT_INITIALIZED",
    "PENDING_REQUEST" = "PENDING_REQUEST",
    "RATE_LIMITED" = "RATE_LIMITED",
    "SAME_CONTEXT" = "SAME_CONTEXT",
    "UNKNOWN" = "UNKNOWN",
    "USER_INPUT" = "USER_INPUT",
}