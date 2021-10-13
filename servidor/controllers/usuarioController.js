const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

exports.crearUsuario = async (req, res) => {

    // Revisar si hay errores

    const errores = validationResult(req)


    if(!errores.isEmpty()){
        return res.status(400).json({ errores: errores.array()})
    }

    const {email, password} = req.body


    try {
        // Revisar si el usuario existe en la base
        let usuario = await Usuario.findOne({ email});

        if(usuario){
            return res.status(400).json({ msg: 'El usuario ya existe'})
        }

        // Crea el nuevo usuario para luego insertarlo
        usuario = new Usuario(req.body)


        // Hashear password

        const salt = await bcryptjs.genSalt(10)
        usuario.password = await bcryptjs.hash(password, salt)

        // guarda usuario
        await usuario.save();

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