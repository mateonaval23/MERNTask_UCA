const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

exports.autenticarUsuario = async (req, res) => {

    // Revisar si hay errores

    const errores = validationResult(req)
    if(!errores.isEmpty()){
        return res.status(400).json({ errores: errores.array()})
    }

    // extraer el email y el passowrd
    const {email, password} = req.body


    try {
        // Revisar si el usuario existe en la base
        let usuario = await Usuario.findOne({ email});

        if(!usuario){
            return res.status(400).json({ msg: 'Usuario y/o contraseña incorrecto'})
        }

        // Revisar el password
        const passCorreto = await bcryptjs.compare(password, usuario.password)
        if(!passCorreto){
            return res.status(400).json({msg: 'Usuario y/o contraseña incorrecto'})
        }

        // crear y firmar el jwt
        const payload = {
            usuario : {
                id: usuario.id
            }
        }

        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600 // 1 hora
        }, (error, token) => {
            if(error) throw error

            res.json({ token })
        })
        

    } catch (error) {
        console.log(error)
        res.status(400).send('Hubo un error')
    }
}

// Obtine usuario autenticado
exports.usuarioAutenticado = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id).select('-password')
        res.json({usuario})
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error')
    }
}