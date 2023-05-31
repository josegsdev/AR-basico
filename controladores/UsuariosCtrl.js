

const usuariosGet=(req, res) => {
    const {query,nombre,apiKey}=req.query;
    res.json({
        mensaje: 'metodo getCtrl',
        query,
        nombre,
        apiKey
    });
}

const usuariosPut=(req, res) => {

    const {nombre,valor}= req.body;
    const {id,cat}=req.params;

    res.json({
        mensaje: 'metodo putCtrl',
        parametrosQueryDelURIDelMetodoPUT:{id,cat},
        desdeElBodyDelMetodoPUT:{nombre, 
                        valor}
    });
}

const usuariosPost=(req, res) => {
    const {nombre, edad}= req.body
    res.json({
        mensaje: 'metodo postCtrl',
        nombre,
        edad
    });
}

const usuariosDelete=(req, res) => {
    res.json({
        mensaje: 'metodo deleteCtrl'
    });
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