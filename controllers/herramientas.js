const { response } = require('express');

const Perfil = require('../models/perfil');
const Usuario = require('../models/usuario');
const Herramienta = require('../models/herramientas');

const Momento = require('moment');
require('moment/locale/es');
const { generarJWT } = require('../helpers/jwt');



// Obtener Herramientas
const getHerramientas = async(req, res) => {

    const desde = Number(req.query.desde) || 0;


    const [herramientas, total] = await Promise.all([
        Herramienta
        .find({}, 'nombre'),
        Herramienta.countDocuments()
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
        herramientas,
        total
    });


};

// Crear Herramientas
const crearHerramientas = async(req, res = response) => {

    // const { email, password } = req.body;

    try {


        const uid = req.uid;
        console.log(req.uid);

        const herramienta = new Herramienta(req.body);
        herramienta.created = new Date();
        herramienta.usuario = uid;
        herramienta.nombre = req.body.nombre;

        console.log(uid);

        // Guardar perfil 
        await herramienta.save();

        res.json({
            ok: true,
            herramienta
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

const actualizarHerramientas = async(req, res = response) => {


    // TODO: validar token y comprobar si es el usuario correcto

    const uid = req.params.id;
    // const nombre = req.body.nombre;

    console.log(uid);


    try {

        const herramientaDB = await Herramienta.findById(uid);

        if (!herramientaDB) {
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

const borrarHerramientas = async(req, res = response) => {

    const id = req.params.id;

    try {

        const herramienta = await Herramienta.findById(id);

        if (!herramienta) {
            return res.status(404).json({
                ok: false,
                msg: 'Herramienta no encontrado por el ID'
            });
        }

        await Herramienta.findByIdAndDelete(id);

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
    getHerramientas,
    crearHerramientas,
    actualizarHerramientas,
    borrarHerramientas
};