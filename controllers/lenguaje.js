const { response } = require('express');

const Perfil = require('../models/perfil');
const Usuario = require('../models/usuario');
const Herramienta = require('../models/herramientas');
const Lenguaje = require('../models/lenguaje');

const Momento = require('moment');
require('moment/locale/es');
const { generarJWT } = require('../helpers/jwt');



// Obtener Lenguajes
const getLenguaje = async(req, res) => {

    const desde = Number(req.query.desde) || 0;


    const [lenguajes, total] = await Promise.all([
        Lenguaje
        .find({}, 'nombre'),
        Lenguaje.countDocuments()
    ]);

    if (total === 0) {
        res.json({
            ok: false,
            msg: 'No se encontraron lenguajes',
            total
        });
    }

    res.json({
        ok: true,
        lenguajes,
        total
    });


};

// Crear Lenguajes
const crearLenguajes = async(req, res = response) => {

    // const { email, password } = req.body;

    try {


        const uid = req.uid;
        console.log(req.uid);

        const lenguaje = new Lenguaje(req.body);
        lenguaje.created = new Date();
        lenguaje.usuario = uid;
        lenguaje.nombre = req.body.nombre;

        console.log(uid);

        // Guardar perfil 
        await lenguaje.save();

        res.json({
            ok: true,
            lenguaje
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado - revisar logs'
        });
    }
};


// Actualizar Lenguaje

const actualizarLenguajes = async(req, res = response) => {


    // TODO: validar token y comprobar si es el usuario correcto

    const uid = req.params.id;
    // const nombre = req.body.nombre;

    console.log(uid);


    try {

        const lenguajeDB = await Lenguaje.findById(uid);

        if (!lenguajeDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe Herramienta con ese id'
            });
        }

        // Actualización
        //const  { nombre } = req.body;

        const cambiosLenguaje = {
            // telefono: { $push: { numero: req.body.telefono } },
            ...req.body
        };


        const lenguajesActualizado = await Lenguaje.findByIdAndUpdate(uid, cambiosLenguaje, { new: true });
        //const perfilActualizado = await Perfil.findByIdAndUpdate(uid, campos, ({ $push: { perfilado: perfilado } }), { new: true });
        //const perfilActualizado2 = await Perfil.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            herramienta: lenguajesActualizado,
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

const borrarLenguajes = async(req, res = response) => {

    const id = req.params.id;

    try {

        const lenguaje = await Lenguaje.findById(id);

        if (!lenguaje) {
            return res.status(404).json({
                ok: false,
                msg: 'Herramienta no encontrado por el ID'
            });
        }

        await Lenguaje.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Lenguaje Borrado'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};



module.exports = {
    getLenguaje,
    crearLenguajes,
    actualizarLenguajes,
    borrarLenguajes
};