/* --------------- CARGARGAMOS LA API --------------- */

/* https://dolarapi.com/docs/argentina/ */

const selector_moneda = document.getElementById("selecMoneda");

const obtenerYAlmacenarDatosApi = async (url) => {
  try {
    const respuesta = await fetch(url);
    if (!respuesta.ok) {
      throw new Error(`Error en la petición: ${respuesta.statusText}`);
    }
    const datos = await respuesta.json();

    // Almacenar datos en localStorage con una clave específica
    localStorage.setItem('datosMoneda', JSON.stringify(datos));
    console.log('Datos almacenados en localStorage:', datos);
  } catch (error) {
    console.error('Error al obtener datos de la API:', error);
  }
};

const iniciarProceso = () => {
  const url = `https://dolarapi.com/v1/${selector_moneda.value}`; // URL de la API

  // Llamar a la función cuando la página se carga
  obtenerYAlmacenarDatosApi(url);

  // Configurar el intervalo para llamar a la función cada 5 minutos
  setInterval(() => {
    obtenerYAlmacenarDatosApi(url);
  }, 300000); // 300,000 milisegundos = 5 minutos
};

// Evento que inicia el proceso cuando el cuerpo de la página se carga
document.body.onload = iniciarProceso;



// const dolarApi = async () => {
//   try {
//     const respuesta = await fetch(
//       `https://dolarapi.com/v1/${selector_moneda.value}`
//     );
//     const data = await respuesta.json();
//     for (const dato in data) {
//       if (Object.hasOwnProperty.call(data, dato)) {
//         const element = data[dato];
//         console.log(element);
//         /* console.log(element.moneda);
//         console.log(element.casa);
//         console.log(element.nombre);
//         console.log(element.compra);
//         console.log(element.venta);
//         console.log(element.fechaActualizacion); */
//       }
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

/* dolarApi(); */

//filtrar_pizarra.addEventListener("load", dolarApi);
