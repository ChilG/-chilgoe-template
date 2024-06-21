"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const handler = {
    send(channel, value) {
        electron_1.ipcRenderer.send(channel, value);
    },
    on(channel, callback) {
        const subscription = (_event, ...args) => callback(...args);
        electron_1.ipcRenderer.on(channel, subscription);
        return () => {
            electron_1.ipcRenderer.removeListener(channel, subscription);
        };
    },
    invoke(channel, value) {
        return electron_1.ipcRenderer.invoke(channel, value);
    },
};
electron_1.contextBridge.exposeInMainWorld('ipc', handler);
