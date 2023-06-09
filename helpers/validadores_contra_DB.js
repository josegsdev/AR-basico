const Role=require('../model/role');
const Usuario=require('../model/usuario');

const validaID= async(id='')=>{
    const existeID= await Usuario.findById(id);
    if (!existeID){
        throw new Error(`El id : ${id} no existe`);
    }
}


const validaRol= async(rol= '')=>{
    const existeRol= await Role.findOne({rol})
    if (!existeRol){
        throw new Error(`El rol ${rol} no existe`);
    }
}



//Utilizo el modelo para que atraves del metodo findOne de MONGOOSE consulte a la BASE DE DATOS MONGO si el correo ya existe
const validaCorreoUnico= async(correo='')=>{
    const existeCorreo= await Usuario.findOne({correo:correo});
    if (existeCorreo){
        throw new Error(`El correo : ${correo}, ya existe`);
    }
}




module.exports = {
    validaRol,
    validaCorreoUnico,
    validaID
}