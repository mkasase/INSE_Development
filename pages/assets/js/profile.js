/*
  @Author Shaun Porter(770117)
*/
var profileData; // Create global reference to the users details

/*
 Will check if users are currently logged in and if they are it'll update the profile with their infomation
 Otherwise if it finds that there's no active login session it'll redirect the user to the login page.
*/
function getUserProfile(){
  var xhr = new XMLHttpRequest();
  var nameEle = document.getElementById("profile-name");
  var emailEle = document.getElementById("profile-email");
  var imgEle = document.getElementById("profile_image");

  xhr.open("GET", "/user/detail");
  xhr.onreadystatechange = function(){
    if(xhr.readyState == XMLHttpRequest.DONE){
      if(xhr.status == 200){ // If request was sucessfully made
        profileData = JSON.parse(xhr.responseText);
        nameEle.innerText = profileData.user; // Update profile elements
        emailEle.innerText = profileData.email;
        imgEle.setAttribute("src","../user/img")
        getUserTickets(); // After populating user details, populate
      }
      else if(xhr.status == 401){ // If the user is not logged in they'll be redirected to the login page
        window.location = "./login.html";
      }
    }
  }
  xhr.send(null);
}

/*
  Retreve the appropreate user image from the server
  and show it on user profile.
*/
function getUserImage(){
  var xhr = new XMLHttpRequest();
  var profile_image = document.getElementById('profile_image');

  xhr.open("GET", "/user/img");
  xhr.onreadystatechange = function(){
    if(xhr.readyState == XMLHttpRequest.DONE){
      if(xhr.status == 404){
        console.log("No image found!");
      }
      else if(xhr.status == 200){
        var imageSource = JSON.parse(xhr.responseText);
        profile_image.setAttribute("src", imageSource); // redirect image source to API url that serves image
      }
    }
  }
  xhr.send(null);
}

/*
  Retreve a list of tickets for the user and populate a list of their tickets.
*/
function getUserTickets(){
  var xhr = new XMLHttpRequest();
  var ticketList = document.getElementById("ticket-list");
  xhr.open("GET", "/ticket?userid=" + profileData.id);
  xhr.onreadystatechange = function(){
    if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200){
      var tickets = JSON.parse(xhr.responseText);

      for(i = 0;tickets.length > i;i++){ // Create a list of list elements and insert into list.
        var li = document.createElement("li");
        li.innerText = tickets[i].event_name;
        li.setAttribute("ticketid",tickets[i].id);
        li.onclick = function(){
          window.location.href = "../ticket.html?id=" + this.getAttribute("ticketid"); // set ticket to redirect to actual ticket
        }
        ticketList.appendChild(li); // add list element to list.
      }
    }
  }
  xhr.send()
}
window.addEventListener("load", getUserProfile);
