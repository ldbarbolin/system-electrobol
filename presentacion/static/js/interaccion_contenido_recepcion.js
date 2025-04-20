const contenedor = document.getElementById("container");
let btSeleccionar;

async function reqBuscarCliente() {
  const url = "/encargado/buscar_cliente";
  const carnetCliente = document.getElementById("codigoCliente").value;
  const datos = {
    carnetCliente: carnetCliente,
  };
  try {
    const respuesta = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    });
    if (!respuesta.ok) {
      throw new Error(
        "Error en la solicitud POST buscarCliente: " + respuesta.statusText,
      );
    }
    const datosRetornados = await respuesta.json();
    console.log(datosRetornados)
    return datosRetornados;
  } catch (error) {
    console.error("Error al hacer la petición POST buscarCliente:", error);

    throw error;
  }
}

async function registrarAsignacion(id_recepcion, id_tecnico) {
  const respuesta = confirm(
    "¿Estás seguro de que deseas asignar a este tecnico?",
  );
  if (!respuesta) {
    return;
  }
  const url = `registrar_asignacion?id_recepcion=${id_recepcion}&id_tecnico=${id_tecnico}`;
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro de servidor");
      }
      return response.json();
    })
    .then((data) => {
      alert(data);
      window.location.href = "/encargado/";
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error); // Maneja los errores de la solicitud
    });
}

async function reqRegistrarRecepcion() {
  const url = "/encargado/registrar_recepcion";
  const datosCliente = await reqBuscarCliente();
  let idCliente = datosCliente.idCliente
  const idEncargado = document.getElementById("spnIdUsuario").textContent;
  let idEquipo_ = document.getElementById("idEquipo");
  const datos = {
    idCliente: idCliente,
    idEncargado: idEncargado,
    idEquipo: idEquipo_.value,
  };
  try {
    const respuesta = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    });
    if (!respuesta.ok) {
      throw new Error(
        "Error en la solicitud POST buscarCliente: " + respuesta.statusText,
      );
    }
    const datosRetornados = await respuesta.json();
    alert(datosRetornados);
  } catch (error) {
    console.error("Error al hacer la petición POST buscarCliente:", error);
    throw error;
  }
}

async function reqTraerEquiposRegistrados() {
  const carnet = document.getElementById("codigoCliente").value;
  const datos = {
    idCliente: carnet,
  };
  try {
    const respuesta = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    });
    if (!respuesta.ok) {
      throw new Error(
        "Error en la solicitud POST reqTraerEquiposRegistrados: " +
          respuesta.statusText,
      );
    }
    const datosRetornados = await respuesta.json();
  } catch (error) {
    console.error(
      "Error al hacer la petición POST reqTraerEquiposRegistrados:",
      error,
    );
    throw error;
  }
}

async function mostrarCliente() {
  const datosCliente = await reqBuscarCliente();

  const html = `
  <table>
          <tr>
              <td>CI:${datosCliente.idCliente} ${datosCliente.ciCliente} ${datosCliente.nombreCliente} ${datosCliente.apellidoPaterno} ${datosCliente.apellidoMaterno}</td>
              
          </tr>
  </table>
  <br>
  <label>Equipos del cliente:</label>
  
  `;
  contenedor.innerHTML = html;
  mostrarEquiposRegistrados(datosCliente.equipos);
  contenedor.innerHTML += `<br><br>
  <button onclick="reqRegistrarRecepcion()">Registrar recepción</button>`;
  btSeleccionar = document.getElementById("btSeleccionar");
}

function btSeleccionarCliente() {
  const inputIdCliente = document.getElementById("codigoCliente");
  if (inputIdCliente.disabled === true) {
    btSeleccionar.textContent = "Seleccionar";
    btSeleccionar.addEventListener("mouseover", function () {
      this.textContent = "Seleccionar";
    });
    inputIdCliente.disabled = false;
  } else {
    btSeleccionar.textContent = "Seleccionado";
    btSeleccionar.addEventListener("mouseover", function () {
      this.textContent = "Quitar selección";
    });

    inputIdCliente.disabled = true;
  }
}

function mostrarEquiposRegistrados(datosEquiposCliente) {
  let html = '<select id="idEquipo">';
  datosEquiposCliente.forEach((equipo) => {
    html += `<option value="${equipo.id_equipo}">${equipo.nombre_electrodomestico} ${equipo.nombre_marca} ${equipo.nombre_modelo}</option>`;
  });
  html += "</select>";
  contenedor.innerHTML += html;
}
