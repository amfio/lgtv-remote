import { URL } from './url';

export class Volume {
    constructor(bridge) {
        this._bridge = bridge;
    }

    increase() {
        return this._getVolume().then((volume) => {
            this._setVolume(volume + 5);
        });
    }

    decrease() {
        return this._getVolume().then((volume) => {
            this._setVolume(volume - 5);
        });
    }

    mute() {
        return this._setMute(true);
    }

    unmute() {
        return this._setMute(false);
    }

    _setMute(isMute) {
        const payload = {
            mute: isMute
        };

        return this._bridge.sendMessage(URL.SET_MUTE, payload);
    }

    _setVolume(volume) {
        volume = Math.min(100, Math.max(volume, 0));

        const payload = {
            volume: volume
        };

        return this._bridge.sendMessage(URL.SET_VOLUME, payload);
    }

    _getVolume() {
        return this._bridge.sendMessage(URL.GET_VOLUME).then((response) => {
            if (response.payload.muted) {
                return 0;
            } else {
                return response.payload.volume;
            }
        });
    }
}