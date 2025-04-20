const configuracion = require("./configuracionGlobal");
const mysql = require("mysql2/promise");

class Avance {
  constructor() {
    this.config = configuracion;
  }

  async registraravance(id_reparacion, descripcion, fecha_hora, avance) {
    try {
      // Crear la conexión a la base de datos
      const connection = await mysql.createConnection(this.config);
      const [rows1, fields1] = await connection.query(

        "INSERT INTO avance (id_asignacion, descripcion, fecha_hora) VALUES (?, ?, ?);  ",
        [id_reparacion, descripcion, fecha_hora],
      );
      // Ejemplo de segunda consulta
      const [rows2, fields2] = await connection.query(
        "UPDATE recepcionequipo SET id_estado = ? WHERE id = ?; ",
        [avance, id_reparacion],
        //"update equipo set id_estado = ? where id = ?",
      );

      await connection.end();

      return rows1;
    } catch (error) {
      console.error("Error al obtener el valor del producto:", error);
      throw error;
    }
  }
}
module.exports = Avance;

