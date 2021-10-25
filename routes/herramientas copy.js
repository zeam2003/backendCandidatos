/*
    Ruta: /api/herramientas
*/


const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getHerramientas, crearHerramientas, actualizarHerramientas, borrarHerramientas } = require('../controllers/herramientas');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT, getHerramientas);

router.post('/', [
        validarJWT,
        check('nombre', 'El nombre es necesario').not().isEmpty(),
        validarCampos
    ],
    crearHerramientas
);
router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre es oblitario').not().isEmpty(),
        validarCampos
    ],
    actualizarHerramientas
);

router.delete('/:id',
    validarJWT,
    borrarHerramientas
);

module.exports = router;