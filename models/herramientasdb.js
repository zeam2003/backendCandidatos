const { Schema, model } = require('mongoose');

const HerramientasdbSchema = Schema({

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

}, { collection: 'herramientasdb' });

HerramientasdbSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Herramientasdb', HerramientasdbSchema);