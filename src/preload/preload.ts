import { ipcRenderer } from "electron"

window.addEventListener("DOMContentLoaded", () => { // html loaded
    const addShortCut = document.getElementById("addShortCut"), // btn add 
    container = document.getElementById("container"),
    modalShortCut = document.getElementById("modalShortCut");
   
    addShortCut?.addEventListener("click", () => {
        ipcRenderer.send("addShortCutDialog", null)
    })

    ipcRenderer.on("pathGeted", (eventIpc, {filePath}: {filePath: string}) => {
        container?.classList.add("opacity-40")
        modalShortCut?.classList.remove("hidden")

        window.addEventListener("keyup", (e) => {
            let keyA : "shift" | "alt" | "control" = "alt";
            if(e.shiftKey) {
                keyA = "shift"
            }else if(e.altKey) {
                keyA = "alt"
            }else if(e.ctrlKey) {
                keyA = "control"
            }

            eventIpc.sender.send("setKey", {
                filePath, 
                keys: keyA,
                keyB: e.key
            })
        }, {
            once: true
        })
    })

})