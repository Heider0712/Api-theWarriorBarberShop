const { Schema, model } = require('mongoose')
const UsuarioSchema = Schema({
    nombreUsu: {
        type: String,
        unique: true,
        required: [true, 'El usuario es obligatorio!'],
        minlength: [5, 'Debe tener mínimo 5 caracteres!'],
        maxlength: [20, 'Debe tener máximo 20 caracteres!']
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio!'],
        minlength: [4, 'Debe tener mínimo 4 caracteres!'],
        maxlength: [25, 'Debe tener máximo 25 caracteres!']
    },
    apellidos: {
        type: String,
        required: [true, 'Los apellidos son obligatorios!'],
        minlength: [3, 'Debe tener mínimo 3 caracteres!'],
        maxlength: [25, 'Debe tener máximo 25 caracteres!']
    },
    correo: {
        type: String,
        unique: true,
        required: [true, 'El correo es obligatorio!'],
        minlength: [12, 'Debe tener mínimo 12 caracteres!'],
        maxlength: [40, 'Debe tener máximo 40 caracteres!']
    },
    celular: {
        type: String,
        unique: true,
        required: [true, 'El número de celular es obligatorio!'],
        minlenght: [10, 'Ingrese un número válido!']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria!'],
        minlength: [8, 'Debe tener mínimo 8 caracteres!'],
        maxlength: [25, 'Debe tener máximo 25 caracteres!']
    },
    rol: {
        type: String,
        required: true,
        enum: ['Admin', 'Barbero', 'Cliente']
    }
})
module.exports = model('Usuario', UsuarioSchema)