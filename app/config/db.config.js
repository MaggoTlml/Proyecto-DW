// Los datos dependen de la configuracion previa en el manejador de base de datos (postgres)
// Los primeros 5 parametros equivalen a la conexion con la base de datos 
module.exports = {
    HOST: "localhost", // url de la base de datos 
    USER: "postgres", // usuario 
    PASSWORD: "Test1234.", //contrase;a 
    DB: "SENG",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };

//max: número máximo de conexiones en el grupo
//min: número mínimo de conexiones en el grupo
//idle: tiempo máximo, en milisegundos, que una conexión puede estar inactiva antes de ser liberada
//acquire: tiempo máximo, en milisegundos, ese grupo intentará obtener la conexión antes de lanzar el error