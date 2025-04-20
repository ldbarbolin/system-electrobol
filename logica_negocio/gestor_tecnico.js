const Tecnico = require("../acceso_datos/tecnico");

class GestorTecnico {
  async traerTecnicosYCantAsignaciones() {
    try {
      const tecnico = new Tecnico();
      const arrayTecnicos = await tecnico.traerTecnicosYCantAsignaciones();
      return arrayTecnicos;
    } catch (error) {
      console.error("Error al traer la cantidad de asignaciones:", error);
      throw error;
    }
  }

  async traerTecnicos(){
    try{
      const tecnico = new Tecnico();
      const arrayDatos = await tecnico.traerTecnicos();
      return arrayDatos;
    }catch(error){
      console.error("Error al traer los datos de tecnico en el gestor:", error);
      throw error;
    }
  }
}
module.exports = GestorTecnico;