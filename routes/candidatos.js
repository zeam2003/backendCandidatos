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
    getCandidatoById,
    verificarEmail,
    getCandidatoByResultado,
    getTotalCandidatoByResultado,
    actualizarResultadoCandidato,
    totalCandidatos
} = require('../controllers/candidatos');

const router = Router();

router.get('/', validarJWT, getCandidatos);

router.get('/email/:campo', verificarEmail);

// Crear Candidato
router.post('/', [
        validarJWT,
        check('nombre', 'El nombre del candidato es necesario').not().isEmpty(),
        check('busqueda', 'El ID del candidato no es valido').isMongoId(),
        validarCampos
    ],
    crearCandidatos
);

// Traer Totales de Candidatos
router.get('/totales/', [
    validarJWT,
    totalCandidatos
]);

// Traer Totales 
router.get('/totalesby/:resultados', [
    validarJWT,
    getTotalCandidatoByResultado
]);

// Traer Candidato por Resultado
router.get('/resultados/:resultados', [
    validarJWT,
    getCandidatoByResultado
]);

// Actualizar Candidato
router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre del candidato es necesario').not().isEmpty(),
        check('busqueda', 'El ID del candidato no es valido').isMongoId(),
        validarCampos
    ],
    actualizarCandidatos
);

// Actualizar Resultados Candidato
router.put('/cambiarresultado/:id', [
        validarJWT,
        check('resultados', 'El resultado del Candidato es necesario').not().isEmpty(),
        validarCampos
    ],
    actualizarResultadoCandidato
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