const { Schema, model } = require('mongoose');

const ClienteSchema = Schema({

    created: {
        type: String
    },
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: false
    },
    creadoPor: {
        type: String
    },
    modificadoPor: {
        type: String
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    ultimaModificacion: {
        type: String
    },
    contacto: {
        type: String,
        default: 'Sin especificar'
    },
    detalle: {
        type: String,
        default: 'Sin Observaciones'
    },
    estado: {
        type: Boolean,
        default: true
    }
});

ClienteSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();

    object.uid = _id;
    return object;
});

module.exports = model('Cliente', ClienteSchema);