let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// ============================================
// EJERCICIO 1 — Array de productos
// ============================================
// Array de frutas

const productos = [
    {id: 1, nombre: "arandano", precio: 5000, imagen:"img/arandano.jpg"},
    {id: 2, nombre: "banana", precio: 1000, imagen:"img/banana.jpg"},
    {id: 3, nombre: "frambuesa", precio: 4000, imagen:"img/frambuesa.png"},
    {id: 4, nombre: "frutilla", precio: 3000, imagen:"img/frutilla.jpg"},
    {id: 5, nombre: "kiwi", precio: 2000, imagen:"img/kiwi.jpg"},
    {id: 6, nombre: "mandarina", precio: 800, imagen:"img/mandarina.jpg"},
    {id: 7, nombre: "manzana", precio: 1500, imagen:"img/manzana.jpg"},
    {id: 8, nombre: "naranja", precio: 9000, imagen:"img/naranja.jpg"},
    {id: 9, nombre: "pera", precio: 2500, imagen:"img/pera.jpg"},
    {id: 10, nombre: "anana", precio: 3000, imagen:"img/anana.jpg"},
    {id: 11, nombre: "pomelo amarillo", precio: 2000, imagen:"img/pomelo-amarillo.jpg"},
    {id: 12, nombre: "pomelo rojo", precio: 2000, imagen:"img/pomelo-rojo.jpg"},
    {id: 13, nombre: "sandia", precio: 1800, imagen:"img/sandia.jpg"}
];
console.log(productos);

// ============================================
// EJERCICIO 2 — init()
// ============================================
// Se agrega nombre de alumna y se inicializa

const alumno = {
    dni: '32523394',
    nombre: 'Laura',
    apellido: 'Carelli'
}


function imprimirDatosAlumno({nombre, apellido, dni}) {
    const mensaje = `Alumno: ${nombre} ${apellido} - DNI: ${dni}`;
    console.log(mensaje);
    const navNombre = document.querySelector('.nombreAlumno');
    navNombre.textContent = `${nombre} ${apellido}`;
}

function init() {
    imprimirDatosAlumno(alumno);
    mostrarProductos(productos);
    configurarFiltro();
    configurarOrdenamiento();
    mostrarCarrito();
    configurarEventosCarrito();
    configurarBotonVaciar();
    configurarBotonesPedido();
    configurarHistorial();
    actualizarTotales();
    actualizarContadorPedidos();
}

// ============================================
// EJERCICIO 3 — Renderizar productos
// ============================================
// Se agrega card de producto

function mostrarProductos(lista) {
    // 1. Seleccionar el contenedor donde van las cards
    const contenedor = document.querySelector('.contenedor-productos');

    // 2. Usamos map() para TRANSFORMAR cada producto en su HTML,
    //    y join('') para unir los strings en uno solo.
    //    Al asignar a innerHTML, se reemplaza TODO el contenido anterior
    //    (no hace falta vaciar antes con innerHTML = '').
    //
    //    Nota: lista.map(cardProducto) es lo mismo que
    //          lista.map(p => cardProducto(p)) pero más limpio,
    //          porque map ya le pasa cada elemento al callback.
    contenedor.innerHTML = lista.map(cardProducto).join('');
}

// Genera el HTML de UNA card a partir de un objeto producto.
// Usa destructuring para extraer las propiedades directamente.
function cardProducto({id, nombre, precio, imagen}) {
    const nombreParaMostrar = capitalizar(nombre);
    return `<div class="card-producto">
            <img src="${imagen}" alt="${nombreParaMostrar}"/>
            <h3>${nombreParaMostrar}</h3>
            <p>$${precio}</p>
            <button data-id="${id}">Agregar al carrito</button>
        </div>`;
}

// Función utilitaria: convierte "pomelo amarillo" → "Pomelo Amarillo".
// Usa una expresión regular: \b\w matchea la PRIMERA letra de cada palabra,
// y replace la convierte a mayúscula.
function capitalizar(texto) {
    return texto.replace(/\b\w/g, letra => letra.toUpperCase());
}

