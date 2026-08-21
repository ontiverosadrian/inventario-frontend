// auth.middleware.js
const jwt = require('jsonwebtoken');

// Middleware para verificar que el usuario está logueado
const verificarToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ mensaje: "No autorizado" });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ mensaje: "Token inválido" });
        req.usuario = decoded; // Aquí guardamos { id, rol }
        next();
    });
};

// Middleware para verificar si ES ADMIN
const esAdmin = (req, res, next) => {
    if (req.usuario && req.usuario.rol === 'ADMIN') {
        next();
    } else {
        res.status(403).json({ mensaje: "Solo administradores pueden hacer esto" });
    }
};

module.exports = { verificarToken, esAdmin };