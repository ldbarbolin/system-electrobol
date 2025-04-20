const Asignacion = require("../acceso_datos/asignacion");
const Reparacion = require("../acceso_datos/reparacion");

class GestorAsignacion{
  async registrarAsignacion(idRecepcion, idTecnico) {
      try {
        const now = new Date();
        const fecha_ahora = now.toISOString().slice(0, 19).replace("T", " ");
  
        const asignacion = new Asignacion();
        await asignacion.registrarAsignacionEquipo(
          idRecepcion,
          idTecnico,
          fecha_ahora,
        );
  
        return true;
      } catch (error) {
        console.error("Error al registrar asignacion", error);
        throw error;
      }
  }
  async traer_asignacion(idUsuario) {
    try {
      const asignacion = new Asignacion();
      const asignaciones = await asignacion.traerasignacion(idUsuario);
      const arrayAsignacion = asignaciones.map((asigna) => ({
        id_asignacion: asigna.id_asignacion,
        id_tecnico: asigna.id_tecnico,
        id_equipo: asigna.id_equipo,
        nombre_electrodomestico: asigna.nombre_electrodomestico,
      }));
      return arrayAsignacion;
    } catch (error) {
      console.error("Error al obtener la asignacion", error);
      throw error;
    }
  }

  async traer_reparacion(idUsuario) {
    try {
      const reparacion = new Reparacion();
      const reparaciones = await reparacion.traerrepacion(idUsuario);
      const arrayReparacion = reparaciones.map((repara) => ({
        id_asignacion: repara.id_asignacion,
        id_tecnico: repara.id_tecnico,
        id_equipo: repara.id_equipo,
        nombre_equipo: repara.nombre_equipo,
      }));
      return arrayReparacion;
    } catch (error) {
      console.error("Error al obtener los pedidos en gestor", error);
      throw error;
    }
  }
  async filtrarAsignaciones(idTecnico) {
    try {
      const asignacion = new Asignacion();
      const asignaciones = await asignacion.filtrarAsignaciones(idTecnico);
      const arrayFiltro = asignaciones.map((asigna) => ({
        id: asigna.id,
        nombre_marca: asigna.nombre_marca,
        nombre_modelo: asigna.nombre_modelo,
        nombre_electrodomestico: asigna.nombre_electrodomestico,
        estado: asigna.estado,
      }));
      return arrayFiltro;
    } catch (error) {
      console.error("Error al obtener la asignacion", error);
      throw error;
    }
  }
}

module.exports = GestorAsignacion;