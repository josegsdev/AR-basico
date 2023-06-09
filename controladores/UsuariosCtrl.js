const Usuario=require('../model/usuario');
const bcrypt= require('bcrypt');



const usuariosGet=async (req, res) => {

    const {desde=0,limite=5}=req.query;
    const queryFiltro={estado:true}


    /* Dado el funcionamiento del AWAIT, hacer dos peticiones a la DB dobla el tipo de respuesta para llegar a la respuesta
    ya que espera terminar la primera consulta AWAIT para ejecutar la segunda y una vez terminada recien para a la 
    entrega de la respuesta 
    const usuarios= await Usuario.find(queryFiltro)//find puede tomar como parametro un objeto para filtrar la respuesta
    .skip(Number(desde)).limit(Number(limite));
    //No creo una instancia del modelo Usuario(como en el POST) para consultar, solo utilizo el modelo requerido
    const total= await Usuario.countDocuments(queryFiltro);
    */


    //Para lanzar ambas consultas de forma paralela, utilizamos Promise.all 
    const [total,usuarios]= await Promise.all([
        Usuario.countDocuments(queryFiltro),
        Usuario.find(queryFiltro).skip(Number(desde)).limit(Number(limite))
    ])


    res.json({
        total,
        traidos:usuarios.length,
        usuarios
    });
}

const usuariosPut= async (req, res) => {

    const {id}=req.params;
    const {password, google,correo, ...resto}= req.body;
    

    if(password){
        const semillaEncriptacion= bcrypt.genSaltSync();
        resto.password= bcrypt.hashSync(password,semillaEncriptacion);
    }

    const usuario=await Usuario.findByIdAndUpdate(id, resto);
    //aparte de encontrar y actualizar el documento/registro, me devuelve el modelo ya actualizado en la db

    res.json({
        mensaje: 'metodo putCtrl',
        respuesta:{
            camposEnviadosPUT: resto,
            documentoActualizado:usuario
        }
    });
}

const usuariosPost= async (req, res) => {

    const {nombre, correo, password, rol}= req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    const semillaEncriptacion= bcrypt.genSaltSync();
    usuario.password= bcrypt.hashSync(password,semillaEncriptacion);

    


    await usuario.save();
    res.json({
        respuesta:usuario
    });
}

const usuariosDelete= async(req, res) => {

    const {id}=req.params;
  //  const usuarioBorrado= await Usuario.findByIdAndDelete(id); borrado fisico
    const usuarioBorrado= await Usuario.findByIdAndUpdate(id,{estado:false}) // Para mantener la integridad refencial se hace un update al documento para que quede fuera sin borrarlo definitivamente
    res.json(usuarioBorrado);
}

const usuariosPatch=(req, res) => {
    res.json({
        mensaje: 'metodo patchCtrl'
    });
}



module.exports={
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}