//Hay 4 funciones: –
//para el acceso público – para los usuarios que han
//iniciado sesión (rol: usuario/moderador/administrador)
//– para los usuarios que tienen el rol de moderador – para 
//los usuarios que tienen el rol de administrador/api/test/all/api/test/user/api/test/mod/api/test/admin

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  };
  