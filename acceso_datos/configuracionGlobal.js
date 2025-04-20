require('dotenv').config();
const mysql = require("mysql");

const configuracion = {
  host: process.env.HOSTDB,
  user: process.env.USERDB,
  password: process.env.PASSWORDDB,
  database: process.env.DATABASE,
};

const conexion =mysql.createConnection(configuracion);

conexion.connect((error) =>{
  if(error){
    console.error("Error al conectar con la base de datos: ", error.message);
    return;
  }
  console.log("Conectado exitosamente a la base de datos:", configuracion.database);
})

module.exports = configuracion;
