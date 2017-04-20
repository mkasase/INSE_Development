/*
  @Author Shaun Porter(770117)
*/


/*
  Constructs ticket details using data from a server request.
  Tickets are unique and only ones that have been previously made may be accessed.

  Server:
    Peforms GET request on /ticket for ticket details
    Peforms GET request on /ticket/img for ticket image files
*/
function buildTicket(){
  xhr = new XMLHttpRequest(); // Create XMLHttpRequest instance
  var id = getQueryVariable("id"); // Get ticket ID
  var eventName = document.getElementById("event-name"); // Build reference to HTML objects
  var eventDate = document.getElementById("event-date");
  var eventPerson = document.getElementById("event-username");
  var eventImage = document.getElementById("event-img");

  xhr.open("GET","/ticket?id=" + id); // Establish request type
  xhr.onreadystatechange = function(){ // Create function for request end.
    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200){
      var ticket = JSON.parse(xhr.responseText)[0];
      eventName.innerText = ticket.event_name; // Populate html elements
      eventDate.innerText = ticket.event_date;
      eventPerson.innerText = ticket.user_name;
      if(ticket.event_img != null){ // If no ticket id is found, default image is used.
        eventImage.setAttribute("src","../ticket/img?q=" + ticket.event_img); // Get ticket image relevent to ticket id.
      }
    }
  }
  xhr.send(); // Start request
}

/*
  Retreves a varable from the URL to be used as a regular value
  @Param Value from URL to be retreved
*/
function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

// Once DOM is built then start JavaScript functions
window.onload = function(){
  buildTicket();
}
