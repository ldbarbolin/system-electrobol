const Evaluacion = require("../acceso_datos/evaluacion");
const Repuesto = require("../acceso_datos/repuesto");

class GestorEvaluacion {
    
  async registrar_evaluacion(
    id_reparacion,
    observacion,
    tiempo,
    costototal,
    arrayRepuestosNecesarios,
  ) {
    const estadorecepcion = 3;

    const evaluacion = new Evaluacion();
    const id_ultima_evaluacion = await evaluacion.registrarevaluacion(
      id_reparacion,
      observacion,
      tiempo,
      costototal,
      estadorecepcion,
    );

    const repuesto = new Repuesto();
    const resultado = await repuesto.insertarRepuestoNecesario(
      id_ultima_evaluacion,
      arrayRepuestosNecesarios,
    );

    console.log("Resultado Gestor_Evaluacion");
    console.log(resultado);
    console.log("Final Resultado");
    return resultado;
  }
}

module.exports = GestorEvaluacion;