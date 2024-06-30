(function () {
  emailjs.init({
    publicKey: "YOUR_PUBLIC_KEY",
  });
})();

const contenedor_modal = document.getElementById("contenedorModal");
const link_compartir = document.getElementById("linkCompartir");
const btn_cancelar = document.getElementById("btnCancelar");
const btn_enviar = document.getElementById("btnEnviar");

const mostrarModal = () => {
  contenedor_modal.style.display = "flex";
};

const ocultarModal = () => {
  contenedor_modal.style.display = "none";
};

link_compartir.addEventListener("click", mostrarModal);
btn_cancelar.addEventListener("click", ocultarModal);
// btn_enviar.addEventListener("click", enviarForm);
