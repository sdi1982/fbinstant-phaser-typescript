export default class Settings {
    public static set score(s: number) {
        this._score = s;
    }

    public static get score(): number {
        return this._score;
    }
    private static _score = 0;
    private static _speed = 1000; // milliseconds

    public static incrementScore() {
        this._score++;
    }
}