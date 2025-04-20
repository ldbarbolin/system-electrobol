const configuracion = require("./configuracionGlobal");
const mysql = require("mysql2/promise");

class Reparacion {
  constructor() {
    this.config = configuracion;
  }
  async traerrepacion(idUsuario) {
    try {
      // Crear la conexión a la base de datos
      const connection = await mysql.createConnection(this.config);
      // Realizar la consulta SELECT
      const [arrayReparacion, fields] = await connection.execute("SELECT asig.id AS id_asignacion, asig.id_tecnico, eq.id AS id_equipo, el.nombre AS nombre_electrodomestico FROM  asignacionequipo asig JOIN recepcionequipo re ON asig.id = re.id JOIN equipo eq ON re.id_equipo = eq.id JOIN modelo mo ON eq.id_modelo = mo.id JOIN electrodomestico el ON mo.id_tipo = el.id WHERE re.id_estado = 3 AND asig.id_tecnico = ?",
        [idUsuario],
      );
      // Cerrar la conexión a la base de datos
      await connection.end();

      return arrayReparacion;
    } catch (error) {
      console.error("Error al obtener el valor del producto:", error);
      throw error;
    }
  }
}
module.exports = Reparacion;