const jwt = require("jsonwebtoken");  // se invoca la funcion para la generacion de tokens 
const config = require("../config/auth.config.js"); // llamamos el archivodeconfiguracion 
//que generara el token en base a cierto texto
const db = require("../models"); // llamamos a los modelos
const Usuario = db.usuario; // y al usuario 

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) { // sino hay token 
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(  token, config.secret, (err, decoded) => { // sino tiene permiso 
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.usuarioId = decoded.id;
    next();
  });
};

isSpAdmin = (req, res, next) => {  // si el rol del usuario es admin
  Usuario.findByPk(req.usuarioId).then(usuario => {
    usuario.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "SpAdmin") {
          next();
          return; 
        }
      }

      res.status(403).send({ // si no tiene el rol necesario
        message: "Require Admin Role!" // admin 
      });
      return;
    });
  });
};

isDirector = (req, res, next) => {
  Usuario.findByPk(req.usuarioId).then(usuario => {
    usuario.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "Director") { //moderador 
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator Role!" // 
      });
    });
  });
};

isMaestro = (req, res, next) => {
  Usuario.findByPk(req.usuarioId).then(usuario => {
    usuario.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "Maestro") { // maestros 
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Necesita tener rol de maestro !" // maestros
      });
    });
  });
};

isAlumno = (req, res, next) => {
  Usuario.findByPk(req.usuarioId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "Alumno") { // maestros 
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Necesita tener rol de Alumno !" // maestros
      });
    });
  });
};




// funcion jwt para realizar las verificaciones 
const authJwt = {
  verifyToken: verifyToken,
  isSpAdmin: isSpAdmin,
  isDirector: isDirector,
  isMaestro: isMaestro,
  isAlumno: isAlumno
};
module.exports = authJwt;