const { Schema, model } = require('mongoose');
const { stringify } = require('uuid');

const estadosValidos = {
    // 1 = Abierta, 2 = "Stand by", 3 = "Cancelada", 4 ="Perdida", 5 ="Cerrada"
    values: ['Abierta', 'Stand by', 'Cancelada', 'Perdida', 'Cerrada'],
    message: '{VALUE} no es un estado permitido'
};

const BusquedaSchema = Schema({

    created: {
        type: String
    },
    nombre: {
        type: String,
        required: true
    },
    vacantes: {
        type: Number
    },
    vacantesOcupadas: {
        type: Number
    },
    perfil: {
        type: String,
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
        default: "Abierta",
        enum: estadosValidos
    },
    puesto: {
        type: String
    },
    ultimaModificacion: {
        type: String
    },
    creadoPor: {
        type: String,
    },
    modificadoPor: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
    },
    rubro: {
        type: String
    },
    sitio: {
        type: String
    },
    cliente: {
        type: String
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