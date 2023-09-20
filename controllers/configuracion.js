const { response } = require("express");

const Configuracion = require("../models/configuracion");

const configuracionGet = async (req, res = response) => {
  // const { nombre } = req.query //Desestructuración

  const configuraciones = await Configuracion.find();

  res.json({
    //Respuesta en JSON
    configuraciones,
  });
};

const configuracionPost = async (req, res) => {
  const body = req.body;
  mensaje = "Inserción exitosa.";

  const existenteRol = await Configuracion.findOne({ rol: body.rol });

  if (existenteRol) {
    mensaje = "Ese rol ya está creado";
  } else {
    try {
      const configuracion = new Configuracion(body);
      await configuracion.save();
    } catch (error) {
      mensaje = "Problemas al insertar.";
      console.log(error);
    }
  }
  res.json({
    msg: mensaje,
  });
};

const configuracionPut = async (req, res) => {
  const { _id, rol, estado, permisos } = req.body;
  let mensaje = "Modificación exitosa.";

  const existeRol = await Configuracion.findOne({ _id: _id });

  if (!existeRol) {
    mensaje = "Id de rol no encontrada";
    return res.json({ msg: mensaje });
  }

  try {
    if (rol !== existeRol.rol) {
      const otroRol = await Configuracion.findOne({ rol: rol });
      if (otroRol) {
        mensaje = "Ya existe un rol con ese nombre.";
        return res.json({ msg: mensaje });
      } else {
        existeRol.rol = rol;
      }
    }

    existeRol.estado = estado !== undefined ? estado : existeRol.estado;
    existeRol.permisos = permisos !== undefined ? permisos : existeRol.permisos;

    await existeRol.save();
  } catch (error) {
    mensaje = "Problemas al modificar.";
    console.log(error);
  }
  await Configuracion.findOneAndUpdate({ _id: _id }, { estado: estado });

  res.json({
    msg: mensaje,
  });
};

const configuracionDelete = async (req, res = response) => {
  const { _id } = req.body;
  let mensaje = "Eliminación exitosa.";
  try {
    await Configuracion.deleteOne({ _id: _id });
  } catch (error) {
    mensaje = "Problemas al eliminar.";
    console.log(error);
  }
  res.json({
    msg: mensaje,
  });
};

module.exports = { configuracionGet, configuracionPost, configuracionPut, configuracionDelete };
