import path from "path";

import {
  app,
  BrowserWindow,
  dialog,
  globalShortcut,
  ipcMain,
  shell,
} from "electron";



const dirname = path.join(__dirname, "..", "src");

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 450 * 1.5,
    height: 300 * 1.5,
    show: false,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, "preload", "preload.js"), // path preload
      nodeIntegration: true,
      contextIsolation: true,
    },
  });
  mainWindow.loadFile(path.join(dirname, "ui", "index.html")); // load index
  mainWindow.setMenu(null); // deleted menu
  mainWindow.webContents.openDevTools(); // inspect

  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });

  // ipc
  ipcMain.on("addShortCutDialog", async (e) => {
    const result: any = await dialog.showOpenDialog(mainWindow, {
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
  });
  ipcMain.on("setKey", (e, data) => {
    console.log(data);
    globalShortcut.register(`${data.keys}+${data.keyB.toLocaleUpperCase()}`, () => {
      shell.openPath(data.filePath)
      console.log(data.filePath);
    })
  })  
};

app.on("ready", () => {
  createWindow();
});
