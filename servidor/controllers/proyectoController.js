const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator')

exports.crearProyecto = async (req, res) => {

    const errores = validationResult(req)
    if(!errores.isEmpty()){
        return res.status(400).json({ errores: errores.array()})
    }

    // La logica para crear un proyecto
    try {
        
        // Crear un nuevo proyecto
        const proyecto = new Proyecto(req.body)
        // Guardar el creador via JWT
        proyecto.creador = req.usuario.id
        // guardar el proyecto propiamenmte dicho
        proyecto.save()

        res.json(proyecto)
        // por ultimo vamos devolver el proyecto guardado


    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un eror')
    }


}

exports.obtenerProyectos = async (req, res) => {
    try {
        const proyectos = await Proyecto.find({creador: req.usuario.id}).sort({ creado: -1 })
        res.json({proyectos})
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error')
    }
}

// Actualizar proyecto

exports.actualizarProyecto = async (req, res) => {

    const errores = validationResult(req)
    if(!errores.isEmpty()){
        return res.status(400).json({ errores: errores.array()})
    }

    // extraer la informacion del proyecto desde body

    const { nombre } = req.body
    const nuevoProyecto = {}
    
    if(nombre) {
        nuevoProyecto.nombre = nombre
    }

    try {
        // Revisar el id
        let proyecto = await Proyecto.findById(req.params.id)

        // si el proyecto no existe 
        if(!proyecto){
            return res.status(404).json({msg: 'Proyecto no encontrado'})
        }

        // validar si es creador del proyecto
        if(proyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'})
        }

        // Actualizar en la base de datos
        proyecto = await Proyecto.findByIdAndUpdate({_id: req.params.id}, {$set: nuevoProyecto}, {new : true})

        res.json({ proyecto})
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error')
    }

}

// Eliminar proyecto de manera fisica
exports.eliminarProyecto = async (req, res) => {

    try {
        // Revisar el id
        let proyecto = await Proyecto.findById(req.params.id)

        // si el proyecto no existe 
        if(!proyecto){
            return res.status(404).json({msg: 'Proyecto no encontrado'})
        }

        // validar si es creador del proyecto
        if(proyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'})
        }

        // Eliminar en la base de datos
        await Proyecto.findOneAndRemove({_id: req.params.id})

        res.json({ msg: 'Proyecto Eliminado'})
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error')
    }

}