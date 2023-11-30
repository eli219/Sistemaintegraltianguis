const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
// const fileUpload = require('express-fileupload');

const app = express();
const fs = require('fs');
const path = require('path');
const multer = require('multer');
// app.use(fileUpload());

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345",
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

let uploading = multer({
    dest: './public/files'
})


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

app.post('/registrarComerciante', (req, res) => {
    let folio;
    //Verificamos ultimo registro para obtener el folio
    db.execute(
        "SELECT folio FROM comerciantes ORDER BY folio DESC LIMIT 1",
        (err, result) => {
            if(err){
                res.status(500).json({ message: "No se pudo conectar a la base de datos"})
            }
            else{
                if(result.length == 0){
                    folio = 1;
                }
                else{
                    folio = result[0].folio + 1;
                }
                const { nombre, tianguis, metros, giro, piso, basura } = req.body.nuevoComerciante;
                let fecha = '2023-11-15';
            
                db.execute(
                    `INSERT INTO comerciantes (folio, fecha, nombre, tianguis, metros, giro, piso, basura ) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                    [folio, fecha, nombre, tianguis, metros, giro, piso, basura],
                    (err, result) => {
                        if (err) {
                            res.status(500).json({ error: "Error de servidor al intentar registar el comerciante" });
                        } else {
                            if (result.affectedRows == 1) {
                                res.send(result);
                            } else {
                                res.send(result).json({ message: "Error al registar el comerciante" });
                            }
                        }
                    }
                );
            }
        }
    );
});

app.get('/registrarComerciante', (req, res) => {
    
    db.execute(
        "SELECT * FROM comerciantes",
        (err, result) => {
            if(err){
                res.status(500).send(err);
            }
            else{
                return res.status(200).send(result);
            }
        }
    );
});

app.post('/buscarComerciante', (req, res) => {
    const nombre = req.body.nombre;
    db.execute(
        "SELECT * FROM comerciantes WHERE nombre = ? LIMIT 1",
        [nombre],
        (err, result) => {
            if(err){
                res.status(500).send(err);
            }
            else{
                return res.status(200).send(result);
            }
        }
    );
});

app.post('/subirimagen', uploading.single('file'), (req, res) =>{
    if (req.file.length == 0) {
        res.status(400).send('Ingrese una imagen');
    }
    else{
        if (req.file.mimetype.indexOf('image/jpeg') >= 0 || req.file.mimetype.indexOf('image/png') >= 0) {
            const { folio, nombre, tianguis, fecha } = JSON.parse(req.body.folioComerciante);
            const monto = JSON.parse(req.body.monto);
            let codigoqr = req.file.filename;
            db.execute(
                `INSERT INTO comerciantespago (folio, nombre, tianguis, fecha, codigoqr, monto ) 
                VALUES (?, ?, ?, ?, ?, ?)`,
                [folio, nombre, tianguis, fecha, codigoqr, monto],
                (err, result) => {
                    if (err) {
                        res.status(500).json({ error: "Error de servidor al intentar registar el comerciante" });
                    } else {
                        if (result.affectedRows == 1) {
                            res.send(result);
                        } else {                            
                            res.status(200).send(req.file.filename);
                        }
                    }
                }
            );
        }
        else{
            res.status(400).send('Formato de imagen no valido');
        }
    }
});

app.get('/listarPagosComerciante', (req, res) => {
    db.execute(
        "SELECT * FROM comerciantespago",
        (err, result) => {
            if(err){
                res.status(500).send(err);
            }
            else{
                return res.status(200).send(result);
            }
        }
    );
});

app.post('/mostrarImagen', (req, res) => {
    const codigoqr = req.body.codigoqr;

    if(codigoqr != undefined){
        const rutaArchivo = path.join(__dirname, 'public/files', codigoqr);
        res.sendFile(rutaArchivo);
    }
    else{
        res.status(500).send('Error el enviar el codigo')
    }
});

app.post('/registrarTarifa', (req, res) => {

    

    if(req.body.nuevaTarifa != undefined){
        let id = 0;
        db.execute(
            "SELECT id FROM tarifatianguis ORDER BY id DESC LIMIT 1",
            (err, result) => {
                if(err){
                    res.status(500).json({ message: "No se pudo conectar a la base de datos"})
                }
                else{
                    if(result.length == 0){
                        id = 1;
                    }
                    else{
                        id = result[0].id + 1;
                    }

                    
                    const { nombre, precio, basura } = req.body.nuevaTarifa;                
                    db.execute(
                        `INSERT INTO tarifatianguis (id, nombreTianguis, costoMetros, tarifaBasura ) 
                        VALUES (?, ?, ?, ?)`,
                        [id, nombre, precio, basura],
                        (err, result) => {
                            if (err) {
                                res.status(500).json({ error: "Error de servidor al intentar registar la tarifa" });
                            } else {
                                if (result.affectedRows == 1) {
                                    res.send(result);
                                } else {
                                    res.send(result).json({ message: "Error al registar el comerciante" });
                                }
                            }
                        }
                    );
                }
            }
        );
    }
    else{
        res.status(500).send('No se ha enviado los datos de la tarifa');
    }    
});

app.get('/listarTarifa', (req, res) => {
    db.execute(
        "SELECT * FROM tarifatianguis",
        (err, result) => {
            if(err){
                res.status(500).send(err);
            }
            else{
                return res.status(200).send(result);
            }
        }
    );
});


app.listen(3001, () => {
    console.log("Servidor en funcionamiento en el puerto 3001");
});