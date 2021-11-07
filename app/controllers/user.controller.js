//Hay 4 funciones: –
//para el acceso público – para los usuarios que han
//iniciado sesión (rol: usuario/moderador/administrador)
//– para los usuarios que tienen el rol de moderador – para 
//los usuarios que tienen el rol de administrador/api/test/all/api/test/user/api/test/mod/api/test/admin

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.SpAdminPanel = (req, res) => {
    res.status(200).send("SpAdmin Panel");
  };

  exports.DirectoresPanel = (req, res) => {
    res.status(200).send("Directores Panel.");
  };
  
  exports.MaestrosPanel = (req, res) => {
    res.status(200).send("Maestros Panel");
  };
  
  exports.Alumnospanel = (req, res) => {
    res.status(200).send("Alumnos Panel.");
  };
  