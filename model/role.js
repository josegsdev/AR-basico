const {Schema, model}= require('mongoose');
/* La convencion de nombres e mongoose para funcionar pide que la coleccion/tabla
en la DB sea en plural (s) y que el modelo sea en singular  */

const RoleSchema= Schema({
    rol:{
        type:String
    }
});


module.exports=model('Role', RoleSchema);