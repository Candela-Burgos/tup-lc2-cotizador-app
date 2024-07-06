// Función para cargar los datos y renderizar la tabla
function cargarTabla() {
  const tablaBody = document.getElementById("tabla-body");
  tablaBody.innerHTML = ""; // Limpiar la tabla
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  console.log(favorites);

  let fechaActual = "";
  favorites.forEach((dato, index) => {
    const fila = document.createElement("tr");
    if (fechaActual !== dato.fecha) {
      fechaActual = dato.fecha;
      const fechaCell = document.createElement("td");
      fechaCell.rowSpan = favorites.filter(
        (d) => d.fecha === fechaActual
      ).length;
      fechaCell.textContent = dato.fecha;
      fila.appendChild(fechaCell);
    }
    const monedaCell = document.createElement("td");
    monedaCell.textContent = dato.moneda;
    const compraCell = document.createElement("td");
    compraCell.textContent = dato.compra;
    const ventaCell = document.createElement("td");
    ventaCell.textContent = dato.venta;
    const accionCell = document.createElement("td");
    const eraserIcon = document.createElement("i");
    eraserIcon.classList.add("fa-solid", "fa-eraser");
    eraserIcon.style.cursor = "pointer";
    eraserIcon.addEventListener("click", () => {
      eliminarDato(index);
    });
    accionCell.appendChild(eraserIcon);

    fila.appendChild(monedaCell);
    fila.appendChild(compraCell);
    fila.appendChild(ventaCell);
    fila.appendChild(accionCell);
    tablaBody.appendChild(fila);
  });
}

// Función para eliminar un dato
function eliminarDato(index) {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites.splice(index, 1); // Eliminar el elemento del array
  localStorage.setItem("favorites", JSON.stringify(favorites)); // Actualizar localStorage
  cargarTabla(); // Recargar la tabla
}

// Cargar la tabla al iniciar la página
document.addEventListener("DOMContentLoaded", cargarTabla);
