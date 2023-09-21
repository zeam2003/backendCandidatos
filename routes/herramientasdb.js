/*
    Ruta: /api/herramientasdb
*/


const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getHerramientasdb, crearHerramientasdb, actualizarHerramientasdb, borrarHerramientasdb } = require('../controllers/herramientasdb');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT, getHerramientasdb);

router.post('/', [
        validarJWT,
        check('nombre', 'El nombre es necesario').not().isEmpty(),
        validarCampos
    ],
    crearHerramientasdb
);
router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre es oblitario').not().isEmpty(),
        validarCampos
    ],
    actualizarHerramientasdb
);

router.delete('/:id',
    validarJWT,
    borrarHerramientasdb
);

module.exports = router;