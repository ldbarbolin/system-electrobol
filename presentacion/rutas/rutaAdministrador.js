const express = require('express');
const router = express.Router();
const GestorTecnico = require("../../logica_negocio/gestor_tecnico");
const GestorAsignacion = require("../../logica_negocio/gestor_asignacion");

router.get("/", (req, res) => {
    const idUsuario = req.cookies.idUsuario;
    const nombreUsuario = req.cookies.nombreUsuario;
    const nombreImgUsuario = `${req.cookies.nombreImgUsuario}.png`;
  
    const usuario = {
        idUsuario: idUsuario,
        nombreUsuario: nombreUsuario,
        nombreImgUsuario: nombreImgUsuario,
      };
    res.render("vistas_Admin/index.ejs", {
        usuario: usuario,
    });
});

router.get("/reportes",async (req, res) => {
    const idUsuario = req.cookies.idUsuario;
    const nombreUsuario = req.cookies.nombreUsuario;
    const nombreImgUsuario = `${req.cookies.nombreImgUsuario}.png`;

    const gestor_tecnico = new GestorTecnico();
    const datosTecnico = await gestor_tecnico.traerTecnicos();

    const usuario = {
    idUsuario: idUsuario,
    nombreUsuario: nombreUsuario,
    nombreImgUsuario: nombreImgUsuario,
  };
    res.render("vistas_Admin/reportes.ejs", {
        usuario: usuario,
        datosTecnico:datosTecnico,
    });
});

router.post("/reportes", async (req, res) => {
    const idTecnico = req.body.tecnicos;

    const gestorAsignacion = new GestorAsignacion();
    const result = await gestorAsignacion.filtrarAsignaciones(idTecnico);

    // Responde con los datos filtrados en formato JSON
    res.json(result);
});


  
module.exports = router;