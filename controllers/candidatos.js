const { response } = require('express');

const Candidato = require('../models/candidato');

const Momento = require('moment');
require('moment/locale/es');

const getCandidatos = async(req, res = response) => {

    const candidatos = await Candidato.find()
        .populate('usuario', 'nombre email  img')
        .populate('busqueda', 'nombre');

    res.json({
        ok: true,
        candidatos
    });
};

const getCandidatoById = async(req, res = response) => {

    const id = req.params.id;
    console.log('al inicio en el server tengo: ', id);

    try {
        const candidatos = await Candidato.findById(id)
            .populate('usuario', 'nombre email  img')
            .populate('busqueda', 'nombre img');

        res.json({
            ok: true,
            candidatos
        });
        console.log('En el servidor tengo ', candidatos._id);
    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'hable con el administrador'
        });
    }
};


const crearCandidatos = async(req, res = response) => {

    const uid = req.uid;
    const candidato = new Candidato({
        usuario: uid,
        created: Momento().format('LLLL'),
        telefono: req.body.telefono,
        ...req.body
    });

    // const telefono = req.body.telefono;

    try {

        const candidatoDB = await candidato.save();

        res.json({
            ok: true,
            candidato: candidatoDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }

};

const actualizarCandidatos = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;
    //const telBody = req.body.telefono;


    try {

        const candidato = await Candidato.findById(id);

        if (!candidato) {
            return res.status(404).json({
                ok: false,
                msg: 'Candidato no encontrado por el ID'
            });
        }
        /* 
                const arrayActualizado = await Candidato.findByIdAndUpdate(id, { $push: { "telefono": "15315" } }, { new: true });
                console.log('esto esta aca ahora', arrayActualizado); */

        const cambiosCandidato = {
            // telefono: { $push: { numero: req.body.telefono } },
            ...req.body,
            usuario: uid
        };

        //const candidatoActualizado = await Candidato.findByIdAndUpdate(id, { $push: { telefono: { numero: telBody } } }, { new: true });

        const candidatoActualizado = await Candidato.findByIdAndUpdate(id, cambiosCandidato, { new: true });
        // const telefonoActualizado = await Candidato.findByIdAndUpdate(id, { telefono: { $push: { numero: req.body.telefono } } }, { upsert: true });

        res.json({
            ok: true,
            Candidato: candidatoActualizado
                // telefonoActualizado: telefonoActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

const borrarCandidatos = async(req, res = response) => {

    const id = req.params.id;

    try {

        const candidato = await Candidato.findById(id);

        if (!candidato) {
            return res.status(404).json({
                ok: false,
                msg: 'Candidato no encontrado por el ID'
            });
        }

        await Candidato.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Candidato Borrado'
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
    getCandidatos,
    crearCandidatos,
    actualizarCandidatos,
    borrarCandidatos,
    getCandidatoById
};