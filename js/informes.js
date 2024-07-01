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
