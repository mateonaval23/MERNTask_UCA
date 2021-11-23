const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')
const { check } = require('express-validator')
const auth = require('../middleware/auth')
// Iniciar Sesion
// api/auth
router.post('/', 
    [
        check('email', 'Agrega un email valido').isEmail(),
        check('password', 'El password debe tener 6 caracteres minimo').isLength({min: 6})
    ],
    authController.autenticarUsuario

)

// Obtiene el usuario autenticado
router.get('/',
    auth,
    authController.usuarioAutenticado
)
module.exports = router;