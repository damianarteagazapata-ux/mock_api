const API_URL = "https://69d78c0a9c5ebb0918c7ea7e.mockapi.io/productos";

// ==========================
// 🔹 GET
// ==========================
function obtenerProductos() {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            let filas = data.map(p => `
                <tr>
                    <td>${p.referencia}</td>
                    <td>${p.nombre}</td>
                    <td>${p.precio}</td>
                    <td>${p.stock}</td>
                    <td>${p.estado}</td>
                    <td>
                        <button onclick="editarProducto('${p.id}', '${p.referencia}', '${p.nombre}', '${p.precio}', '${p.stock}', '${p.estado}')">Editar</button>
                        <button onclick="eliminarProducto('${p.id}')">Eliminar</button>
                    </td>
                </tr>
            `).join("");

            document.getElementById("tabla").innerHTML = filas;
        });
}

// ==========================
// 🔹 POST
// ==========================
function crearProducto() {
    const referencia = document.getElementById("referencia").value;
    const nombre = document.getElementById("nombre").value;
    const precio = document.getElementById("precio").value;
    const stock = document.getElementById("stock").value;
    const estado = document.getElementById("estado").value;

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ referencia, nombre, precio, stock, estado })
    })
    .then(() => {
        limpiar();
        obtenerProductos();
    });
}

// ==========================
// 🔹 PUT
// ==========================
function editarProducto(id, ref, nom, pre, sto, est) {

    const referencia = prompt("Referencia:", ref);
    const nombre = prompt("Nombre:", nom);
    const precio = prompt("Precio:", pre);
    const stock = prompt("Stock:", sto);
    const estado = prompt("Estado:", est);

    if (referencia && nombre) {
        fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ referencia, nombre, precio, stock, estado })
        })
        .then(() => obtenerProductos());
    }
}

// ==========================
// 🔹 DELETE
// ==========================
function eliminarProducto(id) {
    fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    })
    .then(() => obtenerProductos());
}

// ==========================
// 🔹 LIMPIAR
// ==========================
function limpiar() {
    document.getElementById("referencia").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("stock").value = "";
    document.getElementById("estado").value = "";
}

// Cargar al inicio
obtenerProductos();