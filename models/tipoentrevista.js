const { Schema, model } = require('mongoose');

const TipoEntrevistaSchema = Schema({

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

}, { collection: 'tipoentrevistas' });

TipoEntrevistaSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('TipoEntrevistas', TipoEntrevistaSchema);