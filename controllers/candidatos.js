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

const actualizarCandidatos = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const candidato = await Candidato.findById(id);

        if (!candidato) {
            return res.status(404).json({
                ok: false,
                msg: 'Candidato no encontrado por el ID'
            });
        }

        const cambiosCandidato = {
            ...req.body,
            usuario: uid
        }

        const candidatoActualizado = await Candidato.findByIdAndUpdate(id, cambiosCandidato, { new: true });

        res.json({
            ok: true,
            Candidato: candidatoActualizado
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
    borrarCandidatos
};