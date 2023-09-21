const { response } = require("express");

const Prueba = require("../models/prueba");
// const Usuario = require("../models/usuario"); para conectar con usurios y hacer consulta con usuarios para mas adelante

const pruebaGet = async (req, res = response) => {
  const prueba = await Prueba.find();

  res.json({
    prueba,
  });
};

const pruebaPost = async (req, res) => {
  const body = req.body;
  let mensaje = "Prueba creado.";

  const pruebaExistenteCorreo = await Prueba.findOne({ correo: body.correo });
  const pruebaExistenteNombreUsuario = await Prueba.findOne({ nombreUsu: body.nombreUsu });
  const pruebaExistenteCelular = await Prueba.findOne({ celular: body.celular });

  if (pruebaExistenteNombreUsuario) {
    mensaje = "El nombre de usuario ya está en uso por otro usuario.";
  } else if (pruebaExistenteCorreo) {
    mensaje = "El correo ya está en uso por otro usuario.";
  } else if (pruebaExistenteCelular) {
    mensaje = "El número de celular ya está en uso por otro usuario.";
  } else {
    try {
      const prueba = new Prueba(body);
      await prueba.save();
    } catch (error) {
      mensaje = "Problemas al crear el empleado.";
      console.log(error);
    }
  }
  res.json({
    msg: mensaje,
  });
};

const pruebaPut = async (req, res) => {
  const { nombreUsu, nombre, apellidos, correo, password, celular, porcentajeGanancias } = req.body;
  let mensaje = "Modificación exitosa";

  const pruebaExistente = await Prueba.findOne({ nombreUsu: nombreUsu });

  if (!pruebaExistente) {
    mensaje = "Empleado no encontrado.";
  } else {
    try {
      if (correo !== pruebaExistente.correo) {
        const otroPruebaConCorreo = await Prueba.findOne({ correo: correo });
        if (otroPruebaConCorreo) {
          mensaje = "Ese correo ya está asignado a otro usuario.";
        } else {
          pruebaExistente.correo = correo;
        }
      }
      if (celular !== pruebaExistente.celular) {
        const otroPruebaConCelular = await Prueba.findOne({ celular: celular });
        if (otroPruebaConCelular) {
          mensaje = "Ese número de celular ya está asignado a otro usuario.";
        } else {
          pruebaExistente.celular = celular;
        }
      }

      pruebaExistente.password = password;

      await pruebaExistente.save();
    } catch (error) {
      mensaje = "Problemas al modificar";
      console.log(error);
    }
  }

  res.json({
    msg: mensaje,
  });
};

const pruebaDelete = async (req, res = response) => {
  const { _id } = req.body;
  let mensaje = "Eliminación exitosa";
  try {
    await Prueba.deleteOne({ _id: _id });
  } catch (error) {
    mensaje = "Problemas al eliminar";
    console.log(error);
  }
  res.json({
    msg: mensaje,
  });
};

module.exports = { pruebaGet, pruebaPost, pruebaPut, pruebaDelete };
