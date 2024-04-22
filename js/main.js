let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const productos = [
    {
        titulo: "Pintura 1",
        precio: 50000,
        img: "../img/latas.jpg"
    },
    {
        titulo: "Pintura 2",
        precio: 70000,
        img: "../img/latas.jpg"
    },
    {
        titulo: "Pintura 3",
        precio: 90000,
        img: "../img/latas.jpg"
    },
    {
        titulo: "Pintura 4",
        precio: 50000,
        img: "../img/latas.jpg"
    },
    {
        titulo: "Pintura 5",
        precio: 70000,
        img: "../img/latas.jpg"
    },
    {
        titulo: "Accesorio 1",
        precio: 90000,
        img: "../img/latas.jpg"
    },
    {
        titulo: "Accesorio 2",
        precio: 50000,
        img: "../img/latas.jpg"
    },
    {
        titulo: "Varios 1",
        precio: 70000,
        img: "../img/latas.jpg"
    },
    {
        titulo: "Varios 2",
        precio: 90000,
        img: "../img/latas.jpg"
    },
];

const contenedorProductos = document.querySelector("#productos");
const carritoVacio = document.querySelector("#carrito-vacio");
const carritoProductos = document.querySelector("#carrito-productos");
const carritoTotal = document.querySelector("#carrito-total");

productos.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
        <img class="producto-img" src="${producto.img}" alt="${producto.titulo}">
        <h3>${producto.titulo}</h3>
        <p>$ ${producto.precio}</p>
    `;

    const btn = document.createElement("button");
    btn.classList.add("producto-btn");
    btn.innerText = "Agregar al carrito";

    btn.addEventListener("click", () => {
        agregarAlCarrito(producto);
    })

    div.append(btn);
    contenedorProductos.append(div);
})

const actualizarCarrito = () => {
    if(carrito.length === 0){
        carritoVacio.classList.remove("d-none");
        carritoProductos.classList.add("d-none");
    }else{
        carritoVacio.classList.add("d-none");
        carritoProductos.classList.remove("d-none");

        carritoProductos.innerHTML = "";

        carrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <h3>${producto.titulo}</h3>
                <p>$ ${producto.precio}</p>
                <p>Cant: ${producto.cantidad}</p>
                <p>Subt: $ ${producto.cantidad * producto.precio}</p>
            `

            const btn = document.createElement("button");
            btn.classList.add("carrito-producto-btn");
            btn.innerText = "X";
            btn.addEventListener("click", () => {
                borrarDelCarrito(producto);
            })
            div.append(btn);

            carritoProductos.append(div);
        })
    }
    actualizarTotal();
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

const agregarAlCarrito = (producto) => {
    const itemEncontrado = carrito.find(item => item.titulo === producto.titulo);
    if (itemEncontrado) {
        itemEncontrado.cantidad++;
    } else {
        carrito.push({...producto, cantidad: 1});
    }

    actualizarCarrito();
}

const borrarDelCarrito = (producto) => {
    const prodIndex = carrito.findIndex(item => item.titulo === producto.titulo);
    carrito.splice(prodIndex, 1);
    actualizarCarrito();
}

const actualizarTotal = () => {
    const total = carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);
    carritoTotal.innerText = `$ ${total}`;
}

actualizarCarrito();