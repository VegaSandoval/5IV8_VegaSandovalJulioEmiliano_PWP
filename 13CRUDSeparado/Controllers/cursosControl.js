// necesitamos crear un CRUD de cursos

// conexión con la BD
const bdConecction = require('../database/db.js');

// obtener todos los cursos
const getCursos = (req, res) => {
    try {
        bdConecction.query('SELECT * FROM cursos', (error, results) => {
            if (error) {
                console.log(error);
                return res.status(400).json({ message: 'Error al obtener los cursos' });
            } else {
                res.status(200).json(results);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

// obtener curso por ID
const getCursosById = (req, res) => {
    try {
        const { id } = req.params; // <-- AQUÍ SE OBTIENE EL ID

        bdConecction.query(
            'SELECT * FROM cursos WHERE id = ?',
            [id],                          // <-- COMA CORRECTA
            (error, results) => {          // <-- CALLBACK CORRECTO
                if (error) {
                    console.log(error);
                    return res.status(400).json({ message: 'Error al obtener el curso' });
                } else {
                    res.status(200).json(results);
                }
            }
        );

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

// Crear curso (POST)
const createCurso = (req, res) => {
    const { nombre, descripcion, docente } = req.body;

    const sql = 'INSERT INTO cursos(nombre, descripcion, docente) VALUES (?, ?, ?)';
    bdConecction.query(sql, [nombre, descripcion, docente], (error, results) => {
        if (error) {
            console.log(error);
            return res.status(400).json({ message: 'Error al crear el curso' });
        }
        res.status(201).json({ message: 'Curso creado correctamente', id: results.insertId });
    });
};

// Actualizar curso (PUT)
const updateCurso = (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, docente } = req.body;

    const sql = 'UPDATE cursos SET nombre=?, descripcion=?, docente=? WHERE id=?';
    bdConecction.query(sql, [nombre, descripcion, docente, id], (error, results) => {
        if (error) {
            console.log(error);
            return res.status(400).json({ message: 'Error al actualizar el curso' });
        }
        res.status(200).json({ message: 'Curso actualizado correctamente' });
    });
};

// Eliminar curso (DELETE)
const deleteCurso = (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM cursos WHERE id=?';
    bdConecction.query(sql, [id], (error, results) => {
        if (error) {
            console.log(error);
            return res.status(400).json({ message: 'Error al eliminar el curso' });
        }
        res.status(200).json({ message: 'Curso eliminado correctamente' });
    });
};


module.exports = {
    getCursos,
    getCursosById,
    createCurso,
    updateCurso,
    deleteCurso
};