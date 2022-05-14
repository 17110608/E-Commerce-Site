const bar = document.getElementById("bar");
const nav = document.getElementById("navbar");

function menu() {
    nav.classList.add("active");
    const cart = document.getElementById("cart");
    const login = document.getElementById("login");

    const ci = cart.innerHTML;
    cart.innerHTML = ci + " Cart";
    cart.style.fontWeight = "bold";

    const li = login.innerHTML;
    login.innerHTML = li + " Login";
    login.style.fontWeight = "bold";
}

function noMenu() {
    nav.removeEventListener("mouseout", menu);
    nav.classList.remove("active");
    console.log("Menu event stopped");
}

if (bar) {
    bar.addEventListener("click", function () {
        menu();
        console.log("Menu event registered");
    });
}