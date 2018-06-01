// Only way to assume Facebook Instant Games SDK is available in TypeScript is to declare the namespace it will encompass
declare var FBInstant: any;

export default class FacebookInstant {

    private static _interstitialID: string = 'INTERSTITIAL_ID_HERE';
    private static _interstitial: any = null;
    private static _leaderboardName: string = 'game_leaderboard';
    private static _hasStarted: boolean = false;
    private static _playerName: string = null;

    public static get playerName(): string {
        return this._playerName;
    }
    public static get available(): boolean {
        return window.location.host == "www.facebook.com";
    }
    // Will not resolve or reject if called when not available
    // Needed fix: resolve or reject regardless of availability
    public static InitializeAndStartAsync = (): Promise<void> => {
        return new Promise((resolve, reject) => {
            if (!FacebookInstant._hasStarted) {
                FBInstant.initializeAsync()
                    .then(() => {
                        // Feature request: tie the progress to the loading time as it relates to the caller instead of immediately completing
                        FBInstant.setLoadingProgress(100);
                        FBInstant.startGameAsync()
                            .then(() => {
                                FacebookInstant._hasStarted = true;
                                resolve();
                            })
                            .catch((err: any) => {
                                FacebookInstant._hasStarted = false;
                                reject(err);
                            })
                    })
                    .catch((err: any) => {
                        FacebookInstant._hasStarted = false;
                        reject(err);
                    });
            } else {
                resolve();
            }
        });

    }
    
    // Feature request: keep track of loaded interstitial's
    public static LoadAndShowInterstitial = (): Promise<void> => {
        return new Promise((resolve, reject) => {
            if (FacebookInstant._hasStarted) {
                FBInstant.getInterstitialAdAsync(FacebookInstant._interstitialID)
                    .then((interstitial: any) => {
                        FacebookInstant._interstitial = interstitial;
                        return FacebookInstant._interstitial.loadAsync();
                    })
                    .then((interstitial: any) => {
                        FacebookInstant._interstitial.showAsync()
                            .then(() => {
                                resolve();
                            })
                            .catch((err: any) => {
                                reject(err);
                            })
                    })
                    .catch((err: any) => {
                        reject(err);
                    });
            } else {
                reject();
            }
        });
    }

    public static AddLeaderboardScore = (score: number): Promise<void> => {
        return new Promise((resolve, reject) => {
            if (FacebookInstant._hasStarted) {
                FBInstant.getLeaderboardAsync(FacebookInstant._leaderboardName)
                    .then((leaderboard: any) => {
                        return leaderboard.setScoreAsync(score);
                    })
                    .then(() => {
                        resolve();
                    })
                    .catch((err: any) => {
                        reject(err);
                    });
            } else {
                reject('FacebookInstant not started');
            }
        });
    }

    public static GetLeaderboardScore = (): Promise<number> => {
        return new Promise((resolve, reject) => {
            if (FacebookInstant._hasStarted) {
                FBInstant.getLeaderboardAsync(FacebookInstant._leaderboardName)
                    .then((leaderboard: any) => {
                        return leaderboard.getPlayerEntryAsync();
                    })
                    .then((entry: any) => {
                        resolve(entry.getScore());
                    })
                    .catch((err: any) => {
                        reject(err);
                    });
            } else {
                reject('FacebookInstant not started');
            }
        });
    }

    public static GetPlayerName = (): Promise<string | undefined> => {
        return new Promise((resolve, reject) => {
            if (FacebookInstant._playerName == null) {
                if (!FacebookInstant._hasStarted) {
                    reject('FacebookInstant not started');
                } else {
                    const playerName = FBInstant.player.getName();
                    if (playerName != undefined) {
                        FacebookInstant._playerName = playerName;

                        resolve(playerName);
                    } else {
                        reject('playerName could not be gotten');
                    }
                }
            } else {
                resolve(FacebookInstant._playerName);
            }
        });
    }

    public static GetPlayerScore = (): Promise<number> => {
        return new Promise((resolve, reject) => {
            if (!FacebookInstant._hasStarted) {
                reject('FacebookInstant not started');
            } else {
                FBInstant.player.getDataAsync(['score'])
                    .then((data: any) => {
                        const score = data['score'];
                        if (score != undefined) {
                            resolve(score);
                        } else {
                            reject('score was not available');
                        }
                    })
                    .catch((err: any) => {
                        reject(err);
                    })
            }
        });
    }

    public static SetPlayerScore = (score: number): Promise<void> => {
        return new Promise((resolve, reject) => {
            if (!FacebookInstant._hasStarted) {
                reject('FacebookInstant not started');
            } else {
                FBInstant.player.setDataAsync({ score: score })
                    .then(() => {
                        resolve();
                    })
                    .catch((err: any) => {
                        reject(err);
                    })
            }
        });
    }
}
