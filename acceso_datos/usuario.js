const configuracion = require("./configuracionGlobal")
const mysql = require("mysql2/promise");

class Usuario {
    constructor() {
      this.config = configuracion;
    }
    //traer usuario
  async seleccionarUsuarioPorNombreContrasena(nombreUsuario, contrasena) {
    try {
      const connection = await mysql.createConnection(this.config);
      // Mostrar mensaje si la conexión es exitosa
      console.log("Conectado a la base de datos");
      const consulta = "SELECT u.id AS id_usuario, p.id AS id_persona, u.id_tipo_usuario,u.nombre_usuario, p.nombre, p.apellido_paterno, p.apellido_materno, p.ci, p.genero, tu.tipo AS tipo_usuario FROM usuario u JOIN persona p ON u.id = p.id JOIN tipousuario tu ON u.id_tipo_usuario = tu.id WHERE u.nombre_usuario = ? AND u.contrasena = ? AND u.estado = 'ACT';"
      
      const [rows, fields] = await connection.execute(consulta, [
        nombreUsuario,
        contrasena,
      ]);

      await connection.end();
      return rows;
    } catch (error) {
      console.error("Error al seleccionar usuario:", error);
      throw error; // Lanza el error para que sea manejado por el código que llama a esta función
    }
  }

  async seleccionarTipoUsuarioPorIdUsuario(idUsuario) {
    try {
      const connection = await mysql.createConnection(this.config);
      const consulta = `
      SELECT 
          tu.id AS id_tipo_usuario,
          tu.tipo AS tipo_usuario
      FROM usuario u
      JOIN tipousuario tu ON u.id_tipo_usuario = tu.id
      WHERE u.id = ?;`;
      const [rows, fields] = await connection.execute(consulta, [idUsuario]);

      await connection.end();
      return rows;
    } catch (error) {
      console.error("Error al seleccionar tipo de usuario:", error);
      throw error;
    }
  }
}
module.exports = Usuario;