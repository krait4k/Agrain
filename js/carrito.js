let listadoArticulosCarrito = localStorage.getItem("productos-en-carrito");
listadoArticulosCarrito = JSON.parse(listadoArticulosCarrito);

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorArticulosCargados = document.querySelector("#carrito-productos");
const contenedorBotonesEjecucion = document.querySelector("#carrito-acciones");
const contenedorMensajeCompra = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-item-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const resultadoTotal = document.querySelector("#total");
const botonPagar = document.querySelector("#carrito-acciones-comprar");

const listarProductosStore = () => {
    if(listadoArticulosCarrito && listadoArticulosCarrito.length > 0){
        contenedorCarritoVacio.classList.add("disabled");
        contenedorArticulosCargados.classList.remove("disabled");
        contenedorBotonesEjecucion.classList.remove("disabled");
        contenedorMensajeCompra.classList.add("disabled");

        contenedorArticulosCargados.innerHTML = "";

        listadoArticulosCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-item");
            div.innerHTML = `
                <img class="carrito-item-img" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-item-titulo">
                    <small>Titulo</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-item-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-item-precio">
                    <small>Precio</small>
                    <p>$ ${producto.precio}</p>
                </div>
                <div class="carrito-item-subtotal">
                    <small>Subtotal</small>
                    <p>$ ${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito-item-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
            `;
            contenedorArticulosCargados.append(div);
        });
        restarItem();
    }else{
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorArticulosCargados.classList.add("disabled");
        contenedorBotonesEjecucion.classList.add("disabled");
        contenedorMensajeCompra.classList.add("disabled");
    }
};

const restarItem = () => {
    botonesEliminar = document.querySelectorAll(".carrito-item-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", borrarItemCarrito);
    });
};

const borrarItemCarrito = (e) => {
    const idBoton = e.currentTarget.id;
    const index = listadoArticulosCarrito.findIndex(producto => producto.id === idBoton);

    listadoArticulosCarrito.splice(index, 1);
    listarProductosStore();

    localStorage.setItem("productos-en-carrito", JSON.stringify(listadoArticulosCarrito));
};

const vaciarCarrito = () => {
    listadoArticulosCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(listadoArticulosCarrito));
    listarProductosStore();
};

const calcularValorTotal = () => {
    const totalCalculado = listadoArticulosCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    resultadoTotal.innerText = `$ ${totalCalculado}`;
};

const botonIrAPagar = () => {
    listadoArticulosCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(listadoArticulosCarrito));

    contenedorCarritoVacio.classList.add("disabled");
    contenedorArticulosCargados.classList.add("disabled");
    contenedorBotonesEjecucion.classList.add("disabled");
    contenedorMensajeCompra.classList.remove("disabled");
};

listarProductosStore();
calcularValorTotal();

botonVaciar.addEventListener("click", vaciarCarrito);
botonPagar.addEventListener("click", botonIrAPagar);