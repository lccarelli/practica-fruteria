# Roadmap — Práctica Frutería (preparación parcial)

Este documento es la **guía de trabajo y bitácora de aprendizaje** para la práctica de tienda de frutas. Acompañá tu desarrollo escribiendo en las secciones "Notas/Aprendizajes" lo que vayas descubriendo. Sirve para volver a consultar antes del parcial.

## Estado del trabajo

| # | Ejercicio | Estado |
|---|---|---|
| 1 | Array de frutas | ⬜ Pendiente |
| 2 | Datos del alumno en `<nav>` | ⬜ Pendiente |
| 3 | Renderizar productos en el DOM | ⬜ Pendiente |
| 4 | Filtro por búsqueda | ⬜ Pendiente |
| 5 | Carrito (agregar, mostrar, eliminar) | ⬜ Pendiente |
| 6 | `localStorage` (persistencia) | ⬜ Pendiente |
| 7 | Contador, +/-, total | ⬜ Pendiente |
| 8 | Botones de ordenamiento | ⬜ Pendiente |
| 9 | Vaciar carrito + estado vacío | ⬜ Pendiente |
| 10 | Estilar según `sample.png` | ⬜ Pendiente |

> Marcá con ✅ al ir terminando cada uno.

---

## Punto de partida que dejó el profesor

- `index.html`: estructura HTML básica ya armada (header con logo, nombreAlumno, barra de búsqueda y contador de carrito; `<main>` con sección de productos y sección de carrito).
- `img/`: 13 imágenes de frutas listas para usar.
- `css/styles.css`: vacío (vos lo escribís).
- `js/main.js`: vacío (vos lo escribís).
- `sample.png`: cómo debe verse el resultado final.

### Frutas disponibles en `img/`

`anana.jpg`, `arandano.jpg`, `banana.jpg`, `frambuesa.png`, `frutilla.jpg`, `kiwi.jpg`, `mandarina.jpg`, `manzana.jpg`, `naranja.jpg`, `pera.jpg`, `pomelo-amarillo.jpg`, `pomelo-rojo.jpg`, `sandia.jpg`.

> 👀 Atención: `frambuesa.png` (las demás son `.jpg`).

---

## Convenciones del proyecto

Antes de arrancar, fijamos estas convenciones para que el código quede ordenado:

1. **Bloque `init()`**: una función "orquestadora" que se ejecuta al cargar la página y llama a todas las funciones principales en orden.
2. **Comentarios en bloque**: cada ejercicio en `main.js` va separado por un bloque tipo:
   ```js
   // ============================================
   // EJERCICIO N — Título corto
   // ============================================
   // Explicación de qué hace y por qué lo resolvimos así.
   ```
3. **Nombre de funciones**: en camelCase y descriptivas (`imprimirDatosAlumno`, `mostrarCarrito`).
4. **Variables**: `const` por defecto, `let` solo cuando el valor va a cambiar.
5. **Selección del DOM**: hacela una sola vez y guardala en una constante arriba del archivo. Ej:
   ```js
   const contenedorProductos = document.querySelector(".contenedor-productos");
   ```
6. **HTML primero, JS después**: cualquier elemento que toque por JS, primero asegurate que está en el HTML.

---

## Conceptos de JavaScript que vas a aprender (cheat sheet)

Esta sección la vamos a ir llenando a medida que aparezcan. Es tu chuleta para el parcial.

### Selección del DOM
```js
document.querySelector(".clase")     // primer elemento con esa clase
document.querySelectorAll(".clase")  // todos los elementos (devuelve NodeList)
document.getElementById("id")        // por id
```

### Manipulación del DOM
```js
elemento.innerHTML = "<p>contenido</p>"   // setea HTML (cuidado con HTML del usuario)
elemento.textContent = "texto"            // setea solo texto, más seguro
elemento.appendChild(otroElemento)        // agregar hijo
elemento.classList.add("clase")           // agregar clase
elemento.classList.remove("clase")        // sacar clase
elemento.addEventListener("click", fn)    // escuchar evento
```

