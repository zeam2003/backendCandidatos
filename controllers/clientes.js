const { response } = require('express');

const Cliente = require('../models/cliente');

const Momento = require('moment');
require('moment/locale/es');

const getClientes = async(req, res = response) => {

    const clientes = await Cliente.find()
        .populate('usuario', 'nombre email  img');

    res.json({
        ok: true,
        clientes
    });
};


// Total Clientes
const totalClientes = async(req, res = response) => {

    try {
        const [total] = await Promise.all([
            Cliente.countDocuments()
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

const crearClientes = async(req, res = response) => {

    const uid = req.uid;
    const cliente = new Cliente({
        usuario: uid,
        created: Momento().format('LLLL'),
        creadoPor: uid,
        modificadoPor: uid,
        ultimaModificacion: Momento().format('LLLL'),
        ...req.body
    });


    try {

        const clienetDB = await cliente.save();

        res.json({
            ok: true,
            cliente: clienetDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }

};

const actualizarClientes = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;
    //const telBody = req.body.telefono;


    try {

        const cliente = await Cliente.findById(id);

        if (!cliente) {
            return res.status(404).json({
                ok: false,
                msg: 'Cliente no encontrado por el ID'
            });
        }

        const cambiosCliente = {
            modificadoPor: uid,
            ultimaModificacion: Momento().format('LLLL'),
            usuario: uid,
            ...req.body,

        };

        const clienteActualizado = await Cliente.findByIdAndUpdate(id, cambiosCliente, { new: true });

        res.json({
            ok: true,
            Cliente: clienteActualizado
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

const borrarClientes = async(req, res = response) => {

    const id = req.params.id;

    try {

        const cliente = await Cliente.findById(id);

        if (!cliente) {
            return res.status(404).json({
                ok: false,
                msg: 'Cliente no encontrado por el ID'
            });
        }

        await Cliente.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Cliente Borrado'
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
    getClientes,
    totalClientes,
    crearClientes,
    actualizarClientes,
    borrarClientes
};