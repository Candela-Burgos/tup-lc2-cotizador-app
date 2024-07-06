/* --------------- CARGARGAMOS LA API --------------- */

/* https://dolarapi.com/docs/argentina/ */

const pizzarra_cotz = document.getElementById("cotizaciones");
const fecha_actualizada = document.getElementById("fechaActualizada");

let fechaActual = new Date();
const diaActual = fechaActual.getDate();
const mesActual = fechaActual.getMonth() + 1;
const añoActual = fechaActual.getFullYear();
fechaActual = `${diaActual}/${mesActual}/${añoActual}`;
console.log(fechaActual);

const procesoIniciado = async () => {
  const monedas = {
    USD: "https://dolarapi.com/v1/dolares",
    cotizaciones: "https://dolarapi.com/v1/cotizaciones",
  };

  const guardarFavorito = (e) => {
    const iconoEstrella = e.currentTarget.querySelector(".fa-star");
    if (iconoEstrella.classList.contains("pintada")) {
      console.log("Ya se encuentra guardada en favoritos");
    } else {
      iconoEstrella.classList.add("pintada");

      const costizacionMasCerca = e.currentTarget.closest(".cotizacion");
      const moneda = costizacionMasCerca.querySelector(".moneda p").textContent;
      const compra = costizacionMasCerca.querySelector(".compra p").textContent;
      const venta = costizacionMasCerca.querySelector(".venta p").textContent;
      let fecha = new Date();
      const dia = fecha.getDate();
      const mes = fecha.getMonth() + 1;
      const año = fecha.getFullYear();
      fecha = `${dia}/${mes}/${año}`;
      const favoriteData = {
        moneda,
        compra,
        venta,
        fecha,
      };

      let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      favorites.push(favoriteData);
      localStorage.setItem("favorites", JSON.stringify(favorites));

      alert(`${moneda} guardado como favorito.`);
    }
  };

  const addFavoriteListeners = () => {
    document.querySelectorAll(".botonFavorito").forEach((button) => {
      button.addEventListener("click", guardarFavorito);
    });
  };

  try {
    const respuestaUSD = await fetch(monedas.USD);
    const respuestaCotz = await fetch(monedas.cotizaciones);

    let arrayFav = JSON.parse(localStorage.favorites);
    let monedasFav = [];
    for (let i = 0; i < arrayFav.length; i++) {
      monedasFav.push(arrayFav[i].moneda);
    }
    let fechasFav = [];
    for (let i = 0; i < arrayFav.length; i++) {
      fechasFav.push(arrayFav[i].fecha);
    }

    if (respuestaUSD.ok) {
      const dataUSD = await respuestaUSD.json();

      for (let i = 0; i < dataUSD.length; i++) {
        const cotz = document.createElement("div");
        cotz.classList.add("cotizacion");
        cotz.setAttribute("data-moneda", "USD");
        const pintadaUSD = () => {
          console.log(monedasFav.includes(dataUSD[i].nombre));
          console.log(fechasFav);
          if (
            monedasFav.includes(dataUSD[i].nombre) &&
            fechasFav.includes(fechaActual)
          ) {
            return `<i class="fa-solid fa-star pintada"></i>`;
          } else {
            return ` <i class="fa-solid fa-star"></i>`;
          }
        };

        cotz.innerHTML = `
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
             ${pintadaUSD()}
           </button>
          `;
        pizzarra_cotz.appendChild(cotz);
        //console.log(dataUSD[i].fechaActualizacion, "USD");
      }
    }
    if (respuestaCotz.ok) {
      const dataCotz = await respuestaCotz.json();

      for (let i = 0; i < dataCotz.length; i++) {
        const cotz = document.createElement("div");
        cotz.classList.add("cotizacion");
        cotz.setAttribute("data-moneda", dataCotz[i].moneda);
        const pintadaCotz = () => {
          if (
            monedasFav.includes(dataCotz[i].nombre) &&
            fechasFav.includes(fechaActual)
          ) {
            return `<i class="fa-solid fa-star pintada"></i>`;
          } else {
            return ` <i class="fa-solid fa-star"></i>`;
          }
        };

        cotz.innerHTML = `
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
             ${pintadaCotz()}
           </button>
          `;
        pizzarra_cotz.appendChild(cotz);
        //console.log(dataCotz[i].fechaActualizacion, "COTZ");
        // No sabemos si la fecha de actualizacion es con la fecha que se actualiza con la api cada 5 minutos o si es la fechaActualizacion de cada moneda. (cada moneda varia la fecha de actualizacion)
      }

      /* Falta cambiar la fecha en que se actualizan las cotizaciones */
    }
  } catch (error) {
    console.log(error);
  }

  addFavoriteListeners();
};

procesoIniciado();

setInterval(() => {
  pizzarra_cotz.innerHTML = "";
  procesoIniciado();
}, 50000);

/*----Mostramos el las cotizaciones y guardamos favoritas en localstorage----*/

const selector_moneda = document.getElementById("selecMoneda");
const filtrar_pizarra = document.getElementById("filtrarPizarra");

const filtrar = () => {
  const selectedValue = selector_moneda.value;

  document.querySelectorAll(".cotizacion").forEach(function (element) {
    element.style.display = "none";
  });

  if (selectedValue === "todas") {
    document.querySelectorAll(".cotizacion").forEach(function (element) {
      element.style.display = "flex";
    });
  } else {
    document
      .querySelectorAll(`.cotizacion[data-moneda="${selectedValue}"]`)
      .forEach(function (element) {
        element.style.display = "flex";
      });
  }
};

const guardarFavorito = () => {
  localStorage.setItem("moneda");
};
filtrar_pizarra.addEventListener("click", filtrar);
