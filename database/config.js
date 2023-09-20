const mongoose = require('mongoose') //Paquete que permite hacer transacciones desde mongo

//Establece la conección de forma asíncrona
const dbConnection = async () => {
    //Captura de errores
    try {
        //Envía la conección
        mongoose.connect(process.env.MONGO_CNN)
        console.log('Conexión exitosa a la base de datos de Mongodb')
    }
    catch (error) {
        //Atrapa el error
        console.log(error)
    }
}

//Exporta la cadena de conección
module.exports = { dbConnection }