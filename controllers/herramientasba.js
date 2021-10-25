const { response } = require('express');

const Perfil = require('../models/perfil');
const Usuario = require('../models/usuario');
const Herramientaba = require('../models/herramientasba');

const Momento = require('moment');
require('moment/locale/es');
const { generarJWT } = require('../helpers/jwt');



// Obtener Herramientas
const getHerramientasba = async(req, res) => {

    const desde = Number(req.query.desde) || 0;


    const [herramientasba, total] = await Promise.all([
        Herramientaba
        .find({}, 'nombre'),
        Herramientaba.countDocuments()
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
        herramientasba,
        total
    });


};

// Crear Herramientas
const crearHerramientasba = async(req, res = response) => {

    // const { email, password } = req.body;

    try {


        const uid = req.uid;
        console.log(req.uid);

        const herramientaba = new Herramientaba(req.body);
        herramientaba.created = new Date();
        herramientaba.usuario = uid;
        herramientaba.nombre = req.body.nombre;

        console.log(uid);

        // Guardar perfil 
        await herramientaba.save();

        res.json({
            ok: true,
            herramientaba
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

const actualizarHerramientasba = async(req, res = response) => {


    // TODO: validar token y comprobar si es el usuario correcto

    const uid = req.params.id;
    // const nombre = req.body.nombre;

    console.log(uid);


    try {

        const herramientabaDB = await Herramientaba.findById(uid);

        if (!herramientabaDB) {
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

const borrarHerramientasba = async(req, res = response) => {

    const id = req.params.id;

    try {

        const herramientaba = await Herramientaba.findById(id);

        if (!herramientaba) {
            return res.status(404).json({
                ok: false,
                msg: 'Herramienta no encontrado por el ID'
            });
        }

        await Herramientaba.findByIdAndDelete(id);

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
    getHerramientasba,
    crearHerramientasba,
    actualizarHerramientasba,
    borrarHerramientasba

};