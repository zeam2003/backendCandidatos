const { response } = require('express');

const Busqueda = require('../models/busqueda');
const Usuario = require('../models/usuario');

const Momento = require('moment');
const { findById } = require('../models/busqueda');
const usuario = require('../models/usuario');
require('moment/locale/es');

// Obtener Búsquedas

const getBusquedas = async(req, res = response) => {

    const busquedas = await Busqueda.find()
        .populate('usuario', 'nombre email img')
        .populate('modificadoPor', 'nombre')
        .populate('creadoPor', 'nombre');


    res.json({
        ok: true,
        busquedas: busquedas
    });
};


// Obtener Búsquedas por estado

const getBusquedasEstado = async(req, res = response) => {

    const estado = req.params.estado;
    const desde = Number(req.query.desde) || 0;

    //console.log(estado);

    const [busquedas, total] = await Promise.all([
        Busqueda
        .find({ estado: estado })
        .populate('usuario', 'nombre email img')
        .populate('modificadoPor', 'nombre')
        .populate('creadoPor', 'nombre')
        .skip(desde)
        .limit(50),
        Busqueda.countDocuments({ estado })
    ]);

    res.json({
        ok: true,
        busquedas,
        total
    });
};

// contador Búsquedas
const contarBusquedas = async(req, res = response) => {

    // let estado = 'Abiertas';

    const aggregate = Busqueda.aggregate(
        [{
                $group: {
                    _id: '$estado',
                    total: { $sum: 1 },
                }
            },
            { $sort: { '_id': 1 } },

            /* $group: {
                _id: '$estado',
                total: {
                    $sum: 1
                },
                $sort: { $estado: 1 }
            } */
        ],

        function(err, totales) {
            previo = {};
            if (err) {
                res.send(err);
            } else {
                const found = totales.find((e) => e._id === 'Abiertas' );
                if (found) {
                    console.log('esta ')
                    console.log(totales);
                    res.json({
                        ok: true,
                        totales
                    });
                } else {
                    console.log('no encontre nada')
                    previo._id = 'Abiertas',
                    previo.total = 0
                    totales.unshift({...previo})
                    console.log(totales);
                    res.json({
                        ok: true,
                        totales
                    });
                }
                
                
            }
        }
    );


};


// Obtener Búsquedas por ID
const getBusquedasById = async(req, res = response) => {

    const id = req.params.id;
    console.log('al inicio en el server tengo: ', id);

    try {
        const busquedas = await Busqueda.findById(id)
            .populate('usuario', 'nombre email  img');

        res.json({
            ok: true,
            busquedas
        });
        console.log('En el servidor tengo ', busquedas._id);
    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'hable con el administrador'
        });
    }
};


// Crear Búsquedas

const crearBusquedas = async(req, res = response) => {

    const uid = req.uid;
    console.log('creando Nueva Búsqueda', uid);

    // Usuario.findById(uid);
    // console.log(Usuario);
    // const creador = req.uid;
    const localeArg = Momento.locale('es');
    // const esto = Usuario.findById(uid);
    // console.log(esto);
    const busqueda = new Busqueda({
        usuario: uid,
        created: Momento().format('LLLL'),
        creadoPor: uid,
        modificadoPor: uid,
        ultimaModificacion: Momento().format('LLLL'),
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

/*
// Actualizar Búsquedas
*/

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
            usuario: uid,
            modificadoPor: uid,
            ultimaModificacion: Momento().format('LLLL')
        };

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

/*
// Actualizar estado
*/
const actualizarEstadoBusqueda = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;
    const estado = req.body.estado;

    console.log('linea 176', estado);
    // console.log(id);

    try {
        const busqueda = await Busqueda.findById(id);
        console.log('linea 181: id', id);
        console.log('linea 182: estado', estado);
        if (!busqueda) {
            return res.status(404).json({
                ok: false,
                msg: 'Búsqueda no encontrada por ese ID'
            });
        }

        const cambiosBusqueda = {
            estado: estado,
            usuario: uid,
            modificadoPor: uid,
            ultimaModificacion: Momento().format('LLLL')
        };

        const busquedaActualizada = await Busqueda.findByIdAndUpdate(id, cambiosBusqueda, { new: true });
        // console.log('se actualizo...');
        res.json({
            ok: true,
            cambiopor: estado,
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
    getBusquedasEstado,
    contarBusquedas,
    crearBusquedas,
    actualizarBusquedas,
    actualizarEstadoBusqueda,
    getBusquedasById,
    borrarBusquedas
};