
module.exports = (sequelize, Sequelize) => {  // funcion para mapear la bd 
    const User = sequelize.define("users", {  // consulta 
      // datos a consultar
        username: {                           
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      }
    });
  
    return User; // devuelve la consulta con los datos 
  };