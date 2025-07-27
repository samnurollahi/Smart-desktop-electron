"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
window.addEventListener("DOMContentLoaded", () => {
    const addShortCut = document.getElementById("addShortCut"), // btn add 
    container = document.getElementById("container"), modalShortCut = document.getElementById("modalShortCut");
    addShortCut === null || addShortCut === void 0 ? void 0 : addShortCut.addEventListener("click", () => {
        electron_1.ipcRenderer.send("addShortCutDialog", null);
    });
    electron_1.ipcRenderer.on("pathGeted", (eventIpc, { filePath }) => {
        container === null || container === void 0 ? void 0 : container.classList.add("opacity-40");
        modalShortCut === null || modalShortCut === void 0 ? void 0 : modalShortCut.classList.remove("hidden");
        window.addEventListener("keyup", (e) => {
            let keyA = "alt";
            if (e.shiftKey) {
                keyA = "shift";
            }
            else if (e.altKey) {
                keyA = "alt";
            }
            else if (e.ctrlKey) {
                keyA = "control";
            }
            eventIpc.sender.send("setKey", {
                filePath,
                keys: keyA,
                keyB: e.key
            });
        }, {
            once: true
        });
    });
});
