/* --------------- CARGARGAMOS LA API --------------- */

/* https://dolarapi.com/docs/argentina/ */

const pizzarra_cotz = document.getElementById("cotizaciones");

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
          cotz.setAttribute('data-moneda', 'USD')
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
             <i class="fa-solid fa-star"></i>
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
          cotz.setAttribute('data-moneda', dataCotz[i].moneda)
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
             <i class="fa-solid fa-star"></i>
           </button>
          `
          pizzarra_cotz.appendChild(cotz)
       }

       /* Falta cambiar la fecha en que se actualizan las cotizaciones */
      }

    }
    catch(error){
      console.log(error)
    }

    
}
procesoIniciado()

setInterval(function(){
  pizzarra_cotz.innerHTML=""
  procesoIniciado()
}, 50000);