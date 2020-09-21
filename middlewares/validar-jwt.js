const { response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = (req, res, next) => {

    // Leer del token
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token incorrecto'
        });
    }

};

const validarADMIN_ROLE = async(req, res, next) => {

    const uid = req.uid;
    console.log('Este ID tengo', uid);
    try {

        const usuarioDB = await Usuario.findById(uid);
        console.log('Rol ', usuarioDB.role);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        if (usuarioDB.role !== 'ADMIN_ROLE') {
            return res.status(403).json({
                ok: false,
                msg: 'No tiene privilegios para realizar la operación - usuario admin'
            });
        }

        next();

    } catch (error) {
        console.log(error);
        res.status(500).JSON({
            ok: false,
            msg: 'Contacte al administrador'
        });
    }

};

const validarADMIN_ROLE_o_Mismo_Usuario = async(req, res, next) => {

    const uid = req.uid;
    const id = req.params.id;
    console.log('Este ID tengo', uid);

    try {

        const usuarioDB = await Usuario.findById(uid);
        console.log('Rol ', usuarioDB.role);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        if (usuarioDB.role === 'ADMIN_ROLE' || uid === id) {
            next();
        } else {
            return res.status(403).json({
                ok: false,
                msg: 'No tiene privilegios para realizar la operación - usuario admin'
            });
        }



    } catch (error) {
        console.log(error);
        res.status(500).JSON({
            ok: false,
            msg: 'Contacte al administrador'
        });
    }

};


module.exports = {
    validarJWT,
    validarADMIN_ROLE,
    validarADMIN_ROLE_o_Mismo_Usuario
};