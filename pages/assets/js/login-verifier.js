/*
  @Author Shaun Porter(770117)
*/

/*
  Retreves login details from cookies to be used by the client
*/
function getLoginDetails(){
  var xhr = new XMLHttpRequest();
  var loginEle = document.getElementById("user-display");

  xhr.open("GET", "/user");
  xhr.onreadystatechange = function(){
    if(xhr.readyState = XMLHttpRequest.DONE){
      if(xhr.status == 200){
        var response = xhr.responseText;
        loginEle.innerHTML = response;
      }
      else if(xhr.status == 401){
        loginEle.innerText = "Login"
      }
    }
  }
  xhr.send();
}

/*
  Send a request to the server to destory the session data for this active user
*/
function logoutUser(){
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/user/logout");
  xhr.onreadystatechange = function(){
    if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200){
      alert(xhr.responseText); // If user was logged out then send alert
      document.location.reload(); // Refreshes the page to update session for page
    }
  }
  xhr.send();
}

document.getElementById("logout").addEventListener("click", logoutUser);
window.addEventListener("load", getLoginDetails);
