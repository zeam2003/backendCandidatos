/*
    Ruta: /api/lenguajes
*/


const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getLenguaje, crearLenguajes, actualizarLenguajes, borrarLenguajes } = require('../controllers/lenguaje');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT, getLenguaje);

router.post('/', [
        validarJWT,
        check('nombre', 'El nombre es necesario').not().isEmpty(),
        validarCampos
    ],
    crearLenguajes
);
router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre es oblitario').not().isEmpty(),
        validarCampos
    ],
    actualizarLenguajes
);

router.delete('/:id',
    validarJWT,
    borrarLenguajes
);

module.exports = router;