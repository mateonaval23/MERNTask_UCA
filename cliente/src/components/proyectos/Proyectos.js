import React from 'react';
import Barra from '../layout/Barra';
import Sidebar from '../layout/Sidebar';
import FormTareas from '../tareas/FormTareas';
import ListadoTareas from '../tareas/ListadoTareas';

const Proyectos = () => {
    return (  

        <div className="contenedor-app">
            
            <Sidebar/>
            
            <div className="seccion-principal">

                <Barra/>

                <main>
                    <FormTareas/>
                    <div className="contenedor-tareas">
                        <ListadoTareas/>
                    </div>
                </main>
            </div>
        </div>
    );
}
 
export default Proyectos;