/*
    Ruta: /api/usuarios
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getUsuarios, crearUsuarios, actualizarUsuario, borrarUsuario, verificarEmail } = require('../controllers/usuarios');
const { validarJWT, validarADMIN_ROLE, validarADMIN_ROLE_o_Mismo_Usuario } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT, getUsuarios);

router.get('/:campo', verificarEmail);

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
        validarADMIN_ROLE_o_Mismo_Usuario,
        // validarADMIN_ROLE_o_mismo_usuario,
        check('nombre', 'El nombre es oblitario').not().isEmpty(),
        check('email', 'El email es oblitario').isEmail(),
        check('role', 'El rol es oblitario').not().isEmpty(),
        validarCampos
    ],
    actualizarUsuario
);

router.delete('/:id', [validarJWT, validarADMIN_ROLE],
    borrarUsuario
);

module.exports = router;