import { ipcRenderer } from "electron";

window.addEventListener("DOMContentLoaded", () => {
  const addShortCut = document.getElementById("addShortCut"), // btn add
    container = document.getElementById("container"),
    modalShortCut = document.getElementById("modalShortCut"),
    boxShortCut = <HTMLElement>document.querySelector(".boxShortCut");

  function addShortCutToIndex() {
    boxShortCut.innerHTML = "";
    ipcRenderer.send("needData", null);
    ipcRenderer.on("data", (e, data) => {
      console.log(data);
      for (let key of data) {
        boxShortCut?.insertAdjacentHTML(
          "beforeend",
          `
                  <div
                    class="flex flex-row-reverse justify-between items-center px-2 pt-2"
                  >
                    <div class="flex items-center">
                      <p class="text-white">${key.keys}+${key.keyB}</p>
                      <i class="fa fa-close text-red-700 mr-2 border border-red-700 text-center rounded-md active:bg-red-700 active:text-white"></i>
                    </div>
                    <p class="text-blue-300">${key.filePath.slice(1, 7)}</p>
                  </div>    
              `
        );
      }

      const closes = Array.from(document.querySelectorAll(".fa-close"));
      closes.forEach((close) => {
        console.log(close.parentElement?.firstElementChild?.innerHTML);

        close.addEventListener("click", (event) => {
          let keys =
            close.parentElement?.firstElementChild?.innerHTML.split("+")[0] ||
            "";
          let keyB =
            close.parentElement?.firstElementChild?.innerHTML.split("+")[1] ||
            "";

          const obj: {
            keys: string;
            keyB: string;
          } = {
            keys,
            keyB,
          };

          ipcRenderer.send("removeShortCut", obj);
        });
      });
    });
  }
  addShortCutToIndex();

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

          // addShortCutToIndex();
        },
        {
          once: true,
        }
      );
    }
  );
  ipcRenderer.on("change", (e, data) => {
    boxShortCut.innerHTML = "";
    console.log(data);
    for (let key of data) {
      boxShortCut?.insertAdjacentHTML(
        "beforeend",
        `
                  <div
                    class="flex flex-row-reverse justify-between items-center px-2 pt-2"
                  >
                    <div class="flex items-center">
                      <p class="text-white">${key.keys}+${key.keyB}</p>
                      <i class="fa fa-close text-red-700 mr-2 border border-red-700 text-center rounded-md active:bg-red-700 active:text-white"></i>
                    </div>
                    <p class="text-blue-300">${key.filePath.slice(1, 7)}</p>
                  </div>    
              `
      );
    }

    const closes = Array.from(document.querySelectorAll(".fa-close"));
    closes.forEach((close) => {
      console.log(close.parentElement?.firstElementChild?.innerHTML);

      close.addEventListener("click", (event) => {
        let keys =
          close.parentElement?.firstElementChild?.innerHTML.split("+")[0] || "";
        let keyB =
          close.parentElement?.firstElementChild?.innerHTML.split("+")[1] || "";

        const obj: {
          keys: string;
          keyB: string;
        } = {
          keys,
          keyB,
        };

        ipcRenderer.send("removeShortCut", obj);
      });
    });
  });
  // ipcRenderer.on("removed", (e) => {
  //   addShortCutToIndex()
  // })
});
