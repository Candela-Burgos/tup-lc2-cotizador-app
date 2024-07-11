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
/* console.log(monedasFav); */
const monedaFavSelec = [];
/* Select moneda */
const selector_moneda = document.getElementById("selecMoneda");
const filtrar_informe = document.getElementById("filtrarInforme");

const filtrar = () => {
  const monedaSelec = selector_moneda.value;
  console.log(monedaSelec);

  if (monedaSelec == "todas") {
    agregarTodasTabla(monedasFav);
    console.log(monedasFav);
  } else {
    monedasFav.forEach((dato) => {
      /* console.log(dato.moneda, "= moneda favorita"); */
      if (dato.moneda == monedaSelec) {
        console.log("las monedas son IGUALES");
        const datos = {
          moneda: dato.moneda,
          fecha: dato.fecha,
          compra: dato.compra,
          venta: dato.venta,
          variacion: "variacion",
        };
        monedaFavSelec.push(datos);
        /* console.log(monedaFavSelec); */
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
  monedaFavSelec.length = 0;
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

function graficoCompraVenta() {
  const etiquetas = [];
  let compra = [];
  let venta
  const ctx = document.getElementById("miGrafica").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: etiquetas,
      datasets: [{
        label: "Ventas por mes",
        data: datos,
        borderColor: "blue",
        fill: false
      }]
    }
  });
}
const etiquetas = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];
//Datos
const compra = [100, 150, 120, 200, 10, 20, 100, 100, 150, 120, 200, 10];
const venta = [80, 120, 140, 180, 0, 50, 56, 140, 180, 0, 50, 56];
const ctx = document.getElementById("miGrafica").getContext("2d");
new Chart(ctx, {
  type: "line",
  data: {
    labels: etiquetas,
    datasets: [
      //Porción de código que se repite por cada ítem que se requiere dibujar
      {
        //Ejemplo de gráfica con relleno
        label: "Dolar Blue",
        data: compra,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)", // Color de fondo
        borderWidth: 1,
        fill: true,
      },
      /* {
        label: "Dolar Oficial",
        data: datosLinea2,
        borderColor: "green",
        borderWidth: 1,
        fill: false,
      },
      {
        label: "Euro",
        data: datosLinea3,
        borderColor: "red",
        fill: false,
      }, */
    ],
  },
});

window.onload = () => {
  agregarTodasTabla(monedasFav);
};
