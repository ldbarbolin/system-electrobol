const configuracion = require("./configuracionGlobal");
const mysql = require("mysql2/promise");

class Asignacion {
  constructor() {
    this.config = configuracion;
    }

    async registrarAsignacionEquipo(idRecepcion, idTecnico, fechaHora) {
        try {
        const connection = await mysql.createConnection(this.config);
        // Registrar la recepción del equipo
        const [rows, fields] = await connection.query("INSERT INTO asignacionequipo(id, id_tecnico, fecha_hora) VALUES (?,?,?);",
            [idRecepcion, idTecnico, fechaHora],
        );
        const [rows2, fields2] = await connection.query(
            "UPDATE recepcionequipo SET id_estado = 2 WHERE id = ?;",
            [idRecepcion],
        );
        await connection.end();
        return true;
        } catch (error) {
        console.error("Error al registrar la recepción del equipo:", error);
        throw error;
        }
    }

    async traerasignacion(idUsuario) {
        try {
          // Crear la conexión a la base de datos
          const connection = await mysql.createConnection(this.config);
          // Realizar la consulta SELECT
          const [arrayAsignaciones, fields] = await connection.execute("SELECT asig.id AS id_asignacion, asig.id_tecnico, eq.id AS id_equipo, el.nombre AS nombre_electrodomestico FROM  asignacionequipo asig JOIN recepcionequipo re ON asig.id = re.id JOIN equipo eq ON re.id_equipo = eq.id JOIN modelo mo ON eq.id_modelo = mo.id JOIN electrodomestico el ON mo.id_tipo = el.id WHERE re.id_estado = 2 AND asig.id_tecnico = ?",
            [idUsuario],
          );
    
          // Cerrar la conexión a la base de datos
          await connection.end();
    
          return arrayAsignaciones;
        } catch (error) {
          console.error("Error al obtener el valor del producto:", error);
          throw error;
        }
    }
    async filtrarAsignaciones(idTecnico) {
      try {
        // Crear la conexión a la base de datos
        const connection = await mysql.createConnection(this.config);
        // Realizar la consulta SELECT
        const [arrayAsignaciones, fields] = await connection.execute("SELECT asi.id, m.nombre AS nombre_marca, mo.nombre AS nombre_modelo, el.nombre AS nombre_electrodomestico, e.nombre AS estado FROM asignacionequipo asi JOIN recepcionequipo re ON asi.id = re.id JOIN equipo eq ON re.id_equipo = eq.id JOIN modelo mo ON eq.id_modelo = mo.id JOIN marca m ON mo.id_marca = m.id JOIN electrodomestico el ON mo.id_tipo = el.id JOIN estadorecepcion e ON re.id_estado = e.id WHERE asi.id_tecnico = ?",
          [idTecnico],
        );
  
        // Cerrar la conexión a la base de datos
        await connection.end();
  
        return arrayAsignaciones;
      } catch (error) {
        console.error("Error al filtrar las asignaciones:", error);
        throw error;
      }
  }

    
}
module.exports = Asignacion;