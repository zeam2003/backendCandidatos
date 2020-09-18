const { response } = require('express');

const Perfil = require('../models/perfil');

const Momento = require('moment');
require('moment/locale/es');
const { generarJWT } = require('../helpers/jwt');


const getPerfiles = async(req, res = response) => {

    const desde = Number(req.query.desde) || 0;
    /* console.log(desde);

    const usuarios = await Usuario
        .find({}, 'nombre email role google')
        .skip(desde)
        .limit(5);

    const total = await Usuario.count(); */

    const [perfiles, total] = await Promise.all([
        Perfil
        .find({}, 'nombre')
        .populate('usuario', 'nombre email img')
        .skip(desde)
        .limit(5),
        Perfil.countDocuments()
    ]);

    res.json({
        ok: true,
        perfiles,
        total
    });
};

const crearPerfiles = async(req, res = response) => {

    const uid = req.uid;
    const perfil = new Perfil({
        usuario: uid,
        created: Momento().format('LLLL'),
        ...req.body
    });


    try {

        const perfilDB = await perfil.save();

        res.json({
            ok: true,
            perfiles: perfilDB
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Contactese con el administrador'
        });
    }

    /* 
        const uid = req.uid;

        console.log(req.uid);

        const { nombre } = req.body;

        const perfil = new Perfil({
            usuario: uid,
            created: Momento().format('LLLL'),
            ...req.body
        });

        await perfil.save();

        res.json({
            ok: true,
            Perfil: perfil
        });
     */

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
    getPerfiles,
    crearPerfiles
};