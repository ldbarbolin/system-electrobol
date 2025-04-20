const Repuesto = require("../acceso_datos/repuesto");

class GestorRepuesto{
    async traer_repuesto(idUsuario) {
        try {
          const repuesto = new Repuesto();
          const repuestos = await repuesto.traerrepuesto(idUsuario);
          const arrayRepuesto = repuestos.map((repues) => ({
            id_repuesto: repues.id_repuesto,
            nombre: repues.nombre,
            cantidad: repues.cantidad,
            valor: repues.valor,
          }));
          return arrayRepuesto;
        } catch (error) {
          console.error("Error al obtener los pedidos en gestor", error);
          throw error;
        }
    }
}
module.exports = GestorRepuesto;