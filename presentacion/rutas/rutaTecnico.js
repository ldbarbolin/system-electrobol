const express = require('express');
const router = express.Router();
const GestorAsignacion = require("../../logica_negocio/gestor_asignacion")
const GestorRepuesto = require("../../logica_negocio/gestor_repuesto")
const GestorEvaluacion = require("../../logica_negocio/gestor_evaluacion")
const GestorAvance = require("../../logica_negocio/gestor_avance")

router.get("/", async (req, res) => {
    const idUsuario = req.cookies.idUsuario;
    const nombreUsuario = req.cookies.nombreUsuario;
    const nombreImgUsuario = `${req.cookies.nombreImgUsuario}.png`;
    const usu = idUsuario; // cambiar por   "idUsuario"
  
    const gestorAsignacion = new GestorAsignacion();
    const asignaciones = await gestorAsignacion.traer_asignacion(usu);
  
    const reparaciones = await gestorAsignacion.traer_reparacion(usu);
  
    const usuario = { nombre: nombreUsuario, nombreImgUsuario: nombreImgUsuario };
    res.render("vistas_tecnico/index.ejs", {
      usuario: usuario,
      idUsuario: idUsuario,
      datosAsignacion: asignaciones,
      datosReparacion: reparaciones,
    });
  });

  router.get("/registrar_evaluacion", async (req, res) => {
    const idUsuario = req.cookies.idUsuario;
    const nombreUsuario = req.cookies.nombreUsuario;
    const nombreImgUsuario = `${req.cookies.nombreImgUsuario}.png`;
    const id_reparacion = req.query.id;
  
    //const usu = 4; // cambiar por   "idUsuario"
    const usu = idUsuario; // cambiar por   "idUsuario"
  
    const gestorRepuesto = new GestorRepuesto();
    const repuestos = await gestorRepuesto.traer_repuesto();
  
    const usuario = { nombre: nombreUsuario, nombreImgUsuario: nombreImgUsuario };
    res.render("vistas_tecnico/registrar_evaluacion.ejs", {
      usuario: usuario,
      idUsuario: idUsuario,
      datosRepuesto: repuestos,
      idReparacion: id_reparacion,
    });
  });

  router.post("/registrar_evaluacion", async (req, res) => {
    const idUsuario = req.body.idUsuario;
    const nombre = req.body.nombre;
    const arrayRepuestosNecesarios = req.body.arrayRepuestosNecesarios;
    const id_reparacion = req.body.id;
    const observacion = req.body.observacion;
    const tiemporepa = req.body.tiemporepa;
    const costototal = req.body.costo;
  
    const gestorEvaluacion = new GestorEvaluacion();
  
    try {
      const result = await gestorEvaluacion.registrar_evaluacion(
        id_reparacion,
        observacion,
        tiemporepa,
        costototal,
        arrayRepuestosNecesarios,
      );
  
      if (result) {
        res.send(
          JSON.stringify({
            msg: "Se ha realizado la evaluacion correctamente",
          }),
        );
      } else {
        res.send(
          JSON.stringify({
            msg: "Ocurrio un error al interno al registrar avance",
          }),
        );
      }
    } catch (error) {
      console.error("Error al registrar la evaluación:", error);
      res.status(500).send(
        JSON.stringify({
          msg: "Error interno del servidor al registrar la evaluación",
        }),
      );
    }
    //
  });

  router.get("/registrar_avance", async (req, res) => {
    const idUsuario = req.cookies.idUsuario;
    const nombreUsuario = req.cookies.nombreUsuario;
    const nombreImgUsuario = `${req.cookies.nombreImgUsuario}.png`;
  
    const id_reparacion = req.query.id;
    const usu = 4; // cambiar por   "idUsuario"
  
    const gestorRepuesto = new GestorRepuesto();
    const repuestos = await gestorRepuesto.traer_repuesto();
  
    const usuario = { nombre: nombreUsuario, nombreImgUsuario: nombreImgUsuario };
    res.render("vistas_tecnico/registrar_avance.ejs", {
      usuario: usuario,
      idUsuario: idUsuario,
      datosRepuesto: repuestos,
      idReparacion: id_reparacion,
    });
  });

  router.post("/registrar_avance", async (req, res) => {
    const id_reparacion = req.body.id;
  
    const descripcion = req.body.descripcion;
    const avance = req.body.avance;
    console.log("registrar_avance inicio log");
    console.log(descripcion, avance);
    console.log("registrar_avance fin log");
  
    const gestorAvance = new GestorAvance();
    const result = await gestorAvance.registrar_avance(
      id_reparacion,
      descripcion,
      avance,
    );
  
    if (result) {
      res.redirect("/tecnico");
    } else {
      //res.redirect("/tecnico");
      res.send(
        JSON.stringify({
          msg: "Ocurrio un error al interno al registrar avance",
        }),
      );
    }
  });

module.exports = router;