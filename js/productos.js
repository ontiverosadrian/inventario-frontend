router.post('/productos', verificarToken, async (req, res) => {
    try {
        const { nombre, cantidad } = req.body;
        
        // Validación básica antes de guardar
        if (!nombre || cantidad === undefined) {
            return res.status(400).json({ mensaje: "Nombre y cantidad son requeridos" });
        }

        const nuevoProducto = new Producto({ nombre, cantidad });
        await nuevoProducto.save();
        res.status(201).json(nuevoProducto);
    } catch (err) {
        console.error("Error en servidor:", err);
        // Enviamos el mensaje real del error al frontend
        res.status(500).json({ mensaje: err.message });
    }
});