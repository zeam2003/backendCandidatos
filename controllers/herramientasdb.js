const { response } = require('express');

const Perfil = require('../models/perfil');
const Usuario = require('../models/usuario');
const Herramientadb = require('../models/herramientasdb');

const Momento = require('moment');
require('moment/locale/es');
const { generarJWT } = require('../helpers/jwt');



// Obtener Herramientas
const getHerramientasdb = async(req, res) => {

    const desde = Number(req.query.desde) || 0;


    const [herramientasdb, total] = await Promise.all([
        Herramientadb
        .find({}, 'nombre'),
        Herramientadb.countDocuments()
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
        herramientasdb,
        total
    });


};

// Crear Herramientas
const crearHerramientasdb = async(req, res = response) => {

    // const { email, password } = req.body;

    try {


        const uid = req.uid;
        console.log(req.uid);

        const herramientadb = new Herramientadb(req.body);
        herramientadb.created = new Date();
        herramientadb.usuario = uid;
        herramientadb.nombre = req.body.nombre;

        console.log(uid);

        // Guardar perfil 
        await herramientadb.save();

        res.json({
            ok: true,
            herramientadb
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

const actualizarHerramientasdb = async(req, res = response) => {


    // TODO: validar token y comprobar si es el usuario correcto

    const uid = req.params.id;
    // const nombre = req.body.nombre;

    console.log(uid);


    try {

        const herramientadbDB = await Herramientadb.findById(uid);

        if (!herramientadbDB) {
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


        const herramientasActualizado = await Herramienta.findByIdAndUpdate(uid, cambiosHerramienta, { new: true });
        //const perfilActualizado = await Perfil.findByIdAndUpdate(uid, campos, ({ $push: { perfilado: perfilado } }), { new: true });
        //const perfilActualizado2 = await Perfil.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            herramienta: herramientasActualizado,
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

const borrarHerramientasdb = async(req, res = response) => {

    const id = req.params.id;

    try {

        const herramientadb = await Herramientadb.findById(id);

        if (!herramientadb) {
            return res.status(404).json({
                ok: false,
                msg: 'Herramienta no encontrado por el ID'
            });
        }

        await Herramientadb.findByIdAndDelete(id);

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
    getHerramientasdb,
    crearHerramientasdb,
    actualizarHerramientasdb,
    borrarHerramientasdb
};