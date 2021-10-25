/*
    Ruta: /api/perfiles
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getPerfiles, crearPerfiles, actualizarPerfil, getPerfilesTecnologia, getPerfilesAreaExperiencia, getPerfilesTecnologia2, getPerfilesTecnologia3 } = require('../controllers/perfiles');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT, getPerfiles);
router.get('/tecnologia', validarJWT, getPerfilesTecnologia);
router.get('/tecnologia/:busqueda', validarJWT, getPerfilesTecnologia2);
router.get('/areaexperiencia', validarJWT, getPerfilesAreaExperiencia);
router.get('/perfilado', validarJWT, getPerfilesTecnologia3);
// router.get('/tecnologia/:busqueda', validarJWT, getPerfilesTecnologiaPerfil);
router.post('/', [
        validarJWT,
        check('areaExperiencia', 'El nombre del perfil es necesario').not().isEmpty(),
        validarCampos
    ],
    crearPerfiles
);
router.put('/:id', [
        validarJWT,
        check('areaExperiencia', 'El nombre es oblitario').not().isEmpty(),
        validarCampos
    ],
    actualizarPerfil
);

module.exports = router;