const { isMoment } = require('moment');
const { Schema, model } = require('mongoose');

const estadosValidos = {
    // 1 = Abierta, 2 = "Stand by", 3 = "Cancelada", 4 ="Perdida", 5 ="Cerrada"
    values: ['1', '2', '3', '4', '5'],
    message: '{VALUE} no es un estado permitido'
};

const CandidatoSchema = Schema({

    created: {
        type: String
    },
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    img: {
        type: String
    },
    imgCandidato: {
        type: String
    },
    ine: {
        type: String
    },
    rfc: {
        type: String
    },
    curp: {
        type: String
    },
    imss: {
        type: String
    },
    edad: {
        type: String
    },
    puedeViajar: {
        type: Boolean,
    },
    nacionalidad: {
        type: String
    },
    fechaNacimiento: {
        type: String
    },
    calle: {
        type: String
    },
    numeroCalle: {
        type: String
    },
    ciudad: {
        type: String // estado para Mexico
    },
    estadoProvincia: {
        type: String
    },
    codigoPostal: {
        type: String
    },
    paisDomicilio: {
        type: String
    },
    genero: {
        type: String
    },
    imgBuesqueda: {
        type: String
    },
    estado: {
        type: String
    },
    cliente: {
        type: String
    },
    puesto: {
        type: String
    },
    sitio: {
        type: String
    },
    vacante: {
        type: String
    },
    detalleBusqueda: {
        type: String
    },
    estadoBusqueda: {
        type: String
    },
    perfil: {
        type: String
    },
    ultimaModificacionBúsqueda: {
        type: String
    },
    creadoBusquedaPor: {
        type: String
    },
    modificadoBusquedaPor: {
        type: String
    },
    creadoPor: {
        type: String
    },
    modificadoPor: {
        type: String
    },
    ultimaModificacion: {
        type: String
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    busqueda: {
        type: Schema.Types.ObjectId,
        ref: 'Busqueda',
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    // Estudios y Formación
    idioma: {
        type: String
    },
    seniority: {
        type: String
    },
    perfiladoTecnico: {
        type: String
    },
    perfilEstudios: {
        type: String
    },
    certificaciones: {
        type: Array
    },
    // Software
    herramientas: {
        type: String
    },
    herramientasSoftware: {
        type: String
    },
    herramientaLP: {
        type: String
    },
    herramientaOS: {
        type: String
    },
    herramientaDB: {
        type: String
    },
    // Experiencia Laboral
    ultimoSueldo: {
        type: String
    },
    ultimoEmpleo: {
        type: String
    },
    esquemaAntiguoPuesto: {
        type: String
    },
    tiempoTrabajado: {
        type: String
    },
    prestacionesAntiguoPuesto: {
        type: String
    },
    expectativaEconomica: {
        type: String
    },
    ultimoEmpleador: {
        type: String
    },
    // Entrevista
    entrevistadoPor: {
        type: String
    },
    tipoDeEntrevista: {
        type: String
    },
    lugar: {
        type: String
    },
    fechaEntrevista: {
        type: String
    },
    requerimiento: {
        type: String
    },
    // Entrevista Notas
    comportamiento: {
        type: String
    },
    confidencial: {
        type: String
    },
    resultados: {
        type: String,
        required: true
    },
    comentarios: {
        type: String
    },
    calificaEntrevista: {
        type: String,
        default: 3,
        enum: estadosValidos
    }



}, { collection: 'candidatos' });

CandidatoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Candidato', CandidatoSchema);