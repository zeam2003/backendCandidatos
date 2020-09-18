const { response } = require('express');

const Busqueda = require('../models/busqueda');

const Momento = require('moment');
require('moment/locale/es');

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
    const creador = req.uid;
    const localeArg = Momento.locale('es');
    const busqueda = new Busqueda({
        usuario: uid,
        created: Momento().format('LLLL'),
        creadoPor: creador,
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

const actualizarBusquedas = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const busqueda = await Busqueda.findById(id);

        if (!busqueda) {
            return res.status(404).json({
                ok: false,
                msg: 'Busqueda no encontrada por el ID'
            });
        }

        const cambiosBusqueda = {
            ...req.body,
            usuario: uid
        }

        const busquedaActualizada = await Busqueda.findByIdAndUpdate(id, cambiosBusqueda, { new: true });

        res.json({
            ok: true,
            Busqueda: busquedaActualizada
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }


};

const borrarBusquedas = async(req, res = response) => {

    const id = req.params.id;

    try {

        const busqueda = await Busqueda.findById(id);

        if (!busqueda) {
            return res.status(404).json({
                ok: false,
                msg: 'Busqueda no encontrada por el ID'
            });
        }

        await Busqueda.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Busqueda Eliminada'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}


module.exports = {
    getBusquedas,
    crearBusquedas,
    actualizarBusquedas,
    borrarBusquedas
};