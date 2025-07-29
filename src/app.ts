import path from "path";
import fs from "fs";

import {
  app,
  BrowserWindow,
  dialog,
  globalShortcut,
  ipcMain,
  nativeImage,
  shell,
  Tray,
} from "electron";
import { DataBase } from "./file";

const dirname = path.join(__dirname, "..", "src");
const isClose = false;

const keySets = () => {
  DataBase.gets((err, data) => {
    if (err) console.log(err);
    else if (data) {
      for (let shortCut of data) {
        try {
          globalShortcut.register(`${shortCut.keys}+${shortCut.keyB}`, () => {
            shell.openPath(shortCut.filePath);
          });
        } catch (err) {
          console.log(err);
        }
      }
    }
  });
};
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

  const tray = new Tray(
    nativeImage.createFromPath(
      path.join(__dirname, "..", "assets", "images", "logo.png")
    )
  );
  tray.setToolTip("Gadgets");
  tray.on("click", (e) => {
    if (e.shiftKey) {
      tray.destroy();
      app.quit();
    } else {
      mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
    }
  });

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
  ipcMain.on("needData", (e) => {
    DataBase.gets((err, data) => {
      if (err) console.log(err);
      else {
        console.log(data);
        e.sender.send("data", data);
      }
    });
  });
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
    DataBase.set(data, (err) => {
      if (err) console.log(err);
      else {
        DataBase.gets((err, dd) => {
          if (err) console.log(err);
          else {
            console.log(data);
            e.sender.send("change", dd);
          }
        });
      }
    });

    globalShortcut.register(
      `${data.keys}+${data.keyB.toLocaleUpperCase()}`,
      () => {
        shell.openPath(data.filePath);
      }
    );
  });
  ipcMain.on(
    "removeShortCut",
    (
      e,
      data: {
        keys: string;
        keyB: string;
      }
    ) => {
      DataBase.remove(data.keys, data.keyB, (err) => {
        if (err) console.log(err);
        else {
          e.sender.send("removed", null);
          keySets();
          DataBase.gets((err, dd) => {
            if (err) console.log(err);
            else {
              console.log(data);
              e.sender.send("change", dd);
            }
          });
        }
      });
    }
  );
};

app.on("ready", () => {
  createWindow();
  keySets();

  app.setLoginItemSettings({
    openAtLogin: true,
    path: app.getPath("exe"),
  });
});
