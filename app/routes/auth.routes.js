// Cuando un cliente envía una solicitud para un punto final utilizando una 
//solicitud HTTP (GET, POST, PUT, DELETE), debemos determinar 
//cómo responderá el servidor configurando las rutas.

//Podemos separar nuestras rutas en 2 partes: para Autenticación 
//y para Autorización (acceso a recursos protegidos).

//Autenticación:

//Get /api/auth/signup
//Get /api/auth/signin
const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
};