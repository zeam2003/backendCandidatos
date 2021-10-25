/*
    Ruta: /api/herramientasos
*/


const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getHerramientasos, crearHerramientasos, actualizarHerramientasos, borrarHerramientasos } = require('../controllers/herramientasos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT, getHerramientasos);

router.post('/', [
        validarJWT,
        check('nombre', 'El nombre es necesario').not().isEmpty(),
        validarCampos
    ],
    crearHerramientasos
);
router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre es oblitario').not().isEmpty(),
        validarCampos
    ],
    actualizarHerramientasos
);

router.delete('/:id',
    validarJWT,
    borrarHerramientasos
);

module.exports = router;