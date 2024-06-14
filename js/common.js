/* --------------- CARGARGAMOS LA API --------------- */

/* https://dolarapi.com/docs/argentina/ */

const dolarApi = async () => {
  try {
    const respuesta = await fetch("https://dolarapi.com/v1/dolares");
    console.log(respuesta);
  } catch (error) {
    console.log(error);
  }
};
dolarApi();

// HOLA SOY UN COMENTARIO JAJA