import React, { useReducer } from 'react';

import { 
    AGREGAR_TAREA, 
    TAREAS_PROYECTO,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} from '../../types';

import TareaContext from './tareaContext'
import TareaReducer from './tareaReducer'

const TareaState = props => {
    const initialState ={
        tareas:[
            {id: 1, nombre:'Crear tablas', estado: false, proyectoId: 1},
            {id: 2, nombre:'Insertar datos', estado: false, proyectoId: 1},
            {id: 3, nombre:'Agregar diseño pantallas', estado: true, proyectoId: 2},
            {id: 4, nombre:'Agregar botones', estado: false, proyectoId: 2},
            {id: 5, nombre:'Diseño web responsive', estado: true, proyectoId: 2},
            {id: 6, nombre:'Agregar Carrito Compras', estado: false, proyectoId: 3},
            {id: 7, nombre:'Agregar medio pago', estado: true, proyectoId: 3},
            {id: 8, nombre:'Boton pagar', estado: false, proyectoId: 3},
            {id: 9, nombre:'Crear endpoint de APi', estado: true, proyectoId: 4}
        ],
        tareasproyecto: null,
        errortarea: false, 
        tareaseleccionada: null
    }

    // Crear dispatch y state
    const [ state, dispatch ] = useReducer(TareaReducer, initialState)




    // Obtener las tareas de un proyecto
    const obtenerTareas = proyectoId => {
        console.log(proyectoId)
        dispatch({
            type: TAREAS_PROYECTO,
            payload: proyectoId
        })
    }

    const agregarTarea = tarea => {
        console.log(tarea)
        dispatch({
            type: AGREGAR_TAREA,
            payload: tarea
        })
    }

    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    const eliminarTarea = tareaId => {
        dispatch({
            type: ELIMINAR_TAREA,
            payload: tareaId
        })
    }

    const actualizarTarea = tarea => {
        dispatch({
            type: ACTUALIZAR_TAREA,
            payload: tarea
        })
    }


    const guardarTareaActual = tarea =>{
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    //Eliminar la tarea seleccionada
    const limpiarTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA
        })
    }


    return (
        <TareaContext.Provider
            value={{
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )
}

export default TareaState;