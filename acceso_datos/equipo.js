const configuracion = require("./configuracionGlobal")
const mysql = require("mysql2/promise");

class Equipo{
    constructor(){
        this.config = configuracion;
    }
    //trae el tipo del modelo y las marcas
    async traerMarca() {
        try {
            const connection = await mysql.createConnection(this.config);
            const [rows, fields] = await connection.execute("SELECT * FROM marca;");
            await connection.end();
            return rows;
        } catch (error) {
            console.error("Error al traer las marcas", error);
            throw error;
        }
    }
    async traerElectrodomestico() {
        try {
            const connection = await mysql.createConnection(this.config);
            const [rows, fields] = await connection.execute("SELECT * FROM electrodomestico",);
            await connection.end();
            return rows;
        } catch (error) {
            console.error("Error al traer los electrodomesticos:", error);
            throw error;
        }
    }

    async traerEquiposPorCiCliente(ciCliente) {
        try {
          const connection = await mysql.createConnection(this.config);
          const [rows, fields] = await connection.execute(
            "SELECT eq.id AS id_equipo,m.nombre AS nombre_marca, tm.nombre AS nombre_electrodomestico, mo.nombre AS nombre_modelo FROM equipo eq INNER JOIN modelo mo ON eq.id_modelo = mo.id INNER JOIN marca m ON mo.id_marca = m.id INNER JOIN electrodomestico tm ON mo.id_tipo = tm.id INNER JOIN cliente c ON eq.id_cliente = c.id INNER JOIN persona p ON c.id = p.id WHERE p.ci = ?",
            [ciCliente],
          );
          const arrayEquipos = rows;
          await connection.end();
    
          return arrayEquipos;
        } catch (error) {
          console.error("Error al seleccionar equipos", error);
          throw error;
        }
    }
    async procedimientoAlmRegistrarRecepcionYRegistro(
        idEncargado,
        idEquipo,
        idEstado,
        fechaHoraAhora,
      ) {
        try {
          const connection = await mysql.createConnection(this.config);
          console.log('encargado', idEncargado);
          console.log('equipo', idEquipo);
          console.log('estado', idEstado);
          console.log('fechahora', fechaHoraAhora);
          const [rows, fields] = await connection.execute(
            "CALL RegistrarRecepcionYRegistro(?, ?, ?, ?);",
            [idEncargado, idEquipo, idEstado, fechaHoraAhora],
          );
          await connection.end();
          console.log("Recepcion de equipo registrada con");
          return true;
        } catch (error) {
          console.error("Error al registrar la recepción del equipo:", error);
          throw error;
        }
    }
  async traerEquipoPorIdRecepcion(idRecepcion) {
    try {
      const connection = await mysql.createConnection(this.config);
      const [rows, fields] = await connection.execute("SELECT e.*, m.nombre AS modelo_nombre, ma.nombre AS marca_nombre,tm.nombre AS electrodomestico_nombre, c.id AS id_cliente,p.nombre AS cliente_nombre, p.apellido_paterno AS cliente_apellido_paterno, p.apellido_materno AS cliente_apellido_materno, p.ci AS cliente_ci,p.telefono AS cliente_telefono, p.genero AS cliente_genero, p.correo AS cliente_correo, re.id AS id_recepcion FROM recepcionequipo re INNER JOIN equipo e ON re.id_equipo = e.id INNER JOIN cliente c ON e.id_cliente = c.id INNER JOIN persona p ON c.id = p.id INNER JOIN modelo m ON e.id_modelo = m.id INNER JOIN marca ma ON m.id_marca = ma.id INNER JOIN electrodomestico tm ON m.id_tipo = tm.id WHERE re.id = ?",
        [idRecepcion],
      );
      const objectDatosEquipo = rows[0];
      await connection.end();
  
      return objectDatosEquipo;
    } catch (error) {
      console.error("Error al seleccionar equipos", error);
      throw error;
    }
  }
  async traerEquiposSingAsignacionDesc() {
    try {
      const connection = await mysql.createConnection(this.config);
      const [rows, fields] = await connection.execute("SELECT e.*,m.nombre AS modelo_nombre, ma.nombre AS marca_nombre, tm.nombre AS electrodomestico_nombre,re.id AS id_recepcion FROM equipo e INNER JOIN modelo m ON e.id_modelo = m.id INNER JOIN marca ma ON m.id_marca = ma.id INNER JOIN electrodomestico tm ON m.id_tipo = tm.id INNER JOIN recepcionequipo re ON e.id = re.id_equipo WHERE re.id_estado = '1' ORDER BY e.id DESC;",
      );
      const arrayEquipos = rows;
      await connection.end();

      return arrayEquipos;
    } catch (error) {
      console.error("Error al seleccionar equipos", error);
      throw error;
    }
  }

  async registrarEquipo(
    modelo,
    marca,
    electrodomestico,
    idCliente,
  ) {
    try {
      const connection = await mysql.createConnection(configuracion);
      console.log('Modelo:', modelo);
      console.log('Marca:', marca);
      console.log('Electrodoméstico:', electrodomestico);
      console.log('ID Cliente:', idCliente);
      
      // Llamar al procedimiento almacenado RegistrarEquipo
      const [rows] = await connection.execute(
        "CALL RegistrarEquipo(?, ?, ?, ?, @id_equipo)",
        [
          modelo,
          marca,
          electrodomestico,
          idCliente,
        ],
      );

      // Obtener el ID del equipo insertado
      const [result] = await connection.query("SELECT @id_equipo AS id_equipo");
      const idEquipo = result[0].id_equipo;

      console.log("Equipo registrado con éxito. ID del equipo:", idEquipo);

      // Cerrar la conexión
      await connection.end();

      return idEquipo;
    } catch (error) {
      console.error("Error al registrar el equipo:", error);
      throw error;
    }
  }

}
module.exports = Equipo;