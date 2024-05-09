const productos = [
    {
        id: "pintura-01",
        titulo: "Pintura Latex",
        imagen: "../img/latas.jpg",
        categoria: {
            nombre: "Pinturas",
            id: "pinturas"
        },
        precio: 50000
    },
    {
        id: "pintura-02",
        titulo: "Pintura Esmalte",
        imagen: "../img/latas.jpg",
        categoria: {
            nombre: "Pinturas",
            id: "pinturas"
        },
        precio: 20000
    },
    {
        id: "pintura-03",
        titulo: "Pintura Barniz",
        imagen: "../img/latas.jpg",
        categoria: {
            nombre: "Pinturas",
            id: "pinturas"
        },
        precio: 10000
    },
    {
        id: "acc-01",
        titulo: "Rodillo",
        imagen: "../img/pintureria2.jpg",
        categoria: {
            nombre: "Accesorios",
            id: "accesorios"
        },
        precio: 8000
    },
    {
        id: "acc-02",
        titulo: "Pincel",
        imagen: "../img/pintureria2.jpg",
        categoria: {
            nombre: "Accesorios",
            id: "accesorios"
        },
        precio: 3000
    },
    {
        id: "acc-02",
        titulo: "Aguarras",
        imagen: "../img/pintureria2.jpg",
        categoria: {
            nombre: "Varios",
            id: "varios"
        },
        precio: 3000
    },
];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

function cargarProductos(productosElegidos){

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {
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
        contenedorProductos.append(div);
    })
    actualizarBotonesAgregar();
}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if(e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;

            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        }else{
            tituloPrincipal.innerText = "Todos los Productos";
            cargarProductos(productos);
        }
    })
})

function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    })
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    }else{
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    actualizarNumerito();

    Toastify({
        text: "Producto Agregado",
        gravity: "bottom",
        style: {
          background: "linear-gradient(to right, rgb(90, 180, 171), #212529)",
        }
      }).showToast();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito(){
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}