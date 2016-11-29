import { default as WebSocketClient } from 'ws';
import { EventEmitter } from 'events';
const registerPayload = require('./json/register-payload');

export class Bridge {
    constructor(ipAddress, clientKey) {
        this._lastCommandId = 0;
        this._address = 'ws://' + ipAddress + ':3000';
        this._clientKey = clientKey;
        this._responseEmitter = new EventEmitter();
    }

    sendMessage(uri, payload, commandType) {
        return this.connect().then(() => {
            return this._sendMessage(uri, payload);
        });
    }

    connect() {
        if (!this._connectionPromise) {
            this._connectionPromise = this._connectToTv().then(() => {
                return this._pairWithTv();
            });
        }

        return this._connectionPromise;
    }

    _connectToTv() {
        return new Promise((resolve) => {
            this._socket = new WebSocketClient(this._address);

            this._socket.on('open', () => {
                this._socket.on('error', (error) => {
                    console.log('error');
                });

                this._socket.on('close', () => {
                    this._socket = null;
                });

                this._socket.on('message', (data, flags) => {
                    try {
                        const response = JSON.parse(data);
                        this._responseEmitter.emit(response.id, response);
                    } catch(e) {
                        console.log('Failed to parse message', data);
                    }
                });

                resolve();
            });
        });
        
    }

    _sendMessage(uri, payload, commandType) {
        const commandId = 'command_' + this._lastCommandId++;
        const command = {
            id: commandId,
            type: commandType || 'request'
        }

        if (uri) {
            command.uri = uri;
        }

        if (payload) {
            command.payload = payload;
        } else {
            command.payload = null;
        }

        return new Promise((resolve) => {
            this._responseEmitter.once(commandId, (response) => {
                resolve(response);
            });

            this._socket.send(JSON.stringify(command));
        });
    }

    _pairWithTv() {
        registerPayload['client-key'] = this._clientKey;

        return this._sendMessage(null, registerPayload, 'register');
    }
}