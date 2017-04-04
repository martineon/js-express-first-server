var express = require('express');
var app = express();
app.use(express.static('public'));

app.get('/', function(req, res){
  res.render('homepage.ejs');
})

app.get('/about', function(req, res){
  res.render('about.ejs', {salutation: 'bonjour'});
})


app.get('/users', (req, res) => {
    let people = [{id: 0, firstName: 'Michel'}, {id: 1, firstName: 'Osman'}, {id: 2, firstName: 'Tandi'}, {id: 3, firstName: 'Daniel'}, {id: 4, firstName: 'Faustino'}, {id: 5, firstName: 'Ijacques'}];
    res.render('people.ejs', {people: people});
  });
    /*const TabName = user.map(item) =>{
                    return item.firstName
  })
  const TabName2 = TabName.join(',')
  res.send (TabeName2) */

/*
app.get('/users/:id', (req,res) =>{
  const user = users.find(item)=>{
    return item.id === Number(req.params.id)
  }}
 if(user){
 res.send(user.firstName)
}
else{
res.send('cette page nexiste pas ')
}
  */

app.get('/users/:user', function(req, res) {
    res.render('users.ejs', {user: req.params.user});
});



app.get('/*', (req, res) => {
  res.send('Home Page');
})

app.listen(5000, function(){
  console.log('Example app listening on port 5000!');
})
