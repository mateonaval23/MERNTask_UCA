// Instanciar express y generar el servidor
const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');
// Crear el servidor 
const app = express();

// Conectar a la base de datos
conectarDB()

// Habilitar cors
app.use(cors());

// Habilitar que express reconozca json
app.use(express.json({ extended: true}))

// Seteamos el puerto de la APP
const port = process.env.PORT || 4000

app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/proyectos', require('./routes/proyectos'))
app.use('/api/tareas', require('./routes/tareas'))


app.listen(port, () =>{
    
    console.log(`El servidor esta funcionando en el puerto ${port}`)
})


