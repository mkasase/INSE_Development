/*
  @Author Shaun Porter(770117)
*/

// Express and AJAX
var express = require("express");
var session = require("express-session");
var multer = require("multer");
var bodyParser = require("body-parser");
var mysql = require("mysql");
var fs = require("fs");
var sqlLogin = require("./SQLAuth").sqlLogin;
var app = express();
var upload = multer({dest: "./uploads/profile/"});

//Initalization
app.use(express.static(__dirname + "/pages"));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended:true, limit: '50mb'}));
app.use(session({
  secret: 'nurf this', // Encrption key TODO Concider storing seperate from main project
  resave: false,
  saveUninitialized: true,
  //cookie: {secure:true}
}));


/*---------------------------  REST Functions --------------------------- */

//Checks if there's a currently logged in user and sends back what user is logged in.
app.get("/user", function(req,res){
    //console.log(req.session.login_id);
  if(req.session.login_id == null){
    res.status(401).send("No user logged in.");
  }
  else{
    res.status(200).send(req.session.login_fName);
  }
});

/*
  Checks for a active login and if true will return additonal details about the user account
  @Session-Params
    login_id: Unique identifier for the currently logged in user
*/
app.get("/user/detail", function(req,res){
  var details
  if (req.session.login_id == null){ //Check to see if user is logged in
    details = {"user": "N/A", "email": "N/A", "phone": "NA"};
    res.status(401).send(details);
  }
  else{ // if true, the send a JSON file containing their details
    details = {"user": req.session.login_fName,"email": req.session.login_email, "phone": req.session.login_phone, "id": req.session.login_id}
    res.status(200).send(JSON.stringify(details));
  }
});

/*
  Destroys the current session of the active user and returns an error message if there's no user
  @Session-Params:
    login_id: Unique identifier for the currently logged in user
*/
app.get("/user/logout", function(req,res){
  if(req.session.login_id == null){
    res.status(400).send("No user logged in.");
  }
  else{
    req.session.destroy();
    res.status(200).send("User sucessfully logged out!");
  }
});

/*
  Start point for the login process.
  If credentals are correct a new session is initalized for their browser.
  If Invalid a 404 status is sent to the browser and is then handled.
  @Session-Params:
    name: The account name associated with the user
    pass: The password associated with the user
*/
app.post("/user/login", function(req, res){
  var connection = mysql.createConnection(sqlLogin);
  connection.query("SELECT * FROM `user` WHERE `email` = ?",[req.body.name], function(err,results,fields){
    if( results == undefined || results.length == 0 ){
      return res.status(404).send("ERROR: NO USER FOUND!");
    }
    for(i = 0;i < results.length;i++){
      if(results[i].password == req.body.pass){
        req.session.login_id = results[i].U_ID;
        req.session.login_fName = results[i].fName; //TODO loginid should be changed to loginName but as to not break other code
        req.session.login_phone = results[i].phoneNum;
        req.session.login_email = results[i].email;
        connection.end();
        res.send("Welcome " + req.session.login_fName);
      }
    }
  });
});

/*
  Registers a new user to the system.
  Requires a fully filled out request body that is then passed to "addUserToDatabase" for processing
  Returns a message to the client should the user be added to the system sucessfully
  @Session-Params:
    body: Requires a request body that is not empty.
*/
app.post("/user/register", function(req, res){
  addUserToDatabase(req.body);
  res.send(req.body.email + " was registered sucessfully.");
  res.end("done")
});

/*
  Grabs and sends a currently logged in users avatar.
  Returns error message if there is no active user
  @Session-Params:
    login_email: The account login and email for a user
*/
app.get("/user/img", function(req, res, next){
  if(req.session.login_email === undefined){
    console.log("Attempt to access user resource without login")
    return next();
  }
  var connection = mysql.createConnection(sqlLogin); //Establish connection to database
  connection.query("SELECT * FROM `user` WHERE `email` = ?",[req.session.login_email], function(err, results, fields){
    var imageURL = results[0].profile_ref; // Get the URL of the user's stored image
    if(imageURL == null){
      res.status(200).send("No Profile"); // If there is no image, then send a message back to client.
      connection.end();
    }
    else{
      connection.end();
      res.sendFile(__dirname + "/uploads/profile/" + imageURL);// send the image itself
    }
  })
});

/*
  Inserts an image into /uploads/profile/
  Posts image and query at /user/img/?q=<EMAIL GOES HERE>
  To be used in sync with GET "/user/img" to allow client to request images via their email
  @Session-Params:
    login_email: The account login and email for a user
*/
app.post("/user/img", upload.single("profile"), function(req, res, next){
  if(req.session.login_email === undefined){
    console.log("Attempt to upload file without login");
    return next();
  }

  var email = req.session.login_email;
  if(req.file == undefined){
    res.status(404).send("No file attached!")
    return next();
  }
  // Change multer filename to uploaded name
  fs.rename(__dirname + "/uploads/profile/" + req.file.filename, __dirname + "/uploads/profile/" + req.file.originalname);
  // Update user's reference to profile img
  var connection = mysql.createConnection(sqlLogin);
  connection.query("UPDATE user SET profile_ref = ? WHERE email = ?", [req.file.originalname, email])
  res.status(200).send(req.file.originalname + " posted and linked to " + email);
});

