const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');


const getUsuarios = async(req, res) => {

    const desde = Number(req.query.desde) || 0;
    /* console.log(desde);

    const usuarios = await Usuario
        .find({}, 'nombre email role google')
        .skip(desde)
        .limit(5);

    const total = await Usuario.count(); */

    const [usuarios, total] = await Promise.all([
        Usuario
        .find({}, 'nombre email img role google estado')
        .skip(desde)
        .limit(5),
        Usuario.countDocuments()
    ]);

    res.json({
        ok: true,
        usuarios,
        total
    });
};

// Total Usuarios
const totalUsuarios = async(req, res = response) => {

    try {
        const [total] = await Promise.all([
            Usuario
            .find({email: /ecosistemasmexico/}, 'email').count(),
           // Usuario.countDocuments()
           // Usuario.countDocuments()
        ]);
        res.json({
            ok: true,
            //usuarios,
            total
        });
    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'hable con el administrador'
        });
    }

};

const verificarEmail = async(req, res = response) => {
    const email = req.params.campo;
    console.log(email);

    try {
        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            console.log('estoy aca', this.existeEmail);
            return res.status(400).json({
                ok: false,
                msg: 'El correo está registrado'

            });

        } else {
            return res.status(200).json({
                ok: true,
                msg: 'usuario disponible'
            });
        }

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error, contacte al administrador'
        })
    }
}

const crearUsuarios = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo esta registrado'
            });
        }

        const usuario = new Usuario(req.body);
        usuario.created = new Date();

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);


        // Guardar usuario 
        await usuario.save();

        // Generar Token - JWT
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado - revisar logs'
        });
    }


};

// Actualizar Usuario
const actualizarUsuario = async(req, res = response) => {


    // TODO: validar token y comprobar si es el usuario correcto

    const uid = req.params.id;


    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }

        // Actualización
        const { password, google, email, estado, ...campos } = req.body;

        if (usuarioDB.email !== email) {

            const existeEmail = await Usuario.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }

        if (!usuarioDB.google) {
            campos.email = email;
        } else if (usuarioDB.email !== email) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuarios de Google no pueden cambiar su cuenta'
            });
        }

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        });
    }
};

// Actualizar usuario por Estado

// Borrar usuario
const borrarUsuario = async(req, res = response) => {

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }

        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Usuario Eliminado'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
};


module.exports = {
    getUsuarios,
    totalUsuarios,
    crearUsuarios,
    actualizarUsuario,
    borrarUsuario,
    verificarEmail
};