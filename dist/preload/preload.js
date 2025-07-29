"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
window.addEventListener("DOMContentLoaded", () => {
    const addShortCut = document.getElementById("addShortCut"), // btn add
    container = document.getElementById("container"), modalShortCut = document.getElementById("modalShortCut"), boxShortCut = document.querySelector(".boxShortCut");
    function addShortCutToIndex() {
        boxShortCut.innerHTML = "";
        electron_1.ipcRenderer.send("needData", null);
        electron_1.ipcRenderer.on("data", (e, data) => {
            console.log(data);
            for (let key of data) {
                boxShortCut === null || boxShortCut === void 0 ? void 0 : boxShortCut.insertAdjacentHTML("beforeend", `
                  <div
                    class="flex flex-row-reverse justify-between items-center px-2 pt-2"
                  >
                    <div class="flex items-center">
                      <p class="text-white">${key.keys}+${key.keyB}</p>
                      <i class="fa fa-close text-red-700 mr-2 border border-red-700 text-center rounded-md active:bg-red-700 active:text-white"></i>
                    </div>
                    <p class="text-blue-300">${key.filePath.slice(1, 7)}</p>
                  </div>    
              `);
            }
            const closes = Array.from(document.querySelectorAll(".fa-close"));
            closes.forEach((close) => {
                var _a, _b;
                console.log((_b = (_a = close.parentElement) === null || _a === void 0 ? void 0 : _a.firstElementChild) === null || _b === void 0 ? void 0 : _b.innerHTML);
                close.addEventListener("click", (event) => {
                    var _a, _b, _c, _d;
                    let keys = ((_b = (_a = close.parentElement) === null || _a === void 0 ? void 0 : _a.firstElementChild) === null || _b === void 0 ? void 0 : _b.innerHTML.split("+")[0]) ||
                        "";
                    let keyB = ((_d = (_c = close.parentElement) === null || _c === void 0 ? void 0 : _c.firstElementChild) === null || _d === void 0 ? void 0 : _d.innerHTML.split("+")[1]) ||
                        "";
                    const obj = {
                        keys,
                        keyB,
                    };
                    electron_1.ipcRenderer.send("removeShortCut", obj);
                });
            });
        });
    }
    addShortCutToIndex();
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
            const data = {
                filePath,
                keys: keyA,
                keyB: e.key,
            };
            eventIpc.sender.send("setKey", data);
            container === null || container === void 0 ? void 0 : container.classList.remove("opacity-40");
            modalShortCut === null || modalShortCut === void 0 ? void 0 : modalShortCut.classList.add("hidden");
            // addShortCutToIndex();
        }, {
            once: true,
        });
    });
    electron_1.ipcRenderer.on("change", (e, data) => {
        boxShortCut.innerHTML = "";
        console.log(data);
        for (let key of data) {
            boxShortCut === null || boxShortCut === void 0 ? void 0 : boxShortCut.insertAdjacentHTML("beforeend", `
                  <div
                    class="flex flex-row-reverse justify-between items-center px-2 pt-2"
                  >
                    <div class="flex items-center">
                      <p class="text-white">${key.keys}+${key.keyB}</p>
                      <i class="fa fa-close text-red-700 mr-2 border border-red-700 text-center rounded-md active:bg-red-700 active:text-white"></i>
                    </div>
                    <p class="text-blue-300">${key.filePath.slice(1, 7)}</p>
                  </div>    
              `);
        }
        const closes = Array.from(document.querySelectorAll(".fa-close"));
        closes.forEach((close) => {
            var _a, _b;
            console.log((_b = (_a = close.parentElement) === null || _a === void 0 ? void 0 : _a.firstElementChild) === null || _b === void 0 ? void 0 : _b.innerHTML);
            close.addEventListener("click", (event) => {
                var _a, _b, _c, _d;
                let keys = ((_b = (_a = close.parentElement) === null || _a === void 0 ? void 0 : _a.firstElementChild) === null || _b === void 0 ? void 0 : _b.innerHTML.split("+")[0]) || "";
                let keyB = ((_d = (_c = close.parentElement) === null || _c === void 0 ? void 0 : _c.firstElementChild) === null || _d === void 0 ? void 0 : _d.innerHTML.split("+")[1]) || "";
                const obj = {
                    keys,
                    keyB,
                };
                electron_1.ipcRenderer.send("removeShortCut", obj);
            });
        });
    });
    // ipcRenderer.on("removed", (e) => {
    //   addShortCutToIndex()
    // })
});
