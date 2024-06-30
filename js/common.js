const comentarios = document.querySelectorAll(".comentario");
comentarios.forEach((comentario) => (comentario.style.display = "none"));

const rotadorComentarios = () => {
  let index = 0;
  comentarios[index].style.display = "block";

  setInterval(() => {
    comentarios.forEach((comentario) => (comentario.style.display = "none"));
    comentarios[index].style.display = "block";
    index = (index + 1) % comentarios.length;
  }, 5000);
};

rotadorComentarios();
//localStorage.clear()
