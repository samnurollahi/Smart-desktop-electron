import { app, BrowserWindow, globalShortcut, shell } from "electron";
import path from "path";

console.log("start");

const dirname = path.join(__dirname, "..", "src");

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 450 * 1.5,
    height: 300 * 1.5,
    show: false,
    resizable: false,
  });
  mainWindow.loadFile(path.join(dirname, "ui", "index.html")); // load index
  mainWindow.setMenu(null) // deleted menu


  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  
    globalShortcut.register("control+F", () => {
      console.log("search");
    })
  });
};

app.on("ready", () => {
  createWindow();
});

