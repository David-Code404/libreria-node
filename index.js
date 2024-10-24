const express = require('express');
const bodyParser = require('body-parser'); // Para procesar datos de formularios
const app = express();
const port = 3000;

// Middleware para procesar datos de formularios
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Para procesar JSON

// Datos estáticos
const categories = [
    { id: 1, name: 'Libros de Texto', description: 'Libros utilizados en el aula' },
    { id: 2, name: 'Libros de Lectura', description: 'Libros recomendados para la lectura en casa' },
    { id: 3, name: 'Material Escolar', description: 'Artículos como cuadernos, lápices, etc.' },
    { id: 4, name: 'Libros de Referencia', description: 'Enciclopedias y diccionarios' }
];

const products = [
    { id: 1, name: 'Matemáticas 1', price: 25.00, categoryId: 1 },
    { id: 2, name: 'Cuentos de la Selva', price: 15.50, categoryId: 2 },
    { id: 3, name: 'Cuaderno Universitario', price: 3.00, categoryId: 3 },
    { id: 4, name: 'Enciclopedia Escolar', price: 35.99, categoryId: 4 }
];

const links = [
    { title: 'Enlace a Matemáticas', url: 'https://example.com/matematicas' },
    { title: 'Cuentos de la Selva', url: 'https://example.com/cuentos' },
    { title: 'Material Escolar', url: 'https://example.com/material' }
];

// Datos de usuarios
const users = [
    { id: 1, fullname: 'John Carter', email: 'john@gmail.com', password: 'password123' },
    { id: 2, fullname: 'Jane Doe', email: 'jane@gmail.com', password: 'password456' }
];

// Rutas
app.get('/api/categories', (req, res) => {
    res.json(categories);
});

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.get('/api/links', (req, res) => {
    res.json(links);
});

// Nueva ruta para obtener usuarios
app.get('/api/users', (req, res) => {
    res.json(users);
});

// Ruta para registrar usuarios
app.post('/api/register', (req, res) => {
    const { fullname, email, password } = req.body;
    const newUser = {
        id: users.length + 1, // Asignar un nuevo ID
        fullname,
        email,
        password
    };
    users.push(newUser);
    res.status(201).json({ message: 'Usuario registrado exitosamente', user: newUser });
});

// Ruta para iniciar sesión
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        res.json({ message: 'Inicio de sesión exitoso', user });
    } else {
        res.status(401).json({ message: 'Correo o contraseña incorrectos' });
    }
});

// Ruta principal
app.get('/', (req, res) => {
    res.send(`
        <h1>Bienvenido a la Librería en Línea</h1>
        <p>Visita las siguientes rutas:</p>
        <ul>
            <li><a href="/api/categories">Categorías</a></li>
            <li><a href="/api/products">Productos</a></li>
            <li><a href="/api/users">Usuarios</a></li>
        </ul>
    `);
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