// ============================================
// EJERCICIO 4 — Filtro por búsqueda
// ============================================
// Esta función configura el listener del input de búsqueda
// para filtrar los productos en vivo.
function configurarFiltro(){
    // 1. Seleccionar el input de búsqueda
    // 2. Agregarle un listener al evento 'input'
    // 3. Adentro del listener: filtrar productos y llamar mostrarProductos
    const buscador = document.querySelector('.barra-busqueda');

    buscador.addEventListener('input', (event) => {
        // primero dejamos en minuscula el evento (lo que entra por el input
        const texto = event.target.value.toLowerCase();
        //usamos el filter para buscar dentro de la lista los que se incluyen
        const filtrados = productos.filter(producto =>
            producto.nombre.toLowerCase().includes(texto));
        mostrarProductos(filtrados);
    })
}

// ============================================
// EJERCICIO 5 — Crear acciones carrito
// ============================================

//Agregar el producto al carrito
function agregarAlCarrito(id) {
    // ¿Ya está el producto en el carrito? (lo buscamos por id)
    const productoEnCarrito = carrito.find(p => p.id === id);

    if (productoEnCarrito) {
        // Si ya está, solo aumentamos la cantidad
        productoEnCarrito.cantidad++;
    } else {
        // Si no está, lo agregamos copiando sus datos (spread) + cantidad: 1
        const producto = productos.find(p => p.id === id);
        carrito.push({...producto, cantidad: 1});
    }

    guardarCarrito();
    mostrarCarrito();
    actualizarTotales();
}

//Mostrar Carrito
function mostrarCarrito() {
    const contenedor = document.getElementById('items-carrito');
    // Botones que solo deben verse cuando hay productos en el carrito.
    const botonVaciar = document.querySelector('#btn-vaciar');
    const botonPedido = document.querySelector('#btn-realizar-pedido');

    if(carrito.length === 0){
        // Estado vacío "bonito": emoji + mensaje (EJ 9)
        contenedor.innerHTML = `
            <div class="carrito-vacio">
                <p class="icono-carrito-vacio">🛒</p>
                <p>No hay productos en el carrito.</p>
            </div>`;
        // Ocultamos los botones porque no hay nada que vaciar/pedir
        botonVaciar.classList.add('hidden');
        botonPedido.classList.add('hidden');
        return;
    }

    // Hay productos → mostramos los botones
    botonVaciar.classList.remove('hidden');
    botonPedido.classList.remove('hidden');

    // map(itemCarrito) → un <li> por cada item del carrito.
    contenedor.innerHTML = `<ul>${carrito.map(itemCarrito).join('')}</ul>`;
}

// Genera el HTML de UN item del carrito.
// Usamos data-id en TODOS los botones del item (eliminar, +, -):
// los 3 actúan sobre el mismo producto identificado por su id.
function itemCarrito({id, nombre, precio, cantidad}) {
    return `
    <li class="bloque-item">
        <p class="nombre-item">${capitalizar(nombre)} - $${precio}</p>
        <div class="control-cantidad">
            <button class="boton-menos" data-id="${id}">-</button>
            <span class="cantidad">${cantidad}</span>
            <button class="boton-mas" data-id="${id}">+</button>
        </div>
        <button class="boton-eliminar" data-id="${id}">Eliminar</button>
    </li>`;
}

// Elimina un producto del carrito por su id (no por índice).
// Usamos filter para devolver un array nuevo SIN el producto eliminado.
// Es más idiomático que splice y evita confusiones con el índice.
function eliminarProductoDeCarrito(id) {
    carrito = carrito.filter(p => p.id !== id);
    guardarCarrito();
    mostrarCarrito();
    actualizarTotales();
}

