export default class Logger {
    private _owner: string;
    constructor(owner: string) {
        this._owner = owner;
    }

    public Error(message: string, data?: any) {
        if (data) {
            this.Log(`${message} - ${JSON.stringify(data, null, 4)}`, true);
        } else {
            this.Log(message, true);
        }
    }

    public Success(message: any, data?: any) {
        if(data) {
            this.Log(`${message} - ${JSON.stringify(data, null, 4)}`, false);
        } else {
            this.Log(message, false);
        }
    }

    private Log(contents: string, error: boolean) {
        if (error) {
            console.error(`%c${this._owner} - ${contents}`, 'background: #FF0000; color: #FFFC19');
        } else {
            console.log(`%c${this._owner} - ${contents}`, 'background: #00FF00; color: #4319FF');
        }
    }
}