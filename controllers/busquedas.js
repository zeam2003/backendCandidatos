const { response } = require('express');

const Busqueda = require('../models/busqueda');

const getBusquedas = async(req, res = response) => {

    const busquedas = await Busqueda.find()
        .populate('usuario', 'nombre email img');

    res.json({
        ok: true,
        busquedas
    });
};

const crearBusquedas = async(req, res = response) => {

    const uid = req.uid;
    const busqueda = new Busqueda({
        usuario: uid,
        ...req.body
    });

    try {

        const busquedaDB = await busqueda.save();

        res.json({
            ok: true,
            busqueda: busquedaDB
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }


};

const actualizarBusquedas = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'actualizarBusquedas'
    });
};

const borrarBusquedas = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'borrarBusquedas'
    });
};


module.exports = {
    getBusquedas,
    crearBusquedas,
    actualizarBusquedas,
    borrarBusquedas
};