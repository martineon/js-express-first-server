var express = require('express');
var app = express();
const people = require('./data/users.js');
const project = require('./data/project.js');
app.use(express.static('public'));

app.get('/', function(req, res){
  res.render('homepage.ejs');
});

app.get('/users', (req, res) => {
    res.render('people.ejs', {people: people});

  });

app.get('/project', (req, res) =>{
  res.render('Project.ejs', {project: project});
});


  app.get('/about', function(req, res){
    res.render('about.ejs', {salutation: 'bonjour'});
  });
  /*
    const TabName = user.map(item) =>{
                    return item.firstName
  })
  const TabName = TabName.join(',')
  res.send (TabeName)
  */

  app.get('/project/:id', (req, res) =>{
    const Project = project.find( (item)=>{
      return item.id === Number(req.params.id)
    })
   if(Project){
   res.send(Project.name)
  }
  else{
  res.send('cette page nexiste pas ')
  }
  });


app.get('/users/:id', (req, res) =>{
  const user = people.find( (item)=>{
    return item.id === Number(req.params.id)
  })
 if(user){
 res.send(user.firstName )
}
else{
res.send('cette page nexiste pas ')
}
});

app.get('/*', (req, res) => {
  res.send('Home Page');
});



app.listen(5000, function(){
  console.log('Example app listening on port 5000!');
});
