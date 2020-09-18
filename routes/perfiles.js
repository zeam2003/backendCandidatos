/*
    Ruta: /api/perfiles
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getPerfiles, crearPerfiles } = require('../controllers/perfiles');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT, getPerfiles);
router.post('/', [
        validarJWT,
        check('nombre', 'El nombre del perfil es necesario').not().isEmpty(),
        validarCampos
    ],
    crearPerfiles
);

module.exports = router;