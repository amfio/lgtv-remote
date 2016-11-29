import { URL } from './url';

export class App {
    constructor(bridge, title, id) {
        this._bridge = bridge;
        this.title = title;
        this.id = id;
    }

    open() {
        const payload = {
            id: this.id
        };

        return this._bridge.sendMessage(URL.OPEN_APP, payload);
    }

    close() {
        const payload = {
            id: this.id
        };
        
        return this._bridge.sendMessage(URL.CLOSE_APP, payload);
    }
}
