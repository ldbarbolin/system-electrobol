const express = require('express');
const app = express();
const configuraciones = require("./config");
const rutaTecnico = require("./presentacion/rutas/rutaTecnico");
const rutaAdministrador = require("./presentacion/rutas/rutaAdministrador");
const rutaEncargado = require("./presentacion/rutas/rutaEncargado");
const GestorUsuario = require("./logica_negocio/gestor_usuario")

configuraciones(app);

function establecerCookie(res, name, value, options = {}) {
  const defaultOptions = {
    httpOnly: true,
  };

  res.cookie(name, value, { ...defaultOptions, ...options });
}
  
function verificarSesion(req, res, next) {
  if (req.cookies["idUsuario"]) {
    // SI sesión existe, permitir acceso a la ruta
    next();
  } else {
    // SINO redireccionar a la página de ingreso
    res.redirect("/ingreso");
  }
}
  
function redirigirUsuario(res, tipoUsuario) {
  if (tipoUsuario === "EC") {
    // Encargado
    res.redirect("/encargado");
  } else if (tipoUsuario === "TC") {
    // Tecnico
    res.redirect("/tecnico");
  } else if (tipoUsuario === "AD") {
    // Administrador
    res.redirect("/administrador");
  }
}
  
app.get("/", (req, res) => {
  res.redirect("/ingreso");
});

app.get("/ingreso", async (req, res) => {
  const idUsuario = req.cookies["idUsuario"];
  if (typeof idUsuario != "undefined") {
    const gestorUsuario = new GestorUsuario();
    const tipoUsuario = await gestorUsuario.obtenerTipoUsuarioPorId(idUsuario);
    redirigirUsuario(res, tipoUsuario);
  } else {
    res.render("secciones_sistema/vista_ingreso.ejs");
  }
});

app.post("/ingreso", async (req, res) => {
    const { nombreUsuario, contrasena } = req.body;
    const gestorUsuario = new GestorUsuario();
    const usuario = await gestorUsuario.validarUsuario(nombreUsuario, contrasena);
  
    if (usuario) {
      establecerCookie(res, "nombreUsuario", usuario.nombreUsuario);
      establecerCookie(res, "idUsuario", usuario.idUsuario);
      establecerCookie(res, "nombreImgUsuario", usuario.genero);
      redirigirUsuario(res, usuario.tipoUsuario);
    } else {
      res.render("secciones_sistema/vista_ingreso.ejs", { mensaje: true });
    }
  });

app.get("/cerrar_sesion", (req, res) => {
// Elimina las cookies asociadas con el usuario
res.clearCookie("nombreUsuario");
res.clearCookie("idUsuario");
res.clearCookie("nombreImgUsuario");
res.redirect("/ingreso");
});

app.use('/administrador', verificarSesion, rutaAdministrador);
app.use('/encargado', verificarSesion, rutaEncargado);
app.use('/tecnico', verificarSesion, rutaTecnico);

app.listen(3000, ()=>{
console.log("Servidor inicializado en el puerto 3000")
});