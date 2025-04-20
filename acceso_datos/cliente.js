const configuracion = require("./configuracionGlobal")
const mysql = require("mysql2/promise");

class Cliente {
  constructor() {
    this.config = configuracion;
  }

  async traerclienteCI(ci) {
    try {
        const connection = await mysql.createConnection(this.config);
        const consulta = "SELECT id, nombre, apellido_paterno, apellido_materno, ci FROM persona WHERE ci = ?";
        const [results] = await connection.execute(consulta, [ci]); // Aquí pasamos el parámetro `ci`
        await connection.end();
        return results; // Devuelve todos los resultados de la consulta
    } catch (error) {
        console.error("Error al obtener datos del cliente:", error);
        throw error;
    }
  }

  async traerNombresClientes() {
    try {
      const connection = await mysql.createConnection(this.config);
      const consulta = `
              SELECT p.id AS id_persona, p.nombre AS nombre_cliente
              FROM persona p
              INNER JOIN cliente c ON p.id = c.id`;
      const [results] = await connection.execute(consulta);
      await connection.end();
      return results; // Devuelve todos los resultados de la consulta
    } catch (error) {
      console.error("Error al obtener nombres de los clientes:", error);
      throw error;
    }
  }

  async seleccionarClientePorId(idCliente) {
    try {
      const connection = await mysql.createConnection(this.config);
      const consulta = `
              SELECT p.*
              FROM persona p
              INNER JOIN cliente c ON p.id = c.id
              WHERE persona.id = ?;
              `;
      const [results] = await connection.execute(consulta, [idCliente]);
      await connection.end();
      return results; // Devuelve todos los resultados de la consulta
    } catch (error) {
      console.error("Error al obtener datos cliente:", error);
      throw error;
    }
  }

  async seleccionarClientePorCi(ciCliente) {
    try {
      const connection = await mysql.createConnection(this.config);
      const consulta = "select c.id, p.nombre, p.apellido_paterno, p.apellido_materno, p.ci from persona p INNER JOIN cliente c ON p.id = c.id WHERE p.ci = ?";
      const [results] = await connection.execute(consulta, [ciCliente]);
      await connection.end();
      return results; // Devuelve todos los resultados de la consulta
    } catch (error) {
      console.error("Error al obtener datos cliente:", error);
      throw error;
    }
  }
}
module.exports = Cliente;
