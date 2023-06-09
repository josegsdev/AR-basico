const {Schema, model}= require('mongoose');


const UsuarioSchema= Schema({
    nombre:{
        type: String,
        required: [true,'El nombre es obligatorio']
    },
    correo:{
        type:String,
        required: [true,'El correo es obligatorio'],
        unique:true
    },
    password:{
        type:String,
        required:[true, 'La cntraseña es necesaria']
    },
    imagen:{
        type:String
    },
    rol:{
        type:String,
        required:true,
        enum:['ADMIN_ROLE','USER_ROLE']
    },
    estado:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    }
});


//este metodo de scheme permite especificar los campos a devolver en el mismo modelo,
//util para no devolver informacion sensible o no necesaria para el negocio 
UsuarioSchema.methods.toJSON= function (){
    const{__v,password, ...usuario}=this.toObject();
    return usuario;
}


module.exports= model('Usuario', UsuarioSchema);