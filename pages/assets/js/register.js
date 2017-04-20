/*
  @Author Shaun Porter(770117)
*/
var xhr = new XMLHttpRequest();

/*
Retreves the user details and applies validation on them.
If valid will pass data to the server to register the user.

Server:
  Peforms POST on /user/register to create a new user
*/
function registerUser(){
  // Retreve HTML object reference.
  var fName = document.getElementById("reg-fname").value; // reference only value as that's all we need.
  var lName = document.getElementById("reg-lname").value;
  var date = document.getElementById("reg-date").value;
  var address = document.getElementById("reg-address").value;
  var city = document.getElementById("reg-city").value;
  var postcode = document.getElementById("reg-postcode").value;
  var email = document.getElementById("reg-email").value;
  var phone = document.getElementById("reg-phone").value;
  var pass = document.getElementById("reg-pass").value;
  var passCheck = document.getElementById("reg-passcheck").value;

  // Check to ensure all fields are filled.
  if(pass == "" || passCheck == "" || fName == "" || lName == "" || date == "" || address == "" || city == "" || postcode == "" || email == "" || phone == ""){
    alert("Please fill all fields");
    pass = "";
    passCheck = "";
  } // Compare password boxes and ensure user fills them out.
  else if(pass != passCheck){
    alert("Passwords do not match");
    pass = "";
    passCheck = "";
  }
  else{ // If valid, build a JSON objects with user details
    var user = {
    "fName": fName,
    "lName": lName,
    "date": date,
    "address": address,
    "city": city,
    "postcode": postcode,
    "email": email,
    "phone": phone,
    "pass": pass,
    "passCheck": passCheck}
    xhr.open("POST", "/user/register");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(user)); // Send the user JSON to the server for user creation
 }

// Notify the user that they've been registered
 xhr.onreadystatechange = function(){
   if(xhr.readyState == XMLHttpRequest.DONE){
     alert(xhr.responseText);
   }
 }

}
// Run registerUser function on click of the register button.
document.getElementById("register").addEventListener("click",registerUser);
