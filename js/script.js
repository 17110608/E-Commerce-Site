const bar = document.getElementById("bar");
const nav = document.getElementById("navbar");
const cancel = document.getElementById("cancel");
const login1 = document.getElementById("login1");
const login2 = document.getElementById("login2");
const hero = document.getElementById("hero");
const login_container = document.getElementById("login-container");

//Adding basic js in every page beginning
let path = window.location.pathname;
let find = path.split("/");
let except = find.filter(String)[0];
let count = find.length - find.filter(String).length;
//Just adding script except main pages, blog and contact us 
if(count == 2 && (except != "blog" && except !="contact" && except !="register" && except !="login")){
let head = document.getElementsByTagName("head");
let script = document.createElement("script");
let content = `
let session = sessionStorage.getItem("user");
if(session){
let userName = session.fname + session.lname;
let email = session.email;
let cart = session.cart;
let mob = session.mob;
}else {
    window.location = "../index.html"
}
`;

//Addding Content
script.innerHTML = content;
document.write(head[0].appendChild(script));

}

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
        var style = getComputedStyle(nav).right;
        if (style != "-300px") {
            noMenu();
            //    console.log(style);
        }
        show_login();
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


//Database Coding starts from here
const form = new URLSearchParams(window.location.search);

//Login process
if (form.get("submit") == "Login") {
    let mob = form.get("mob");
    let pwd = form.get("pwd");

    let check = localStorage.getItem(mob);

    if (check) {
        let userData = JSON.parse(check);
        let fname = userData.fname;
        let lname = userData.lname;
        let pwd1 = userData.pwd;
        let cart = userData.cart;
        //Saving session
        let session_user = {
            "fname": fname,
            "lname": lname,
            "mob": mob,
            "email": email,
            "cart": cart,
        };

        if (pwd == pwd1) {
            window.location.href = "products"
            //Using session Here
            sessionStorage.setItem("user", JSON.stringify(session_user));
        } else {
            alert("Invalid User Password");
            window.location.href = "login"
        }
    } else {
        alert("User Not Exist");
        window.location.href = "register"
    }

}

//Register Process
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
        "cart": "",
    };

    let session_user = {
        "fname": fname,
        "lname": lname,
        "mob": mob,
        "email": email,
        "cart": "",
    };
    
    let pre_check = localStorage.getItem(mob);

    if (!pre_check) {
        //Saving user data
        localStorage.setItem(mob, JSON.stringify(userData));
        sessionStorage.setItem("user", JSON.stringify(session_user));
        window.location.href = "products"
    } else {
        alert("User Already Exist, Please login");
        window.location.href = "login"
    }

}
