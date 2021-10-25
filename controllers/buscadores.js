const { response } = require('express');

const Usuario = require('../models/usuario');
const Candidato = require('../models/candidato');
const Busqueda = require('../models/busqueda');
const Perfil = require('../models/perfil');


// Buscar en todas las colecciones
const getTodo = async(req, res = response) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');



    const [usuarios, candidatos, busquedas, perfiles] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Candidato.find({ nombre: regex }),
        Busqueda.find({ nombre: regex }),
        Perfil.find({ nombre: regex }),
    ]);

    res.json({
        ok: true,
        usuarios,
        candidatos,
        busquedas,
        perfiles
    });
};



const getDocumentosColeccion = async(req, res = response) => {

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;

    RegExp.escape = function(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    };

    term = new RegExp(RegExp.escape(busqueda), "i");
    console.log(term);
    const regex = new RegExp(term, 'i');

    let data = [];

    switch (tabla) {
        case 'candidatos':
            data = await Candidato.find({ nombre: regex })
                .populate('usuario', 'nombre img perfiladoTecnico perfilEstudios')
                .populate('busqueda', 'nombre img');
            break;


        case 'busquedas':
            data = await Busqueda.find({ $or: [{ nombre: regex }, { cliente: regex }] })
                .populate('usuario', 'nombre img');
            break;

        case 'usuarios':
            data = await Usuario.find({ nombre: regex });
            break;

        case 'perfiles':
            data = await Perfil.find({ perfilado: regex });
            break;

        case 'tecnologia':
            data = await Perfil.find({ tecnologia: regex });
            break;

        case 'perfilado':
            data = await Perfil.find({ perfilado: regex });
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