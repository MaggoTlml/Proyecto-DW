module.exports = (sequelize, Sequelize) => {  // funcion para crear latabla 
    const Institucion = sequelize.define("Institucion", {  // Institucion
      // datos a consultar
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      nombre:{type: Sequelize.STRING(150)},
      ubicacion:{type: Sequelize.STRING(150)},
      tel:{type: Sequelize.STRING(8)},
      email:{type: Sequelize.STRING(64)},
      director:{type: Sequelize.STRING(13)}
      

    });
    return Institucion; // devuelve la consulta con los datos 
  };