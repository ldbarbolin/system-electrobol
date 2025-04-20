const Cliente = require("../acceso_datos/cliente");

class GestorCliente{
  async traerNombresClientes() {
    try {
      const cliente = new Cliente();
      const arrayDatos = await cliente.traerNombresClientes();
      return arrayDatos;
    } catch (error) {
      console.error("Error al traer los nombres de los clientes:", error);
      throw error;
      }
  }
    
  async traerDatosClientePorId(idCliente) {
    try {
      const cliente = new Cliente();
      const arrayDatos = await cliente.traerNombresClientes();
      return arrayDatos;
    } catch (error) {
      console.error("Error al traer los nombres de los clientes:", error);
      throw error;
    }
  }
    
  async traerDatosClientePorCi(ciCliente) {
    try {
      const cliente = new Cliente();
      const arrayDatos = await cliente.seleccionarClientePorCi(ciCliente);
      console.log(arrayDatos)
      return arrayDatos;
      
    } catch (error) {
      console.error("Error al traer los nombres de los clientes:", error);
      throw error;
    }
  }
}

module.exports = GestorCliente;