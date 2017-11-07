/*
  @Author Harry Westbrook(785080)
*/

var xhr = new XMLHttpRequest();

var searchButton = document.getElementById("search-button");

/*
* Assign HTML elements for search results based on data
* received from the database.
*/
function getSearchResults(){

  /*
  * Create variables referencing to page objects
  */
  var eventSearch = document.getElementById("search-large").value;
  var searchDisplay = document.getElementById("searched");

  var searchresult1 = document.getElementById("search-result1");
  var eventID1;
  var img1 = document.getElementById("event-img1");
  var title1 = document.getElementById("search-title1");
  var desc1 = document.getElementById("search-desc1");

  var searchresult2 = document.getElementById("search-result2");
  var eventID2;
  var img2 = document.getElementById("event-img2");
  var title2 = document.getElementById("search-title2");
  var desc2 = document.getElementById("search-desc2");

  var searchresult3 = document.getElementById("search-result3");
  var eventID3;
  var img3 = document.getElementById("event-img3");
  var title3 = document.getElementById("search-title3");
  var desc3 = document.getElementById("search-desc3");

  var searchresult4 = document.getElementById("search-result4");
  var eventID4;
  var img4 = document.getElementById("event-img4");
  var title4 = document.getElementById("search-title4");
  var desc4 = document.getElementById("search-desc4");

  var searchresult5 = document.getElementById("search-result5");
  var eventID5;
  var img5 = document.getElementById("event-img5");
  var title5 = document.getElementById("search-title5");
  var desc5 = document.getElementById("search-desc5");

  xhr.open("GET", "/event?eventSearch=" + eventSearch);
  xhr.onreadystatechange = function(){
    if(xhr.readyState == XMLHttpRequest.DONE){
      if(xhr.status == 200){ // Populate elements if valid

        var eventJSON = xhr.responseText;
        var eventData = JSON.parse(xhr.responseText);
        console.log(eventData);


      //if successful populate HTML elements with data.
      if(eventData != null){

        if(eventSearch == null || eventSearch == ""){
          searchDisplay.innerText == "Alphabetically"
        }
        else{
          searchDisplay.innerText = eventSearch;
        }


        //assign data received to first event shown
        if(eventData[0] != null){
          if(eventData[0].image != null){
            img1.setAttribute("src", "../ticket/img?q=" + eventData[0].image);
          }

          else if(eventData[0].image = null){
            img1.setAttribute("src", "../img/eventplaceholder.jpg");
          }

          title1.innerText = eventData[0].event_Name;
          desc1.innerText = eventData[0].descrp;

          eventID1 = eventData[0].E_ID;

          searchresult1.addEventListener("click", function(){
            goToEvent(eventID1)
          });
        }

        //remove if no data returned
        else if(eventData[0] = null){
          img1.style.display = "none";
          title1.style.display = "none";
          desc1.style.display = "none";
        }

        //assign data received to second event shown
        if(eventData[1] !=null){
          if(eventData[1].image != null){
            img2.setAttribute("src", "../ticket/img?q=" + eventData[1].image);
          }

          else if(eventData[1].image = null){
            img2.setAttribute("src", "../img/eventplaceholder.jpg");
          }

          title2.innerText = eventData[1].event_Name;
          desc2.innerText = eventData[1].descrp;

          eventID2 = eventData[1].E_ID;

          searchresult2.addEventListener("click", function(){
            goToEvent(eventID2)
          });
        }

        //remove if no data returned
        else if(eventData[1] = null){
          img2.style.display = "none";
          title2.style.display = "none";
          desc2.style.display = "none";
        }


        //assign data received to third event shown
        if(eventData[2] != null){
          if(eventData[2].image != null){
            img3.setAttribute("src", "../ticket/img?q=" + eventData[2].image);
          }

          else if(eventData[2].image = null){
            img3.setAttribute("src", "../img/eventplaceholder.jpg");
          }

          title3.innerText = eventData[2].event_Name;
          desc3.innerText = eventData[2].descrp;

          eventID3 = eventData[2].E_ID;

          searchresult3.addEventListener("click", function(){
            goToEvent(eventID3)
          });
        }

        //remove if no data returned
        else if(eventData[2] = null){
          img3.style.display = "none";
          title3.style.display = "none";
          desc3.style.display = "none";
        }

        //assign data received to fourth event shown
        if(eventData[3] != null){
          if(eventData[3].image != null){
            img4.setAttribute("src", "../ticket/img?q=" + eventData[3].image);
          }

          else if(eventData[3].image = null){
            img4.setAttribute("src", "../img/eventplaceholder.jpg");
          }

          title4.innerText = eventData[3].event_Name;
          desc4.innerText = eventData[3].descrp;

          eventID4 = eventData[3].E_ID;

          searchresult4.addEventListener("click", function(){
            goToEvent(eventID4)
          });
        }

        //remove if no data returned
        else if(eventData[3] = null){
          img4.style.display = "none";
          title4.style.display = "none";
          desc4.style.display = "none";
        }

        //assign data received to fifth event shown
        if(eventData[4] != null){

          if(eventData[4].image != null){
            img5.setAttribute("src", "../ticket/img?q=" + eventData[4].image);
          }

          else if(eventData[4].image = null){
            img5.setAttribute("src", "../img/eventplaceholder.jpg");
          }

          title5.innerText = eventData[4].event_Name;
          desc5.innerText = eventData[4].descrp;

          eventID5 = eventData[4].E_ID;

          searchresult5.addEventListener("click", function(){
            goToEvent(eventID5)
          });
        }

        //remove if no data returned
        else if(eventData[4] = null){
          img5.style.display = "none";
          title5.style.display = "none";
          desc5.style.display = "none";
        }
      }

      //if not successful remove HTML elements.
      else if(eventData = null){
         var searchResultsParent = getElementById("search-result");

         searchResultsParent.style.display = "none";
      }
    }

      else(xhr.status == 401){
        var searchResultsParent = getElementById("search-result");
        searchDisplay.innerText = "No events found!";

        searchResultsParent.removeChild(img1);
        searchResultsParent.removeChild(title1);
        searchResultsParent.removeChild(desc1);

        searchResultsParent.removeChild(img2);
        searchResultsParent.removeChild(title2);
        searchResultsParent.removeChild(desc2);

        searchResultsParent.removeChild(img3);
        searchResultsParent.removeChild(title3);
        searchResultsParent.removeChild(desc3);

        searchResultsParent.removeChild(img4);
        searchResultsParent.removeChild(title4);
        searchResultsParent.removeChild(desc4);

        searchResultsParent.removeChild(img5);
        searchResultsParent.removeChild(title5);
        searchResultsParent.removeChild(desc5);
      }
    }
  }
  xhr.send(null);
}

//on click of seach result go to that results event page.
function goToEvent(eventID){
  window.location = "../event.html?eventID=" + eventID;
}

//check to see if the search bar has anything in it.
function checkSearchBar(){
  var searchBar = document.getElementById("search-large").value;
  //if yes run search function.
  if (searchBar != ""){
    getSearchResults();
    console.log("YES")
  }
  //if no don't run search functions.
  else{
    alert("Please enter a search query")
    console.log("NO");
  }
}

//on click of search button show search results.
searchButton.addEventListener("click", checkSearchBar);

//on load of page get search results for whatever is in search bar.
window.addEventListener("load", getSearchResults);
