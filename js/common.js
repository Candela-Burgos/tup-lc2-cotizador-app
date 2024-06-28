/* --------------- CARGARGAMOS LA API --------------- */

/* https://dolarapi.com/docs/argentina/ */


const selector_moneda = document.getElementById("selecMoneda");
const filtrar_pizarra = document.getElementById("filtrarPizarra");
const pizzarra_cotz = document.getElementById("cotizaciones");
const filtroPizarra = () => {

  if (selector_moneda.value == "todas"){

  }
}

const procesoIniciado = async() => {

  const monedas = {
    USD : "https://dolarapi.com/v1/dolares",
    cotizaciones: "https://dolarapi.com/v1/cotizaciones"

  }

    try {
      const respuestaUSD = await fetch(monedas.USD)
      const respuestaCotz = await fetch(monedas.cotizaciones)
      if (respuestaUSD.ok){
        const dataUSD = await respuestaUSD.json()
        for (let i = 0; i < dataUSD.length; i++) {
          
          const cotz = document.createElement("div")
          cotz.classList.add('cotizacion')
          cotz.innerHTML = 
          `
          <div class="moneda">
             <p>${dataUSD[i].nombre}</p>
             <div class="compraventa">
               <div class="compra">
                 <h5>COMPRA</h5>
                 <p>${dataUSD[i].compra}</p>
               </div>
               <div class="venta">
                 <h5>VENTA</h5>
                 <p>${dataUSD[i].venta}</p>
               </div>
             </div>
           </div>
           <button type="button" class="botonFavorito">
             <i class="fa-solid fa-star pintada"></i>
           </button>
          `
          pizzarra_cotz.appendChild(cotz)
        
       }
      }
      if (respuestaCotz.ok){
        const dataCotz = await respuestaCotz.json()
        for (let i = 0; i < dataCotz.length; i++) {
          const cotz = document.createElement("div")
          cotz.classList.add('cotizacion')
          cotz.innerHTML = 
          `
          <div class="moneda">
             <p>${dataCotz[i].nombre}</p>
             <div class="compraventa">
               <div class="compra">
                 <h5>COMPRA</h5>
                 <p>${dataCotz[i].compra}</p>
               </div>
               <div class="venta">
                 <h5>VENTA</h5>
                 <p>${dataCotz[i].venta}</p>
               </div>
             </div>
           </div>
           <button type="button" class="botonFavorito">
             <i class="fa-solid fa-star pintada"></i>
           </button>
          `
          pizzarra_cotz.appendChild(cotz)
       }
      }

    }
    catch(error){
      console.log(error)
    }

    
}
procesoIniciado()

setInterval(function(){
  procesoIniciado()
}, 50000);







// const selector_moneda = document.getElementById("selecMoneda");

// const obtenerYAlmacenarDatosApi = async (url) => {
//   try {
//     const respuesta = await fetch(url);
//     if (!respuesta.ok) {
//       throw new Error(`Error en la petición: ${respuesta.statusText}`);
//     }
//     const datos = await respuesta.json();

//     // Almacenar datos en localStorage con una clave específica
//     localStorage.setItem('datosMoneda', JSON.stringify(datos));
//     console.log('Datos almacenados en localStorage:', datos);
//   } catch (error) {
//     console.error('Error al obtener datos de la API:', error);
//   }
// };

// const iniciarProceso = () => {
//   const url = `https://dolarapi.com/v1/${selector_moneda.value}`; // URL de la API

//   // Llamar a la función cuando la página se carga
//   obtenerYAlmacenarDatosApi(url);

//   // Configurar el intervalo para llamar a la función cada 5 minutos
//   setInterval(() => {
//     obtenerYAlmacenarDatosApi(url);
//   }, 300000); // 300,000 milisegundos = 5 minutos
// };

// // Evento que inicia el proceso cuando el cuerpo de la página se carga
// document.body.onload = iniciarProceso;



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
