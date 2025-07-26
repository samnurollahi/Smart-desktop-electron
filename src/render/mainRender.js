const shortcatTitle = document.querySelector(".shortcatTitle"),
shortcatBox = document.querySelector(".shortcatBox");

shortcatTitle.addEventListener("click", () => {
    if( shortcatBox.style.height == "150px") {
        shortcatBox.style.height = "1px"
        shortcatTitle.lastElementChild.classList.add("fa-arrow-down")
        shortcatTitle.lastElementChild.classList.remove("fa-arrow-up")
    }else {
        shortcatBox.style.height = "150px"
        shortcatTitle.lastElementChild.classList.remove("fa-arrow-down")
        shortcatTitle.lastElementChild.classList.add("fa-arrow-up")
    }
})


window.addEventListener("keyup", (e) => {
    window.addEventListener("keyup", (ev) => {
        console.log(e.key + "+" + ev.key);
    })
})
window.removeEventListener