const configuracion = require("./configuracionGlobal");
const mysql = require("mysql2/promise");

class Evaluacion {
  constructor() {
    this.config = configuracion;
  }

  async registrarevaluacion(
    id_reparacion,
    observacion,
    tiempo,
    costototal,
    estadorecepcion,
    //fecha_hora_estimada
  ) {
    let connection;

    try {
      connection = await mysql.createConnection(this.config);
      await connection.beginTransaction(); // Inicia la transacción

      const consulta ="INSERT INTO evaluacion (id, observacion, tiempo,costo_total) values (?, ?, ?, ?)";
      await connection.execute(consulta, [
        id_reparacion,
        observacion,
        tiempo,
        costototal,
      ]);
      const [rows2, fields2] = await connection.query(
        "UPDATE recepcionequipo SET id_estado = ? WHERE id = ?; ",
        [estadorecepcion, id_reparacion],
        //"update equipo set id_estado = ? where id = ?",
      );

      await connection.commit(); // Confirma la transacción
      await connection.end();

      return id_reparacion;
    } catch (error) {
      if (connection) {
        await connection.rollback(); // Revierte la transacción en caso de error
      }
      console.error("Error al insertar cliente:", error);
      throw error;
    }
  }
}
module.exports = Evaluacion;