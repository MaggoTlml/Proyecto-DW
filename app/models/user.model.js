
module.exports = (sequelize, Sequelize) => {  // funcion para mapear la bd 
    const Usuario = sequelize.define("Usuarios", {  // User / Users
      // datos a consultar
      id:{
        type: Sequelize.STRING(13),
        primaryKey: true
      },
      nombres:{type: Sequelize.STRING(128)},
      apellidos:{type: Sequelize.STRING(128)},
      
      usuario: {   // username                          
        type: Sequelize.STRING(32)
      },
      email: {  // email
        type: Sequelize.STRING(64)
      },
      contra: {  // password
        type: Sequelize.STRING(64)
      }

    });
    return Usuario; // devuelve la consulta con los datos 
  };