/*----Mostramos el las cotizaciones y guardamos favoritas en localstorage----*/

const selector_moneda = document.getElementById("selecMoneda");
const filtrar_pizarra = document.getElementById("filtrarPizarra");

const filtrar = () => {

    const selectedValue = selector_moneda.value;

    document.querySelectorAll('.cotizacion').forEach(function(element) {
        element.style.display = 'none';
    });

    if (selectedValue === "todas") {
        document.querySelectorAll('.cotizacion').forEach(function(element) {
            element.style.display = 'flex';
        });
    } else {
        document.querySelectorAll(`.cotizacion[data-moneda="${selectedValue}"]`).forEach(function(element) {
            element.style.display = 'flex';
        });

    }
};

const guardarFavorito = () => {
    localStorage.setItem("moneda", )
}
filtrar_pizarra.addEventListener('click', filtrar);