const { Schema, model } = require('mongoose');

const HerramientasOSSchema = Schema({

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

}, { collection: 'herramientasos' });

HerramientasOSSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('HerramientasOS', HerramientasOSSchema);