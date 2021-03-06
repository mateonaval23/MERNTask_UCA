const Tarea = require('../models/Tarea')
const Proyecto = require('../models/Proyecto')
const { validationResult } = require('express-validator')


// Crear una nueva tarea

exports.crearTarea = async (req, res) => {

    // Revisar si hay errores
    const errores = validationResult(req)
    if(!errores.isEmpty()){
        return res.status(400).json({ errores: errores.array()})
    }

    try {
        
        // Extraer el proyecto del body y comprobar si ese proyecto existe
        const { proyecto } = req.body
        
        // Obtiene el objeto proyecto si existe
        const existeProyecto = await Proyecto.findById(proyecto)
        if(!existeProyecto){
            return res.status(404).json({msg: 'Proyecto no encontrado'})
        }

        // Revisar si el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No Autorizado'})
        }

        // Creamos la tarea en cuestion
        const tarea = new Tarea(req.body)
        await tarea.save()

        res.json({tarea})

    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error')
    }

}


// Obtener las tareas por proyecto
exports.obtenerTareas = async (req, res) => {
    try {
        // Extraer el proyecto del body y comprobar si ese proyecto existe
        
        const { proyectoId } = req.query

        // Obtiene el objeto proyecto si existe
        const existeProyecto = await Proyecto.findById(proyectoId)
        if(!existeProyecto){
            return res.status(404).json({msg: 'Proyecto no encontrado'})
        }

        // Revisar si el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No Autorizado'})
        }

        const tareas = await Tarea.find({ proyecto: proyectoId}).sort({creado: -1})
        res.json({tareas})
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error')
    }
}

exports.actualizarTarea = async (req, res) => {
    
    try {
        
        // Extraer el proyecto para luego validar si existe. Nombre y el estado del body

        const { proyecto, nombre, estado } = req.body

        // Si la tarea existe o no
        let tarea = await Tarea.findById(req.params.id)

        if(!tarea){
            return res.status(404).json({msg: 'La Tarea no existe'})
        }

        // Obtiene el objeto proyecto si existe
        const existeProyecto = await Proyecto.findById(proyecto)
        if(!existeProyecto){
            return res.status(404).json({msg: 'Proyecto no encontrado'})
        }

        // Revisar si el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No Autorizado'})
        }

        // Crear un nuevo objeto de tarea con la informacion a modifcar
        const nuevaTarea = {};
        nuevaTarea.nombre = nombre
        nuevaTarea.estado = estado

        // Guardar tarea
        tarea = await Tarea.findOneAndUpdate({_id: req.params.id}, {$set: nuevaTarea} , {new: true})

        res.json({ tarea })

    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error')
    }
}

// Eliminar tarea

exports.eliminarTarea = async (req, res) => {

    try {
        // Extraer el proyecto y comprobar si existe
   
         const { proyecto } = req.query
        
         // Si la tarea existe o no
         let tarea = await Tarea.findById(req.params.id)

         if(!tarea){
             return res.status(404).json({msg: 'La Tarea no existe'})
         }
 
         // Obtiene el objeto proyecto si existe
         const existeProyecto = await Proyecto.findById(proyecto)
         if(!existeProyecto){
             return res.status(404).json({msg: 'Proyecto no encontrado'})
         }
 
         // Revisar si el proyecto actual pertenece al usuario autenticado
         if(existeProyecto.creador.toString() !== req.usuario.id){
             return res.status(401).json({msg: 'No Autorizado'})
         }

         // Eliminar
         await Tarea.findOneAndRemove({_id: req.params.id})
         res.json({msg: 'Tarea eliminada'})


    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error')
    }

}