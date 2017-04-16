//TODO Prehaps split script and have it load before the DOM to avoid the user seeing the profile page and then having them redirected to login?


var xhr = new XMLHttpRequest();
var profileData;

/*
 Will check if users are currently logged in and if they are it'll update the profile with their infomation
 Otherwise if it finds that there's no active login session it'll redirect the user to the login page.
*/
function getUserProfile(){
  var nameEle = document.getElementById("profile-name");
  var emailEle = document.getElementById("profile-email");
  var imgEle = document.getElementById("profile_image");

  xhr.open("GET", "/user/detail");
  xhr.onreadystatechange = function(){
    if(xhr.readyState == XMLHttpRequest.DONE){ //TODO replace all (xhr.readystate && xhr.statusCode) with this new format
      console.log("Ready!");
      if(xhr.status == 200){
        console.log("Ready to update profile!");
        profileData = JSON.parse(xhr.responseText);

        nameEle.innerText = profileData.user;
        emailEle.innerText = profileData.email;
        imgEle.setAttribute("src","../user/img")
        getUserTickets();
      }
      else if(xhr.status == 401){ // If the user is not logged in they'll be redirected to the login page
        window.location = "./login.html";
      }
    }
  }
  xhr.send(null);
}

function getUserImage(){
  var profile_image = document.getElementById('profile_image');

  xhr.open("GET", "/user/img");
  xhr.onreadystatechange = function(){
    if(xhr.readyState == XMLHttpRequest.DONE){
      console.log("Ready!");
      if(xhr.status == 404){
        console.log("No image here bruh");
      }
      else if(xhr.status == 200){
        console.log("Ready to update image!");
        var imageSource = JSON.parse(xhr.responseText);

        profile_image.setAttribute("src", imageSource);
      }
    }
  }
  xhr.send(null);
}

function getUserTickets(){
  var xhr = new XMLHttpRequest();
  var ticketList = document.getElementById("ticket-list");
  console.log(profileData.user);
  xhr.open("GET", "/ticket?userid=" + profileData.id);
  xhr.onreadystatechange = function(){
    if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200){
      var tickets = JSON.parse(xhr.responseText);

      for(i = 0;tickets.length > i;i++){
        var li = document.createElement("li");
        li.innerText = tickets[i].event_name;
        li.setAttribute("ticketid",tickets[i].id);
        li.onclick = function(){
          window.location.href = "../ticket.html?id=" + this.getAttribute("ticketid");
        }
        ticketList.appendChild(li);
      }

    }
  }

  xhr.send()
}
window.addEventListener("load", getUserProfile);
