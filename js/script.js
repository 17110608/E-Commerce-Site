const bar = document.getElementById("bar");
const nav = document.getElementById("navbar");
const cancel  = document.getElementById("cancel");

cancel.onclick = noMenu;

function menu() {
    nav.classList.add("active");
}

function noMenu() {
    nav.removeEventListener("mouseout", menu);
    nav.classList.remove("active");
    console.log("Menu event stopped");;
}


if (bar) {
    bar.addEventListener("click", function () {
        menu();
        console.log("Menu event registered");
    });
}