/*
  @Author Shaun Porter(770117)
*/

function loginCheck(){
  var xhr = new XMLHttpRequest;
  var name = document.getElementById("log-user");
  var pass = document.getElementById("log-pass");
  var userDetails = {name: name.value, pass: pass.value};

  xhr.open("POST", "/user/login");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function(){
    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200){
      alert(xhr.responseText); //Login session is stablished via hidden cookie data. Setup server-side automaticlly.
      window.location = "/profile.html";
    }
    else if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 404){
      alert("Login and/or password was incorrect. Please try again.");
    }
  }
  //console.log(userDetails);
  xhr.send(JSON.stringify(userDetails));
}

document.getElementById("login").addEventListener("click", loginCheck);
