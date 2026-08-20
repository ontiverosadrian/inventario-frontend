// Al cargar la página de productos
const usuario = JSON.parse(localStorage.getItem('usuario')); // Supongamos que lo guardas así al loguear

if (usuario && usuario.rol === 'EMPLEADO') {
    // Ocultar botones de borrar o editar
    const botonesAdmin = document.querySelectorAll('.btn-admin');
    botonesAdmin.forEach(btn => btn.style.display = 'none');
    
    // Solo mostrar el botón de "Hacer Solicitud"
}