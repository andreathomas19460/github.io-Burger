
const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');


const db_config = require("./config/connection");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '/public')));

const PORT = process.env.PORT || 3000;

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


app.get("/", function(req, res) {

  let connection = mysql.createConnection(db_config);

  let promisedBurger = new Promise((resolve, reject) => {
    connection.query("SELECT * FROM burgers;", function(err, data) {
      if (err) {
        return res.status(500).end();
      }

      connection.end();
  
      let  orderedBurgers = [];
      let  devouredBurgers = [];
  
      data.forEach(item => {
        if(item.devoured === 0){
          orderedBurgers.push(item);
        }else{
          devouredBurgers.push(item); 
        }
      })  
  
      res.render("index", 
      { 
        orderedBurgers: orderedBurgers,
        devouredBurgers: devouredBurgers
      });
    });
    
  });
  
  promisedBurger.then((successMessage) => {

    res.send(successMessage);

  }); 
});

app.post('/api/addBurger', (req, res) => {

  let connection = mysql.createConnection(db_config);

  let promisedBurger = new Promise((resolve, reject) => {
    connection.query(`INSERT INTO burgers (burger_name, devoured) VALUES ('${req.body.burger_name}', false);`, function(err, data) {
      if (err) {
        return res.status(500).end();
      }
      connection.end();
      
      resolve("200"); 
    }); 
  });
  
  promisedBurger.then((successMessage) => {
  
    res.send(successMessage);
  });

});

app.get('/api/burgers', (req, res) => {
  let connection = mysql.createConnection(db_config);
  connection.query(`SELECT * FROM burgers`, function(err, data) {
    if (err) {
      return res.status(500).end();
    }
    connection.end();


      res.send(data);
  });
});

app.put('/api/burgers/:id', (req, res) => {
  let id = req.params.id;

  let connection = mysql.createConnection(db_config);

  let promisedBurger = new Promise((resolve, reject) => {
    connection.query(`UPDATE burgers SET devoured = true WHERE id = ${id};`, function(err, data) {
      if (err) {
        return res.status(500).end();
      }
      connection.end();
      
      resolve("200"); 
    });
  });

  promisedBurger.then((successMessage) => {
    res.send(successMessage);
  });
})


app.delete('/api/burgers/', (req, res) => {
  let connection = mysql.createConnection(db_config);

  let promisedBurger = new Promise((resolve, reject) => {
    connection.query(`TRUNCATE TABLE burgers;`, function(err, data) {
      if (err) {
        return res.status(500).end();
      }
      connection.end();
      resolve("200"); 

    });
  });

  promisedBurger.then((successMessage) => {
    
    res.send(successMessage);
  });
})


app.listen(PORT, function() {

  console.log("Server listening on: http://localhost:" + PORT);
});