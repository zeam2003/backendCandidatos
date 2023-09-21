const fs = require('fs');

const Usuario = require('../models/usuario');
const Candidato = require('../models/candidato');
const Busqueda = require('../models/busqueda');
const Cliente = require('../models/cliente');


const borrarImagen = (path) => {

    if (fs.existsSync(path)) {
        // Borra la imagen anterior
        fs.unlinkSync(path);
    }
};


const actualizarImagen = async(tipo, id, nombreArchivo) => {

    let pathViejo = '';
    switch (tipo) {
        case 'candidatos':
            const candidato = await Candidato.findById(id);
            if (!candidato) {

                return false;
            }

            pathViejo = `./uploads/candidatos/${ candidato.img }`;
            borrarImagen(pathViejo);

            candidato.img = nombreArchivo;
            await candidato.save();
            return true;
            break;

        case 'usuarios':

            const usuario = await Usuario.findById(id);
            if (!usuario) {

                return false;
            }

            pathViejo = `./uploads/usuarios/${ usuario.img }`;
            borrarImagen(pathViejo);

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;

            break;

        case 'busquedas':
            const busqueda = await Busqueda.findById(id);
            if (!busqueda) {

                return false;
            }

            pathViejo = `./uploads/usuarios/${ busqueda.img }`;
            borrarImagen(pathViejo);

            busqueda.img = nombreArchivo;
            await busqueda.save();
            return true;
            break;

        case 'clientes':
            const cliente = await Cliente.findById(id);
            if (!cliente) {

                return false;
            }

            pathViejo = `./uploads/clientes/${ cliente.img }`;
            borrarImagen(pathViejo);

            cliente.img = nombreArchivo;
            await cliente.save();
            return true;
            break;

        default:
            break;
    }
};

module.exports = {
    actualizarImagen
};