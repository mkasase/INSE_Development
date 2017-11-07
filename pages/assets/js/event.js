/*
  @Author Shaun Porter(770117)
*/

var xhr = new XMLHttpRequest();
var eventID = window.location.search.substring(1);
var profileData;
/*
  Populate the HTML objects with details from server API
*/
function getEventPage(){
  // Create references to page objects
  var titleEle = document.getElementById("event_heading");
  var descrpEle = document.getElementById("event_description");
  var capacityEle = document.getElementById("event_capacity");
  var locationEle = document.getElementById("event_location");
  var imageEle = document.getElementById("event_image_selector");

  xhr.open("GET", "/event?" + eventID);
  xhr.onreadystatechange = function(){
    if(xhr.readyState == XMLHttpRequest.DONE){
      if(xhr.status == 200){ // Populate elements if valid
        profileData = JSON.parse(xhr.responseText)[0]
        titleEle.innerText = profileData.event_Name;
        descrpEle.innerText = profileData.descrp;
        capacityEle.innerText = profileData.capacity;
        locationEle.innerText = profileData.location;
        if(profileData.image != null){ // Keep image to placeholder if no image exists
          imageEle.setAttribute("src","../ticket/img?q=" + profileData.image);
        }

      } // If an error has occoured
      else if(xhr.status == 401){
        titleEle.innerText = "No event here!";
        descrpEle.innerText = "";
        capacityEle.innerText = "";
      }
    }
  }
  xhr.send(null);
}

/*
  Retrieve details from page and send them to the API to generate a ticket.
*/
function getTicket(){
  var xhr = new XMLHttpRequest();
  var ticket = { // Get details from page and create a ticket object
    event_name: profileData.event_Name,
    event_date: profileData.eDate,
    event_img: profileData.image
  }
  xhr.open("POST","/ticket");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function(){
    if(xhr.readyState === XMLHttpRequest.DONE){
      if(xhr.status === 200){
        window.location = "../ticket.html?id=" + JSON.parse(xhr.responseText).id; // On ticket creation, redirect to ticket.
      }
    }
  }
  xhr.send(JSON.stringify(ticket)); // Send ticket details.
}

document.getElementById("event_heading").addEventListener("click",getTicket);
window.addEventListener("load", getEventPage);
