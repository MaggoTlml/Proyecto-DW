//Get /api/test/all
//GET para usuarios que han iniciado sesión (usuario/moderador/administrador)/api/test/user
//GET para moderador/api/test/mod
//GET para admin/api/test/admin

//Autorizacion:

const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get(
    "/api/SpAdmin",
    [authJwt.verifyToken, authJwt.isSpAdmin],
    controller.SpAdminPanel
  );



  app.get(
    "/api/Directores",
    [authJwt.verifyToken, authJwt.isDirector],
    controller.DirectoresPanel
  );

  app.get(
    "/api/Maestros",
    [authJwt.verifyToken, authJwt.isMaestro],
    controller.MaestrosPanel
  );

  app.get(
     "/api/Alumnos",
    [authJwt.verifyToken, authJwt.isAlumno],
    controller.Alumnospanel
  );
};