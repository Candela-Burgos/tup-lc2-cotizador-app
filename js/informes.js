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
/*Gráfica con varias líneas*/
//Axis X
const etiquetas = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Abril",
  "Mayo",
  "junio",
];
//Datos
const datosLinea1 = [100, 150, 120, 200, 10, 20, 100];
const datosLinea2 = [80, 120, 140, 180, 0, 50, 56];
const datosLinea3 = [88, 100, 14, 200, 20, 0, 80];
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
        data: datosLinea1,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)", // Color de fondo
        borderWidth: 1,
        fill: true,
      },
      {
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
      },
    ],
  },
});
