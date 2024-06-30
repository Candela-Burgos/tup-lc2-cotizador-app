/* --------------- CARGARGAMOS LA API --------------- */

/* https://dolarapi.com/docs/argentina/ */

const pizzarra_cotz = document.getElementById("cotizaciones");

const procesoIniciado = async() => {

  const monedas = {
    USD : "https://dolarapi.com/v1/dolares",
    cotizaciones: "https://dolarapi.com/v1/cotizaciones"

  }

  
const guardarFavorito = (e) => {

  const iconoEstrella = e.currentTarget.querySelector('.fa-star');

  if(iconoEstrella.classList.contains("pintada")){
    console.log("Ya se encuentra guardada en favoritos")
  } else{
    iconoEstrella.classList.add('pintada');

    const costizacionMasCerca = e.currentTarget.closest('.cotizacion'); 
    const moneda = costizacionMasCerca.querySelector('.moneda p').textContent; 
    const compra = costizacionMasCerca.querySelector('.compra p').textContent;
    const venta = costizacionMasCerca.querySelector('.venta p').textContent;
    let fecha = new Date();
    const dia = fecha.getDate();
    const mes = fecha.getMonth()+1;
    const año = fecha.getFullYear();
    fecha = `${dia}/${mes}/${año}`
    const favoriteData = {
        moneda,
        compra,
        venta,
        fecha
    };

    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.push(favoriteData);
    localStorage.setItem('favorites', JSON.stringify(favorites));

    alert(`${moneda} guardado como favorito.`);

  }

};

const addFavoriteListeners = () => {
  document.querySelectorAll('.botonFavorito').forEach(button => {
      button.addEventListener('click', guardarFavorito);
  });
};



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

    addFavoriteListeners();
}


const comentarios = document.querySelectorAll(".comentario");
comentarios.forEach(comentario => comentario.style.display = 'none');

const rotadorComentarios = () =>{
  let index = 0;
  comentarios[index].style.display = 'block';

  setInterval(() => {
    comentarios.forEach(comentario => comentario.style.display = 'none');
    comentarios[index].style.display = 'block';
    index = (index + 1) % comentarios.length;
  }, 5000);

}

rotadorComentarios()
procesoIniciado()


setInterval(() => {
  pizzarra_cotz.innerHTML=""
  procesoIniciado()
}, 50000);

//localStorage.clear()