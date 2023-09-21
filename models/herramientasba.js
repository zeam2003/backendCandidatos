const { Schema, model } = require('mongoose');

const HerramientasbaSchema = Schema({

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

}, { collection: 'herramientasba' });

HerramientasbaSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Herramientasba', HerramientasbaSchema);