const db = require("../models"); //mandamos a llamar los modelos de las consultas
const ROLES = db.ROLES; // consulta roeles
const User = db.user; // consulta usuarios

// verificar  usuario / e-mail
checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Nombre de Usuario
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Error! El nombre de usuario ya esta en uso!"
      });
      return;
    }

    // Email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Error! El e-mail ya esta en uso!"
        });
        return;
      }

      next();
    });
  });
};
// verificar si el rol existe 
checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) { // obtener los roles en un arreglo
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Error! El rol no existe = " + req.body.roles[i] // si el error no existe 
        });
        return;
      }
    }
  }
  
  next();
};
// funcion
const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;

// Para procesar la Autenticación y
//Autorización, tenemos estas funciones: - verificar si se proporciona, legal o no. Obtenemos token de x-access-token de encabezados HTTP, luego usamos la función de jsonwebtoken.
//- comprobar si del usuario contiene el rol requerido o no.tokenverify()roles


