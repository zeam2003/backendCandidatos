const { response } = require('express');

const Perfil = require('../models/perfil');
const Usuario = require('../models/usuario');
const TipoEntrevista = require('../models/tipoentrevista');

const Momento = require('moment');
require('moment/locale/es');
const { generarJWT } = require('../helpers/jwt');



// Obtener Herramientas
const getTipo = async(req, res) => {

    const desde = Number(req.query.desde) || 0;


    const [tipoentrevista, total] = await Promise.all([
        TipoEntrevista
        .find({}, 'nombre'),
        TipoEntrevista.countDocuments()
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
        tipoentrevista,
        total
    });


};

// Crear Herramientas
const crearTipoEntrevista = async(req, res = response) => {

    // const { email, password } = req.body;

    try {


        const uid = req.uid;
        console.log(req.uid);

        const tipoEntrevista = new TipoEntrevista(req.body);
        tipoEntrevista.created = new Date();
        tipoEntrevista.usuario = uid;
        tipoEntrevista.nombre = req.body.nombre;

        console.log(uid);

        // Guardar perfil 
        await tipoEntrevista.save();

        res.json({
            ok: true,
            tipoEntrevista
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

const actualizarTipoEntrevista = async(req, res = response) => {


    // TODO: validar token y comprobar si es el usuario correcto

    const uid = req.params.id;
    // const nombre = req.body.nombre;

    console.log(uid);


    try {

        const tipoEntrevistaDB = await TipoEntrevista.findById(uid);

        if (!tipoEntrevistaDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe Herramienta con ese id'
            });
        }

        // Actualización
        //const  { nombre } = req.body;

        const cambiosTipoEntrevista = {
            // telefono: { $push: { numero: req.body.telefono } },
            ...req.body
        };


        const tipoEntrevistaActualizado = await Herramienta.findByIdAndUpdate(uid, cambiosTipoEntrevista, { new: true });
        //const perfilActualizado = await Perfil.findByIdAndUpdate(uid, campos, ({ $push: { perfilado: perfilado } }), { new: true });
        //const perfilActualizado2 = await Perfil.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            herramienta: tipoEntrevistaActualizado,
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

const borrarTipoEntrevistas = async(req, res = response) => {

    const id = req.params.id;

    try {

        const tipoEntrevista = await TipoEntrevista.findById(id);

        if (!tipoEntrevista) {
            return res.status(404).json({
                ok: false,
                msg: 'Tipo de entrevista no encontrado por el ID'
            });
        }

        await TipoEntrevista.findByIdAndDelete(id);

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
    getTipo,
    crearTipoEntrevista,
    actualizarTipoEntrevista,
    borrarTipoEntrevistas
};