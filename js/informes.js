const contenedor_modal = document.getElementById("contenedorModal");
const link_compartir = document.getElementById("linkCompartir");
const btn_cancelar = document.getElementById("btnCancelar");
const btnEnviar = document.getElementById("button");
const contenedor_success = document.getElementById("contenedorSuccess");
const contenedor_warning = document.getElementById("contenedorWarning");
const contenedor_error = document.getElementById("contenedorError");
const input_name = document.getElementById("from_name");
const input_email = document.getElementById("email_id");

const mostrarModal = () => {
  contenedor_modal.style.display = "flex";
};

const ocultarModal = () => {
  contenedor_modal.style.display = "none";
};

link_compartir.addEventListener("click", mostrarModal);
btn_cancelar.addEventListener("click", ocultarModal);

const mostrarSuccess = () => {
  contenedor_success.style.display = "flex";
  setTimeout(() => {
    contenedor_success.style.display = "none";
  }, 2000);
};

const mostrarError = () => {
  contenedor_error.style.display = "flex";
  setTimeout(() => {
    contenedor_error.style.display = "none";
  }, 2000);
};

const mostrarWarning = () => {
  contenedor_warning.style.display = "flex";
  setTimeout(() => {
    contenedor_warning.style.display = "none";
  }, 2000);
};

const limpiarCampos = () => {
  input_name.value = "";
  input_email.value = "";
};

btnEnviar.addEventListener("click", function (event) {
  event.preventDefault();
  if (input_name.value == "" || input_email.value == "") {
    mostrarWarning();
  } else {
    btnEnviar.value = "Sending...";

    const serviceID = "default_service";
    const templateID = "template_it1x7io";

    emailjs.sendForm(serviceID, templateID, "#form").then(
      () => {
        btnEnviar.value = "Send Email";
        mostrarSuccess();
        limpiarCampos();
        ocultarModal();
      },
      (err) => {
        btnEnviar.value = "Send Email";
        console.log(JSON.stringify(err));
        mostrarError();
      }
    );
  }
});

/****************************************************************************/
const tablaBody = document.getElementById("tabla-body");
/* Traemos los datos de monedas favoritas */
let monedasFav = JSON.parse(localStorage.getItem("favorites")) || [];
const monedaFavSelec = [];
/* Select moneda */
const selector_moneda = document.getElementById("selecMoneda");
const filtrar_informe = document.getElementById("filtrarInforme");
const monedaSeleccionada = document.getElementById("selecMoneda").value;

function graficoCompraVenta(monedaSeleccionada) {
  const monedaSeleccionadaData = monedasFav.filter(moneda => moneda.moneda === monedaSeleccionada);

  const etiquetas = monedaSeleccionadaData.map(data => data.fecha);
  const compra = monedaSeleccionadaData.map(data => data.compra);
  const venta = monedaSeleccionadaData.map(data => data.venta);

  const ctx = document.getElementById("miGrafica").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: etiquetas,
      datasets: [
        {
          label: `Compra ${monedaSeleccionada}`,
          data: compra,
          borderColor: "blue",
          fill: false,
        },
        {
          label: `Venta ${monedaSeleccionada}`,
          data: venta,
          borderColor: "red",
          fill: false,
        }
      ]
    },
  });
}

const filtrar = () => {
  const monedaSelec = selector_moneda.value;
  monedaFavSelec.length = 0; // Limpiar monedaFavSelec antes de llenarlo nuevamente

  if (monedaSelec === "todas") {
    agregarTodasTabla(monedasFav);
    graficoCompraVentaTodas();
  } else {
    graficoCompraVenta(monedaSelec); // Llamar graficoCompraVenta con la moneda seleccionada
    monedasFav.forEach((dato) => {
      if (dato.moneda === monedaSelec) {
        console.log("Las monedas son IGUALES");
        const datos = {
          moneda: dato.moneda,
          fecha: dato.fecha,
          compra: dato.compra,
          venta: dato.venta,
          variacion: "variacion",
        };
        monedaFavSelec.push(datos);
      }
    });

    if (monedaFavSelec.length > 0) {
      agregarMonedaTabla(monedaFavSelec);
    } else {
      tablaBody.innerHTML =
        `<tr>
          <td colspan="5" >
            No existe la moneda seleccionada en su lista.
          </td>
        </tr>`;
      mostrarError();
    }
  }
};

