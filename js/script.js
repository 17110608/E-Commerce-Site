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
    // console.log("Menu event stopped");;
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
        // console.log("Menu event registered");
    });
}

if (login1 || login2) {

    login1.addEventListener("mouseover", function () {
        show_login();
        console.log("Login1 event registered");
    });

    login2.addEventListener("mouseover", function () {
        show_login();
        var style = getComputedStyle(nav).right;
        if (style != "-300px") {
            noMenu();
            //    console.log(style);
        }
        // console.log("Login2 event registered");
    });
}


hero.addEventListener("mouseover", () => {
    console.log("Hero Div clicked");
    if (login1) {
        login1.removeEventListener("mouseover", show_login);
    }
    if (login2) {
        login2.removeEventListener("mouseover", show_login);
    }
    noMenu();

    if (login_container) {
        login_container.style = "display:none;";
    }
});


const form = new URLSearchParams(window.location.search);

if (form.get("submit") == "Login") {
    let mob = form.get("mob");
    let pwd = form.get("pwd");

    let check = localStorage.getItem(mob);

    if (check) {
        let userData = JSON.parse(check);
        let pwd1 = userData.pwd;
        if (pwd == pwd1) {
            window.location.href = "products"
        } else {
            alert("Invalid User Password");
            window.location.href = "login"
        }
    } else {
        alert("User Not Exist");
        window.location.href = "register"
    }

}

if (form.get("submit") == "Register") {
    let fname = form.get("fname");
    let lname = form.get("lname");
    let mob = form.get("mob");
    let email = form.get("email");
    let pwd = form.get("pwd");

    let userData = {
        "fname": fname,
        "lname": lname,
        "mob": mob,
        "email": email,
        "pwd": pwd,
        "products": "",
    }
    let pre_check = localStorage.getItem(mob);

    if (!pre_check) {
        //Saving user data
        localStorage.setItem(mob, JSON.stringify(userData));
    } else {
        alert("User Already Exist, Please login");
        window.location.href = "login"
    }

}