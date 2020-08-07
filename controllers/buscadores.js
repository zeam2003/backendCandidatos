const { response } = require('express');

const Usuario = require('../models/usuario');
const Candidato = require('../models/candidato');
const Busqueda = require('../models/busqueda');


// Buscar en todas las colecciones
const getTodo = async(req, res = response) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');



    const [usuarios, candidatos, busquedas] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Candidato.find({ nombre: regex }),
        Busqueda.find({ nombre: regex }),
    ]);

    res.json({
        ok: true,
        usuarios,
        candidatos,
        busquedas
    });
};



const getDocumentosColeccion = async(req, res = response) => {

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    let data = [];

    switch (tabla) {
        case 'candidatos':
            data = await Candidato.find({ nombre: regex })
                .populate('usuario', 'nombre img')
                .populate('busqueda', 'nombre img');
            break;

        case 'busquedas':
            data = await Busqueda.find({ nombre: regex })
                .populate('usuario', 'nombre img');
            break;

        case 'usuarios':
            data = await Usuario.find({ nombre: regex });
            break;

        default:
            return res.status(500).json({
                ok: false,
                msg: 'no es una de las tablas de buqueda validas'
            });

    }

    res.json({
        ok: true,
        resultados: data
    });
};

module.exports = {
    getTodo,
    getDocumentosColeccion
};