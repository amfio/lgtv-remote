import { URL } from './url';

export class Player {
    constructor(bridge) {
        this._bridge = bridge;
    }

    play() {
        return this._bridge.sendMessage(URL.PLAY);
    }

    pause() {
        return this._bridge.sendMessage(URL.PAUSE);
    }

    stop() {
        return this._bridge.sendMessage(URL.STOP);
    }
}