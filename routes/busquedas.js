/*
    ruta: /api/busquedas
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getBusquedas,
    crearBusquedas,
    actualizarBusquedas,
    borrarBusquedas
} = require('../controllers/busquedas');

const router = Router();

router.get('/', getBusquedas);

// Crear Busquedas
router.post('/', [
        validarJWT,
        check('nombre', 'El nombre de la busqueda es necesaria').not().isEmpty(),
        validarCampos
    ],

    crearBusquedas
);

router.put('/:id', [],
    actualizarBusquedas
);

router.delete('/:id',
    borrarBusquedas
);

module.exports = router;