// Define la URL de tu backend en Render (¡Ya configurada con tu enlace!)
const API_URL = "https://inventario-backend-mojz.onrender.com";

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("form"); // O el selector de tu formulario de login
    const errorMessage = document.querySelector(".error-message") || document.createElement("p"); // Ajusta según tu HTML

    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            // Obtén los valores de los inputs (asegúrate de que los IDs coincidan con tus inputs en el HTML)
            const email = document.querySelector("#email")?.value || document.querySelector("input[type='email']").value;
            const password = document.querySelector("#password")?.value || document.querySelector("input[type='password']").value;

            try {
                // Petición POST hacia tu backend en Render
                const response = await fetch(`${API_URL}/api/auth/login`, { // Cambia la ruta '/api/auth/login' si tu ruta en el backend es distinta
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    // Si el login es exitoso, guarda el token y redirige al dashboard o inventario
                    localStorage.setItem("token", data.token);
                    window.location.href = "dashboard.html"; // Cambia por la página principal de tu sistema
                } else {
                    // Muestra el mensaje de error que devuelva el servidor
                    mostrarError(data.message || "Correo o contraseña incorrectos.");
                }

            } catch (error) {
                console.error("Error de conexión:", error);
                mostrarError("No se pudo conectar con el servidor.");
            }
        });
    }

    function mostrarError(mensaje) {
        // Busca si ya hay un espacio para errores, si no, imprímelo en consola o alert
        let errorDiv = document.querySelector("#error-alert");
        if (!errorDiv) {
            errorDiv = document.createElement("div");
            errorDiv.id = "error-alert";
            errorDiv.style.color = "red";
            errorDiv.style.marginTop = "10px";
            errorDiv.style.textAlign = "center";
            loginForm.appendChild(errorDiv);
        }
        errorDiv.textContent = mensaje;
    }
});