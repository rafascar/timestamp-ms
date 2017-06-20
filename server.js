// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.get("/:date", function (request, response) {
  response.send(getTimestamp(request.params.date))
});

function getTimestamp(date) {
  var unix = Number(date);
  var natural = new Date(date);
  
  // If its a number (unix), convert to natural language
  if(!isNaN(unix)) {
    natural = new Date(unix*1000).toUTCString();
  }
  // If its a string, check for natural language
  else if(new Date(natural) != "Invalid Date") {
    unix = new Date(natural).getTime() / 1000;
    natural = new Date(natural).toUTCString();
  }
  // If its not a valid date, return object with null
  else {
    unix = null;
    natural = null;
  }
   
  return {
    unix: unix,
    natural: natural
  }
}