import React, { useState, useContext } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'
import {v4 as uuid} from 'uuid'

const FormTareas = () => {


    // obtener el state del proyecto
    const proyectosContext = useContext(proyectoContext)
    const { proyectoSeleccionado } = proyectosContext


    // obtener el state de la tarea
    const tareasContext = useContext(tareaContext)
    const { agregarTarea, obtenerTareas, errortarea, validarTarea } = tareasContext


    // state para el formulario de tarea

    const [ tarea, guardarTarea ] = useState({
        nombre: ''
    })

    // extraer nombre del state tarea

    const { nombre } = tarea

    if(!proyectoSeleccionado) return null;

    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }

    // agregzar una nueva tarea
    const onSubmit = e => {
        e.preventDefault()

        // validar el state o el formulario
        if(nombre.trim() === ''){
            validarTarea()
            return
        }

        // Agregar tarea nueva
        tarea.id = uuid()
        tarea.proyectoId = proyectoSeleccionado.id
        tarea.estado = false

        agregarTarea(tarea)

        // Obtener y filtrar las tareas del proyecto actual

        obtenerTareas(proyectoSeleccionado.id)

        // reiniciar el formulario

        guardarTarea({
            nombre: ''
        })

    }


    return (  
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea..."
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value="Agregar Tarea"
                    />
                </div>
            </form>

            {errortarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null}
        </div>
    );
}
 
export default FormTareas;