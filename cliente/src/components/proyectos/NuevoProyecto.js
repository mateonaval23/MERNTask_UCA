import React, { Fragment, useState, useContext } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext'


const NuevoProyecto = () => {

    // obtener el state del formulario
    const proyectosContext = useContext(proyectoContext)
    const { formulario, errorformulario, mostrarFormulario, agregarProyecto, mostrarError } = proyectosContext

    // se crea state local para el formulario del proyecto
    const [proyecto, guardarProyecto] = useState({
        nombre: ''
    })

    // Extraer nombre de proyecto
    const { nombre } = proyecto

    // Leer contenido del input nombre
    const onChangeProyecto = e => {
        guardarProyecto({
            ...proyecto,
            [e.target.name] : e.target.value
        })
    }

    // Cuando el usuario envia un proyecto (Submit)

    const onSubmitProyecto = e =>{
        e.preventDefault();

        // Validar el formulario
        if(nombre === ''){
            mostrarError()
            return;
        }

        // Agregar al state global el proyecto
        agregarProyecto(proyecto)

        // Reiniciar el form
        guardarProyecto({
            nombre: ''
        })
    }

    const onClickFormulario = () => {
        mostrarFormulario();
    }

    return (  
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={ onClickFormulario }
            >Nuevo Proyecto</button>

            {formulario ? 
            ( 
                <form
                    className="formulario-nuevo-proyecto"
                    onSubmit={ onSubmitProyecto }
                >
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre Proyecto"
                        name="nombre"
                        value={nombre}
                        onChange={onChangeProyecto}
                    />
                    <input
                        type="submit"
                        className="btn btn-primario btn-block"
                        value="Agregar Proyecto"
                    />
                </form>
            ) : null }
            { errorformulario ? <p className="mensaje error">El nombre del proyecto es obligatorio</p> : null}
        </Fragment>

    );
}
 
export default NuevoProyecto;