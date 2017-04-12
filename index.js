var express = require('express');
var app = express();
const people = require('./data/users.js');
const bodyParser = require('body-parser');
const project = require('./data/project.js');
const morgan = require('morgan');
const pg = require('pg');
const DB = 'postgres://postgres:david01dk@localhost:5432/coucou';
app.use(express.static('public'));
app.set('view engine', 'ejs');

/*
var dbConfig = require('db-config.');

sequelize
    .sync({
    })
    .then(function(err){
    }, function(err){
      console.log('An error occured while creating the table: ', err);
    }); */
/*
    app.use('/*', (req,res,next) =>{
      console.log('Request Type', req.method);
      next();
    });
*/
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({extended: false}));



app.get('/', function(req, res){
  res.render('homepage.ejs');
});



//Petite app en CLI qui genere des données JSO

app.get('/users', (req, res) => {
  // connect to our database
  pg.connect(DB, function (err, client, done){
    if (err) throw err;
  // execute a query on our database
  client.query('SELECT * FROM people', function (err, result){
    if (err) throw err;
    //just print the result to the console
    console.log(result.rows); // outputs: { name: 'brian'}
    done();
    const userHandler = result.rows;
  //  res.send(JSON.stringify(result.rows));
  res.render('users', {userHandler})
    });
  });
  //  res.render('people.ejs', {people: people});
});



app.get('/project', (req, res) =>{
  res.render('Project.ejs', {project: project});
});

app.post('/users', (req,res) =>{
  pg.connect(DB, (err, client, done)=>{
    if (err) throw err;
    client.query('INSERT INTO people VALUES ($1, $2, $3)', [req.body.firstname, req.body.lastname, req.body.age], (err, result) =>{
      if (err) throw err;
      done();
      res.send("l'utilisateur a bien été crée");
    });
  });
});

  app.get('/about', function(req, res){
    res.render('about.ejs', {salutation: 'Bonjour la famille'});
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



app.get('/users/:userId/project', (req, res) =>{
  let userProject = project.filter( (item)=>{
    return item.userId === Number(req.params.userId)
  })
  if(userProject){
res.render('userProject.ejs', {userProject : userProject})
  }
  else{
    res.status(404).send('vous vous êtes trompés de page !!!');
  }
});


app.get('*', (req, res) => {
  res.status(404).send('vous vous êtes trompé de page !!!');
});


app.listen(5000, function(){
  console.log('Example app listening on port 5000!');
});
