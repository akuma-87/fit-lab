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

//Stock Critico
function verificarStockCritico() {
  const filas = document.querySelectorAll("#tablaInventario tbody tr");

  filas.forEach(fila => {
    const celdaStock = fila.querySelector(".cant-stock");
    const celdaEstado = fila.querySelector(".estado-stock");

    if (celdaStock && celdaEstado) {
      const cantidad = parseInt(celdaStock.textContent.trim(), 10);

      if (cantidad <= 5) {
        fila.classList.add("table-danger");
        celdaEstado.innerHTML = `<span class="badge bg-danger">⚠️ Stock Crítico</span>`;
      } else {
        celdaEstado.innerHTML = `<span class="badge bg-success">Normal</span>`;
      }
    }
  });
}

//Gestion de usuario
//Validacion de correo

function mostrarModalUsuario(titulo, mensaje, esError) {
  const modalEl = document.getElementById("modalNotificación");
  const headerEl = document.getElementById("headerNotificacion");
  const tituloEl = document.getElementById("tituloNotificacion");
  const cuerpoEl = document.getElementById("cuerpoNotificacion");

  if (modalEl && headerEl && tituloEl && cuerpoEl) {
    headerEl.className = esError ? "modal-header bg-danger text-white" : "modal-header bg-success text-white";
    tituloEl.textContent = titulo;
    cuerpoEl.innerHTML = mensaje;

    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  }
}

function validarLogin(e) {
  e.preventDefault();
  const correo = document.getElementById("loginCorreo").value.trim();
  const pass = document.getElementById("loginPass").value.trim();

  // Validación: Campos vacíos o sin arroba
  if (correo === "" || pass === "") {
    mostrarModalUsuario("⚠️ Error", "Ingresa tu correo y contraseña para continuar.", true);
  } else if (!correo.includes("@")) {
    mostrarModalUsuario("⚠️ Correo Inválido", "El correo debe incluir un símbolo de arroba (@).", true);
  } else {
    mostrarModalUsuario("¡Bienvenido!", `Sesión iniciada exitosamente con <strong>${correo}</strong>.`, false);
    document.getElementById("formLogin").reset();
  }
}

function validarRegistro(e) {
  e.preventDefault();
  const nombre = document.getElementById("regNombre").value.trim();
  const correo = document.getElementById("regCorreo").value.trim();
  const pass = document.getElementById("regPass").value.trim();

  // Validación: Campos vacíos, falta de '@' o clave muy corta
  if (nombre === "" || correo === "" || pass === "") {
    mostrarModalUsuario("⚠️ Error de Registro", "Por favor completa todos los campos requeridos.", true);
  } else if (!correo.includes("@")) {
    mostrarModalUsuario("⚠️ Correo Inválido", "Ingresa un formato de correo válido que contenga <strong>@</strong>.", true);
  } else if (pass.length < 6) {
    mostrarModalUsuario("⚠️ Clave Débili", "La contraseña debe tener un mínimo de 6 caracteres.", true);
  } else {
    mostrarModalUsuario("¡Registro Exitoso!", `Usuario <strong>${nombre}</strong> registrado con éxito.`, false);
    document.getElementById("formRegister").reset();
  }

}