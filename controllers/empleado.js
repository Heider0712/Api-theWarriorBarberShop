const { response } = require("express");

const Empleado = require("../models/empleado");
// const Usuario = require("../models/usuario"); para conectar con usurios y hacer consulta con usuarios para mas adelante

const empleadoGet = async (req, res = response) => {
  const empleados = await Empleado.find();

  res.json({
    empleados,
  });
};

const empleadoPost = async (req, res) => {
  const body = req.body;
  let mensaje = "Empleado creado.";

  const empleadoExistenteCorreo = await Empleado.findOne({ correo: body.correo });
  const empleadoExistenteNombreUsuario = await Empleado.findOne({ nombreUsu: body.nombreUsu });
  const empleadoExistenteCelular = await Empleado.findOne({ celular: body.celular });

  if (empleadoExistenteNombreUsuario) {
    mensaje = "El nombre de usuario ya está en uso por otro usuario.";
  } else if (empleadoExistenteCorreo) {
    mensaje = "El correo ya está en uso por otro usuario.";
  } else if (empleadoExistenteCelular) {
    mensaje = "El número de celular ya está en uso por otro usuario.";
  } else {
    try {
      const empleado = new Empleado(body);
      await empleado.save();
    } catch (error) {
      mensaje = "Problemas al crear el empleado.";
      console.log(error);
    }
  }
  res.json({
    msg: mensaje,
  });
};

const empleadoPut = async (req, res) => {
  const { nombreUsu, nombre, apellidos, correo, password, celular, porcentajeGanancias } = req.body;
  let mensaje = "Modificación exitosa";

  const empleadoExistente = await Empleado.findOne({ nombreUsu: nombreUsu });

  if (!empleadoExistente) {
    mensaje = "Empleado no encontrado.";
  } else {
    try {
      if (correo !== empleadoExistente.correo) {
        const otroEmpleadoConCorreo = await Empleado.findOne({ correo: correo });
        if (otroEmpleadoConCorreo) {
          mensaje = "Ese correo ya está asignado a otro usuario.";
        } else {
          empleadoExistente.correo = correo;
        }
      }
      if (celular !== empleadoExistente.celular) {
        const otroEmpleadoConCelular = await Empleado.findOne({ celular: celular });
        if (otroEmpleadoConCelular) {
          mensaje = "Ese número de celular ya está asignado a otro usuario.";
        } else {
          empleadoExistente.celular = celular;
        }
      }

      empleadoExistente.password = password;

      await empleadoExistente.save();
    } catch (error) {
      mensaje = "Problemas al modificar";
      console.log(error);
    }
  }

  res.json({
    msg: mensaje,
  });
};

const empleadoDelete = async (req, res = response) => {
  const { _id } = req.body;
  let mensaje = "Eliminación exitosa";
  try {
    await Empleado.deleteOne({ _id: _id });
  } catch (error) {
    mensaje = "Problemas al eliminar";
    console.log(error);
  }
  res.json({
    msg: mensaje,
  });
};

module.exports = { empleadoGet, empleadoPost, empleadoPut, empleadoDelete };