function configurarEventosCarrito() {
    // Click en los botones "Agregar al carrito"
    const contenedorProductos = document.querySelector('.contenedor-productos');
    contenedorProductos.addEventListener('click', (evento) => {
        if(evento.target.matches('.card-producto button')){
            const id = Number(evento.target.dataset.id);
            agregarAlCarrito(id);
        }
    });
    // Click adentro del carrito: distinguimos entre eliminar, + y -.
    // Los 3 botones usan data-id (por producto), así que extraemos el id
    // una sola vez al inicio del listener.
    const contenedorCarrito = document.querySelector('#items-carrito');
    contenedorCarrito.addEventListener('click', (evento) => {
        // Si no se clickeó un botón con data-id, salimos
        if (!evento.target.matches('button[data-id]')) return;

        const id = Number(evento.target.dataset.id);

        if (evento.target.matches('.boton-eliminar')) {
            eliminarProductoDeCarrito(id);
        } else if (evento.target.matches('.boton-mas')) {
            incrementarCantidad(id);
        } else if (evento.target.matches('.boton-menos')) {
            decrementarCantidad(id);
        }
    });
}

// ============================================
// EJERCICIO 6 — Persistencia con localStorage
// ============================================
// Guardamos el carrito en localStorage para que persista
// entre recargas. Cada vez que cambia, llamamos a guardarCarrito().
function guardarCarrito(){
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// ============================================
// EJERCICIO 7 — Cantidad, contador del header y total
// ============================================
// Refactor del carrito: cada item ahora tiene una propiedad "cantidad"
// (un mismo producto NO se duplica más, se suma cantidad).
// Botones + y - por item; si llega a 0 desaparece.
// El header muestra el total de items y el total en dinero abajo a la derecha.

// Aumenta la cantidad del producto identificado por id
function incrementarCantidad(id) {
    const item = carrito.find(p => p.id === id);
    if (item) {
        item.cantidad++;
    }
    guardarCarrito();
    mostrarCarrito();
    actualizarTotales();
}

// Disminuye la cantidad; si llega a 0, lo saca del carrito.
// Usamos filter (en vez de splice + indexOf) para consistencia con
// eliminarProductoDeCarrito y porque es más idiomático con id.
function decrementarCantidad(id) {
    const item = carrito.find(p => p.id === id);
    if (!item) return;

    item.cantidad--;

    if (item.cantidad === 0) {
        carrito = carrito.filter(p => p.id !== id);
    }

    guardarCarrito();
    mostrarCarrito();
    actualizarTotales();
}

// Recalcula y actualiza el contador del header y el precio total
function actualizarTotales() {
    // reduce: suma todas las cantidades empezando desde 0
    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    document.querySelector('#contador-carrito').textContent = totalItems;

    // reduce: suma precio * cantidad de cada item
    const precioTotal = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    document.querySelector('#precio-total').textContent = `$${precioTotal.toFixed(2)}`;
}

// ============================================
// EJERCICIO 8 — Ordenamiento de productos
// ============================================
// Agregamos 4 botones de ordenamiento (en index.html).
// Acá conectamos esos botones con la lógica.
//
// Decisiones importantes:
// 1) Trabajamos con una COPIA del array productos ([...productos]) para no
//    mutar el original. El método sort() es destructivo (modifica el array).
// 2) Usamos delegación de eventos: un solo listener en el contenedor de
//    los 4 botones, y según el data-orden disparamos un ordenamiento u otro.
// 3) Para strings usamos localeCompare (maneja bien acentos).
//    Para números, restamos: (a - b) ascendente, (b - a) descendente.

// Devuelve una NUEVA lista de productos ordenada según el criterio recibido.
// criterio puede ser: "nombre-asc", "nombre-desc", "precio-asc", "precio-desc"
function ordenarProductos(criterio) {
    // [...productos] crea una copia superficial del array. Así sort() no
    // afecta al array original.
    const copia = [...productos];

    // Según el criterio elegimos el comparador. La función comparadora
    // tiene que devolver:
    //   - negativo  => a va antes que b
    //   - positivo  => a va después que b
    //   - cero      => quedan igual
    switch (criterio) {
        case 'nombre-asc':
            // localeCompare ya devuelve negativo/positivo/cero
            copia.sort((a, b) => a.nombre.localeCompare(b.nombre));
            break;
        case 'nombre-desc':
            // Invertimos el orden (b compara contra a)
            copia.sort((a, b) => b.nombre.localeCompare(a.nombre));
            break;
        case 'precio-asc':
            // a - b para ascendente
            copia.sort((a, b) => a.precio - b.precio);
            break;
        case 'precio-desc':
            // b - a para descendente
            copia.sort((a, b) => b.precio - a.precio);
            break;
    }

    return copia;
}

// Configura el listener de los 4 botones de ordenamiento (delegación de eventos)
function configurarOrdenamiento() {
    const contenedorBotones = document.querySelector('.controles-orden');

    contenedorBotones.addEventListener('click', (evento) => {
        // Solo nos interesa cuando se clickea un BUTTON adentro del contenedor
        if (evento.target.matches('button')) {
            // Leemos el criterio desde el atributo data-orden del botón clickeado
            const criterio = evento.target.dataset.orden;

            // Obtenemos la lista ordenada y re-renderizamos
            const productosOrdenados = ordenarProductos(criterio);
            mostrarProductos(productosOrdenados);
        }
    });
}

// ============================================
// EJERCICIO 9 — Vaciar carrito + estado vacío
// ============================================
// Botón "Vaciar carrito" que deja el carrito en cero, y un estado vacío
// con un emoji + mensaje cuando no hay productos.
//
// El estado vacío bonito está manejado dentro de mostrarCarrito() (más arriba).
// Acá implementamos la función vaciarCarrito y su listener.

// Vacía completamente el carrito, sincroniza localStorage y re-renderiza
function vaciarCarrito() {
    // Reasignamos a array vacío. Funciona porque carrito está declarado con let.
    carrito = [];

    // Guardamos en localStorage. Va a quedar la cadena "[]".
    // Mantenemos el patrón "cada cambio dispara guardarCarrito()" por consistencia.
    guardarCarrito();

    // Refrescamos lo que se muestra
    mostrarCarrito();
    actualizarTotales();
}

// Configura el listener del botón "Vaciar carrito"
function configurarBotonVaciar() {
    const botonVaciar = document.querySelector('#btn-vaciar');
    botonVaciar.addEventListener('click', vaciarCarrito);
}

// ============================================
// EXTRA — Realizar pedido (ticket + historial)
// ============================================
// Al apretar "Realizar pedido":
//   1) Generamos un objeto pedido con id, fecha, cliente, items y total.
//   2) Lo agregamos al array de pedidos guardado en localStorage (clave "pedidos").
//   3) Mostramos un dialog estilo ticket con el detalle.
//   4) Vaciamos el carrito.
//
// Decisión: los pedidos se guardan en una clave DISTINTA al carrito,
// porque son cosas conceptualmente diferentes: carrito es "lo que estoy
// armando ahora", pedidos es "historial de compras finalizadas".

// Cargamos el historial de pedidos al arrancar (igual patrón que el carrito).
// Si no había nada guardado, queda como array vacío.
let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];

