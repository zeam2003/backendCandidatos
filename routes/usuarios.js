/*
    Ruta: /api/usuarios
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getUsuarios, crearUsuarios, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT, getUsuarios);

router.post('/', [
        check('nombre', 'El nombre es oblitario').not().isEmpty(),
        check('password', 'La contraseña es oblitario').not().isEmpty(),
        check('email', 'El email es oblitario').isEmail(),
        validarCampos,
    ],
    crearUsuarios
);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre es oblitario').not().isEmpty(),
        check('email', 'El email es oblitario').isEmail(),
        check('role', 'El rol es oblitario').not().isEmpty(),
        validarCampos
    ],
    actualizarUsuario
);

router.delete('/:id',
    validarJWT,
    borrarUsuario
);

module.exports = router;