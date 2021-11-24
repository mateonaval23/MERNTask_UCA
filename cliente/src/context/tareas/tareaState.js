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
import clienteAxios from '../../config/axios';
const TareaState = props => {
    const initialState ={
        tareasproyecto: [],
        errortarea: false, 
        tareaseleccionada: null
    }

    // Crear dispatch y state
    const [ state, dispatch ] = useReducer(TareaReducer, initialState)




    // Obtener las tareas de un proyecto
    const obtenerTareas = async proyectoId => {
      
        try {

            const resultado = await clienteAxios.get('/api/tareas', { params: { proyectoId } })
            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data.tareas
            })
        } catch (error) {
            console.log(error)
        }


        
    }

    const agregarTarea = async tarea => {
        
        try {
            console.log(tarea)
            const resultado = await clienteAxios.post('/api/tareas', tarea)

            dispatch({
                type: AGREGAR_TAREA,
                payload: tarea
            })

        } catch (error) {
            console.log(error)
        }

        
    }

    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    const eliminarTarea = async (id, proyecto) => {
        try{

            await clienteAxios.delete(`/api/tareas/${id}`, { params: {proyecto} })
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })
        }catch(error){
            console.log(error)
        }
       
    }

    const actualizarTarea = async tarea => {

        try {
            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea)

            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data.tarea
            })
            
        } catch (error) {
            console.log(error)
        }

        
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