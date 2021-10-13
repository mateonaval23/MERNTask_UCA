const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController')
const auth = require('../middleware/auth')
const { check } = require('express-validator')


// Crear proyecto
// POST api/proyectos
router.post('/',
    auth,
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.crearProyecto

)

// Obtener proyectos
// GET api/proyectos/

router.get('/',
    auth,
    proyectoController.obtenerProyectos
)

// actualizar un proyecto 
// PUT api/proyectos/

router.put('/:id',  
    auth,
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.actualizarProyecto
)

//Eliminar Proyecto
// DELETE api/proyectos/
router.delete('/:id',  
    auth,
    proyectoController.eliminarProyecto
)
module.exports = router; 