const getMenuFrontEd = (role = 'USER_ROLE') => {

    const menu = [

        {
            titulo: 'Dashboard',
            icono: 'mdi mdi-gauge',
            submenu: [
                { titulo: 'Principal', url: '/' },
                { titulo: 'Progreso', url: 'progress' },
                { titulo: 'Promesas', url: 'promesas' },
                { titulo: 'Graficas', url: 'graficas' },
                { titulo: 'Rxjs', url: 'rxjs' },
            ]
        },
        {
            titulo: 'Mantenimientos',
            icono: 'mdi mdi-folder-lock-open',
            submenu: [
                // { titulo: 'Usuarios', url: 'usuarios'},
                { titulo: 'Candidatos', url: 'candidatos' },
                { titulo: 'Busquedas', url: 'busquedas' },
                { titulo: 'Clientes', url: 'clientes' }
            ]
        }

    ];

    if (role === 'ADMIN_ROLE') {
        menu[1].submenu.unshift({ titulo: 'Usuarios', url: 'usuarios' });
    }

    return menu;
};

module.exports = {
    getMenuFrontEd
};