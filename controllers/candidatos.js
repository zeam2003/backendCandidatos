const { response } = require('express');

const Candidato = require('../models/candidato');

const Momento = require('moment');
require('moment/locale/es');

// Obtener candidtaos
const getCandidatos = async(req, res = response) => {

    /* const candidatos = await Candidato.find()
        .populate('usuario', 'nombre email  img')
        .populate('busqueda', 'nombre');

    res.json({
        ok: true,
        candidatos
    });
 */


    const desde = Number(req.query.desde) || 0;
    /* console.log(desde);

    const usuarios = await Usuario
        .find({}, 'nombre email role google')
        .skip(desde)
        .limit(5);

    const total = await Usuario.count(); */

    const [candidatos, total] = await Promise.all([
        Candidato
        .find({}, 'nombre email perfilEstudios seniority estado resultados')
        .populate('usuario', 'nombre email img')
        .populate('busqueda', 'nombre')
        .skip(desde)
        .limit(50),
        Candidato.countDocuments()
    ]);

    res.json({
        ok: true,
        candidatos,
        total
    });
};

// Total Candidatos
const totalCandidatos = async(req, res = response) => {

    try {
        const [total] = await Promise.all([
            Candidato.countDocuments()
        ]);
        res.json({
            ok: true,
            total
        });
    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'hable con el administrador'
        });
    }

};

// Obtener Candidato por ID
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

// Obtener Total Candidato por resultado
const getTotalCandidatoByResultado = async(req, res = response) => {

    const resultados = req.params.resultados;

    try {
        const [total] = await Promise.all([
            // Candidato
            // .find({ resultados: resultados}),
            Candidato.countDocuments({ resultados: resultados }),
        ]);
        console.log(total);
        res.json({
            ok: true,
            total
        });
    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'hable con el administrador'
        });
    }


};


// Obtener Candidato por resultado
const getCandidatoByResultado = async(req, res = response) => {

    const resultados = req.params.resultados;
    const desde = Number(req.query.desde) || 0;
    const limite = Number(req.query.limite) || 0;
    // const desde = req.params.desde || 0;

    console.log(desde);
    console.log(limite);

    const [candidatos, total] = await Promise.all([
        Candidato
        .find({ resultados: resultados })
        .populate('usuario', 'nombre email img')
        .populate('modificadoPor', 'nombre')
        .populate('creadoPor', 'nombre')
        .skip(desde)
        .limit(limite),
        Candidato.countDocuments({ resultados })
    ]);

    res.json({
        ok: true,
        candidatos,
        total
    });
};

// Verificar si existe un candidato con un email especifico
const verificarEmail = async(req, res = response) => {
    const email = req.params.campo;
    console.log(email);

    try {
        const existeEmail = await Candidato.findOne({ email });

        if (existeEmail) {
            console.log('estoy aca', this.existeEmail);
            return res.status(400).json({
                ok: false,
                msg: 'El correo está registrado'

            });

        } else {
            return res.status(200).json({
                ok: true,
                msg: 'Se puede utilizar para un candidato'
            });
        }

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error, contacte al administrador'
        })
    }
}

// Crear un nuevo Candidato
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


/*
// Actualizar Resultados
*/
const actualizarResultadoCandidato = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;
    const resultados = req.body.resultados;

    console.log('linea 176', resultados);
    // console.log(id);

    try {
        const candidato = await Candidato.findById(id);
        console.log('linea 181: id', id);
        console.log('linea 182: estado', resultados);
        if (!candidato) {
            return res.status(404).json({
                ok: false,
                msg: 'Candidato no encontrado por ese ID'
            });
        }

        const cambiosCandidato = {
            resultados: resultados,
            usuario: uid,
            modificadoPor: uid,
            ultimaModificacion: Momento().format('LLLL')
        };

        const resultadoActualizado = await Candidato.findByIdAndUpdate(id, cambiosCandidato, { new: true });
        // console.log('se actualizo...');
        res.json({
            ok: true,
            cambiopor: resultados,
            Candidato: resultadoActualizado
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
    getCandidatoById,
    verificarEmail,
    getTotalCandidatoByResultado,
    getCandidatoByResultado,
    actualizarResultadoCandidato,
    totalCandidatos
};