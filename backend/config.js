module.exports={
    port: process.env.PORT || 3001,
    //Crear base de datos
    db: process.env.MONGODB||`mongodb+srv://testUser:R2uM531suOqsIDTI@cluster0-kvxw6.gcp.mongodb.net/test?retryWrites=true`
}