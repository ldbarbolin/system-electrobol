const express = require('express');
const router = express.Router();
const GestorEquipo = require("../../logica_negocio/gestor_equipo");
const GestorCliente = require("../../logica_negocio/gestor_cliente");
const GestorTecnico = require("../../logica_negocio/gestor_tecnico");
const GestorAsignacion = require("../../logica_negocio/gestor_asignacion")

router.get("/", (req, res) => {
    const idUsuario = req.cookies.idUsuario;
    const nombreUsuario = req.cookies.nombreUsuario;
  
    const usuario = { nombreUsuario: nombreUsuario };
    res.render("vistas_Encargado/index.ejs", {
        usuario: usuario,
    });
});

router.get("/registrar_equipo", async (req, res) => {
  const idUsuario = req.cookies.idUsuario;
  const nombreUsuario = req.cookies.nombreUsuario;
  const nombreImgUsuario = '${req.cookies.nombreImgUsuario}.png';

  const gestorEquipo = new GestorEquipo();
  const datosMarca = await gestorEquipo.traerMarca();
  const datosEle = await gestorEquipo.traerElectrodomestico();

  const usuario = {
    idUsuario: idUsuario,
    nombreUsuario: nombreUsuario,
    nombreImgUsuario: nombreImgUsuario,
  };
  
  res.render("vistas_Encargado/secciones_encargado/registrar_equipo", {
    usuario: usuario,
    datosMarca: datosMarca,
    datosEle: datosEle,
  });
});

router.get("/registrar_recepcion", async (req, res) => {
  const idUsuario = req.cookies.idUsuario;
  const nombreUsuario = req.cookies.nombreUsuario;
  const nombreImgUsuario = `${req.cookies.nombreImgUsuario}.png`;

  const usuario = {
    idUsuario: idUsuario,
    nombreUsuario: nombreUsuario,
    nombreImgUsuario: nombreImgUsuario,
  };
  res.render("vistas_encargado/secciones_encargado/registrar_recepcion", {
    usuario: usuario,
  });
});

router.post("/buscar_cliente", async (req, res) => {
  const carnetCliente = req.body.carnetCliente;
  const gestorCliente = new GestorCliente();
  const gestorEquipo = new GestorEquipo();
  const respuestaEquipo = await gestorEquipo.traerEquiposPorCiCliente(carnetCliente);
  const respuestaCliente = await gestorCliente.traerDatosClientePorCi(carnetCliente);

  const respuesta = {
    idCliente: respuestaCliente[0].id,
    nombreCliente: respuestaCliente[0].nombre,
    apellidoPaterno: respuestaCliente[0].apellido_paterno,
    apellidoMaterno: respuestaCliente[0].apellido_materno,
    ciCliente: respuestaCliente[0].ci,
    equipos: respuestaEquipo,
  };

  res.send(JSON.stringify(respuesta));
});

router.post("/registrar_recepcion", async (req, res) => {
  const idEncargado = req.body.idEncargado;
  const idEquipo = req.body.idEquipo;
  const gestorEquipo = new GestorEquipo();
  const resp = await gestorEquipo.registrarRecepcionEquipo(
    idEncargado,
    idEquipo,

  );
  if (resp) {
    res.redirect("/tecnico");
  } else {
    let msj = "Ocurrio un error en registro de la recepcion del equipo";
    res.send(JSON.stringify(msj));
  }
});

router.post("/registrar_equipo", async (req, res) => {
  const modelo = req.body.modelo;
  const marca = req.body.marca;
  const electrodomestico = req.body.electrodomestico;
  const idCliente = req.body.idCliente;
  const gestorEquipo = new GestorEquipo();
  const resp = await gestorEquipo.insertarEquipo(
    modelo,
    marca,
    electrodomestico,
    idCliente,
  );

  console.log(resp)
  if (resp) {
    res.redirect("/tecnico");
  } else {
    let msj = "Ocurrio un error al registrar el equipo";
    res.send(JSON.stringify(msj));
  }
});

router.get("/asignar_equipo", async (req, res) => {
  const idUsuario = req.cookies.idUsuario;
  const nombreUsuario = req.cookies.nombreUsuario;
  const nombreImgUsuario = `${req.cookies.nombreImgUsuario}.png`;
  const idRecepcionEquipo = req.query.id_recepcion;

  const usuario = {
    idUsuario: idUsuario,
    nombreUsuario: nombreUsuario,
    nombreImgUsuario: nombreImgUsuario,
  };

  const gestorEquipo = new GestorEquipo();
  if (idRecepcionEquipo) {
    const gestorTecnico = new GestorTecnico();
    const datosEquipo = await gestorEquipo.traerEquipoPorIdRecepcion(idRecepcionEquipo);
    const arrayTecnicos = await gestorTecnico.traerTecnicosYCantAsignaciones();

    res.render("vistas_encargado/secciones_encargado/pasar_a_evaluacion", {
      usuario: usuario,
      datosEquipo: datosEquipo,
      arrayTecnicos: arrayTecnicos,
    });
  } else {
    const arrayEquiposSinAsignacion = await gestorEquipo.traerEquiposSingAsignacionDesc();
    res.render("vistas_encargado/secciones_encargado/asignar_equipo", {
      usuario: usuario,
      arrayEquiposSinAsignacion: arrayEquiposSinAsignacion,
    });
  }
});

router.get("/registrar_asignacion", async (req, res) => {
  const idRecepcionEquipo = req.query.id_recepcion;
  const idTecnico = req.query.id_tecnico;
  const gestorAsignacion = new GestorAsignacion();
  
  const respuesta = await gestorAsignacion.registrarAsignacion(idRecepcionEquipo,idTecnico,);
  
  if (respuesta) {
    let msj = "Se registro la asignacion del equipo";
    res.send(JSON.stringify(msj));
  } else {
    let msj = "No se registro la asignacion del equipo";
    res.send(JSON.stringify(msj));
  }
});


module.exports = router;