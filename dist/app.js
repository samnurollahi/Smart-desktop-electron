"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
console.log("start");
const dirname = path_1.default.join(__dirname, "..", "src");
const createWindow = () => {
    const mainWindow = new electron_1.BrowserWindow({
        width: 450 * 1.5,
        height: 300 * 1.5,
        show: false,
        resizable: false,
    });
    mainWindow.loadFile(path_1.default.join(dirname, "ui", "index.html")); // load index
    mainWindow.setMenu(null); // deleted menu
    mainWindow.on("ready-to-show", () => {
        mainWindow.show();
        electron_1.globalShortcut.register("control+F", () => {
            console.log("search");
        });
    });
};
electron_1.app.on("ready", () => {
    createWindow();
});
