import { Bridge } from './bridge';
import { Player } from './player';
import { Volume } from './volume';
import { App } from './app';
import { URL } from './url';

export class LGTV {
    constructor(ipAddress, clientKey) {
        this._bridge = new Bridge(ipAddress, clientKey);
        this.volume = new Volume(this._bridge);
        this.player = new Player(this._bridge);
    }

    displayMessage(message) {
        const payload = {
            message: message
        };
        return this._bridge.sendMessage(URL.DISPLAY_MESSAGE, payload);
    }

    getApps() {
        return this._bridge.sendMessage(URL.GET_APPS).then((response) => {
            return response.payload.launchPoints.map((launchPoint) => {
                return new App(this._bridge, launchPoint.title, launchPoint.launchPointId);
            });
        });
    }

    getInputs() {
        return this._bridge.sendMessage(URL.GET_INPUTS).then((response) => {
            return response.payload.devices.map((device) => {
                return new App(this._bridge, device.label, device.appId);
            });
        });
    }

    turnOff() {
        return this._bridge.sendMessage(URL.TURN_OFF);
    }

    disconnect() {
        return this._bridge.disconnect();
    }
}