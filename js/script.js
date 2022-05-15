const bar = document.getElementById("bar");
const nav = document.getElementById("navbar");
const cancel = document.getElementById("cancel");
const login1 = document.getElementById("login1");
const login2 = document.getElementById("login2");
const hero = document.getElementById("hero");
const login_container = document.getElementById("login-container");

cancel.onclick = noMenu;

function menu() {
    nav.classList.add("active");
}

function noMenu() {
    nav.removeEventListener("mouseout", menu);
    nav.classList.remove("active");
    console.log("Menu event stopped");;
}

function show_login() {
    login_container.style = "display:block;";
}


if (bar) {
    bar.addEventListener("mouseover", function () {
        menu();
        if (login_container) {
            login_container.style = "display:none";
        }
        console.log("Menu event registered");
    });
}

if (login1 || login2) {
    login1.addEventListener("mouseover", function () {
        show_login();
        console.log("Login1 event registered");
    });

    login2.addEventListener("mouseover", function () {
        show_login();
        console.log("Login2 event registered");
    });
}


hero.addEventListener("mouseover", () => {
    console.log("Hero Div clicked");
    if (login1) {
        login1.removeEventListener("click", show_login);
    }
    if (login2) {
        login2.removeEventListener("click", show_login);
    }
    noMenu();

    if (login_container) {
        login_container.style = "display:none;";
    }
});