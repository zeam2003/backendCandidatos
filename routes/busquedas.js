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
    contarBusquedas,
    getBusquedasEstado,
    actualizarBusquedas,
    actualizarEstadoBusqueda,
    borrarBusquedas,
    getBusquedasById
} = require('../controllers/busquedas');

const router = Router();

router.get('/', getBusquedas);

router.get('/:id', [
    validarJWT,
    // check('candidato', 'El ID del candidato no es valido').isMongoId(),
    getBusquedasById
]);

router.get('/estado/:estado', [
    validarJWT,
    getBusquedasEstado
]);

router.get('/contarbusquedas/totales', [
    validarJWT,
    contarBusquedas
]);

// Crear Busquedas
router.post('/', [
        validarJWT,
        check('nombre', 'El nombre de la busqueda es necesaria').not().isEmpty(),
        validarCampos
    ],

    crearBusquedas
);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre de la busqueda es necesaria').not().isEmpty(),
        validarCampos
    ],
    actualizarBusquedas
);

router.put('/cambiarestado/:id', [
        validarJWT,
        check('estado', 'El estado de la búsqueda es necesario').not().isEmpty(),
        validarCampos
    ],
    actualizarEstadoBusqueda
);

router.delete('/:id',
    validarJWT,
    borrarBusquedas
);

module.exports = router;