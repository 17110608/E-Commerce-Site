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

//General Session to redirect already logged users
let session = JSON.parse(sessionStorage.getItem("user"));
if (session && (except == "login" || except == "register")) {

    window.location = "../products";
}

//if session is not active and user visited cart and products page redirect him to login page
if (!session && (except == "cart" || except == "products")) {
    window.location = "../login";
}

//Checking the any active session
if (session) {
    let userName = session.fname + " " + session.lname;
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

    document.getElementById("new-user").innerHTML = "Email: " + email + "<br>" + "Mob: " + mob;
    document.getElementById("new-user").style = "word-wrap: break-word";
    document.getElementById("signup-btn").style = "display:none";
}

//Hamberg menu cancel icon function
cancel.onclick = noMenu;

//To show vertical navbar
function menu() {
    nav.classList.add("active");
}

//Removing the session if user clicks log-out button
function end_session() {
    sessionStorage.removeItem("user");
    window.location = "../login"
}

//Hiding the vertical navigation bar
function noMenu() {
    nav.removeEventListener("mouseout", menu);
    nav.classList.remove("active");
    // console.log("Menu event stopped");;
}

//Showing the login container if user hovers user icon
function show_login() {
    login_container.style = "display:block;";
}

//If navbar is available in page then run the following code
if (bar) {
    //Adding event listener to trigger the function on mouse hover
    bar.addEventListener("mouseover", function () {
        menu();
        if (login_container) {
            login_container.style = "display:none";
        }
        // console.log("Menu event registered");
    });
}

//If login1 user id or login2 user id is available in page then run the following code
if (login1 || login2) {
//Run if login1 id element is available in page
    if (login1) {
        //Adding event mousehover to show the login-container after hover
        login1.addEventListener("mouseover", function () {
            show_login();
            console.log("Login1 event registered");
        });
    }
//Run if login2 id element is available in page
//Works only for mobile width or mode
    if (login2) {
        //Adding event mousehover to show the login-container after hover
        login2.addEventListener("mouseover", function () {
            //Before that make sure navigation bar is not showing, otherwise elements collapse will happens
            //Getting navigation bar element style properties, initially i given style  right = -300px;
            //if it is not -300px then it is active, so created one function to hide that navigation bar and calling here
            var style = getComputedStyle(nav).right;
            if (style != "-300px") {
                //Calling the function to hide navigation bar
                noMenu();
                //    console.log(style);
            }
            show_login();
            // console.log("Login2 event registered");
        });
    }
}

//Created one event to hide the both navigation bar and login-containers if they are active
//Created one div with id hero, if user hovers mouse into that div, and any one of element is active or showing, we hiding that element
hero.addEventListener("mouseover", () => {
    console.log("Hero Div clicked");
    if (login1) {
        //for large screen user icon, removing the attached event, if it is active
        login1.removeEventListener("mouseover", show_login);
    }
     //for large screen user icon, removing the attached event, if it is active
    if (login2) {
        login2.removeEventListener("mouseover", show_login);
    }
    //Finally hiding the navigation bar menu (only for smaller screen)
    noMenu();

    //If user opend login-container then it should automatically close (I mean hiding) when he hovers hero div
    if (login_container) {
        login_container.style = "display:none;";
    }
});


//Database Coding starts from here
//URLSearchParams is the standard object inside the object we passing query parameters to filter the required data
const form = new URLSearchParams(window.location.search);

//Login process
if (form.get("submit") == "Login") {
    //Getting the field values using get method which is the method of that URLSearchParams
    let mob = form.get("mob");
    let pwd = form.get("pwd");

    //Checking with the local database to verify the user and here key value type database so we passing key as the number
    let check = localStorage.getItem(mob);
//if number present proceed
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

//Check the stored user password with present submit password both matching create session else through alert
        if (pwd == pwd1) {
            window.location.href = "products"
            //Using session Here 
            sessionStorage.setItem("user", JSON.stringify(session_user));
        } else {
            //Through invalid password alert
            alert("Invalid User Password");
            //redirecting because alfter alert user need to refresh page to submit login details again, instead of user we doing (Just like optional here)
            window.location.href = "login"
        }
    } else {
        //User not exist so through alert and redirect them to register page
        alert("User Not Exist");
        window.location.href = "register"
    }

}

//Register Process
if (form.get("submit") == "Register") {
    //Getting the user input fields
    let fname = form.get("fname");
    let lname = form.get("lname");
    let mob = form.get("mob");
    let email = form.get("email");
    let pwd = form.get("pwd");
//Creating the user details object to save it in local database
    let userData = {
        "fname": fname,
        "lname": lname,
        "mob": mob,
        "email": email,
        "pwd": pwd,
        "cart": "",
        "address": ""
    };
//This one for session purpose, we can use previous one also but there password also contains that will be not good practice
    let session_user = {
        "fname": fname,
        "lname": lname,
        "mob": mob,
        "email": email,
        "cart": "",
        "address": ""
    };
//Before that make user based on the user number no account is present
    let pre_check = localStorage.getItem(mob);
//If no account is there then create new one
    if (!pre_check) {
        //Saving user data
        localStorage.setItem(mob, JSON.stringify(userData));
        //Creating the session data to get data later on
        sessionStorage.setItem("user", JSON.stringify(session_user));
        //Also redirect user to products page
        window.location.href = "products"
    } else {
        //Through alert like account already present
        alert("User Already Exist, Please login");
        //Redirect him to login page, so he can login from login page
        window.location.href = "login"
    }

}