/*
    Ruta: /api/usuarios
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const {
    getClientes,
    totalClientes,
    crearClientes,
    actualizarClientes,
    borrarClientes
} = require('../controllers/clientes');
const { validarJWT, validarADMIN_ROLE, validarADMIN_ROLE_o_Mismo_Usuario } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT, getClientes);


router.post('/', [
        validarJWT,
        check('nombre', 'El nombre es oblitario').not().isEmpty(),
        validarCampos,
    ],
    crearClientes
);

// Traer Totales de Candidatos
router.get('/totales/', [
    validarJWT,
    totalClientes
]);

router.put('/:id', [
        validarJWT,
        validarADMIN_ROLE_o_Mismo_Usuario,
        // validarADMIN_ROLE_o_mismo_usuario,
        check('nombre', 'El nombre es oblitario').not().isEmpty(),
        validarCampos
    ],
    actualizarClientes
);

router.delete('/:id', [validarJWT, validarADMIN_ROLE],
    borrarClientes
);

module.exports = router;