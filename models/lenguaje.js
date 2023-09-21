const { Schema, model } = require('mongoose');

const LenguajeSchema = Schema({

    nombre: {
        type: String
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    created: {
        type: String
    }

}, { collection: 'lenguajes' });

LenguajeSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Lenguajes', LenguajeSchema);