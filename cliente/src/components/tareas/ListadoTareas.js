import React, { Fragment, useContext } from 'react';
import Tarea from './Tarea';
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'


const ListadoTareas = () => {

    // obtener el state del proyecto
    const proyectosContext = useContext(proyectoContext)
    const { proyectoSeleccionado, eliminarProyecto } = proyectosContext


    // obtener el state de la tarea
    const tareasContext = useContext(tareaContext)
    const { tareasproyecto} = tareasContext

    if(!proyectoSeleccionado) return <h2>Selecciona un proyecto</h2>


    const onClickEliminar = () =>{
        eliminarProyecto(proyectoSeleccionado.id)
    }

    return (  
        <Fragment>
            <h2>Proyecto: {proyectoSeleccionado.nombre} </h2>
            <ul className="listado-tareas">
                {tareasproyecto.map(tarea => (
                    <Tarea
                        key={tarea.id}
                        tarea={tarea}
                    />
                ))}
               
            </ul>

            <button
                type="button"
                className="btn btn-eliminar"
                onClick={onClickEliminar}
            >Eliminar Proyecto &times;</button>
        </Fragment>
    );
}
 
export default ListadoTareas;