### Arrays — métodos imprescindibles
```js
arr.forEach(item => { ... })              // recorrer
arr.map(item => transformacion)           // transformar y devolver nuevo array
arr.filter(item => condicion)             // filtrar y devolver nuevo array
arr.find(item => condicion)               // encontrar el primero que cumple
arr.some(item => condicion)               // true si al menos uno cumple
arr.sort((a, b) => a.precio - b.precio)   // ordenar (cuidado: muta el original)
arr.push(item)                            // agregar al final
arr.splice(indice, 1)                     // eliminar 1 elemento en ese índice
arr.length                                // cantidad
```

### Template literals (backticks)
```js
const nombre = "Laura";
const saludo = `Hola, ${nombre}`;
const html = `<div class="card">${nombre}</div>`;
```

### localStorage
```js
localStorage.setItem("clave", JSON.stringify(objeto))   // guardar
const dato = JSON.parse(localStorage.getItem("clave"))   // leer y parsear
localStorage.removeItem("clave")                          // borrar uno
localStorage.clear()                                      // borrar todo
```

> Importante: `localStorage` solo guarda **strings**. Por eso usamos `JSON.stringify` para guardar y `JSON.parse` para leer.

---

## Ejercicio 1 — Array de frutas

### Objetivo
Crear un array de 13 objetos, cada uno representando una fruta con: `id`, `nombre`, `precio`, `imagen`.

### Conceptos
- Objetos en JS (`{ clave: valor }`).
- Arrays de objetos.
- Rutas relativas a imágenes.

### Pasos
1. En `js/main.js`, declarar `const productos = [ ... ]`.
2. Cada objeto: `{ id: 1, nombre: "anana", precio: 3000, imagen: "img/anana.jpg" }`.
3. Repetir para las 13 frutas (mirar `sample.png` para los precios sugeridos).
4. Hacer `console.log(productos)` al final del archivo y abrir la consola del navegador (F12 → Console) para verificar.

### Precios de referencia (de `sample.png`)
- arandano: $5000
- banana: $1000
- frambuesa: $4000
- frutilla: $3000
- kiwi: $2000
- mandarina: $800
- manzana: $1500
- naranja: $9000
- pera: $2500
- anana: $3000
- pomelo-amarillo: $2000
- pomelo-rojo: $2000
- sandia: (poné un precio, no aparece en sample)

### Pista
Para vincular el JS al HTML, agregá antes de `</body>` en `index.html`:
```html
<script src="js/main.js"></script>
```

### Notas / Aprendizajes
_(Anotá acá lo que aprendiste haciendo este ejercicio: dudas que resolviste, errores comunes, formas distintas de hacerlo, etc.)_

---

## Ejercicio 2 — Datos del alumno en el `<nav>`

### Objetivo
Mostrar tu nombre y apellido en el header (en el div con clase `nombreAlumno`) y en la consola, a partir de un objeto `alumno`.

