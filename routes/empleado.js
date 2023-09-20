const { Router } = require('express')

const route = Router()

const { empleadoGet, empleadoPost, empleadoPut, empleadoDelete } = require('../controllers/empleado')

route.get('/', empleadoGet)

route.post('/', empleadoPost)

route.put('/', empleadoPut)

route.delete('/', empleadoDelete)

module.exports = route