var express = require('express');
var app = express();
var users = require('users.js');

app.get('/', function(req, res){
  res.send('hello World');
})
app.get('/users', (req, res) => {
  res.send('Liste of all Users');
})
app.get('/users/:user', (req, res) => {
  res.send(req.params.user);
})

app.get('/*', (req, res) => {
  res.send('Home Page');
})

app.listen(5000, function(){
  console.log('Example app listening on port 5000!');
})
