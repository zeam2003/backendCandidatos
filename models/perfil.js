const { Schema, model } = require('mongoose');

const PerfilSchema = Schema({

    areaExperiencia: {
        type: String
    },
    tecnologia: {
        type: String
    },
    perfilado: {

        type: Array,
        default: undefined
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    created: {
        type: String
    }

}, { collection: 'perfiles' });

PerfilSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Perfil', PerfilSchema);