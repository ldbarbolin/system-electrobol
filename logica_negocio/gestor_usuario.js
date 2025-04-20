const Usuario = require("../acceso_datos/usuario")

class GestorUsuario {
    async validarUsuario(nombreUsuario, contrasena) {
        const usuario = new Usuario();
        let respuesta = await usuario.seleccionarUsuarioPorNombreContrasena(
          nombreUsuario,
          contrasena,
        );
        if (respuesta.length > 0) {
          respuesta = respuesta[0];
          return {
            idUsuario: respuesta.id_usuario,
            nombreUsuario: respuesta.nombre_usuario,
            nombre: respuesta.nombre,
            apellidoPaterno: respuesta.apellido_paterno,
            apellidoMaterno: respuesta.apellido_materno,
            ci: respuesta.ci,
            genero: respuesta.genero,
            tipoUsuario: respuesta.tipo_usuario,
            idTipoUsuario: respuesta.id_tipo_usuario,
          };
        } else {
          return false;
        }
    }

    async obtenerTipoUsuarioPorId(idUsuario) {
        const usuario = new Usuario();
        let respuesta = await usuario.seleccionarTipoUsuarioPorIdUsuario(idUsuario);
        if (respuesta.length > 0) {
          return respuesta;
        } else {
          return null;
        }
    }
}


module.exports = GestorUsuario;
  