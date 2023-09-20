const { Schema, model } = require("mongoose");
const ConfiguracionSchema = Schema({
  rol: {
    type: String,
    unique: true,
    required: [true, "El rol es obligatorio!"],
  },
  estado: {
    type: String,
    required: [true, "El estado es obligatorio!"],
    enum: ["Activo", "Inactivo"],
  },
  permisos: [{
    type: String,
    required: [true, "El estado es obligatorio!"],
    enum: ["Configuración", "Usuarios", "Insumos", "Proveedores", "Empleados", "Agendamiento de citas", "Gastos operativos", "Clientes", "Ventas"],
  }],
});
module.exports = model("Configuracion", ConfiguracionSchema);
