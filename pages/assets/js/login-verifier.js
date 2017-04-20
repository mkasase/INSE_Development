/*
  @Author Shaun Porter(770117)
*/

// Will show who's currently logged in
function getLoginDetails(){
  var xhr = new XMLHttpRequest();
  var loginEle = document.getElementById("user-display");
  //console.log("Getting user detials");
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

function logoutUser(){
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/user/logout");
  xhr.onreadystatechange = function(){
    if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200){
      alert(xhr.responseText);
      document.location.reload();
    }
  }
  xhr.send();
}

document.getElementById("logout").addEventListener("click", logoutUser);
window.addEventListener("load", getLoginDetails);
