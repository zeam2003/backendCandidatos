const { response } = require('express');

const Perfil = require('../models/perfil');
const Usuario = require('../models/usuario');

const Momento = require('moment');
require('moment/locale/es');
const { generarJWT } = require('../helpers/jwt');

// Obtener Perfiles
const getPerfiles = async(req, res) => {

    const desde = Number(req.query.desde) || 0;


    const [perfiles, total] = await Promise.all([
        Perfil
        .find({}, 'areaExperiencia tecnologia perfilado')
        .skip(desde)
        .limit(5),
        Perfil.countDocuments()
    ]);

    if (total === 0) {
        res.json({
            ok: false,
            msg: 'No se encontraron perfiles',
            total
        });
    }

    res.json({
        ok: true,
        perfiles,
        total
    });


};

// Obtener Perfiles Tecnologia
const getPerfilesTecnologia = async(req, res) => {


    const [perfiles, total] = await Promise.all([
        Perfil
        .find({}, 'tecnologia'),
        Perfil.countDocuments()
    ]);

    if (total === 0) {
        res.json({
            ok: false,
            msg: 'No se encontraron perfiles',
            total
        });
    }

    res.json({
        ok: true,
        perfiles,
        total
    });

};


// Obtener Perfiles Tecnologia
const getPerfilesTecnologia2 = async(req, res) => {

    const valor = req.params.busqueda;

    console.log(valor);
    const [perfiles, total] = await Promise.all([
        Perfil.perfilado
        .find({}, { perfilado: valor }),
        Perfil.countDocuments()
    ]);

    if (total === 0) {
        res.json({
            ok: false,
            msg: 'No se encontraron perfiles',
            total
        });
    }

    res.json({
        ok: true,
        perfiles,
        total
    });

};


// Obtener Perfiles Tecnologia
const getPerfilesTecnologia3 = async(req, res) => {


    const [perfiles, total] = await Promise.all([
        Perfil
        .find({}, 'perfilado'),
        Perfil.countDocuments()
    ]);

    if (total === 0) {
        res.json({
            ok: false,
            msg: 'No se encontraron perfiles',
            total
        });
    }

    res.json({
        ok: true,
        perfiles,
        total
    });

};


/* const getPerfilesTecnologiaPerfil = async(req, res) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');
    const [perfiles, total] = await Promise.all([
        Perfil
        .find({}, regex),
        Perfi.countDocuments()
    ]);

    if (total === 0) {
        res.json({
            ok: false,
            msg: 'No se encontraron perfiles',
            total
        });
    }

    res.json({
        ok: true,
        perfiles,
        total
    });
}
 */
// Obtener Perfiles Tecnologia
const getPerfilesAreaExperiencia = async(req, res) => {


    const [perfiles, total] = await Promise.all([
        Perfil
        .find({}, 'areaExperiencia'),
        Perfil.countDocuments()
    ]);

    if (total === 0) {
        res.json({
            ok: false,
            msg: 'No se encontraron perfiles',
            total
        });
    }

    res.json({
        ok: true,
        perfiles,
        total
    });

};

// Crear Perfiles
const crearPerfiles = async(req, res = response) => {

    // const { email, password } = req.body;

    try {


        const uid = req.uid;
        console.log(req.uid);

        const perfil = new Perfil(req.body);
        perfil.created = new Date();
        perfil.usuario = uid;
        perfil.perfilado = req.body.perfilado;

        console.log(uid);

        // Guardar perfil 
        await perfil.save();

        res.json({
            ok: true,
            perfil
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado - revisar logs'
        });
    }
};

// Actualizar Perfil

const actualizarPerfil = async(req, res = response) => {


    // TODO: validar token y comprobar si es el usuario correcto

    const uid = req.params.id;

    console.log(uid);


    try {

        const perfilDB = await Perfil.findById(uid);

        if (!perfilDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe perfil con ese id'
            });
        }

        // Actualización
        const { perfilado, ...campos } = req.body;

        const cambiosPerfil = {
            // telefono: { $push: { numero: req.body.telefono } },

            perfilado: { $push: { perfilado: req.body.perfilado } },
            ...req.body,
        };

        console.log(campos.tecnologia);


        const perfilActualizado = await Perfil.findByIdAndUpdate(uid, cambiosPerfil, { new: true });
        //const perfilActualizado = await Perfil.findByIdAndUpdate(uid, campos, ({ $push: { perfilado: perfilado } }), { new: true });
        //const perfilActualizado2 = await Perfil.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            perfil: perfilActualizado,
            // perfilActualizado2
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        });
    }
};




module.exports = {
    getPerfiles,
    crearPerfiles,
    actualizarPerfil,
    getPerfilesTecnologia,
    getPerfilesAreaExperiencia,
    getPerfilesTecnologia2,
    getPerfilesTecnologia3
};