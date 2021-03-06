//  Name: Ryan Fleury
//  Due Date: 5/4/2022
//  Web Server Development 

//  Honor Code:
//  "I have neither given nor received unauthorized aid in completing this work, nor have I presented someone else's work as my own."
    


//Creation of cookie content for the website.
//refrences: 
//https://dev.to/michaelburrows/display-a-message-to-returning-visitors-using-a-javascript-cookie-21d7
//https://www.codexworld.com/cookie-consent-popup-with-javascript/
//ref https://fullstackheroes.com/tutorials/javascript/cookie-policy-popup/ 


// //function to make a new cookie if the one has not been made for the user.
function setCookie(userCookieName) 
{
    const userCookieValue = "returningVisitor";
    const userCookieDays = 7;
    let expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + userCookieDays);
    document.cookie = userCookieValue + "=" + userCookieName +"; expires=" + expiryDate.toGMTString() + "path=/"; 
}

// Delete cookie after it has been made
function deleteCookie(userCookieName) 
{
    const userCookieDays = 7;
    let expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + userCookieDays);
    document.cookie = userCookieName + "=;" + expiryDate.toGMTString() + ";path=/";
}


// Read cookie name data
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

//check for retruning visitor
document.addEventListener("DOMContentLoaded", function () 
{
const userCookieName = "returningVisitor"; //check for returning visitor stored in the cookie
checkUserCookie(userCookieName);});

//will welcome the user back if they have been to the website before.
function checkUserCookie(userCookieName) 
{
    
    const regEx = new RegExp(userCookieName, "g");  //g (global match) new RegExp
    const cookieExists = document.cookie.match(regEx);//matching cookie
    if (cookieExists != null) //if there is cookie data
        {
            //insert html to welcom the user back to my website
            let user = getCookie("returningVisitor");
            document.body.insertAdjacentHTML(
            "beforeend",
            '<div id="returningUser"><h3>Welcome back to my website <span id = "name"> </span>!</h3><button class="close" onclick="closeReturningUser();">Close</button> </div>',
            );
            // ref: https://stackoverflow.com/questions/30035932/how-do-i-use-this-javascript-variable-in-html#:~:text=You%20cannot%20use%20js%20variables,existing%20tags%20in%20the%20html.
            document.getElementById("name").innerHTML = user;
            document.getElementById("cookieNotice").style.display = "none";
        }
    else{
        document.getElementById("cookieNotice").style.display = "shown";
    }   
}

//Cookie consent accept function
function acceptCookieConsent(){
    //deleteCookie('user_cookie_consent');
    user = prompt("Please enter your name for cookie consent:", "");
    setCookie(user, 1, 30);
    document.getElementById("cookieNotice").style.display = "none"; //disable show for the cookie popus
}

function declineCookieConsent(){
    //deleteCookie('user_cookie_consent');
    document.getElementById("cookieNotice").style.display = "none"; //disable show for the cookie popus
}

function closeReturningUser(){
    document.getElementById("returningUser").style.display = "none";  //store that the user has been on the website before
}

           
        