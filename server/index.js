const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "tianguis"
});

// Conexión a la base de datos
db.connect((err) => {
    if (err) {
        console.error("Error al conectar a la base de datos:", err);
    } else {
        console.log("Conexión exitosa a la base de datos");
    }
});

app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true,
    })
);

app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.execute(
        "SELECT * FROM users WHERE email = ? AND password = ?",
        [email, password],
        (err, result) => {
            if (err) {
                res.status(500).json({ error: "Error en la consulta a la base de datos" });
            } else {
                if (result.length > 0) {
                    res.status(200).json(result);
                } else {
                    res.status(401).json({ message: "Combinación de correo/contraseña incorrecta" });
                }
            }
        }
    );
});

app.listen(3001, () => {
    console.log("Servidor en funcionamiento en el puerto 3001");
});