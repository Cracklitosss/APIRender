import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const users = [
    {
        email: "test@test.com",
        password: "123456"
    }
];

const productos = [
    {
        id: 1,
        nombre: "Arroz",
        precio: 25.50,
        stock: 100,
        categoria: "Granos"
    },
    {
        id: 2,
        nombre: "Frijoles Negros",
        precio: 30.00,
        stock: 80,
        categoria: "Granos"
    },
    {
        id: 3,
        nombre: "Leche Deslactosada",
        precio: 45.75,
        stock: 50,
        categoria: "Lácteos"
    },
    {
        id: 4,
        nombre: "Pan Integral",
        precio: 18.90,
        stock: 30,
        categoria: "Panadería"
    },
    {
        id: 5,
        nombre: "Manzanas",
        precio: 12.50,
        stock: 150,
        categoria: "Frutas"
    },
    {
        id: 6,
        nombre: "Pollo Entero",
        precio: 89.99,
        stock: 25,
        categoria: "Carnes"
    },
    {
        id: 7,
        nombre: "Aceite de Oliva",
        precio: 75.00,
        stock: 40,
        categoria: "Aceites"
    },
    {
        id: 8,
        nombre: "Pasta Integral",
        precio: 22.30,
        stock: 60,
        categoria: "Pastas"
    }
];

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        res.json({
            success: true,
            token: "fake-jwt-token",
            message: "Login exitoso"
        });
    } else {
        res.status(401).json({
            success: false,
            message: "Credenciales inválidas"
        });
    }
});

app.get('/api/productos', (req, res) => {
    res.json(productos);
});

app.get('/api/productos/:id', (req, res) => {
    const producto = productos.find(p => p.id === parseInt(req.params.id));
    if (!producto) {
        return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json(producto);
});

app.post('/api/productos', (req, res) => {
    const { nombre, precio, stock, categoria } = req.body;
    const nuevoProducto = {
        id: productos.length + 1,
        nombre,
        precio,
        stock,
        categoria
    };
    productos.push(nuevoProducto);
    res.status(201).json(nuevoProducto);
});

app.put('/api/productos/:id', (req, res) => {
    const producto = productos.find(p => p.id === parseInt(req.params.id));
    if (!producto) {
        return res.status(404).json({ message: "Producto no encontrado" });
    }

    const { nombre, precio, stock, categoria } = req.body;
    producto.nombre = nombre || producto.nombre;
    producto.precio = precio || producto.precio;
    producto.stock = stock || producto.stock;
    producto.categoria = categoria || producto.categoria;

    res.json(producto);
});

app.delete('/api/productos/:id', (req, res) => {
    const index = productos.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ message: "Producto no encontrado" });
    }

    productos.splice(index, 1);
    res.json({ message: "Producto eliminado exitosamente" });
});

// Agregar endpoint para registro de usuarios
app.post('/api/registro', (req, res) => {
    const { email, password } = req.body;
    
    // Verificar si el usuario ya existe
    const usuarioExistente = users.find(u => u.email === email);
    if (usuarioExistente) {
        return res.status(400).json({
            success: false,
            message: "El usuario ya existe"
        });
    }

    // Crear nuevo usuario
    const nuevoUsuario = {
        email,
        password // En una aplicación real, deberías hashear la contraseña
    };
    
    users.push(nuevoUsuario);
    
    res.status(201).json({
        success: true,
        message: "Usuario registrado exitosamente"
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
}); 