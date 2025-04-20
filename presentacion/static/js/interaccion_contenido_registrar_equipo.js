const contenedor = document.getElementById("container");
let btSeleccionar;
let idCliente;

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
    idCliente = datosRetornados.idCliente;
    return datosRetornados;
  } catch (error) {
    console.error("Error al hacer la petición POST buscarCliente:", error);

    throw error;
  }
}

async function mostrarCliente() {
  const datosCliente = await reqBuscarCliente();

  const html = `
  <table>
          <tr>
              <td>${datosCliente.ciCliente} </td>
              <td>${datosCliente.nombreCliente} </td>
              <td>${datosCliente.apellidoPaterno} </td>
              <td>${datosCliente.apellidoMaterno} </td>
          </tr>
  </table>`;
  contenedor.innerHTML = html;
  contenedor.innerHTML += `<br><br>
  <button onclick="reqRegistrarEquipo()">Registrar Equipo</button>`;
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

    inputIdCliente.disabled = false;
  }
}

async function reqRegistrarEquipo() {
  const url = "/encargado/registrar_equipo";
  const datosCliente = await reqBuscarCliente();
  let idCliente = datosCliente.idCliente
  let modelo = document.getElementById("nombre_modelo").value
  let marca = document.getElementById("idMarca").value
  let electrodomestico= document.getElementById("idElectrodomestico").value
  const datos = {
    idCliente: idCliente,
    modelo: modelo,
    marca: marca,
    electrodomestico: electrodomestico,
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
    console.error("Error al hacer la petición POST registrar Equipo:", error);
    throw error;
  }
}


