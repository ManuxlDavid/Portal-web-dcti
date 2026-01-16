let inventario = JSON.parse(localStorage.getItem('inventario')) || [];

const secciones = document.querySelectorAll('.section');
const botonesNav = document.querySelectorAll('.nav-btn');
const formAgregar = document.getElementById('formAgregar');
const formRetirar = document.getElementById('formRetirar');
const formModificar = document.getElementById('formModificar');
const tbodyInventario = document.getElementById('tbodyInventario');
const totalProductos = document.getElementById('totalProductos');
const valorTotal = document.getElementById('valorTotal');
const buscarProducto = document.getElementById('buscarProducto');
const notificacion = document.getElementById('notificacion');

botonesNav.forEach(btn => {
    btn.addEventListener('click', () => {
        botonesNav.forEach(b => b.classList.remove('active'));
        secciones.forEach(s => s.classList.remove('active'));
        
        btn.classList.add('active');
        const sectionId = btn.getAttribute('data-section');
        document.getElementById(sectionId).classList.add('active');

        if (sectionId === 'inventario') {
            actualizarTablaInventario();
        }
    });
});

formAgregar.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const producto = {
        codigo: document.getElementById('codigo').value.trim(),
        nombre: document.getElementById('nombre').value.trim(),
        categoria: document.getElementById('categoria').value,
        cantidad: parseInt(document.getElementById('cantidad').value),
        precio: parseFloat(document.getElementById('precio').value),
        fechaRegistro: new Date().toISOString()
    };

    if (inventario.some(p => p.codigo === producto.codigo)) {
        mostrarNotificacion('⚠️ El código ya existe. Use otro código.', 'warning');
        return;
    }
    
    inventario.push(producto);
    guardarInventario();
    mostrarNotificacion('✅ Producto agregado exitosamente', 'success');
    formAgregar.reset();

    if (document.getElementById('inventario').classList.contains('active')) {
        actualizarTablaInventario();
    }
});

formRetirar.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const codigo = document.getElementById('codigoRetirar').value.trim();
    const cantidadRetirar = parseInt(document.getElementById('cantidadRetirar').value);
    
    const productoIndex = inventario.findIndex(p => p.codigo === codigo);
    
    if (productoIndex === -1) {
        mostrarNotificacion('❌ Producto no encontrado', 'error');
        return;
    }
    
    if (inventario[productoIndex].cantidad < cantidadRetirar) {
        mostrarNotificacion(`⚠️ Cantidad insuficiente. Stock actual: ${inventario[productoIndex].cantidad}`, 'warning');
        return;
    }
    
    inventario[productoIndex].cantidad -= cantidadRetirar;

    if (inventario[productoIndex].cantidad === 0) {
        if (confirm('⚠️ El producto se quedará sin stock. ¿Desea eliminarlo del inventario?')) {
            inventario.splice(productoIndex, 1);
            mostrarNotificacion('🗑️ Producto eliminado del inventario', 'info');
        }
    } else {
        mostrarNotificacion(`✅ Se retiraron ${cantidadRetirar} unidades`, 'success');
    }
    
    guardarInventario();
    formRetirar.reset();
    actualizarTablaInventario();
});
formModificar.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const codigo = document.getElementById('codigoModificar').value.trim();
    const productoIndex = inventario.findIndex(p => p.codigo === codigo);
    
    if (productoIndex === -1) {
        mostrarNotificacion('❌ Producto no encontrado', 'error');
        return;
    }
    
    const producto = inventario[productoIndex];
    const nuevoNombre = document.getElementById('nuevoNombre').value.trim();
    const nuevaCantidad = document.getElementById('nuevaCantidad').value;
    const nuevoPrecio = document.getElementById('nuevoPrecio').value;
    
    let cambios = [];
    
    if (nuevoNombre) {
        producto.nombre = nuevoNombre;
        cambios.push('nombre');
    }
    
    if (nuevaCantidad) {
        producto.cantidad = parseInt(nuevaCantidad);
        cambios.push('cantidad');
    }
    
    if (nuevoPrecio) {
        producto.precio = parseFloat(nuevoPrecio);
        cambios.push('precio');
    }
    
    if (cambios.length === 0) {
        mostrarNotificacion('ℹ️ No se realizaron cambios', 'info');
        return;
    }
    
    inventario[productoIndex] = producto;
    guardarInventario();
    mostrarNotificacion(`✅ Producto modificado (${cambios.join(', ')})`, 'success');
    formModificar.reset();
    actualizarTablaInventario();
});

