const app=require('./app.js')
const mongoose = require('mongoose')
const config = require('./config')

//Estableciando conexión a base de datos
mongoose.connect(config.db, (err, res) => {
    if(err){
        console.log(`Error al conectar a la base de datos: ${err}`)
    }else{
        console.log(`Conexión establecida...`)
        app.listen(config.port, () => {
            console.log(`API REST corriendo en http://localhost:${config.port}`)
        })
    }
})