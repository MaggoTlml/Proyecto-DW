module.exports = (sequelize, Sequelize) => { // funcion para mapear la bd 
    const Role = sequelize.define("roles", { // conslta a la tabla role 
        // datos a consultar
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      }
    });
  
    return Role; // devuelve los roles
  };

//Después de inicializar Sequelize, no necesitamos escribir funciones CRUD, Sequelize soporta todas ellas:
//crear un nuevo usuario: create(object)
//buscar un usuario por id: findByPk(id)
//encontrar un usuario por correo electrónico: findOne({ where: { email: ... } })
//obtener todos los usuarios: findAll()
//encontrar todos los usuarios por nombre de usuario: findAll({ where: { username: ... } })
//Estas funciones se utilizarán en nuestros controladores y middlewares.
