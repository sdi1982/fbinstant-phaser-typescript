import Game from "./game";
import FacebookInstant from './facebook';

var game: Game = null;

const startGame = () => {
    if (game == null) {
        game = new Game();
    }
}

window.onload = async () => {
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
