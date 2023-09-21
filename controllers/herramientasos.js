const { response } = require('express');

const Perfil = require('../models/perfil');
const Usuario = require('../models/usuario');
const Herramientaos = require('../models/herramientasos');

const Momento = require('moment');
require('moment/locale/es');
const { generarJWT } = require('../helpers/jwt');



// Obtener Herramientas
const getHerramientasos = async(req, res) => {

    const desde = Number(req.query.desde) || 0;


    const [herramientasos, total] = await Promise.all([
        Herramientaos
        .find({}, 'nombre'),
        Herramientaos.countDocuments()
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
        herramientasos,
        total
    });


};

// Crear Herramientas
const crearHerramientasos = async(req, res = response) => {

    // const { email, password } = req.body;

    try {


        const uid = req.uid;
        console.log(req.uid);

        const herramientaos = new Herramientaos(req.body);
        herramientaos.created = new Date();
        herramientaos.usuario = uid;
        herramientaos.nombre = req.body.nombre;

        console.log(uid);

        // Guardar perfil 
        await herramientaos.save();

        res.json({
            ok: true,
            herramientaos
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

const actualizarHerramientasos = async(req, res = response) => {


    // TODO: validar token y comprobar si es el usuario correcto

    const uid = req.params.id;
    // const nombre = req.body.nombre;

    console.log(uid);


    try {

        const herramientaosDB = await Herramientaos.findById(uid);

        if (!herramientaosDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe Herramienta con ese id'
            });
        }

        // Actualización
        //const  { nombre } = req.body;

        const cambiosHerramienta = {
            // telefono: { $push: { numero: req.body.telefono } },
            ...req.body
        };


        const herramientasActualizado = await Herramientaos.findByIdAndUpdate(uid, cambiosHerramienta, { new: true });
        //const perfilActualizado = await Perfil.findByIdAndUpdate(uid, campos, ({ $push: { perfilado: perfilado } }), { new: true });
        //const perfilActualizado2 = await Perfil.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            herramientaos: herramientasActualizado,
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



const borrarHerramientasos = async(req, res = response) => {

    const id = req.params.id;

    try {

        const herramientaos = await Herramientaos.findById(id);

        if (!herramientaos) {
            return res.status(404).json({
                ok: false,
                msg: 'Herramienta no encontrado por el ID'
            });
        }

        await Herramientaos.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Herramienta Borrada'
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
    getHerramientasos,
    crearHerramientasos,
    actualizarHerramientasos,
    borrarHerramientasos
};