// Guarda el array completo de pedidos en localStorage
function guardarPedidos() {
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
}

// Crea el objeto pedido a partir del estado actual del carrito
function crearPedido() {
    // Sumamos el total con reduce (igual lógica que actualizarTotales)
    const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

    return {
        // Date.now() devuelve milisegundos desde 1970, sirve como id único
        id: Date.now(),
        // toLocaleString formatea la fecha según la región (es-AR usa dd/mm/aaaa)
        fecha: new Date().toLocaleString('es-AR'),
        cliente: `${alumno.nombre} ${alumno.apellido}`,
        // Copiamos el carrito con spread para "congelar" el snapshot.
        // Si no copiáramos, después de vaciar el carrito el pedido se quedaría vacío también.
        items: [...carrito],
        total: total
    };
}

// Genera el HTML del ticket a partir de un pedido
function generarTicketHTML(pedido) {
    // Armamos las líneas de items con map (una <li> por item)
    const lineasItems = pedido.items.map(item => `
        <li class="ticket-linea">
            <span>${item.cantidad}× ${capitalizar(item.nombre)}</span>
            <span>$${item.precio * item.cantidad}</span>
        </li>
    `).join('');

    return `
        <div class="ticket">
            <h2 class="ticket-titulo">🍓 FRUTERÍA 🍓</h2>
            <p class="ticket-pedido-id">Pedido #${pedido.id}</p>
            <p>Fecha: ${pedido.fecha}</p>
            <p>Cliente: ${pedido.cliente}</p>
            <hr>
            <ul class="ticket-items">${lineasItems}</ul>
            <hr>
            <p class="ticket-total">TOTAL: $${pedido.total.toFixed(2)}</p>
            <p class="ticket-gracias">¡Gracias por tu compra!</p>
        </div>
    `;
}

