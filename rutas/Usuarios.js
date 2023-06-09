const {Router}=require('express');
const {check}=require('express-validator');
const validaCampo=require('../middelwares/validarCampos')

const { validaRol, 
        validaCorreoUnico,
        validaID}=require('../helpers/validadores_contra_DB');

const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete, 
        usuariosPatch } = require('../controladores/UsuariosCtrl');


const rutas = Router();


rutas.get('/', usuariosGet );

rutas.put('/:id', [
    check('id','No es un id valido').isMongoId(),
    check('id','No existe usuario con este id').custom(validaID),
    check('rol','No es un rol').custom(validaRol),//si el negocio permite que el rol sea editado debe ser validado ya que entra nuevamente 
    validaCampo
], usuariosPut);

rutas.post('/', [
    check('nombre','Nombre obligatorio').not().isEmpty(),
    check('password','La pass debe ser minimo de 6  caracteres').isLength({min:6}),
    check('correo', 'Debe ser un correo').custom(validaCorreoUnico),//agrego el middleware de validaciones de express-validator
    check('rol','No es un rol').custom(validaRol),//funcion que recibe y retorna variable de mismo nombre permite solo especificar la referencia de la funcion, no es necesario escribir las variables de entrada o salida
    validaCampo//luego que se ejecutan las validaciones del middelare de express-validator, reviso los errores con el middelware propio
],  usuariosPost);

rutas.delete('/:id',[
    check('id','No es un id valido').isMongoId(),
    check('id','No existe usuario con este id').custom(validaID),
    validaCampo
],  usuariosDelete);

rutas.patch('/',  usuariosPatch);


module.exports= rutas;