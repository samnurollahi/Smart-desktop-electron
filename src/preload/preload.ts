import { ipcRenderer } from "electron";

window.addEventListener("DOMContentLoaded", () => {
  // localStorage.clear()
  const keySeted = JSON.parse(localStorage.getItem("keys") || "[]");
  ipcRenderer.send("data", keySeted);

  const addShortCut = document.getElementById("addShortCut"), // btn add
    container = document.getElementById("container"),
    modalShortCut = document.getElementById("modalShortCut"),
    boxShortCut = document.querySelector(".boxShortCut")

    function addShortCutToIndex() {
        const keySeted = JSON.parse(localStorage.getItem("keys") || "[]");
        for(let key  of keySeted) {
            boxShortCut?.insertAdjacentHTML("beforeend", `
                <div
                  class="flex flex-row-reverse justify-between items-center px-2 pt-2"
                >
                  <div class="flex items-center">
                    <p class="text-white">${key.keys}+${key.keyB}</p>
                    <i class="fa fa-close text-red-700 mr-2 border border-red-700 text-center rounded-md active:bg-red-700 active:text-white"></i>
                  </div>
                  <p class="text-blue-300">${key.filePath.slice(1, 7)}</p>
                </div>    
            `)
        }
    }
    addShortCutToIndex()

  addShortCut?.addEventListener("click", () => {
    ipcRenderer.send("addShortCutDialog", null);
  });

  ipcRenderer.on(
    "pathGeted",
    (eventIpc, { filePath }: { filePath: string }) => {
      container?.classList.add("opacity-40");
      modalShortCut?.classList.remove("hidden");

      window.addEventListener(
        "keyup",
        (e) => {
          let keyA: "shift" | "alt" | "control" = "alt";
          if (e.shiftKey) {
            keyA = "shift";
          } else if (e.altKey) {
            keyA = "alt";
          } else if (e.ctrlKey) {
            keyA = "control";
          }

          const data = {
            filePath,
            keys: keyA,
            keyB: e.key,
          };
          eventIpc.sender.send("setKey", data);

          container?.classList.remove("opacity-40");
          modalShortCut?.classList.add("hidden");

          let keys: object[] = JSON.parse(localStorage.getItem("keys") || "[]");
          keys.push(data);
          localStorage.setItem("keys", JSON.stringify(keys));
        addShortCutToIndex()
          
        },
        {
          once: true,
        }
      );
    }
  );
});