/*
  Gets event details from the event table
  @Session-Params:
    eventSearch: search for a event by its name. Returns Max 5 results
    eventID: Gets a single event via it's ID
*/
app.get("/event", function(req, res, next){
  var connection = mysql.createConnection(sqlLogin);
  if(req.query.eventSearch != undefined){
    connection.query("SELECT * FROM `event` WHERE `event_Name` LIKE ? LIMIT 5", ["%" + req.query.eventSearch + "%"], function(err, results, fields){
      res.send(results);
      return next();
    });
  }
  else if(req.query.eventID != undefined){
    connection.query("SELECT * FROM `event` WHERE E_ID = ?", [req.query.eventID], function(err,results, fields){
      res.send(results);
      return next();
    });
  }
  else{
    res.status(400).send("No query!!");
    return next();
  }
});

/*
Returns a JSON file of ticket details to the client
@Session-Params:
  id: Unique ID for the accosiated tickets
*/
app.get("/ticket", function(req,res,next){
  var connection = mysql.createConnection(sqlLogin);
  if(req.query.id){
    connection.query("SELECT * FROM `ticket` WHERE id = ?", [req.query.id], function(err, results, fields){
      if(err){
        throw err;
      }
      res.send(results);
      return next();
    });
  }
  else if(req.query.userid){
    connection.query("SELECT * FROM `ticket` WHERE user_id = ?", [req.query.userid], function(err, results, fields){
      if(err){
        throw err;
      }
      if(results.length != 0){
        res.send(results);
      }
      else{
        res.send("No results found");
      }
      return next()
    });
  }
  else{
    res.send("No id or user entered. Please try again with appropreate parameters.");
  }
  connection.end();
});

/*
  Sends the associated image of an event on request
  @Request-Params:
    q: The id for the ticket's URL
*/
app.get("/ticket/img", function(req,res,next){
  if(req.query.q){
    res.sendFile(__dirname + "/uploads/event/" + req.query.q);
  }
})

/*
  Creates a new ticket for a user to use for an event.
  @Session-Params:
    login_fName: Checked to ensure that there's an active session.
  @Request-Params:
    event_name: Name of event
    event_date: Date of event
    login_fname: Name of client
    login_id: Id of client
    event_img: URL of event image
*/
app.post("/ticket", function(req,res,next){
  if(req.session.login_fName){
    var connection = mysql.createConnection(sqlLogin);
    var ticket = {
      event_name: req.body.event_name,
      event_date: req.body.event_date,
      user_name: req.session.login_fName,
      user_id: req.session.login_id,
      event_img: req.body.event_img
    }

    connection.connect();
    connection.query("INSERT INTO ticket SET ?", {
      event_name: ticket.event_name,
      event_date: ticket.event_date,
      user_name: ticket.user_name,
      user_id: ticket.user_id,
      event_img: ticket.event_img}, function(err, result){
        if(err) throw err;
        res.send({
        msg:"Created!",
        id:result.insertId});
    });
  }
  else{
    res.status(400).send("Bad request, no active user");
  }

});

/*
  Adds a user to the local mysql database using A JSON varable containing key user details
*/
function addUserToDatabase(user){
  var connection = mysql.createConnection(sqlLogin);
  connection.connect(); // Establish connection
  connection.query("INSERT INTO user SET ?", { // Run Query
    fName: user.fName, // Query set values
    lName: user.lName,
    dob: user.date,
    address: user.address,
    email: user.email,
    phoneNum: user.phone,
    password: user.pass}, function(err,result){
    if (err) throw err; // if an error is encountered throw error
  });
  connection.end();// End Connection to database
}

// Check to see if valid database exists
function checkDatabase(){
  var connection = mysql.createConnection(sqlLogin);
  connection.connect(function(err){
    if(err){
      console.log("Database connection failed.");
      console.log("Troubleshoot:")
      console.log("1) Check your SQLAuth.js file.")
      console.log("2) Ensure a local database exists.");
      console.log("3) Check to see if the server has access. I.e create a bookit user.");
      console.log("4) Ensure fields are valid.");
      console.log("5) Ensure system allows node to access database.");
      process.exit();
    }
    else{
      console.log("Database connection established");
    }
  });
  connection.end();
}
// Start running the server on port 8080
app.listen(8080, function(){
  console.log("Server started");
  console.log("");
  checkDatabase();
});
