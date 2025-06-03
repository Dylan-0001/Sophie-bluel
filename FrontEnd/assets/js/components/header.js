//Import class
import {Utils} from './../util/utils.js';

//Declare login button
const loginButton = document.getElementById("login");

//Declare edit bar info
const editBar = document.getElementById("edition-mod");

//Change text to login/logout button & add edit bar info
loginButton.textContent = "login";
editBar.style.display = "none";

if(Utils.isAuthenticated())
{
    loginButton.textContent = "logout";
    editBar.style.display = "flex";
}

//Function for change login/logout click action
loginButton.addEventListener("click", () =>{

    if(Utils.isAuthenticated())
    {
        localStorage.removeItem("token");
        window.location.href = 'http://127.0.0.1:5500/';
    }
    else
    {
        window.location.href = 'http://127.0.0.1:5500/page/auth.html';
    }
});