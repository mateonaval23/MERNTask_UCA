import React, { useReducer } from 'react';
import {v4 as uuid} from 'uuid'

import proyectoContext from './proyectoContext'
import proyectoReducer from './proyectoReducer'

import clienteAxios from '../../config/axios'
import { 
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
    PROYECTO_ERROR
} from '../../types'


const ProyectoState = props => {

    

    const initialState = {
        proyectos: [],
        formulario: false,
        errorformulario: false,
        proyectoSeleccionado: null,
        mensaje: null
    }

    // Dispatch para ejecutar las acciones que van a modificar mis state
    // Se genera un destructuring de satate y dispatch
    const [state , dispatch] = useReducer(proyectoReducer, initialState)

    // Serie de funciones CRUD para proyectos
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    const obtenerProyectos = async () => {

        try {

            const resultado = await clienteAxios.get('/api/proyectos')

            dispatch({
                type: OBTENER_PROYECTOS,
                payload: resultado.data.proyectos
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }

    }

    const agregarProyecto = async proyecto => {

        try {
            const resultado = await clienteAxios.post('/api/proyectos', proyecto)

            dispatch({
                type: AGREGAR_PROYECTO,
                payload: resultado.data
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })

        }
    }

    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    }

    const proyectoActual = proyectoId => {

        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        })
    }


    const eliminarProyecto = async proyectoId =>{
        try {
            await clienteAxios.delete(`/api/proyectos/${proyectoId}`)
            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: proyectoId
            })


        } catch (error) {
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }

        
    }


    return (
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorformulario: state.errorformulario,
                proyectoSeleccionado: state.proyectoSeleccionado,
                mensaje: state.mensaje,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )

}

export default ProyectoState