const { Router } = require('express');

const cursosController = require('../Controllers/cursosControl.js');

const cursosRouter = Router();

// GET all
cursosRouter.get('/', cursosController.getCursos);

// GET by ID
cursosRouter.get('/:id', cursosController.getCursosById);

// POST
cursosRouter.post('/registrar-curso', cursosController.createCurso);

// PUT
cursosRouter.put('/:id', cursosController.updateCurso);

// DELETE
cursosRouter.delete('/:id', cursosController.deleteCurso);

module.exports = cursosRouter;
