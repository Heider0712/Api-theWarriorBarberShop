const { response } = require("express");

const Usuario = require("../models/usuario");

const usuarioGet = async (req, res = response) => {
  // const { nombre } = req.query //Desestructuración

  const usuarios = await Usuario.find();

  res.json({
    //Respuesta en JSON
    usuarios,
  });
};

const usuarioPost = async (req, res) => {
  const body = req.body;
  let mensaje = "Usuario creado.";

  const usuarioExistenteCorreo = await Usuario.findOne({ correo: body.correo });
  const usuarioExistenteNombreUsuario = await Usuario.findOne({ nombreUsu: body.nombreUsu });
  const usuarioExistenteCelular = await Usuario.findOne({ celular: body.celular });

  if (usuarioExistenteNombreUsuario) {
    mensaje = "El nombre de usuario ya está en uso por otro usuario.";
  } else if (usuarioExistenteCorreo) {
    mensaje = "El correo ya está en uso por otro usuario.";
  } else if (usuarioExistenteCelular) {
    mensaje = "El número de celular ya está en uso por otro usuario.";
  } else {
    try {
      const usuario = new Usuario(body);
      await usuario.save();
    } catch (error) {
      mensaje = "Problemas al crear el usuario.";
      console.log(error);
    }
  }
  res.json({
    msg: mensaje,
  });
};

const usuarioPut = async (req, res) => {
  const { nombreUsu, nombre, apellidos, correo, password, celular, rol } = req.body;
  let mensaje = "Modificación exitosa";

  const usuarioExiste = await Usuario.findOne({ nombreUsu: nombreUsu });

  if (!usuarioExiste) {
    mensaje = "Usuario no encontrado";
  } else {
    try {
      if (correo !== usuarioExiste.correo) {
        const otroUsuarioConCorreo = await Usuario.findOne({ correo: correo });
        if (otroUsuarioConCorreo) {
          mensaje = "Ese correo ya está asignado a otro usuario";
        } else {
          usuarioExiste.correo = correo;
        }
      }
      if (celular !== usuarioExiste.celular) {
        const otroUsuarioConCelular = await Usuario.findOne({ celular: celular });
        if (otroUsuarioConCelular) {
          mensaje = "Ese número de celular ya está asignado a otro usuario.";
        } else {
          usuarioExiste.celular = celular;
        }
      }

      usuarioExiste.password = password;
      usuarioExiste.rol = rol;

      await usuarioExiste.save();
    } catch (error) {
      mensaje = "Problemas al modificar";
      console.log(error);
    }
  }

  res.json({
    msg: mensaje,
  });
};

const usuarioDelete = async (req, res = response) => {
  const { _id } = req.body;
  let mensaje = "Eliminación exitosa";
  try {
    await Usuario.deleteOne({ _id: _id });
  } catch (error) {
    mensaje = "Problemas al eliminar";
    console.log(error);
  }
  res.json({
    msg: mensaje,
  });
};

module.exports = { usuarioGet, usuarioPost, usuarioPut, usuarioDelete };
