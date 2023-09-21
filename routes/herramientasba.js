/*
    Ruta: /api/herramientasba
*/


const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getHerramientasba, crearHerramientasba, actualizarHerramientasba, borrarHerramientasba } = require('../controllers/herramientasba');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT, getHerramientasba);

router.post('/', [
        validarJWT,
        check('nombre', 'El nombre es necesario').not().isEmpty(),
        validarCampos
    ],
    crearHerramientasba
);
router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre es oblitario').not().isEmpty(),
        validarCampos
    ],
    actualizarHerramientasba
);

router.delete('/:id',
    validarJWT,
    borrarHerramientasba
);

module.exports = router;