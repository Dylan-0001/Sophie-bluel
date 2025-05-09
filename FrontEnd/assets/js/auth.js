//Import class
import { RequestUtils } from './util/requestUtils.js';
import { Utils } from './util/utils.js';

//Protection already auth
if(Utils.isAuthenticated())
{
    window.location.href = 'http://127.0.0.1:5500/FrontEnd/';
}

//Form action Listener
const form = document.getElementById("login-form");
form.addEventListener("submit", async(event) => 
{
    event.preventDefault();
    
    const mail = document.getElementById("login-mail").value.trim();
    const password = document.getElementById("login-password").value.trim();

    if(!mail || !password)
    {
        const errorMessage = document.querySelector(".login-error");
        
        errorMessage.textContent = "Veuillez remplir tous les champs.";
        errorMessage.style.color = "red";
        return;
    }
    
    auth(mail, password);
});

//Function auth 
function auth(mail, password) 
{
    RequestUtils.sendAuth(mail, password)
        .then(response => {
            if (response.ok) 
            {
                authAction(response);
            }else 
            {
                const errorMessage = document.querySelector(".login-error");
                const error = Utils.userNotOK(response);
                
                errorMessage.textContent = error;
                errorMessage.style.color = "red";
            }
        })
        .catch(err => {
            console.error("Erreur dans auth:", err);
        });
}

//Function auth action
async function authAction(response)
{
    const data = await response.json();
    localStorage.setItem("token", data.token);

    window.location.href = 'http://127.0.0.1:5500/FrontEnd/';
}