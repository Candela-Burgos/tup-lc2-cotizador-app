const btnEnviar = document.getElementById("button");
const btnLimpiar = document.getElementById("btnLimpiar");
const contenedor_success = document.getElementById("contenedorSuccess");
const contenedor_warning = document.getElementById("contenedorWarning");
const contenedor_error = document.getElementById("contenedorError");
const input_name = document.getElementById("from_name");
const input_email = document.getElementById("email_id");
const textarea = document.getElementById("message");

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
  textarea.value = "";
};

btnLimpiar.addEventListener("click", limpiarCampos);

btnEnviar.addEventListener("click", function (event) {
  event.preventDefault();
  if (
    input_name.value == "" ||
    input_email.value == "" ||
    textarea.value == ""
  ) {
    mostrarWarning();
  } else {
    btnEnviar.value = "Sending...";

    const serviceID = "default_service";
    const templateID = "template_lkk7fqk";

    emailjs.sendForm(serviceID, templateID, "#form").then(
      () => {
        btnEnviar.value = "Send Email";
        mostrarSuccess();
        limpiarCampos();
      },
      (err) => {
        btnEnviar.value = "Send Email";
        console.log(JSON.stringify(err));
        mostrarError();
      }
    );
  }
});
