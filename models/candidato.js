const { Schema, model } = require('mongoose');

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
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    busqueda: {
        type: Schema.Types.ObjectId,
        ref: 'Busqueda',
        required: true
    }

}, { collection: 'candidatos' });

CandidatoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Candidato', CandidatoSchema);