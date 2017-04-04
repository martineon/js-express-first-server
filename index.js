var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.send('hello World');
})
app.get('/users', (req, res) => {
    let people = [{id: 0, firstName: 'Michel'}, {id: 1, firstName: 'Osman'}, {id: 2, firstName: 'Tandi'}, {id: 3, firstName: 'Daniel'}, {id: 4, firstName: 'Faustino'}, {id: 5, firstName: 'Ijacques'}];
    res.render('people.ejs', {people: people});
});

app.get('/users/:user', function(req, res) {
    res.render('users.ejs', {user: req.params.user});
});



app.get('/*', (req, res) => {
  res.send('Home Page');
})

app.listen(5000, function(){
  console.log('Example app listening on port 5000!');
})
