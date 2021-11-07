const { institucion, usuario } = require("../models");
const db = require("../models"); // llamamos a los modelos
const Role = db.role; // roles
const Institucion = db.institucion;

exports.create = (req, res) => {
    // Validar peticion
    if (!req.body.nombre) {
      res.status(400).send({ message: "Los campos no pueden estar vacios!" });
      return;
    }
    // Crear Institucion
    const Institucion = new institucion({ 
      id: req.body.id,
      nombre:req.body.nombre,
      ubicacion: req.body.ubicacion,
      tel: req.body.tel,
      email:req.body.email,
     // director:{type: Sequelize.STRING(13)}
    
        published: req.body.published ? req.body.published : true
    }).then(institucion => {
        if (req.body.usuarios) {
          usuario.findAll({
            where: {
              role: '2' 
              //{
                //[Op.or]: req.body.roles
             // }
            }
          }).then(usuario => {
            institucion.setRoles(usuario).then(() => {
              res.send({ message: "Se ha asignado un Director a la Intitucion !" });
            });
          });
        }
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
    
    ;
    // Guardar Producto en la base de datos 
    Institucion.save(Institucion)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ocurrio un error mientras se registraba la institucion en la base de datos"
        });
      });
  };