filtrar_informe.addEventListener("click", () => {
  tablaBody.innerHTML = "";
  filtrar();
});
/* ---- */

const agregarTodasTabla = (monedas) => {
  // Agrupar monedas por tipo
  const monedasAgrupadas = monedas.reduce((acc, dato) => {
    if (!acc[dato.moneda]) {
      acc[dato.moneda] = [];
    }
    acc[dato.moneda].push(dato);
    return acc;
  }, {});

  // Agregar filas a la tabla
  Object.keys(monedasAgrupadas).forEach(moneda => {
    const filasMoneda = monedasAgrupadas[moneda];
    const rowSpan = filasMoneda.length;

    filasMoneda.forEach((dato, index) => {
      const fila = document.createElement("tr");

      if (index === 0) {
        const monedaCell = document.createElement("td");
        monedaCell.textContent = dato.moneda;
        monedaCell.rowSpan = rowSpan;
        fila.appendChild(monedaCell);
      }

      const fechaCell = document.createElement("td");
      const compraCell = document.createElement("td");
      const ventaCell = document.createElement("td");
      const variacionCell = document.createElement("td");

      fechaCell.textContent = dato.fecha;
      compraCell.textContent = dato.compra;
      ventaCell.textContent = dato.venta;
      variacionCell.textContent = "variacion";

      fila.appendChild(fechaCell);
      fila.appendChild(compraCell);
      fila.appendChild(ventaCell);
      fila.appendChild(variacionCell);
      tablaBody.appendChild(fila);
    });
  });
};

const agregarMonedaTabla = (monedas) => {
  const monedaCell = document.createElement("td");
  monedaCell.rowSpan = monedas.length;
  monedaCell.textContent = monedas[0].moneda;

  monedas.forEach((dato, index) => {
    const fila = document.createElement("tr");
    if (index === 0) {
      fila.appendChild(monedaCell);
    }
    const fechaCell = document.createElement("td");
    const compraCell = document.createElement("td");
    const ventaCell = document.createElement("td");
    const variacionCell = document.createElement("td");

    fechaCell.textContent = dato.fecha;
    compraCell.textContent = dato.compra;
    ventaCell.textContent = dato.venta;
    variacionCell.textContent = "variacion";

    fila.appendChild(fechaCell);
    fila.appendChild(compraCell);
    fila.appendChild(ventaCell);
    fila.appendChild(variacionCell);
    tablaBody.appendChild(fila);
  });
};

/*Gráfica con varias líneas*/
//Axis X



function graficoCompraVentaTodas() {
  const etiquetas = [];
  const datasets = [];

  // Crear un objeto para almacenar los datos de cada moneda por fecha
  const datosPorMoneda = {};

  monedasFav.forEach(moneda => {
    if (!etiquetas.includes(moneda.fecha)) {
      etiquetas.push(moneda.fecha);
    }

    if (!datosPorMoneda[moneda.moneda]) {
      datosPorMoneda[moneda.moneda] = { compra: [], venta: [] };
    }

    datosPorMoneda[moneda.moneda].compra.push(moneda.compra);
    datosPorMoneda[moneda.moneda].venta.push(moneda.venta);
  });

  Object.keys(datosPorMoneda).forEach((moneda, index) => {
    datasets.push({
      label: `Compra ${moneda}`,
      data: datosPorMoneda[moneda].compra,
      borderColor: `rgba(${54 + index * 30}, 162, 235, 1)`,
      backgroundColor: `rgba(${54 + index * 30}, 162, 235, 0.2)`,
      borderWidth: 1,
      fill: false,
    });

    datasets.push({
      label: `Venta ${moneda}`,
      data: datosPorMoneda[moneda].venta,
      borderColor: `rgba(${235 - index * 30}, 54, 54, 1)`,
      backgroundColor: `rgba(${235 - index * 30}, 54, 54, 0.2)`,
      borderWidth: 1,
      fill: false,
    });
  });

  console.log(etiquetas);
  console.log(datasets);

  const ctx = document.getElementById("miGrafica").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: etiquetas,
      datasets: datasets,
    },
  });
}


window.onload = () => {
  agregarTodasTabla(monedasFav);
  graficoCompraVentaTodas();
};
