const bar = document.getElementById("bar");
const nav = document.getElementById("navbar");
const cancel = document.getElementById("cancel");
const login1 = document.getElementById("login1");
const login2 = document.getElementById("login2");
const hero = document.getElementById("hero");
const login_container = document.getElementById("login-container");
const blink = document.getElementById("button1");


window.onload = hoverEffect;

//Adding basic js in every page beginning
let path = window.location.pathname;
let find = path.split("/");
let except = find.filter(String)[0];
let count = find.length - find.filter(String).length;
//Just adding script except main pages, blog, login, register and contact us 
if (count == 2 && (except != "blog" && except != "contact" && except != "register" && except != "login")) {
    // Creating Script to head
    let head = document.getElementsByTagName("head");
    let script = document.createElement("script");
    let content = `
let session = JSON.parse(sessionStorage.getItem("user"));
if(session){
let userName = session.fname +" "+ session.lname;
let email = session.email;
let cart = session.cart;
let mob = session.mob;
let address = session.address;

//Modifying the login-container DOM
log_btn = document.getElementById("login-btn");
log_btn.innerHTML = "Log Out";
log_btn.onclick = end_session

log_title = document.getElementById("ac-details");
log_title.innerHTML = "Hi, " + userName;

//Large size screen
// let icon = document.getElementById("uname1").innerHTML;
// document.getElementById("uname1").innerHTML = icon + " " + session.fname;
// Smaller size screen
// let icon2 = document.getElementById("uname2").innerHTML;
// document.getElementById("uname2").innerHTML = icon2 + " " + session.fname;

//Hiding few element from login-container
document.getElementById("new-user").innerHTML = "Email: " + email +"<br>"+"Mob: " + mob;
document.getElementById("new-user").style = "word-wrap: break-word";
document.getElementById("signup-btn").style = "display:none";

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

function end_session() {
    sessionStorage.removeItem("user");
    window.location = "../login"
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

    if (login1) {
        login1.addEventListener("mouseover", function () {
            show_login();
            console.log("Login1 event registered");
        });
    }

    if (login2) {
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

function hoverEffect() {
    //console.log("Working");
    var blink_speed = 1000; // every 1000 == 1 second, adjust to suit
    var t = setInterval(function () {
        var ele = document.getElementById('button1');
        ele.style.visibility = (ele.style.visibility == 'hidden' ? '' : 'hidden');
        var ele1 = document.getElementById('off');
        ele1.style.visibility = (ele1.style.visibility == 'hidden' ? '' : 'hidden');
    }, blink_speed);

    
}

//For slider
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

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
        let email = userData.email;
        let mob = userData.mob;
        let pwd1 = userData.pwd;
        let cart = userData.cart;
        let address = userData.address;

        //Saving session
        let session_user = {
            "fname": fname,
            "lname": lname,
            "mob": mob,
            "email": email,
            "cart": cart,
            "address": address
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
        "address": ""
    };

    let session_user = {
        "fname": fname,
        "lname": lname,
        "mob": mob,
        "email": email,
        "cart": "",
        "address": ""
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