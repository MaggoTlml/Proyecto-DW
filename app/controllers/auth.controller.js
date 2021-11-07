//Hay 2 funciones principales para la autenticación:
//- : crear un nuevo usuario en la base de datos (el rol es el usuario si no especifica el rol)
//- :signupsignin

//buscar la solicitud en la base de datos, si existeusername
//comparar con en la base de datos usando bcrypt, si es correctopasswordpassword
//generar un token mediante jsonwebtoken
//devolver la información del usuario y el token de acceso

const db = require("../models"); // llamamos a los modelos
const config = require("../config/auth.config"); // la configuracion de autenticacion
const Usuario = db.usuario; //llamamos la cnosultade usuarios 
const Role = db.role; // roles

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Para Guardar un Usuario en la BD
  Usuario.create({
    
    usuario: req.body.usuario,
    email: req.body.email,
    contra: bcrypt.hashSync(req.body.contra, 8)
  })
    .then(usuario => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          usuario.setRoles(roles).then(() => {
            res.send({ message: "El Usuario ha sido registrado con Exito1!" });
          });
        });
      } else {
        // user role = 1 por default 
        usuario.setRoles([1]).then(() => {
          res.send({ message: "El usuario ha sido regiistrado con Exito2!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

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