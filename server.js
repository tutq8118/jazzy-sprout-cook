// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

// https://expressjs.com/en/starter/basic-routing.html
app.set("view engine", "pug");
app.set("views", "./views");

let tasks = ["Đi chợ", "Nấu cơm", "Rửa bát", "Code"];

app.get("/", (request, response) => {
  response.render('');
});

app.get("/todos", (request, response) => {
  var textSearch = request.query.q ? request.query.q : "";
  if (textSearch.length > 0) {
    var matchedTasks = tasks.filter(function(e) {
      return e.toLowerCase().indexOf(textSearch.toLowerCase()) !== -1;
    });
    response.render("todos/search", {
      matchedTasks
    });
  } else {
    response.render("todos/index", {
      tasks
    });
  }
});

app.post("/todos/create", (request, response) => {
  // console.log(request.body);
  var t = request.body.task;
  if (t) {
    tasks.push(t);
  }
  response.redirect('back');
});

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
