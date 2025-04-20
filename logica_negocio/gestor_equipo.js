const Equipo = require("../acceso_datos/equipo");

class GestorEquipo{
  
  async traerMarca() {
    const equipo = new Equipo();
    const datosMarca = await equipo.traerMarca();
    return datosMarca; 
  }
    
  async traerElectrodomestico() {
    const equipo = new Equipo();
    const datosEle = await equipo.traerElectrodomestico();
    return datosEle;
  }
   
  async traerEquiposPorCiCliente(ciCliente) {
    const equipo = new Equipo();
    const arrayEquipos = await equipo.traerEquiposPorCiCliente(ciCliente);
    return arrayEquipos;
  }

  async registrarRecepcionEquipo(idEncargado, idEquipo, idCliente) {
    const equipo = new Equipo();
    const now = new Date();
    const fecha_hora = now.toISOString().slice(0, 19).replace("T", " ");
    const resultado = await equipo.procedimientoAlmRegistrarRecepcionYRegistro(
      idEncargado,
      idEquipo,
      1,
      fecha_hora,
    );
    if (!resultado) {
      console.log("No se registro la recepcionEquipo");
      return false;
    }
    return true;   
  }

  async traerEquipoPorIdRecepcion(idRecepcion) {
    const equipo = new Equipo();
    const objectDatosEquipo = await equipo.traerEquipoPorIdRecepcion(idRecepcion);
    return objectDatosEquipo;
  }

  async traerEquiposSingAsignacionDesc() {
    const equipo = new Equipo();
    const arrayEquipos = await equipo.traerEquiposSingAsignacionDesc();
    return arrayEquipos;
  }

  async insertarEquipo(
    modelo,
    marca,
    electrodomestico,
    idCliente,
  ) {
    try {
      const equipo = new Equipo();
      const resultado = await equipo.registrarEquipo(
        modelo,
        marca,
        electrodomestico,
        idCliente,
      );
      return resultado;
    } catch (error) {
      console.error("Error al registrar Equipo:", error);
      throw error;
    }
  }



}
module.exports = GestorEquipo;