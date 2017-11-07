/*
  @Author Shaun Porter(770117)
*/

/*
  Retreves data from page to be used for a client login.
  After login has passed then a session is created server-side
*/
function loginCheck(){
  var xhr = new XMLHttpRequest;
  var name = document.getElementById("log-user"); // Create references to HTML objects
  var pass = document.getElementById("log-pass");
  var userDetails = {name: name.value, pass: pass.value};

  xhr.open("POST", "/user/login");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function(){
    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200){
      alert(xhr.responseText); //Login session is stablished via hidden cookie data. Setup server-side automaticlly.
      window.location = "/profile.html"; // redirect to login page
    }
    else if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 404){
      alert("Login and/or password was incorrect. Please try again."); // If login didn't work then send a message and let them try again
    }
  }
  //console.log(userDetails);
  xhr.send(JSON.stringify(userDetails));
}

document.getElementById("login").addEventListener("click", loginCheck);
