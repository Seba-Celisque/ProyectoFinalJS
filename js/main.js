const productos = [
    {id: "001", nombre: "Marlin 1", precio: 120000, disponibilidad: "no"},
    {id: "002", nombre: "Marlin 2", precio: 120000, disponibilidad: "si"},
    {id: "003", nombre: "Marlin 3", precio: 120000, disponibilidad: "no"},
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarProductoAlCarrito(evento) {
  if (evento) {
    const idProducto = evento.target.dataset.id;
    const producto = productos.find(producto => producto.id === idProducto);
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    const nuevoElemento = crearElementoEnMenu(producto);
    document.getElementById("menu").appendChild(nuevoElemento);

    agregado();
  }
}

function agregado() {
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Modelo agregado con exito',
    showConfirmButton: false,
    timer: 1200
  })
}


const botones = document.querySelectorAll(".boton");
botones.forEach(boton => {
  boton.addEventListener("click", agregarProductoAlCarrito);
});

function crearElementoEnMenu(bici) {
  const nuevoElemento = document.createElement("div");
  nuevoElemento.classList.add("canvas");
  nuevoElemento.dataset.id = bici.id;

  const nombreBici = document.createElement("p");
  nombreBici.textContent = bici.nombre;

  const precioBici = document.createElement("p");
  precioBici.textContent = `Precio: $${bici.precio}`;

  const idBici = document.createElement("p");
  idBici.textContent = `ID: ${bici.id}`;

  const botonEliminar = document.createElement("button");
  botonEliminar.textContent = "Eliminar";
  botonEliminar.addEventListener("click", deleteProduct);

  const iconoEliminar = createDeleteIcon();
  botonEliminar.appendChild(iconoEliminar);

  nuevoElemento.appendChild(nombreBici);
  nuevoElemento.appendChild(precioBici);
  nuevoElemento.appendChild(idBici);
  nuevoElemento.appendChild(botonEliminar);

  return nuevoElemento;
}


function createDeleteIcon() {
  const i = document.createElement("i");
  i.classList.add("fas", "fa-trash-alt", "trashIcon", "icon");
  i.addEventListener("click", deleteProduct);
  return i;
}

function deleteProduct(event) {
  const parent = event.target.parentElement;
  parent.remove();

  const idProducto = parent.dataset.id;
  eliminarProductoDelCarrito(idProducto);
}


async function actualizarCarrito() {
  try {
    const response = await fetch('productos.json');
    if (!response.ok) {
      throw new Error('Error al obtener los productos');
    }
    const productos = await response.json();
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    document.getElementById("menu").innerHTML = "";

    carrito.forEach((producto) => {
      const productoEncontrado = productos.find((p) => p.id === producto.id);
      if (productoEncontrado) {
        const nuevoElemento = crearElementoEnMenu(productoEncontrado);
        document.getElementById("menu").appendChild(nuevoElemento);
      }
    });
  } catch (error) {
    console.error(error);
  }
}


actualizarCarrito();