const configuracion = require("./configuracionGlobal");
const mysql = require("mysql2/promise");

class Repuesto {
  constructor() {
    this.config = configuracion;
  }

  async traerrepuesto(idUsuario) {
    try {
      // Crear la conexión a la base de datos
      const connection = await mysql.createConnection(this.config);
      // Realizar la consulta SELECT
      const [rows, fields] = await connection.execute("SELECT i.id AS id_repuesto, i.nombre, i.cantidad, p.valor FROM inventario i INNER JOIN precio p ON i.id = p.id_inventario;",
      );
      // Cerrar la conexión a la base de datos
      await connection.end();
      // id_repuesto nombre cantidad valor
      return rows;
    } catch (error) {
      console.error("Error al obtener el valor del producto:", error);
      throw error;
    }
  }
  
  async insertarRepuestoNecesario(
    id_ultima_evaluacion,
    arrayRepuestosNecesarios,
  ) {

    const connection = await mysql.createConnection(this.config);
    try {
      arrayRepuestosNecesarios.forEach(async (elemento) => {
        const consulta =
          "INSERT INTO repuestosnecesarios (id_evaluacion,id_inventario, cantidad) VALUES (?, ?, ?);";
        const [rows] = await connection.execute(consulta, [
          id_ultima_evaluacion,
          elemento.idRepuesto,
          elemento.cantidad,
        ]);
      });

      await connection.commit();

      await connection.end();
      return true;
      //
    } catch (error) {
      console.error("Error al insertar en detalle venta");
      await connection.rollback();
      return false;
    } finally {
      await connection.end();
    }
  }
}
module.exports = Repuesto;