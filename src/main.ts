// This is the entry point to the application as referenced by webpack which handles all the dependencies required herein.
import Game from "./game";
import FacebookInstant from './facebook';

var game: Game = null;

const startGame = () => {
    if (game == null) {
        game = new Game();
    }
}

// When the browser has loaded this script, check if Facebook Instant Games SDK is available and initialize it if so
// (as required by Facebook), and if not jus instantiate the game because it will be a development environment
window.onload = () => {
    if (FacebookInstant.available) {
        FacebookInstant.InitializeAndStartAsync()
            .then(() => {
                startGame();
            })
            .catch(err => {
                console.error(`err=${err}`)
            });
    } else {
        startGame();
    }
}
