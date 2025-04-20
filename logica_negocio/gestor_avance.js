const Avance = require("../acceso_datos/avance.js");

class GestorAvance {
  async registrar_avance(id_reparacion, descripcion, avance) {
    try {
      console.log("Datos avance");
      console.log(descripcion, avance);

      const now = new Date();
      const fecha_hora = now.toISOString().slice(0, 19).replace("T", " ");

      const avanzar = new Avance();
      const repuestos = await avanzar.registraravance(
        id_reparacion,
        descripcion,
        fecha_hora,
        avance,
      );

      return repuestos;
    } catch (error) {
      console.error("Error al obtener los pedidos en gestor", error);
      throw error;
    }
  }
}

module.exports = GestorAvance;