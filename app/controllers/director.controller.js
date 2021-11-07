const db = require("../models"); // llamamos a los modelos
const config = require("../config/auth.config"); // la configuracion de autenticacion
const Usuario = db.usuario; //llamamos la cnosultade usuarios 
const Role = db.role; // roles
// para la institucion
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs")



// registrar director 
exports.signup = (req, res) => {
    // Para Guardar un Director en la BD
    Usuario.create({
      id: req.body.id, // cui
      nombre: req.body.nombre,
      apellido:apellido,
      usuario: req.body.usuario,
      email: req.body.email,
      contra: bcrypt.hashSync(req.body.contra, 8)
    })
      .then(usuario => {
        if (req.body.roles) {
          Role.findAll({
            where: {
              name: 'Director' 
              //{
                //[Op.or]: req.body.roles
             // }
            }
          }).then(roles => {
            usuario.setRoles(roles).then(() => {
              res.send({ message: "El Usuario ha sido registrado como Director !" });
            });
          });
        } else {
          // user role = 1 por default 
          usuario.setRoles([1]).then(() => {
            res.send({ message: "El usuario ha sido registrado con un usuario por defecto!" });
          });
        }
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };
  


  // para iniciar sesion 
  exports.signin = (req, res) => {
    Usuario.findOne({
      where: {
        usuario: req.body.usuario
      }
    })
      .then(usuario => {
        if (!usuario) {
          return res.status(404).send({ message: "El usuario no Existe." });
        }
  
        var contraIsValid = bcrypt.compareSync(
          req.body.contra,
          usuario.contra
        );
  
        if (!contraIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Contrase;a Invalida!"
          });
        }
  
        var token = jwt.sign({ id: usuario.id }, config.secret, {
          expiresIn: 86400 // 24 hours
        });
  
        var authorities = [];
        user.getRoles().then(roles => {
          for (let i = 0; i < roles.length; i++) {
            authorities.push("ROLE_" + roles[i].name.toUpperCase());
          }
          res.status(200).send({
            id: usuario.id,
            usuario: usuario.usuario,
            email: usuario.email,
            roles: authorities,
            accessToken: token
          });
        });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };