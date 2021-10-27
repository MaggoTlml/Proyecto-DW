//Hay 2 funciones principales para la autenticación:
//- : crear un nuevo usuario en la base de datos (el rol es el usuario si no especifica el rol)
//- :signupsignin

//buscar la solicitud en la base de datos, si existeusername
//comparar con en la base de datos usando bcrypt, si es correctopasswordpassword
//generar un token mediante jsonwebtoken
//devolver la información del usuario y el token de acceso

const db = require("../models"); // llamamos a los modelos
const config = require("../config/auth.config"); // la configuracion de autenticacion
const User = db.user; //llamamos la cnosultade usuarios 
const Role = db.role; // roles

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Para Guardar un Usuario en la BD
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "El Usuario ha sido registrado con Exito1!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "El usuario ha sido regiistrado con Exito2!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "El usuario no Existe." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Contrase;a Invalida!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};