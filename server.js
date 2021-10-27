
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

// Ruta Simple
app.get("/", (req, res) => {
  res.json({ message: "Bienvenido a SENG" });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});