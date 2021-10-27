
const express = require("express"); // para crear el servidor 
const bodyParser = require("body-parser"); // para analizar la solicitud y crearobjeto req.body
const cors = require("cors"); //proporciona middleware Express para habilitar CORS

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// database  --- commit 2
const db = require("./app/models");
const Role = db.role;

// db.sequelize.sync(); --commit 2  
// force: true will drop the table if it already exists
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Database with { force: true }');
  initial();
});



// Ruta Simple
app.get("/", (req, res) => {
  res.json({ message: "Bienvenido a SENG" });
});


// rutas
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);



// set port, listen for requests
const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});



//--------------------commit 2

// insersion  

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}

