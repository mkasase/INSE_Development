# INSE_Development
Location for INSE Development UoP 2nd Year 16/17.

# Installation

## Prerequisites
Browser (Chrome, firefox, Edge): 
  https://www.google.com/chrome/
NodeJS: 
  https://nodejs.org/en/download/
MySQL (XAMPP for windows machines): 
  Win: https://www.apachefriends.org/download.html
  Linux: "sudo apt-get install mysql-server"

### Database Setup

1) Run your local mysql service.
2) Paste the contents of /temp/Database.sql to create the approprate tables
3) Create a new user for mysql with the following details.
  host: "localhost",
  user: "root",
  password: "AppleBees1121@@@",
  database: "bookit"

### Client-Server Setup

1) cd to respective directory and run "npm install"
2) run "npm start"
3) Service should start running.
