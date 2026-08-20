document.addEventListener('DOMContentLoaded', () => {
    const formLogin = document.getElementById('formLogin');

    if (formLogin) {
        formLogin.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();

            try {
                // Petición a tu ruta de autenticación en el backend
                const respuesta = await fetch('http://localhost:4000/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });

                const data = await respuesta.json();

                if (respuesta.ok) {
                    // Guardamos el objeto usuario (que contiene el rol ADMIN o EMPLEADO)
                    localStorage.setItem('usuario', JSON.stringify(data.usuario));
                    
                    console.log("Acceso concedido al Inventario. Redirigiendo...");
                    
                    // Redirigir al panel principal del inventario
                    window.location.href = '../index.html'; // Ajusta a 'index.html' si están en la misma carpeta
                } else {
                    alert(data.mensaje || "Correo o contraseña incorrectos.");
                }
            } catch (error) {
                console.error("Error de conexión con el servidor:", error);
                alert("No se pudo conectar con el servidor del inventario.");
            }
        });
    }
});