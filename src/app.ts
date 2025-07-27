import path from "path";

import { app, BrowserWindow, globalShortcut, shell } from "electron";

console.log("start");

const dirname = path.join(__dirname, "..", "src");

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 450 * 1.5,
    height: 300 * 1.5,
    show: false,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, "preload", "preload.js"),
      nodeIntegration: true,
      contextIsolation: true,
    }
  });
  mainWindow.loadFile(path.join(dirname, "ui", "index.html")); // load index
  mainWindow.setMenu(null) // deleted menu
  mainWindow.webContents.openDevTools() // inspect

  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  
    globalShortcut.register("control+F", () => {
      console.log("search");
    })
  });
};



// ipc



app.on("ready", () => {
  createWindow();
});