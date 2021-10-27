const authJwt = require("./authJwt"); // llamamos a las funciones de utenticacion 
const verifySignUp = require("./verifySignUp"); // y verificacion de credenciales, si estas ya existen, etc

module.exports = {
  authJwt,
  verifySignUp
};