"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWindow = void 0;
const electron_1 = require("electron");
const electron_store_1 = __importDefault(require("electron-store"));
const createWindow = (windowName, options) => {
    const key = 'window-state';
    const name = `window-state-${windowName}`;
    const store = new electron_store_1.default({ name });
    const defaultSize = {
        width: options.width,
        height: options.height,
    };
    let state = {};
    const restore = () => store.get(key, defaultSize);
    const getCurrentPosition = () => {
        const position = win.getPosition();
        const size = win.getSize();
        return {
            x: position[0],
            y: position[1],
            width: size[0],
            height: size[1],
        };
    };
    const windowWithinBounds = (windowState, bounds) => {
        return (windowState.x >= bounds.x &&
            windowState.y >= bounds.y &&
            windowState.x + windowState.width <= bounds.x + bounds.width &&
            windowState.y + windowState.height <= bounds.y + bounds.height);
    };
    const resetToDefaults = () => {
        const bounds = electron_1.screen.getPrimaryDisplay().bounds;
        return Object.assign({}, defaultSize, {
            x: (bounds.width - defaultSize.width) / 2,
            y: (bounds.height - defaultSize.height) / 2,
        });
    };
    const ensureVisibleOnSomeDisplay = (windowState) => {
        const visible = electron_1.screen.getAllDisplays().some((display) => {
            return windowWithinBounds(windowState, display.bounds);
        });
        if (!visible) {
            // Window is partially or fully not visible now.
            // Reset it to safe defaults.
            return resetToDefaults();
        }
        return windowState;
    };
    const saveState = () => {
        if (!win.isMinimized() && !win.isMaximized()) {
            Object.assign(state, getCurrentPosition());
        }
        store.set(key, state);
    };
    state = ensureVisibleOnSomeDisplay(restore());
    const win = new electron_1.BrowserWindow({
        ...state,
        ...options,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            ...options.webPreferences,
        },
    });
    win.on('close', saveState);
    return win;
};
exports.createWindow = createWindow;
