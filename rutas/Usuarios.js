const {Router}=require('express');

const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete, 
        usuariosPatch } = require('../controladores/UsuariosCtrl');


const rutas = Router();


rutas.get('/', usuariosGet );

rutas.put('/:id/:cat',  usuariosPut);

rutas.post('/',  usuariosPost);

rutas.delete('/',  usuariosDelete);

rutas.patch('/',  usuariosPatch);


module.exports= rutas;