const { Router } = require('express')

const route = Router()

const { pruebaGet, pruebaPost, pruebaPut, pruebaDelete } = require('../controllers/prueba')

route.get('/', pruebaGet)

route.post('/', pruebaPost)

route.put('/', pruebaPut)

route.delete('/', pruebaDelete)

module.exports = route