### Conceptos
- Funciones (declaración y llamada).
- Objetos como contenedores de datos.
- Template literals con backticks `` ` ``.
- Acceso a propiedades con notación de punto.
- Inicialización con `init()`.

### Pasos
1. Crear el objeto:
   ```js
   const alumno = { dni: "...", nombre: "Laura", apellido: "Carelli" };
   ```
2. Definir la función `imprimirDatosAlumno()` que:
   - Hace `console.log(\`Alumno: ${alumno.nombre} ${alumno.apellido} - DNI: ${alumno.dni}\`)`
   - Selecciona el `div.nombreAlumno` y le pone el texto.
3. Definir la función `init()`:
   ```js
   function init() {
       imprimirDatosAlumno();
   }
   init();   // la llamamos al final
   ```

### Pista
> El HTML tiene `<div class="nombreAlumno"></div>`, no un `<nav>` real. Está bien usar ese div igual; si querés ser estricto con la consigna, podés agregar un `<nav>` adentro o renombrar la clase.

### Notas / Aprendizajes
_(...)_

---

## Ejercicio 3 — Renderizar productos en el DOM

### Objetivo
Pintar las 13 frutas como cards dentro del `<div class="contenedor-productos">`.

### Conceptos
- Recorrer arrays con `forEach` o `map`.
- Crear HTML dinámicamente con template literals.
- `innerHTML` vs `createElement`.
- Acumular HTML en un string y asignarlo de una vez (más performante que muchos `appendChild`).

### Pasos
1. Crear función `mostrarProductos(lista)` que recibe el array.
2. Seleccionar el contenedor: `const cont = document.querySelector(".contenedor-productos")`.
3. Vaciar el contenedor: `cont.innerHTML = ""` (para no duplicar al re-renderizar).
4. Recorrer la lista y armar el HTML según la estructura pedida:
   ```js
   lista.forEach(producto => {
       cont.innerHTML += `
           <div class="card-producto">
               <img src="${producto.imagen}" alt="${producto.nombre}">
               <h3>${producto.nombre}</h3>
               <p>$${producto.precio}</p>
               <button>Agregar al carrito</button>
           </div>
       `;
   });
   ```
5. Llamarla desde `init()`: `mostrarProductos(productos)`.

### Pistas
- **Performance tip**: en vez de `cont.innerHTML += ...` dentro del loop (que es lento porque parsea el HTML en cada iteración), podés hacer:
  ```js
  const html = lista.map(p => `<div class="card-producto">...</div>`).join("");
  cont.innerHTML = html;
  ```
- Para "Agregar al carrito" más adelante vas a necesitar identificar el producto. Una opción es: `<button data-id="${producto.id}">`.

### Notas / Aprendizajes
_(...)_

---

## Ejercicio 4 — Filtro por búsqueda

### Objetivo
Cuando el usuario escribe en el input `.barra-busqueda`, mostrar solo las frutas cuyo nombre coincida con lo escrito.

### Conceptos
- Eventos: `input`, `keyup`, `change`.
- `addEventListener`.
- `Array.prototype.filter`.
- Convertir a minúsculas con `.toLowerCase()` para búsqueda insensible.
- `.includes()` para verificar si un string contiene otro.

### Pasos
1. Seleccionar el input: `const buscador = document.querySelector(".barra-busqueda")`.
2. Escuchar el evento `input`:
   ```js
   buscador.addEventListener("input", (e) => {
       const texto = e.target.value.toLowerCase();
       const filtrados = productos.filter(p => p.nombre.toLowerCase().includes(texto));
       mostrarProductos(filtrados);
   });
   ```

### Pistas
- `input` se dispara con **cada tecla** (es el mejor para esto).
- `keyup` también funciona pero pierde casos como "pegar con el mouse".
- Si está vacío el input, `"".includes("")` da `true` → muestra todos automáticamente.

### Notas / Aprendizajes
_(...)_

---

## Ejercicio 5 — Carrito (agregar, mostrar, eliminar)

### Objetivo
Que el botón "Agregar al carrito" de cada card funcione, se vea la lista del carrito en pantalla, y haya un botón "Eliminar" por item.

### Conceptos
- Array como "estado" de la aplicación.
- Delegación de eventos (escuchar en un padre y filtrar con `event.target`).
- Re-renderizar cuando cambia el estado.

### Pasos
1. Crear array global: `let carrito = []`.
2. Función `agregarAlCarrito(id)`:
   - Buscar la fruta en `productos` con `.find(p => p.id === id)`.
   - Hacer `carrito.push(fruta)`.
   - Llamar a `mostrarCarrito()`.
3. Función `mostrarCarrito()`:
   - Seleccionar `#items-carrito`.
   - Si `carrito.length === 0` → mostrar el mensaje vacío.
   - Si no, recorrer carrito y generar `<li class="bloque-item">` con el HTML pedido.
4. Función `eliminarProducto(indice)`:
   - `carrito.splice(indice, 1)`.
   - `mostrarCarrito()`.
5. Asignar los eventos a los botones (acá usamos **delegación**):
   ```js
   document.querySelector(".contenedor-productos").addEventListener("click", e => {
       if (e.target.matches("button")) {
           const id = Number(e.target.dataset.id);
           agregarAlCarrito(id);
       }
   });
   ```

### Pistas
- **Delegación de eventos**: en vez de poner un listener en cada botón (que tendrías que volver a poner cada vez que re-renderizás), ponés UN listener en el contenedor padre y dentro fijás qué se clickeó. Muy útil para elementos dinámicos.
- Para los botones eliminar, hace falta saber qué índice del carrito borrar. Una opción es `data-index="${i}"` al renderizar el carrito.

### Notas / Aprendizajes
_(...)_

---

## Ejercicio 6 — `localStorage`

### Objetivo
Que el carrito persista al recargar la página.

### Conceptos
- `localStorage` solo guarda strings → hay que serializar con `JSON`.
- `JSON.stringify(obj)` → convierte objeto/array a string.
- `JSON.parse(str)` → recupera el objeto/array.
- Inicializar el estado desde `localStorage` al arrancar.

### Pasos
1. Función `guardarCarrito()`:
   ```js
   localStorage.setItem("carrito", JSON.stringify(carrito));
   ```
2. Llamarla **cada vez** que `carrito` cambie: dentro de `agregarAlCarrito` y `eliminarProducto`.
3. Al arrancar (en `init()` o al declarar la variable):
   ```js
   let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
   ```
   El `|| []` es por si nunca se guardó nada → da `null` y queremos empezar con array vacío.

### Pista
- Probá hacerlo: agregás unas frutas, recargás (F5), y siguen ahí.
- Para "limpiar" el localStorage mientras desarrollás: en DevTools → Application → Local Storage → click derecho → Delete.

### Notas / Aprendizajes
_(...)_

---

## Ejercicio 7 — Contador, botones +/-, total

### Objetivo
- Mostrar cantidad por producto en el carrito (`+ 2 -`).
- Actualizar el contador del header.
- Mostrar el total del carrito abajo.

### Conceptos
- Cambiar la estructura del estado: el carrito pasa de `[fruta, fruta, fruta]` a `[{producto, cantidad}, ...]` o agrupando por id.
- `reduce()` para sumar (cantidad total y precio total).

### Pasos
1. **Cambiar la estructura del carrito**:
   ```js
   // Antes: [fruta1, fruta1, fruta2] (con duplicados)
   // Ahora: [{ ...fruta1, cantidad: 2 }, { ...fruta2, cantidad: 1 }]
   ```
2. En `agregarAlCarrito(id)`:
   - Si la fruta ya está en el carrito → `item.cantidad++`.
   - Si no, agregar `{ ...fruta, cantidad: 1 }`.
3. Funciones `incrementar(id)` y `decrementar(id)`:
   - Buscar el item.
   - Incrementar o decrementar `cantidad`.
   - Si `cantidad === 0`, hacer `splice` para sacarlo.
   - `mostrarCarrito()` y `guardarCarrito()`.
4. Actualizar el `<span id="contador-carrito">`:
   ```js
   const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
   document.querySelector("#contador-carrito").textContent = total;
   ```
5. Actualizar el total `<span id="precio-total">`:
   ```js
   const precio = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
   document.querySelector("#precio-total").textContent = `$${precio.toFixed(2)}`;
   ```

### Notas / Aprendizajes
_(...)_

---

## Ejercicio 8 — Ordenamiento

### Objetivo
4 botones que ordenen los productos: A-Z, Z-A, precio ↑, precio ↓.

### Conceptos
- `Array.prototype.sort(comparador)`.
- `localeCompare` para ordenar strings con acentos correctamente.

### Pasos
1. Agregar los 4 botones al HTML al lado del `<h2>Nuestras frutas</h2>`.
2. Cada botón tiene un `id` único.
3. Asignarles listeners:
   ```js
   document.querySelector("#orden-az").addEventListener("click", () => {
       const ordenados = [...productos].sort((a, b) => a.nombre.localeCompare(b.nombre));
       mostrarProductos(ordenados);
   });
   ```
4. Variantes:
   - Z-A: `b.nombre.localeCompare(a.nombre)` (al revés).
   - Precio ↑: `a.precio - b.precio`.
   - Precio ↓: `b.precio - a.precio`.

### Pista
- `[...productos]` crea una copia del array. Si hacés `productos.sort(...)` directamente **mutás el original**, lo cual puede traer problemas más adelante. Es buena práctica trabajar con copias.

### Notas / Aprendizajes
_(...)_

---

## Ejercicio 9 — Vaciar carrito + estado vacío

### Objetivo
- Botón "Vaciar carrito" que limpia todo.
- Cuando el carrito está vacío, mostrar imagen/mensaje "no hay productos".

### Conceptos
- Renderizado condicional (`if/else` en la función de render).
- Resetear el estado.

### Pasos
1. Agregar el botón "Vaciar carrito" al HTML en `.seccion-carrito`.
2. Listener:
   ```js
   document.querySelector("#btn-vaciar").addEventListener("click", () => {
       carrito = [];
       guardarCarrito();
       mostrarCarrito();
   });
   ```
3. En `mostrarCarrito()`, al principio:
   ```js
   if (carrito.length === 0) {
       document.querySelector("#items-carrito").innerHTML = `
           <img src="img/carrito-vacio.png" alt="">
           <p>No hay productos en el carrito.</p>
       `;
       return;
   }
   ```

### Pista
- Para el ícono de carrito vacío, podés bajar una imagen libre o usar un emoji 🛒.

### Notas / Aprendizajes
_(...)_

---

## Ejercicio 10 — Estilar (CSS)

### Objetivo
Replicar el diseño de `sample.png`.

### Análisis de `sample.png`
- **Header**: barra verde, logo a la izquierda, nombre alumno centrado, buscador centrado, contador a la derecha. Texto blanco.
- **Sección productos**: título "Nuestras frutas" centrado.
- **Cards**: grilla de 7 columnas (probablemente 4 en mobile, 7 en desktop), borde gris claro, padding interno, imagen, nombre en negrita, precio, botón verde con texto blanco.
- **Sección carrito**: fondo gris claro, lista con nombre - precio + botón rojo "Eliminar".
- **Total**: alineado a la derecha, abajo.

### Conceptos
- Variables CSS (`:root`).
- Flexbox (header).
- Grid (cards de productos).
- `border-radius`, `box-shadow`.
- Tipografía y colores.

### Pasos sugeridos
1. **Reset básico**:
   ```css
   * { box-sizing: border-box; margin: 0; padding: 0; }
   body { font-family: Arial, sans-serif; }
   ```
2. **Header** con flexbox: `display: flex; justify-content: space-between; align-items: center`.
3. **Cards** con grid: `grid-template-columns: repeat(7, 1fr)` en desktop, `repeat(2, 1fr)` en mobile.
4. **Variables de color**:
   ```css
   :root {
       --verde: #2e8b57;
       --gris-claro: #f5f5f5;
       --rojo: #e74c3c;
   }
   ```

### Notas / Aprendizajes
_(...)_

---

## Apuntes generales — lecciones cruzadas

A medida que aprendas cosas que se repiten en varios ejercicios, anotalas acá:

- _(Ejemplo: "Siempre que cambia el estado del carrito, llamar a `mostrarCarrito()` y `guardarCarrito()`")_
- _(...)_
- _(...)_

## Cosas que se preguntan típicamente en parcial

_(A medida que profundicemos, voy a marcar acá qué temas tienen alta probabilidad de aparecer en el parcial.)_

- Recorrer un array de objetos y generar HTML dinámico.
- Eventos (click, input) y delegación.
- localStorage con JSON.
- Filtrar y ordenar arrays.

## Glosario rápido

- **DOM**: Document Object Model. Representación en memoria del HTML que el navegador construye.
- **Evento**: una "cosa que pasa" en la página (click, scroll, escribir). Podemos reaccionar con `addEventListener`.
- **Callback**: función que pasamos como argumento a otra función para que la ejecute cuando algo pase.
- **Estado**: los datos que tu aplicación necesita recordar. En esta práctica, `productos` y `carrito` son el estado.
- **Render**: dibujar el estado en la pantalla.
