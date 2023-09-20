const { Router } = require('express') //Desestructuración. Extraer un atributo de un objeto.

const route = Router()

//Importar métodos del controlador
const { usuarioGet, usuarioPost, usuarioPut, usuarioDelete } = require('../controllers/usuario')

route.get('/', usuarioGet)

route.post('/', usuarioPost)

route.put('/', usuarioPut)

route.delete('/', usuarioDelete)

module.exports = route