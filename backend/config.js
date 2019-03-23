module.exports={
    port: process.env.PORT || 3001,
    //Crear base de datos
    db: process.env.MONGODB||`mongodb://localhost:27017/contacts`
}