function actualizarTablaInventario(filtro = '') {
    tbodyInventario.innerHTML = '';
    let totalValor = 0;
    
    const productosFiltrados = inventario.filter(producto =>
        producto.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
        producto.codigo.toLowerCase().includes(filtro.toLowerCase()) ||
        producto.categoria.toLowerCase().includes(filtro.toLowerCase())
    );
    
    productosFiltrados.forEach(producto => {
        const valorProducto = producto.cantidad * producto.precio;
        totalValor += valorProducto;
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${producto.codigo}</td>
            <td>${producto.nombre}</td>
            <td><span class="categoria">${producto.categoria}</span></td>
            <td><span class="cantidad ${producto.cantidad < 10 ? 'bajo-stock' : ''}">${producto.cantidad}</span></td>
            <td>$${producto.precio.toFixed(2)}</td>
            <td>$${valorProducto.toFixed(2)}</td>
            <td>
                <button class="btn btn-sm btn-info" onclick="editarProducto('${producto.codigo}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-warning" onclick="eliminarProducto('${producto.codigo}')">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbodyInventario.appendChild(row);
    });
    
    totalProductos.textContent = productosFiltrados.length;
    valorTotal.textContent = totalValor.toFixed(2);
}

buscarProducto.addEventListener('input', (e) => {
    actualizarTablaInventario(e.target.value);
});

function editarProducto(codigo) {
    const producto = inventario.find(p => p.codigo === codigo);
    if (!producto) return;
    
    botonesNav.forEach(b => b.classList.remove('active'));
    secciones.forEach(s => s.classList.remove('active'));
    
    document.querySelector('[data-section="modificar"]').classList.add('active');
    document.getElementById('modificar').classList.add('active');

    document.getElementById('codigoModificar').value = producto.codigo;
    document.getElementById('nuevoNombre').value = producto.nombre;
    document.getElementById('nuevaCantidad').value = producto.cantidad;
    document.getElementById('nuevoPrecio').value = producto.precio;
    
    mostrarNotificacion(`✏️ Editando: ${producto.nombre}`, 'info');
}
function eliminarProducto(codigo) {
    if (!confirm('¿Está seguro de eliminar este producto?')) return;
    
    inventario = inventario.filter(p => p.codigo !== codigo);
    guardarInventario();
    mostrarNotificacion('🗑️ Producto eliminado', 'success');
    actualizarTablaInventario();
}
function guardarInventario() {
    localStorage.setItem('inventario', JSON.stringify(inventario));
}
function mostrarNotificacion(mensaje, tipo = 'info') {
    notificacion.textContent = mensaje;
    notificacion.className = 'notificacion show';
    const colores = {
        success: 'linear-gradient(135deg, #00b09b 0%, #96c93d 100%)',
        error: 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)',
        warning: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
        info: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    };
    
    notificacion.style.background = colores[tipo] || colores.info;
    
    setTimeout(() => {
        notificacion.classList.remove('show');
    }, 3000);
}
document.getElementById('btnExportar').addEventListener('click', () => {
    const csv = convertirACSV(inventario);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inventario_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    mostrarNotificacion('📄 Inventario exportado a CSV', 'success');
});

function convertirACSV(data) {
    const headers = ['Código', 'Nombre', 'Categoría', 'Cantidad', 'Precio', 'Valor Total'];
    const rows = data.map(item => [
        item.codigo,
        `"${item.nombre}"`,
        item.categoria,
        item.cantidad,
        item.precio.toFixed(2),
        (item.cantidad * item.precio).toFixed(2)
    ]);
    
    return [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
}
function cargarDatosEjemplo() {
    if (inventario.length === 0) {
        const datosEjemplo = [
            {
                codigo: 'PROD001',
                nombre: 'Caucho 195/65/15',
                categoria: 'Gomas',
                cantidad: 15,
                precio: 899.99,
                fechaRegistro: new Date().toISOString()
            },
            {
                codigo: 'PROD002',
                nombre: 'Rolinera Del Logan',
                categoria: 'Repuesto',
                cantidad: 50,
                precio: 24.99,
                fechaRegistro: new Date().toISOString()
            },
            {
                codigo: 'PROD003',
                nombre: 'Bombillo H4',
                categoria: 'Parte eléctrica',
                cantidad: 30,
                precio: 12.50,
                fechaRegistro: new Date().toISOString()
            }
        ];
        
        inventario = datosEjemplo;
        guardarInventario();
        mostrarNotificacion('📦 Datos de ejemplo cargados', 'info');
        actualizarTablaInventario();
    }
}

cargarDatosEjemplo();
actualizarTablaInventario();