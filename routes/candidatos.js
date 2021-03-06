/*
    Candidatos
    ruta: '/api/candidatos'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getCandidatos,
    crearCandidatos,
    actualizarCandidatos,
    borrarCandidatos,
    getCandidatoById
} = require('../controllers/candidatos');

const router = Router();

router.get('/', validarJWT, getCandidatos);

// Crear Candidato
router.post('/', [
        validarJWT,
        check('nombre', 'El nombre del candidato es necesario').not().isEmpty(),
        check('busqueda', 'El ID del candidato no es valido').isMongoId(),
        validarCampos
    ],
    crearCandidatos
);

// Actualizar Candidato
router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre del candidato es necesario').not().isEmpty(),
        check('busqueda', 'El ID del candidato no es valido').isMongoId(),
        validarCampos
    ],
    actualizarCandidatos
);

router.delete('/:id',
    validarJWT,
    borrarCandidatos
);

router.get('/:id', [
    validarJWT,
    // check('candidato', 'El ID del candidato no es valido').isMongoId(),
    getCandidatoById
]);

module.exports = router;