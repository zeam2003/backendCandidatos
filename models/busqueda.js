const { Schema, model } = require('mongoose');

const estadosValidos = {
    // 1 = Activo, 0 = "Baja", 2 = "Suspendido"
    values: ['1', '0', '2'],
    message: '{VALUE} no es un estado permitido'
}

const BusquedaSchema = Schema({

    created: {
        type: String
    },
    nombre: {
        type: String,
        required: true
    },
    vacantes: {
        type: String
    },
    detalle: {
        type: String,
        default: 'Sin Observaciones'
    },
    img: {
        type: String,
    },
    estado: {
        type: String,
        default: 1
    },
    puesto: {
        type: String
    },
    ultimaModificacion: {
        type: String,
        default: 'Sin modificaciones'
    },
    creadoPor: {
        type: String
    },
    modificadoPor: {
        type: String,
        default: 'Sin modificaciones'
    },
    numBusqueda: {
        type: Number
    },
    usuario: {
        require: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }

}, { collection: 'busquedas' });

BusquedaSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Busqueda', BusquedaSchema);