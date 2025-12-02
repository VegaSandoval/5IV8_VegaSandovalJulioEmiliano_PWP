import express from 'express';
import path from 'path';
// aqui se deben agregar las rutas que se van a consumir

const app = express();
const PORT = process.env.PORT || 3000;

const __dirname = path.resolve(); // Obtener el directorio actual

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(express.static(path.join(__dirname, '../Frontend','public')));

app.set('views engine', 'ejs');  
app.set('public', path.join(__dirname, '../Frontend','public'));