// Función principal: realiza el pedido completo
function realizarPedido() {
    // Si el carrito está vacío, no hacemos nada (defensivo)
    if (carrito.length === 0) return;

    // 1) Creamos el pedido a partir del carrito actual
    const pedido = crearPedido();

    // 2) Lo agregamos al historial y persistimos
    pedidos.push(pedido);
    guardarPedidos();

    // 3) Mostramos el dialog con el ticket
    const contenidoTicket = document.querySelector('#contenido-ticket');
    const dialog = document.querySelector('#dialog-ticket');
    contenidoTicket.innerHTML = generarTicketHTML(pedido);
    dialog.showModal();   // método nativo del <dialog> para abrir como modal

    // 4) Vaciamos el carrito (que ya copiamos en el pedido con [...carrito])
    vaciarCarrito();

    // 5) Actualizamos el contador de "Mis pedidos" en el header
    actualizarContadorPedidos();

    // Mostramos también en consola por si querés inspeccionar el pedido
    console.log('Pedido realizado:', pedido);
    console.log('Historial de pedidos:', pedidos);
}

// Listeners de los botones "Realizar pedido" y "Cerrar ticket"
function configurarBotonesPedido() {
    document.querySelector('#btn-realizar-pedido')
        .addEventListener('click', realizarPedido);

    // Cerrar el dialog con el botón "Cerrar"
    document.querySelector('#btn-cerrar-ticket')
        .addEventListener('click', () => {
            document.querySelector('#dialog-ticket').close();
        });
}

// ============================================
// EXTRA — Historial de pedidos (ver / editar / eliminar)
// ============================================
// Muestra todos los pedidos guardados en un dialog separado.
// Cada pedido del historial tiene 3 acciones:
//   - Ver: abre el ticket original (reusa el dialog del ticket).
//   - Editar: carga los items del pedido al carrito y lo borra del historial.
//             El usuario edita en el carrito y vuelve a "Realizar pedido".
//   - Eliminar: borra el pedido del historial (con confirmación).

// Actualiza el badge del header con la cantidad de pedidos
function actualizarContadorPedidos() {
    document.querySelector('#contador-pedidos').textContent = pedidos.length;
}

// Genera el HTML de una fila del historial (un pedido)
function filaHistorial(pedido) {
    // Suma cantidades totales de items con reduce
    const cantItems = pedido.items.reduce((acc, item) => acc + item.cantidad, 0);

    return `
        <div class="pedido-historial">
            <div class="pedido-info">
                <strong>Pedido #${pedido.id}</strong>
                <p class="pedido-fecha">${pedido.fecha}</p>
                <p>${cantItems} item(s) — $${pedido.total.toFixed(2)}</p>
            </div>
            <div class="pedido-acciones">
                <button data-accion="ver" data-id="${pedido.id}">Ver</button>
                <button data-accion="editar" data-id="${pedido.id}">Editar</button>
                <button data-accion="eliminar" data-id="${pedido.id}" class="boton-eliminar">Eliminar</button>
            </div>
        </div>
    `;
}

