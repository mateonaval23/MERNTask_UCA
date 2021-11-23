import React, { useReducer } from 'react';

import AuthContext from './authContext'
import AuthReducer from './authReducer'

import clienteAxios from '../../config/axios'

import tokenAuth from '../../config/token';
import { 
    REGISTRO_EXITOSO,
    LOGIN_EXITOSO,
    OBTENER_USUARIO,
    CERRAR_SESION
} from '../../types';

const AuthState = props => {

    const initialState ={
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null,
        mensaje: null,
        cargando: true
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    const { usuario, autenticado } = state

    const registrarUsuario = async datos => {
        try{
            
            const respuesta = await clienteAxios.post('/api/usuarios', datos);

            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data
            })

            // obtener usuario
            usuarioAutenticado()

        } catch(error){
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
        }
        
    }

    const iniciarSesion = async datos => {
        try{
            
            const respuesta = await clienteAxios.post('/api/auth', datos);

            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data
            })


            // obtener usuario
            usuarioAutenticado()
        } catch(error){
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
        }
    }

    const usuarioAutenticado = async () => {
        const token = localStorage.getItem('token');

        if(token){
            tokenAuth(token)
        }

        try {
            const respuesta = await clienteAxios.get('/api/auth');
            console.log("Respuesta usuario: ", respuesta)

            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data.usuario
            })

        } catch (error) {
            console.log(error)
        }
    }

    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        })
    }

    return(
        <AuthContext.Provider
            value={{
                usuario,
                autenticado,
                registrarUsuario,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion
            }}
        >
         {props.children}   
        </AuthContext.Provider>
    )
}

export default AuthState