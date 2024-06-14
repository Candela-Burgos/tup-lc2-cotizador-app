/* --------------- CARGARGAMOS LA API --------------- */

/* https://dolarapi.com/docs/argentina/ */

const filtrar_pizarra = document.getElementById("filtrarPizarra");
const selector_moneda = document.getElementById("selecMoneda");

const dolarApi = async () => {
  try {
    const respuesta = await fetch(
      `https://dolarapi.com/v1/${selector_moneda.value}`
    );
    const data = await respuesta.json();
    for (const dato in data) {
      if (Object.hasOwnProperty.call(data, dato)) {
        const element = data[dato];
        console.log(element);
        /* console.log(element.moneda);
        console.log(element.casa);
        console.log(element.nombre);
        console.log(element.compra);
        console.log(element.venta);
        console.log(element.fechaActualizacion); */
      }
    }
  } catch (error) {
    console.log(error);
  }
};

/* dolarApi(); */

filtrar_pizarra.addEventListener("click", dolarApi);