// Renderiza la lista de pedidos dentro del dialog
function renderizarHistorial() {
    const lista = document.querySelector('#lista-pedidos');

    if (pedidos.length === 0) {
        lista.innerHTML = '<p class="historial-vacio">Todavía no tenés pedidos.</p>';
        return;
    }

    // Mostramos del más reciente al más antiguo: copia + reverse
    // (no mutamos el array original con .reverse() directo)
    const ordenados = [...pedidos].reverse();
    lista.innerHTML = ordenados.map(filaHistorial).join('');
}

// Abre el dialog del historial
function abrirHistorial() {
    renderizarHistorial();
    document.querySelector('#dialog-historial').showModal();
}

// Acción: Ver detalle de un pedido (reusa el dialog del ticket)
function verDetallePedido(id) {
    const pedido = pedidos.find(p => p.id === id);
    if (!pedido) return;

    // Cerramos el dialog del historial y abrimos el del ticket
    document.querySelector('#dialog-historial').close();

    const contenido = document.querySelector('#contenido-ticket');
    contenido.innerHTML = generarTicketHTML(pedido);
    document.querySelector('#dialog-ticket').showModal();
}

// Acción: Editar pedido = cargar items al carrito + borrar del historial
function editarPedido(id) {
    // Si el carrito ya tiene productos, pedimos confirmación antes de pisarlos
    if (carrito.length > 0) {
        const ok = confirm(
            'Tu carrito actual tiene productos. ¿Querés reemplazarlo con este pedido?'
        );
        if (!ok) return;
    }

    const pedido = pedidos.find(p => p.id === id);
    if (!pedido) return;

    // Cargamos los items al carrito haciendo una COPIA de cada uno
    // (item => ({...item}) crea un objeto nuevo, así no compartimos referencia
    // con el pedido del historial)
    carrito = pedido.items.map(item => ({...item}));

    // Eliminamos el pedido del historial con filter (devuelve nuevo array sin él)
    pedidos = pedidos.filter(p => p.id !== id);

    // Sincronizamos todo: carrito, pedidos y UI
    guardarCarrito();
    guardarPedidos();
    mostrarCarrito();
    actualizarTotales();
    actualizarContadorPedidos();

    // Cerramos el dialog del historial
    document.querySelector('#dialog-historial').close();
}

// Acción: Eliminar pedido del historial
function eliminarPedido(id) {
    const ok = confirm('¿Eliminar este pedido del historial? Esta acción no se puede deshacer.');
    if (!ok) return;

    // filter devuelve un array nuevo SIN el pedido eliminado
    pedidos = pedidos.filter(p => p.id !== id);

    guardarPedidos();
    renderizarHistorial();   // re-render del dialog (queda abierto)
    actualizarContadorPedidos();
}

// Configura los listeners del historial
function configurarHistorial() {
    // Abrir el historial
    document.querySelector('#btn-historial')
        .addEventListener('click', abrirHistorial);

    // Cerrar el dialog del historial
    document.querySelector('#btn-cerrar-historial')
        .addEventListener('click', () => {
            document.querySelector('#dialog-historial').close();
        });

    // Delegación de eventos para las acciones de cada pedido.
    // Un solo listener para los 3 tipos de botones (ver/editar/eliminar).
    document.querySelector('#lista-pedidos').addEventListener('click', (evento) => {
        const boton = evento.target;
        if (!boton.matches('button[data-accion]')) return;

        const accion = boton.dataset.accion;
        const id = Number(boton.dataset.id);

        if (accion === 'ver') {
            verDetallePedido(id);
        } else if (accion === 'editar') {
            editarPedido(id);
        } else if (accion === 'eliminar') {
            eliminarPedido(id);
        }
    });
}

init();