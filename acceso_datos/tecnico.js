const configuracion = require("./configuracionGlobal");
const mysql = require("mysql2/promise");

class Tecnico {
  constructor() {
    this.config = configuracion;
  }
  async traerTecnicosYCantAsignaciones() {
    try {
      const connection = await mysql.createConnection(this.config);
      const [rows, fields] = await connection.execute("SELECT  t.id AS id_tecnico, p.nombre, p.apellido_paterno, p.apellido_materno, p.ci, p.telefono, p.genero, p.correo, COUNT(ae.id) AS cantidad_asignaciones FROM tecnico t INNER JOIN persona p ON t.id = p.id LEFT JOIN asignacionequipo ae ON t.id = ae.id_tecnico GROUP BY t.id, p.nombre, p.apellido_paterno, p.apellido_materno, p.ci, p.telefono, p.genero, p.correo ORDER BY cantidad_asignaciones ASC;",
      );
      const arrayTecnicos = rows;
      await connection.end();

      return arrayTecnicos;
    } catch (error) {
      console.error("Error al seleccionar equipos", error);
      throw error;
    }
  }
  async traerTecnicos(){
    try{
      const connection = await mysql.createConnection(this.config);
      const [rows,fields] = await connection.execute("select t.id, p.apellido_paterno, p.apellido_materno, p.nombre from persona p, tecnico t where p.id = t.id;",);
      const arrayDatos = rows;
      await connection.end();

      return arrayDatos;
    }catch(error){
      console.error("Error al traer datos de tecnicos", error);
      throw error;
    }
  }
} 
module.exports =Tecnico;