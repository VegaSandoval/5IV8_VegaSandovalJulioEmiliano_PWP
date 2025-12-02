const mysql2 = require('mysql2');

const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'n0m3l0',   // pon aquí tu contraseña real de MySQL
    database: 'cursosdb'
});

db.connect((err) => {
    if (err) {
        console.error('Error de conexion a la base de datos: ' + err.stack);
        return;
    } else {
        console.log('Conexion exitosa a la base de datos');
    }
});

module.exports = db;
