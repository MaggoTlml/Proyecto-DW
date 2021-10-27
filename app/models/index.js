const config = require("../config/db.config.js"); // se manda a llamar la conexion a la base de datos 
const Sequelize = require("sequelize"); // la funcion de mapeo de base de datos 
const sequelize = new Sequelize( 
  config.DB, // obtenemos el nombre de la base de datos desde el archivo de configuracion
  config.USER, // obtenemos el usuario de la base de datos ==
  config.PASSWORD, // obtenemos la  constrase;a del usuario de la base de dato ==
  {
    host: config.HOST,  // url
    dialect: config.dialect, 
    operatorsAliases: false,
//conexiones 
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
// para crear las tablas en la base de datos 
db.user = require("../models/user.model.js")(sequelize, Sequelize); // mandamos a llamar la connsulta o mapeo que creamos previamente en el modelo 
//para la obtencion del usuario en la base de datos 
db.role = require("../models/role.model.js")(sequelize, Sequelize); // mandamos a llamar a consulta o mapeo de los roles 

db.role.belongsToMany(db.user, { // se crea la relacion de lastablas 
 
    through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});

//La asociación entre usuarios y roles es
//una relación de muchos a muchos: – Un usuario puede tener varios roles.
//– Un rol puede ser asumido por muchos usuarios


db.user.belongsToMany(db.role, { // se crea la relacion de las tablas 
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

//Con , vamos a tener una nueva tabla user_roles como conexión entre usuarios y tabla de 
//roles a través de su clave principal como claves externas.through, foreignKey, otherKey


db.ROLES = ["user", "admin", "moderator"]; // agregamos los roles 
 
module.exports = db;

