const express = require('express');
const path = require('path');
const db = require('./database/db.js');
const cursosRouter = require('./routers/cursosRouters.js');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API (opcional)
app.use('/api/cursos', cursosRouter);

// Página de bienvenida
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'bienvenida.html'));
});

// Página que muestra los cursos con EJS
app.get('/vista/cursos-ejs', (req, res) => {
  const sql = 'SELECT * FROM cursos';
  db.query(sql, (error, results) => {
    if (error) {
      console.error('Error al obtener los cursos: ' + error.message);
      return res.status(500).send('Error al obtener los cursos');
    }
    res.render('cursos', { cursos: results });
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
