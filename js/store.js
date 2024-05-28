const tarjetaProducto = document.querySelector("#contenedor-productos");
const filtrarPorCategoria = document.querySelectorAll(".boton-categoria");
const mostrarTituloCategoria = document.querySelector("#titulo-principal");
let sumarAlCarrito = document.querySelectorAll(".producto-agregar");
const contador = document.querySelector("#contador");

let productos = [];

filtrarPorCategoria.forEach(boton => {
    boton.addEventListener("click", (e) => {
        filtrarPorCategoria.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if(e.currentTarget.id != "todos") {
            const categoriaArticulo = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            mostrarTituloCategoria.innerText = categoriaArticulo.categoria.nombre;

            const botonArticulo = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            mostrarProductos(botonArticulo);
        }else{
            mostrarTituloCategoria.innerText = "Todos los Productos";
            mostrarProductos(productos);
        }
    })
})

const cargarProductos = () => {
    fetch("../data/productos.json")
        .then(res => res.json())
        .then(data => {
            productos = data;
            mostrarProductos(productos);
        })
        .catch(error => {
            console.error("Error al cargar los productos:", error);
        });
};
cargarProductos();

const mostrarProductos = (ListarTienda) => {

    tarjetaProducto.innerHTML = "";

    ListarTienda.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-img" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$ ${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;
        tarjetaProducto.append(div);
    })
    eventoAgregarProductos();
}

const eventoAgregarProductos = () => {
    sumarAlCarrito = document.querySelectorAll(".producto-agregar");

    sumarAlCarrito.forEach(boton => {
        boton.addEventListener("click", agregarProductos);
    })
}

let listarArticulosCarrito;

let listarArticulosLS = localStorage.getItem("productos-en-carrito");

if (listarArticulosLS) {
    listarArticulosCarrito = JSON.parse(listarArticulosLS);
    contadorProductosCarrito();
} else {
    listarArticulosCarrito = [];
}

const agregarProductos = (e) => {
    const idBoton = e.currentTarget.id;
    const articuloListado = productos.find(producto => producto.id === idBoton);

    if (listarArticulosCarrito.some(producto => producto.id === idBoton)) {
        const index = listarArticulosCarrito.findIndex(producto => producto.id === idBoton);
        listarArticulosCarrito[index].cantidad++;
    }else{
        articuloListado.cantidad = 1;
        listarArticulosCarrito.push(articuloListado);
    }
    contadorProductosCarrito();

    Toastify({
        text: "Producto Agregado",
        gravity: "bottom",
        style: {
          background: "linear-gradient(to right, rgb(90, 180, 171), #212529)",
        }
      }).showToast();

    localStorage.setItem("productos-en-carrito", JSON.stringify(listarArticulosCarrito));
}

function contadorProductosCarrito(){
    let actualizarContador = listarArticulosCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    contador.innerText = actualizarContador;
}