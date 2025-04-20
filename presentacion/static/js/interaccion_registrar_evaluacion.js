let arrayRepuestosNecesarios = [];

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formularioReg");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const data = { arrayRepuestosNecesarios };
    formData.forEach((value, key) => {
      data[key] = value;
    });
    if (data.costo === 0 || data.costo === "") {
      alert("El costo no puede ser 0");
      return;
    }

    fetch("/tecnico/registrar_evaluacion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        let mensaje = "evaluacion registrada";
        //alert(data.msj);
        alert(mensaje);
        window.location.href = "/tecnico";
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
});

function btClickAdicionar(cod, nombre, valor) {
  let cantidad = Number(prompt("Introduzca cantidad de repuestos"));

  // Verificar si la cantidad es mayor que cero
  if (cantidad > 0) {
    const tBodyRepuestosNecesarios = document.getElementById(
      "tBodyRepuestosNecesarios",
    );

    const total = Number(valor) * cantidad;
    const index = arrayRepuestosNecesarios.findIndex(
      (repuesto) => repuesto.idRepuesto === cod,
    );

    if (index !== -1) {
      // Si el repuesto ya está en el array, suma la cantidad y el total
      arrayRepuestosNecesarios[index].cantidad += cantidad;
      arrayRepuestosNecesarios[index].total += total;

      // Actualizar la cantidad en la fila correspondiente en la tabla HTML
      const row = document.getElementById(`fl-${cod}`);
      if (row) {
        row.cells[2].textContent = arrayRepuestosNecesarios[index].cantidad;
        row.cells[3].textContent = arrayRepuestosNecesarios[index].total;
      }
    } else {
      // Si el repuesto no está en el array, añádelo
      tBodyRepuestosNecesarios.innerHTML += ` 
        <tr id="fl-${cod}">
           <td>${cod}</td>
           <td>${nombre}</td>
           <td>${cantidad}</td>
           <td>${total}</td>
           <td>
            <button type="button" onclick="btClickQuitar('${cod}', ${valor})">Quitar</button>
          </td>
        </tr>`;

      arrayRepuestosNecesarios.push({
        idRepuesto: cod,
        nombreRepuesto: nombre,
        cantidad: cantidad,
        total: total,
      });
    }
    //actualizar costo
    let totalRepuestos = sumarTotales(arrayRepuestosNecesarios);
    alert(`El total de repuestos es: ${totalRepuestos}`);
    //actualizarCostoTotal();
    //
  } else {
    alert("No se adicionaron repuestos");
  }
}

//
//
function btClickQuitar(cod, valor) {
  const cantidadToRemove = Number(prompt("Introduzca cantidad a quitar"));

  // Buscar el índice del repuesto en el array
  const index = arrayRepuestosNecesarios.findIndex(
    (repuesto) => repuesto.idRepuesto === cod,
  );

  if (index !== -1) {
    // Verificar si la cantidad a eliminar es mayor que cero
    if (cantidadToRemove > 0) {
      // Reducir la cantidad del repuesto en el array
      arrayRepuestosNecesarios[index].cantidad -= cantidadToRemove;
      let totalremover = cantidadToRemove * valor;
      arrayRepuestosNecesarios[index].total -= totalremover;
      //
      // arrayRepuestosNecesarios[index].total -= cantidadToRemove;

      // Actualizar la cantidad en la fila correspondiente en la tabla HTML
      const row = document.getElementById(`fl-${cod}`);
      if (row) {
        row.cells[2].textContent = arrayRepuestosNecesarios[index].cantidad;
        row.cells[3].textContent = arrayRepuestosNecesarios[index].total;
      }

      // Si la cantidad llega a cero, eliminar el repuesto de la lista
      if (arrayRepuestosNecesarios[index].cantidad <= 0) {
        arrayRepuestosNecesarios.splice(index, 1);
        if (row) {
          row.remove(); // Eliminar la fila de la tabla
        }
      }
      //Actualizar costo
      //actualizarCostoTotal();
      let totalRepuestos = sumarTotales(arrayRepuestosNecesarios);
      alert(`El total de repuestos es: ${totalRepuestos}`);
      //
    } else {
      alert("No se restaron repuestos");
    }
  } else {
    alert("El repuesto no se encuentra en la lista.");
  }
}

function actualizarCostoTotal() {
  // Calcular el costo total sumando los totales de cada repuesto en la lista
  let costoTotal = arrayRepuestosNecesarios.reduce(
    (total, repuesto) => total + repuesto.total,
    0,
  );

  // Actualizar el valor del campo de entrada costo
  const costoInput = document.querySelector("input[name='costo']");
  if (costoInput) {
    costoInput.value = costoTotal;
  }
}

// Definir la función sumarTotales
function sumarTotales(array) {
  let total = 0;
  array.forEach((repuesto) => {
    total += repuesto.total;
  });
  ///

  // Obtener el elemento input con name="costo"
  const costoInput = document.querySelector('input[name="costo"]');
  // Verificar si el total es mayor que cero
  if (total > 0) {
    // Establecer el valor del input con el total calculado
    costoInput.value = total;
  } else {
    // Si el total es menor o igual a cero, establecer el valor del input como null
    costoInput.value = null;
  }

  ///
  return total;
}
