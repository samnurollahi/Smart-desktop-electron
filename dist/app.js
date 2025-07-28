"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const electron_1 = require("electron");
const dirname = path_1.default.join(__dirname, "..", "src");
const isClose = false;
const createWindow = () => {
    const mainWindow = new electron_1.BrowserWindow({
        width: 450 * 1.5,
        height: 300 * 1.5,
        show: false,
        resizable: false,
        webPreferences: {
            preload: path_1.default.join(__dirname, "preload", "preload.js"), // path preload
            nodeIntegration: true,
            contextIsolation: true,
        },
    });
    mainWindow.loadFile(path_1.default.join(dirname, "ui", "index.html")); // load index
    mainWindow.setMenu(null); // deleted menu
    mainWindow.webContents.openDevTools(); // inspect
    const tray = new electron_1.Tray(electron_1.nativeImage.createFromPath(path_1.default.join(__dirname, "..", "assets", "images", "logo.png")));
    tray.setToolTip("Gadgets");
    mainWindow.on("ready-to-show", () => {
        mainWindow.show();
        mainWindow.on("close", (e) => {
            if (!isClose) {
                e.preventDefault();
                mainWindow.hide();
            }
        });
    });
    // ipc
    electron_1.ipcMain.on("data", (e, data) => {
        for (let shortCut of data) {
            try {
                electron_1.globalShortcut.register(`${shortCut.keys}+${shortCut.keyB}`, () => {
                    electron_1.shell.openPath(shortCut.filePath);
                });
            }
            catch (err) {
                console.log(err);
            }
        }
    });
    electron_1.ipcMain.on("addShortCutDialog", (e) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield electron_1.dialog.showOpenDialog(mainWindow, {
            // select app
            title: "برنامه ای که میخوای براش شرت کات تعریف کنید",
            filters: [
                {
                    name: "*.exe",
                    extensions: ["exe"],
                },
            ],
        });
        if (!result.canceled && result.filePaths[0]) {
            // shell.openPath(result.filePaths[0])  // open app
            e.sender.send("pathGeted", { filePath: result.filePaths[0] });
        }
    }));
    electron_1.ipcMain.on("setKey", (e, data) => {
        electron_1.globalShortcut.register(`${data.keys}+${data.keyB.toLocaleUpperCase()}`, () => {
            electron_1.shell.openPath(data.filePath);
        });
    });
};
electron_1.app.on("ready", () => {
    createWindow();
    electron_1.app.setLoginItemSettings({
        openAtLogin: true,
        path: electron_1.app.getPath('exe')
    });
});
