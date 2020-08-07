const { response } = require('express');

const Candidato = require('../models/candidato');

const getCandidatos = async(req, res = response) => {

    const candidatos = await Candidato.find()
        .populate('usuario', 'nombre email  img')
        .populate('busqueda', 'nombre');

    res.json({
        ok: true,
        candidatos
    });
};

const crearCandidatos = async(req, res = response) => {

    const uid = req.uid;
    const candidato = new Candidato({
        usuario: uid,
        ...req.body
    });

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

const actualizarCandidatos = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'actualizarBusquedas'
    });
};

const borrarCandidatos = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'borrarBusquedas'
    });
};


module.exports = {
    getCandidatos,
    crearCandidatos,
    actualizarCandidatos,
    borrarCandidatos
};