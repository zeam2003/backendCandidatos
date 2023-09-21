/*
    Ruta: /api/tipoentrevista
*/


const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getTipo, crearTipoEntrevista, actualizarTipoEntrevista, borrarTipoEntrevistas } = require('../controllers/tipoentrevistas');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT, getTipo);

router.post('/', [
        validarJWT,
        check('nombre', 'El nombre es necesario').not().isEmpty(),
        validarCampos
    ],
    crearTipoEntrevista
);
router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre es oblitario').not().isEmpty(),
        validarCampos
    ],
    actualizarTipoEntrevista
);

router.delete('/:id',
    validarJWT,
    borrarTipoEntrevistas
);

module.exports = router;