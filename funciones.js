//logica de la funcion del carrito de compra
let carrito = JSON.parse(localStorage.getItem("carritoFitlabData")) || [];

function agregarAlCarrito(nombreProducto, precio) {
  carrito.push({ nombre: nombreProducto, precio: precio });
  guardarYActualizarCarrito();
}

function guardarYActualizarCarrito() {
  localStorage.setItem("carritoFitlabData", JSON.stringify(carrito));

  const contador = document.getElementById("contadorCarrito");
  if (contador) contador.textContent = carrito.length;

  const lista = document.getElementById("listaCarrito");
  const total = document.getElementById("totalCarrito");

  if (lista && total) {
    if (carrito.length === 0) {
      lista.innerHTML = `<li class="list-group-item text-center text-muted">El carrito está vacío</li>`;
      total.textContent = "$0";
    } else {
      lista.innerHTML = "";
      let sumaTotal = 0;
      carrito.forEach((item, index) => {
        sumaTotal += item.precio;
        lista.innerHTML += `
          <li class="list-group-item d-flex justify-content-between align-items-center">
            ${item.nombre} - $${item.precio.toLocaleString("es-CL")}
            <button class="btn btn-sm btn-outline-danger" onclick="eliminarDelCarrito(${index})">X</button>
          </li>
        `;
      });
      total.textContent = "$" + sumaTotal.toLocaleString("es-CL");
    }
  }
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  guardarYActualizarCarrito();
}

document.addEventListener("DOMContentLoaded", guardarYActualizarCarrito);

