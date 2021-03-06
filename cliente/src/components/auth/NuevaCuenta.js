import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom'

import AlertaContext from '../../context/alertas/alertaContext'
import AuthContext from '../../context/autenticacion/authContext'

const NuevaCuenta = (props) => {

    //extraer los valores del context
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    //extraer los valores del context
    const authContext = useContext(AuthContext);
    const {autenticado, registrarUsuario } = authContext;
    
    useEffect(() => {

        if(autenticado){
            props.history.push('/proyectos')
        }

    }, [autenticado, props.history])
    
    const [usuario, guardarUsuario] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar: ''
    })

    const {nombre, email, password, confirmar} = usuario
    
    const onChange = e => {
        guardarUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault()

        // Validar que no haya campos vacios
        if( nombre.trim() === '' ||
            email.trim() === '' ||
            password.trim() === '' ||
            confirmar.trim() === ''){
                mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
                return;
            }
        
        // Password minimo de 6 caracteres
        if(password.length < 6){
            mostrarAlerta('El password debe ser de al menos 6 caracteres', 'alerta-error')
            return;
        }

        // function confirm password
        if(password !== confirmar){
            mostrarAlerta('Los password no son iguales', 'alerta-error')
            return;
        }

        // Pasar la informacion al action (Context)+


        registrarUsuario({
            nombre,
            email, 
            password
        })
    }

    return (  
        <div className="form-usuario">
             { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> ) : null }
            <div className="contenedor-form sombra-dark">
                <h1>Crear nueva cuenta</h1>
                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="Tu Nombre"
                            value={nombre}
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Tu Email"
                            value={email}
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Tu Password"
                            value={password}
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="confirmar">Confirmar Password</label>
                        <input
                            type="password"
                            id="confirmar"
                            name="confirmar"
                            placeholder="Repeti tu Password"
                            value={confirmar}
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Registrarme"
                        />
                    </div>

                    <Link to={'/'} className="enlace-cuenta">
                        Volver a Login
                    </Link>

                </form>
            </div>
        </div>
    );
}
 
export default NuevaCuenta;