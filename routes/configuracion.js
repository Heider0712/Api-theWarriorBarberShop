const { Router } = require('express') //Desestructuración. Extraer un atributo de un objeto.

const route = Router()

//Importar métodos del controlador
const { configuracionGet, configuracionPost, configuracionPut, configuracionDelete } = require('../controllers/configuracion')

route.get('/', configuracionGet)

route.post('/', configuracionPost)

route.put('/', configuracionPut)

route.delete('/', configuracionDelete)

module.exports = route